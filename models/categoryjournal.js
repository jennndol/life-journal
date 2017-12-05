'use strict';
module.exports = (sequelize, DataTypes) => {
  var CategoryJournal = sequelize.define('CategoryJournal', {
    JournalId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  });
  return CategoryJournal;
};