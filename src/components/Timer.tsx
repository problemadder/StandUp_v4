import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  onSessionComplete: () => void;
}

const SESSION_DURATION_SECONDS = 15 * 60; // 15 Minuten

const Timer: React.FC<TimerProps> = ({ onSessionComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  // Refs for precise time tracking
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0); // Timestamp when the current run started (performance.now())
  const accumulatedTimeRef = useRef<number>(0); // Total time elapsed before current run/pause (in seconds)

  const originalDocumentTitle = useRef(document.title); // Store original title

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

  const tick = useCallback(() => {
    const now = performance.now();
    const elapsedTime = (now - startTimeRef.current) / 1000; // in seconds
    const newTimeRemaining = SESSION_DURATION_SECONDS - (accumulatedTimeRef.current + elapsedTime);

    if (newTimeRemaining <= 0) {
      setTimeRemaining(0);
      setIsRunning(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      onSessionComplete();
      if (Notification.permission === "granted") {
        const notification = new Notification("StehAuf! Büro-Challenge", {
          body: "Glückwunsch! 15 Minuten geschafft! Zeit für deine Belohnung.",
          icon: "/smiley.svg",
        });
        notification.onclick = () => {
          window.focus();
        };
      }
      setTimeRemaining(SESSION_DURATION_SECONDS); // Reset timer after completion
      document.title = originalDocumentTitle.current; // Reset tab title
      accumulatedTimeRef.current = 0; // Reset accumulated time
      startTimeRef.current = 0; // Reset start time
    } else {
      setTimeRemaining(Math.ceil(newTimeRemaining)); // Round up to show full seconds
      document.title = `${formatTime(Math.ceil(newTimeRemaining))} - StehAuf!`;
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [onSessionComplete]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now(); // Set start time for the current run
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // When paused, update accumulated time
      if (startTimeRef.current !== 0) { // Only accumulate if it was actually running
        accumulatedTimeRef.current += (performance.now() - startTimeRef.current) / 1000;
      }
      document.title = originalDocumentTitle.current; // Reset tab title when paused/reset
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.title = originalDocumentTitle.current; // Reset tab title on unmount
    };
  }, [isRunning, tick]); // Depend on isRunning and tick

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(SESSION_DURATION_SECONDS);
    accumulatedTimeRef.current = 0; // Reset accumulated time
    startTimeRef.current = 0; // Reset start time
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
          <Button onClick={startTimer} className="px-6 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Play className="mr-2 h-5 w-5" /> Start
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
    </div>
  );
};

export default Timer;