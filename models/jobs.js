module.exports = function (sequelize, DataTypes) {
  var Jobs = sequelize.define("Jobs", {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
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