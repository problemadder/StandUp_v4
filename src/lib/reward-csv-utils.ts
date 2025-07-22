import { Reward, RewardType, CountryCapitalReward } from "@/lib/rewards-data";

export const exportRewardsToCsv = (rewards: Reward[]): void => {
  if (rewards.length === 0) {
    alert("Keine Belohnungsdaten zum Exportieren vorhanden.");
    return;
  }

  const headers = ["Type", "Content1", "Content2"];
  const csvRows = [
    headers.join(";"),
    ...rewards.map(reward => {
      let content1 = "";
      let content2 = "";

      if (typeof reward.content === 'string') {
        content1 = reward.content;
      } else {
        content1 = reward.content.question;
        content2 = reward.content.answer;
      }

      return [
        reward.type,
        `"${content1.replace(/"/g, '""')}"`, // Escape double quotes
        `"${content2.replace(/"/g, '""')}"`  // Escape double quotes
      ].join(";");
    })
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "stehauf_belohnungsdaten.csv");
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

export const importRewardsFromCsv = (csvString: string): Reward[] => {
  const lines = csvString.split("\n").filter(line => line.trim() !== "");
  if (lines.length <= 1) {
    console.warn("CSV-Datei ist leer oder enthält nur Header.");
    return [];
  }

  const headers = lines[0].split(";").map(h => h.trim());
  const expectedHeaders = ["Type", "Content1", "Content2"];

  if (!expectedHeaders.every(h => headers.includes(h))) {
    console.error("CSV-Header stimmen nicht überein. Erwartet:", expectedHeaders, "Gefunden:", headers);
    alert("Ungültiges CSV-Format. Bitte stellen Sie sicher, dass die Header 'Type', 'Content1', 'Content2' korrekt sind.");
    return [];
  }

  const rewards: Reward[] = [];
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
      const type = rowData["Type"] as RewardType;
      let content: string | CountryCapitalReward;

      if (type === "countryCapital") {
        content = {
          question: rowData["Content1"],
          answer: rowData["Content2"],
        };
      } else {
        content = rowData["Content1"];
      }

      rewards.push({ type, content });
    } catch (e) {
      console.error(`Fehler beim Parsen von Zeile ${i + 1}:`, e);
    }
  }
  return rewards;
};