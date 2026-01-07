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
      variant="destructive" // Changed to destructive variant
      className="w-full px-4 py-3 text-lg font-bold" // Simplified class names
    >
      <Home className="mr-2 h-5 w-5" /> Homeoffice
    </Button>
  );
};

export default HomeofficeButton;