import express from 'express';
import multer from 'multer';
// var upload = multer({ dest: 'uploads/' });
import { Router } from 'express';
const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

// app.use(express.static('public'));
app.use(express.static(__dirname));
const port = 3000;
app.get('/', (req, res) => {
  res.send('hello people');
});

app.post('/single', upload.single('profile'), (req, res) => {
  try {
    console.log(req.file);
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

app.listen(port, () => {
  console.log('listening to the port: ' + port);
});
