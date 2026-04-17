-- 删除旧表（如果存在）
DROP TABLE IF EXISTS `{dbprefix}app_synlang_trans`;
DROP TABLE IF EXISTS `{dbprefix}app_synlang_client`;

-- 创建翻译初始表
CREATE TABLE `{dbprefix}app_synlang_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `word` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '原文',
  `trans` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '翻译',
  `md5` char(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'md5',
  `siteid` int(10) DEFAULT '0' COMMENT 'siteid',
  `code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '目标语',
  `inputtime` bigint(10) DEFAULT '0' COMMENT '录入时间',
  PRIMARY KEY (`id`),
  KEY `idx_code_inputtime_md5` (`code`, `inputtime`, `md5`(32))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='翻译初始表';

-- 创建终端表
CREATE TABLE `{dbprefix}app_synlang_client` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `siteid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '站点id',
  `displayorder` int(10) DEFAULT '0' COMMENT '排序值',
  `name` varchar(100) NOT NULL COMMENT '名称',
  `lang` varchar(100) NOT NULL COMMENT '语种',
  `flag` varchar(100) NOT NULL COMMENT '国旗',
  `dirname` varchar(100) NOT NULL COMMENT '目录',
  `domain` varchar(100) NOT NULL COMMENT '域名',
  `hide` tinyint(1) unsigned NOT NULL COMMENT '隐藏',
  `content` text NOT NULL COMMENT '参数',
  PRIMARY KEY (`id`),
  KEY `dirname` (`dirname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='终端表';