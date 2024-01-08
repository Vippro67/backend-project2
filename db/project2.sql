-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 05:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project2`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `post_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `media_id` varchar(36) DEFAULT NULL,
  `replied_comment_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `comment`, `created_at`, `updated_at`, `post_id`, `user_id`, `media_id`, `replied_comment_id`) VALUES
('10', 'Comment 10', '2023-01-10 00:00:00.000000', '2023-01-10 00:00:00.000000', '10', '10', NULL, NULL),
('11', 'Comment 11', '2023-01-11 00:00:00.000000', '2023-01-11 00:00:00.000000', '11', '11', NULL, NULL),
('12', 'Comment 12', '2023-01-12 00:00:00.000000', '2023-01-12 00:00:00.000000', '12', '12', NULL, NULL),
('13', 'Comment 13', '2023-01-13 00:00:00.000000', '2023-01-13 00:00:00.000000', '13', '13', NULL, NULL),
('14', 'Comment 14', '2023-01-14 00:00:00.000000', '2023-01-14 00:00:00.000000', '14', '14', NULL, NULL),
('15', 'Comment 15', '2023-01-15 00:00:00.000000', '2023-01-15 00:00:00.000000', '15', '15', NULL, NULL),
('16', 'Comment 16', '2023-01-16 00:00:00.000000', '2023-01-16 00:00:00.000000', '16', '16', NULL, NULL),
('17', 'Comment 17', '2023-01-17 00:00:00.000000', '2023-01-17 00:00:00.000000', '17', '17', NULL, NULL),
('18', 'Comment 18', '2023-01-18 00:00:00.000000', '2023-01-18 00:00:00.000000', '18', '18', NULL, NULL),
('19', 'Comment 19', '2023-01-19 00:00:00.000000', '2023-01-19 00:00:00.000000', '19', '19', NULL, NULL),
('20', 'Comment 20', '2023-01-20 00:00:00.000000', '2023-01-20 00:00:00.000000', '20', '20', NULL, NULL),
('3', 'Comment 3', '2023-01-03 00:00:00.000000', '2023-01-03 00:00:00.000000', '3', '3', NULL, NULL),
('4', 'Comment 4', '2023-01-04 00:00:00.000000', '2023-01-04 00:00:00.000000', '4', '4', NULL, NULL),
('5', 'Comment 5', '2023-01-05 00:00:00.000000', '2023-01-05 00:00:00.000000', '5', '5', NULL, NULL),
('6', 'Comment 6', '2023-01-06 00:00:00.000000', '2023-01-06 00:00:00.000000', '6', '6', NULL, NULL),
('7', 'Comment 7', '2023-01-07 00:00:00.000000', '2023-01-07 00:00:00.000000', '7', '7', NULL, NULL),
('8', 'Comment 8', '2023-01-08 00:00:00.000000', '2023-01-08 00:00:00.000000', '8', '8', NULL, NULL),
('9', 'Comment 9', '2023-01-09 00:00:00.000000', '2023-01-09 00:00:00.000000', '9', '9', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name`, `avatar`) VALUES
('1', 'Group A', 'https://th.bing.com/th/id/OIP.2-DBEetZQJOYju4Ppji54wAAAA?w=196&h=196&c=7&r=0&o=5&pid=1.7'),
('2', 'Group B', 'https://th.bing.com/th/id/OIP.qGOLkadA0gUUR1skf9_tzAHaHJ?w=201&h=194&c=7&r=0&o=5&pid=1.7'),
('24c3c0a0-cc4f-4747-894d-d709993636e6', 'First Group', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/group-avatar/1703901447690_cute-pet-names.webp'),
('3', 'Group C', 'https://th.bing.com/th/id/OIP.NiNq22y0m9Kjq62MyPqRnQHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7'),
('4', 'Group D', 'https://th.bing.com/th/id/OIP.MbRrz14TfcRboVEZOS0jHAHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7'),
('5', 'Group E', 'https://th.bing.com/th/id/OIP.ZR__fScgOGtJ-2ZBv4REhwHaFi?w=207&h=180&c=7&r=0&o=5&pid=1.7'),
('559accb8-3fda-4ddb-b7cd-9301ce24b45b', 'Dark Night', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/group-avatar/1703901560095_vn-11134103-7qukw-lk46hu5cfn3oed.webp');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` varchar(36) NOT NULL,
  `link` varchar(255) NOT NULL,
  `type` enum('image','video') NOT NULL,
  `post_id` varchar(36) DEFAULT NULL,
  `comment_id` varchar(36) DEFAULT NULL,
  `message_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `link`, `type`, `post_id`, `comment_id`, `message_id`) VALUES
('1', 'https://th.bing.com/th/id/OIP.TnnO-9C6THhBBCzOhTe7mQHaFj?w=240&h=180&c=7&r=0&o=5&pid=1.7', 'image', '1', NULL, NULL),
('10', 'https://th.bing.com/th/id/OIP.UUHMR8mxjDPix7jHiIQaCwHaGZ?w=240&h=208&c=7&r=0&o=5&pid=1.7', 'image', '10', NULL, NULL),
('11', 'https://th.bing.com/th/id/OIP.oE6W6qMBR1pft9ib57d74wHaEo?w=258&h=180&c=7&r=0&o=5&pid=1.7', 'image', '11', NULL, NULL),
('12', 'https://th.bing.com/th/id/OIP.6MDavCuFXbM7EJbEXwypNAHaEo?w=258&h=180&c=7&r=0&o=5&pid=1.7', 'image', '12', NULL, NULL),
('13', 'https://th.bing.com/th/id/OIP.nX35n2w3dQIVuWq8CufKfgHaE_?w=236&h=180&c=7&r=0&o=5&pid=1.7', 'image', '13', NULL, NULL),
('14', 'https://th.bing.com/th/id/OIP.evSMHzD12GF2CJR-xD38EwHaFS?w=292&h=208&c=7&r=0&o=5&pid=1.7', 'image', '14', NULL, NULL),
('15', 'https://th.bing.com/th/id/OIP.jbz323gjL3CqI69hfQYiAgHaFj?w=278&h=208&c=7&r=0&o=5&pid=1.7', 'image', '15', NULL, NULL),
('16', 'https://th.bing.com/th/id/OIP.N1dy0Tu_R4z_EDpWGSvn2wHaFc?w=284&h=208&c=7&r=0&o=5&pid=1.7', 'image', '16', NULL, NULL),
('17', 'https://th.bing.com/th/id/OIP.8ak1MH7xkgFjdD7EWd3qLAHaEo?w=297&h=185&c=7&r=0&o=5&pid=1.7', 'image', '17', NULL, NULL),
('18', 'https://th.bing.com/th/id/OIP.V-ycFFL9cB8gpoDQVDmQeAHaE8?w=264&h=180&c=7&r=0&o=5&pid=1.7', 'image', '18', NULL, NULL),
('19', 'https://th.bing.com/th/id/OIP.gpkEgEtW1tCFh8oCpXzlFwHaJ2?w=130&h=180&c=7&r=0&o=5&pid=1.7', 'image', '19', NULL, NULL),
('2', 'https://th.bing.com/th/id/OIP.wYKlnn-AR7OXey33JUjtlgHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7', 'image', '2', NULL, NULL),
('20', 'https://th.bing.com/th/id/OIP.UomPeXT-mlRCJhyhSV4_cAHaE8?w=243&h=180&c=7&r=0&o=5&pid=1.7', 'image', '20', NULL, NULL),
('21', 'https://th.bing.com/th/id/OIP.1x_Rcxq4GZ6tH2T5_XMTvgHaG_?w=153&h=181&c=7&r=0&o=5&pid=1.7', 'image', '21', NULL, NULL),
('22', 'https://th.bing.com/th/id/OIP.Y_Pi12--MuT9WZxY-ZvpiwHaFj?w=266&h=199&c=7&r=0&o=5&pid=1.7', 'image', '22', NULL, NULL),
('23', 'https://th.bing.com/th/id/OIP.w7U19MDPOXmHdMRf6CcY4AHaE7?w=304&h=203&c=7&r=0&o=5&pid=1.7', 'image', '23', NULL, NULL),
('24', 'https://th.bing.com/th?id=OIF.aOr31nimY%2bXQRhrGiU86Vg&w=257&h=180&c=7&r=0&o=5&pid=1.7', 'image', '24', NULL, NULL),
('25', 'https://th.bing.com/th/id/OIF.6jJ9l4p8m6dummoVdptsXw?w=308&h=180&c=7&r=0&o=5&pid=1.7', 'image', '25', NULL, NULL),
('26', 'https://th.bing.com/th/id/OIF.l7nHH6OMJzMV6uUcOCkqjg?w=269&h=202&c=7&r=0&o=5&pid=1.7', 'image', '26', NULL, NULL),
('27', 'https://th.bing.com/th?id=OIF.dC44p3YQ0ujM6mu3w5l%2fQw&w=175&h=180&c=7&r=0&o=5&pid=1.7', 'image', '27', NULL, NULL),
('28', 'https://th.bing.com/th/id/OIP.K6qhFAUra5cN_bBraD7tAAHaFQ?w=248&h=180&c=7&r=0&o=5&pid=1.7', 'image', '28', NULL, NULL),
('29', 'https://th.bing.com/th?q=Cute+Kawaii&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247', 'image', '29', NULL, NULL),
('3', 'https://th.bing.com/th?q=Cutest&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247', 'image', '3', NULL, NULL),
('30', 'https://th.bing.com/th/id/OIF.7Ohs4PwZmAKT97XO1efRkw?w=130&h=180&c=7&r=0&o=5&pid=1.7', 'image', '30', NULL, NULL),
('31', 'https://th.bing.com/th/id/OIP.6aWWtnAwA-Dqh_zkFd1QQQHaE8?w=302&h=202&c=7&r=0&o=5&pid=1.7', 'image', '31', NULL, NULL),
('32', 'media_url_group_b_2', 'image', '32', NULL, NULL),
('33', 'media_url_group_b_3', 'image', '33', NULL, NULL),
('34', 'media_url_group_b_4', 'image', '34', NULL, NULL),
('35', 'media_url_group_b_5', 'image', '35', NULL, NULL),
('36', 'media_url_group_b_6', 'image', '36', NULL, NULL),
('37', 'media_url_group_b_7', 'image', '37', NULL, NULL),
('38', 'media_url_group_b_8', 'image', '38', NULL, NULL),
('39', 'media_url_group_b_9', 'image', '39', NULL, NULL),
('4', 'media_url_4', 'image', '4', NULL, NULL),
('40', 'media_url_group_b_10', 'image', '40', NULL, NULL),
('5', 'media_url_5', 'image', '5', NULL, NULL),
('6', 'media_url_6', 'image', '6', NULL, NULL),
('7', 'media_url_7', 'image', '7', NULL, NULL),
('8', 'media_url_8', 'image', '8', NULL, NULL),
('9', 'media_url_9', 'image', '9', NULL, NULL),
('e4434075-7b20-4d87-ba90-a620b5291c61', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/post/1703901404204_hinh-anh-thu-cung.jpg', 'image', '86eabe21-be57-40f9-a837-cf1bdf23bda0', NULL, NULL),
('e4517c7e-f7bf-4476-bafc-373786a3d568', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/post/1703946817360_vn-11110103-6jrno-lk46i0r4rnyab8.16000461691343515.mp4', 'video', '80efb188-6f3a-437a-b2ff-1e089934c6d2', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `sender_id` varchar(36) NOT NULL,
  `receiver_id` varchar(36) DEFAULT NULL,
  `group_id` varchar(36) DEFAULT NULL,
  `media_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `content`, `created_at`, `sender_id`, `receiver_id`, `group_id`, `media_id`) VALUES
('1', 'Hello User 2!', '2023-01-01 00:00:00.000000', '1', '2', NULL, NULL),
('10', 'Hey User 11!', '2023-01-10 00:00:00.000000', '10', '11', NULL, NULL),
('11', 'Good to see you User 12!', '2023-01-11 00:00:00.000000', '11', '12', NULL, NULL),
('12', 'Whats up User 13?', '2023-01-12 00:00:00.000000', '12', '13', NULL, NULL),
('13', 'Hello User 14!', '2023-01-13 00:00:00.000000', '13', '14', NULL, NULL),
('14', 'Hi there User 15!', '2023-01-14 00:00:00.000000', '14', '15', NULL, NULL),
('15', 'Greetings User 16!', '2023-01-15 00:00:00.000000', '15', '16', NULL, NULL),
('16', 'Hey User 17!', '2023-01-16 00:00:00.000000', '16', '17', NULL, NULL),
('17', 'Good to see you User 18!', '2023-01-17 00:00:00.000000', '17', '18', NULL, NULL),
('18', 'Whats up User 19?', '2023-01-18 00:00:00.000000', '18', '19', NULL, NULL),
('19', 'Hello User 20!', '2023-01-19 00:00:00.000000', '19', '20', NULL, NULL),
('2', 'Hi there User 3!', '2023-01-02 00:00:00.000000', '2', '3', NULL, NULL),
('20', 'Hi there User 1!', '2023-01-20 00:00:00.000000', '20', '1', NULL, NULL),
('21', 'Group A: Meeting at 3 PM', '2023-01-21 00:00:00.000000', '1', NULL, '1', NULL),
('22', 'Group B: Discussing upcoming events', '2023-01-22 00:00:00.000000', '2', NULL, '2', NULL),
('23', 'Group A: Reminder about the party', '2023-01-23 00:00:00.000000', '3', NULL, '1', NULL),
('23ab5ab7-ef7e-481d-9b39-625613897448', 'only me', '2024-01-02 11:10:21.121559', 'd6582976-9c56-4dce-bdd6-feda722d2eea', NULL, '559accb8-3fda-4ddb-b7cd-9301ce24b45b', NULL),
('24', 'Group B: Important announcement', '2023-01-24 00:00:00.000000', '4', NULL, '2', NULL),
('25', 'Group A: Updates on the project', '2023-01-25 00:00:00.000000', '5', NULL, '1', NULL),
('26', 'Group B: Team building activities', '2023-01-26 00:00:00.000000', '6', NULL, '2', NULL),
('27', 'Group A: Lunch plans for tomorrow', '2023-01-27 00:00:00.000000', '7', NULL, '1', NULL),
('28', 'Group B: Feedback session', '2023-01-28 00:00:00.000000', '8', NULL, '2', NULL),
('29', 'Group A: New members welcome!', '2023-01-29 00:00:00.000000', '9', NULL, '1', NULL),
('3', 'Greetings User 4!', '2023-01-03 00:00:00.000000', '3', '4', NULL, NULL),
('30', 'Group B: Weekly progress report', '2023-01-30 00:00:00.000000', '10', NULL, '2', NULL),
('3925baba-3ae7-4d7e-9ffc-775faedb80a5', 'Test group chat', '2024-01-02 11:08:07.481944', 'd6582976-9c56-4dce-bdd6-feda722d2eea', NULL, '24c3c0a0-cc4f-4747-894d-d709993636e6', NULL),
('4', 'Hey User 5!', '2023-01-04 00:00:00.000000', '4', '5', NULL, NULL),
('5', 'Good to see you User 6!', '2023-01-05 00:00:00.000000', '5', '6', NULL, NULL),
('6', 'Whats up User 7?', '2023-01-06 00:00:00.000000', '6', '7', NULL, NULL),
('6af2fdaa-9f19-4861-9fae-19ba3cd4096c', 'Hi ethan', '2023-12-30 22:17:27.388424', '1', '20', NULL, NULL),
('7', 'Hello User 8!', '2023-01-07 00:00:00.000000', '7', '8', NULL, NULL),
('8', 'Hi there User 9!', '2023-01-08 00:00:00.000000', '8', '9', NULL, NULL),
('9', 'Greetings User 10!', '2023-01-09 00:00:00.000000', '9', '10', NULL, NULL),
('f577013f-c4fa-4eb4-b430-619ac92ba981', 'lo ethan', '2024-01-03 20:32:31.098856', 'd6582976-9c56-4dce-bdd6-feda722d2eea', '20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1703181752131, 'BaseTable1703181752131');

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `id` varchar(36) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `species` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `owner_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`id`, `avatar`, `name`, `species`, `sex`, `breed`, `date_of_birth`, `description`, `owner_id`) VALUES
('41', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/pet-avatar/1703948177922_download.jpg', 'Max', 'Dog', 'Male', 'Golden Retriever', '2022-01-01 00:00:00', 'Friendly and playful', '1'),
('42', 'https://th.bing.com/th/id/OIP._J_zkeC5KSf8SlJqk5ssowHaHX?w=201&h=200&c=7&r=0&o=5&pid=1.7', 'Bella', 'Cat', 'Female', 'Siamese', '2021-05-15 00:00:00', 'Independent and curious', '2'),
('43', 'https://www.bing.com/images/search?view=detailV2&ccid=SK5wY4lg&id=FA8476C0896386671BCA25BDBC328E132511CF7A&thid=OIP.SK5wY4lgde9BLB7PvANQxQHaFj&mediaurl=https%3a%2f%2fhinhanhdep.net%2fwp-content%2fuploads%2f2015%2f12%2fanh-cho-va-meo-17.jpg&cdnurl=https%3a', 'Charlie', 'Dog', 'Male', 'Labrador Retriever', '2020-09-10 00:00:00', 'Loyal and energetic', '3'),
('44', 'https://th.bing.com/th/id/OIP.VimLIbx0dtREl_V1sOtyYQHaE8?w=299&h=200&c=7&r=0&o=5&pid=1.7', 'Luna', 'Cat', 'Female', 'Persian', '2021-02-20 00:00:00', 'Gentle and affectionate', '4'),
('45', 'https://th.bing.com/th/id/OIP.875Uvd356M_upkjf-l8DlwHaE7?w=286&h=190&c=7&r=0&o=5&pid=1.7', 'Cooper', 'Dog', 'Male', 'German Shepherd', '2019-11-25 00:00:00', 'Intelligent and protective', '5'),
('46', 'https://th.bing.com/th/id/OIP.ZKF9x9aOy4uMtTUS3xkvowHaE8?w=298&h=200&c=7&r=0&o=5&pid=1.7', 'Milo', 'Cat', 'Male', 'Maine Coon', '2022-03-12 00:00:00', 'Adventurous and friendly', '6'),
('47', 'https://th.bing.com/th/id/OIP.20uBbeoCRXdVAYHp9fGv8gHaEo?w=302&h=188&c=7&r=0&o=5&pid=1.7', 'Lucy', 'Dog', 'Female', 'Beagle', '2020-07-08 00:00:00', 'Sweet and sociable', '7'),
('48', 'https://th.bing.com/th/id/OIP.XQj-g4r_FhOb5g-4j17RhAHaE6?w=295&h=196&c=7&r=0&o=5&pid=1.7', 'Leo', 'Cat', 'Male', 'Ragdoll', '2021-09-30 00:00:00', 'Relaxed and laid-back', '8'),
('49', 'https://th.bing.com/th/id/OIP._0HfB4O6mxGXCp9Ys2MQZQHaDy?w=334&h=180&c=7&r=0&o=5&pid=1.7', 'Sadie', 'Dog', 'Female', 'Dachshund', '2019-04-14 00:00:00', 'Clever and lively', '9'),
('50', 'https://th.bing.com/th/id/OIP.3-jEpQtF9lnLGVt0W0kvOQHaFj?w=266&h=200&c=7&r=0&o=5&pid=1.7', 'Simba', 'Cat', 'Male', 'Bengal', '2020-12-05 00:00:00', 'Playful and mischievous', '10'),
('61d15956-fa38-4a11-bedf-83595c7c29ff', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/pet-avatar/1704294231402_z4811036801402_3de8b99b7c8922146bf17926ec142531.jpg', 'Buffy', 'Cat', 'Female', 'Mood', '2023-01-11 07:00:00', 'Some thing', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('769a3033-47a7-4408-aaf4-bcacf772706b', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/pet-avatar/1703948246670_03a39fd798e26c562c0cae308afbfb1a.png', 'Buffy', 'Cat', 'Female', 'Mood', '2023-01-01 07:00:00', 'Friendly', '1');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_id` varchar(36) NOT NULL,
  `media_id` varchar(36) DEFAULT NULL,
  `group_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `description`, `created_at`, `updated_at`, `user_id`, `media_id`, `group_id`) VALUES
('1', 'First Post', 'Description 1', '2023-01-01 00:00:00.000000', '2023-01-01 00:00:00.000000', '1', '1', NULL),
('10', 'Incredible Moments', 'Description 10', '2023-01-10 00:00:00.000000', '2023-01-10 00:00:00.000000', '10', '10', NULL),
('11', 'Amazing Stories', 'Description 11', '2023-01-11 00:00:00.000000', '2023-01-11 00:00:00.000000', '11', '11', NULL),
('12', 'Inspiring Thoughts', 'Description 12', '2023-01-12 00:00:00.000000', '2023-01-12 00:00:00.000000', '12', '12', NULL),
('13', 'Fantastic Journey', 'Description 13', '2023-01-13 00:00:00.000000', '2023-01-13 00:00:00.000000', '13', '13', NULL),
('14', 'Unforgettable Memories', 'Description 14', '2023-01-14 00:00:00.000000', '2023-01-14 00:00:00.000000', '14', '14', NULL),
('15', 'Joyful Moments', 'Description 15', '2023-01-15 00:00:00.000000', '2023-01-15 00:00:00.000000', '15', '15', NULL),
('16', 'Random Musings', 'Description 16', '2023-01-16 00:00:00.000000', '2023-01-16 00:00:00.000000', '16', '16', NULL),
('17', 'Unexpected Surprises', 'Description 17', '2023-01-17 00:00:00.000000', '2023-01-17 00:00:00.000000', '17', '17', NULL),
('18', 'Creative Expressions', 'Description 18', '2023-01-18 00:00:00.000000', '2023-01-18 00:00:00.000000', '18', '18', NULL),
('19', 'Sharing Joy', 'Description 19', '2023-01-19 00:00:00.000000', '2023-01-19 00:00:00.000000', '19', '19', NULL),
('2', 'Some thing different', 'Description 2', '2023-01-02 00:00:00.000000', '2023-01-02 00:00:00.000000', '2', '2', NULL),
('20', 'Diverse Perspectives', 'Description 20', '2023-01-20 00:00:00.000000', '2023-01-20 00:00:00.000000', '20', '20', NULL),
('21', 'Group A Post 1', 'Description for Group A Post 1', '2023-01-21 00:00:00.000000', '2023-01-21 00:00:00.000000', '1', '21', '1'),
('22', 'Group A Post 2', 'Description for Group A Post 2', '2023-01-22 00:00:00.000000', '2023-01-22 00:00:00.000000', '2', '22', '1'),
('23', 'Group A Post 3', 'Description for Group A Post 3', '2023-01-23 00:00:00.000000', '2023-01-23 00:00:00.000000', '3', '23', '1'),
('24', 'Group A Post 4', 'Description for Group A Post 4', '2023-01-24 00:00:00.000000', '2023-01-24 00:00:00.000000', '4', '24', '1'),
('25', 'Group A Post 5', 'Description for Group A Post 5', '2023-01-25 00:00:00.000000', '2023-01-25 00:00:00.000000', '5', '25', '1'),
('26', 'Group A Post 6', 'Description for Group A Post 6', '2023-01-26 00:00:00.000000', '2023-01-26 00:00:00.000000', '6', '26', '1'),
('27', 'Group A Post 7', 'Description for Group A Post 7', '2023-01-27 00:00:00.000000', '2023-01-27 00:00:00.000000', '7', '27', '1'),
('28', 'Group A Post 8', 'Description for Group A Post 8', '2023-01-28 00:00:00.000000', '2023-01-28 00:00:00.000000', '8', '28', '1'),
('29', 'Group A Post 9', 'Description for Group A Post 9', '2023-01-29 00:00:00.000000', '2023-01-29 00:00:00.000000', '9', '29', '1'),
('3', 'Another Post', 'Description 3', '2023-01-03 00:00:00.000000', '2023-01-03 00:00:00.000000', '3', '3', NULL),
('30', 'Group A Post 10', 'Description for Group A Post 10', '2023-01-30 00:00:00.000000', '2023-01-30 00:00:00.000000', '10', '30', '1'),
('31', 'Group B Post 1', 'Description for Group B Post 1', '2023-01-31 00:00:00.000000', '2023-01-31 00:00:00.000000', '11', '31', '2'),
('32', 'Group B Post 2', 'Description for Group B Post 2', '2023-02-01 00:00:00.000000', '2023-02-01 00:00:00.000000', '12', '32', '2'),
('33', 'Group B Post 3', 'Description for Group B Post 3', '2023-02-02 00:00:00.000000', '2023-02-02 00:00:00.000000', '13', '33', '2'),
('34', 'Group B Post 4', 'Description for Group B Post 4', '2023-02-03 00:00:00.000000', '2023-02-03 00:00:00.000000', '14', '34', '2'),
('35', 'Group B Post 5', 'Description for Group B Post 5', '2023-02-04 00:00:00.000000', '2023-02-04 00:00:00.000000', '15', '35', '2'),
('36', 'Group B Post 6', 'Description for Group B Post 6', '2023-02-05 00:00:00.000000', '2023-02-05 00:00:00.000000', '16', '36', '2'),
('37', 'Group B Post 7', 'Description for Group B Post 7', '2023-02-06 00:00:00.000000', '2023-02-06 00:00:00.000000', '17', '37', '2'),
('38', 'Group B Post 8', 'Description for Group B Post 8', '2023-02-07 00:00:00.000000', '2023-02-07 00:00:00.000000', '18', '38', '2'),
('39', 'Group B Post 9', 'Description for Group B Post 9', '2023-02-08 00:00:00.000000', '2023-02-08 00:00:00.000000', '19', '39', '2'),
('4', 'Exciting News', 'Description 4', '2023-01-04 00:00:00.000000', '2023-01-04 00:00:00.000000', '4', '4', NULL),
('40', 'Group B Post 10', 'Description for Group B Post 10', '2023-02-09 00:00:00.000000', '2023-02-09 00:00:00.000000', '20', '40', '2'),
('5', 'Awesome Discovery', 'Description 5', '2023-01-05 00:00:00.000000', '2023-01-05 00:00:00.000000', '5', '5', NULL),
('6', 'Great Adventure', 'Description 6', '2023-01-06 00:00:00.000000', '2023-01-06 00:00:00.000000', '6', '6', NULL),
('7', 'New Beginnings', 'Description 7', '2023-01-07 00:00:00.000000', '2023-01-07 00:00:00.000000', '7', '7', NULL),
('8', 'Daily Reflection', 'Description 8', '2023-01-08 00:00:00.000000', '2023-01-08 00:00:00.000000', '8', '8', NULL),
('80efb188-6f3a-437a-b2ff-1e089934c6d2', 'Test Post Video', 'Video', '2023-12-30 21:33:37.351109', '2023-12-30 21:33:38.000000', 'd6582976-9c56-4dce-bdd6-feda722d2eea', 'e4517c7e-f7bf-4476-bafc-373786a3d568', '24c3c0a0-cc4f-4747-894d-d709993636e6'),
('86eabe21-be57-40f9-a837-cf1bdf23bda0', 'First Post By First User', 'My old database broke', '2023-12-30 08:56:44.206940', '2023-12-30 08:56:44.000000', 'd6582976-9c56-4dce-bdd6-feda722d2eea', 'e4434075-7b20-4d87-ba90-a620b5291c61', NULL),
('9', 'Fun Times Ahead', 'Description 9', '2023-01-09 00:00:00.000000', '2023-01-09 00:00:00.000000', '9', '9', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `user_id` varchar(36) NOT NULL,
  `post_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `tag_id` varchar(36) NOT NULL,
  `post_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`tag_id`, `post_id`) VALUES
('f42df829-4aca-4629-b2d7-e2f69317b3ef', '86eabe21-be57-40f9-a837-cf1bdf23bda0');

-- --------------------------------------------------------

--
-- Table structure for table `relationship`
--

CREATE TABLE `relationship` (
  `id` varchar(36) NOT NULL,
  `isFriend` tinyint(4) NOT NULL DEFAULT 0,
  `isBlocked` tinyint(4) NOT NULL DEFAULT 0,
  `status` enum('pending','confirmed') NOT NULL DEFAULT 'pending',
  `isFollowing` tinyint(4) NOT NULL DEFAULT 0,
  `userId` varchar(36) DEFAULT NULL,
  `friendId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationship`
--

INSERT INTO `relationship` (`id`, `isFriend`, `isBlocked`, `status`, `isFollowing`, `userId`, `friendId`) VALUES
('0aae42a6-b75b-4a58-80f0-9eae435e57f1', 1, 0, 'pending', 0, '2', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('0aae42a6-b75b-4a58-80f0-9eae435e57fq', 1, 0, 'pending', 0, '1', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('0aae42a6-b75b-4a58-80f0-eae435e57f15', 1, 0, 'pending', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '17'),
('93e11345-a1a3-4b45-a427-3b1bf86b4e53', 1, 0, 'confirmed', 0, '13', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('9a7523da-764a-4270-ae10-19982eddc35', 1, 0, 'confirmed', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '14'),
('9a7523da-764a-4270-ae10-19982eddc35e', 1, 0, 'pending', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '1'),
('b786b8a7-80a8-4ea4-8498-9de6e6889397', 1, 0, 'confirmed', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '13'),
('c8f67fe0-132a-48c0-9e47-36b7f43f974', 1, 0, 'confirmed', 0, '14', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('c8f67fe0-132a-48c0-9e47-36b7f43fa974', 1, 0, 'confirmed', 0, '10', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('c8f67fe0-132a-48c0-9e47-36b7f43fa977', 1, 0, 'confirmed', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '10'),
('c8f67fe0-132a-48c0-9e47-36b7f43fa97d', 1, 0, 'pending', 0, 'd6582976-9c56-4dce-bdd6-feda722d2eea', '14');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
('f1ae541e-99fd-4c04-900d-b26a5b336332', 'post'),
('f42df829-4aca-4629-b2d7-e2f69317b3ef', 'broke');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `userType` enum('regular','admin') NOT NULL DEFAULT 'regular',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `refresh_token`, `avatar`, `status`, `userType`, `created_at`, `updated_at`) VALUES
('1', 'William', 'Baker', 'william1@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6IndpbGxpYW0xQHNvbWV0aGluZy5jb20iLCJ1c2VyVHlwZSI6InJlZ3VsYXIiLCJpYXQiOjE3MDM5NDkzMzMsImV4cCI6MTcwNDU1NDEzM30.73P31UR8Lr-dwIeO7HdUmC2sG3bScojbAMRzbsISSO0', 'https://i.imgur.com/o8KHVr3.jpeg', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('10', 'Oliver', 'Anderson', 'oliver10@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://i.imgur.com/AXF1Ar1.jpeg', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('11', 'Sophia', 'Johnson', 'sophia11@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://i.imgur.com/eKUd3yp.jpeg', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('12', 'Jackson', 'Martinez', 'jackson12@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://i.imgur.com/iigRZOH.jpeg', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('13', 'Olivia', 'Hernandez', 'olivia13@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzIiwiZW1haWwiOiJvbGl2aWExM0Bzb21ldGhpbmcuY29tIiwidXNlclR5cGUiOiJyZWd1bGFyIiwiaWF0IjoxNzAzOTA0MjY3LCJleHAiOjE3MDQ1MDkwNjd9.cJk0oILBUJwf9nmZu84ZZ9GIyB8UYA6Pn3eK2gubK94', 'https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JTkFADdHoPj9uPujAqAv0w', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('14', 'Liam', 'Wang', 'liam14@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://images.hellomagazine.com/horizon/original_aspect_ratio/bca2149e8c59-bear-cheryl-baby-z.jpg?tx=c_limit,w_640', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('15', 'Lucas', 'Brown', 'lucas15@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIG.t.FGYWQLl5x7CQ1WKfJj?w=1024&h=1024&rs=1&pid=ImgDetMain', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('16', 'Ava', 'Nguyen', 'ava16@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIG.ndhp8V.rJWkLJx_D0CkL?pid=ImgGn', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('17', 'Mia', 'Garcia', 'mia17@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.4pKrrSrHCtM0fJz0EXev2wHaHv?w=233&h=243&c=7&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('18', 'Elijah', 'Smith', 'elijah18@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.1lNi0toKwqmxHIaiLYsS5QHaHa?w=173&h=184&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('19', 'Harper', 'Jones', 'harper19@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th?q=Harper+College+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('2', 'Emma', 'Johnson', 'emma2@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.ek1jy3UU28dSwVMdHnZfCwHaGt?w=200&h=181&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('20', 'Ethan', 'Davis', 'ethan20@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th?q=Davis+Amp&dc=2&w=100&h=100&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('3', 'Noah', 'Williams', 'noah3@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/R.8879c399edd2f04628cace42086e892d?rik=FnMavbNjI2jI7w&pid=ImgRaw&r=0', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('4', 'Olivia', 'Brown', 'olivia4@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.Kw_hW9OUqNFFjszKKTZS3AHaEK?w=288&h=180&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('5', 'James', 'Miller', 'james5@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.0TQ7Y4t5DDJ-simNH35hgQHaHa?w=180&h=180&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('6', 'Ava', 'Davis', 'ava6@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.6ILrw-deH6CV-5rVU2qJUAHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('7', 'Ethan', 'Wilson', 'ethan7@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.Ewx1WtuUCsiDyQrqwlPjFQHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('8', 'Isabella', 'Moore', 'isabella8@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.aIR_A_K0vwq9zgEewW_FSgHaHh?w=199&h=201&c=7&r=0&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('9', 'Liam', 'Taylor', 'liam9@something.com', '$2b$10$i4lZAmWL.hGmVEnQE0/HvufMph3zbODzEWMSKwmcpyL5j6NWjNCMy', NULL, 'https://th.bing.com/th/id/OIP.2_fH5dLjT0C4-977wc9jJAHaL7?w=233&h=375&c=7&o=5&pid=1.7', 1, 'regular', '2023-12-29 00:00:00.000000', '2023-12-29 00:00:00.000000'),
('d6582976-9c56-4dce-bdd6-feda722d2eea', 'Triệu', 'Tuấn Tú', 'tuantu120502@gmail.com', '$2b$10$SFGig8OLZV5rZYKCcGo55Ocvz1L7Q.QTIf10QEuaMmwl.V2jbbhvC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2NTgyOTc2LTljNTYtNGRjZS1iZGQ2LWZlZGE3MjJkMmVlYSIsImVtYWlsIjoidHVhbnR1MTIwNTAyQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoicmVndWxhciIsImlhdCI6MTcwNDI5NDE0OCwiZXhwIjoxNzA0ODk4OTQ4fQ.3YSJy3g_rNFrhrExGnfXXB6mPsRVHefpUXPcU0v', 'https://project2-media.s3.ap-southeast-1.amazonaws.com/avatar/1704293517333_z4811036801402_3de8b99b7c8922146bf17926ec142531.jpg', 1, 'regular', '2023-12-30 08:48:43.318452', '2023-12-30 08:48:43.318452');

-- --------------------------------------------------------

--
-- Table structure for table `user_groups`
--

CREATE TABLE `user_groups` (
  `group_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_groups`
--

INSERT INTO `user_groups` (`group_id`, `user_id`) VALUES
('1', '1'),
('1', '13'),
('1', '18'),
('1', '3'),
('1', '8'),
('2', '14'),
('2', '19'),
('2', '2'),
('2', '4'),
('2', '9'),
('24c3c0a0-cc4f-4747-894d-d709993636e6', 'd6582976-9c56-4dce-bdd6-feda722d2eea'),
('3', '10'),
('3', '15'),
('3', '20'),
('3', '5'),
('4', '11'),
('4', '16'),
('4', '6'),
('5', '12'),
('5', '17'),
('5', '7'),
('559accb8-3fda-4ddb-b7cd-9301ce24b45b', 'd6582976-9c56-4dce-bdd6-feda722d2eea');

-- --------------------------------------------------------

--
-- Table structure for table `user_history_tags`
--

CREATE TABLE `user_history_tags` (
  `tag_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_64555a834f96e9d38fd8a47908` (`media_id`),
  ADD KEY `FK_8aa21186314ce53c5b61a0e8c93` (`post_id`),
  ADD KEY `FK_bbfe153fa60aa06483ed35ff4a7` (`user_id`),
  ADD KEY `FK_3afd85332244fa4ce1a21720e08` (`replied_comment_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_20dc152fa567df67110b94d6f1` (`post_id`),
  ADD UNIQUE KEY `REL_06df0ecbcc0ce3e024007aef72` (`comment_id`),
  ADD UNIQUE KEY `REL_a33f77c90759d1f2c799941e7d` (`message_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_7d3846d3e3d5fd07241e1aebff` (`media_id`),
  ADD KEY `FK_c0ab99d9dfc61172871277b52f6` (`sender_id`),
  ADD KEY `FK_f4da40532b0102d51beb220f16a` (`receiver_id`),
  ADD KEY `FK_840551c7b5a3b5eda2e9b099ef4` (`group_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5116a00f46dd9097ed6bd8dd6a5` (`owner_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_049edb1ce7ab3d2a98009b171d` (`media_id`),
  ADD KEY `FK_52378a74ae3724bcab44036645b` (`user_id`),
  ADD KEY `FK_6d0d5abc465edbc42e054d0bb75` (`group_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`user_id`,`post_id`),
  ADD KEY `IDX_9b9a7fc5eeff133cf71b8e06a7` (`user_id`),
  ADD KEY `IDX_b40d37469c501092203d285af8` (`post_id`);

--
-- Indexes for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`tag_id`,`post_id`),
  ADD KEY `IDX_192ab488d1c284ac9abe2e3035` (`tag_id`),
  ADD KEY `IDX_5df4e8dc2cb3e668b962362265` (`post_id`);

