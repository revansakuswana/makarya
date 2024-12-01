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
        INSERT INTO jobs (job_title, company, work_type, working_type, experience, location, salary, link, link_img, category, study_requirement, skills, description, createdAt, updatedAt)
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
          updatedAt = CURRENT_TIMESTAMP
    `;

  const values = [
    job.job_title || null,
    job.company || null,
    job.work_type || null,
    job.working_type || null,
    job.experience || null,
    job.location || null,
    job.salary || null,
    job.link || null,
    job.link_img || null,
    job.category || null,
    job.study_requirement || null,
    job.skills || null,
    job.description || null,
  ];

  try {
    await connection.execute(query, values);
    console.log(`Job ${job.job_title} inserted/updated successfully.`);
  } catch (error) {
    console.error("Error inserting job data:", error);
  }
}

const studyRequirementMapping = {
  "Lulus SMA": "Minimal SMA/SMK",
  "program Vokasi (D3)": "Minimal Diploma (D1 - D4)",
  "Lulus program Diploma (D3)": "Minimal Diploma (D1 - D4)",
  "Lulus program Sarjana (S1)": "Minimal Sarjana (S1)",
  "Lulus program Magister (S2)": "Minimal Magister (S2)",
  "Lulus program Doktor (S3)": "Minimal Doktor (S3)",
};

const workTypeMapping = {
  "Penuh waktu": "Penuh Waktu",
  "Paruh waktu": "Paruh Waktu",
  "Pekerja lepas / Freelance": "Freelance",
};

const convertStudyRequirement = (requirement) => {
  return studyRequirementMapping[requirement] || requirement;
};

const convertWorkType = (type) => {
  return workTypeMapping[type] || type;
};

export default async function scrapeKalibrr(numPagesToScrape = 2) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseUrl = "https://www.kalibrr.com/id-ID/home/all-jobs";
  let jobData = [];

  const connection = await createConnection();

  const fetchData = async (url) => {
    console.log(`Fetching page: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log(`Page loaded: ${url}`);
  };

  const scrapePage = async (pageNumber) => {
    let idCounter = 1;
    const url = `${baseUrl}?page=${pageNumber}`;
    console.log(`Scraping page ${pageNumber}...`);
    await fetchData(url);

    const jobCards = await page.$$(
      ".k-font-dm-sans.k-rounded-lg.k-bg-white.k-border-solid.k-border"
    );

    if (jobCards.length === 0) {
      console.log(`No job listings found on page ${pageNumber}. Exiting.`);
      return;
    }

    console.log(`Found ${jobCards.length} job cards on page ${pageNumber}.`);

    for (let card of jobCards) {
      let jobDetails = {};

      const jobLinkElement = await card.$(".k-text-black");
      const jobLink = await jobLinkElement.evaluate((el) => el.href);
      console.log(`Scraping job details from: ${jobLink}`);

      const response = await axios.get(jobLink);
      const $ = cheerio.load(response.data);

      const companyNameElement = await card.$("a.k-text-subdued.k-font-bold");
      const companyName = await companyNameElement.evaluate((el) =>
        el.textContent.trim()
      );

      const jobTitleElement = await card.$('a[itemprop="name"]');
      const jobTitle = await jobTitleElement.evaluate((el) =>
        el.textContent.trim()
      );

      const locationElement = await card.$("span.k-text-gray-500");
      const location = locationElement
        ? await locationElement.evaluate((el) => el.textContent.trim())
        : "Location Not Specified";

      const salaryElement = await card.$("span.k-text-subdued");
      let salary = salaryElement
        ? await salaryElement.evaluate((el) => el.textContent.trim())
        : "Tidak ditampilkan";
      salary = salary.replace(/\/ month|\/ bulan/gi, "").trim();

      const grayTextElements = await card.$$("span.k-text-gray-500");
      const work_type = grayTextElements[1]
        ? await grayTextElements[1].evaluate((el) => el.textContent.trim())
        : "Tidak ditampilkan";

      const category =
        $('span[itemprop="industry"]').text().trim() || "Tidak ditampilkan";

      const working_type =
        $("a.k-remote-work-tag span").text().trim() || "Tidak ditampilkan";

      const description = $('div[itemprop="description"]').html();

      const study_requirement = [];
      $("dd.k-inline-flex.k-items-center").each((_, el) => {
        study_requirement.push($(el).text());
      });

      const experience = [];
      $("dd.k-inline-flex.k-items-center").each((_, el) => {
        experience.push($(el).text());
      });

      const imgElement = $(
        "img.k-block.k-max-w-full.k-max-h-full.k-bg-white.k-mx-auto"
      ).attr("src");

      jobDetails["id"] = `kb${idCounter++}`;
      jobDetails["job_title"] = jobTitle;
      jobDetails["company"] = companyName;
      jobDetails["category"] = category;
      jobDetails["location"] = location;
      jobDetails["work_type"] =
        convertWorkType(work_type) || "Tidak ditampilkan";
      jobDetails["working_type"] = working_type || "Tidak ditampilkan";
      jobDetails["salary"] = salary;
      jobDetails["skills"] = "Tidak ditampilkan";
      jobDetails["study_requirement"] =
        convertStudyRequirement(study_requirement[2]) || "Tidak ditampilkan";
      jobDetails["experience"] = experience[0] || "Tidak ditampilkan";
      jobDetails["description"] = description;
      jobDetails["link"] = jobLink;
      jobDetails["link_img"] = imgElement || "Tidak ditampilkan";

      console.log(`Job scraped: ${jobTitle} at ${companyName}`);
      jobData.push(jobDetails);

      await insertJobData(connection, jobDetails);
    }

    console.log(
      `Total jobs scraped from page ${pageNumber}: ${jobCards.length}`
    );
  };

  for (let i = 1; i <= numPagesToScrape; i++) {
    console.log(`Processing page ${i} of ${numPagesToScrape}`);
    await scrapePage(i);
  }

  console.log(`Total jobs scraped: ${jobData.length}`);

  await connection.end();
  await browser.close();
}
