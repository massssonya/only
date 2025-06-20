export type Event = {
	year: number;
	text: string;
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
			{
				year: 1969,
				text: "Фестиваль Вудсток стал символом контркультуры, собрав более 400 000 человек на трёхдневное музыкальное событие в США."
			},
			{
				year: 1981,
				text: "Запущен музыкальный телеканал MTV, навсегда изменивший способ потребления музыкального контента."
			},
			{
				year: 2001,
				text: "Apple запустила iTunes, что радикально изменило способ покупки и прослушивания музыки по всему миру."
			},
			{
				year: 2016,
				text: "Бейонсе выпустила альбом «Lemonade», который стал культурным феноменом и вызвал широкий общественный резонанс."
			},
			{
				year: 2020,
				text: "Пандемия COVID-19 привела к росту популярности онлайн-концертов и стриминговых платформ, таких как Twitch и YouTube."
			}
		]
	},
	{
		id: "2",
		title: "Кино",
		events: [
			{
				year: 1927,
				text: "Выход первого звукового фильма «Певец джаза», ознаменовавшего начало новой эры в кинематографе."
			},
			{
				year: 1977,
				text: "Мировая премьера фильма «Звёздные войны» изменила подход к спецэффектам и поп-культуре."
			},
			{
				year: 2009,
				text: "Фильм «Аватар» Джеймса Кэмерона стал прорывом в 3D-технологиях и визуальных эффектах."
			}
		]
	},
	{
		id: "3",
		title: "Наука",
		events: [
			{
				year: 1953,
				text: "Уотсон и Крик открыли двойную спираль ДНК, что стало революцией в молекулярной биологии."
			},
			{
				year: 1969,
				text: "Астронавт Нил Армстронг стал первым человеком, ступившим на поверхность Луны в рамках миссии «Аполлон-11»."
			},
			{
				year: 2012,
				text: "ЦЕРН подтвердил открытие бозона Хиггса — частицы, ответственной за массу других частиц."
			}
		]
	},
	{
		id: "4",
		title: "Спорт",
		events: [
			{
				year: 1896,
				text: "В Афинах прошли первые современные Олимпийские игры, возрождающие древнегреческую традицию."
			},
			{
				year: 1972,
				text: "Мюнхенская Олимпиада стала трагически известна из-за террористического акта против израильской команды."
			},
			{
				year: 2008,
				text: "Олимпийские игры в Пекине стали одними из самых масштабных и технологичных в истории."
			}
		]
	},
	{
		id: "5",
		title: "Культура",
		events: [
			{
				year: 1924,
				text: "В Нью-Йорке открылся Музей современного искусства (MoMA), оказавший огромное влияние на мировую культуру."
			},
			{
				year: 1989,
				text: "Падение Берлинской стены стало символом окончания Холодной войны и объединения Европы."
			},
			{
				year: 2020,
				text: "Пандемия COVID-19 привела к цифровизации культурных мероприятий и переходу в онлайн-форматы."
			}
		]
	},
	{
		id: "6",
		title: "Технологии",
		events: [
			{
				year: 1983,
				text: "Мир увидел первый коммерческий мобильный телефон — Motorola DynaTAC 8000X."
			},
			{
				year: 2007,
				text: "Компания Apple представила первый iPhone, полностью изменивший рынок мобильных устройств."
			},
			{
				year: 2016,
				text: "Искусственный интеллект AlphaGo от Google обыграл чемпиона мира по игре го, показав возможности ИИ."
			}
		]
	}
];
