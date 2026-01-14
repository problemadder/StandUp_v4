"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn for conditional class merging

interface TimerProps {
  onSessionComplete: () => void;
}

const SESSION_DURATION_SECONDS = 15 * 60; // 15 Minuten

const Timer: React.FC<TimerProps> = ({ onSessionComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isCooldownActive, setIsCooldownActive] = useState(false); // New state for cooldown
  const [cooldownRemaining, setCooldownRemaining] = useState(0); // New state for cooldown timer

  // Refs for precise time tracking
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0); // Timestamp when the current run started (performance.now())
  const accumulatedTimeRef = useRef<number>(0); // Total time elapsed before current run/pause (in seconds)
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // Ref for cooldown interval

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Logic to execute when a session completes
  const handleSessionCompletionLogic = useCallback(() => {
    onSessionComplete(); // Trigger session complete action

    // Start cooldown
    setIsCooldownActive(true);
    setCooldownRemaining(SESSION_DURATION_SECONDS);
    
    // Clear any existing cooldown interval before setting a new one
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }

    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) { // Use 1 to ensure it hits 0 and then clears
          clearInterval(cooldownIntervalRef.current!);
          setIsCooldownActive(false);
          document.title = originalDocumentTitle.current; // Reset tab title after cooldown
          return 0;
        }
        document.title = `${formatTime(prev - 1)} - Cooldown`; // Update tab title during cooldown
        return prev - 1;
      });
    }, 1000);

    if (Notification.permission === "granted") {
      const notification = new Notification("StehAuf! Büro-Challenge", {
        body: "Glückwunsch! 15 Minuten geschafft! Zeit für deine Belohnung. Nächste Session in 15 Minuten.",
        icon: "/smiley.svg",
      });
      notification.onclick = () => {
        window.focus();
      };
    }
    // Reset main timer states for next session
    setTimeRemaining(SESSION_DURATION_SECONDS);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = 0;
  }, [onSessionComplete]);

  // Main session timer tick
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
      handleSessionCompletionLogic(); // Call the new logic handler
    } else {
      setTimeRemaining(Math.ceil(newTimeRemaining)); // Round up to show full seconds
      document.title = `${formatTime(Math.ceil(newTimeRemaining))} - StehAuf!`;
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [handleSessionCompletionLogic]);

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
      if (!isCooldownActive) { // Only reset title if not in cooldown
        document.title = originalDocumentTitle.current;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
      document.title = originalDocumentTitle.current; // Reset tab title on unmount
    };
  }, [isRunning, tick, isCooldownActive]); // Depend on isRunning, tick, and isCooldownActive

  const startTimer = () => {
    if (!isCooldownActive) { // Only start if not in cooldown
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(SESSION_DURATION_SECONDS);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = 0;
    setIsCooldownActive(false); // Reset cooldown state
    setCooldownRemaining(0); // Reset cooldown timer
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
      cooldownIntervalRef.current = null; // Clear the ref
    }
    document.title = originalDocumentTitle.current;
  };

  const progressValue = ((SESSION_DURATION_SECONDS - timeRemaining) / SESSION_DURATION_SECONDS) * 100;
  const cooldownProgressValue = ((SESSION_DURATION_SECONDS - cooldownRemaining) / SESSION_DURATION_SECONDS) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-card text-card-foreground rounded-lg shadow-lg w-full">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <Progress
          value={isCooldownActive ? cooldownProgressValue : progressValue}
          className={cn("w-full h-full absolute rounded-full", isCooldownActive && "[&>div]:bg-destructive")} // Apply destructive background to the inner div
        />
        <div className="absolute text-5xl font-extrabold text-primary-foreground">
          {isCooldownActive ? formatTime(cooldownRemaining) : formatTime(timeRemaining)}
        </div>
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <Button
            onClick={startTimer}
            variant={isCooldownActive ? "destructive" : "primary"} // Red if in cooldown
            disabled={isCooldownActive} // Disabled if in cooldown
            className="px-6 py-3 text-lg"
          >
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
      {isCooldownActive && (
        <p className="text-destructive font-medium">Nächste Session in {formatTime(cooldownRemaining)}</p>
      )}
    </div>
  );
};

export default Timer;