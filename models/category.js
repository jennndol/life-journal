'use strict';
module.exports = (sequelize, DataTypes) => {
	var Category = sequelize.define('Category', {
		name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty:{
		          args: true,
		          msg: 'Make sure name not empty'
        		},
        		isAlphanumeric:{
		          args: true,
		          msg: 'Only alphanumeric allowed'
        		},
			}
		}
	});

	Category.associate = (models) => {
		Category.belongsToMany(models.Journal, { through: 'CategoryJournal' });
	}

	return Category;
};