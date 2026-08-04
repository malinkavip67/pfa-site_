INSERT INTO "News" (
  "id","createdAt","updatedAt","title","slug","excerpt","content",
  "imageUrl","publishedAt","isPublished"
) VALUES (
  'content-news-vietnam-scouting-2026',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,
  'PFA во Вьетнаме: международный просмотр футболистов',
  'vietnam-football-scouting-2026',
  '23 апреля 2026 года команда Премьер Футбольного Агентства отправилась во Вьетнам для просмотра перспективных футболистов.',
  E'23 апреля 2026 года команда Премьер Футбольного Агентства отправилась во Вьетнам для просмотра перспективных футболистов и изучения возможностей местного футбольного рынка.\n\nВ центре внимания были технические качества игроков, игровое мышление, физическая готовность и потенциал дальнейшего профессионального развития. Такой формат работы позволяет оценивать футболиста не только по статистике, но и непосредственно в тренировочном и игровом процессе.\n\nВыезд во Вьетнам стал частью международной скаутинговой программы PFA. Мы продолжаем расширять географию работы, находить талантливых игроков и создавать для них возможности выхода на новый профессиональный уровень.',
  '/images/news/vietnam-scouting-2026.webp','2026-04-23T12:00:00Z',true
)
ON CONFLICT ("slug") DO UPDATE SET
  "updatedAt"=CURRENT_TIMESTAMP,
  "title"=EXCLUDED."title",
  "excerpt"=EXCLUDED."excerpt",
  "content"=EXCLUDED."content",
  "imageUrl"=EXCLUDED."imageUrl",
  "publishedAt"=EXCLUDED."publishedAt",
  "isPublished"=true;
