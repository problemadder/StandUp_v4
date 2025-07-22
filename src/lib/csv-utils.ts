import { Session } from "@/hooks/use-session-manager";
import { QuestionAnswerReward } from "@/lib/rewards-data"; // Import the new interface

export const exportToCsv = (data: Session[]): void => {
  if (data.length === 0) {
    alert("Keine Daten zum Exportieren vorhanden.");
    return;
  }

  const headers = ["Datum", "Uhrzeit", "Dauer (Minuten)", "Abgeschlossen", "Belohnungstyp", "Belohnungsinhalt"];
  const csvRows = [
    headers.join(";"), // Use semicolon as separator for German Excel compatibility
    ...data.map(session => {
      const rewardContent = typeof session.reward.content === 'string'
        ? session.reward.content
        : `${(session.reward.content as QuestionAnswerReward).question} ||| ${(session.reward.content as QuestionAnswerReward).answer}`; // Use a distinct separator for Q&A
      return [
        session.date,
        session.time,
        session.durationMinutes.toString(),
        session.completed ? "Ja" : "Nein",
        session.reward.type,
        `"${rewardContent.replace(/"/g, '""')}"` // Escape double quotes
      ].join(";");
    })
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "stehauf_challenge_daten.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert("Ihr Browser unterstützt den automatischen Download nicht. Bitte kopieren Sie den Text manuell.");
    console.log(csvString);
  }
};

export const importFromCsv = (csvString: string): Session[] => {
  const lines = csvString.split("\n").filter(line => line.trim() !== "");
  if (lines.length <= 1) {
    console.warn("CSV-Datei ist leer oder enthält nur Header.");
    return [];
  }

  const headers = lines[0].split(";").map(h => h.trim());
  const expectedHeaders = ["Datum", "Uhrzeit", "Dauer (Minuten)", "Abgeschlossen", "Belohnungstyp", "Belohnungsinhalt"];

  if (!expectedHeaders.every(h => headers.includes(h))) {
    console.error("CSV-Header stimmen nicht überein. Erwartet:", expectedHeaders, "Gefunden:", headers);
    alert("Ungültiges CSV-Format. Bitte stellen Sie sicher, dass die Header korrekt sind.");
    return [];
  }

  const sessions: Session[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(";").map(v => v.trim().replace(/^"|"$/g, '').replace(/""/g, '"')); // Unescape quotes
    if (values.length !== headers.length) {
      console.warn(`Zeile ${i + 1} übersprungen: Ungültige Spaltenanzahl.`);
      continue;
    }

    const rowData: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      rowData[header] = values[index];
    });

    try {
      let rewardContent: string | QuestionAnswerReward;
      const contentString = rowData["Belohnungsinhalt"];
      if (rowData["Belohnungstyp"] === "questionsAnswers") {
        const parts = contentString.split(" ||| ");
        if (parts.length === 2) {
          rewardContent = { question: parts[0], answer: parts[1] };
        } else {
          console.warn(`Ungültiges Format für Frage-Antwort-Belohnung in Zeile ${i + 1}.`);
          rewardContent = { question: contentString, answer: "Antwort nicht verfügbar" };
        }
      } else {
        rewardContent = contentString;
      }

      sessions.push({
        id: `${rowData["Datum"]}-${rowData["Uhrzeit"]}-${Math.random().toString(36).substring(2, 9)}`, // Generate a new ID
        date: rowData["Datum"],
        time: rowData["Uhrzeit"],
        durationMinutes: parseInt(rowData["Dauer (Minuten)"], 10),
        completed: rowData["Abgeschlossen"] === "Ja",
        reward: {
          type: rowData["Belohnungstyp"] as any, // Type assertion, handle carefully
          content: rewardContent,
        },
      });
    } catch (e) {
      console.error(`Fehler beim Parsen von Zeile ${i + 1}:`, e);
    }
  }
  return sessions;
};