const path = require('path');

import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const snackRoutes = require('./context/snackRouter');
const errorController = require('./controllers/error.controller');

app.use(snackRoutes);

app.use(errorController.pageNotFound);
app.use((err: any, res: any) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
const PORT = 3000;

// app.get('/', (req, res) => {
//   res.render('home');
// });

try {
    app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
} catch (err) {
    console.error('Error Starting App:', err);
}
