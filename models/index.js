const Sequelize = require('sequelize');
const db = new Sequelize(
  'postgres://localhost:5432/wikistack'
  //,{logging: false}}
);
const slugify = require('sequelize-slugify');

//Page model
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

slugify.slugifyModel(Page, {
  source: ['title'],
});

//User model
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { db };
