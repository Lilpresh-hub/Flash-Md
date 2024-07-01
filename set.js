const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0h6cllPQUh3aWUvdFVJNnNjM0FmS21odHljdVN1aERDd21NSDR4eGFWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickhLYmI2ZnZvVEgrbExxQlhuUkNUb1NGWXpueFkyc0hadDBDNTl5N1RFZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRmd2WEFDcjFWU2wwSmUrYU5ZMHpPL0h4NkE1am1rY0lTYk0xd1BGNUhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxVkcrVGY4YkZ2UVdTNGJCOEx3eUxEWEJEeEE3LzFZVStma0wxNUI4M3o0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFMWVlRY3ZaelRrRnBudzEvWG1OancxdElVck9vUWJLZ0RCVmdhQlZvbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVwQ2RlUmxiTHB5WVUzNWpwaEViNHJFUEVyMnduamc2aDBodXJhZDQvamc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFyZllNM0h6cnZjZTdoN1ZpYzBLRFY2MnZkMEY2MDJnVnFST2Rla0pVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaExudVcwYXNiY1pjYzhYaDFyV2x3SUdpWFY5TVJRQzZxNHlYYmZXWGEwTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVlYkVNR1d5S0s3VlUxaXJ5VUtWdDROSWwvN1BRY1hkTFhvaDRoRWMrTitmSW13QVRtMlBEYmpKZTVmWU9VcWRRU3hWRkt3NW8xOWJTZ3ZRTUxhNUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJmc1BkakNQWU1KRVhoZHcrR0lXYlNtb1JUajdUblAzY2pZdXNBVWU3eGgwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXYVJvQVpPYlJrNmloMUwxX0kwWWh3IiwicGhvbmVJZCI6IjE4ZDExMzdkLWZkZTYtNGNjYi04NDgyLTVjZmRlZjUyZjBkNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TVBrMW4wMTd3SHY2cHlncjh4QlpaVmxBeG89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkRvOTV2YVlKQSsvYXdwTEdDOXhKNm53SjVrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlI4OEoxRUNaIiwibWUiOnsiaWQiOiIyMzQ5MTUyNTk3MTcxOjgxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOS3d1c1FDRU1MOGk3UUdHQ2tnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJSOHVMK1RYdWpFYTR0bDV5d3dLb3pHaUtFWUZxLy9nNjYxOEtORVFyVUh3PSIsImFjY291bnRTaWduYXR1cmUiOiJ4NSsrWUVxemFIdjRqT0JpMi9SUlM1L1c3cVFCRHg3bElmU1hBV0lQTjBQaS92M2JpRDNhbkJRN0U3SUU5TW5TQmx6eEUzaHhERzZETUFDOWJuSVZDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoia1hjK2pKU2kzc05JSTBmOER3VitUY3hnNm9NU0htVDgxWnpLbTBQMGRCcURYNVdRRXoxVWNmSjNLWlYzVEZVVVVHeWpXNjRXZHB6VDVEYW0zNlNVQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTUyNTk3MTcxOjgxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVmTGkvazE3b3hHdUxaZWNzTUNxTXhvaWhHQmF2LzRPdXRmQ2pSRUsxQjgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTk4NjA4MTZ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254742063632", 
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
