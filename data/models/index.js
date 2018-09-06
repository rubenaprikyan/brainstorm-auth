'use strict';

const fs = require('fs');
const path = require('path');
const _words = require('lodash/words');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../../config');
const db = {};

const sequelize = new Sequelize(config.get('db:database'), config.get('db:username'), config.get('db:password'), {
    host: config.get('db:host'),
    dialect: 'postgres',
    logging: config.get('db:logging')
});

fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

    if (db[modelName].addScopes) {
        db[modelName].addScopes(db);
    }

    db[modelName]['generateNestedQuery'] = query => {
        return sequelize.literal(
            `(${sequelize
                .getQueryInterface()
                .QueryGenerator.selectQuery(db[modelName].getTableName(), query)
                .slice(0, -1)})`
        );
    };
});

db.generateSearchQuery = (string, fields = ['username', 'firstName', 'lastName']) => {
    const permArr = [];
    const newArray = [];
    const usedChars = [];

    let strings = _words(string);

    if (strings.length > 5) {
        strings = [
            strings[0],
            strings[1],
            strings[2],
            strings[3],
            strings[4],
            strings.slice(5, strings.length).join(' ')
        ];
    }

    for (let i = 0; i < fields.length; i++) {
        newArray.push(sequelize.col(fields[i]));
        if (fields.length !== i + 1) {
            newArray.push(' ');
        }
    }

    const columns = sequelize.fn('concat', ...newArray);

    function generateQueryString(input) {
        let i, ch;

        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length === 0) {
                permArr.push(
                    sequelize.where(columns, {
                        ilike: `%${usedChars.slice().join('%')}%`
                    })
                );
            }
            generateQueryString(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }

        return permArr;
    }

    return {
        [sequelize.Op.or]: generateQueryString(strings)
    };
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
