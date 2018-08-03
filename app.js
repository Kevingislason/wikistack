const { db } = require('./models/index.js');
const morgan = require('morgan');
const express = require('express');
const layout = require('./views/layout.js');
const app = express();

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  await db.sync({ force: true });

  // Server config
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
