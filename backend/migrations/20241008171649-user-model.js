'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      verification_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verification_expires: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reset_password_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reset_password_expires: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "",
      },
      education: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "",
      },
      skills: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "",
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};