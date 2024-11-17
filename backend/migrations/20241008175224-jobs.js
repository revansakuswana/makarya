'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      job_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      work_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      working_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      experience: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Menambahkan UNIQUE constraint
      },
      link_img: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      study_requirement: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      skills: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  },
};