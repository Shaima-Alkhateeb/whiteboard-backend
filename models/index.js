'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const user = require('./user.model');

const collection = require('../collections/user-comment-routes');

// const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL ; // npm i sqlite3
// const POSTGRES_URL = process.env.DATABASE_URL || 'postgresql://shaima:0000@localhost:5432/postgres'



const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_GOLD_URL || process.env.LOCAL_DATABASE_URL

// ssl
const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} 

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);


// const POSTGRES_URL = 'postgresql://shaima:0000@localhost:5432/postgres';
// const sequelizeOption = { } 

// let sequelize = new Sequelize(POSTGRES_URL);

///////////////////////

sequelize.authenticate().then(() => {
    console.log('Database Connected to postgres')
}).catch((error) => {
    console.log(error)
});

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);
const userModel = user(sequelize, DataTypes);

// Relations
postModel.hasMany(commentModel, {foreignKey: 'postID', sourceKey: 'id'}) // sourceKey, targetKey = primary key
commentModel.belongsTo(postModel, {foreignKey: 'postID', targetKey: 'id'})

userModel.hasMany(commentModel, {foreignKey: 'userID', sourceKey: 'id'})
commentModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'})

userModel.hasMany(postModel, {foreignKey: 'userID', sourceKey: 'id'})
postModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'})

commentModel.addHook('beforeCreate', async (comment) => {
    const user = await userModel.findOne({where: {id: comment.userID}})
    comment.creator = user.userName
})

postModel.addHook('beforeCreate', async (post) => {
    const user = await userModel.findOne({where: {id: post.userID}})
    post.creator = user.userName
})

// collections
const postCollection = new collection(postModel);
const commentCollection = new collection(commentModel);

module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    commentModel: commentModel,
    userModel: userModel
}

//---------------------------------------------
//POSTGRES_URL : postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME

//1. const users = require('./user.model')
//2. const userModel = users(sequelize, DataTypes);
//3. database.users = userModel;
// In one line:
// database.users = require('./user.model')(sequelize, DataTypes);
