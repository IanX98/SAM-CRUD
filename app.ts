const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./db/database');

const Snack = require('./models/snack');
const Ingredient = require('./models/ingredient');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const ingredientRoutes = require('./context/ingredientRouter');
const snackRoutes = require('./context/snackRouter');
const errorController = require('./controllers/error.controller');

app.use(ingredientRoutes);
app.use(snackRoutes);

app.use(errorController.pageNotFound);
app.use((err: any, res: any) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });

Snack.hasMany(Ingredient);

const PORT = 3000;

try {
    Promise.all([sequelize.sync()])
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    console.log('DATABASES CONNECTED');
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  }
