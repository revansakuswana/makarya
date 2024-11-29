'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('articles', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,  // pastikan kolom ini tidak boleh null
      references: {
        model: 'users',  // nama tabel yang dirujuk
        key: 'id',       // kolom yang dirujuk
      },
      onDelete: 'CASCADE',  // Jika user dihapus, artikel yang terkait juga dihapus
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('articles', 'userId');
  },
};
