import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface HomeofficeButtonProps {
  onMarkHomeoffice: (date: string) => void;
}

const HomeofficeButton: React.FC<HomeofficeButtonProps> = ({ onMarkHomeoffice }) => {
  const handleMarkHomeoffice = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    onMarkHomeoffice(today);
    showSuccess("Heutiger Tag als Homeoffice markiert!");
  };

  return (
    <Button
      onClick={handleMarkHomeoffice}
      className="relative overflow-hidden px-6 py-3 text-lg font-bold text-primary-foreground bg-gradient-to-br from-primary to-primary/70 rounded-lg shadow-lg
                 hover:from-primary/90 hover:to-primary/60 active:translate-y-0.5 active:shadow-md transition-all duration-200 ease-in-out
                 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-200
                 hover:before:opacity-100"
    >
      <Home className="mr-2 h-5 w-5" /> Homeoffice
    </Button>
  );
};

export default HomeofficeButton;