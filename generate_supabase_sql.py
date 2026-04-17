import json

def generate_sql():
    with open('migration_data_translated.json', 'r', encoding='utf8') as f:
        data = json.load(f)

    sql = """-- 1. Create Tables
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
"""

    # Explicit Mappings from User
    mapping_rules = {
        "FC-YJTX-01": [111, 113, 121], # Multi-rotor, Tethered, Emergency
        "FC-YJXF-01": [111, 113, 122], # Multi-rotor, Tethered, Firefighting
        "FC-YJZM-01": [111, 113, 122], # Multi-rotor, Tethered, Lighting (Firefighting group)
        "FC-YJZC-01": [111, 121],      # Multi-rotor, Emergency
        "FC-SLJC-01": [111, 124],      # Multi-rotor, Environmental
        "FC-DLXJ-01": [112, 123],      # VTOL, Inspection
        "FC-YQXJ-01": [112, 123],      # VTOL, Inspection
    }

    # Keyword categories for the rest
    cat_keyword_map = {
        "anti-drone": 2,
        "security": 3,
        "defense-eng": 4,
        "field-hospitals": 5,
        "surveillance": 6
    }

    product_id_counter = 1
    for p in data:
        # Escape strings
        title_zh = p['title_zh'].replace("'", "''")
        title_en = p['title_en'].replace("'", "''")
        model = p['model'].replace("'", "''") if p['model'] else ''
        image = p['image'] if p['image'] else ''
        keywords = p['keywords'].replace("'", "''") if p['keywords'] else ''
        desc = p['desc'].replace("'", "''") if p['desc'] else ''
        content = p['content'].replace("'", "''") if p['content'] else ''
        
        sql += f"INSERT INTO products (id, model, title_zh, title_en, main_image, keywords_zh, meta_desc_zh, content_zh) OVERRIDING SYSTEM VALUE VALUES "
        sql += f"({product_id_counter}, '{model}', '{title_zh}', '{title_en}', '{image}', '{keywords}', '{desc}', '{content}');\n"
        
        # Apply Mapping Rules
        matched_cats = []
        for key, cats in mapping_rules.items():
            if key in title_zh:
                matched_cats.extend(cats)
                break
        
        if not matched_cats:
            # Fallback to category slug mapping
            fallback_id = cat_keyword_map.get(p['cat_slug'], 1)
            matched_cats.append(fallback_id)
            
        # Add to map table
        for cid in set(matched_cats):
            sql += f"INSERT INTO product_category_map (product_id, category_id) VALUES ({product_id_counter}, {cid});\n"
            
        product_id_counter += 1

    with open('supabase_import.sql', 'w', encoding='utf8') as f:
        f.write(sql)
    print("Final SQL file generated: supabase_import.sql (with many-to-many relationship)")

if __name__ == "__main__":
    generate_sql()
