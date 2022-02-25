CREATE DATABASE `oficinadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `maintenances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `data_registro` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maintenanceId` int DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `registerDate` datetime DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `finishDate` datetime DEFAULT NULL,
  `status` int DEFAULT NULL,
  `estimativeDays` int DEFAULT NULL,
  `estimetive` varchar(50) DEFAULT NULL,
  `license` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maintenanceId` (`maintenanceId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`maintenanceId`) REFERENCES `maintenances` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
