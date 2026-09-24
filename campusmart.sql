-- Database: `campusmart`
CREATE DATABASE IF NOT EXISTS `campusmart` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `campusmart`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `mobile` VARCHAR(15) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_type` VARCHAR(50) NOT NULL DEFAULT 'student',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `section` VARCHAR(50) NOT NULL DEFAULT 'student',
  `user_id` INT(11) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `contact`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `categories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `section` ENUM('girls','student','boys') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Insert default categories safely
-- --------------------------------------------------------
INSERT IGNORE INTO `categories` (`id`, `category_name`, `section`) VALUES
(1, 'Lipstick', 'girls'),
(2, 'Face Wash', 'girls'),
(3, 'Perfume', 'girls'),
(4, 'Shampoo', 'girls'),
(5, 'Skin Care', 'girls'),
(6, 'Notebook', 'student'),
(7, 'Pen', 'student'),
(8, 'Pencil', 'student'),
(9, 'Geometry Box', 'student'),
(10, 'School Bag', 'student'),
(11, 'Hair Wax', 'boys'),
(12, 'Trimmer', 'boys'),
(13, 'Deodorant', 'boys'),
(14, 'Boys Face Wash', 'boys'),
(15, 'Belts & Wallets', 'boys');

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL DEFAULT 1,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('Pending','Confirmed','Delivered','Cancelled') DEFAULT 'Pending',
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
