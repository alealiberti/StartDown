--
-- Dump dei dati per la tabella `informations`
--

INSERT INTO `informations` (`id`, `name`, `surname`, `phone`, `email`, `date_send`, `text`, `archived`) VALUES
(1, 'Mario', 'Rossi', NULL, 'mario.rossi@sample.std', '2025-01-05', 'Buongiorno, vorrei sapere quali sono le date disponibili per visitare Cascina Caccia e se è necessaria la prenotazione anticipata. Potete fornirmi dettagli sulle modalità di prenotazione?', 0),
(2, 'Luigi', 'Bianchi', '3331231234', 'luigi.bianchi@sample.std', '2025-01-03', 'Salve, mi piacerebbe conoscere le attività proposte durante la visita a Cascina Caccia. Sono previste visite guidate? Se sì, quali sono i costi e la durata del tour?', 0),
(3, 'Andrea', 'Verdi', NULL, 'andrea.verdi@sample.std', '2025-01-04', 'Buongiorno, potete darmi informazioni su come raggiungere Cascina Caccia con i mezzi pubblici o in auto? Inoltre, sono disponibili parcheggi o servizi di ristorazione nelle vicinanze?', 0),
(4, 'Solaire', 'Astora', NULL, 'solaire.astora@sample.std', '2024-12-27', 'Esempio di testo per una richiesta di informazioni', 1),
(5, 'Francesca', 'Viola', '3385678901', 'francesca.viola@sample.std', '2025-01-10', 'Richiesta di informazioni sui costi.', 1),
(6, 'Stefano', 'Blu', NULL, 'stefano.blu@sample.std', '2025-01-11', 'Richiesta urgente di prenotazione.', 0),
(7, 'Chiara', 'Lilla', '3332223344', 'chiara.lilla@sample.std', '2025-01-12', 'Desidero conoscere gli orari di visita.', 0);

--
-- Dump dei dati per la tabella `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `surname`, `phone`, `email`, `date_send`, `date_start`, `date_finish`, `hour_start`, `hour_finish`, `status`, `archived`, `type_group`, `visitors`, `companions`, `additional_info`, `mobility_problems`) VALUES
(1, 'Franco', 'Gialli', '3311243123', 'franco.gialli@sample.std', '2025-01-03', '2025-03-18', NULL, '14:30:00', '15:30:00', 'nuova', 0, 'Famiglia', 4, NULL, NULL, 0),
(2, 'Michele', 'Fucsia', '3331112222', 'michele.fucsia@sample.std', '2025-01-04', '2025-02-11', '2025-02-13', NULL, NULL, 'accordare', 0, 'Scout', 15, 4, 'I ragazzi sono della fascia di età 12-15 anni', 0),
(3, 'Fabio', 'Azzurri', '3339990000', 'fabio.azzurri@sample.std', '2025-01-09', '2025-03-01', NULL, '10:00:00', '12:30:00', 'confermata', 1, 'Famiglia', 3, NULL, 'Arriveremo con un furgoncino, spero non sia un problema', 1),
(4, 'Giorgio', 'Neri', '3339990880', 'giorgio.neri@sample.std', '2025-01-08', '2025-01-24', '2025-01-25', '09:00:00', '18:30:00', 'nuova', 0, 'Famiglia', 5, NULL, NULL, 0),
(5, 'Sara', 'Rossi', '3313334444', 'sara.rossi@sample.std', '2025-01-13', '2025-03-01', NULL, '11:00:00', '12:30:00', 'accordare', 0, 'Gruppo amici', 6, NULL, 'Evento speciale', 0),
(6, 'Luca', 'Verdi', '3395556666', 'luca.verdi@sample.std', '2025-01-14', '2025-02-11', '2025-02-14', NULL, NULL, 'nuova', 1, 'Scuola', 20, 3, 'Gita scolastica', 0),
(7, 'Elisa', 'Grigi', '3317778888', 'elisa.grigi@sample.std', '2025-01-14', '2025-03-18', '2025-03-19', '15:00:00', '16:00:00', 'nuova', 0, 'Famiglia', 4, NULL, 'Richiesta guida', 0);

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`) VALUES
(2, 'Admin', '1', 'startdownadm@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'ADMIN');

