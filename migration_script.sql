-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: _gestionArchivos
-- Source Schemata: gestionArchivos
-- Created: Fri Sep 15 09:15:54 2023
-- Workbench Version: 8.0.34
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema _gestionArchivos
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `_gestionArchivos` ;
CREATE SCHEMA IF NOT EXISTS `_gestionArchivos` ;

-- ----------------------------------------------------------------------------
-- Table _gestionArchivos.usuarios
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `_gestionArchivos`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nameUsuario` VARCHAR(45) NOT NULL,
  `usuariosEmail` VARCHAR(100) NOT NULL,
  `pwd` VARCHAR(2184) NOT NULL,
  PRIMARY KEY (`idusuario`, `usuariosEmail`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Routine _gestionArchivos.chPass
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `_gestionArchivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `chPass`(pass varchar(2184),idusuario int)
BEGIN


update gestionArchivos.usuarios
set pwd = pass
where idusuario =idusuario;

SELECT idusuario,nameUsuario FROM gestionArchivos.usuarios
WHERE idusuario =idusuario;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine _gestionArchivos.InsertUsuarios
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `_gestionArchivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `InsertUsuarios`(usuarioEmail varchar(100) , nombreUsuario varchar(45), pwd varchar(2184) )
BEGIN
DECLARE foundEmail INT;

SELECT 
    COUNT(*)
INTO foundEmail FROM
    gestionArchivos.usuarios
WHERE
    usuariosEmail = usuarioEmail;
    
IF foundEmail > 0 then
		
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe este usuario';
ELSE
	INSERT INTO gestionArchivos.usuarios(nameUsuario,usuariosEmail,pwd)values(nombreUsuario,usuarioEmail,pwd);
	SELECT 
		idusuario
	FROM
		gestionArchivos.usuarios
	ORDER BY idusuario DESC
	LIMIT 1;
END IF;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine _gestionArchivos.login
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `_gestionArchivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `login`(_email varchar(100),_pwd varchar(2142))
BEGIN

select idusuario,nameusuario from gestionArchivos.usuarios where usuariosEmail = _email and pwd = _pwd ;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine _gestionArchivos.rmUser
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `_gestionArchivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `rmUser`(idusuario int)
BEGIN

delete from gestionArchivos.usuarios where idusuario = idusuario;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine _gestionArchivos.SPallpeople
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `_gestionArchivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `SPallpeople`()
BEGIN
	select idusuario,nameUsuario from gestionArchivos.usuarios;
END$$

DELIMITER ;
SET FOREIGN_KEY_CHECKS = 1;
