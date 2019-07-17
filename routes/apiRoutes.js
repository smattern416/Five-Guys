var db = require("../models");
const axios = require("axios");
var sequelize = require("sequelize");
module.exports = function (app) {
  //main search function  
  //search api for json response and save all the jobs we got from api to our database
  //save jobs and update the times these jobs have been searched 
  app.get("/api/jobs/search", function (req, res) {
    //get api res json and render to client
    let queryUrl = "https://jobs.github.com/positions.json?description=" + req.query.title + "&location=" + req.query.location;
    axios.get(queryUrl).then(function (response) {
      res.json(response.data);
      //database side
      //search through database to update or insert 
      var jobs = response.data;
      console.log(jobs.length);
      
      for (let index = 0; index < jobs.length; index++) {
        db.Jobs.findOne({
          where : {
            jobId : jobs[index].id
          }
        }).then(function(results){
          
          if (results != null) {
              //this job exists in our database
              db.Jobs.increment(
                `searchCount`,
                {
                where : {
                  jobId : jobs[index].id
                }
              }).then(function(){
                console.log();
                
                console.log("update success");
              });
          }else{
            //new job 
            
            db.Jobs.create({
              jobId : jobs[index].id,
              type : jobs[index].type,
              url : jobs[index].url,
              created_at : jobs[index].created_at,
              company : jobs[index].company,
              company_url : jobs[index].company_url,
              location : jobs[index].location,
              title : jobs[index].title,
              description : jobs[index].description,
              how_to_apply : jobs[index].how_to_apply,
              company_logo : jobs[index].company_logo,

            }).then(function(){
              console.log("insert" + index+ "success");
              
            });
          }
        });
      }
    });

  });
//get most searched jobs
 app.get("/api/mostsearched",function(req,res){
  db.Jobs.findAll({
    //order jobs by searchCount
    order : [[`searchCount`,`DESC`]]
  }).then(function(results){
    //render topfive as json 
    let topFive = [];
    for (let index = 0; index < 5; index++) {
      topFive.push(results[index]);
    }
    res.json(topFive);
  });
 });
 //get most searched jobs by location or just location
 app.get("/api/",function(req,res){

});
 //get all faved jobs favcount >0
 app.get("/api/favorite",function(req,res){
    db.Jobs.findAll({
      where : {
        favCount : {
          [sequelize.Op.gt] : 0
        }
      }
    }).then(function(results){
      res.json(results);
    });
});
//order by favCount and search favcount >0 
app.get("/api/mostFav",function(req,res){
  db.Jobs.findAll({
    where : {
      favCount : {
        [sequelize.Op.gt] : 0
      }
    },
    order : [[`favCount`,`DESC`]]
  }).then(function(results){
    res.json(results);
  });
});
app.post("/api/fav",function(req,res){
    //update fav count here

    //use increment to add 1 to col
    db.Jobs.increment(
      `favCount`,
      {
      where : {
        id : req.body.id
      }
    }).then(function(){
        console.log("increment success");
        
    });
});
//give back all the states
app.get("/api/states",function(req,res){
    //
});
};