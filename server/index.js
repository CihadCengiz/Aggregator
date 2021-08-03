const express = require("express");
var cors = require("cors");
const sequelize = require("./api/database/db");
const Jobs = require("./api/model/Jobs");
var cron = require("node-cron");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log("db is ready"));


app.get("/jobs", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const getLocation = req.query.location;
  const getDegree = req.query.degree;
  const getDOpp = req.query.dopportunities;
  const getfOStd = req.query.fofstd;
  const getDuration = req.query.duration;
  const Op = sequelize.Sequelize.Op;

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
    size = sizeAsNumber;
  }

  const jobs = await Jobs.findAndCountAll({
    limit: size,
    offset: page * size,
    order: [['id', 'ASC'],['postdate', 'DESC']],
    where: {
      location: getLocation ? { [Op.like]: `%${getLocation.toUpperCase()}%` } : { [Op.ne]: null },
      degree: getDegree ? { [Op.like]: {[Op.any]: [`${getDegree[0]}`,`${getDegree[1]}`,`${getDegree[2]}`,`${getDegree[3]}`]} } : { [Op.ne]: null },
      dopportunities: getDOpp ? {  [Op.like]: {[Op.any]: [`%${getDOpp[0]}%`,`%${getDOpp[1]}%`]} }  : { [Op.ne]: null },
      fofstd: getfOStd ? {  [Op.like]: {[Op.any]: [`%${getfOStd[0]}%`,`%${getfOStd[1]}%`,`%${getfOStd[2]}%`,`%${getfOStd[3]}%`,`%${getfOStd[4]}%`,`%${getfOStd[5]}%`,`%${getfOStd[6]}%`,`%${getfOStd[7]}%`,`%${getfOStd[8]}%`,`%${getfOStd[9]}%`,`%${getfOStd[10]}%`,`%${getfOStd[11]}%`,`%${getfOStd[12]}%`,`%${getfOStd[13]}%`]} }  : { [Op.ne]: null },
      duration: getDuration ? {  [Op.like]: {[Op.any]: [`%${getDuration[0]}%`,`%${getDuration[1]}%`,`%${getDuration[2]}%`,`%${getDuration[3]}%`,`%${getDuration[4]}%`,`%${getDuration[5]}%`,`%${getDuration[6]}%`,`%${getDuration[7]}%`,`%${getDuration[8]}%`,`%${getDuration[9]}%`,`%${getDuration[10]}%`]} }  : { [Op.ne]: null },
    }
  });
  res.send({
    content: jobs.rows,
    totalPages: Math.ceil(jobs.count / size),
    totalJobs: jobs.count,
  });
  currentDegree=[]
});

// cron.schedule('*/5 * * * *', () => scrapeProduct('https://erasmusintern.org/traineeships','http://globalplacement.com/en/search-internships'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
