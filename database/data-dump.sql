--
-- Data dump for table `users`
--

INSERT INTO `users` (
    `id`, `name`, `surname`, `email`, `password`, `role`
) 
VALUES
(1, 'Owner', 'Owner', 'startdownowner@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'OWNER'),
(2, 'Admin', '1', 'startdownadm@gmail.com', '$2a$10$hjirmg.QSR7VKZ/wWIxP/.MnG6bPJPqvGYMI90BYJV9v0JpzlDS0O', 'ADMIN');

-- --------------------------------------------------------

--
-- Data dump for table `informations`
--

INSERT INTO `informations` (
    `id`, `name`, `surname`, `phone`, `email`, `date_send`, `text`, `status`
)
VALUES
(1, 'Mario', 'Rossi', NULL, 'mario.rossi@sample.std', '2025-01-05', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 'Ricevuta'),
(2, 'Luigi', 'Bianchi', '3331231234', 'luigi.bianchi@sample.std', '2025-01-03', 'Vivamus elementum semper nisi. Curabitur ullamcorper ultricies nisi. Aenean vulputate eleifend tellus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.', 'Attesa'),
(3, 'Andrea', 'Verdi', NULL, 'andrea.verdi@sample.std', '2025-01-04', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Aperta'),
(4, 'Solaire', 'Astora', NULL, 'solaire.astora@sample.std', '2024-12-27', 'Esempio di testo per una richiesta di informazioni', 'Chiusa');

-- --------------------------------------------------------

--
-- Data dump for table `reservations`
--

INSERT INTO `reservations` (
    `id`, `name`, `surname`, `phone`, `email`, `date_send`, `date_start`, `date_finish`, `hour_start`, `hour_finish`, `status`, `type_group`, `visitors`, `companions`, `additional_info`, `mobility_problems`
)
VALUES
(1, 'Franco', 'Gialli', '3311243123', 'franco.gialli@sample.std', '2025-01-03', '2025-03-18', NULL, '14:30:00', '15:30:00', 'Ricevuta', 'Famiglia', 4, NULL, NULL, 0),
(2, 'Michele', 'Fucsia', '3331112222', 'michele.fucsia@sample.std', '2025-01-04', '2025-02-11', '2025-02-13', NULL, NULL, 'Attesa', 'Scout', 15, 4, 'Informazioni aggiuntive', 0),
(3, 'Fabio', 'Azzurri', '3339990000', 'fabio.azzurri@sample.std', '2025-01-09', '2025-03-01', NULL, '10:00:00', '12:30:00', 'Chiusa', 'Famiglia', 3, NULL, NULL, 1),
(4, 'Giorgio', 'Neri', '3339990880', 'giorgio.neri@sample.std', '2025-01-08', '2025-01-24', '2025-01-25', '09:00:00', '18:30:00', 'Aperta', 'Famiglia', 5, NULL, NULL, 0);
