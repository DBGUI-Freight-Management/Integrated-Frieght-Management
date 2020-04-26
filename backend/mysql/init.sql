-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

GRANT ALL PRIVILEGES ON * TO 'manager'@'%';

CREATE DATABASE IF NOT EXISTS `db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accountTypes`
--

DROP TABLE IF EXISTS `accountTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountTypes` (
  `typeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountTypes`
--

LOCK TABLES `accountTypes` WRITE;
/*!40000 ALTER TABLE `accountTypes` DISABLE KEYS */;
INSERT INTO `accountTypes` VALUES (1,'Captain','Users who are captains of ships'),(2,'Freight Manager','Users who are managers of shipping companies.'),(3,'Client','Users checking on their freight shipments.');
/*!40000 ALTER TABLE `accountTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `captain`
--

DROP TABLE IF EXISTS `captain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `captain` (
  `captainID` int NOT NULL,
  `companyID` int NOT NULL,
  `captainName` varchar[80] NOT NULL,
  KEY `captainCompany_idx` (`companyID`),
  KEY `captainUser_idx` (`captainID`),
  CONSTRAINT `captainCompany` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`),
  CONSTRAINT `captainUser` FOREIGN KEY (`captainID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `captain`
--

LOCK TABLES `captain` WRITE;
/*!40000 ALTER TABLE `captain` DISABLE KEYS */;
INSERT INTO `captain` VALUES (1,10,'Johnny Depp');
INSERT INTO `captain` VALUES (1,20,'Adam Smith');
INSERT INTO `captain` VALUES (1,30,'George Washington');
/*!40000 ALTER TABLE `captain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `owner` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `route` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cargoOwner_idx` (`owner`),
  KEY `cargoRoute_idx` (`route`),
  CONSTRAINT `cargoOwner` FOREIGN KEY (`owner`) REFERENCES `companies` (`companyID`),
  CONSTRAINT `cargoRoute` FOREIGN KEY (`route`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'Treasure Chest',1,3,1);
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `companyID` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(50) DEFAULT NULL,
  `freightManagerID` int DEFAULT NULL,
  PRIMARY KEY (`companyID`),
  KEY `freightManagerID` (`freightManagerID`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`freightManagerID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Viento Shipping',3),(2,'Ellison Internattional',3),(3,'Weiss Incoporated',3),(4,'Ellison Internattional',3),(5,'Denizen Farms',3),(6,'Retrograde Aeronautics',3);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew`
--

DROP TABLE IF EXISTS `crew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew` (
  `id` int NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `ship` int DEFAULT NULL,
  `dateBoarded` date DEFAULT NULL,
  `account` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `crewShip_idx` (`ship`),
  KEY `crewAccount_idx` (`account`),
  CONSTRAINT `crewAccount` FOREIGN KEY (`account`) REFERENCES `users` (`userID`),
  CONSTRAINT `crewShip` FOREIGN KEY (`ship`) REFERENCES `ship` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew`
--

LOCK TABLES `crew` WRITE;
/*!40000 ALTER TABLE `crew` DISABLE KEYS */;
INSERT INTO `crew` VALUES (1,'Jack','Sparrow','Captain',1,NULL,1);
/*!40000 ALTER TABLE `crew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `header` varchar(45) NOT NULL,
  `message` text,
  `route` int DEFAULT NULL,
  `writer` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `logRoute_idx` (`route`),
  KEY `logWriter_idx` (`writer`),
  CONSTRAINT `logRoute` FOREIGN KEY (`route`) REFERENCES `route` (`id`),
  CONSTRAINT `logWriter` FOREIGN KEY (`writer`) REFERENCES `crew` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,'Crossing the Panam Canal','Today we crossed the panam canal, it was a good time',1,1,'2020-04-15','Panama Canal');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ship` int NOT NULL,
  `writer` int NOT NULL,
  `date` date DEFAULT NULL,
  `header` varchar(45) DEFAULT NULL,
  `message` text,
  `resolved` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `messageShip_idx` (`ship`),
  KEY `requestWriter_idx` (`writer`),
  CONSTRAINT `messageShip` FOREIGN KEY (`ship`) REFERENCES `ship` (`id`),
  CONSTRAINT `requestWriter` FOREIGN KEY (`writer`) REFERENCES `crew` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ship` int DEFAULT NULL,
  `destination` varchar(45) NOT NULL,
  `start` varchar(45) NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `actualEndDate` date DEFAULT NULL,
  `currentLocation` varchar(45) DEFAULT NULL,
  `captain` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `routeShip_idx` (`ship`),
  KEY `routeCaptain_idx` (`captain`),
  CONSTRAINT `routeCaptain` FOREIGN KEY (`captain`) REFERENCES `captain` (`captainID`),
  CONSTRAINT `routeShip` FOREIGN KEY (`ship`) REFERENCES `ship` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,1,'Los Angeles','Miami','2020-04-01','2020-04-20',NULL,'Panama',10);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ship`
--

DROP TABLE IF EXISTS `ship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `company` int NOT NULL,
  `captain` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ship`
--

LOCK TABLES `ship` WRITE;
/*!40000 ALTER TABLE `ship` DISABLE KEYS */;
INSERT INTO `ship` VALUES (1,'Black Pearl',1,1);
/*!40000 ALTER TABLE `ship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `date` date DEFAULT NULL,
  `route` int NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `statusRoute_idx` (`route`),
  CONSTRAINT `statusRoute` FOREIGN KEY (`route`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Crossing Canal','2020-04-15',1,'Panama Canal');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `password` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `accountType` int DEFAULT NULL,
  PRIMARY KEY (`userID`),
  KEY `accountType` (`accountType`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`accountType`) REFERENCES `accountTypes` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'BlackPearl','sparrow','jsparrow@viento.com','Jack','Sparrow',5555555,1),(2,'likelikecpt','CptMorgan','hmorgan@gmail.com','Henry','Morgan',9543302,2),(3,'boringPa55word','smithy11','jsmith@viento.com','John','Smith',1247548,1),(5,'saturnV','rarmstrong','rarmstrong@retrograde.co.uk','Ryan','Armstrong',5749837,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-15 13:16:17
