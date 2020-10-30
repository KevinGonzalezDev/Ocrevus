-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-10-2020 a las 22:10:17
-- Versión del servidor: 10.3.24-MariaDB-cll-lve
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `roche_base`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2020_07_07_000000_create_failed_jobs_table', 1),
(2, '2020_07_07_000000_create_password_resets_table', 1),
(3, '2020_07_07_000000_create_rols_table', 1),
(4, '2020_07_07_000000_create_users_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', NULL, '2020-10-26 16:43:55', '2020-10-26 16:43:56'),
(2, 'Player', NULL, '2020-10-26 16:44:04', '2020-10-26 16:44:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cedula` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_score` bigint(20) NOT NULL DEFAULT 0,
  `score` bigint(20) NOT NULL DEFAULT 0,
  `time` bigint(20) NOT NULL DEFAULT 0,
  `rol_id` bigint(20) UNSIGNED DEFAULT NULL,
  `state` enum('Activo','Inactivo') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Activo',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `cedula`, `email`, `current_score`, `score`, `time`, `rol_id`, `state`, `password`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', '123456789', 'administrador@gmail.com', 0, 0, 0, 1, 'Activo', '$2y$10$oz604eB4w7GZ76Nts0RVE.OKFJU4185Mz006QfW7kMOo/McNo0daW', NULL, NULL, '2020-10-26 16:44:32', '2020-10-26 16:44:34'),
(2, 'Nathan Drake', '1057448721', 'nathan.drake@gmail.com', 0, 0, 1603884853, 2, 'Activo', '$2y$10$R5oSXIJAZSTzvWyhSsb7i.UoJ1oHcUtNka5D1cnS8uJ6H2EELzgN.', NULL, NULL, '2020-10-27 23:01:05', '2020-10-28 22:09:10'),
(3, 'Mario Castañeda', '1574487510', 'mario.castaneda@gmail.com', 0, 0, 1603885439, 2, 'Activo', '$2y$10$qb.MYALAqAU62w16Tq7RieOk1oe54ZcaBHUlmYD.317j1jG57zg7O', NULL, NULL, '2020-10-28 16:41:48', '2020-10-28 16:43:59'),
(4, 'Michael Jackson', '84571574', 'michael.jackson@gmail.com', 0, 0, 1603885825, 2, 'Activo', '$2y$10$c4HkYDG9hcyd0J02GYGRo.k/75QZDJeUwlRxUmIMffgONcNAqw2wy', NULL, NULL, '2020-10-28 16:48:26', '2020-10-28 16:50:26'),
(5, 'Ryu Hayabusa', '1004487514', 'ryu.hayabusa@gmail.com', 0, 0, 1603894058, 2, 'Activo', '$2y$10$w8ZCDSQR94TXKlM3FLrqmO4d58OwOLn2ncvZCRxVE150Z/OtgNCJS', NULL, NULL, '2020-10-28 19:05:40', '2020-10-28 19:07:38'),
(6, 'Sara Connor', '1057748751', 'sara.connor@hotmail.com', 0, 0, 1603894226, 2, 'Activo', '$2y$10$/FzMOd40ETQXBC8w7BivLeZX7n21boRLggxDv6ov/48DFlsk/VR6W', NULL, NULL, '2020-10-28 19:08:28', '2020-10-28 19:10:26'),
(7, 'Matt Murdock', '1547578414', 'matt.murdock@outlook.com', 0, 0, 1603894425, 2, 'Activo', '$2y$10$D5IYFNv.iqJTC3vXQFqI2uwLxVyl8vg1l8mTQKIsABh6goYbWKYTS', NULL, NULL, '2020-10-28 19:11:34', '2020-10-28 19:13:46'),
(8, 'Dante Sparda', '84577157', 'dante.sparda@yahoo.com', 0, 0, 1603894593, 2, 'Activo', '$2y$10$iAlif35d4fnPIhvHe3z9wuqJ.GeOUQYZIsxzLBH1OBKQedontbniG', NULL, NULL, '2020-10-28 19:14:31', '2020-10-28 19:16:33'),
(9, 'Lara Croft', '84157748', 'lara.croft@square-enix.es', 0, 0, 1603894780, 2, 'Activo', '$2y$10$Q.js8ydDw01KJDYzyfL1i.TRl5.GBLPSs/TIDzP6OURQVfq9NBmam', NULL, NULL, '2020-10-28 19:17:28', '2020-10-28 19:19:40'),
(10, 'Squall Lionheart', '15781571', 'squall.lionheart@gmail.com', 0, 0, 1603894979, 2, 'Activo', '$2y$10$w4Qh5kC/RtyCy3RUahuuK.FV2HAQPKltBZv8xGoM4.9ADyF7n119e', NULL, NULL, '2020-10-28 19:20:30', '2020-10-28 19:22:59'),
(11, 'Jill Valentine', '15749847', 'jill.valentine@gmail.com', 0, 0, 1603895143, 2, 'Activo', '$2y$10$AIR6uczinlJNE9RcGZMjXu2rd/AK2xlX0kTTgqd1vOqmya/PR3HBC', NULL, NULL, '2020-10-28 19:23:38', '2020-10-28 19:25:44'),
(12, 'Jack Torrance', '1567684157', 'jack.torrance@gmail.com', 0, 0, 1603895362, 2, 'Activo', '$2y$10$KVm9VO2SU4lwSQTqlAwwfOJ6kiO0KrwCYf8Mv3QvkRclpTRD6M.Uq', NULL, NULL, '2020-10-28 19:26:30', '2020-10-28 19:29:22'),
(13, 'Mauricio', '13456789', 'test@test.com', 82, 82, 1603917067, 2, 'Activo', '$2y$10$vF0nrk2xba.acz5btDyQKuhvAWYdZ01vzJTKlB8F/XpQS.9gUjhA.', NULL, NULL, '2020-10-29 01:29:52', '2020-10-29 01:31:07'),
(14, 'Miguel Olano', '1016013858', 'miguel.olano@creategicalatina.com', 88, 88, 1603978538, 2, 'Activo', '$2y$10$IPwyBVB2oy6LpHKEAP8AZ.0xHwrYTGnP.OETtU0FI3IAkakhyJCV2', NULL, NULL, '2020-10-29 18:33:26', '2020-10-29 18:35:38'),
(15, 'Kevin González', '1000573543', 'astarothkd@gmail.com', 62, 62, 1603978750, 2, 'Activo', '$2y$10$MkyHIYKpYk0jQaA6ekL3lOeACq1QUow/osvz3Dt.qths5VR4TIfie', NULL, NULL, '2020-10-29 18:37:33', '2020-10-29 18:39:10'),
(16, 'Juan Castañeda', '3016756383', 'juanario1997@gmail.com', 78, 78, 1603982537, 2, 'Activo', '$2y$10$ZuHhwvdA9MqzsvpqCnIQV.8nejfI1V5Wya4TIdwWEckBrXWTQdn3i', NULL, NULL, '2020-10-29 19:40:02', '2020-10-29 19:42:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rols_name_unique` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_cedula_unique` (`cedula`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_rol_id_foreign` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
