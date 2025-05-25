export type Event = {
  year: number;
  description: string;
};

export type Block = {
  id: string;
  title: string;
  events: Event[];
};

export const BLOCKS: Block[] = [
  {
    id: "1",
    title: "Музыка",
    events: [
      { year: 1969, description: "Вудстокский фестиваль" },
      { year: 1981, description: "Появление MTV" },
      { year: 2001, description: "Запуск iTunes" }
    ]
  },
  {
    id: "2",
    title: "Кино",
    events: [
      { year: 1927, description: "Первый звуковой фильм 'Певец джаза'" },
      { year: 1977, description: "Выход 'Звёздных войн'" },
      { year: 2009, description: "Прорыв 3D-кино с 'Аватаром'" }
    ]
  },
  {
    id: "3",
    title: "Наука",
    events: [
      { year: 1953, description: "Открытие структуры ДНК" },
      { year: 1969, description: "Первый человек на Луне" },
      { year: 2012, description: "Открытие бозона Хиггса" }
    ]
  },
  {
    id: "4",
    title: "Спорт",
    events: [
      { year: 1896, description: "Первые современные Олимпийские игры" },
      { year: 1972, description: "Мюнхенская Олимпиада" },
      { year: 2008, description: "Олимпиада в Пекине" }
    ]
  },
  {
    id: "5",
    title: "Культура",
    events: [
      { year: 1924, description: "Открытие музея современного искусства в Нью-Йорке" },
      { year: 1989, description: "Падение Берлинской стены" },
      { year: 2020, description: "Пандемия и цифровизация культуры" }
    ]
  },
  {
    id: "6",
    title: "Технологии",
    events: [
      { year: 1983, description: "Первый мобильный телефон" },
      { year: 2007, description: "Первый iPhone" },
      { year: 2016, description: "Рост искусственного интеллекта" }
    ]
  }
];

export const useBlockEvents = (blockId: string) => {
  const block = BLOCKS.find(b => b.id === blockId);
  return block?.events || [];
};

export const getSortedEvents = (blockId: string) => {
  const events = useBlockEvents(blockId);
  return [...events].sort((a, b) => a.year - b.year);
};
