/* eslint-disable no-console */
// import path from 'path';
import express from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';

import categories from './category/router';
// import items from './item/router';

// const corstOpts = cors({ origin: true });

const app = express();
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
// app.use(fileUpload());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

app.use('/api/categories', categories);

app.get('/', (req, res) => {
  res.send('hello');
});

//middleware
// app.use(express.static(__dirname));
// app.set('view engine', 'ejs');
// app.use(fileUpload());

// app.get('/inputFile', function (req, res) {
//   res.render('input');
// });

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
