-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Dic 30, 2024 alle 15:51
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Creazione del database
--

DROP DATABASE IF EXISTS `cascina_caccia`;
CREATE DATABASE `cascina_caccia`;

USE `cascina_caccia`;


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

--
-- Dump dei dati per la tabella `informations`
--

INSERT INTO `informations` (`id`, `name`, `surname`, `phone`, `email`, `date_send`, `text`, `archived`) VALUES
(1, 'Mario', 'Rossi', NULL, 'mario.rossi@sample.std', '2025-01-05', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 0),
(2, 'Luigi', 'Bianchi', '3331231234', 'luigi.bianchi@sample.std', '2025-01-03', 'Vivamus elementum semper nisi. Curabitur ullamcorper ultricies nisi. Aenean vulputate eleifend tellus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.', 0),
(3, 'Andrea', 'Verdi', NULL, 'andrea.verdi@sample.std', '2025-01-04', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 0),
(4, 'Solaire', 'Astora', NULL, 'solaire.astora@sample.std', '2024-12-27', 'Esempio di testo per una richiesta di informazioni', 1),
(5, 'Francesca', 'Viola', '3385678901', 'francesca.viola@sample.std', '2025-01-10', 'Richiesta di informazioni sui costi.', 1),
(6, 'Stefano', 'Blu', NULL, 'stefano.blu@sample.std', '2025-01-11', 'Richiesta urgente di prenotazione.', 0),
(7, 'Chiara', 'Lilla', '3332223344', 'chiara.lilla@sample.std', '2025-01-12', 'Desidero conoscere gli orari di visita.', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `reservations`
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

--
-- Dump dei dati per la tabella `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `surname`, `phone`, `email`, `date_send`, `date_start`, `date_finish`, `hour_start`, `hour_finish`, `status`, `archived`, `type_group`, `visitors`, `companions`, `additional_info`, `mobility_problems`) VALUES
(1, 'Franco', 'Gialli', '3311243123', 'franco.gialli@sample.std', '2025-01-03', '2025-03-18', NULL, '14:30:00', '15:30:00', 'nuova', 0, 'Famiglia', 4, NULL, NULL, 0),
(2, 'Michele', 'Fucsia', '3331112222', 'michele.fucsia@sample.std', '2025-01-04', '2025-02-11', '2025-02-13', NULL, NULL, 'accordare', 0, 'Scout', 15, 4, 'Informazioni aggiuntive', 0),
(3, 'Fabio', 'Azzurri', '3339990000', 'fabio.azzurri@sample.std', '2025-01-09', '2025-03-01', NULL, '10:00:00', '12:30:00', 'chiusa', 1, 'Famiglia', 3, NULL, NULL, 1),
(4, 'Giorgio', 'Neri', '3339990880', 'giorgio.neri@sample.std', '2025-01-08', '2025-01-24', '2025-01-25', '09:00:00', '18:30:00', 'nuova', 0, 'Famiglia', 5, NULL, NULL, 0),
(5, 'Sara', 'Rossi', '3313334444', 'sara.rossi@sample.std', '2025-01-13', '2025-03-01', NULL, '11:00:00', '12:30:00', 'accordare', 0, 'Gruppo amici', 6, NULL, 'Evento speciale', 0),
(6, 'Luca', 'Verdi', '3395556666', 'luca.verdi@sample.std', '2025-01-14', '2025-02-11', '2025-02-14', NULL, NULL, 'nuova', 1, 'Scuola', 20, 3, 'Gita scolastica', 0),
(7, 'Elisa', 'Grigi', '3317778888', 'elisa.grigi@sample.std', '2025-01-14', '2025-03-18', '2025-03-19', '15:00:00', '16:00:00', 'nuova', 0, 'Famiglia', 4, NULL, 'Richiesta guida', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`) VALUES
(1, 'Owner', 'Owner', 'startdownowner@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'OWNER'),
(2, 'Admin', '1', 'startdownadm@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'ADMIN');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `informations`
--
ALTER TABLE `informations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
