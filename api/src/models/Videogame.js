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
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image_background: { type: DataTypes.STRING },
		released: {
			type: DataTypes.DATEONLY,
		},
		rating: {
			type: DataTypes.REAL,
		},
		platforms: {
			type: DataTypes.STRING,
			get: function () {
				return JSON.parse(this.getDataValue('platforms')); //jsoneo el string guardado para devolver un array
			},
			set: function (arr) {
				return this.setDataValue('platforms', JSON.stringify(arr)); //estringueo el array que entra para guardarlo como str
			},
			allowNull: false,
		},
		created: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
