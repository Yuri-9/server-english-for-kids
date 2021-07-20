/* eslint-disable no-console */
// import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import categories from './category/router';
// import items from './item/router';

const app = express();
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/categories', categories);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
