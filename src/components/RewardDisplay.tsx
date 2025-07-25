import React, { useState, useEffect } from "react";
import { Reward, QuestionAnswerReward, FlagReward } from "@/lib/rewards-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RewardDisplayProps {
  reward: Reward | null;
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ reward }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false); // Reset showAnswer when a new reward is displayed
  }, [reward]);

  if (!reward) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Belohnung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Stell dich hin, um deine erste Belohnung zu erhalten!</p>
        </CardContent>
      </Card>
    );
  }

  const renderContent = () => {
    switch (reward.type) {
      case "facts":
        return <p>{reward.content as string}</p>;
      case "questionsAnswers":
        const qaReward = reward.content as QuestionAnswerReward;
        return (
          <div>
            <p className="font-semibold mb-2">{qaReward.question}</p>
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Antwort anzeigen
              </Button>
            ) : (
              <p className="mt-2 text-lg font-bold text-primary">{qaReward.answer}</p>
            )}
          </div>
        );
      case "flags":
        const flagReward = reward.content as FlagReward;
        return (
          <div className="flex flex-col items-center">
            <p className="font-semibold mb-4 text-center">Wozu gehört diese Flagge?</p>
            <img
              src={`https://flagcdn.com/144x108/${flagReward.flagCode}.png`}
              srcSet={`https://flagcdn.com/288x216/${flagReward.flagCode}.png 2x, https://flagcdn.com/384x288/${flagReward.flagCode}.png 3x`}
              width="144"
              height="108"
              alt={`Flagge von ${flagReward.countryName}`}
              className="mb-4 border border-border shadow-md"
            />
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Antwort anzeigen
              </Button>
            ) : (
              <p className="mt-2 text-lg font-bold text-primary">{flagReward.countryName}</p>
            )}
          </div>
        );
      default:
        return <p>Unbekannte Belohnung.</p>;
    }
  };

  const getTitle = () => {
    switch (reward.type) {
      case "facts": return "Fakten";
      case "questionsAnswers": return "Frage & Antwort";
      case "flags": return "Flaggen-Quiz";
      default: return "Belohnung";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default RewardDisplay;