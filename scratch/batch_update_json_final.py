import json
import os
import re

files = [
    # 03 智慧警务
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/01非传FC-H智能手机探测门产品参数.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/02非传FBG-G1.5-FC06防爆罐.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/03非传FBT-FC09防爆毯.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/04非传FC1500B台式液体安全检验仪.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/05非传FC1500手持式液体探测仪.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/06非传FC1800T台式爆炸物毒品探测仪.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/07非传FC2088手持金属探测器技术参数.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/08非传FC5030小型安检机产品参数介绍.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/09非传FC6550D双源双视角安检机产品参数.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/10非传FC6550安检机产品参数.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/11非传FC-C(豪华型)通过式金属检测门资料.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/12非传FC-C液晶型12区通过式金属探测门.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/13非传便携爆炸物探测仪FC1800B.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/14非传FC-H 智慧手机探测门29寸.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/15非传豪华摆闸参数.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/03智慧警务/智慧警务/16非传FC-3000智能铁磁安检柱.json",
    
    # 04 工程补给
    "/Users/mattchyi/Documents/Project/fc/网站资料/04工程补给/贝雷钢桥/01工程补给产品贝雷桥.json",
    
    # 05 野战医院
    "/Users/mattchyi/Documents/Project/fc/网站资料/05野战医院/01箱组式医疗救治系统.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/05野战医院/02智能化可移动式多功能方舱医院.json",
    
    # 06 要地防护
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-DMA型多波段光电转台.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-DMS10系列智能电子哨兵.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-DTVC系列双波段热成像高速球.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-RC系列高清激光摄像机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-RDS500-4R型雷视融合系统.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护/FC-TTVC系列智能多波段摄像机.json"
]

def extract_content(data):
    params = data.get("parameters", {})
    detail = data.get("detail_html", "")
    
    # Extract application from detail_html
    bullets = re.findall(r'<li>(.*?)</li>', detail)
    app_text = ""
    if bullets:
        filtered = []
        for b in bullets:
            b = re.sub(r'<.*?>', '', b).strip()
            if not b: continue
            if b.startswith("图") or "功能" in b or "特点" in b or "参数" in b or "技术指标" in b or len(b) < 5:
                continue
            filtered.append(b)
        app_text = "；".join(filtered[:3])
    
    if not app_text:
        app_text = data.get("summary", "")[:120].strip()

    # Prepend prefix
    app_text = f"应用领域：{app_text}"

    # Select parameters
    important_keywords = ["规格", "尺寸", "重量", "材质", "跨径", "载重", "参数", "工作温度", "探测距离", "识别距离", "续航", "功耗"]
    
    selected_p = []
    seen_vals = set(["规格", "参数", "无", "无数据", "待补充"])
    
    # Priority search
    for kw in important_keywords:
        for pk, pv in params.items():
            if kw in pk and pv not in seen_vals and pk not in seen_vals:
                entry = f"{pk}: {pv}"
                if entry not in selected_p:
                    selected_p.append(entry)
                    if len(selected_p) >= 2: break
        if len(selected_p) >= 2: break
    
    # Fill remaining
    if len(selected_p) < 2:
        for pk, pv in params.items():
            if pk not in seen_vals and pv not in seen_vals and len(str(pv)) > 1:
                entry = f"{pk}: {pv}"
                if entry not in selected_p:
                    selected_p.append(entry)
                if len(selected_p) >= 2: break
        
    p1 = selected_p[0] if len(selected_p) > 0 else ""
    p2 = selected_p[1] if len(selected_p) > 1 else ""
    
    return app_text, p1, p2

for fpath in files:
    if not os.path.exists(fpath):
        print(f"File not found: {fpath}")
        continue
            
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    app, p1, p2 = extract_content(data)
    
    # Update logic (clean old keys if any)
    new_data = {}
    for k, v in data.items():
        if k in ["key_application", "key_parameter_1", "key_parameter_2"]: continue
        new_data[k] = v
        if k == "summary":
            new_data["key_application"] = app
            new_data["key_parameter_1"] = p1
            new_data["key_parameter_2"] = p2
            
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)
    print(f"Updated: {fpath}")
