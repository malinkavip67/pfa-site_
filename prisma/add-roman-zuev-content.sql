INSERT INTO "Player" (
  "id","createdAt","updatedAt","firstName","lastName","slug","birthDate",
  "nationality","city","position","club","height","weight","preferredFoot",
  "description","achievements","photoUrl","videoUrl","isPublished","sortOrder"
) VALUES (
  'content-player-roman-zuev',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'Роман','Зуев','roman-zuev','2008-05-08',
  'Россия','Москва','Нападающий','Кунцево-Запад 2008 г.р.',
  NULL,NULL,NULL,
  'Нападающий 2008 года рождения. Роман сочетает результативность, большой игровой объём и опыт регулярных выступлений: 66 матчей и 2734 минуты на поле.',
  E'66 матчей.\n25 забитых голов.\n35 побед в составе команды.\n2734 минуты игрового времени.\n20 июля 2026 года подписал контракт с ФК «Бентонит», Первая лига Армении.',
  '/images/players/roman-zuev-portrait.jpg',NULL,true,2
)
ON CONFLICT ("slug") DO UPDATE SET
  "updatedAt"=CURRENT_TIMESTAMP,
  "firstName"=EXCLUDED."firstName",
  "lastName"=EXCLUDED."lastName",
  "birthDate"=EXCLUDED."birthDate",
  "nationality"=EXCLUDED."nationality",
  "city"=EXCLUDED."city",
  "position"=EXCLUDED."position",
  "club"=EXCLUDED."club",
  "description"=EXCLUDED."description",
  "achievements"=EXCLUDED."achievements",
  "photoUrl"=EXCLUDED."photoUrl",
  "isPublished"=true,
  "sortOrder"=EXCLUDED."sortOrder";

INSERT INTO "News" (
  "id","createdAt","updatedAt","title","slug","excerpt","content",
  "imageUrl","publishedAt","isPublished"
) VALUES (
  'content-news-roman-zuev-bentonit',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'Роман Зуев подписал контракт с ФК «Бентонит»',
  'roman-zuev-signed-bentonit',
  '20 июля 2026 года Премьер Футбольное Агентство помогло молодому нападающему подписать контракт с клубом Первой лиги Армении.',
  E'20 июля 2026 года Премьер Футбольное Агентство помогло Роману Зуеву подписать контракт с ФК «Бентонит», выступающим в Первой лиге Армении.\n\nДля молодого нападающего это новый профессиональный этап и возможность продолжить развитие на международном уровне. Команда PFA сопровождала игрока на пути к заключению контракта и будет поддерживать его дальнейшее карьерное развитие.',
  '/images/news/roman-zuev-bentonit-contract.webp','2026-07-20T12:00:00Z',true
)
ON CONFLICT ("slug") DO UPDATE SET
  "updatedAt"=CURRENT_TIMESTAMP,
  "title"=EXCLUDED."title",
  "excerpt"=EXCLUDED."excerpt",
  "content"=EXCLUDED."content",
  "imageUrl"=EXCLUDED."imageUrl",
  "publishedAt"=EXCLUDED."publishedAt",
  "isPublished"=true;
