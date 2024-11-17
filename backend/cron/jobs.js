import cron from "node-cron";
import scrapeGlints from "../cron/scraping/scraping-glints.js";
import scrapeJobstreet from "../cron/scraping/scraping-jobstreet.js";
import scrapeKalibrr from "../cron/scraping/scraping-kalibrr.js";

export default async function runAllScraping() {
    console.log("Memulai scraping...");
    try {
      // Scraping Glints
      console.log("Memulai scraping Glints...");
      const result1 = await scrapeGlints();
      console.log("Hasil Scraping Glints:", result1);
    } catch (error) {
      console.error("Error Scraping Glints:", error);
    }
  
    try {
      // Scraping Jobstreet
      console.log("Memulai scraping Jobstreet...");
      const result2 = await scrapeJobstreet();
      console.log("Hasil Scraping Jobstreet:", result2);
    } catch (error) {
      console.error("Error Scraping Jobstreet:", error);
    }
  
    try {
      // Scraping Kalibrr
      console.log("Memulai scraping Kalibrr...");
      const result3 = await scrapeKalibrr();
      console.log("Hasil Scraping Kalibrr:", result3);
    } catch (error) {
      console.error("Error Scraping Kalibrr:", error);
    }
  
    console.log("Semua scraping selesai.");
  }

cron.schedule("*/5 * * * *", async () => {
    console.log("Memulai scraping terjadwal...");
    await runAllScraping();  // Pastikan hanya dijalankan di sini
  });
  console.log("Cron jobs telah dijadwalkan.");

console.log("Cron jobs telah dijadwalkan.");
