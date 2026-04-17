-- 1. Create Tables
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  parent_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  model TEXT,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  main_image TEXT,
  keywords_zh TEXT,
  keywords_en TEXT,
  meta_desc_zh TEXT,
  meta_desc_en TEXT,
  content_zh TEXT,
  content_en TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-Many Join Table
CREATE TABLE IF NOT EXISTS product_category_map (
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- 2. Insert Categories (Comprehensive Tree from 产品中心.md)
-- Roots
INSERT INTO categories (id, slug, name_zh, name_en, display_order) OVERRIDING SYSTEM VALUE VALUES
(1, 'uav-systems', '无人机系统', 'UAV & Drone Systems', 10),
(2, 'anti-drone', '反无人机系统', 'Anti-Drone / C-UAS Systems', 20),
(3, 'security', '安检与智慧警备', 'Security Screening & Policing', 30),
(4, 'defense-eng', '防务工程与野战补给', 'Defense Engineering & Field Logistics', 40),
(5, 'field-hospitals', '野战/移动医院系统', 'Field & Mobile Hospitals', 50),
(6, 'surveillance', '要地周边防护与监控', 'Perimeter & Area Surveillance', 60);

-- UAV Sub-Groups
INSERT INTO categories (id, parent_id, slug, name_zh, name_en, display_order) OVERRIDING SYSTEM VALUE VALUES
(101, 1, 'by-platform', '按硬件平台找', 'By Flight Platform', 101),
(102, 1, 'by-mission', '按行业任务找', 'By Mission & Application', 102);

-- UAV Platforms (Leafs)
INSERT INTO categories (id, parent_id, slug, name_zh, name_en, display_order) OVERRIDING SYSTEM VALUE VALUES
(111, 101, 'multi-rotor', '多旋翼无人机', 'Multi-Rotor UAVs', 111),
(112, 101, 'vtol', '复合翼/垂直起降无人机', 'VTOL Fixed-Wing UAVs', 112),
(113, 101, 'tethered', '系留无人机系统', 'Tethered UAVs', 113);

-- UAV Missions (Leafs)
INSERT INTO categories (id, parent_id, slug, name_zh, name_en, display_order) OVERRIDING SYSTEM VALUE VALUES
(121, 102, 'emergency-rescue', '应急侦查与通讯', 'Emergency & Rescue', 121),
(122, 102, 'firefighting', '高空消防与照明', 'Aerial Firefighting', 122),
(123, 102, 'inspection', '电力与油气管线巡检', 'Utility & Pipeline Inspection', 123),
(124, 102, 'environmental', '水利与环境监测', 'Water & Environmental', 124);

-- Anti-Drone Sub-Categories
INSERT INTO categories (id, parent_id, slug, name_zh, name_en, display_order) OVERRIDING SYSTEM VALUE VALUES
(201, 2, 'detection', '探测与跟踪', 'Detection & Tracking', 201),
(202, 2, 'interference', '干扰与反制', 'Interference & Defeat', 202),
(203, 2, 'integrated-cuas', '察打一体联动系统', 'Integrated Counter-UAS', 203);

-- 3. Insert Products and Map Categories
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (1, 'N-TET', 'FC-YJXF-01', 'FC-YJXF-01 Aerial Firefighting Drone', '/products/uav-systems/FC-YJXF-01-Aerial-Firefighting-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (1, 113);
INSERT INTO product_category_map (product_id, category_id) VALUES (1, 122);
INSERT INTO product_category_map (product_id, category_id) VALUES (1, 111);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (2, 'N-TET', 'FC-YJZM-01', 'FC-YJZM-01 Emergency Lighting Drone', '/products/uav-systems/FC-YJZM-01-Emergency-Lighting-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (2, 113);
INSERT INTO product_category_map (product_id, category_id) VALUES (2, 122);
INSERT INTO product_category_map (product_id, category_id) VALUES (2, 111);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (3, 'N-TET', 'FC-DLXJ-01', 'FC-DLXJ-01 Power Grid Inspection Drone', '/products/uav-systems/FC-DLXJ-01-Power-Grid-Inspection-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (3, 112);
INSERT INTO product_category_map (product_id, category_id) VALUES (3, 123);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (4, 'N-TET', 'FC-YQXJ-01', 'FC-YQXJ-01 Utility Inspection Drone', '/products/uav-systems/FC-YQXJ-01-Utility-Inspection-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (4, 112);
INSERT INTO product_category_map (product_id, category_id) VALUES (4, 123);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (5, 'N-TET', 'FC-RDS500-4R', 'FC-RDS500-4R Detection Radar', '/products/anti-drone/FC-RDS500-4R-Detection-Radar.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (5, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (6, 'N-TET', 'FC-TTVC系列智能多波段摄像机', 'FC-TTVC Series Smart Multi-Band Camera', '/products/surveillance/FC-TTVC-Series-Smart-Multi-Band-Camera.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (6, 6);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (7, 'N-TET', 'FC-SLJC-01', 'FC-SLJC-01 Water Conservancy Monitoring Drone', '/products/uav-systems/FC-SLJC-01-Water-Conservancy-Monitoring-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (7, 124);
INSERT INTO product_category_map (product_id, category_id) VALUES (7, 111);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (8, 'N-TET', ' FC-YJZC-01', 'FC-YJZC-01 Emergency Reconnaissance Drone', '/products/uav-systems/FC-YJZC-01-Emergency-Reconnaissance-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (8, 121);
INSERT INTO product_category_map (product_id, category_id) VALUES (8, 111);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (9, 'N-TET', 'FC-YJTX-01', 'FC-YJTX-01 Emergency Communication Drone', '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (9, 113);
INSERT INTO product_category_map (product_id, category_id) VALUES (9, 121);
INSERT INTO product_category_map (product_id, category_id) VALUES (9, 111);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (10, 'N-TET', '无线电干扰设备（定向）', 'Directional RF Jammer', '/products/anti-drone/Directional-RF-Jammer.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (10, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (11, 'N-TET', '固定式无线电侦测设备', 'Stationary RF Detection System', '/products/anti-drone/Stationary-RF-Detection-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (11, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (12, 'N-TET', 'FC-RC系列高清激光摄像机', 'FC-RC Series HD Laser Camera', '/products/surveillance/FC-RC-Series-HD-Laser-Camera.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (12, 6);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (13, 'N-TET', 'FC-DMS10系列智能电子哨兵', 'FC-DMS10 Series Smart Electronic Sentinel', '/products/surveillance/FC-DMS10-Series-Smart-Electronic-Sentinel.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (13, 6);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (14, 'N-TET', 'FC-DTVC系列双波段热成像高速球', 'FC-DTVC Series Dual-Band Thermal PTZ Camera', '/products/surveillance/FC-DTVC-Series-Dual-Band-Thermal-PTZ-Camera.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (14, 6);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (15, 'N-TET', 'FC-DMS10系列智能电子哨兵', 'FC-DMS10 Series Smart Electronic Sentinel', '/products/surveillance/FC-DMS10系列智能电子哨兵.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (15, 6);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (16, 'N-TET', '手提式无线电侦测设备', 'Portable RF Detection Case', '/products/anti-drone/Portable-RF-Detection-Case.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (16, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (17, 'N-TET', '无线电干扰设备（全向）', 'Omni-directional RF Jammer', '/products/anti-drone/Omni-directional-RF-Jammer.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (17, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (18, 'N-TET', '便携式无人机反制盾', 'Portable Anti-Drone Jammer Shield', '/products/uav-systems/Portable-Anti-Drone-Jammer-Shield.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (18, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (19, 'N-TET', '便携式反制盾', 'Portable Anti-Drone Shield', '/products/uav-systems/Portable-Anti-Drone-Shield.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (19, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (20, 'N-TET', '车载便携式无人机察打一体设备', 'Vehicle-Mounted Portable Integrated C-UAS', '/products/uav-systems/Vehicle-Mounted-Portable-Integrated-C-UAS.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (20, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (21, 'N-TET', '便携式无人机察打一体设备', 'Portable Integrated Detection & Jamming C-UAS', '/products/uav-systems/Portable-Integrated-Detection-&-Jamming-C-UAS.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (21, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (22, 'N-TET', '固定式反无人机无线电主动防御设备', 'Stationary Active RF Defense System', '/products/uav-systems/Stationary-Active-RF-Defense-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (22, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (23, 'N-TET', '无人机导航诱骗设备', 'UAV Navigation Spoofing System', '/products/uav-systems/UAV-Navigation-Spoofing-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (23, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (24, 'N-TET', '便携式反无人机无线电主动防御设备', 'Portable Active RF Defense System', '/products/uav-systems/Portable-Active-RF-Defense-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (24, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (25, 'N-TET', '光学识别跟踪设备', 'Electro-Optical (EO) Tracking System', '/products/anti-drone/Electro-Optical-(EO)-Tracking-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (25, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (26, 'N-TET', '无人机远程识别信息监测设备', 'UAV Remote ID Monitoring System', '/products/uav-systems/UAV-Remote-ID-Monitoring-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (26, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (27, 'N-TET', '手持式无线电侦测设备', 'Handheld RF Detection System', '/products/anti-drone/Handheld-RF-Detection-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (27, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (28, 'N-TET', '低空探测雷达', 'Low-Altitude Detection Radar', '/products/anti-drone/Low-Altitude-Detection-Radar.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (28, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (29, 'N-TET', '便携式察打一体反无人机设备', 'Portable Integrated C-UAS Equipment', '/products/uav-systems/Portable-Integrated-C-UAS-Equipment.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (29, 1);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (30, 'N-TET', '贝雷片 PANEL', 'Bailey Panel', '/products/defense-eng/Bailey-Panel.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (30, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (31, 'N-TET', '水平支撑架  LEVEL FRAME', 'Level Frame', '/products/defense-eng/Level-Frame.png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;水平支撑架（俗称花架、花窗）是贝雷钢桥系统中不可或缺的横向连接构件。其核心作用在于连接多排桁架，将独立的片状桁架组合成一个整体稳定的空间结构。通过刚性连接，支撑架能有效抵抗横向变形，确保桥梁桁架单元在受载时受力均匀，防止单排桁架因侧向失稳而发生扭曲或倾覆。在安装位置上，支撑架设计灵活，既可安装于桁架上弦杆的顶部以增强水平刚度，也可安装于竖杆位置以提供竖向支撑。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (31, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (32, 'N-TET', '加强弦杆CHORDREINFORCEMENT', 'Chord Reinforcement', '/products/defense-eng/Chord-Reinforcement.png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;加强弦杆是桁架上下弦杆的强化组件，结构形式与其类似。针对不同型号，其标准长度分别为3000mm（321型）和3048mm（200型），核心作用是为各类桥梁的桁架提供额外的结构强度。加强弦杆设有上下两排连接支座，下排便于与桁架弦杆连接，上排便于与支撑架相连，阴头桥端和阳头桥端的上部一片桁架单元通常不设置加强弦杆。通常加强弦杆正对桁架单元设置。200型的也可使加强弦杆的单双耳接头与桁架单元的单双耳接头错开。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (32, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (33, 'N-TET', '抗风拉杆SWAY BRACE', 'Sway Brace', '/products/defense-eng/Sway-Brace.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (33, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (34, 'N-TET', '阳头端柱 POST END (MALE)', 'Post End (Male)', '/products/defense-eng/Post-End-(Male).png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (34, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (35, 'N-TET', '阴头端柱 POST END (FEMALE)', 'Post End (Female)', '/products/defense-eng/Post-End-(Female).png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;端柱安置于全桥两端，肩负着将桥梁荷载传导至支座的核心任务。该构件设计有阴、阳两种端头，安装时需与桁架端头呈“阴阳互补”式对接。&lt;o&gt;&lt;/o&gt;&lt;/p&gt;&lt;p class=&quot;MsoNormal&quot;&gt;在结构细节上，端柱集成了多维度的连接功能：其侧壁的双圆孔用于锁定桁架弦杆，顶部的椭圆孔为双层桁架的加装提供了接口，而底部的短悬臂配合定位销与活动铁扣，则确保了横梁的稳固安置。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (35, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (36, 'N-TET', '横梁夹具 TRANSOM CLAMP', 'Transom Clamp', '/products/defense-eng/Transom-Clamp.png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;横梁夹具由拉杆、悬梁和支承杆3部分组成；用于固定横梁。拉杆端部有一凸头，安装时将拉杆凸头扣入横梁垫板缺口内，悬梁的一端勾在桁架竖杆的长方孔上，再用把杆（或扳手）转动支承杆，使其压紧固定横梁。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (36, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (37, 'N-TET', '横梁TRANSOM', 'Transom', '/products/defense-eng/Transom.png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;贝雷桥横梁一般采用H350型钢，横梁上设有4组卡子，用于限定桥面板或者纵梁位置，两端焊有短柱用于连接斜撑，两端底面各有3个凹眼。安装横梁时，将凹眼套入桁架下弦杆横梁垫板上的栓钉，使横梁在桁架上就位。凹眼的间距与桁架间距相同，横梁就位后，桁架的间距也就相对固定了。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (37, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (38, 'N-TET', '桥面板 U-STEEL DECK', 'U-Steel Bridge Deck', '/products/defense-eng/U-Steel-Bridge-Deck.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (38, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (39, 'N-TET', '桥 座 BEARING', 'Bridge Bearing', '/products/defense-eng/Bridge-Bearing.png', '', '', '&lt;p class=&quot;MsoNormal&quot;&gt;桥座：桥梁端柱支承在桥座轴梁上，轴梁分为3段，架设单排桥梁时，桁架端柱支承在轴梁的中段上；架设双排桥梁时，用两个桥座，端柱分别支承于两个桥座轴梁中段上，架设三排桥梁时，仍用两个桥座，内排端柱支承于1个桥座轴梁中段，中、外排端柱分别支承于另一桥座轴梁的两边段上。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (39, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (40, '', '箱组式医疗救治系统', 'Containerized Medical Rescue System', '/products/field-hospitals/Containerized-Medical-Rescue-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (40, 5);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (41, '', '智能化可移动式多功能方舱医院', 'Intelligent Mobile Cabin Hospital', '/products/field-hospitals/Intelligent-Mobile-Cabin-Hospital.png', '', '', '&lt;p&gt;智能化可移动式多功能方舱医院秉持轻量化与模块化设计理念，深度融合专业医疗硬件与智能信息化系统，具备通过海陆空三栖全域机动能力。该系统可在36小时内快速展开，24小时内实现极速撤收，大幅提升应急响应效率。它不仅能应对批量伤员救治、突发传染病防控，还能胜任自然灾害救援与国际人道主义援助等多重任务，为各类复杂灾害现场提供全天候、标准化的医疗保障支持。&lt;br&gt;&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (41, 5);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (42, 'N-TET', '防爆罐FBG-G1.5-FC06', 'FBG-G1.5-FC06 Explosion Containment Vessel', '/products/security/FBG-G1.5-FC06-Explosion-Containment-Vessel.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (42, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (43, 'N-TET', '防爆毯FBT-FC09', 'FBT-FC09 Explosion Protection Blanket', '/products/security/FBT-FC09-Explosion-Protection-Blanket.png', '', '', '&lt;p class=&quot;MsoToc1&quot; style=&quot;margin-left: -9.75pt;&quot;&gt;此防爆毯是一种用高强度防弹纤维材料，经过特殊工艺加工制成的。它的外套耐磨、防水；防爆毯可以阻挡易爆物爆炸时产生的冲击波和碎片。用于爆炸物的隔离，保护。防爆毯是公安、武警、民航、铁路、港口、海关、比赛场馆等防爆安全检查部门必备的装备。产品具有质轻、携带方便、操作简单、抗爆性强等特点。&lt;/p&gt;&lt;p class=&quot;MsoToc1&quot; style=&quot;margin-left: -9.75pt;&quot;&gt;防爆毯是公安、武警、民航、铁路、港口、海关、比赛场馆等防爆安全检查部门必备的装备。产品具有质轻、携带方便、操作简单、抗爆性强等特点。&lt;/p&gt;');
INSERT INTO product_category_map (product_id, category_id) VALUES (43, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (44, '', 'FC1500B台式液体安全检验仪', 'FC1500B Desktop Liquid Security Inspector', '/products/security/FC1500B-Desktop-Liquid-Security-Inspector.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (44, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (45, 'N-TET', 'FC1500手持式液体探测仪', 'FC1500 Handheld Liquid Detector', '/products/security/FC1500-Handheld-Liquid-Detector.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (45, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (46, 'N-TET', 'FC1800T台式爆炸物毒品探测仪', 'FC1800T Desktop Explosives/Narcotics Detector', '/products/security/FC1800T-Desktop-Explosives-Narcotics-Detector.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (46, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (47, 'N-TET', 'FC2088手持金属探测器', 'FC2088 Handheld Metal Detector', '/products/security/FC2088-Handheld-Metal-Detector.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (47, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (48, 'N-TET', 'FC5030安检机', 'FC5030 X-Ray Baggage Scanner', '/products/security/FC5030-X-Ray-Baggage-Scanner.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (48, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (49, 'N-TET', 'FC6550D双源双视角安检机', 'FC6550D Dual-View X-Ray Scanner', '/products/security/FC6550D-Dual-View-X-Ray-Scanner.png', '', '', '''&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0pt 0pt 0pt -30.95pt; padding: 0pt; line-height: 15.75pt;&quot;&gt;FC6550D安检机采用双视角检查系统，利用双能量两组射线源探测器及数字图像处理系统，从垂直和水平两个方向对物品进行检测，无需考虑被检物品的摆放位置获得超级清晰鲜明的图像。相比传统X射线检查设备，能在检查效率、占地空间（增加检查效率相当于增加了站内空间利用率）、减少误报、漏报及辅助自动识别上更具优势，运用X射线对物品进行更加精准的检测，检测传感器迅速穿过输送带上的要被检测的物品，以不同的反射颜色对各类物品进行仔细的分类检查，排除掉可能存在安全隐患的物品。产品探测精准及时，为公共环境安全防卫体系建设提供更加坚实的保障、具有爆炸物/毒品辅助检查功能。&lt;span style=&quot;mso-spacerun:\''yes\'';font-family:微软雅黑;color:rgb(0,0,0');
INSERT INTO product_category_map (product_id, category_id) VALUES (49, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (50, 'N-TET', 'FC6550安检机', 'FC6550 X-Ray Baggage Scanner', '/products/security/FC6550-X-Ray-Baggage-Scanner.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (50, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (51, 'N-TET', 'FC-C(豪华型)通过式金属探测门', 'FC-C (Deluxe) Walk-Through Metal Detector', '/products/security/FC-C-(Deluxe)-Walk-Through-Metal-Detector.png', '', '', '''&lt;p class=&quot;p&quot; style=&quot;margin: 0pt;&quot;&gt;FC-C金属探测门是一种检测人员有无携带金属物品的探测装置，又称金属探测门，金属探测安检门主要广泛应用于监狱、法院、博物馆、图书馆、新闻中心、医院、学校、电子厂、港口、高铁站、演唱会及各大区域场所机场，车站，大型会议等人流较大的公共场所用来检查人身体上隐藏的危险金属物品的安全检查，如枪支，管制刀具等。&lt;span style=&quot;mso-spacerun:\''yes\'';font-family:微软雅黑;color:rgb(0,0,0');
INSERT INTO product_category_map (product_id, category_id) VALUES (51, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (52, 'N-TET', 'FC-C(液晶)型通过式金属探测门', 'FC-C (LCD) Walk-Through Metal Detector', '/products/security/FC-C-(LCD)-Walk-Through-Metal-Detector.png', '', '', '''&lt;p class=&quot;p&quot; style=&quot;margin: 0pt;&quot;&gt;FC-C金属探测门采用电磁兼容设计和抗震动设计，具有高灵敏度，强抗干扰能力和强抗震能力，适用于管制刀具和枪支等危险物品的安全检查，广泛应用于监狱、法院、学校、医院、电子企业、港口、客运站、展览会馆、会议中心、重大庆典、演唱会等重要场所。&lt;span style=&quot;mso-spacerun:\''yes\'';font-family:微软雅黑;color:rgb(0,0,0');
INSERT INTO product_category_map (product_id, category_id) VALUES (52, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (53, 'N-TET', '便携爆炸物探测仪FC1800B', 'FC1800B Portable Explosives Detector', '/products/security/FC1800B-Portable-Explosives-Detector.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (53, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (54, 'N-TET', 'FC-H 智慧手机探测门', 'FC-H Smart Phone Detection Gate', '/products/anti-drone/FC-H-Smart-Phone-Detection-Gate.png', '', '', '''&lt;p class=&quot;p&quot; style=&quot;margin: 0pt;&quot;&gt;FC-H智慧手机探测门，采用电磁波信号探测技术，具有排除皮带扣、眼镜、钢笔、文具盒等日常用品进行手机检测的功能，可探测人体是否携带处于开机或者关机状态(含移除电池、移除SIM卡）的手机、笔记本、iPad、相机等电子产品，并能进行位置声光报警，显示报警位置；手机用铜箔包裹5层也可报警可应用于学校、保密场所等重要场景。&lt;span style=&quot;mso-spacerun:\''yes\'';font-family:微软雅黑;color:rgb(0,0,0');
INSERT INTO product_category_map (product_id, category_id) VALUES (54, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (55, 'N-TET', '豪华智能摆闸', 'Deluxe Smart Turnstile', '/products/security/Deluxe-Smart-Turnstile.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (55, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (56, 'N-TET', 'FC-3000智能铁磁探测系统', 'FC-3000 Intelligent Ferromagnetic Detection System', '/products/anti-drone/FC-3000-Intelligent-Ferromagnetic-Detection-System.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (56, 2);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (57, 'N-TET', 'X、γ辐射剂量报警仪 FC902', 'FC902 X/Gamma Radiation Alarm', '/products/security/FC902-X-Gamma-Radiation-Alarm.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (57, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (58, 'N-TET', 'FC4028 中子周围剂量当量（率）仪', 'FC4028 Neutron Ambient Dose Equivalent Rate Meter', '/products/security/FC4028-Neutron-Ambient-Dose-Equivalent-Rate-Meter.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (58, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (59, 'N-TET', 'FC-PD500 型 X、γ个人辐射剂量报警仪', 'FC-PD500 X/Gamma Personal Dosimeter', '/products/security/FC-PD500-X-Gamma-Personal-Dosimeter.png', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (59, 3);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (60, 'N-TET', '贝雷人行桥', 'Bailey Footbridge', '/products/defense-eng/Bailey-Footbridge.jpg', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (60, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (61, 'N-TET', '2321型装配式公路钢桥(贝雷桥)', 'Type 2321 Prefabricated Highway Steel Bridge (Bailey Bridge)', '/products/defense-eng/Type-2321-Prefabricated-Highway-Steel-Bridge-(Bailey-Bridge).jpg', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (61, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (62, 'N-TET', '贝雷悬索桥', 'Bailey Suspension Bridge', '/products/defense-eng/Bailey-Suspension-Bridge.jpg', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (62, 4);
INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES (63, 'N-TET', '200型装配式公路钢桥(贝雷桥)', 'Type 200 Prefabricated Highway Steel Bridge (Bailey Bridge)', '/products/defense-eng/Type-200-Prefabricated-Highway-Steel-Bridge-(Bailey-Bridge).jpg', '', '', '');
INSERT INTO product_category_map (product_id, category_id) VALUES (63, 4);
