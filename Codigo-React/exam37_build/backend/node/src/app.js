import express from 'express';
import cors from 'cors';
import booksRouter from './booksRouter.js';

const app = express();

app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

app.use('/api', booksRouter);

app.use(express.static('public'));

app.get('*', (req, res) => res.sendFile('index.html', { root: 'public' }));

app.listen(8080, () => {
  console.log('Books app available in http://localhost:8080');
});