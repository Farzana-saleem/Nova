'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const {DataTypes} = Sequelize;
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING(145),
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			role: {
				type: Sequelize.STRING(45),
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
	},

};
