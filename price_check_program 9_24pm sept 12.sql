-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2018 at 03:24 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
  `feedbackContent` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackID`, `userID`, `feedbackContent`) VALUES
(5, 10, 'Hello World!'),
(6, 10, 'Hello World Again!');

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
(2, 'banana', 25, 1, 1, 3),
(3, 'Banana', 20, 0, 2, 2),
(4, 'Milo 300 g', 20, 1, 1, 4),
(5, 'Milo 300g', 25, 1, 2, 3),
(6, 'Milo 500g', 50, 1, 2, 0);

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
(0, 'Mercado de Bais', 'Bais'),
(1, 'Robinsons Place Dumaguete', 'Dumaguete City'),
(2, 'CityMall', 'Dumaguete City');

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
  `favItems` varchar(120) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `userPassword`, `lastName`, `firstName`, `favItems`, `isAdmin`) VALUES
(9, 'admin', '$2b$10$rKs0GzET9Ow6FUY92nMKvubtGFtBSofVuBJYQcuOTuOpcc2j7ZyXK', 'Chin', 'Dan', '[]', 1),
(10, 'username', '$2b$10$Y1RdEJybW9z0wKBHNl.sROHi6SavosceyDbAUodSo2zLZ.qtRPyBe', 'Chin', 'Dan', '[]', 0),
(11, 'rommel', '$2b$10$9Re8c.06qidkXT/8UoLqu.b23v/pT0UxyKYNF5jNIPv7mQR/62VPK', 'Gallofin', 'Rommel', '[]', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackID`),
  ADD KEY `userID_idx` (`userID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `supermarketID` FOREIGN KEY (`supermarketID`) REFERENCES `supermarket` (`supermarketID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
