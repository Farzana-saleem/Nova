'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const {DataTypes} = Sequelize;
		await queryInterface.createTable('profiles', {
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sequelize.INTEGER(45),
				allowNull: false,
				unique: true
			},
			profileId: {
				type: Sequelize.STRING(45),
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING(45),
				allowNull: true
			},
			doc: {
				type: Sequelize.STRING(255),
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
		await queryInterface.dropTable('profiles');
	}

};
