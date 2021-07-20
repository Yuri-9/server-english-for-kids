export interface ICategory {
  id: number;
  name: string;
  words: IWord[];
}

interface IWord {
  word: string;
  translation: string;
}
