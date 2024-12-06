import puppeteer from "puppeteer";
import axios from "axios";
import * as cheerio from "cheerio";
import mysql from "mysql2/promise";

async function createConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "makarya",
    port: "3307",
  });
  return connection;
}

async function insertJobData(connection, job) {
  const query = `
        INSERT INTO jobs (job_title, company, work_type, working_type, experience, location, salary, link, link_img, category, study_requirement, skills, description, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON DUPLICATE KEY UPDATE 
          job_title = VALUES(job_title),
          company = VALUES(company),
          work_type = VALUES(work_type),
          working_type = VALUES(working_type),
          experience = VALUES(experience),
          location = VALUES(location),
          salary = VALUES(salary),
          link_img = VALUES(link_img),
          category = VALUES(category),
          study_requirement = VALUES(study_requirement),
          skills = VALUES(skills),
          description = VALUES(description),
          updated_at = CURRENT_TIMESTAMP
    `;

  const values = [
    job.job_title || null,          // job_title -> jobTitle
    job.company || null,
    job.work_type || null,          // work_type -> workType
    job.working_type || null,       // working_type -> workingType
    job.experience || null,
    job.location || null,
    job.salary || null,
    job.link || null,
    job.link_img || null,           // link_img -> linkImg
    job.category || null,
    job.study_requirement || null,  // study_requirement -> studyRequirement
    job.skills || null,
    job.description || null, 
  ];

  try {
    await connection.execute(query, values);
    console.log(`Jobs ${job.job_title} inserted/updated successfully.`);
  } catch (error) {
    console.error("Error inserting job data:", error);
  }
}

// Regular expression to extract the image ID
const patternImgLink = /(.*company-logo.)(.*)/;

// Global variable to maintain the job ID counter
let jobIdCounter = 0;

const validWorkTypes = [
  "Penuh Waktu",
  "Kontrak",
  "Magang",
  "Paruh Waktu",
  "Freelance",
  "Harian",
];

const validWorkingTypes = [
  "Kerja di kantor",
  "Kerja di kantor / rumah",
  "Kerja Remote/dari rumah",
];

const validExperience = [
  "Tidak berpengalaman",
  "Fresh Graduate",
  "Kurang dari setahun",
  "1 – 3 tahun",
  "3 – 5 tahun",
  "5 – 10 tahun",
  "Lebih dari 10 tahun",
];

const validStudyRequirements = [
  "Minimal Doktor (S3)",
  "Minimal Magister (S2)",
  "Minimal Sarjana (S1)",
  "Minimal Diploma (D1 - D4)",
  "Minimal SMA/SMK",
  "Minimal SMP",
  "Minimal SD",
];

// Function to log in and get cookies using Puppeteer
async function loginWithPuppeteer() {
  console.log("Logging in to get cookies...");
  const browser = await puppeteer.launch({ headless: false }); // Set to false to see the browser actions
  const page = await browser.newPage();

  await page.goto("https://glints.com/id/login"); // Ganti dengan URL halaman login Glints

  // Klik tombol "Masuk dengan Email"
  await page.click("a[aria-label='Login with Email button']");

  // Tunggu hingga form login muncul
  await page.waitForSelector('input[name="email"]');

  // Isi email dan password
  await page.type('input[name="email"]', "revansakuswana@gmail.com"); // Ganti dengan email yang benar
  await page.type('input[name="password"]', "Revan2109"); // Ganti dengan password yang benar

  // Klik tombol untuk login
  await page.click('button[type="submit"]');

  // Tunggu hingga login selesai dan halaman dialihkan
  await page.waitForNavigation();

  // Ambil cookies dari session login
  const cookies = await page.cookies();

  // Close the browser
  await browser.close();

  console.log("Login successful. Cookies retrieved.");
  return cookies;
}

