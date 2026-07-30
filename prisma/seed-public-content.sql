INSERT INTO "Player" (
  "id","createdAt","updatedAt","firstName","lastName","slug","birthDate",
  "nationality","city","position","club","height","weight","preferredFoot",
  "description","achievements","photoUrl","videoUrl","isPublished","sortOrder"
) VALUES
(
  'seed-player-roman-proshunin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'Роман','Прошунин','roman-proshunin','2003-06-24',
  'Россия','Москва','Полузащитник','Футбольная академия А. Журавлева',180,75,'Левая',
  'Техничный левоногий полузащитник с высоким игровым интеллектом и отличным первым касанием. Отличается филигранной техникой обводки и поставленным дальним ударом с левой ноги, эффективно действует как в подыгрыше, так и при завершении атак. Благодаря хорошей стартовой скорости и видению поля предпочитает агрессивные вертикальные передачи и регулярно участвует в прессинге.',
  E'Филигранная техника обводки и поставленный дальний удар с левой ноги.\nЭффективная игра в подыгрыше и при завершении атак.\nАгрессивные вертикальные передачи и активное участие в прессинге.',
  '/images/players/roman-proshunin.jpg',NULL,true,1
),
(
  'seed-player-sergey-kudryavtsev',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'Сергей','Кудрявцев','sergey-kudryavtsev','2006-10-12 12:00:00',
  'Россия','Ярославль','Вратарь',NULL,190,82,'Правая',
  'Современный вратарь с хорошей реакцией, уверенной игрой на линии и быстрым выбором позиции. Надёжно действует при выходах один в один, контролирует штрафную площадь и начинает атаки точными передачами. Отличается спокойствием, дисциплиной и уверенностью в ключевых эпизодах матча.',
  E'Хорошая реакция и уверенная игра на линии ворот.\nНадёжные действия при выходах один в один.\nКонтроль штрафной площади и точное начало атак.',
  '/images/players/sergey-kudryavtsev-v2.webp',NULL,true,3
)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "News" (
  "id","createdAt","updatedAt","title","slug","excerpt","content",
  "imageUrl","publishedAt","isPublished"
) VALUES
(
  'seed-news-new-european-chapter',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'Новый этап европейской карьеры','new-european-chapter',
  'Стратегия трансфера, которая совпала со спортивными амбициями игрока.',
  'Стратегия трансфера, которая совпала со спортивными амбициями игрока.',
  '/images/hero/hero-pfa-player.webp','2026-07-08T12:00:00Z',true
),
(
  'seed-news-beyond-the-pitch',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'За пределами игрового поля','beyond-the-pitch',
  'Как сильный персональный бренд создаёт долгосрочную ценность.',
  'Как сильный персональный бренд создаёт долгосрочную ценность.',
  '/images/players/player-feature.webp','2026-06-22T12:00:00Z',true
),
(
  'seed-news-long-term-development',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'Фокус на долгосрочном развитии','long-term-development',
  'Почему последовательная карьерная стратегия важнее одного громкого решения.',
  'Почему последовательная карьерная стратегия важнее одного громкого решения.',
  '/images/hero/hero-pfa-player.webp','2026-06-10T12:00:00Z',true
)
ON CONFLICT ("slug") DO NOTHING;

-- These original demo articles were replaced by the approved publications
-- stored in prisma/replace-demo-news.sql.
DELETE FROM "News"
WHERE "slug" IN (
  'new-european-chapter',
  'beyond-the-pitch',
  'long-term-development'
);
