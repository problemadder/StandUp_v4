"use client";

import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const DadJokeWidget: React.FC = () => {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
          "User-Agent": "StehAuf-Challenge (https://dyad.sh)",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dad joke");
      }
      const data = await response.json();
      setJoke(data.joke);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg border border-border space-y-4 text-center">
      <div className="flex items-center space-x-2 text-primary font-bold text-lg">
        <Smile className="w-6 h-6" />
        <span>8. Steher Meister-Bonus: Dad Joke!</span>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 py-4 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Witz wird geladen...</span>
        </div>
      ) : error ? (
        <div className="py-2 text-destructive">
          <p>Witz konnte nicht geladen werden.</p>
          <Button variant="outline" size="sm" onClick={fetchJoke} className="mt-2">
            Nochmal versuchen
          </Button>
        </div>
      ) : (
        <blockquote className="text-xl font-medium italic text-foreground px-4 py-2 border-l-4 border-primary">
          "{joke}"
        </blockquote>
      )}

      {!loading && !error && (
        <Button variant="ghost" size="sm" onClick={fetchJoke} className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="w-4 h-4 mr-2" /> Noch ein Flachwitz
        </Button>
      )}
    </div>
  );
};

export default DadJokeWidget;