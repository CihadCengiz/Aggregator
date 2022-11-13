const { Client } = require("pg");
var format = require("pg-format");
const date = require('date-and-time');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let amk = randomDate(new Date(2021, 8, 6), new Date(2019, 3, 18));
let asd = date.format(amk, 'YYYY-MM-DD');
console.log(asd)

const postdate = [];
postdate.push(asd);


async function generateDate() {
let CONNECTION_STRING =
      "postgres://jiaiekzoqqamwn:e36491bd97c736367fef6654ae6ecec72b958ced71ca0eda10b836b494d5845f@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d8e1j40rfmrbkj";

    const client = new Client({
      connectionString: CONNECTION_STRING,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    client.connect();

      var text = format(
        "insert into global(postdate) values (%L)",
        postdate[0],
      );

      try {
        const res = await client.query(text);
      } catch (err) {
        console.log(err.stack);
      }
}

generateDate();