// Function to scrape job cards with cookies
async function scrapeJobCards(url, cookies) {
  console.log(`Scraping page: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    const html = response.data;

    const $ = cheerio.load(html);
    const jobCards = $(
      "div.JobCardsc__JobcardContainer-sc-hmqj50-0.iirqVR.CompactOpportunityCardsc__CompactJobCardWrapper-sc-dkg8my-5.hRilQl"
    );

    if (!jobCards.length) {
      console.log("No job listings found on this page.");
      return [];
    }

    console.log(`Found ${jobCards.length} job listings.`);

    const jobLinks = [];
    for (const card of jobCards.toArray()) {
      const link = "https://glints.com" + $(card).find("a").attr("href");

      const job_title = $(card)
        .find("h2.CompactOpportunityCardsc__JobTitle-sc-dkg8my-11.crGNMX")
        .text();

      const company = $(card)
        .find("a.CompactOpportunityCardsc__CompanyLink-sc-dkg8my-13.ciWEKu")
        .text();

      let work_type = $(card)
        .find("div.TagStyle__TagContentWrapper-sc-r1wv7a-1.koGVuk")
        ?.eq(1)
        .text();
      work_type = validWorkTypes.includes(work_type)
        ? work_type
        : "Tidak ditampilkan";

      let working_type = $(card)
        .find("div.TagStyle__TagContentWrapper-sc-r1wv7a-1.koGVuk")
        ?.eq(0)
        .text();
      working_type = validWorkingTypes.includes(working_type)
        ? working_type
        : "Tidak ditampilkan";

      let experience = $(card)
        .find("div.TagStyle__TagContentWrapper-sc-r1wv7a-1.koGVuk")
        ?.eq(2)
        .text();
      experience = validExperience.includes(experience)
        ? experience
        : "Tidak ditampilkan";

      const location = $(card)
        .find("div.CardJobLocation__LocationWrapper-sc-v7ofa9-0.gdyDBb")
        .text();

      const salary =
        $(card)
          .find(
            "span.CompactOpportunityCardsc__SalaryWrapper-sc-dkg8my-31.cdlTsx"
          )
          .text() || "Tidak ditampilkan";

      let link_img = $(card).find("img").attr("src");
      const match = patternImgLink.exec(link_img);
      if (match) {
        link_img = match[2];
      }

      jobLinks.push({
        link,
        job_title,
        company,
        working_type,
        work_type,
        experience,
        location,
        salary,
        link_img: `https://images.glints.com/unsafe/60x0/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/${link_img}`,
      });
    }

    return jobLinks;
  } catch (error) {
    console.error("Error scraping job cards:", error);
    return [];
  }
}

// Function to scrape detailed job information from each job page
async function scrapeJobDetails(link) {
  console.log(`Scraping job details: ${link}`);
  try {
    const response = await axios.get(link);
    const html = response.data;
    const $ = cheerio.load(html);

    const category = $("div.a")?.text().trim() || "Tidak ditampilkan";

    // Scrape study requirement and apply validation
    let study_requirement = $(
      "div.TagStyle__TagContentWrapper-sc-r1wv7a-1.koGVuk"
    )
      ?.eq(2)
      .text()
      .trim();
    // Validate study requirement
    study_requirement = validStudyRequirements.includes(study_requirement)
      ? study_requirement
      : "Tidak ditampilkan";

    const skills =
      $("label.TagStyle__TagContent-sc-66xi2f-0.iFeugN.tag-content")
        .map((_, el) => $(el).text())
        .get()
        .join(", ") || "Tidak ditampilkan";

    const description =
      $("div[data-contents='true']").html() || "Tidak ditampilkan";

    return {
      category,
      study_requirement,
      description,
      skills,
    };
  } catch (error) {
    console.error(`Error scraping job details for ${link}:`, error);
    return {};
  }
}

// Main function
export default async function scrapeGlints() {
  console.log("Starting the scraping process...");
  const cookies = await loginWithPuppeteer(); // Login first to get session cookies
  const baseUrl =
    "https://glints.com/id/opportunities/jobs/explore?country=ID&locationName=All+Cities%2FProvinces&sortBy=LATEST";
  const jobData = [];
  let pageNumber = 1;

  // Buat koneksi MySQL
  const connection = await createConnection();

  while (pageNumber <= 2) {
    console.log(`Scraping page ${pageNumber}...`);
    const url = `${baseUrl}&page=${pageNumber}`;
    const jobLinks = await scrapeJobCards(url, cookies);

    for (const job of jobLinks) {
      console.log(`Scraping details for job: ${job.job_title}`);
      const jobDetails = await scrapeJobDetails(job.link);
      jobData.push({
        id: `gl${jobIdCounter++}`,
        job_title: job.job_title,
        company: job.company,
        work_type: job.work_type,
        working_type: job.working_type,
        experience: job.experience,
        location: job.location,
        salary: job.salary,
        link: job.link,
        link_img: job.link_img,
        ...jobDetails,
      });

      // Gabungkan job card dan detail job
      const fullJobData = {
        ...job,
        ...jobDetails,
      };

      // Simpan ke database
      await insertJobData(connection, fullJobData);
    }

    pageNumber++;
  }
  // Tutup koneksi setelah selesai
  await connection.end();
  console.log("Scraping and insertion completed.");
}

scrapeGlints().catch((error) => console.error(error));
