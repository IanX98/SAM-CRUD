import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

try {
    app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
} catch (err) {
    console.error('Error Starting App:', err);
}
