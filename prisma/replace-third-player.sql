UPDATE "Player"
SET
  "updatedAt" = CURRENT_TIMESTAMP,
  "firstName" = 'Сергей',
  "lastName" = 'Кудрявцев',
  "slug" = 'sergey-kudryavtsev',
  "birthDate" = '2006-10-12 12:00:00',
  "nationality" = 'Россия',
  "city" = 'Ярославль',
  "position" = 'Вратарь',
  "club" = NULL,
  "height" = 190,
  "weight" = 82,
  "preferredFoot" = 'Правая',
  "description" = 'Современный вратарь с хорошей реакцией, уверенной игрой на линии и быстрым выбором позиции. Надёжно действует при выходах один в один, контролирует штрафную площадь и начинает атаки точными передачами. Отличается спокойствием, дисциплиной и уверенностью в ключевых эпизодах матча.',
  "achievements" = E'Хорошая реакция и уверенная игра на линии ворот.\nНадёжные действия при выходах один в один.\nКонтроль штрафной площади и точное начало атак.',
  "photoUrl" = '/images/players/sergey-kudryavtsev-v2.webp',
  "isPublished" = true,
  "sortOrder" = 3
WHERE "slug" IN ('luka-wolf', 'sergey-kudryavtsev');
