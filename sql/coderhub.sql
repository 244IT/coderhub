/*
 Navicat MySQL Data Transfer

 Source Server         : chh
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : coderhub

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/05/2021 23:06:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (8, '74bbd0315f033bccd62e000369c5cee5', 'image/jpeg', 27874, 1, '2021-01-20 23:51:40', '2021-01-20 23:51:40');
INSERT INTO `avatar` VALUES (9, '0a3df3e10580dc8a143935a01283077c', 'image/jpeg', 32988, 2, '2021-01-25 23:57:35', '2021-01-25 23:57:35');
INSERT INTO `avatar` VALUES (10, '9f23634777a7106bbec22cac19e69b79', 'image/jpeg', 38812, 4, '2021-01-26 22:48:55', '2021-01-26 22:48:55');
INSERT INTO `avatar` VALUES (11, 'ad9278698e6b24f692eed7c2cf385f9d', 'image/png', 981526, 3, '2021-03-28 18:03:11', '2021-03-28 18:03:11');
INSERT INTO `avatar` VALUES (12, 'e7f778e1884b9a37ecdf2a3634e987fa', 'image/png', 981526, 3, '2021-03-28 18:07:31', '2021-03-28 18:07:31');
INSERT INTO `avatar` VALUES (13, '61e46ae9b6d5267a5799b4deeeb92854', 'image/png', 981526, 3, '2021-03-28 18:08:42', '2021-03-28 18:08:42');
INSERT INTO `avatar` VALUES (14, '2176f1c24f985202f7166e328ef44498', 'image/jpeg', 37781, 3, '2021-03-28 20:20:46', '2021-03-28 20:20:46');
INSERT INTO `avatar` VALUES (15, '27247ee593f42dec93fc60a93665cf9f', 'image/jpeg', 37781, 3, '2021-03-28 20:30:20', '2021-03-28 20:30:20');
INSERT INTO `avatar` VALUES (16, 'd8880268eda4ac85b8133ed889021105', 'image/jpeg', 37781, 3, '2021-03-28 20:49:09', '2021-03-28 20:49:09');
INSERT INTO `avatar` VALUES (17, '6823e5fa3ca47a63a5bcc6fbae53f13b', 'image/png', 104844, 3, '2021-03-28 20:55:29', '2021-03-28 20:55:29');
INSERT INTO `avatar` VALUES (18, '8d0fe8250689a45f67b5aa8c5f731e70', 'image/jpeg', 37781, 3, '2021-03-28 20:56:39', '2021-03-28 20:56:39');
INSERT INTO `avatar` VALUES (19, 'dbd50dc9928df9262fd09b0f502a0771', 'image/png', 104844, 3, '2021-03-28 21:00:13', '2021-03-28 21:00:13');
INSERT INTO `avatar` VALUES (20, '23ef1d84ee07c66a494f9ef02f12f82b', 'image/jpeg', 37781, 3, '2021-03-28 21:01:06', '2021-03-28 21:01:06');
INSERT INTO `avatar` VALUES (21, '3e3d849740ad089016f5f3a57034ac6a', 'image/jpeg', 55362, 5, '2021-03-29 20:21:08', '2021-03-29 20:21:08');
INSERT INTO `avatar` VALUES (22, 'a86fcaaf80dd6814b2739878f0e21365', 'image/jpeg', 55362, 5, '2021-03-29 20:24:00', '2021-03-29 20:24:00');
INSERT INTO `avatar` VALUES (23, '5ea761d203b743fa895650ada013e47e', 'image/jpeg', 55362, 5, '2021-03-29 20:28:01', '2021-03-29 20:28:01');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES (1, 'vue', '2021-04-29 17:55:57', '2021-04-29 17:55:57');
INSERT INTO `collection` VALUES (2, 'JS', '2021-04-29 17:59:11', '2021-04-29 17:59:11');
INSERT INTO `collection` VALUES (3, 'CSS', '2021-04-29 18:00:22', '2021-04-29 18:00:22');
INSERT INTO `collection` VALUES (4, 'HTML', '2021-04-29 18:01:46', '2021-04-29 18:01:46');
INSERT INTO `collection` VALUES (5, 'MYSQL', '2021-04-30 14:32:41', '2021-04-30 14:32:41');
INSERT INTO `collection` VALUES (6, 'jQuery', '2021-05-05 12:16:14', '2021-05-05 12:16:14');
INSERT INTO `collection` VALUES (7, 'LINUX', '2021-05-05 16:19:00', '2021-05-05 16:19:00');

-- ----------------------------
-- Table structure for collection_moment
-- ----------------------------
DROP TABLE IF EXISTS `collection_moment`;
CREATE TABLE `collection_moment`  (
  `user_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`, `collection_id`, `moment_id`) USING BTREE,
  INDEX `collection_id`(`collection_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `collection_moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_moment_ibfk_2` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_moment_ibfk_3` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection_moment
-- ----------------------------
INSERT INTO `collection_moment` VALUES (1, 2, 3, '2021-04-30 14:24:35', '2021-04-30 14:24:35');
INSERT INTO `collection_moment` VALUES (1, 5, 1, '2021-05-06 11:31:46', '2021-05-06 11:31:46');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `moment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `reply_comment_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  INDEX `reply_comment_id`(`reply_comment_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`reply_comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (19, '​小程序并非凭空冒出来的一个概念。当微信中的 WebView 逐渐成为移动 Web 的一个重要入口时，微信就有相关的 JS API 了', 3, 4, NULL, '2021-03-25 23:02:45', '2021-03-25 23:02:45', NULL);
INSERT INTO `comment` VALUES (20, '可以使用到微信的原生能力，去完成一些之前做不到或者难以做到的事情', 3, 4, NULL, '2021-03-27 12:18:02', '2021-03-27 12:18:02', NULL);
INSERT INTO `comment` VALUES (21, '很多外部开发者发现了之后，依葫芦画瓢地使用了，逐渐成为微信中网页的事实标准', 3, 4, NULL, '2021-03-27 12:29:05', '2021-03-27 12:29:05', NULL);
INSERT INTO `comment` VALUES (22, '​小程序的主要开发语言是 JavaScript ，小程序的开发同普通的网页开发相比有很大的相似性', 3, 4, NULL, '2021-03-27 12:29:55', '2021-03-27 12:29:55', NULL);
INSERT INTO `comment` VALUES (23, '对于前端开发者而言，从网页开发迁移到小程序的开发成本并不高，但是二者还是有些许区别的', 3, 4, NULL, '2021-03-27 12:30:47', '2021-03-27 12:30:47', NULL);
INSERT INTO `comment` VALUES (24, '​网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应，而在小程序中，二者是分开的，分别运行在不同的线程中', 3, 4, NULL, '2021-03-27 12:32:52', '2021-03-27 12:32:52', NULL);
INSERT INTO `comment` VALUES (25, '你说的太对了', 3, 2, 19, '2021-03-27 13:02:30', '2021-03-27 13:02:30', 19);
INSERT INTO `comment` VALUES (26, '努力努力', 3, 2, 19, '2021-03-27 13:07:33', '2021-03-27 13:07:33', 19);
INSERT INTO `comment` VALUES (27, '可以可以', 3, 2, 20, '2021-03-27 13:13:43', '2021-03-27 13:13:43', 20);
INSERT INTO `comment` VALUES (28, '我要出去逛街了', 3, 2, 20, '2021-03-27 13:14:46', '2021-03-27 13:14:46', 20);
INSERT INTO `comment` VALUES (29, '努力努力再努力', 3, 2, 20, '2021-03-27 13:16:14', '2021-03-27 13:16:14', 20);
INSERT INTO `comment` VALUES (30, '你说的太对了', 3, 2, 21, '2021-03-27 13:17:25', '2021-03-27 13:17:25', 21);
INSERT INTO `comment` VALUES (31, '加油加油', 3, 2, 21, '2021-03-27 13:18:16', '2021-03-27 13:18:16', 21);
INSERT INTO `comment` VALUES (33, '努力努力', 3, 1, 26, '2021-03-27 13:46:33', '2021-03-27 13:46:33', 19);
INSERT INTO `comment` VALUES (34, '我赞同你的观点', 3, 1, 26, '2021-03-27 13:49:15', '2021-03-27 13:49:15', 19);
INSERT INTO `comment` VALUES (35, '一起努力', 3, 1, 29, '2021-03-27 13:54:37', '2021-03-27 13:54:37', 20);
INSERT INTO `comment` VALUES (36, 'okok', 3, 1, 29, '2021-03-27 13:58:30', '2021-03-27 13:58:30', 20);
INSERT INTO `comment` VALUES (37, '666', 3, 2, 23, '2021-03-28 11:59:46', '2021-03-28 11:59:46', 23);
INSERT INTO `comment` VALUES (38, '我也赞同', 3, 3, 34, '2021-03-28 17:57:58', '2021-03-28 17:57:58', 19);
INSERT INTO `comment` VALUES (39, '我要报名，加我一个！', 6, 1, NULL, '2021-03-29 20:14:04', '2021-03-29 20:14:04', NULL);
INSERT INTO `comment` VALUES (40, '我们班今晚晚自习呢！！！', 6, 5, 39, '2021-03-29 20:16:20', '2021-03-29 20:16:20', 39);
INSERT INTO `comment` VALUES (41, '111', 1, 5, NULL, '2021-04-06 21:15:18', '2021-04-06 21:15:18', NULL);
INSERT INTO `comment` VALUES (42, 'coderwhy yyds', 1, 1, 41, '2021-04-22 14:13:07', '2021-04-22 14:13:07', 41);
INSERT INTO `comment` VALUES (43, 'coderwhy yyds', 1, 1, NULL, '2021-04-22 18:20:05', '2021-04-22 18:20:05', NULL);
INSERT INTO `comment` VALUES (44, '测试评论', 8, 1, NULL, '2021-04-22 18:24:00', '2021-04-22 18:24:00', NULL);
INSERT INTO `comment` VALUES (45, '测试评论2', 8, 1, NULL, '2021-04-22 18:25:07', '2021-04-22 18:25:07', NULL);

-- ----------------------------
-- Table structure for comment_favor
-- ----------------------------
DROP TABLE IF EXISTS `comment_favor`;
CREATE TABLE `comment_favor`  (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`, `comment_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `comment_favor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_favor_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_favor
-- ----------------------------
INSERT INTO `comment_favor` VALUES (1, 19, '2021-05-06 14:01:37', '2021-05-06 14:01:37');
INSERT INTO `comment_favor` VALUES (1, 41, '2021-04-28 15:36:30', '2021-04-28 15:36:30');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `moment_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (9, '16303d87c6c67bd55b907a6dbcedf5db', 'image/jpeg', 184292, 1, 1, '2021-01-26 21:42:50', '2021-01-26 21:42:50');
INSERT INTO `file` VALUES (10, 'd1b0c07591e7d2f0ab2a691d7c004007', 'image/jpeg', 150862, 1, 1, '2021-01-26 21:42:50', '2021-01-26 21:42:50');
INSERT INTO `file` VALUES (12, '43142aed9f75d15bb7c5e650df425a28', 'image/png', 139590, 26, 3, '2021-03-29 16:59:25', '2021-03-29 16:59:25');
INSERT INTO `file` VALUES (13, '15974712131df6f542ffc0a233499799', 'image/jpeg', 184292, 26, 3, '2021-03-29 16:59:25', '2021-03-29 16:59:25');
INSERT INTO `file` VALUES (14, '6e04bd1806e2b3e976ad75825803c059', 'image/jpeg', 410651, 3, 1, '2021-03-29 19:35:13', '2021-03-29 19:35:13');
INSERT INTO `file` VALUES (15, 'f795ed762ef2a659bb0355538ae6ebda', 'image/png', 82606, 6, 2, '2021-03-29 19:58:37', '2021-03-29 19:58:37');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `img_url` varchar(130) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '计算机', '2021-01-17 14:35:27', '2021-03-28 16:24:37', 'http://admin.chenhaohui.cn/img/coderhub/label_internet.jpg');
INSERT INTO `label` VALUES (3, '财经', '2021-01-17 18:32:15', '2021-03-28 16:24:26', 'http://admin.chenhaohui.cn/img/coderhub/label_money.jpg');
INSERT INTO `label` VALUES (4, '比赛', '2021-01-17 18:32:15', '2021-03-28 16:24:16', 'http://admin.chenhaohui.cn/img/coderhub/label_pk.jpg');
INSERT INTO `label` VALUES (5, '运动', '2021-01-17 18:33:28', '2021-03-28 16:23:46', 'http://admin.chenhaohui.cn/img/coderhub/label_sport.jpg');
INSERT INTO `label` VALUES (6, '生活', '2021-01-17 18:33:28', '2021-03-28 16:24:43', 'http://admin.chenhaohui.cn/img/coderhub/label_life.jpg');
INSERT INTO `label` VALUES (7, '失物招领', '2021-01-17 20:48:28', '2021-03-28 16:24:59', 'http://admin.chenhaohui.cn/img/coderhub/label_get.jpg');
INSERT INTO `label` VALUES (8, 'vue', '2021-01-26 22:39:47', '2021-03-28 17:26:06', 'http://admin.chenhaohui.cn/img/coderhub/label_vue.png');

-- ----------------------------
-- Table structure for label_moment
-- ----------------------------
DROP TABLE IF EXISTS `label_moment`;
CREATE TABLE `label_moment`  (
  `moment_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `label_moment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `label_moment_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label_moment
-- ----------------------------
INSERT INTO `label_moment` VALUES (1, 5, '2021-01-26 22:43:33', '2021-03-29 02:04:12');
INSERT INTO `label_moment` VALUES (3, 5, '2021-01-17 20:34:55', '2021-01-17 20:34:55');
INSERT INTO `label_moment` VALUES (5, 5, '2021-03-29 19:40:06', '2021-03-29 19:40:06');
INSERT INTO `label_moment` VALUES (6, 5, '2021-01-30 23:35:51', '2021-03-29 19:51:54');
INSERT INTO `label_moment` VALUES (7, 5, '2021-03-29 19:44:16', '2021-03-29 19:44:16');
INSERT INTO `label_moment` VALUES (25, 6, '2021-03-29 16:57:04', '2021-03-29 16:57:04');
INSERT INTO `label_moment` VALUES (26, 7, '2021-03-29 16:59:24', '2021-03-29 16:59:24');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '我说错了，C语言才是最好的语言~', 4, '2020-11-23 22:05:23', '2021-03-28 22:37:49', '测试标题1');
INSERT INTO `moment` VALUES (3, '感冒是由病毒或细菌引起的急性上呼吸道疾病。一般的感冒或者呼吸道感染对身体的影响并不是很大，影响较大的是病毒性感冒。但在进行运动时需要注意观察运动中和运动后是否出现体力不支、呼吸急促的现象，如果是，那么建议先适度休息。如果症状在脖子以下，例如胸闷、咳嗽或胃部不适，这些症状一般代表身体的某个部位出现发炎的状态，此时继续运动很可能会使病情加重，不建议运动。', 1, '2020-11-23 22:21:19', '2021-03-29 19:34:33', '感冒了要不要继续跑步？');
INSERT INTO `moment` VALUES (5, '做双腿训练很重要，但是想让下肢更强壮一点，那么锻炼时应该要尽可能的加上单边动作，否则就不容易刺激到所有肌肉，增加的可能只是代偿的力量，而不是真正的肌力，还会因为重量太大，会提高脚、背…等部位受伤的风险。单脚训练可以训练肌力平衡和稳定动度…等等，我们后面再详细说明。先来跟著教官学学单腿训练的动作吧！', 1, '2020-11-23 22:21:19', '2021-03-29 19:38:06', '提升腿部训练效果 请在菜单中加这个！');
INSERT INTO `moment` VALUES (6, '今天晚上8点，学校操场，一起跑步的可以报名啦，留下你的联系方式。让我们运动不止，生命不息！', 2, '2020-11-23 22:21:19', '2021-03-29 19:58:36', '晨跑小分队报名');
INSERT INTO `moment` VALUES (7, '缺少詹眉双核的湖人陷入到与魔术苦战，哪怕他们一度取得过13分领先优势，却被魔术不断追分末节被反超比分。最后阶段湖人内外开花重新夺回领先，最终险胜魔术取得2连胜稳固西部前四名。湖人赢球源自三大主力给力表现，库兹马贡献21+11+4，施罗德也贡献24+5+6，而板凳第六人哈雷尔也有18+11进账，如此三人让魔术无计可施。', 1, '2020-11-23 22:21:19', '2021-03-29 19:44:15', '湖人3分险胜东部倒数第2');
INSERT INTO `moment` VALUES (8, '限定目的，能使人生变得简洁。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:07', '测试标题8');
INSERT INTO `moment` VALUES (9, '翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', 4, '2020-11-23 22:21:19', '2021-03-28 22:38:09', '测试标题9');
INSERT INTO `moment` VALUES (10, '一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:14', '测试标题10');
INSERT INTO `moment` VALUES (12, '如果你给我的，和你给别人的是一样的，那我就不要了。', 3, '2020-11-23 22:21:19', '2021-03-28 22:38:18', '测试标题12');
INSERT INTO `moment` VALUES (13, '故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:20', '测试标题13');
INSERT INTO `moment` VALUES (14, '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:21', '测试标题14');
INSERT INTO `moment` VALUES (15, '你如果认识从前的我，也许你会原谅现在的我。', 4, '2020-11-23 22:21:19', '2021-03-28 22:38:24', '测试标题15');
INSERT INTO `moment` VALUES (16, '每一个不曾起舞的日子，都是对生命的辜负。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:26', '测试标题16');
INSERT INTO `moment` VALUES (17, '向来缘浅，奈何情深。', 2, '2020-11-23 22:21:19', '2021-03-28 22:38:28', '测试标题17');
INSERT INTO `moment` VALUES (18, '心之所向 素履以往 生如逆旅 一苇以航', 3, '2020-11-23 22:21:19', '2021-03-28 22:38:30', '测试标题18');
INSERT INTO `moment` VALUES (19, '生如夏花之绚烂，死如秋叶之静美。', 3, '2020-11-23 22:21:19', '2021-03-28 22:38:32', '测试标题19');
INSERT INTO `moment` VALUES (20, '答案很长，我准备用一生的时间来回答，你准备要听了吗？', 4, '2020-11-23 22:21:19', '2021-03-28 22:38:35', '测试标题20');
INSERT INTO `moment` VALUES (21, '因为爱过，所以慈悲；因为懂得，所以宽容。', 4, '2020-11-23 22:21:19', '2021-03-28 22:38:39', '测试标题21');
INSERT INTO `moment` VALUES (22, '如果需要在用户输入的同时改变 this.data.value ，需要借助简易双向绑定机制。此时，可以在对应项目之前加入 model: 前缀：', 3, '2021-03-29 00:31:42', '2021-03-29 00:31:42', '简易双向绑定');
INSERT INTO `moment` VALUES (23, '如果需要在用户输入的同时改变 this.data.value ，需要借助简易双向绑定机制。此时，可以在对应项目之前加入 model: 前缀：', 3, '2021-03-29 00:33:35', '2021-03-29 00:33:35', '简易双向绑定');
INSERT INTO `moment` VALUES (24, '我会游泳啥都会', 3, '2021-03-29 16:53:38', '2021-03-29 16:53:38', '我的运动超棒');
INSERT INTO `moment` VALUES (25, '我的生活还不错', 3, '2021-03-29 16:57:04', '2021-03-29 16:57:04', '我的生活');
INSERT INTO `moment` VALUES (26, '谁有看见吗', 3, '2021-03-29 16:59:24', '2021-03-29 16:59:24', '我的钥匙丢了');
INSERT INTO `moment` VALUES (27, 'java是世界上最好的语言', 5, '2021-05-06 17:19:44', '2021-05-06 17:19:44', '测试测试');

-- ----------------------------
-- Table structure for moment_favor
-- ----------------------------
DROP TABLE IF EXISTS `moment_favor`;
CREATE TABLE `moment_favor`  (
  `user_id` int(11) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`, `moment_id`) USING BTREE,
  INDEX `moment_favor_ibfk_2`(`moment_id`) USING BTREE,
  CONSTRAINT `moment_favor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_favor_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_favor
-- ----------------------------
INSERT INTO `moment_favor` VALUES (1, 1, '2021-04-23 09:48:46', '2021-04-23 09:48:46');
INSERT INTO `moment_favor` VALUES (1, 5, '2021-04-22 18:14:40', '2021-04-22 18:14:40');
INSERT INTO `moment_favor` VALUES (1, 6, '2021-04-21 20:47:45', '2021-04-21 20:47:45');
INSERT INTO `moment_favor` VALUES (1, 7, '2021-04-21 20:47:45', '2021-04-21 20:47:45');
INSERT INTO `moment_favor` VALUES (1, 9, '2021-04-22 18:14:44', '2021-04-22 18:14:44');
INSERT INTO `moment_favor` VALUES (2, 1, '2021-04-21 20:47:58', '2021-04-21 20:47:58');
INSERT INTO `moment_favor` VALUES (2, 3, '2021-04-21 20:47:58', '2021-04-21 20:47:58');
INSERT INTO `moment_favor` VALUES (3, 5, '2021-04-21 20:47:58', '2021-04-21 20:47:58');
INSERT INTO `moment_favor` VALUES (3, 6, '2021-04-21 20:47:58', '2021-04-21 20:47:58');
INSERT INTO `moment_favor` VALUES (3, 7, '2021-04-21 20:47:58', '2021-04-21 20:47:58');
INSERT INTO `moment_favor` VALUES (3, 10, '2021-04-21 21:00:03', '2021-04-21 21:00:03');

-- ----------------------------
-- Table structure for moment_footprint
-- ----------------------------
DROP TABLE IF EXISTS `moment_footprint`;
CREATE TABLE `moment_footprint`  (
  `moment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`moment_id`, `user_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_footprint_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_footprint_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_footprint
-- ----------------------------
INSERT INTO `moment_footprint` VALUES (1, 1, '2021-05-06 17:03:48', '2021-05-07 09:53:21');
INSERT INTO `moment_footprint` VALUES (1, 5, '2021-05-06 17:29:18', '2021-05-07 09:30:54');
INSERT INTO `moment_footprint` VALUES (3, 4, '2021-05-07 18:40:53', '2021-05-07 18:42:34');
INSERT INTO `moment_footprint` VALUES (3, 5, '2021-05-07 09:31:19', '2021-05-07 09:31:19');
INSERT INTO `moment_footprint` VALUES (25, 1, '2021-05-07 09:53:27', '2021-05-07 09:53:27');
INSERT INTO `moment_footprint` VALUES (26, 1, '2021-05-07 09:44:18', '2021-05-07 09:53:15');
INSERT INTO `moment_footprint` VALUES (27, 1, '2021-05-07 09:44:11', '2021-05-07 09:53:17');
INSERT INTO `moment_footprint` VALUES (27, 4, '2021-05-07 18:06:05', '2021-05-07 18:42:27');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sign` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'chh', 'e10adc3949ba59abbe56e057f20f883e', '2021-01-15 22:20:15', '2021-05-07 18:21:12', 'http://47.103.223.170:8000/user/1/avatar', '222');
INSERT INTO `user` VALUES (2, 'yxc', '96e79218965eb72c92a549dd5a330112', '2021-01-15 22:20:19', '2021-05-07 18:21:17', 'http://47.103.223.170:8000/user/2/avatar', '333');
INSERT INTO `user` VALUES (3, 'curry', 'e10adc3949ba59abbe56e057f20f883e', '2021-01-15 22:20:24', '2021-05-07 18:21:20', 'http://47.103.223.170:8000/user/3/avatar', '事不关己高高挂起');
INSERT INTO `user` VALUES (4, 'rose', '96e79218965eb72c92a549dd5a330112', '2021-01-15 22:20:28', '2021-05-07 18:21:24', 'http://47.103.223.170:8000/user/4/avatar', NULL);
INSERT INTO `user` VALUES (5, 'coderwhy', '96e79218965eb72c92a549dd5a330112', '2021-03-29 19:26:44', '2021-05-07 18:48:21', 'http://47.103.223.170:8000/user/5/avatar', '知其然而知其所以然');

-- ----------------------------
-- Table structure for user_collection
-- ----------------------------
DROP TABLE IF EXISTS `user_collection`;
CREATE TABLE `user_collection`  (
  `user_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`, `collection_id`) USING BTREE,
  INDEX `collection_id`(`collection_id`) USING BTREE,
  CONSTRAINT `user_collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_collection_ibfk_2` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_collection
-- ----------------------------
INSERT INTO `user_collection` VALUES (1, 2, '2021-04-30 14:20:55', '2021-04-30 14:20:55');
INSERT INTO `user_collection` VALUES (1, 5, '2021-05-05 16:23:50', '2021-05-06 11:31:31');
INSERT INTO `user_collection` VALUES (2, 2, '2021-05-05 11:59:11', '2021-05-05 11:59:11');
INSERT INTO `user_collection` VALUES (2, 5, '2021-04-30 14:32:41', '2021-04-30 14:32:41');

-- ----------------------------
-- Table structure for user_label
-- ----------------------------
DROP TABLE IF EXISTS `user_label`;
CREATE TABLE `user_label`  (
  `user_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `user_label_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_label
-- ----------------------------
INSERT INTO `user_label` VALUES (1, 1, '2021-04-23 10:18:11', '2021-04-23 10:18:11');
INSERT INTO `user_label` VALUES (1, 3, '2021-04-22 13:55:17', '2021-04-22 13:55:17');
INSERT INTO `user_label` VALUES (1, 4, '2021-04-21 19:20:29', '2021-04-21 19:20:29');
INSERT INTO `user_label` VALUES (1, 5, '2021-04-21 19:12:33', '2021-04-21 19:12:33');
INSERT INTO `user_label` VALUES (1, 6, '2021-04-23 10:49:13', '2021-04-23 10:49:13');
INSERT INTO `user_label` VALUES (1, 7, '2021-04-23 10:49:14', '2021-04-23 10:49:14');
INSERT INTO `user_label` VALUES (2, 3, '2021-04-20 18:24:10', '2021-04-20 18:24:10');
INSERT INTO `user_label` VALUES (2, 6, '2021-04-21 19:29:08', '2021-04-21 19:29:08');
INSERT INTO `user_label` VALUES (5, 1, '2021-04-25 16:13:10', '2021-04-25 16:13:10');
INSERT INTO `user_label` VALUES (5, 3, '2021-04-25 16:13:13', '2021-04-25 16:13:13');
INSERT INTO `user_label` VALUES (5, 5, '2021-04-25 16:34:47', '2021-04-25 16:34:47');

SET FOREIGN_KEY_CHECKS = 1;
