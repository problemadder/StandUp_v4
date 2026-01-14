import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";
import { setLocalStorageItem, removeLocalStorageItem, getLocalStorageItem } from "@/lib/local-storage"; // Import localStorage utilities

interface TimerProps {
  onSessionComplete: () => void;
}

const SESSION_DURATION_SECONDS = 15 * 60; // 15 Minuten
const COOLDOWN_DURATION_SECONDS = 15 * 60; // 15 Minuten

const Timer: React.FC<TimerProps> = ({ onSessionComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(() => {
    const storedCooldown = getLocalStorageItem<string | null>("stehauf_cooldown_end_time", null);
    if (storedCooldown) {
      const endTime = parseInt(storedCooldown, 10);
      if (endTime > Date.now()) {
        return endTime;
      }
    }
    return null;
  });
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // New state for sitting time
  const [sittingStartTime, setSittingStartTime] = useState<number | null>(() => {
    const storedSittingTime = getLocalStorageItem<string | null>("stehauf_sitting_start_time", null);
    if (storedSittingTime) {
      return parseInt(storedSittingTime, 10);
    }
    return null;
  });
  const [elapsedSittingTime, setElapsedSittingTime] = useState(0);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  const originalDocumentTitle = useRef(document.title);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.warn("Dieser Browser unterstützt keine Desktop-Benachrichtigungen.");
      return;
    }
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Benachrichtigungsberechtigung erteilt.");
      } else {
        console.warn("Benachrichtigungsberechtigung verweigert.");
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    let cooldownInterval: ReturnType<typeof setInterval> | null = null;

    if (cooldownEndTime && cooldownEndTime > Date.now()) {
      const updateCooldown = () => {
        const remaining = Math.max(0, Math.ceil((cooldownEndTime - Date.now()) / 1000));
        setCooldownRemaining(remaining);
        if (remaining === 0) {
          setCooldownEndTime(null);
          removeLocalStorageItem("stehauf_cooldown_end_time");
          if (cooldownInterval) clearInterval(cooldownInterval);
        }
      };
      updateCooldown(); // Initial update
      cooldownInterval = setInterval(updateCooldown, 1000);
    } else {
      setCooldownRemaining(0);
      setCooldownEndTime(null);
      removeLocalStorageItem("stehauf_cooldown_end_time");
    }

    return () => {
      if (cooldownInterval) clearInterval(cooldownInterval);
    };
  }, [cooldownEndTime]);

  // Effect to manage sittingStartTime based on cooldown and timer state
  useEffect(() => {
    // When cooldown ends and timer is not running, start sitting time
    if (cooldownEndTime === null && !isRunning && sittingStartTime === null) {
      const now = Date.now();
      setSittingStartTime(now);
      setLocalStorageItem("stehauf_sitting_start_time", now.toString());
    }
    // When timer starts, reset sitting time
    if (isRunning && sittingStartTime !== null) {
      setSittingStartTime(null);
      removeLocalStorageItem("stehauf_sitting_start_time");
      setElapsedSittingTime(0); // Reset elapsed sitting time
    }
  }, [cooldownEndTime, isRunning, sittingStartTime]);

  // Effect to update elapsedSittingTime
  useEffect(() => {
    let sittingInterval: ReturnType<typeof setInterval> | null = null;

    if (sittingStartTime !== null && !isRunning && cooldownRemaining === 0) {
      const updateSittingTime = () => {
        setElapsedSittingTime(Math.floor((Date.now() - sittingStartTime) / 1000));
      };
      updateSittingTime(); // Initial update
      sittingInterval = setInterval(updateSittingTime, 1000);
    } else {
      setElapsedSittingTime(0); // Reset if conditions are not met
    }

    return () => {
      if (sittingInterval) clearInterval(sittingInterval);
    };
  }, [sittingStartTime, isRunning, cooldownRemaining]); // Dependencies for sitting time update


  const tick = useCallback(() => {
    const now = performance.now();
    const elapsedTime = (now - startTimeRef.current) / 1000;
    const newTimeRemaining = SESSION_DURATION_SECONDS - (accumulatedTimeRef.current + elapsedTime);

    if (newTimeRemaining <= 0) {
      setTimeRemaining(0);
      setIsRunning(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      onSessionComplete();

      // Start cooldown
      const newCooldownEndTime = Date.now() + COOLDOWN_DURATION_SECONDS * 1000;
      setCooldownEndTime(newCooldownEndTime);
      setLocalStorageItem("stehauf_cooldown_end_time", newCooldownEndTime.toString());

      if (Notification.permission === "granted") {
        const notification = new Notification("StehAuf! Büro-Challenge", {
          body: "Glückwunsch! 15 Minuten geschafft! Zeit für deine Belohnung. Nächste Sitzung in 15 Minuten.",
          icon: "/smiley.svg",
        });
        notification.onclick = () => {
          window.focus();
        };
      }
      setTimeRemaining(SESSION_DURATION_SECONDS);
      document.title = originalDocumentTitle.current;
      accumulatedTimeRef.current = 0;
      startTimeRef.current = 0;
    } else {
      setTimeRemaining(Math.ceil(newTimeRemaining));
      document.title = `${formatTime(Math.ceil(newTimeRemaining))} - StehAuf!`;
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [onSessionComplete]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (startTimeRef.current !== 0) {
        accumulatedTimeRef.current += (performance.now() - startTimeRef.current) / 1000;
      }
      document.title = originalDocumentTitle.current;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.title = originalDocumentTitle.current;
    };
  }, [isRunning, tick]);

  const startTimer = () => {
    if (cooldownRemaining > 0) {
      // Optionally, provide user feedback that cooldown is active
      return;
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(SESSION_DURATION_SECONDS);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = 0;
    // Cooldown and sitting time are not reset here, they are independent
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progressValue = ((SESSION_DURATION_SECONDS - timeRemaining) / SESSION_DURATION_SECONDS) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-card text-card-foreground rounded-lg shadow-lg w-full">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <Progress value={progressValue} className="w-full h-full absolute rounded-full" />
        <div className="absolute text-5xl font-extrabold text-primary-foreground">
          {formatTime(timeRemaining)}
        </div>
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <Button
            onClick={startTimer}
            disabled={cooldownRemaining > 0}
            variant={cooldownRemaining > 0 ? "destructive" : "default"}
            className="px-6 py-3 text-lg"
          >
            {cooldownRemaining > 0 ? (
              <>
                <Pause className="mr-2 h-5 w-5" /> Cooldown: {formatTime(cooldownRemaining)}
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" /> Start
              </>
            )}
          </Button>
        ) : (
          <Button onClick={pauseTimer} className="px-6 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Pause className="mr-2 h-5 w-5" /> Pause
          </Button>
        )}
        <Button onClick={resetTimer} variant="outline" className="px-6 py-3 text-lg border-secondary text-secondary hover:bg-secondary/10">
          <RotateCcw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>
      {cooldownRemaining === 0 && !isRunning && sittingStartTime !== null && (
        <p className="text-lg text-muted-foreground mt-4">
          Sitzzeit: <span className="font-bold text-secondary">{formatTime(elapsedSittingTime)}</span> – Zeit, wieder aufzustehen!
        </p>
      )}
    </div>
  );
};

export default Timer;