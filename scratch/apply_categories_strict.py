import json
import os
import glob

def get_mapping(fname, pname, detail):
    fname = fname.lower()
    pname = pname.lower()
    detail = detail.lower()

    # 1. UAV SYSTEMS
    if "01大无人机" in fname or "无人机" in pname:
        res = {"category_primary": "UAV & Drone Systems (无人机系统)"}
        
        # Flight Platform
        platform = ""
        if "系留" in pname or "系留" in detail:
            platform = "Tethered UAVs (系留无人机系统)"
        elif "复合翼" in pname or "复合翼" in detail or "vtol" in detail:
            platform = "VTOL Fixed-Wing UAVs (复合翼/垂直起降无人机)"
        else:
            platform = "Multi-Rotor UAVs (多旋翼无人机)"
        res["category_by_flight_platform"] = platform
        
        # Mission
        mission = ""
        if "通讯" in pname: mission = "Emergency & Rescue (应急侦查与通讯)"
        elif "侦查" in pname: mission = "Emergency & Rescue (应急侦查与通讯)"
        elif "消防" in pname or "照明" in pname: mission = "Aerial Firefighting (高空消防与照明)"
        elif "电力" in pname or "油气" in pname: mission = "Utility & Pipeline Inspection (电力与油气管线巡检)"
        elif "水利" in pname or "环境" in pname: mission = "Water & Environmental (水利与环境监测)"
        res["category_by_mission_application"] = mission
        return res

    # 2. ANTI-DRONE
    if "02反无" in fname or "反制" in pname or "侦测" in pname:
        res = {"category_primary": "Anti-Drone / C-UAS Systems (反无人机系统)"}
        if "雷达" in pname:
            res.update({"category_secondary": "Detection & Tracking (探测与跟踪)", "category_tertiary": "Low-Altitude Detection Radars (低空探测雷达)"})
        elif "侦测" in pname:
            res.update({"category_secondary": "Detection & Tracking (探测与跟踪)", "category_tertiary": "RF Detection Systems [Stationary & Portable] (无线电侦测设备 - 固定式/手持手提式)"})
        elif "光电" in pname:
            res.update({"category_secondary": "Detection & Tracking (探测与跟踪)", "category_tertiary": "Electro-Optical (EO) Tracking Systems (光电识别跟踪设备)"})
        elif "识别" in pname:
            res.update({"category_secondary": "Detection & Tracking (探测与跟踪)", "category_tertiary": "Remote ID & Monitoring Systems (无人机远程识别监测)"})
        elif "反制枪" in pname or "盾" in pname:
            res.update({"category_secondary": "Interference & Defeat (干扰与反制)", "category_tertiary": "Handheld Anti-Drone Guns & Shields (多频段反制枪 / 便携反制盾)"})
        elif "全向" in pname or "定向" in pname or "干扰" in pname:
            res.update({"category_secondary": "Interference & Defeat (干扰与反制)", "category_tertiary": "RF Jamming Systems [Directional & Omni] (无线电干扰设备 - 定向/全向)"})
        elif "诱骗" in pname:
            res.update({"category_secondary": "Interference & Defeat (干扰与反制)", "category_tertiary": "Navigation Spoofing Systems (无人机导航诱骗设备)"})
        elif "主动防御" in pname and ("便携" in pname or "11" in fname):
            res.update({"category_secondary": "Interference & Defeat (干扰与反制)", "category_tertiary": "Active RF Defense Systems (无线电主动防御设备)"})
        elif "察打一体" in pname:
            if "便携" in pname or "车载" in pname:
                res.update({"category_secondary": "Integrated Counter-UAS (察打一体联动系统)", "category_tertiary": "Portable Integrated C-UAS (便携式察打一体设备)"})
            else:
                res.update({"category_secondary": "Integrated Counter-UAS (察打一体联动系统)", "category_tertiary": "Stationary Integrated Defense (固定式主动防御设备)"})
        return res

    # 3. SECURITY
    if "03智慧警务" in fname or "安检" in pname or "探测" in pname or "危险液体" in pname:
        res = {"category_primary": "Security Screening & Policing (安检与智慧警务装备)"}
        if "安检机" in pname: 
            res["category_secondary"] = "X-Ray Baggage & Parcel Scanners (X光行李/物品安检机 - 含双视角/小型机)"
        elif "探测门" in pname:
            if "手机" in pname: res["category_secondary"] = "Smart Phone Detection Gates (智能手机探测门)"
            else: res["category_secondary"] = "Walk-Through Metal Detectors (通过式金属探测门)"
        elif "探测器" in pname: res["category_secondary"] = "Handheld Metal Detectors (手持金属探测器)"
        elif "毒品" in pname or "爆炸物" in pname: res["category_secondary"] = "Explosive & Narcotics Detectors (爆炸物与毒品探测仪 - 含台式/便携式)"
        elif "液" in pname: res["category_secondary"] = "Hazardous Liquid Inspectors (危险液体检验仪 - 含台式/手持式)"
        elif "防爆" in pname: res["category_secondary"] = "Explosion Protection (防爆防护 - 防爆罐/防爆毯)"
        elif "剂量" in pname or "辐射" in pname: res["category_secondary"] = "Radiation Detectors / Dosimeters (辐射剂量仪/中子剂量当量仪)"
        elif "摆闸" in pname or "闸" in pname: res["category_secondary"] = "Access Control Turnstiles (通道闸机 / 摆闸)"
        elif "铁磁" in pname: res["category_secondary"] = "Ferromagnetic Security Pillars (智能铁磁安检柱)"
        return res

    # 4. DEFENSE ENG
    if "04工程补给" in fname or "贝雷" in pname or "钢桥" in pname:
        res = {"category_primary": "Defense Engineering & Field Logistics (防务工程与野战补给)"}
        if "配件" in pname or "架" in pname or "柱" in pname or "梁" in pname or "板" in pname:
            res["category_secondary"] = "Bridge Components & Accessories (钢桥配件)"
        else:
            res["category_secondary"] = "Prefabricated Steel Bridges / Bailey Bridges (贝雷钢桥 / 预制钢桥)"
        return res

    # 5. FIELD HOSPITAL
    if "05野战医院" in fname or "方舱" in pname:
        res = {"category_primary": "Field & Mobile Hospitals (野战 / 移动医院系统)"}
        if "方舱" in pname: res["category_secondary"] = "Intelligent Mobile Cabin Hospitals (智能化多功能方舱医院)"
        else: res["category_secondary"] = "Containerized Medical Systems (箱组式医疗救治系统)"
        return res

    # 6. SURVEILLANCE
    if "06要地防护" in fname or "分级防护" in fname or "摄像机" in pname or "转台" in pname or "哨兵" in pname:
        res = {"category_primary": "Perimeter & Area Surveillance (要地周边防护与监控)"}
        if "哨兵" in pname: res["category_secondary"] = "Smart Electronic Sentinels (智能电子哨兵)"
        elif "雷视" in pname: res["category_secondary"] = "Radar-Vision Integration Systems (雷视融合系统)"
        elif "转台" in pname or "多波段" in pname: res["category_secondary"] = "Multi-Band EO/IR PTZ Cameras (多波段光电转台 / 智能多波段摄像机)"
        elif "热成像" in pname: res["category_secondary"] = "Dual-Band Thermal High-Speed Domes (双波段热成像高速球)"
        elif "激光" in pname: res["category_secondary"] = "HD Laser Cameras (高清激光摄像机)"
        return res

    return {"category_primary": "Other"}

base_dir = "/Users/mattchyi/Documents/Project/fc/网站资料"
all_json_files = glob.glob(os.path.join(base_dir, "**/*.json"), recursive=True)

for fpath in all_json_files:
    if "checkpoint" in fpath or "temp" in fpath: continue
    with open(fpath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except: continue
    
    # Clean old category fields
    for k in list(data.keys()):
        if k.startswith("category"): del data[k]
        
    mapping = get_mapping(fpath, data.get("product_name", ""), data.get("detail_html", ""))
    data.update(mapping)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Finished strict categorization based on 产品中心.md")
