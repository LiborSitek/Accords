CREATE TABLE `accord` (
  `id_accord` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group` CHAR NOT NULL,
  `type` VARCHAR(45) NULL DEFAULT '',
  `sort` INT NOT NULL,
  `render_data` TEXT NOT NULL,
  PRIMARY KEY (`id_accord`));
