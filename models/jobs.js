module.exports = function (sequelize, DataTypes) {
  var Jobs = sequelize.define("Jobs", {
    //condition to update or insert 
    jobId : DataTypes.STRING,
    //info to render to show exact faved jobs
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    city : DataTypes.STRING,
    state : DataTypes.STRING,
    url : DataTypes.STRING,
    created_at : DataTypes.STRING,
    company : DataTypes.STRING,
    company_url : DataTypes.STRING,
    description : DataTypes.TEXT,
    how_to_apply : DataTypes.STRING,
    company_logo : DataTypes.STRING,
    //favedState
    favCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    searchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });
  return Jobs;
};
