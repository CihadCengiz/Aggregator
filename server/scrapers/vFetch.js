const puppeteer = require("puppeteer");
const { Client } = require("pg");
var format = require("pg-format");

async function vFetch() {
  console.log("fetching jobs");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const title = [];
  const company = [];
  const location = [];
  const duration = [];
  const period = [];
  const postdate = [];
  const redirect = [];


    await page.goto(`https://erasmusintern.org/volunteer-opportunities`);

    for (let i = 1; i < 8; i++) {
      console.log(i)
      const [el] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[1]/div/div/h3/a`
      );
      const src = await el.getProperty("textContent");
      const srcTxt = await src.jsonValue();
      console.log(srcTxt);

      if(i===6){
        company.push('unspecified');
      }
      else{
        const [el2] = await page.$x(
          `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[1]/div[1]/div/div/a`
        );
        const src2 = await el2.getProperty("textContent");
        const logoTxt = await src2.jsonValue();
        console.log(logoTxt);
        company.push(logoTxt);
      }


      const [el3] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[1]/div[2]/div/div`
      );
      const src3 = await el3.getProperty("textContent");
      const redirectTxt = await src3.jsonValue();
      console.log(redirectTxt);


      const [el4] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[1]/div[2]/div`
      );
      const src4 = await el4.getProperty("textContent");
      const dateTxt = await src4.jsonValue();
      if(!dateTxt.includes('months')){
        duration.push('unspecified');
      }
      else{
        duration.push(dateTxt);
      }
      console.log(duration[i-1]);

      if(i===4){
        const [periodDate] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[4]/div/div/div/div[2]/div[2]/div[4]/div/div[2]/div/span/span[1]`)
        const [periodDate2] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[4]/div/div/div/div[2]/div[2]/div[4]/div/div[2]/div/span/span[2]`)
        const prd = await periodDate.getProperty("textContent");
        const prd2 = await periodDate2.getProperty("textContent");
        const periodText = await prd.jsonValue();
        const periodText2 = await prd2.jsonValue();
        let periodString = periodText + ' to ' + periodText2;
        console.log(periodString);
        period.push(periodString);

      }
      else{
        const [el5] = await page.$x(
          `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div/span/span[1]`
        );
        const [el5_2] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div/span/span[2]`)
        const src5 = await el5.getProperty("textContent");
        const src5_2 = await el5_2.getProperty("textContent");
        const locationTxt = await src5.jsonValue();
        const locationTxt2 = await src5_2.jsonValue();
        let periodTxt = locationTxt + ' to ' + locationTxt2;
        console.log(periodTxt);
        period.push(periodTxt)
      }

      const [el6] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[2]/div/div`
      );
      const src6 = await el6.getProperty("textContent");
      const companyTxt = await src6.jsonValue();
      console.log(companyTxt);


      const [el7] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[1]/div/div/h3/a`
      );
      const durat = await el7.getProperty("href");
      const drtTxt = await durat.jsonValue();
      console.log(drtTxt);

      title.push(srcTxt);
      location.push(redirectTxt);
      postdate.push(companyTxt);
      redirect.push(drtTxt);
    }


  browser.close();

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
    console.log(`${i}. page done`);
    var text = format(
      "insert into volunteer(title,company,location,duration,period,postdate,redirect) values (%L, %L, %L, %L, %L, %L, %L)",
      title[i],
      company[i],
      location[i],
      duration[i],
      period[i],
      postdate[i],
      redirect[i],
    );

    try {
      const res = await client.query(text);
    } catch (err) {
      console.log(err.stack);
    }
  }
  return {
    title,
    company,
    location,
    duration,
    period,
    postdate,
    redirect,
  };
}

vFetch();

module.exports = vFetch;
