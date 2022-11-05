-- MySQL dump 10.13  Distrib 5.5.37, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: WEBNOTES
-- ------------------------------------------------------
-- Server version	5.5.37-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BOOKMARKS`
--

DROP TABLE IF EXISTS `BOOKMARKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOKMARKS` (
  `USERID` int(11) NOT NULL,
  `URLHASH` varchar(41) NOT NULL,
  `TIMESTAMP` datetime NOT NULL,
  `TAGS` varchar(255) NOT NULL,
  `FOLDER` varchar(255) NOT NULL,
  `NOTES` text NOT NULL,
  `TICKCOUNT` int(11) NOT NULL,
  `PERMALINK` varchar(20) NOT NULL,
  `USERTAGS` varchar(128) NOT NULL,
  `SCORE` int(11) NOT NULL,
  UNIQUE KEY `unique_index` (`USERID`,`URLHASH`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FOLLOW`
--

DROP TABLE IF EXISTS `FOLLOW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FOLLOW` (
  `READER` varchar(32) DEFAULT NULL,
  `WRITER` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GROUPREAD`
--

DROP TABLE IF EXISTS `GROUPREAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GROUPREAD` (
  `USERNAME` varchar(32) NOT NULL,
  `GROUPNAME` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GROUPWRITE`
--

DROP TABLE IF EXISTS `GROUPWRITE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GROUPWRITE` (
  `USERNAME` varchar(32) NOT NULL,
  `GROUPNAME` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SITELISTBETA`
--

DROP TABLE IF EXISTS `SITELISTBETA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SITELISTBETA` (
  `rank` int(11) NOT NULL DEFAULT '0',
  `site` varchar(500) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `hits` int(11) DEFAULT NULL,
  `md5` char(32) NOT NULL,
  PRIMARY KEY (`rank`),
  UNIQUE KEY `site` (`site`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `URLDOM`
--

DROP TABLE IF EXISTS `URLDOM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `URLDOM` (
  `URLHASH` varchar(41) NOT NULL,
  `DOM` varchar(4096) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `URLMASTER`
--

DROP TABLE IF EXISTS `URLMASTER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `URLMASTER` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `SITE` varchar(512) NOT NULL,
  `TITLE` varchar(200) DEFAULT NULL,
  `DESCRIPTION` varchar(1024) NOT NULL,
  `AUTOTAG` varchar(200) NOT NULL,
  `URLHASH` varchar(41) NOT NULL,
  `DOMAIN` varchar(256) NOT NULL,
  `KEYWORDS` varchar(512) NOT NULL,
  `IMGURL` varchar(256) NOT NULL,
  `PREVIEW` int(11) NOT NULL,
  PRIMARY KEY (`PID`),
  UNIQUE KEY `site_unique` (`SITE`)
) ENGINE=InnoDB AUTO_INCREMENT=184482 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `URLSET`
--

DROP TABLE IF EXISTS `URLSET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `URLSET` (
  `READER` varchar(32) DEFAULT NULL,
  `WRITER` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERPROFILE`
--

DROP TABLE IF EXISTS `USERPROFILE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERPROFILE` (
  `NAME` varchar(32) NOT NULL,
  `GUID` varchar(50) NOT NULL,
  `PROFILE` int(10) NOT NULL AUTO_INCREMENT,
  `TOKEN` varchar(64) DEFAULT NULL,
  `PHASH` varchar(42) NOT NULL,
  PRIMARY KEY (`PROFILE`),
  UNIQUE KEY `GUID` (`GUID`),
  UNIQUE KEY `NAME` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=1253 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_reco`
--

DROP TABLE IF EXISTS `_reco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_reco` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `SITE` varchar(256) NOT NULL,
  `CATEGORY` varchar(300) DEFAULT NULL,
  `TIMEADDED` datetime NOT NULL DEFAULT '2014-01-01 00:30:00',
  `TITLE` varchar(200) DEFAULT NULL,
  `FOLDER` varchar(128) NOT NULL,
  `DESCRIPTION` varchar(1024) NOT NULL,
  `COLLECTION` varchar(200) NOT NULL,
  PRIMARY KEY (`PID`),
  UNIQUE KEY `site_unique` (`SITE`)
) ENGINE=InnoDB AUTO_INCREMENT=3239 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_reco1`
--

DROP TABLE IF EXISTS `_reco1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_reco1` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `SITE` varchar(256) NOT NULL,
  `CATEGORY` varchar(300) DEFAULT NULL,
  `TIMEADDED` datetime NOT NULL DEFAULT '2014-01-01 00:30:00',
  `TITLE` varchar(200) DEFAULT NULL,
  `FOLDER` varchar(128) NOT NULL,
  `DESCRIPTION` varchar(1024) NOT NULL,
  `COLLECTION` varchar(200) NOT NULL,
  PRIMARY KEY (`PID`),
  UNIQUE KEY `site_unique` (`SITE`)
) ENGINE=InnoDB AUTO_INCREMENT=3239 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_configuration`
--

DROP TABLE IF EXISTS `auth_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_filelist`
--

DROP TABLE IF EXISTS `auth_filelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_filelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_group_action_permits`
--

DROP TABLE IF EXISTS `auth_group_action_permits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_action_permits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `permits` varchar(400) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_group_page_matches`
--

DROP TABLE IF EXISTS `auth_group_page_matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_page_matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_groups`
--

DROP TABLE IF EXISTS `auth_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `can_delete` tinyint(1) NOT NULL,
  `home_page_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_nav`
--

DROP TABLE IF EXISTS `auth_nav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu` varchar(75) NOT NULL,
  `page` varchar(175) NOT NULL,
  `name` varchar(150) NOT NULL,
  `position` int(11) NOT NULL,
  `class_name` varchar(150) NOT NULL,
  `icon` varchar(150) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_nav_group_matches`
--

DROP TABLE IF EXISTS `auth_nav_group_matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_nav_group_matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_pages`
--

DROP TABLE IF EXISTS `auth_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(150) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_plugin_configuration`
--

DROP TABLE IF EXISTS `auth_plugin_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_plugin_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  `binary` int(1) NOT NULL,
  `variable` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user_action_permits`
--

DROP TABLE IF EXISTS `auth_user_action_permits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_action_permits` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `permits` varchar(400) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user_group_matches`
--

DROP TABLE IF EXISTS `auth_user_group_matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_group_matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `activation_token` varchar(225) NOT NULL,
  `last_activation_request` int(11) NOT NULL,
  `lost_password_request` tinyint(1) NOT NULL,
  `lost_password_timestamp` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `title` varchar(150) NOT NULL,
  `sign_up_stamp` int(11) NOT NULL,
  `last_sign_in_stamp` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Specifies if the account is enabled.  Disabled accounts cannot be logged in to, but they retain all of their data and settings.',
  `primary_group_id` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Specifies the primary group for the user.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-15  3:44:51
