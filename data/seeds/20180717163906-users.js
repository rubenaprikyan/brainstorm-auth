'use strict';

const faker = require('faker');
const _template = require('lodash/template');

const uuid = _template('cf5ef2e7-b7da-41f9-af53-6ebc14a4ee<%= index %>');

const ids = [];

for (let i = 0; i <= 50; i++) {
    ids.push(uuid({ index: i < 10 ? `0${i}` : i }));
}

module.exports = {
    async up(queryInterface) {
        const users = [];

        for (let i = 1; i <= 50; i++) {
            let userId = ids[i];

            users.push({
                id: userId,
                username: faker.internet.userName(),
                email: `brainstorm-test-${i}@mailinator.com`,
                password: '$2a$07$jIHCC.pGmNoGzLIqy07MpOLmVEWkqAyejbTxTTSDATuQ7pjyT.7fG', // hunter
                accessTokenSalt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('user', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user', {
            id: {
                [Sequelize.Op.in]: ids
            }
        });
    }
};
