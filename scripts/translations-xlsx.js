const fs = require("fs");
const XLSX = require("xlsx");

function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

function createTranslationXLSX(files, outputFilePath) {
    const translations = {};
    const languages = [];

    files.forEach((item) => {
        const fileName = item.lang;
        const fileContent = readJSONFile(item.path);
        if (!fileContent) return;

        languages.push(fileName);

        Object.entries(fileContent).forEach(([key, value]) => {
            if (!translations[key]) {
                translations[key] = {};
            }
            translations[key][fileName] = value;
        });
    });

    // Prepare data for XLSX
    const headers = ["translation_key", ...languages];
    const rows = Object.keys(translations).map((key) => {
        const row = [key];
        languages.forEach((lang) => {
            row.push(translations[key][lang] || "");
        });
        return row;
    });

    const worksheetData = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Set column widths (e.g., 30 for translation_key and 20 for others)
    worksheet['!cols'] = [
        { wpx: 100 }, // Width for translation_key
        ...languages.map(() => ({ wpx: 300 })) // Width for each language column
    ];

    // Set row heights (e.g., 20 for each row)
    worksheet['!rows'] = rows.map(() => ({ hpx: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Translations");

    XLSX.writeFile(workbook, outputFilePath);
    console.log(`XLSX file created at ${outputFilePath}`);
}

function createLanguageJSONs(xlsxFilePath, languages) {
    const workbook = XLSX.readFile(xlsxFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    languages.forEach((language) => {
        const languageData = data.map(row => ({ key: row.translation_key, value: row[language] }));
        const languageJSON = languageData.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
        fs.writeFileSync(`./lang/${language}.json`, JSON.stringify(languageJSON, null, 2));
    });
}

const translationFiles = [
    {
        lang: "en",
        path: "../public/locales/en/translation.json"
    },
    {
        lang: "fr",
        path: "../public/locales/fr/translation.json"
    }
];

const outputXLSX = "./out/combined_translations.xlsx";

// createTranslationXLSX(translationFiles, outputXLSX);

createLanguageJSONs(outputXLSX, ["en", "fr"]);
