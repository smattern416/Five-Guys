var db = require("../models");
const axios = require("axios");

module.exports = function (app) {

  app.get("/api/jobs/search", function (req, res) {
    let queryUrl = "https://jobs.github.com/positions.json?description=" + req.query.title + "&location=" + req.query.location;

    db.Jobs.findOne({
      where: {
        title: req.query.title,
        location: req.query.location
      }
    }).then(function (job) {
      if (job !== null) {
        db.Jobs.update({
          searchCount: job.searchCount + 1
        }, {
          where: {
            id: job.id
          }
        })
      } else {
        db.Jobs.create({
          title: req.query.title,
          location: req.query.location
        });
      }
    });

    axios.get(queryUrl).then(function (response) {
      res.json(response.data);
    });

  });

  // Post the relevant job searches from the query to the database
  app.post("/api/results", function (req, res) {
    db.jobs.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  // Get all 
  app.get("/api/", function (req, res) {
    db.Example.findAll({}).then(function (data) {
      res.json(data);
    });
  });



};