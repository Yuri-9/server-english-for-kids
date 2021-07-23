/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './src/category/router';
import multer from 'multer';

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/categories', categories);

app.get('/', (req, res) => {
  res.send('hello');
});

// Upload image
app.post('/single', upload.single('profile'), (req, res) => {
  try {
    console.log(req.file);
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
