import os
import json
import re

DATA_FILE = 'migration_data.json'
PRODUCT_DIR = 'public/products'

# Translation mapping for Titles
translations = {
    " FC-YJZC-01": "FC-YJZC-01 Emergency Reconnaissance Drone",
    "200型装配式公路钢桥(贝雷桥)": "Type 200 Prefabricated Highway Steel Bridge (Bailey Bridge)",
    "2321型装配式公路钢桥(贝雷桥)": "Type 2321 Prefabricated Highway Steel Bridge (Bailey Bridge)",
    "FC-3000智能铁磁探测系统": "FC-3000 Intelligent Ferromagnetic Detection System",
    "FC-C(液晶)型通过式金属探测门": "FC-C (LCD) Walk-Through Metal Detector",
    "FC-C(豪华型)通过式金属探测门": "FC-C (Deluxe) Walk-Through Metal Detector",
    "FC-DLXJ-01": "FC-DLXJ-01 Power Grid Inspection Drone",
    "FC-DMS10系列智能电子哨兵": "FC-DMS10 Series Smart Electronic Sentinel",
    "FC-DTVC系列双波段热成像高速球": "FC-DTVC Series Dual-Band Thermal PTZ Camera",
    "FC-H 智慧手机探测门": "FC-H Smart Phone Detection Gate",
    "FC-PD500 型 X、γ个人辐射剂量报警仪": "FC-PD500 X/Gamma Personal Dosimeter",
    "FC-RC系列高清激光摄像机": "FC-RC Series HD Laser Camera",
    "FC-RDS500-4R": "FC-RDS500-4R Detection Radar",
    "FC-SLJC-01": "FC-SLJC-01 Water Conservancy Monitoring Drone",
    "FC-TTVC系列智能多波段摄像机": "FC-TTVC Series Smart Multi-Band Camera",
    "FC-YJTX-01": "FC-YJTX-01 Emergency Communication Drone",
    "FC-YJXF-01": "FC-YJXF-01 Aerial Firefighting Drone",
    "FC-YJZM-01": "FC-YJZM-01 Emergency Lighting Drone",
    "FC-YQXJ-01": "FC-YQXJ-01 Utility Inspection Drone",
    "FC1500B台式液体安全检验仪": "FC1500B Desktop Liquid Security Inspector",
    "FC1500手持式液体探测仪": "FC1500 Handheld Liquid Detector",
    "FC1800T台式爆炸物毒品探测仪": "FC1800T Desktop Explosives/Narcotics Detector",
    "FC2088手持金属探测器": "FC2088 Handheld Metal Detector",
    "FC4028 中子周围剂量当量（率）仪": "FC4028 Neutron Ambient Dose Equivalent Rate Meter",
    "FC5030安检机": "FC5030 X-Ray Baggage Scanner",
    "FC6550D双源双视角安检机": "FC6550D Dual-View X-Ray Scanner",
    "FC6550安检机": "FC6550 X-Ray Baggage Scanner",
    "X、γ辐射剂量报警仪 FC902": "FC902 X/Gamma Radiation Alarm",
    "低空探测雷达": "Low-Altitude Detection Radar",
    "便携式反制盾": "Portable Anti-Drone Shield",
    "便携式反无人机无线电主动防御设备": "Portable Active RF Defense System",
    "便携式察打一体反无人机设备": "Portable Integrated C-UAS Equipment",
    "便携式无人机反制盾": "Portable Anti-Drone Jammer Shield",
    "便携式无人机察打一体设备": "Portable Integrated Detection & Jamming C-UAS",
    "便携爆炸物探测仪FC1800B": "FC1800B Portable Explosives Detector",
    "光学识别跟踪设备": "Electro-Optical (EO) Tracking System",
    "加强弦杆CHORDREINFORCEMENT": "Chord Reinforcement",
    "固定式反无人机无线电主动防御设备": "Stationary Active RF Defense System",
    "固定式无线电侦测设备": "Stationary RF Detection System",
    "手持式无线电侦测设备": "Handheld RF Detection System",
    "手提式无线电侦测设备": "Portable RF Detection Case",
    "抗风拉杆SWAY BRACE": "Sway Brace",
    "无人机导航诱骗设备": "UAV Navigation Spoofing System",
    "无人机远程识别信息监测设备": "UAV Remote ID Monitoring System",
    "无线电干扰设备（全向）": "Omni-directional RF Jammer",
    "无线电干扰设备（定向）": "Directional RF Jammer",
    "智能化可移动式多功能方舱医院": "Intelligent Mobile Cabin Hospital",
    "桥 座 BEARING": "Bridge Bearing",
    "桥面板 U-STEEL DECK": "U-Steel Bridge Deck",
    "横梁TRANSOM": "Transom",
    "横梁夹具 TRANSOM CLAMP": "Transom Clamp",
    "水平支撑架  LEVEL FRAME": "Level Frame",
    "箱组式医疗救治系统": "Containerized Medical Rescue System",
    "豪华智能摆闸": "Deluxe Smart Turnstile",
    "贝雷人行桥": "Bailey Footbridge",
    "贝雷悬索桥": "Bailey Suspension Bridge",
    "贝雷片 PANEL": "Bailey Panel",
    "车载便携式无人机察打一体设备": "Vehicle-Mounted Portable Integrated C-UAS",
    "防爆毯FBT-FC09": "FBT-FC09 Explosion Protection Blanket",
    "防爆罐FBG-G1.5-FC06": "FBG-G1.5-FC06 Explosion Containment Vessel",
    "阳头端柱 POST END (MALE)": "Post End (Male)",
    "阴头端柱 POST END (FEMALE)": "Post End (Female)"
}

def clean_filename(s):
    # Remove special characters and replace spaces with hyphens
    s = re.sub(r'[\/\\?%*:|"<> ]', '-', s)
    return re.sub(r'-+', '-', s).strip('-')

def translate_and_rename():
    with open(DATA_FILE, 'r', encoding='utf8') as f:
        products = json.load(f)

    new_products = []
    
    for p in products:
        title_zh = p['title_zh']
        title_en = translations.get(title_zh, title_zh)
        
        old_image = p['image']
        new_image = old_image
        
        if old_image:
            # Old path format: /products/[cat]/[zh_title].png
            root_ext = os.path.splitext(old_image)
            ext = root_ext[1]
            
            # The current file on disk is the one from migrate_products.py
            # which used re.sub(r'[\/\\?%*:|"<> ]', '-', p['title'])
            current_fs_name = re.sub(r'[\/\\?%*:|"<> ]', '-', title_zh) + ext
            
            # New name based on English
            new_fs_name = clean_filename(title_en) + ext
            
            source_path = os.path.join(PRODUCT_DIR, p['cat_slug'], current_fs_name)
            target_path = os.path.join(PRODUCT_DIR, p['cat_slug'], new_fs_name)
            
            if os.path.exists(source_path):
                os.rename(source_path, target_path)
                new_image = f"/products/{p['cat_slug']}/{new_fs_name}"
            else:
                print(f"Warning: File not found for renaming: {source_path}")

        new_products.append({
            **p,
            "title_en": title_en,
            "image": new_image
        })

    with open('migration_data_translated.json', 'w', encoding='utf8') as f:
        json.dump(new_products, f, ensure_ascii=False, indent=2)
    
    print("Translation and renaming complete.")

if __name__ == "__main__":
    translate_and_rename()
