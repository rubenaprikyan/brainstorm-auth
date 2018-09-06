'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('user', {

            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                default:{
                    type:Sequelize.UUIDv4
                }
            },

            username: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },

            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },

            password: {
                allowNull: false,
                type: Sequelize.STRING
            },

            accessTokenSalt: {
                allowNull: false,
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });

    },

    async down(queryInterface) {
        await queryInterface.dropTable('user');
    }
};