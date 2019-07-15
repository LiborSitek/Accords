CREATE TABLE `accord` (
  `id_accord` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group` CHAR NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `sort` INT NOT NULL,
  `render_data` TEXT NOT NULL,
  PRIMARY KEY (`id_accord`));
