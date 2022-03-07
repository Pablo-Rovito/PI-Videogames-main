const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV1,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'missing name',
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 'missing description',
		},
		rating: {
			type: DataTypes.REAL,
			allowNull: false,
			defaultValue: 0,
		},
		background_image: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'missing image',
		},
		released: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: 1969/12/31,
		},
		platforms: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ['no platforms found'],
			get: function () {
				return JSON.parse(this.getDataValue('platforms'));
			},
			set: function (arr) {
				return this.setDataValue('platforms', JSON.stringify(arr));
			},
		},
		short_screenshots: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ['no images found'],
			get: function () {
				return JSON.parse(this.getDataValue('short_screenshots'));
			},
			set: function (arr) {
				return this.setDataValue(
					'short_screenshots',
					JSON.stringify(arr)
				);
			},
		},
		created: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
