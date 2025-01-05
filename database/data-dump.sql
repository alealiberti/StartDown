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
(2, 'Luigi', 'Bianchi', NULL, 'luigi.bianchi@sample.std', '2025-01-03', 'Vivamus elementum semper nisi. Curabitur ullamcorper ultricies nisi. Aenean vulputate eleifend tellus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.', 'Attesa'),
(3, 'Andrea', 'Verdi', NULL, 'andrea.verdi@sample.std', '2025-01-04', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Aperta'),
(4, 'Solaire', 'Astora', NULL, 'solaire.astora@sample.std', '2024-12-27', 'Esempio di testo per una richiesta di informazioni', 'Chiusa');
