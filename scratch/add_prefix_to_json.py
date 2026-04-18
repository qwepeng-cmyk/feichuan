import json
import os

all_files = [
    # Batch 1: 大无人机
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/01应急通讯无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/02应急消防无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/03应急照明无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/04应急侦查无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/05水利监测无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/06电力巡检无人机.json",
    "/Users/mattchyi/Documents/Project/fc/网站资料/01大无人机/04新整理无人机/07油气管道巡检无人机.json",
    # Batch 2: 反无设备
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

prefix = "应用领域："

for fpath in all_files:
    if not os.path.exists(fpath): continue
            
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if "key_application" in data:
        val = data["key_application"]
        if not val.startswith(prefix):
            data["key_application"] = f"{prefix}{val}"
            
            with open(fpath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Updated prefix for: {fpath}")
        else:
            print(f"Already has prefix: {fpath}")
