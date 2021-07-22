import { Router } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import path from 'path';
import { ICategory } from './category';
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCaterory,
} from './repository';

const router = Router();

// Get all categories
router.get('/', async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

// Get by id
router.get('/:id', async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  const cat = await getCategoryById(catId);
  if (!cat) {
    return res.sendStatus(405);
  }
  return res.json(cat);
});

// Delete category
router.delete('/:id', async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  try {
    await deleteCategory(catId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// Create new category
router.post('/', async (req, res) => {
  const data = req.body as ICategory;
  if (!data.name) return res.sendStatus(400);
  try {
    const newcategory = await createCategory(data);
    return res.json(newcategory);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update category name
router.put('/:id', async (req, res) => {
  const { newName } = req.body;
  const catId = Number(req.params.id);
  console.log(catId, newName);

  try {
    const category = await updateCaterory(catId, newName);
    res.json(category);
    return category;
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post('/single', upload.single('profile'), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

// router.options('/upload', function (req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.end();
// });

// router.post('/upload', upload.single('avatar'), function (req, res) {
//   console.log('in upload');
//   // if (!req.files)
//   //   return res.status(400).send('No files were uploaded.');
//   const file = req.file;
//   console.log('file', file);

//   console.log('body', req.body);

// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
// var { name } = req.files?.sampleFile as UploadedFile;
// console.log(name);

//  fileName = req.files.sampleFile.name;

// // Use the mv() method to place the file somewhere on your server
// sampleFile.mv(path.join(__dirname+ '/../public', 'Images/')+fileName, function(err) {
//   if (err)
//     return res.status(400).send(err);

//   res.render('index',{isUploaded: true, fileName: fileName, title: 'Express Cheque Processing System '});
// });

// // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
// console.log(req.files?.file);

// const startup_image = req.files?.foo as UploadedFile;
// console.log(startup_image);
// const fileName = req.body.fileName;
// // Use the mv() method to place the file somewhere on your server
// if (startup_image)
//   startup_image.mv(__dirname + '/images/' + fileName + '.jpg', function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('uploaded');
//     }
//   });
// });

export default router;
