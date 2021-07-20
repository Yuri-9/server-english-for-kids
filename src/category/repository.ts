import { ICategory } from './category';

const categories: ICategory[] = [
  {
    id: 1,
    name: 'animals',
    words: [
      { word: 'zebra', translation: 'зебра' },
      { word: 'lion', translation: 'лев' },
      { word: 'monkey', translation: 'обезьяна' },
      { word: 'elephant', translation: 'слон' },
      { word: 'giraffe', translation: 'жираф' },
      { word: 'cat', translation: 'кот' },
      { word: 'dog', translation: 'собака' },
      { word: 'turtle', translation: 'черепаха' },
    ],
  },
  {
    id: 2,
    name: 'actions',
    words: [
      { word: 'draw', translation: 'рисовать' },
      { word: 'jump', translation: 'прыгать' },
      { word: 'run', translation: 'бегать' },
      { word: 'sleep', translation: 'спать' },
      { word: 'sit', translation: 'сидеть' },
      { word: 'swim', translation: 'плыть' },
      { word: 'fly', translation: 'летать' },
      { word: 'read', translation: 'читать' },
    ],
  },
  {
    id: 3,
    name: 'things',
    words: [
      { word: 'ball', translation: 'мяч' },
      { word: 'chair', translation: 'стул' },
      { word: 'table', translation: 'стол' },
      { word: 'bed', translation: 'кровать' },
      { word: 'carpet', translation: 'ковер' },
      { word: 'television', translation: 'телевизор' },
      { word: 'radio', translation: 'радио' },
      { word: 'refrigerator', translation: 'холодильник' },
    ],
  },
  {
    id: 4,
    name: 'clothes',
    words: [
      { word: 'skirt', translation: 'юбка' },
      { word: 'pants', translation: 'брюки' },
      { word: 'hat', translation: 'кепка' },
      { word: 'dress', translation: 'платье' },
      { word: 'boot', translation: 'ботинок' },
      { word: 'shirt', translation: 'рубашка' },
      { word: 'coat', translation: 'пальто' },
      { word: 'shoe', translation: 'туфли' },
    ],
  },
  {
    id: 5,
    name: 'emoticons',
    words: [
      { word: 'sad', translation: 'грустный' },
      { word: 'angry', translation: 'сердитый' },
      { word: 'happy', translation: 'счастливый' },
      { word: 'tired', translation: 'уставший' },
      { word: 'surprised', translation: 'удивлённый' },
      { word: 'scared', translation: 'испуганный' },
      { word: 'smile', translation: 'улыбка' },
      { word: 'laugh', translation: 'смех' },
    ],
  },
  {
    id: 6,
    name: 'food',
    words: [
      { word: 'bread', translation: 'хлеб' },
      { word: 'cake', translation: 'торт' },
      { word: 'juice', translation: 'сок' },
      { word: 'meat', translation: 'мясо' },
      { word: 'chips', translation: 'чипсы' },
      { word: 'egg', translation: 'яйцо' },
      { word: 'sweet', translation: 'конфета' },
      { word: 'pizza', translation: 'пицца' },
    ],
  },
  {
    id: 7,
    name: 'weather',
    words: [
      { word: 'sun', translation: 'солнце' },
      { word: 'cloud', translation: 'облако' },
      { word: 'rainbow', translation: 'радуга' },
      { word: 'wind', translation: 'ветер' },
      { word: 'rain', translation: 'дождь' },
      { word: 'snow', translation: 'снег' },
      { word: 'lightning', translation: 'молния' },
      { word: 'hot', translation: 'жарко' },
    ],
  },
  {
    id: 8,
    name: 'fruits',
    words: [
      { word: 'apple', translation: 'яблоко' },
      { word: 'pear', translation: 'груша' },
      { word: 'plum', translation: 'слива' },
      { word: 'cherry', translation: 'вишня' },
      { word: 'lemon', translation: 'лимон' },
      { word: 'orange', translation: 'апельсин' },
      { word: 'pineapple', translation: 'ананас' },
      { word: 'banana', translation: 'банан' },
    ],
  },
];

const newId = (function () {
  let id = categories.length;
  return () => id++;
})();

export function getCategories(): Promise<ICategory[]> {
  return Promise.resolve(categories);
}

export function getCategoryById(id: number): Promise<ICategory | undefined> {
  const category = categories.find((cat) => cat.id === id);
  return Promise.resolve(category);
}

export function deleteCategory(id: number): Promise<void> {
  const categoryIndex = categories.findIndex((cat) => cat.id === id);
  if (categoryIndex < 0) return Promise.reject(new Error('Category not found'));
  categories.splice(categoryIndex, 1);
  return Promise.resolve();
}

export function createCategory(data: ICategory): Promise<ICategory> {
  const isExists = categories.findIndex((cat) => cat.name === data.name) >= 0;
  if (isExists) {
    return Promise.reject(new Error(`Category with name ${data.name} already exists`));
  }
  const newCategory: ICategory = {
    ...data,
    id: newId(),
  };
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}

export function updateCaterory(id: number, newName: string): Promise<ICategory | undefined> {
  // const category = categories.find(
  //   (cat) => cat.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  // );
  // if (!category) return Promise.reject(new Error('Category not found'));

  const category = categories.find((cat) => cat.id === id);
  if (category) category.name = newName;

  return Promise.resolve(category);
}
