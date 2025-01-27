SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Creation of the database
--

DROP DATABASE IF EXISTS `cascina_caccia`;
CREATE DATABASE `cascina_caccia`;

USE `cascina_caccia`;

-- --------------------------------------------------------

--
-- Structure of the table `informations`
--

CREATE TABLE `informations` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `date_send` date NOT NULL,
  `text` varchar(1000) NOT NULL,
  `archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure of the table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `date_send` date NOT NULL,
  `date_start` date NOT NULL,
  `date_finish` date DEFAULT NULL,
  `hour_start` time DEFAULT NULL,
  `hour_finish` time DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `archived` tinyint(1) NOT NULL,
  `type_group` varchar(25) NOT NULL,
  `visitors` int(11) NOT NULL,
  `companions` int(11) DEFAULT NULL,
  `additional_info` varchar(1000) DEFAULT NULL,
  `mobility_problems` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure of the table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`) VALUES
(1, 'Owner', 'Owner', 'startdownowner@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'OWNER');

-- --------------------------------------------------------

--
-- Indexes for the tables
--

--
-- Indexes for the tables `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for the tables `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for the tables `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for the tables 
--

--
-- AUTO_INCREMENT for the table `informations`
--
ALTER TABLE `informations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for the table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for the table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