--
-- Indexes for table `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bec502fd163c3ecc62e1dbbb053` (`userId`),
  ADD KEY `FK_d12cd28e574e46fd2fab223dce1` (`friendId`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`group_id`,`user_id`),
  ADD KEY `IDX_4c5f2c23c34f3921fbad2cd394` (`group_id`),
  ADD KEY `IDX_95bf94c61795df25a515435010` (`user_id`);

--
-- Indexes for table `user_history_tags`
--
ALTER TABLE `user_history_tags`
  ADD PRIMARY KEY (`tag_id`,`user_id`),
  ADD KEY `IDX_7c6cc13b8bf13eb422c6755a28` (`tag_id`),
  ADD KEY `IDX_5aff3d563c39be313062126d06` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_3afd85332244fa4ce1a21720e08` FOREIGN KEY (`replied_comment_id`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_64555a834f96e9d38fd8a479083` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_8aa21186314ce53c5b61a0e8c93` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bbfe153fa60aa06483ed35ff4a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `FK_06df0ecbcc0ce3e024007aef72f` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_20dc152fa567df67110b94d6f16` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a33f77c90759d1f2c799941e7db` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_7d3846d3e3d5fd07241e1aebff5` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_840551c7b5a3b5eda2e9b099ef4` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c0ab99d9dfc61172871277b52f6` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f4da40532b0102d51beb220f16a` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `FK_5116a00f46dd9097ed6bd8dd6a5` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_049edb1ce7ab3d2a98009b171d0` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_52378a74ae3724bcab44036645b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6d0d5abc465edbc42e054d0bb75` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `FK_9b9a7fc5eeff133cf71b8e06a7b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_b40d37469c501092203d285af80` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `FK_192ab488d1c284ac9abe2e30356` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_5df4e8dc2cb3e668b962362265d` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationship`
--
ALTER TABLE `relationship`
  ADD CONSTRAINT `FK_bec502fd163c3ecc62e1dbbb053` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d12cd28e574e46fd2fab223dce1` FOREIGN KEY (`friendId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD CONSTRAINT `FK_4c5f2c23c34f3921fbad2cd3940` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_95bf94c61795df25a5154350102` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_history_tags`
--
ALTER TABLE `user_history_tags`
  ADD CONSTRAINT `FK_5aff3d563c39be313062126d06f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_7c6cc13b8bf13eb422c6755a287` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
