-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2018 at 08:31 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `price_check_program`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `productID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackID`, `userID`, `productName`, `productID`) VALUES
(0, 1, 'Hello World!', 0),
(1, 14, 'send feedback', 0),
(2, 14, 'hello administrator!', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `productPrice` float NOT NULL,
  `productAvailability` tinyint(4) NOT NULL DEFAULT '1',
  `supermarketID` int(11) NOT NULL,
  `productMatch` int(11) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `productPrice`, `productAvailability`, `supermarketID`, `productMatch`) VALUES
(0, 'no match', 0, 0, 0, 0),
(1, 'banana', 25, 0, 0, 2),
(2, 'Banana', 20, 1, 1, 1),
(3, 'Milo 300mg', 20, 1, 0, 4),
(4, 'Milo 300 mg', 25, 1, 1, 3),
(5, 'Milo 500mg', 50, 0, 0, 0),
(6, 'Lumpia Wrapper Big', 26, 1, 0, 0),
(7, 'Lumpia Wrapper Big', 20, 1, 1, 0),
(8, 'Corned Tuna', 31.5, 1, 0, 0),
(9, 'Corned Tuna', 29, 1, 1, 0),
(10, 'Margarine Buttermilk', 52.45, 1, 0, 0),
(11, 'Margarine Buttermilk', 50, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `supermarket`
--

CREATE TABLE `supermarket` (
  `supermarketID` int(11) NOT NULL,
  `supermarketName` varchar(30) NOT NULL,
  `supermarketAddress` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supermarket`
--

INSERT INTO `supermarket` (`supermarketID`, `supermarketName`, `supermarketAddress`) VALUES
(0, 'Robinson', '0'),
(1, 'CityMall', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userName` varchar(15) NOT NULL,
  `userPassword` varchar(256) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `userPassword`, `lastName`, `firstName`, `isAdmin`) VALUES
(1, 'test', 'test', 'test', 'test', 0),
(9, 'admin', '$2b$10$rKs0GzET9Ow6FUY92nMKvubtGFtBSofVuBJYQcuOTuOpcc2j7ZyXK', 'Chin', 'Dan', 1),
(10, 'username', '$2b$10$Y1RdEJybW9z0wKBHNl.sROHi6SavosceyDbAUodSo2zLZ.qtRPyBe', 'Chin', 'Dan', 0),
(11, 'admin', '$2b$10$A9QgrbDlQQcZNXdgZnOtvOI41aa2VcHQAv5o9Pp9oC.vmD6BJ01oq', 'Ho', 'Derick', 0),
(12, 'AngelRoss', '$2b$10$pOWwznb8iJOxfV7D1nbawO475JWd8gt7kCgg6yl4qhY/3dRIfIyuq', 'Ross', 'Angel', 0),
(13, 'AngelRoss', '$2b$10$9rjTAlK9fQsyZFEeSyH3Vuk4c5C05sPQSvr0rhc14kGuSzZ38l0DS', 'Ross', 'Angel', 0),
(14, 'Derickho94', '$2b$10$6Y7zgYlIvTRb8KAmGch/gOageaQONboz4aZT1tBRQOtgC9YaV13LK', 'Ho', 'Ho', 0),
(15, 'i', '$2b$10$EEj0Hojnd77bgwv7fiT.ROQG1eAGa2YsEwy/X2NnZd8MFEJpMGNI2', 'i', 'i', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackID`),
  ADD KEY `userID_idx` (`userID`),
  ADD KEY `productID_idx` (`productID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `supermarketID_idx` (`supermarketID`);

--
-- Indexes for table `supermarket`
--
ALTER TABLE `supermarket`
  ADD PRIMARY KEY (`supermarketID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `productID` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `supermarketID` FOREIGN KEY (`supermarketID`) REFERENCES `supermarket` (`supermarketID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
