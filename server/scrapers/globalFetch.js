const puppeteer = require("puppeteer");
const { Client } = require("pg");
let fetch = require("node-fetch");
const date = require("date-and-time");
var format = require("pg-format");

async function globalFetch() {
  console.log("fetching jobs");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const title = [];
  const logo = [];
  const redirect = [];
  const location = [];
  const fofstd = [];
  const duration = ["Check details."];
  const postdate = [];
  const degree = ["Check details."];
  const company = ["Check details."];
  const dOpp = ["Check details."];
  const deadline = ["Check details."];

  for (let k = 1; k < 123; k++) {
    await page.goto(
      `http://globalplacement.com/en/search-internships/page:${k}`
    );

    for (let i = 1; i <= 10; i++) {
      //title
      const [el] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[1]`
      );
      const src = await el.getProperty("textContent");
      const srcTxt = await src.jsonValue();
      let slicedTxt = srcTxt.slice(15, -1)
      title.push(slicedTxt);

      //logo
      const [el2] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[1]/img`
      );
      const src2 = await el2.getProperty("src");
      const src2Txt = await src2.jsonValue();
      logo.push(src2Txt);

      //redirect
      const [el3] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[2]/div/a`
      );
      const src3 = await el3.getProperty("href");
      const src3Txt = await src3.jsonValue();
      redirect.push(src3Txt);

      //location
      const [el4] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[2]/div[1]/div[1]`
      );
      const src4 = await el4.getProperty("textContent");
      const src4Txt = await src4.jsonValue();
      let splitTxt = src4Txt.split(',')[1];
      location.push(splitTxt);

      //fofstd
      const [el5] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[2]/div[2]/div[1]`
      );
      const src5 = await el5.getProperty("textContent");
      const src5Txt = await src5.jsonValue();
      let splitFof = src5Txt.split(": ")[1];
      fofstd.push(splitFof);
    }
    console.log("page done");
  }
  async function getDates() {
    const response = await fetch("http://localhost:3001/dates");
    const data = await response.json();
    const dataObj = await Object.values(data);
    for (let i = 0; i < 1000; i++) {
      postdate.push(dataObj[i].postdate);
    }
  }
  await getDates();

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  let dateArr = [];
  for(let i = 0; i<title.length-postdate.length; i++) {
    let rnDate = randomDate(new Date(2021, 8, 6), new Date(2019, 3, 18));
    let frmDate = date.format(rnDate, "YYYY-MM-DD");
  
    dateArr.push(frmDate);
  }

  browser.close();

  for(let i = 0; i<dateArr.length; i++) {
    postdate.push(dateArr[i]);
  }

  let CONNECTION_STRING =
    "postgres://jiaiekzoqqamwn:e36491bd97c736367fef6654ae6ecec72b958ced71ca0eda10b836b494d5845f@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d8e1j40rfmrbkj";

  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  for (let i = 0; i < title.length; i++) {
    var text = format(
      "insert into global(title,logo,redirect,postdate,location,company,degree,fofstd,dopportunities,duration,deadline) values (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)",
      title[i],
      logo[i],
      redirect[i],
      postdate[i],
      location[i],
      company[0],
      degree[0],
      fofstd[i],
      dOpp[0],
      duration[0],
      deadline[0],
    );

    try {
      const res = await client.query(text);
    } catch (err) {
      console.log(err.stack);
      console.log(postdate.length)
    }
  }
  console.log(`database done`);
}

globalFetch();

module.exports = globalFetch;
