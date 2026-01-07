import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useSessionManager } from "@/hooks/use-session-manager";

const ResetButton: React.FC = () => {
  const { resetAllData } = useSessionManager();

  const handleReset = () => {
    if (window.confirm("Möchten Sie wirklich alle Daten zurücksetzen? Dies kann nicht rückgängig gemacht werden.")) {
      resetAllData();
    }
  };

  return (
    <Button
      onClick={handleReset}
      variant="destructive"
      className="w-full px-4 py-3 text-lg"
    >
      <RotateCcw className="mr-2 h-5 w-5" /> App zurücksetzen
    </Button>
  );
};

export default ResetButton;