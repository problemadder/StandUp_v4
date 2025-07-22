import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { exportToCsv, importFromCsv } from "@/lib/csv-utils";
import { Session } from "@/hooks/use-session-manager";

interface CsvButtonsProps {
  sessions: Session[];
  onImport: (importedSessions: Session[]) => void;
}

const CsvButtons: React.FC<CsvButtonsProps> = ({ sessions, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportToCsv(sessions);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvString = e.target?.result as string;
        try {
          const importedData = importFromCsv(csvString);
          onImport(importedData);
          alert("Daten erfolgreich importiert!");
        } catch (error) {
          console.error("Fehler beim Importieren der CSV-Datei:", error);
          alert("Fehler beim Importieren der Daten. Bitte überprüfen Sie das Dateiformat.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full min-w-0">
      <Button onClick={handleExport} className="px-4 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
        <Download className="mr-2 h-5 w-5" /> Export CSV
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      <Button onClick={handleImportClick} variant="outline" className="px-4 py-3 text-lg border-secondary text-secondary hover:bg-secondary/10">
        <Upload className="mr-2 h-5 w-5" /> Import CSV
      </Button>
    </div>
  );
};

export default CsvButtons;