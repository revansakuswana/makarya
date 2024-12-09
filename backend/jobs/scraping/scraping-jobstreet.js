import puppeteer from "puppeteer";
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
    console.log(`Jobs ${job.job_title} inserted/updated successfully.`);
  } catch (error) {
    console.error("Error inserting job data:", error);
  }
}

const base_url = "https://www.jobstreet.co.id/id/jobs";

let job_data = [];
let job_id_counter = 0;

// Fungsi untuk mengambil data pekerjaan dari halaman
async function fetchJobData(page, url) {
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "domcontentloaded" });

  console.log("Fetching job links...");
  const jobCards = await page.$$eval(
    "div._1tghpaf0._1bnjhlp4z._1bnjhlp4x",
    (cards) => {
      return cards.map((card) => {
        const anchorTag = card.querySelector("a");
        const jobLink = anchorTag ? anchorTag.getAttribute("href") : null;
        return {
          link: jobLink ? "https://www.jobstreet.co.id" + jobLink : null,
        };
      });
    }
  );

  const validJobCards = jobCards.filter((card) => card.link !== null);
  console.log(`Found ${validJobCards.length} job links.`);

  for (const card of validJobCards) {
    const job_link = card.link;

    const job_id = `jt${job_id_counter}`;
    console.log(`Scraping job details from ${job_link}...`);
    try {
      await page.goto(job_link, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
    } catch (error) {
      console.error(`Error navigating to ${job_link}:`, error);
      continue;
    }
    const jobDetails = await page.evaluate((job_link) => {
      const job_title = document.querySelector(
        'h1[data-automation="job-detail-title"]'
      );

      const company = document.querySelector(
        'span[data-automation="advertiser-name"]'
      );

      const category = document.querySelector(
        'span[data-automation="job-detail-classifications"]'
      );

      const location = document.querySelector(
        'span[data-automation="job-detail-location"]'
      );

      const work_type_element = document.querySelector(
        'span[data-automation="job-detail-work-type"]'
      );

      const work_type = work_type_element
        ? work_type_element.innerText.trim() === "Full time"
          ? "Penuh Waktu"
          : work_type_element.innerText.trim()
        : "Tidak Ditampilkan";

      const salary = document.querySelector(
        'span[data-automation="job-detail-salary"]'
      );

      const desc = document.querySelector(
        'div[data-automation="jobAdDetails"]'
      );

      const link_img = document.querySelector("img");

      let scraped_text = "";
      if (desc) {
        const elements = desc.querySelectorAll("p, ul, li, ol");
        const content = [...elements].map((el) => el.outerHTML).join("");
        scraped_text = content;
      }

      return {
        job_title: job_title ? job_title.innerText : "Tidak Ditampilkan",
        company: company ? company.innerText : "Tidak Ditampilkan",
        category: category ? category.innerText : "Tidak Ditampilkan",
        location: location ? location.innerText.trim() : "Tidak Ditampilkan",
        work_type: work_type,
        working_type: "Tidak ditampilkan",
        salary: salary
          ? salary.innerText.replace(/per month/gi, "").trim()
          : "Tidak ditampilkan",
        experience: "Tidak ditampilkan",
        skills: "Tidak ditampilkan",
        study_requirement: "Tidak ditampilkan",
        description: scraped_text,
        link: job_link,
        link_img: link_img ? link_img.src : "Tidak Ditampilkan",
      };
    }, job_link);

    jobDetails.id = job_id;
    job_data.push({
      id: job_id,
      ...jobDetails,
    });

    console.log(`Job ID ${job_id} scraped successfully.`);
    job_id_counter++;
  }
}

// Fungsi utama untuk menjalankan scraping dan memasukkan data ke database
export default async function scrapeJobstreet() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const connection = await createConnection();

  let page_number = 1;
  while (page_number < 2) {
    const url = `${base_url}?page=${page_number}`;
    console.log(`Scraping page ${page_number}...`);
    await fetchJobData(page, url);
    page_number++;
  }

  await browser.close();

  if (job_data.length > 0) {
    console.log("Data has been scraped successfully.");
    for (const job of job_data) {
      await insertJobData(connection, job);
    }
    await connection.end();
    console.log("Data has been inserted into the database.");
  } else {
    console.log("No job data found to save.");
  }
}
scrapeJobstreet().catch(console.error);
