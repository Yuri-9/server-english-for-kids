import { Router } from 'express';
import { ICategory } from './category';

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

export default router;
