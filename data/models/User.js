'use strict';

const _omit = require('lodash/omit');
const bcrypt = require('bcrypt');
const Helper = require('../../components/Helper.js');
const bst = require('brainstormedtoken')
const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            username: {
                allowNull: false,
                type: DataTypes.STRING(50),
                validate: {
                    len: [2, 50],
                    isAlphanumeric: true
                },
                unique: {
                    message: 'username.unique'
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    message: 'email.unique'
                },
                validate: {
                    isEmail: true
                }
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    len: [6]
                }
            },
            accessTokenSalt: {
                type: DataTypes.STRING
            },
        },
        {
            tableName: 'user',
            timestamps: true,
        }
    );

    User.hook('beforeSave', async user => {
        if (!user.isNewRecord && user.changed('password')) {
            user.accessTokenSalt = Helper.generateRandomString(6);
            user.password = await Helper.generatePasshowrdHash(user.password);
        }
    });

    User.prototype.checkPassword = function (password) {
        return this.password && bcrypt.compare(password, this.password);
    };

    User.prototype.generateToken = function () {
        return {
            access: bst.generate(
                {
                    salt: this.accessTokenSalt,
                    id: this.id
                },
                config.get('bstoken:secret'), "20m"
            )
        };
    };

    User.prototype.toJSON = function () {
        let model = this.get();

        let hiddenFields = ['password', 'accessTokenSalt'];

        return _omit(model, hiddenFields)
    };

    return User
};