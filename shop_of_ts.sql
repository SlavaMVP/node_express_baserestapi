-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 14 2021 г., 11:10
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop_of_ts`
--

-- --------------------------------------------------------

--
-- Структура таблицы `carts`
--

CREATE TABLE `carts` (
  `id` int(20) NOT NULL,
  `client_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `option_id` int(10) NOT NULL,
  `count` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `carts`
--

INSERT INTO `carts` (`id`, `client_id`, `product_id`, `option_id`, `count`) VALUES
(1, 1, 3, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'IT'),
(2, 'Memes'),
(3, 'Movie'),
(4, 'Music'),
(5, 'Auto,moto'),
(6, 'Hollidays'),
(7, 'Games'),
(8, 'Science'),
(9, 'Symbols'),
(10, 'Phrases'),
(11, 'Sport'),
(12, 'Traveling');

-- --------------------------------------------------------

--
-- Структура таблицы `categories_to_products`
--

CREATE TABLE `categories_to_products` (
  `category_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories_to_products`
--

INSERT INTO `categories_to_products` (`category_id`, `product_id`) VALUES
(5, 3),
(6, 2),
(3, 10),
(11, 8),
(3, 4),
(3, 3),
(3, 6),
(3, 5),
(12, 12),
(12, 11),
(12, 9),
(6, 9),
(11, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `client_id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `registration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`client_id`, `name`, `surname`, `email`, `country`, `city`, `address`, `password`, `registration_date`) VALUES
(1, 'Jack', 'Black', 'fswdf@gmail.com', 'Ukraine', 'London', 'st Pushkin, 22', 'bcxvbxbcvxbxcvbcxvbcxvbcxvb', '2021-06-01'),
(2, 'Anna', 'Akana', '1@s.com', 'USA', 'Denwer', 'st Per 23', 'asdasdasdasdasdasdasdasd', '2021-06-09'),
(3, 'erw', 'werwe', 'werwe', 'USA', 'Denwer', 'st Per 23', 'werwerwerwerwerwerwerwerwer', '2020-12-01'),
(4, 'John', 'Donavan', 'ss@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$/5aQTGx3fgSzOQJeC0xPs.wI62KUT3yJvma8dVG8DhoQkQUDUhHIi', '2020-12-01'),
(5, 'John', 'Donavan', 'ss1@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$vunUoG8tr6yE6NQr2mRmhuyczkFln5ySsj/chIHApuN/Bw7kRW6X2', '2021-06-10'),
(6, 'John', 'Donavan', 'ss2@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$ivWJm9YqMf7zrwnxt/kVGOETC9horxwOp51pZILqzQTP.93gI7/M.', '2021-06-10'),
(7, 'John', 'Donavan', 'ss5@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$mFmw87FMxDJTlV97W3DK2uIC1vY8teaUx7ZZmclb9mHUMGY3ptdxi', '2021-06-10'),
(8, 'John', 'Donavan', 'ss6@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$SozwdaPzc81OkBgTJ9zrUuepfVWIQjTOdvv7AkFV52hkazY.virZ2', '2020-11-02'),
(9, 'John', 'Donavan', 'ss55@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$L9YnvIAQe4DTziGvo7HMY.6fR7M9CIUjukE3/YVhTzrtJpfqj8X3u', '2020-11-02'),
(10, 'John', 'Donavan', 'ss58@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$mpRVHEOg3wijRQ5UDVOO..tOnM9pwIXziFzs5NPqsB1U63v/lttwi', '2020-11-02'),
(11, 'John', 'Donavan', 'ss56@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$4U4/GpJUvHc6nZ9rGp0IPOVkDoy47ENkI1zqgGW/lpEtZst1kEhBq', '2020-11-02'),
(12, 'John', 'Donavan', 'ss76@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$HLZm.Y8fT810h5eFhNA3Y.3TP8MfwU.EE1jQnWdf86ACgRD4CIMTe', '2020-11-02'),
(13, 'John', 'Donavan', 'ss78@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$ch/JWCiA9bWngHwOXXMY4Oc9fNq7xn2YW5Y78dqNF4wa1ShpU3rkS', '2020-11-02'),
(14, 'John', 'Donavan', '1@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$iaQcKHUxVAEUOXDwTMPz.uTaXtIalzW4r/EDrg8PwnF55fgXQ3RnS', '2020-11-02'),
(15, 'John', 'Donavan', '33@d.com', 'USA', 'Brasil', 'st. Zorton', '$2a$12$jVwCCZZvef8qz6QCpFMrWOQTiRFyQWadiO5W79EFa5ye3Feksq76C', '2021-06-10'),
(16, 'w', 'w', 'aa@d.com', 'A', 'A', 'A', '$2a$12$04lV5qDXfpfZ7tgrxtyhMu0b3RJ6LeHzX/RrGMkaMJBkXalnzZfma', '2021-06-10'),
(17, 'Stephan', 'dfsdfs', '64@g.com', 'UA', 'N', 'dasd', '$2a$12$92Rmv2n/ji6uMaACRgo82ubECv0vsBkDt7aCR8Hs1VakET18zQOLa', '2021-06-10'),
(18, 'Stephan', 'dfsdfs111', '644@g.com', 'Украина', 'N', 'dasd', '$2a$12$P7j8o3lWfMpqF8GNV2GjO.ysqdv8dzKY/hfK9iVrIYTbNIa4DplNi', '2021-06-13'),
(19, 'Stephan', 'ssd', '6422@g.com', 'Украина', 'N', 'dasd', '$2a$12$P7GRAOGResT2Z26NsIOPLO8sObHQxJLrq.LdaFFa0/k5mTXaRmeiK', '2021-06-13'),
(20, 'Stephan', 'fsdf', '624@g.com', 'Украина', 'N', 'dasd', '$2a$12$utt.zXrJXSjkgbRKDMsAfu0VmvPILupVI3k3Rmtu/h2XotZ/nQOAu', '2021-06-13'),
(21, 'Stephan', '3424', '6444111111@g.com', 'Украина', 'N', 'dasd', '$2a$12$xEmDu8uYfyx.bMMVqEWg6ObtHsqcoMSqol3PWI75UNJHbKrpliLKa', '2021-06-13'),
(22, 'Stephan', 'dfsdfs', '6455@g.com', 'Украина', 'N', 'dasd', '$2a$12$6Ixj//c9PT6RE.5id/JH3uGvq9NvjPOevvvH70JHEP5sdEsjFSSJy', '2021-06-13'),
(23, 'Stephan', 'sd', '645511@g.com', 'Украина', 'N', 'dasd', '$2a$12$IDiY9giZM7TzVQwbYV1eauH6MNzz97VSVNjINcrDxjBtMGBnVLjrq', '2021-06-13'),
(24, 'Stephan', 'dfsdfs', '64111@g.com', 'Украина', 'N', 'dasd', '$2a$12$.Gr0NhNYlmIZaiVi3aGb5.gmlcn8u6is5kmqReAxcGFMa9dtEZS7G', '2021-06-13'),
(25, 'Stephan', 'dfsdfs', '6411111@g.com', 'Украина', 'N', 'dasd', '$2a$12$iG02bXm5ToJGWA/JYwvBB.k69kf0NSrGo9yHP5soyADPqRSDX2ynW', '2021-06-13'),
(26, 'Stephan', '1111', '64559@g.com', 'Украина', 'N', 'dasd', '$2a$12$zRn2cfNkiGVydtl9Wi6zk.XQ50XIS6vPz.H5ZsO1y0/INJkkgfz/.', '2021-06-13'),
(27, 'Stephan', 'tytyu', '647@g.com', 'Украина', 'N', 'dasd', '$2a$12$XFHIdhRgE5d3K5U6MCxlzuN3UK5lHfXs4uGPKn1E5yLFFvxBXzVlO', '2021-06-13'),
(28, 'Stephan', 'dfsdfs', '6466@g.com', 'Украина', 'N', 'dasd', '$2a$12$ygF5UmUEX6P4C3EYjUyieO38IKSte6mFpEC3IXLLHg.90bEqyXelq', '2021-06-13'),
(29, 'Stephan', 'dfsdfs', '64121312@g.com', 'Украина', 'N', 'dasd', '$2a$12$3l.vIEHdFmjJddV6w5qSG.P6ycjgRRP2aBmL.5/BsodyhaMEKiXnC', '2021-06-13'),
(30, 'Stephan', '5', '64222@g.com', 'Украина', 'N', 'dasd', '$2a$12$5MJLT3b8snykb1f3gDXS6OPIbUODjNbxoM/LKyg9LX1znWcWWGpZm', '2021-06-13'),
(31, 'Stephan', '234234', '643123123@g.com', 'Украина', 'N', 'dasd', '$2a$12$Wv0oYxQ.keDUwvqyzEj/Rui485qe2beoHZZBaAkl8XBt8JrMomD.e', '2021-06-13');

-- --------------------------------------------------------

--
-- Структура таблицы `colors`
--

CREATE TABLE `colors` (
  `color_id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `colors`
--

INSERT INTO `colors` (`color_id`, `name`) VALUES
(1, 'red'),
(2, 'green'),
(3, 'blue'),
(4, 'black'),
(5, 'white'),
(6, 'brown'),
(7, 'gray'),
(8, 'yellow');

-- --------------------------------------------------------

--
-- Структура таблицы `materials`
--

CREATE TABLE `materials` (
  `material_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `materials`
--

INSERT INTO `materials` (`material_id`, `name`) VALUES
(1, 'Silk'),
(2, 'Velvet'),
(3, 'Cotton'),
(4, 'Wool');

-- --------------------------------------------------------

--
-- Структура таблицы `options`
--

CREATE TABLE `options` (
  `option_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `type_id` int(10) NOT NULL,
  `size_id` int(10) NOT NULL,
  `color_id` int(10) NOT NULL,
  `available` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `options`
--

INSERT INTO `options` (`option_id`, `product_id`, `type_id`, `size_id`, `color_id`, `available`) VALUES
(1, 3, 2, 1, 2, 10),
(2, 2, 3, 2, 3, 1),
(3, 2, 1, 2, 2, 2),
(4, 2, 5, 2, 4, 1),
(5, 4, 2, 1, 8, 1),
(6, 6, 2, 1, 2, 4),
(7, 6, 3, 2, 2, 2),
(8, 5, 1, 5, 3, 4),
(9, 5, 4, 2, 5, 2),
(10, 5, 6, 4, 8, 11),
(11, 5, 5, 1, 5, 15),
(12, 8, 1, 4, 5, 14),
(13, 8, 6, 5, 5, 5),
(14, 8, 4, 6, 5, 2),
(15, 8, 5, 5, 3, 3),
(16, 12, 3, 1, 2, 6),
(17, 12, 3, 2, 4, 2),
(18, 7, 1, 3, 4, 5),
(19, 7, 2, 2, 6, 6),
(20, 7, 3, 1, 5, 7),
(21, 9, 4, 2, 1, 3),
(22, 3, 3, 2, 5, 11),
(23, 11, 4, 2, 5, 1),
(24, 10, 4, 2, 8, 2),
(25, 11, 3, 1, 7, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) NOT NULL,
  `client_id` int(10) NOT NULL,
  `status_id` int(10) NOT NULL,
  `payment_id` int(10) NOT NULL,
  `shipping_id` int(10) NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `order_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`order_id`, `client_id`, `status_id`, `payment_id`, `shipping_id`, `total_price`, `order_date`) VALUES
(1, 1, 1, 1, 1, '1000', '2021-06-17'),
(2, 1, 1, 1, 1, '1000', '2021-06-17'),
(10, 14, 1, 1, 1, '30000', '2021-06-10'),
(33, 14, 1, 1, 1, '300', '2021-06-14'),
(34, 14, 1, 1, 1, '300', '2021-06-14'),
(35, 14, 1, 1, 1, '300', '2021-06-14'),
(36, 14, 1, 1, 1, '325', '2021-06-14'),
(37, 14, 1, 1, 1, '600', '2021-06-14'),
(38, 14, 1, 1, 1, '600', '2021-06-14');

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

CREATE TABLE `order_details` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `option_id` int(10) NOT NULL,
  `count` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `option_id`, `count`) VALUES
(2, 2, 4, 2, 2),
(3, 2, 5, 8, 1),
(4, 1, 3, 1, 2),
(5, 10, 6, 6, 2),
(6, 10, 6, 7, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `order_status`
--

CREATE TABLE `order_status` (
  `status_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `order_status`
--

INSERT INTO `order_status` (`status_id`, `name`) VALUES
(1, 'Pending'),
(2, 'Finish');

-- --------------------------------------------------------

--
-- Структура таблицы `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `payment`
--

INSERT INTO `payment` (`payment_id`, `name`) VALUES
(1, 'cash');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `product_id` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `material_id` int(10) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`product_id`, `name`, `material_id`, `price`, `image`) VALUES
(2, 'It geek', 1, '300', 'http://localhost:8085/images/yooutube.png'),
(3, 'SW', 2, '450', 'http://localhost:8085/images/png-clipart-eye.png'),
(4, 'Strange creatures', 1, '222', 'http://localhost:8085/images/buterfly22.png'),
(5, 'Avengers', 2, '450', 'http://localhost:8085/images/spoodymoon1.png'),
(6, 'Hulk', 3, '600', 'http://localhost:8085/images/h77.png'),
(7, 'Soccer', 3, '100', 'http://localhost:8085/images/fb77.png'),
(8, 'Hokey', 3, '325', 'http://localhost:8085/images/nike44.png'),
(9, 'Sun shines', 1, '899', 'http://localhost:8085/images/sunshine33.png'),
(10, 'Wolverine', 3, '1000', 'http://localhost:8085/images/im_adas3123.png'),
(11, 'Ukaraine', 4, '10', 'http://localhost:8085/images/lightning_PNG52.png'),
(12, 'Rio', 3, '210', 'http://localhost:8085/images/456.png');

-- --------------------------------------------------------

--
-- Структура таблицы `shipping`
--

CREATE TABLE `shipping` (
  `shipping_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shipping`
--

INSERT INTO `shipping` (`shipping_id`, `name`, `active`) VALUES
(1, 'самовывоз', 1),
(2, 'вертолетом', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `sizes`
--

CREATE TABLE `sizes` (
  `size_id` int(10) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sizes`
--

INSERT INTO `sizes` (`size_id`, `name`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL'),
(5, 'XXL'),
(6, 'XXXL');

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `type_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`type_id`, `name`, `image`) VALUES
(1, 'Male', 'http://localhost:8085/images/man.png'),
(2, 'Female', 'http://localhost:8085/images/woman.png'),
(3, 'Child', 'http://localhost:8085/images/kids.png'),
(4, 'Unisex', 'http://localhost:8085/images/unisex.png'),
(5, 'Ringer', 'http://localhost:8085/images/ringer.png'),
(6, 'Long sleave', 'http://localhost:8085/images/long_sleaves.png');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Carts_fk0` (`client_id`),
  ADD KEY `Carts_fk1` (`product_id`),
  ADD KEY `Carts_fk2` (`option_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Индексы таблицы `categories_to_products`
--
ALTER TABLE `categories_to_products`
  ADD KEY `Categories_to_products_fk0` (`category_id`),
  ADD KEY `Categories_to_products_fk1` (`product_id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_email` (`email`);

--
-- Индексы таблицы `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`color_id`,`name`);

--
-- Индексы таблицы `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`material_id`,`name`);

--
-- Индексы таблицы `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `Options_fk0` (`product_id`),
  ADD KEY `Options_fk1` (`type_id`),
  ADD KEY `Options_fk2` (`size_id`),
  ADD KEY `Options_fk3` (`color_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `Orders_fk0` (`client_id`),
  ADD KEY `Orders_fk1` (`status_id`),
  ADD KEY `Orders_fk2` (`payment_id`),
  ADD KEY `Orders_fk3` (`shipping_id`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_details_fk0` (`order_id`),
  ADD KEY `Order_details_fk1` (`product_id`),
  ADD KEY `Order_details_fk2` (`option_id`);

--
-- Индексы таблицы `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Индексы таблицы `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `Products_fk0` (`material_id`);

--
-- Индексы таблицы `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`shipping_id`);

--
-- Индексы таблицы `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`size_id`,`name`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`type_id`,`name`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `colors`
--
ALTER TABLE `colors`
  MODIFY `color_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `materials`
--
ALTER TABLE `materials`
  MODIFY `material_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `order_status`
--
ALTER TABLE `order_status`
  MODIFY `status_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `shipping`
--
ALTER TABLE `shipping`
  MODIFY `shipping_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `sizes`
--
ALTER TABLE `sizes`
  MODIFY `size_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `Carts_fk0` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  ADD CONSTRAINT `Carts_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `Carts_fk2` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`);

--
-- Ограничения внешнего ключа таблицы `categories_to_products`
--
ALTER TABLE `categories_to_products`
  ADD CONSTRAINT `Categories_to_products_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `Categories_to_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Ограничения внешнего ключа таблицы `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `Options_fk0` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `Options_fk1` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`),
  ADD CONSTRAINT `Options_fk2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`),
  ADD CONSTRAINT `Options_fk3` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  ADD CONSTRAINT `Orders_fk1` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`status_id`),
  ADD CONSTRAINT `Orders_fk2` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `Orders_fk3` FOREIGN KEY (`shipping_id`) REFERENCES `shipping` (`shipping_id`);

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `Order_details_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `Order_details_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `Order_details_fk2` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `Products_fk0` FOREIGN KEY (`material_id`) REFERENCES `materials` (`material_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
