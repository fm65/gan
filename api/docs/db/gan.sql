-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema gandb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gandb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gandb` DEFAULT CHARACTER SET utf8 ;
USE `gandb` ;

-- -----------------------------------------------------
-- Table `gandb`.`Passengers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Passengers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `address` VARCHAR(50) NULL,
  `city` VARCHAR(50) NULL,
  `pc` INT(5) NULL,
  `birthDate` DATE NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(255) NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Destinations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Destinations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(50) NULL,
  `airport` VARCHAR(50) NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Departures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Departures` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(50) NULL,
  `airport` VARCHAR(50) NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Flights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Flights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `departureDate` DATE NULL,
  `arrivalDate` DATE NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  `DestinationId` INT NOT NULL,
  `DepartureId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_Flights_Destinations_idx` (`DestinationId` ASC),
  INDEX `fk_Flights_Departures1_idx` (`DepartureId` ASC),
  CONSTRAINT `fk_Flights_Destinations`
    FOREIGN KEY (`DestinationId`)
    REFERENCES `gandb`.`Destinations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Flights_Departures1`
    FOREIGN KEY (`DepartureId`)
    REFERENCES `gandb`.`Departures` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Companys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Companys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Planes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Planes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `place` INT NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  `FlightId` INT NOT NULL,
  `CompanyId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_Planes_Flights1_idx` (`FlightId` ASC),
  INDEX `fk_Planes_Companys1_idx` (`CompanyId` ASC),
  CONSTRAINT `fk_Planes_Flights1`
    FOREIGN KEY (`FlightId`)
    REFERENCES `gandb`.`Flights` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Planes_Companys1`
    FOREIGN KEY (`CompanyId`)
    REFERENCES `gandb`.`Companys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Classes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('economy', 'business', 'first') NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gandb`.`Crews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gandb`.`Crews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `post` VARCHAR(50) NULL,
  `createAt` DATETIME NOT NULL,
  `updateAt` DATETIME NOT NULL,
  `CompanyId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_Crews_Companys1_idx` (`CompanyId` ASC),
  CONSTRAINT `fk_Crews_Companys1`
    FOREIGN KEY (`CompanyId`)
    REFERENCES `gandb`.`Companys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;