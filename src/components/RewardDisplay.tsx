import React, { useState, useEffect } from "react";
import { Reward, QuestionAnswerReward } from "@/lib/rewards-data";
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
      case "historical":
      case "science":
      case "trivia":
      case "energyFacts":
      case "energyLaws":
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
      default:
        return <p>Unbekannte Belohnung.</p>;
    }
  };

  const getTitle = () => {
    switch (reward.type) {
      case "historical": return "Historische Tatsache";
      case "science": return "Wissenschaftlicher Fakt";
      case "trivia": return "Allgemeinwissen";
      case "questionsAnswers": return "Frage & Antwort";
      case "energyFacts": return "Energie-Fakt";
      case "energyLaws": return "Energiegesetz-Wissen";
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