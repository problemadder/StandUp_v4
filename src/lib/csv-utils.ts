import { Session } from "@/hooks/use-session-manager";
import { QuestionAnswerReward, FlagReward } from "@/lib/rewards-data"; // Import new interfaces
import { convertIsoToEuropean, convertEuropeanToIso } from "@/lib/date-utils"; // Import date conversion utilities

interface AllData {
  sessions: Session[];
  activeDays: string[];
}

export const exportAllDataToCsv = (data: AllData): void => {
  const { sessions, activeDays } = data;

  if (sessions.length === 0 && activeDays.length === 0) {
    alert("Keine Daten zum Exportieren vorhanden.");
    return;
  }

  const headers = ["TYPE", "DATE", "TIME", "DURATION_MINUTES", "COMPLETED", "REWARD_TYPE", "REWARD_CONTENT1", "REWARD_CONTENT2"];
  const csvRows = [headers.join(";")];

  // Add session rows
  sessions.forEach(session => {
    let content1 = "";
    let content2 = "";

    if (session.reward.type === 'questionsAnswers') {
      const qaReward = session.reward.content as QuestionAnswerReward;
      content1 = qaReward.question;
      content2 = qaReward.answer;
    } else if (session.reward.type === 'flags') {
      const flagReward = session.reward.content as FlagReward;
      content1 = flagReward.countryName;
      content2 = flagReward.flagCode;
    } else { // facts
      content1 = session.reward.content as string;
    }

    csvRows.push(
      [
        "SESSION",
        convertIsoToEuropean(session.date), // Convert to European format for export
        session.time,
        session.durationMinutes.toString(),
        session.completed ? "Ja" : "Nein",
        session.reward.type,
        `"${content1.replace(/"/g, '""')}"`, // Escape double quotes
        `"${content2.replace(/"/g, '""')}"`  // Escape double quotes
      ].join(";")
    );
  });

  // Add active day rows
  activeDays.forEach(date => {
    csvRows.push(
      [
        "ACTIVE_DAY",
        convertIsoToEuropean(date), // Convert to European format for export
        "", // TIME
        "", // DURATION_MINUTES
        "", // COMPLETED
        "", // REWARD_TYPE
        "", // REWARD_CONTENT1
        ""  // REWARD_CONTENT2
      ].join(";")
    );
  });

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

export const importAllDataFromCsv = (csvString: string): AllData => {
  const lines = csvString.split("\n").filter(line => line.trim() !== "");
  if (lines.length <= 1) {
    console.warn("CSV-Datei ist leer oder enthält nur Header.");
    return { sessions: [], activeDays: [] };
  }

  const headers = lines[0].split(";").map(h => h.trim());
  const expectedHeaders = ["TYPE", "DATE", "TIME", "DURATION_MINUTES", "COMPLETED", "REWARD_TYPE", "REWARD_CONTENT1", "REWARD_CONTENT2"];

  if (!expectedHeaders.every(h => headers.includes(h))) {
    console.error("CSV-Header stimmen nicht überein. Erwartet:", expectedHeaders, "Gefunden:", headers);
    alert("Ungültiges CSV-Format. Bitte stellen Sie sicher, dass die Header korrekt sind.");
    return { sessions: [], activeDays: [] };
  }

  const sessions: Session[] = [];
  const activeDays: string[] = [];

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

    const type = rowData["TYPE"];

    if (type === "SESSION") {
      try {
        let rewardContent: string | QuestionAnswerReward | FlagReward;
        const rewardType = rowData["REWARD_TYPE"];
        const content1 = rowData["REWARD_CONTENT1"];
        const content2 = rowData["REWARD_CONTENT2"];

        if (rewardType === "questionsAnswers") {
          rewardContent = { question: content1, answer: content2 };
        } else if (rewardType === "flags") {
          rewardContent = { countryName: content1, flagCode: content2 };
        } else { // facts
          rewardContent = content1;
        }

        const isoDate = convertEuropeanToIso(rowData["DATE"]); // Convert from European to ISO for internal use

        sessions.push({
          id: `${isoDate}-${rowData["TIME"]}-${Math.random().toString(36).substring(2, 9)}`, // Generate a new ID
          date: isoDate,
          time: rowData["TIME"],
          durationMinutes: parseInt(rowData["DURATION_MINUTES"], 10),
          completed: rowData["COMPLETED"] === "Ja",
          reward: {
            type: rewardType as any, // Type assertion, handle carefully
            content: rewardContent,
          },
        });
      } catch (e) {
        console.error(`Fehler beim Parsen von Session-Zeile ${i + 1}:`, e);
      }
    } else if (type === "ACTIVE_DAY") {
      const europeanDate = rowData["DATE"];
      if (europeanDate) {
        const isoDate = convertEuropeanToIso(europeanDate); // Convert from European to ISO for internal use
        if (isoDate && !activeDays.includes(isoDate)) { // Ensure uniqueness and valid conversion
          activeDays.push(isoDate);
        }
      }
    } else {
      console.warn(`Unbekannter TYPE in Zeile ${i + 1}: ${type}`);
    }
  }
  return { sessions, activeDays: activeDays.sort() };
};