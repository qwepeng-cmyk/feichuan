import json
import os
import re

files = [
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/01固定式无线电侦测设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/02无线电干扰设备（定向）.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/03手提式无线电侦测设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/04无线电干扰设备 （全向）.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/05便携式无人机反制盾.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/06便携式无人机反制盾2.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/07便携式无人机察打一体设备2.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/08便携式无人机察打一体设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/09固定式反无人机无线电主动防御设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/10无人机导航诱骗设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/11便携式反无人机无线电主动防御设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/12光电识别跟踪设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/13无人机远程识别信息监测设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/14手持式无线电侦测设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/15低空探测雷达2.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/16低空探测雷达.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/17携式察打一体反无人机设备.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/02反无设备/18多频段侦干一体反制枪.json"
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
        app_text = data.get("summary", "")[:150].strip()

    # Select parameters
    important_keywords = ["侦测半径", "干扰距离", "探测范围", "诱骗距离", "监测距离", "作用距离", "工作频段", "工作频率", "覆盖频段", "侦测响应时间", "续航时间", "设备重量", "重量", "功率", "侦测角度", "拦截距离"]
    
    selected_p = []
    seen_vals = set(["规格", "参数", "无"])
    
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
            if pk not in seen_vals and pv not in seen_vals:
                entry = f"{pk}: {pv}"
                if entry not in selected_p:
                    selected_p.append(entry)
                if len(selected_p) >= 2: break
        
    p1 = selected_p[0] if len(selected_p) > 0 else ""
    p2 = selected_p[1] if len(selected_p) > 1 else ""
    
    return app_text, p1, p2

for fpath in files:
    if not os.path.exists(fpath): continue
            
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    app, p1, p2 = extract_content(data)
    
    # Update logic (clean old keys first)
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
    print(f"Refined: {fpath}")
