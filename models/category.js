'use strict';
module.exports = (sequelize, DataTypes) => {
	var Category = sequelize.define('Category', {
		name: DataTypes.STRING
	});

	Category.associate = (models) => {
		Category.belongsToMany(models.Journal, { through: 'CategoryJournal' });
	}

	return Category;
};