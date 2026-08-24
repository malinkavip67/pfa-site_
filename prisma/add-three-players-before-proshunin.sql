BEGIN;

INSERT INTO "Player" (
  "id", "createdAt", "updatedAt", "firstName", "lastName", "slug",
  "birthDate", "nationality", "city", "position", "club", "height",
  "weight", "preferredFoot", "description", "achievements", "photoUrl",
  "videoUrl", "isPublished", "sortOrder"
) VALUES
  (
    'content-player-rafael-azerbaijan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    'Рафаэль', '', 'rafael-azerbaijan', '2007-08-17',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    'Футболист Премьер Футбольного Агентства 2007 года рождения. Получил приглашение на просмотр в команду Первой лиги Азербайджана. PFA сопровождает игрока на этапе просмотра и переговоров о возможном контракте.',
    E'2007 год рождения.\nПриглашение на просмотр в команду Первой лиги Азербайджана.\nСопровождение PFA на этапе просмотра и переговоров.',
    '/images/players/rafael-azerbaijan.webp', NULL, true, 1
  ),
  (
    'content-player-radion-ezhov', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    'Радион', 'Ежов', 'radion-ezhov', NULL,
    NULL, NULL, 'Центральный полузащитник', NULL, NULL, NULL, NULL,
    'Центральный полузащитник Премьер Футбольного Агентства с действующим профессиональным контрактом. Получил приглашение на просмотр в клуб Премьер-лиги Азербайджана. PFA сопровождает игрока в поиске следующего карьерного шага.',
    E'Действующий профессиональный контракт.\nПриглашение на просмотр в клуб Премьер-лиги Азербайджана.\nКарьерное сопровождение Премьер Футбольного Агентства.',
    '/images/players/radion-ezhov.webp', NULL, true, 2
  ),
  (
    'content-player-narek-chobanyan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
    'Нарек', 'Чобанян', 'narek-chobanyan', NULL,
    NULL, NULL, 'Фланговый полузащитник', 'ФК «Бентонит»', NULL, NULL, NULL,
    'Фланговый полузащитник, сотрудничающий с Премьер Футбольным Агентством. Подписал профессиональный контракт сроком на 24 месяца и продолжает карьеру в Первой лиге Армении в составе ФК «Бентонит».',
    E'Профессиональный контракт сроком на 24 месяца.\nИгрок ФК «Бентонит».\nВыступления в Первой лиге Армении.',
    '/images/players/narek-chobanyan.webp', NULL, true, 3
  )
ON CONFLICT ("slug") DO UPDATE SET
  "updatedAt" = CURRENT_TIMESTAMP,
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  "birthDate" = EXCLUDED."birthDate",
  "nationality" = EXCLUDED."nationality",
  "city" = EXCLUDED."city",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "description" = EXCLUDED."description",
  "achievements" = EXCLUDED."achievements",
  "photoUrl" = EXCLUDED."photoUrl",
  "isPublished" = true,
  "sortOrder" = EXCLUDED."sortOrder";

UPDATE "Player"
SET "sortOrder" = CASE "slug"
  WHEN 'roman-proshunin' THEN 4
  WHEN 'roman-zuev' THEN 5
  WHEN 'sergey-kudryavtsev' THEN 6
  ELSE "sortOrder"
END,
"updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" IN ('roman-proshunin', 'roman-zuev', 'sergey-kudryavtsev');

COMMIT;
