from __future__ import annotations

import html
import importlib.util
import json
import re
from pathlib import Path
from typing import Any

_EXTRACTOR_PATH = Path(__file__).with_name("extract-uav-docx-structure.py")
_SPEC = importlib.util.spec_from_file_location("extract_uav_docx_structure", _EXTRACTOR_PATH)
if _SPEC is None or _SPEC.loader is None:
    raise RuntimeError(f"Unable to load {_EXTRACTOR_PATH}")
_EXTRACTOR = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(_EXTRACTOR)
DOCX_MAP = _EXTRACTOR.DOCX_MAP
extract_docx = _EXTRACTOR.extract_docx


TITLE_EN = {
    "产品简介": "Product Introduction",
    "产品概述": "Product Overview",
    "功能概述": "Functional Overview",
    "功能特点": "Functional Characteristics",
    "技术指标": "Technical Indicators",
    "技术参数": "Technical Parameters",
    "系统组成": "System Composition",
    "应用概述": "Application Overview",
    "应用场景": "Application Scenarios",
    "基本参数表": "Basic Parameters",
    "基本参数": "Basic Parameters",
    "无人机参数": "UAV Parameters",
    "河湖监测与监管": "River and Lake Monitoring",
    "水土保持调查": "Soil and Water Conservation Survey",
    "水旱灾害防御": "Flood and Drought Disaster Prevention",
    "水利工程检查": "Water Conservancy Engineering Inspection",
    "堰塞湖应急监测": "Barrier Lake Emergency Monitoring",
    "冰凌应急监测": "Ice-Jam Emergency Monitoring",
    "人工巡检": "Manual Inspection",
    "无人机巡检": "UAV Inspection",
    "行业背景": "Industry Background",
    "发展趋势": "Development Trend",
    "系统介绍": "System Introduction",
    "系统价值": "System Value",
    "多场景应用": "Multi-Scenario Applications",
    "应用案例": "Application Cases",
    "无人机平台": "UAV Platform",
    "飞行平台": "Flight Platform",
    "系留系统": "Tethered System",
    "智能遥控器": "Smart Remote Controller",
    "照明模块": "Lighting Module",
    "系留电池": "Tethered Battery",
    "运输航空箱": "Transport Flight Case",
    "发电机": "Generator",
    "双光云台相机": "Dual-Sensor Gimbal Camera",
    "喊话器": "Loudspeaker",
    "4G宽带基站": "4G Broadband Base Station",
    "卫星终端": "Satellite Terminal",
    "自组网电台": "Mesh Radio",
    "破窗灭火弹发射器": "Window-Breaking Fire Extinguisher Launcher",
    "消防水枪": "Firefighting Water Lance",
    "消防水带": "Fire Hose",
    "消防综合运输车": "Integrated Firefighting Vehicle",
    "系留供电": "Tethered Power Supply",
    "压缩空气泡沫灭火系统": "Compressed-Air Foam Firefighting System",
    "车载指挥系统": "Vehicle-Mounted Command System",
    "产品配置清单": "Product Configuration List",
    "备品备件清单": "Spare Parts List",
    "人员配置单": "Personnel Configuration",
}

TITLE_RU = {
    "产品简介": "Описание продукта",
    "产品概述": "Обзор продукта",
    "功能概述": "Функциональный обзор",
    "功能特点": "Функциональные особенности",
    "技术指标": "Технические показатели",
    "技术参数": "Технические параметры",
    "系统组成": "Состав системы",
    "应用概述": "Обзор применения",
    "应用场景": "Сценарии применения",
    "基本参数表": "Основные параметры",
    "基本参数": "Основные параметры",
    "无人机参数": "Параметры БПЛА",
    "河湖监测与监管": "Мониторинг рек и озер",
    "水土保持调查": "Обследование водно-почвенного сохранения",
    "水旱灾害防御": "Предупреждение паводков и засух",
    "水利工程检查": "Инспекция гидротехнических объектов",
    "堰塞湖应急监测": "Аварийный мониторинг запрудных озер",
    "冰凌应急监测": "Аварийный мониторинг ледовых заторов",
    "人工巡检": "Ручная инспекция",
    "无人机巡检": "Инспекция с БПЛА",
    "行业背景": "Отраслевой фон",
    "发展趋势": "Тенденция развития",
    "系统介绍": "Описание системы",
    "系统价值": "Ценность системы",
    "多场景应用": "Много сценариев применения",
    "应用案例": "Примеры применения",
    "无人机平台": "Платформа БПЛА",
    "飞行平台": "Летная платформа",
    "系留系统": "Привязная система",
    "智能遥控器": "Интеллектуальный пульт",
    "照明模块": "Осветительный модуль",
    "系留电池": "Аккумулятор для привязного режима",
    "运输航空箱": "Транспортный кейс",
    "发电机": "Генератор",
    "双光云台相机": "Двухспектральная камера на подвесе",
    "喊话器": "Громкоговоритель",
    "4G宽带基站": "Широкополосная базовая станция 4G",
    "卫星终端": "Спутниковый терминал",
    "自组网电台": "Самоорганизующаяся радиостанция",
    "破窗灭火弹发射器": "Пусковое устройство для пробивания окна",
    "消防水枪": "Пожарный ствол",
    "消防水带": "Пожарный рукав",
    "消防综合运输车": "Комплексный пожарный автомобиль",
    "系留供电": "Привязное питание",
    "压缩空气泡沫灭火系统": "Система CAFS",
    "车载指挥系统": "Бортовая командная система",
    "产品配置清单": "Комплект поставки",
    "备品备件清单": "Запасные части",
    "人员配置单": "Расчет персонала",
}

PARAM_EN = {
    "参数名称": "Parameter",
    "技术指标": "Technical Indicator",
    "无人机参数": "UAV Parameters",
    "基本参数": "Basic Parameters",
    "产品名称": "Product Name",
    "主要参数": "Main Parameters",
    "数量（套）": "Quantity (sets)",
    "数量（人）": "Quantity (people)",
    "价格": "Price",
    "序号": "No.",
    "易损易耗件名称": "Wear/consumable part",
    "规格型号": "Specification / Model",
    "品牌": "Brand",
    "原产地": "Origin",
    "备注": "Remarks",
    "岗位名称": "Role",
    "岗位职责": "Responsibility",
    "配置人数": "Personnel",
    "标准载重": "Standard Payload",
    "载重": "Payload",
    "载重3kg": "Endurance with 3kg Payload",
    "载重20kg续航": "Endurance with 20kg Payload",
    "载重50kg续航": "Endurance with 50kg Payload",
    "最大飞行速度": "Max Flight Speed",
    "最大巡航速度": "Max Cruise Speed",
    "旋翼数量": "Rotor Configuration",
    "工作温度": "Operating Temperature",
    "螺旋桨": "Propeller",
    "桨叶尺寸": "Blade Size",
    "空载续航": "Endurance Without Payload",
    "动力系统": "Power System",
    "整机轴距": "Wheelbase",
    "对称轴距": "Symmetric Wheelbase",
    "整机高度": "Overall Height",
    "定位精度": "Positioning Accuracy",
    "可抗风等级": "Wind Resistance",
    "抗风等级": "Wind Resistance",
    "定位系统": "Positioning System",
    "最大飞行海拔": "Max Flight Altitude",
    "最大海拔高度": "Max Altitude",
    "保护功能": "Protection Functions",
    "整机尺寸": "Overall Dimensions",
    "起落架高度": "Landing Gear Height",
    "机翼面积": "Wing Area",
    "最大起飞重量": "Max Take-Off Weight",
    "建议最大起飞重量": "Recommended Max Take-Off Weight",
    "最大载荷": "Max Payload",
    "空载航时": "Endurance Without Payload",
    "巡航速度": "Cruise Speed",
    "抗风性能": "Wind Resistance",
    "防护等级": "Protection Rating",
    "运输箱尺寸": "Transport Case Dimensions",
    "油箱容积": "Fuel Tank Capacity",
    "发动机": "Engine",
    "产品类型": "Product Type",
    "作业场景": "Operating Scenarios",
    "搭载载荷": "Payloads",
    "控制通信半径": "Control/Communication Radius",
    "搜救响应时间": "Search-and-Rescue Response Time",
    "最大抗风等级": "Max Wind Resistance",
    "最大起飞海拔": "Max Take-Off Altitude",
    "整机最大载荷": "Max System Payload",
    "机巢开合方式": "Dock Opening Method",
    "整机防护等级": "System Protection Rating",
    "机巢补能方式": "Dock Energy Replenishment",
    "系统启动时间": "System Start Time",
    "二次作业间隔": "Second Mission Interval",
    "机巢供电输入": "Dock Power Input",
    "全系统通讯链路": "System Communication Link",
    "UPS 模组续航时长": "UPS Module Endurance",
    "无人机最大负载能力": "UAV Max Payload",
    "无人机最大续航时长": "UAV Max Endurance",
    "无人机抗风等级": "UAV Wind Resistance",
    "无人机抗电磁干扰能力": "UAV EM Resilience",
    "可见光摄像机总像素": "Visible-Light Camera Pixels",
    "红外热成像设备分辨率": "Thermal Imaging Resolution",
    "机身工艺": "Airframe Process",
    "空机重量": "Empty Weight",
    "最大负载": "Max Payload",
    "最大续航": "Max Endurance",
    "抗干扰等级": "EM Environment",
    "通信链路": "Communication Link",
    "智能能力": "Intelligent Capability",
    "系统架构": "System Architecture",
    "作业模式": "Operating Mode",
    "适用场景": "Applicable Scenarios",
    "作业效率": "Operating Efficiency",
    "型号": "Model",
    "升空高度": "Operating Altitude",
    "载荷能力": "Payload Capacity",
    "续航能力": "Endurance",
    "最大上升速度": "Max Climb Speed",
    "最大下降速度": "Max Descent Speed",
    "水平悬停精度": "Horizontal Hover Accuracy",
    "垂直悬停精度": "Vertical Hover Accuracy",
    "照亮范围": "Illuminated Area",
    "电机": "Motor",
    "桨叶": "Propeller Blades",
    "最大载重": "Max Payload",
    "双冗余定位": "Dual-Redundant Positioning",
    "悬停精度": "Hover Accuracy",
    "最大作业半径": "Max Operating Radius",
    "最大相对飞行高度": "Max Relative Flight Height",
    "抗风能力": "Wind Resistance",
    "防雨性能": "Rain Protection",
    "输入电压": "Input Voltage",
    "输出电压": "Output Voltage",
    "自动收放线": "Automatic Cable Winding",
    "系留线缆材质": "Tether Cable Material",
    "系留线缆长度": "Tether Cable Length",
    "安全设计": "Safety Design",
    "面板显示": "Panel Display",
    "重量": "Weight",
    "屏幕": "Screen",
    "遥控通道": "Remote-Control Channels",
    "集成功能": "Integrated Functions",
    "数据交互功能": "Data Interaction",
    "视频输出": "Video Output",
    "控制功能": "Control Functions",
    "工作方式": "Operating Method",
    "功率": "Power",
    "输入电源": "Input Power",
    "光通量": "Luminous Flux",
    "使用方式": "Usage Method",
    "电流": "Current",
    "自动温度保护起点": "Automatic Temperature Protection Start Point",
    "材质": "Material",
    "类型": "Type",
    "放电倍率": "Discharge Rate",
    "容量": "Capacity",
    "放置功能": "Storage Function",
    "额定电压(V)": "Rated Voltage (V)",
    "额定功率（KW）": "Rated Power (kW)",
    "最大功率（KW）": "Max Power (kW)",
    "冷却方式": "Cooling Method",
    "燃油": "Fuel",
    "油箱容量": "Fuel Tank Capacity",
    "启动方式": "Start Method",
    "名称": "Name",
    "尺寸": "Dimensions",
    "可见光分辨率": "Visible-Light Resolution",
    "可见光焦距范围": "Visible-Light Focal Range",
    "热成像分辨率": "Thermal Imaging Resolution",
    "热成像焦距": "Thermal Imaging Focal Length",
    "角度工作范围": "Angular Operating Range",
    "云台控制模式": "Gimbal Control Mode",
    "控制信号方式": "Control Signal",
    "视频输出格式": "Video Output Format",
    "视频存储格式": "Video Storage Format",
    "图像存储格式": "Image Storage Format",
    "AC输入电压": "AC Input Voltage",
    "声音强度": "Sound Intensity",
    "有效传声距离": "Effective Sound Transmission Distance",
    "接收距离": "Receiving Distance",
    "单小区下行速率": "Single-Cell Downlink Rate",
    "单小区上行速率": "Single-Cell Uplink Rate",
    "支持带宽": "Supported Bandwidth",
    "散热": "Heat Dissipation",
    "防尘防水": "Dust/Water Protection",
    "抗震等级": "Seismic Rating",
    "软件功能": "Software Functions",
    "天线口径": "Antenna Aperture",
    "馈源方式": "Feed Mode",
    "工作频段": "Operating Band",
    "调节范围": "Adjustment Range",
    "调节速度": "Adjustment Speed",
    "供电": "Power Supply",
    "整机重量": "System Weight",
    "工作环境": "Operating Environment",
    "接口": "Interface",
    "工作频率": "Operating Frequency",
    "载波带宽": "Carrier Bandwidth",
    "传输体制": "Transmission System",
    "调制方式": "Modulation",
    "传输能力": "Transmission Capacity",
    "发射功率": "Transmit Power",
    "传输距离": "Transmission Distance",
    "视频输入": "Video Input",
    "接收灵敏度": "Receiver Sensitivity",
    "加密方式": "Encryption",
    "设备功耗": "Device Power Consumption",
    "供电方式": "Power Supply Method",
    "有效负载": "Effective Payload",
    "破窗能力": "Window-Breaking Capability",
    "最大射程": "Max Range",
    "电启动参数": "Electric Start Parameter",
    "发射数量": "Launch Quantity",
    "水带长度": "Hose Length",
    "喷枪长度": "Nozzle Length",
    "喷射距离": "Spray Distance",
    "水带直径": "Hose Diameter",
    "安装方式": "Installation Method",
    "水管长度": "Pipe Length",
    "整车尺寸": "Vehicle Dimensions",
    "驱动形式": "Drive Type",
    "最高车速": "Max Vehicle Speed",
    "乘员人数": "Crew",
    "罐体容积": "Tank Capacity",
    "最大总质量": "Gross Vehicle Weight",
    "动力配置": "Powertrain",
    "最大控制距离": "Max Control Distance",
    "有效载荷": "Effective Payload",
    "升降速度": "Climb/Descent Speed",
    "姿态角度": "Attitude Angle",
    "转动角速度": "Angular Velocity",
    "续航时长": "Endurance",
    "飞行速度": "Flight Speed",
    "载车储液": "Vehicle Liquid Storage",
    "地面站": "Ground Station",
    "消防车主要参数": "Fire Truck Main Parameters",
}

PARAM_RU = {
    "参数名称": "Параметр",
    "技术指标": "Технический показатель",
    "无人机参数": "Параметры БПЛА",
    "基本参数": "Основные параметры",
    "产品名称": "Наименование",
    "主要参数": "Основные параметры",
    "数量（套）": "Количество (компл.)",
    "数量（人）": "Количество (чел.)",
    "价格": "Цена",
    "序号": "No.",
    "易损易耗件名称": "Расходная деталь",
    "规格型号": "Спецификация / модель",
    "品牌": "Бренд",
    "原产地": "Происхождение",
    "备注": "Примечание",
    "岗位名称": "Должность",
    "岗位职责": "Обязанности",
    "配置人数": "Численность",
    "标准载重": "Стандартная полезная нагрузка",
    "载重": "Полезная нагрузка",
    "载重3kg": "Время полета с 3 кг",
    "载重20kg续航": "Время полета с 20 кг",
    "载重50kg续航": "Время полета с 50 кг",
    "最大飞行速度": "Макс. скорость полета",
    "最大巡航速度": "Макс. крейсерская скорость",
    "旋翼数量": "Конфигурация роторов",
    "工作温度": "Рабочая температура",
    "螺旋桨": "Пропеллер",
    "桨叶尺寸": "Размер лопасти",
    "空载续航": "Время полета без нагрузки",
    "动力系统": "Силовая система",
    "整机轴距": "Колесная база",
    "对称轴距": "Симметричная база",
    "整机高度": "Высота аппарата",
    "定位精度": "Точность позиционирования",
    "可抗风等级": "Ветровая устойчивость",
    "抗风等级": "Ветровая устойчивость",
    "定位系统": "Система позиционирования",
    "最大飞行海拔": "Макс. высота полета",
    "最大海拔高度": "Макс. высота",
    "保护功能": "Защитные функции",
    "整机尺寸": "Габариты",
    "起落架高度": "Высота шасси",
    "机翼面积": "Площадь крыла",
    "最大起飞重量": "Макс. взлетная масса",
    "建议最大起飞重量": "Рекомендуемая макс. взлетная масса",
    "最大载荷": "Макс. полезная нагрузка",
    "空载航时": "Время полета без нагрузки",
    "巡航速度": "Крейсерская скорость",
    "抗风性能": "Ветровая устойчивость",
    "防护等级": "Степень защиты",
    "运输箱尺寸": "Размер транспортного кейса",
    "油箱容积": "Емкость топливного бака",
    "发动机": "Двигатель",
    "产品类型": "Тип продукта",
    "作业场景": "Сценарии работ",
    "搭载载荷": "Полезная нагрузка",
    "控制通信半径": "Радиус управления/связи",
    "搜救响应时间": "Время реагирования",
    "最大抗风等级": "Макс. ветровая устойчивость",
    "最大起飞海拔": "Макс. высота взлета",
    "整机最大载荷": "Макс. полезная нагрузка системы",
    "机巢开合方式": "Открытие док-станции",
    "整机防护等级": "Защита системы",
    "机巢补能方式": "Пополнение энергии дока",
    "系统启动时间": "Время запуска",
    "二次作业间隔": "Интервал повторной миссии",
    "机巢供电输入": "Питание дока",
    "全系统通讯链路": "Канал связи системы",
    "UPS 模组续航时长": "Автономность UPS",
    "无人机最大负载能力": "Макс. нагрузка БПЛА",
    "无人机最大续航时长": "Макс. время полета БПЛА",
    "无人机抗风等级": "Ветровая устойчивость БПЛА",
    "无人机抗电磁干扰能力": "Устойчивость к ЭМ среде",
    "可见光摄像机总像素": "Пиксели камеры видимого света",
    "红外热成像设备分辨率": "Разрешение тепловизора",
    "机身工艺": "Конструкция корпуса",
    "空机重量": "Масса без нагрузки",
    "最大负载": "Макс. нагрузка",
    "最大续航": "Макс. время полета",
    "抗干扰等级": "Устойчивость к ЭМ среде",
    "通信链路": "Канал связи",
    "智能能力": "Интеллектуальные функции",
    "系统架构": "Архитектура системы",
    "作业模式": "Режим работы",
    "适用场景": "Сценарии применения",
    "作业效率": "Эффективность работ",
    "型号": "Модель",
    "升空高度": "Рабочая высота",
    "载荷能力": "Грузоподъемность",
    "续航能力": "Автономность",
    "最大上升速度": "Макс. скорость набора высоты",
    "最大下降速度": "Макс. скорость снижения",
    "水平悬停精度": "Точность висения по горизонтали",
    "垂直悬停精度": "Точность висения по вертикали",
    "照亮范围": "Площадь освещения",
    "电机": "Двигатель",
    "桨叶": "Лопасти",
    "最大载重": "Макс. грузоподъемность",
    "双冗余定位": "Двойное резервное позиционирование",
    "悬停精度": "Точность висения",
    "最大作业半径": "Макс. рабочий радиус",
    "最大相对飞行高度": "Макс. относительная высота",
    "抗风能力": "Ветровая устойчивость",
    "防雨性能": "Защита от дождя",
    "输入电压": "Входное напряжение",
    "输出电压": "Выходное напряжение",
    "自动收放线": "Автоматическая намотка кабеля",
    "系留线缆材质": "Материал привязного кабеля",
    "系留线缆长度": "Длина привязного кабеля",
    "安全设计": "Безопасность",
    "面板显示": "Индикация панели",
    "重量": "Масса",
    "屏幕": "Экран",
    "遥控通道": "Каналы управления",
    "集成功能": "Интегрированные функции",
    "数据交互功能": "Обмен данными",
    "视频输出": "Видеовыход",
    "控制功能": "Функции управления",
    "工作方式": "Способ работы",
    "功率": "Мощность",
    "输入电源": "Вход питания",
    "光通量": "Световой поток",
    "使用方式": "Способ применения",
    "电流": "Ток",
    "自动温度保护起点": "Порог температурной защиты",
    "材质": "Материал",
    "类型": "Тип",
    "放电倍率": "Разрядный ток",
    "容量": "Емкость",
    "放置功能": "Функция размещения",
    "额定电压(V)": "Номинальное напряжение (В)",
    "额定功率（KW）": "Номинальная мощность (кВт)",
    "最大功率（KW）": "Макс. мощность (кВт)",
    "冷却方式": "Охлаждение",
    "燃油": "Топливо",
    "油箱容量": "Емкость бака",
    "启动方式": "Запуск",
    "名称": "Наименование",
    "尺寸": "Размеры",
    "可见光分辨率": "Разрешение видимого канала",
    "可见光焦距范围": "Фокус видимого канала",
    "热成像分辨率": "Разрешение тепловизора",
    "热成像焦距": "Фокус тепловизора",
    "角度工作范围": "Диапазон углов",
    "云台控制模式": "Режим управления подвесом",
    "控制信号方式": "Сигнал управления",
    "视频输出格式": "Формат видеовыхода",
    "视频存储格式": "Формат видео",
    "图像存储格式": "Формат изображения",
    "AC输入电压": "Входное напряжение AC",
    "声音强度": "Уровень звука",
    "有效传声距离": "Эффективная дальность звука",
    "接收距离": "Дальность приема",
    "单小区下行速率": "Скорость downlink в соте",
    "单小区上行速率": "Скорость uplink в соте",
    "支持带宽": "Поддерживаемая полоса",
    "散热": "Охлаждение",
    "防尘防水": "Пыле- и влагозащита",
    "抗震等级": "Сейсмостойкость",
    "软件功能": "ПО функции",
    "天线口径": "Апертура антенны",
    "馈源方式": "Тип облучателя",
    "工作频段": "Рабочий диапазон",
    "调节范围": "Диапазон регулировки",
    "调节速度": "Скорость регулировки",
    "供电": "Питание",
    "整机重量": "Масса системы",
    "工作环境": "Рабочая среда",
    "接口": "Интерфейс",
    "工作频率": "Рабочая частота",
    "载波带宽": "Ширина несущей",
    "传输体制": "Система передачи",
    "调制方式": "Модуляция",
    "传输能力": "Пропускная способность",
    "发射功率": "Мощность передачи",
    "传输距离": "Дальность передачи",
    "视频输入": "Видеовход",
    "接收灵敏度": "Чувствительность приемника",
    "加密方式": "Шифрование",
    "设备功耗": "Потребление устройства",
    "供电方式": "Способ питания",
    "有效负载": "Эффективная нагрузка",
    "破窗能力": "Пробивание окна",
    "最大射程": "Макс. дальность",
    "电启动参数": "Параметр электрозапуска",
    "发射数量": "Количество пусков",
    "水带长度": "Длина рукава",
    "喷枪长度": "Длина ствола",
    "喷射距离": "Дальность струи",
    "水带直径": "Диаметр рукава",
    "安装方式": "Монтаж",
    "水管长度": "Длина трубы",
    "整车尺寸": "Габариты автомобиля",
    "驱动形式": "Привод",
    "最高车速": "Макс. скорость автомобиля",
    "乘员人数": "Экипаж",
    "罐体容积": "Емкость цистерны",
    "最大总质量": "Полная масса",
    "动力配置": "Силовая установка",
    "最大控制距离": "Макс. дальность управления",
    "有效载荷": "Эффективная нагрузка",
    "升降速度": "Скорость подъема/снижения",
    "姿态角度": "Угол ориентации",
    "转动角速度": "Угловая скорость",
    "续航时长": "Автономность",
    "飞行速度": "Скорость полета",
    "载车储液": "Запас жидкости на автомобиле",
    "地面站": "Наземная станция",
    "消防车主要参数": "Основные параметры пожарного автомобиля",
}

VALUE_REPLACEMENTS_EN = [
    ("4轴4桨", "4-axis / 4-prop"),
    ("6轴6桨", "6-axis / 6-prop"),
    ("4轴8桨", "4-axis / 8-prop"),
    ("30寸桨叶", "30-inch propellers"),
    ("30寸折叠桨", "30-inch folding propellers"),
    ("21寸桨", "21-inch propellers"),
    ("60寸", "60-inch"),
    ("FOC高效动力系统", "FOC high-efficiency power system"),
    ("GPS/北斗/伽利略/格洛纳斯", "GPS / BeiDou / Galileo / GLONASS"),
    ("失控返航、低电量返航降落、断点续飞", "return-to-home on control loss, low-battery return/landing, and mission resume"),
    ("旋翼模式6级、固定翼模式7级", "Level 6 in rotor mode; Level 7 in fixed-wing mode"),
    ("旋翼模式5级（最大瞬时风力）固定翼模式6级", "Level 5 in rotor mode (maximum gust); Level 6 in fixed-wing mode"),
    ("双开门", "dual-door"),
    ("自动换电", "automatic battery swap"),
    ("220V 交流电", "220V AC"),
    ("宽带 / 4G/5G", "broadband / 4G / 5G"),
    ("A 级抗强电磁干扰", "Class-A resilience in strong electromagnetic environments"),
    ("异型碳纤维一体成型，高强度轻量化", "integrated shaped carbon-fiber body, high strength and lightweight"),
    ("IP55 工业级防尘防水", "IP55 industrial dust and water protection"),
    ("4G/5G 远距离实时图传与数据传输", "4G/5G long-range real-time video and data transmission"),
    ("机载 AI 智能分析、边缘计算、缺陷实时识别", "onboard AI analysis, edge computing, and real-time defect recognition"),
    ("工业无人机平台 + 可见光 / 红外", "industrial UAV platform + visible-light / infrared payload"),
    ("航线规划后自动巡检、定点精细化航拍、应急故障巡检", "planned-route autonomous inspection, fixed-point detailed aerial imaging, and emergency fault inspection"),
    ("输电铁塔、导线、绝缘子、金具、防振锤巡检", "transmission towers, conductors, insulators, fittings, and vibration-damper inspection"),
    ("巡检效率为传统人工 20 倍以上", "more than 20 times the efficiency of manual inspection"),
    ("多旋翼应急搜救无人机", "multi-rotor emergency search-and-rescue UAV"),
    ("山林搜救、洪涝救援、水域遇险、人员失联", "mountain/forest search, flood rescue, water rescue, and missing-person response"),
    ("可见光相机 + 红外热成像 可选喊话器 / 探照灯 / 抛投器", "visible-light camera + infrared thermal imaging; optional loudspeaker / searchlight / dropper"),
    ("折叠式轴距≤800mm", "folding wheelbase <=800mm"),
    ("续航30min", "30min endurance"),
    ("地面站/5km-60km", "ground station / 5km-60km"),
    ("LiDe70两冲发动机", "LiDe70 two-stroke engine"),
    ("Lide170两冲发动机", "Lide170 two-stroke engine"),
    ("Lide290二冲发动机", "Lide290 two-stroke engine"),
    ("水箱 2000L、A 类泡沫液箱 300L", "2000L water tank and 300L Class-A foam tank"),
    ("实时姿态 / 定位 / 高度监测，支持一键起降、遥控 / 自主飞行、低电量自动返航", "real-time attitude / positioning / altitude monitoring; one-key take-off/landing, remote/autonomous flight, and low-battery return"),
    ("水罐 2m³、泡沫罐 0.3m³", "2 m3 water tank and 0.3 m3 foam tank"),
    ("MC07.34-60 柴油机，251KW/340 马力", "MC07.34-60 diesel engine, 251 kW / 340 hp"),
    ("最大载重20kg；北斗/GPS双冗余定位", "max payload 20kg; BeiDou/GPS dual-redundant positioning"),
    ("输入AC380V；系留线缆≥200m", "AC380V input; tether cable >=200m"),
    ("下行速率150Mbps；防护等级IP66", "150Mbps downlink; IP66 protection"),
    ("天线口径1.2m；工作温度-30℃~+55℃", "1.2m antenna aperture; -30 C to +55 C operating temperature"),
    ("工作频率1300~1500MHz； 传输距离＞30km", "1300-1500MHz operating frequency; transmission distance >30km"),
    ("7寸触摸显示屏；≥16个遥控通道", "7-inch touch display; >=16 remote-control channels"),
    ("额定功率18KW；冷却方式风冷", "18kW rated power; air cooling"),
    ("额定功率18KW；冷却方式为风冷", "18kW rated power; air cooling"),
    ("防火木+铝材包边；可装全套设备", "fire-resistant wood with aluminum edging; stores the full equipment set"),
    ("可见光1080P；热成像分辨率1280×1024", "1080P visible-light; 1280x1024 thermal imaging"),
    ("1m处≥100dB；有效传声距离1000m", ">=100dB at 1m; effective sound range 1000m"),
    ("最大载重 5kg，抗风能力≥6 级", "max payload 5kg; wind resistance >=Level 6"),
    ("输入 AC220V、输出 DC380-420V， 线缆长度≥100m", "AC220V input, DC380-420V output, cable length >=100m"),
    ("内置 7 英寸触控屏，遥控通道≥16 路", "built-in 7-inch touch screen, >=16 remote-control channels"),
    ("功率≥500W，光通量≥80000lm", "power >=500W, luminous flux >=80000lm"),
    ("12S 锂电池，容量≥12000mAh", "12S lithium battery, capacity >=12000mAh"),
    ("防火木加铝材包边，可容纳全套飞行设备", "fire-resistant wood with aluminum edging, stores the full flight equipment set"),
    ("额定功率 18KW，油箱容量 40L", "18kW rated power, 40L fuel tank"),
    ("可见光分辨率：1920×1080 热成像分辨率：1280×1024", "visible-light resolution 1920x1080; thermal resolution 1280x1024"),
    ("传声距离 1000m，遥控接收距离 10 公里", "sound transmission distance 1000m; remote receiving distance 10km"),
    ("最大载重70kg；系留模式飞行时间12h", "max payload 70kg; 12h flight time in tethered mode"),
    ("内置7英寸触摸显示屏；遥控通道≥16个", "built-in 7-inch touch display; >=16 remote-control channels"),
    ("声音强度≥100dB（1m距离）；有效传声距离1000m", "sound intensity >=100dB at 1m; effective sound distance 1000m"),
    ("单发18米穿透16mm钢化双层真空玻璃；最大射程≤50米", "single round penetrates 16mm tempered double vacuum glass at 18m; max range <=50m"),
    ("多屏多画面监控；支持5G实时回传数据至总部", "multi-screen monitoring; supports 5G real-time data return to headquarters"),
    ("喷射距离≥20m；材质为碳纤维", "spray distance >=20m; carbon-fiber material"),
    ("支持消防泡沫/水剂；水管长度150m（可定制）", "supports firefighting foam / water agent; 150m hose length, customizable"),
    ("输出电压DC1000V；系留线缆长度≥150m", "DC1000V output; tether cable length >=150m"),
    ("由灭火主单元、压缩空气单元、操作面板组成；可精确混合泡沫灭火剂", "composed of firefighting main unit, compressed-air unit, and control panel; precise foam mixing"),
    ("≤5min（部署完成后起飞作业）", "<=5min (take-off after deployment)"),
    ("400 万高清成像", "4-megapixel HD imaging"),
    ("约80dm²", "about 80dm2"),
    ("约93dm2", "about 93dm2"),
    ("非传", "N-TET"),
    ("北京", "Beijing"),
    ("螺旋桨固定螺丝", "propeller fixing screws"),
    ("螺旋桨", "propeller"),
    ("电池", "battery"),
    ("电机", "motor"),
    ("天线", "antenna"),
    ("系留备用电池", "tethered spare battery"),
    ("最大 15m/s", "max 15m/s"),
    ("上升 5m/s，下降 3m/s", "climb 5m/s, descent 3m/s"),
    ("水平 ±0.5m、垂直 ±0.5m", "horizontal +/-0.5m, vertical +/-0.5m"),
    ("最大俯仰 35°", "max pitch 35 degrees"),
    ("俯仰轴 120°/s，航向轴 120°/s", "pitch axis 120 degrees/s, yaw axis 120 degrees/s"),
    ("俯仰轴 120°/s，航向轴 50°/s", "pitch axis 120 degrees/s, yaw axis 50 degrees/s"),
    ("系留备用battery", "tethered spare battery"),
]

VALUE_REPLACEMENTS_RU = [
    ("4轴4桨", "4 оси / 4 пропеллера"),
    ("6轴6桨", "6 осей / 6 пропеллеров"),
    ("4轴8桨", "4 оси / 8 пропеллеров"),
    ("30寸桨叶", "30-дюймовые пропеллеры"),
    ("30寸折叠桨", "30-дюймовые складные пропеллеры"),
    ("21寸桨", "21-дюймовые пропеллеры"),
    ("60寸", "60 дюймов"),
    ("FOC高效动力系统", "высокоэффективная силовая система FOC"),
    ("GPS/北斗/伽利略/格洛纳斯", "GPS / BeiDou / Galileo / GLONASS"),
    ("失控返航、低电量返航降落、断点续飞", "возврат при потере управления, возврат/посадка при низком заряде, продолжение миссии"),
    ("旋翼模式6级、固定翼模式7级", "уровень 6 в роторном режиме; уровень 7 в режиме самолета"),
    ("旋翼模式5级（最大瞬时风力）固定翼模式6级", "уровень 5 в роторном режиме (порыв); уровень 6 в режиме самолета"),
    ("双开门", "двухстворчатая дверь"),
    ("自动换电", "автоматическая замена аккумулятора"),
    ("220V 交流电", "220 В переменного тока"),
    ("宽带 / 4G/5G", "широкополосная связь / 4G / 5G"),
    ("A 级抗强电磁干扰", "класс A для работы в сильной электромагнитной среде"),
    ("异型碳纤维一体成型，高强度轻量化", "цельная формованная карбоновая конструкция, высокая прочность и малый вес"),
    ("IP55 工业级防尘防水", "промышленная пыле- и влагозащита IP55"),
    ("4G/5G 远距离实时图传与数据传输", "дальняя передача видео и данных по 4G/5G"),
    ("机载 AI 智能分析、边缘计算、缺陷实时识别", "бортовая AI-аналитика, edge computing и распознавание дефектов"),
    ("工业无人机平台 + 可见光 / 红外", "промышленная платформа БПЛА + видимый/ИК канал"),
    ("航线规划后自动巡检、定点精细化航拍、应急故障巡检", "автономная инспекция по маршруту, детальная съемка точек и аварийная проверка"),
    ("输电铁塔、导线、绝缘子、金具、防振锤巡检", "инспекция опор, проводов, изоляторов, арматуры и гасителей вибрации"),
    ("巡检效率为传统人工 20 倍以上", "эффективность более чем в 20 раз выше ручной инспекции"),
    ("多旋翼应急搜救无人机", "мультикоптерный аварийно-спасательный БПЛА"),
    ("山林搜救、洪涝救援、水域遇险、人员失联", "поиск в горах/лесах, спасение при паводках, спасение на воде и поиск пропавших"),
    ("可见光相机 + 红外热成像 可选喊话器 / 探照灯 / 抛投器", "камера видимого света + тепловизор; опции: громкоговоритель / прожектор / сбрасыватель"),
    ("折叠式轴距≤800mm", "складная база <=800 мм"),
    ("续航30min", "30 мин полета"),
    ("地面站/5km-60km", "наземная станция / 5-60 км"),
    ("LiDe70两冲发动机", "двухтактный двигатель LiDe70"),
    ("Lide170两冲发动机", "двухтактный двигатель Lide170"),
    ("Lide290二冲发动机", "двухтактный двигатель Lide290"),
    ("水箱 2000L、A 类泡沫液箱 300L", "бак воды 2000 л и бак пены класса A 300 л"),
    ("实时姿态 / 定位 / 高度监测，支持一键起降、遥控 / 自主飞行、低电量自动返航", "контроль положения / координат / высоты; взлет/посадка одной кнопкой, дистанционный/автономный полет, возврат при низком заряде"),
    ("水罐 2m³、泡沫罐 0.3m³", "водяной бак 2 м3 и пенный бак 0,3 м3"),
    ("MC07.34-60 柴油机，251KW/340 马力", "дизель MC07.34-60, 251 кВт / 340 л.с."),
    ("最大载重20kg；北斗/GPS双冗余定位", "макс. нагрузка 20 кг; двойное позиционирование BeiDou/GPS"),
    ("输入AC380V；系留线缆≥200m", "вход AC380 В; привязной кабель >=200 м"),
    ("下行速率150Mbps；防护等级IP66", "downlink 150 Мбит/с; защита IP66"),
    ("天线口径1.2m；工作温度-30℃~+55℃", "апертура 1,2 м; рабочая температура -30 C ... +55 C"),
    ("工作频率1300~1500MHz； 传输距离＞30km", "частота 1300-1500 МГц; дальность передачи >30 км"),
    ("7寸触摸显示屏；≥16个遥控通道", "7-дюймовый сенсорный экран; >=16 каналов управления"),
    ("额定功率18KW；冷却方式风冷", "номинальная мощность 18 кВт; воздушное охлаждение"),
    ("额定功率18KW；冷却方式为风冷", "номинальная мощность 18 кВт; воздушное охлаждение"),
    ("防火木+铝材包边；可装全套设备", "огнестойкая древесина с алюминиевой окантовкой; размещает полный комплект"),
    ("可见光1080P；热成像分辨率1280×1024", "видимый канал 1080P; тепловизор 1280x1024"),
    ("1m处≥100dB；有效传声距离1000m", ">=100 дБ на 1 м; эффективная дальность 1000 м"),
    ("最大载重 5kg，抗风能力≥6 级", "макс. нагрузка 5 кг; ветровая устойчивость >=уровень 6"),
    ("输入 AC220V、输出 DC380-420V， 线缆长度≥100m", "вход AC220 В, выход DC380-420 В, кабель >=100 м"),
    ("内置 7 英寸触控屏，遥控通道≥16 路", "встроенный 7-дюймовый сенсорный экран, >=16 каналов управления"),
    ("功率≥500W，光通量≥80000lm", "мощность >=500 Вт, световой поток >=80000 лм"),
    ("12S 锂电池，容量≥12000mAh", "литиевая батарея 12S, емкость >=12000 мАч"),
    ("防火木加铝材包边，可容纳全套飞行设备", "огнестойкая древесина с алюминиевой окантовкой, размещает полный летный комплект"),
    ("额定功率 18KW，油箱容量 40L", "номинальная мощность 18 кВт, бак 40 л"),
    ("可见光分辨率：1920×1080 热成像分辨率：1280×1024", "разрешение видимого канала 1920x1080; тепловизор 1280x1024"),
    ("传声距离 1000m，遥控接收距离 10 公里", "дальность звука 1000 м; прием команд 10 км"),
    ("最大载重70kg；系留模式飞行时间12h", "макс. нагрузка 70 кг; 12 ч в привязном режиме"),
    ("内置7英寸触摸显示屏；遥控通道≥16个", "встроенный 7-дюймовый сенсорный экран; >=16 каналов управления"),
    ("声音强度≥100dB（1m距离）；有效传声距离1000m", "уровень звука >=100 дБ на 1 м; эффективная дальность 1000 м"),
    ("单发18米穿透16mm钢化双层真空玻璃；最大射程≤50米", "один выстрел пробивает 16 мм двойное закаленное стекло на 18 м; макс. дальность <=50 м"),
    ("多屏多画面监控；支持5G实时回传数据至总部", "многоэкранный мониторинг; передача данных по 5G в штаб"),
    ("喷射距离≥20m；材质为碳纤维", "дальность струи >=20 м; материал углеволокно"),
    ("支持消防泡沫/水剂；水管长度150m（可定制）", "поддерживает пену/воду; длина рукава 150 м, на заказ"),
    ("输出电压DC1000V；系留线缆长度≥150m", "выход DC1000 В; привязной кабель >=150 м"),
    ("由灭火主单元、压缩空气单元、操作面板组成；可精确混合泡沫灭火剂", "основной модуль, компрессорный модуль и панель управления; точное смешивание пены"),
    ("≤5min（部署完成后起飞作业）", "<=5 мин (взлет после развертывания)"),
    ("400 万高清成像", "HD-съемка 4 Мп"),
    ("约80dm²", "около 80 дм2"),
    ("约93dm2", "около 93 дм2"),
    ("非传", "N-TET"),
    ("北京", "Пекин"),
    ("螺旋桨固定螺丝", "крепежные винты пропеллера"),
    ("螺旋桨", "пропеллер"),
    ("电池", "аккумулятор"),
    ("电机", "мотор"),
    ("天线", "антенна"),
    ("系留备用电池", "резервная батарея для привязного режима"),
    ("最大 15m/s", "макс. 15 м/с"),
    ("上升 5m/s，下降 3m/s", "подъем 5 м/с, снижение 3 м/с"),
    ("水平 ±0.5m、垂直 ±0.5m", "горизонтально +/-0,5 м, вертикально +/-0,5 м"),
    ("最大俯仰 35°", "макс. тангаж 35 град."),
    ("俯仰轴 120°/s，航向轴 120°/s", "ось тангажа 120 град./с, ось курса 120 град./с"),
    ("俯仰轴 120°/s，航向轴 50°/s", "ось тангажа 120 град./с, ось курса 50 град./с"),
    ("系留备用аккумулятор", "резервная батарея для привязного режима"),
]

GENERIC_TEXT_EN = {
    "FC-X4无人机": "FC-X4 UAV",
    "FC-X6无人机": "FC-X6 UAV",
    "FC-Z20无人机": "FC-Z20 UAV",
    "FC-Z50无人机": "FC-Z50 UAV",
    "FC-CQ14无人机": "FC-CQ14 UAV",
    "FC-CQ26无人机": "FC-CQ26 UAV",
    "FC-CQ40无人机": "FC-CQ40 UAV",
    "FC-CQ64无人机": "FC-CQ64 UAV",
    "FC-CQ135无人机": "FC-CQ135 UAV",
}

GENERIC_TEXT_RU = {
    "FC-X4无人机": "БПЛА FC-X4",
    "FC-X6无人机": "БПЛА FC-X6",
    "FC-Z20无人机": "БПЛА FC-Z20",
    "FC-Z50无人机": "БПЛА FC-Z50",
    "FC-CQ14无人机": "БПЛА FC-CQ14",
    "FC-CQ26无人机": "БПЛА FC-CQ26",
    "FC-CQ40无人机": "БПЛА FC-CQ40",
    "FC-CQ64无人机": "БПЛА FC-CQ64",
    "FC-CQ135无人机": "БПЛА FC-CQ135",
}

NARRATIVE: dict[str, dict[str, dict[str, Any]]] = {
    "multi-rotor-3kg-payload-uav": {
        "en": {
            "summary": "The FC-X4 3kg Payload Multi-Rotor UAV is a lightweight reconnaissance platform for emergency response, security patrol, environmental monitoring, and rapid field information collection.",
            "key_application": "Emergency rescue, security patrol, environmental monitoring, water conservancy monitoring, disaster-site reconnaissance, and rapid information feedback.",
            "sections": [
                ("Product Overview", [
                    "The multi-rotor reconnaissance UAV consists of a multi-rotor platform, airborne reconnaissance payloads, and a ground control terminal. The terminal integrates signal receiving and real-time image transmission modules and remotely controls the UAV through wireless links.",
                    "It is used for rapid reconnaissance and information feedback in emergency rescue, security inspection, and environmental monitoring. The system is lightweight and portable, and can carry HD visible-light cameras, infrared thermal imagers, gas detection modules, and other payloads."
                ]),
                ("Application Overview", [
                    "For smart water conservancy, the document positions UAV monitoring as part of a modern sensing and management system, supporting deeper perception, broader interconnection, scientific decision-making, and more efficient intelligent management."
                ]),
                ("Application Scenarios", [
                    "River and lake monitoring and supervision.",
                    "Soil and water conservation survey.",
                    "Flood and drought disaster prevention.",
                    "Water conservancy engineering inspection.",
                    "Barrier lake emergency monitoring.",
                    "Ice-jam emergency monitoring."
                ]),
            ],
        },
        "ru": {
            "summary": "В исходном документе FC-X4 описан как мультикоптерный разведывательный БПЛА, состоящий из летной платформы, бортовой разведывательной нагрузки и наземного терминала управления с приемом сигнала и передачей видео в реальном времени.",
            "key_application": "Аварийно-спасательные работы, охранное патрулирование, экологический мониторинг, водохозяйственный мониторинг, разведка зоны ЧС и быстрая передача информации.",
            "sections": [
                ("Обзор продукта", [
                    "Мультикоптерный разведывательный БПЛА состоит из платформы, бортовой разведывательной нагрузки и наземного терминала управления. Терминал объединяет прием сигнала и передачу изображения в реальном времени, управляя БПЛА по беспроводному каналу.",
                    "Система предназначена для быстрой разведки и обратной передачи информации в аварийно-спасательных, охранных и экологических сценариях. Конструкция легкая и переносная, поддерживает HD-камеры видимого света, тепловизоры, газоанализаторы и другие нагрузки."
                ]),
                ("Обзор применения", [
                    "Для интеллектуального водного хозяйства документ рассматривает мониторинг с БПЛА как часть современной системы восприятия и управления, повышающей наблюдаемость, связанность, научность решений и эффективность управления."
                ]),
                ("Сценарии применения", [
                    "Мониторинг и надзор рек и озер.",
                    "Обследование сохранения почв и воды.",
                    "Предупреждение паводков и засух.",
                    "Инспекция гидротехнических объектов.",
                    "Аварийный мониторинг запрудных озер.",
                    "Аварийный мониторинг ледовых заторов."
                ]),
            ],
        },
    },
    "emergency-search-rescue-drone": {
        "en": {
            "summary": "The emergency search-and-rescue UAV integrates HD visible-light imaging, infrared thermal imaging, intelligent target recognition, HD real-time video transmission, and precise supply delivery for complex rescue scenarios.",
            "key_application": "Forest and mountain search, flood rescue, water rescue, missing-person response, disaster-site situational awareness, and emergency supply delivery.",
            "sections": [
                ("Product Introduction", [
                    "The emergency search-and-rescue UAV can carry multiple mission payloads for flood and urban waterlogging response, earthquake collapse scenes, missing-person searches in the field, and water rescue. It supports wide-area aerial search, trapped-person detection, rapid target positioning, live image return, and fixed-point delivery of emergency materials."
                ]),
                ("Functional Characteristics", [
                    "All-weather wide-area search: infrared thermal imaging and HD zoom visible-light imaging support continuous day/night search and return live site imagery.",
                    "Autonomous mission support: one-key take-off/landing, route planning, and automatic cruising for mountains, ruins, valleys, and other high-risk search areas.",
                    "Modular mission expansion: supports loudspeaker, searchlight, emergency supply dropper, first-aid kit, and lifebuoy delivery payloads.",
                    "Air-ground coordination: HD video and positioning data can be shared with the command platform for integrated aerial reconnaissance and ground response.",
                    "Strong adaptability: designed for high/low temperatures, strong wind disturbance, high altitude, complex weather, rugged terrain, and rapid deployment within 5 minutes."
                ]),
            ],
        },
        "ru": {
            "summary": "Аварийно-спасательный БПЛА объединяет HD-съемку видимого света, тепловизор, интеллектуальное распознавание целей, передачу HD-видео в реальном времени и точную доставку грузов для сложных спасательных сценариев.",
            "key_application": "Поиск в горах и лесах, спасение при паводках, спасение на воде, поиск пропавших людей, оценка обстановки в зоне ЧС и доставка аварийных материалов.",
            "sections": [
                ("Описание продукта", [
                    "Аварийно-спасательный БПЛА несет разные полезные нагрузки для паводков и подтоплений, землетрясений и обрушений, поиска людей на местности и спасения на воде. Он выполняет широкозонный воздушный поиск, обнаружение пострадавших, быстрое позиционирование целей, передачу изображения и точную доставку аварийных материалов."
                ]),
                ("Функциональные особенности", [
                    "Всепогодный поиск: тепловизор и HD-камера с зумом обеспечивают дневной и ночной поиск и передачу изображения с места.",
                    "Автономная работа: взлет/посадка одной кнопкой, планирование маршрута и автоматическое патрулирование для гор, завалов, ущелий и других опасных зон.",
                    "Модульное расширение: громкоговоритель, прожектор, сброс аварийных грузов, аптечка и спасательный круг.",
                    "Взаимодействие воздуха и земли: HD-видео и координаты передаются на командную платформу.",
                    "Высокая адаптивность: работа при высоких/низких температурах, ветре, высоте, сложной погоде и пересеченной местности; развертывание за 5 минут."
                ]),
            ],
        },
    },
    "smart-substation-autonomous-inspection-system": {
        "en": {
            "summary": "The smart substation autonomous UAV inspection system combines a drone dock, industrial UAV platform, multi-source payloads, AI analytics software, and an integrated control platform for unattended all-weather inspection.",
            "key_application": "Visible-light inspection, infrared temperature measurement, corridor-risk inspection, AI defect recognition, closed-loop work orders, and multi-station fleet scheduling.",
            "sections": [
                ("Product Introduction", [
                    "The system uses an intelligent dock, industrial UAV, multi-source mission payloads, AI data analysis software, and a comprehensive management platform. It integrates automatic flight control, edge computing, AI defect recognition, and full-link 5G/4G communication.",
                    "It inspects transformers, structures, lightning rods, busbars, insulators, transformers, and station corridors using HD visible-light imaging and infrared temperature measurement, completing the workflow from task issue to autonomous flight, data collection, AI analysis, and work-order closure."
                ]),
                ("Functional Characteristics", [
                    "Fully autonomous unattended operation with automatic storage, autonomous take-off/landing, robotic battery and pod replacement, 90-second rapid startup, and second-mission readiness within 5 minutes.",
                    "Remote one-click scheduling for operators without specialist flight experience.",
                    "All-weather adaptation with IP55 protection, constant-temperature drainage, environmental monitoring, UPS outage protection, and 24/7 standby.",
                    "AI recognition of insulator damage, loose bolts, overheating, abnormal meters, tree obstruction, construction machinery intrusion, and other equipment or corridor risks.",
                    "Flexible inspection strategies including custom routes, inspection frequency, timed patrol, emergency re-flight, and substation-zone or equipment-point inspection plans.",
                    "Closed-loop business data management with cloud return, standardized reports, work-order generation, and PMS synchronization.",
                    "Cluster control for multiple docks and UAVs, with status monitoring, flight-track replay, and equipment ledger management."
                ]),
            ],
        },
        "ru": {
            "summary": "Автономная система инспекции подстанций с БПЛА объединяет док-станцию, промышленный БПЛА, мультисенсорные нагрузки, AI-аналитику и единую платформу управления для всепогодной безлюдной инспекции.",
            "key_application": "Визуальная инспекция, ИК-термометрия, проверка коридоров, AI-распознавание дефектов, замкнутые заявки и диспетчеризация нескольких станций.",
            "sections": [
                ("Описание продукта", [
                    "Система включает интеллектуальную док-станцию, промышленный БПЛА, мультисенсорные нагрузки, AI-анализ данных и комплексную платформу управления. Она объединяет автоматическое управление полетом, edge computing, AI-распознавание дефектов и связь 5G/4G.",
                    "Система инспектирует трансформаторы, конструкции, молниеотводы, шины, изоляторы, измерительные трансформаторы и коридоры подстанции с помощью HD-камеры и ИК-измерения температуры, проходя полный цикл от выдачи задания до автономного полета, сбора данных, AI-анализа и закрытия заявки."
                ]),
                ("Функциональные особенности", [
                    "Полностью автономная работа: автоматическое хранение, взлет/посадка, роботизированная замена батареи и подвеса, запуск за 90 секунд и готовность к повторной миссии за 5 минут.",
                    "Удаленная выдача задания одной кнопкой для персонала без опыта пилотирования.",
                    "Всепогодная работа: IP55, термостатирование и дренаж, мониторинг среды, UPS-защита и режим 24/7.",
                    "AI-распознавание повреждений изоляторов, ослабленных болтов, перегрева, неисправных приборов, деревьев и строительной техники в коридоре.",
                    "Гибкие стратегии: маршруты, периодичность, плановые патрули, аварийный повторный вылет и точечная инспекция оборудования.",
                    "Замкнутый цикл данных: облачная передача, стандартные отчеты, создание заявок и синхронизация с PMS.",
                    "Групповое управление несколькими доками и БПЛА, мониторинг статуса, воспроизведение траектории и учет оборудования."
                ]),
            ],
        },
    },
    "fc-sljc-01-water-conservancy-monitoring-drone": {
        "en": {
            "summary": "The water conservancy monitoring UAV is an intelligent monitoring system for water environments and hydraulic engineering management, composed of a multi-rotor platform, high-precision monitoring payloads, and a portable ground station.",
            "key_application": "Flood-season hydrology, hazard inspection, hydraulic facility inspection, river/lake supervision, water-quality monitoring, discharge tracing, and sand-mining patrol.",
            "sections": [
                ("Product Overview", [
                    "The system uses a stable wireless communication link to monitor water areas, water conservancy facilities, and flood-control emergency scenes in real time.",
                    "According to mission needs, it can carry HD optical cameras, thermal imagers, multispectral sensors, and other professional payloads. It supports hydrological monitoring, risk investigation, facility inspection, water-quality monitoring, pollution-source tracing, and illegal sand-mining patrol."
                ]),
                ("Application Scenarios", [
                    "River and lake monitoring and supervision.",
                    "Soil and water conservation survey.",
                    "Flood and drought disaster prevention.",
                    "Water conservancy engineering inspection.",
                    "Barrier lake emergency monitoring.",
                    "Ice-jam emergency monitoring."
                ]),
            ],
        },
        "ru": {
            "summary": "БПЛА для водохозяйственного мониторинга представляет собой интеллектуальную систему для водной среды и управления гидротехническими объектами, состоящую из мультикоптера, точных нагрузок и переносной наземной станции.",
            "key_application": "Гидрологический мониторинг паводков, обследование рисков, инспекция гидросооружений, надзор рек и озер, контроль качества воды, поиск источников сбросов и патруль добычи песка.",
            "sections": [
                ("Обзор продукта", [
                    "Система использует устойчивый беспроводной канал для мониторинга водных зон, гидротехнических объектов и сценариев паводковой готовности в реальном времени.",
                    "По задаче она несет HD-оптические камеры, тепловизоры, мультиспектральные датчики и другие профессиональные нагрузки. Поддерживаются гидрологический мониторинг, обследование рисков, инспекция объектов, контроль качества воды, поиск источников сбросов и патрулирование незаконной добычи песка."
                ]),
                ("Сценарии применения", [
                    "Мониторинг и надзор рек и озер.",
                    "Обследование водно-почвенного сохранения.",
                    "Предупреждение паводков и засух.",
                    "Инспекция гидротехнических объектов.",
                    "Аварийный мониторинг запрудных озер.",
                    "Аварийный мониторинг ледовых заторов."
                ]),
            ],
        },
    },
    "power-tower-inspection-drone": {
        "en": {
            "summary": "The power tower inspection UAV is a professional aerial inspection platform for transmission lines, towers, fittings, insulators, and corridor environments, combining visible-light imaging, thermal detection, and AI recognition.",
            "key_application": "Routine transmission-line inspection, tower-body defect recognition, thermal anomaly detection, tree-obstruction and external-construction risk inspection, fault localization, and report generation.",
            "sections": [
                ("Product Introduction", [
                    "The system replaces traditional manual walking and tower-climbing inspection, overcoming complex terrain and severe weather limitations. It automatically checks tower-body defects, broken or loose conductor strands, accessory loosening or displacement, equipment heating, tree obstruction, and external construction risks.",
                    "It collects image and temperature data and completes a full workflow from route planning and autonomous aerial imaging to defect filing and report output."
                ]),
                ("Functional Characteristics", [
                    "Replaces manual work and reduces exposure to climbing, electric shock, mountain navigation, and other field risks.",
                    "Full-angle inspection without blind spots: multi-rotor mobility reaches tower arms, insulator tops, conductor undersides, and other positions that are difficult for people to access.",
                    "High efficiency: more than 20 times manual inspection efficiency, supporting wide-area and multi-tower batch cruising.",
                    "Integrated multi-payload detection: visible-light and thermal payloads collect appearance defects and temperature anomalies in one workflow.",
                    "Strong environmental adaptation: IP55 protection, Level-6 wind resistance, and stable operation in mountainous, Gobi, rain/snow, windy, and complex electromagnetic environments.",
                    "Traceable and quantifiable data: photos, videos, point clouds, flight tracks, and defect records are retained for query, review, and traceability.",
                    "Centralized platform control: route management, tower ledger, defect management, result archiving, and multi-dimensional statistics support closed-loop digital inspection management."
                ]),
            ],
        },
        "ru": {
            "summary": "БПЛА для инспекции опор ЛЭП является профессиональной воздушной платформой для линий электропередачи, опор, арматуры, изоляторов и коридоров, объединяя видимую съемку, тепловой контроль и AI-распознавание.",
            "key_application": "Плановая инспекция ЛЭП, распознавание дефектов опор, тепловые аномалии, проверка деревьев и внешних строительных рисков, локализация неисправностей и формирование отчетов.",
            "sections": [
                ("Описание продукта", [
                    "Система заменяет пешую и башенную ручную инспекцию, преодолевая ограничения сложного рельефа и плохой погоды. Она автоматически проверяет дефекты опор, повреждения проводов, ослабление и смещение арматуры, нагрев оборудования, деревья и внешние строительные риски.",
                    "Система собирает изображения и температурные данные и закрывает полный цикл от планирования маршрута и автономной съемки до регистрации дефектов и выпуска отчета."
                ]),
                ("Функциональные особенности", [
                    "Замена ручного труда снижает риски высотных работ, поражения током и передвижения в горах.",
                    "Обзор без слепых зон: маневренность мультикоптера позволяет осматривать траверсы, верх изоляторов, нижнюю сторону проводов и другие труднодоступные точки.",
                    "Высокая эффективность: более чем в 20 раз выше ручной инспекции, поддержка массового облета многих опор.",
                    "Мультисенсорная проверка: видимая и тепловая нагрузка фиксируют внешние дефекты и температурные аномалии.",
                    "Адаптация к среде: IP55, ветер уровня 6, стабильная работа в горах, Гоби, дождь/снег, ветер и сложная электромагнитная среда.",
                    "Прослеживаемые данные: фото, видео, облака точек, траектории и записи дефектов сохраняются для поиска, проверки и анализа.",
                    "Централизованная платформа: маршруты, реестр опор, дефекты, архив результатов и статистика поддерживают цифровое замкнутое управление."
                ]),
            ],
        },
    },
    "medium-long-range-uav-inspection-system": {
        "en": {
            "summary": "The medium/long-range UAV inspection system uses VTOL fixed-wing UAVs with LiDAR, ortho/oblique cameras, and dual-sensor pods to support power-grid surveying, acceptance inspection, corridor modeling, daily inspection, and emergency patrols.",
            "key_application": "Grid terrain survey, completion acceptance, project supervision, transmission-corridor 3D modeling, daily inspection, wildfire response, flood-season patrol, ice/snow emergency inspection, and tree-obstruction analysis.",
            "sections": [
                ("Industry Background", [
                    "Power-grid engineering often spans wide territories and complex terrain, where traditional planning, construction, and routine maintenance methods struggle to meet fast, efficient, and accurate work requirements.",
                    "Long-distance power lines and tower components are exposed to sun, rain, lightning, wind, and sand. Corrosion, wear, component burst, and other defects must be discovered and handled quickly to keep transmission lines stable."
                ]),
                ("Development Trend", [
                    "Power inspection is shifting from manual inspection to UAV-based intelligent inspection. Manual patrol requires personnel to walk or use simple transportation over difficult terrain, resulting in heavy workload, low efficiency, safety risk, incomplete coverage, weak precision, and poor traceability.",
                    "UAV inspection keeps operators away from dangerous areas while using LiDAR, ortho cameras, five-lens cameras, and sensor pods to acquire accurate digital inspection data for hidden-risk recognition, 3D modeling, archiving, and reuse."
                ]),
                ("System Introduction", [
                    "The electric VTOL fixed-wing UAV uses redundant flight-control architecture, dual-antenna differential heading, pure-electric drive, up to 10 kg effective payload, and up to 4 hours endurance for large-area coverage.",
                    "The system supports modular payloads including ortho cameras, five-lens cameras, LiDAR, full-frame mapping payloads, speaker, gas detection, and other mission equipment for power inspection, security monitoring, terrain mapping, and environmental monitoring."
                ]),
                ("Application Cases", [
                    "Southern Grid wildfire inspection: 280 km of mountain transmission lines were inspected over 4 days and 8 sorties, identifying nearly 10 fire-risk points for rapid reporting and handling.",
                    "Anhui flood-season emergency patrol: more than 150 sorties were conducted for dense power corridors with long-distance signal transmission.",
                    "LiDAR tree-obstruction inspection: high-precision 3D point-cloud data supported hidden-risk analysis and result reporting.",
                    "Ice/snow emergency inspection: LiDAR inspection covered 400 km of 500 kV transmission corridors in a -15 C environment and generated 12 rapid condition reports.",
                    "Long-distance inspection in Zhaoqing: 37.9 km of 110 kV line, 112 towers, and 440 m maximum elevation difference were completed in 10 sorties with clean data stitching."
                ]),
            ],
        },
        "ru": {
            "summary": "Система средне- и дальнедистанционной инспекции БПЛА использует VTOL-платформы с LiDAR, орто/наклонными камерами и двухсенсорными подвесами для обследования сетей, приемки, 3D-моделирования коридоров, плановой инспекции и аварийных патрулей.",
            "key_application": "Съемка трасс сетей, приемочная инспекция, надзор проекта, 3D-моделирование коридоров ЛЭП, плановая инспекция, пожароопасный период, паводки, снег/лед и анализ древесных помех.",
            "sections": [
                ("Отраслевой фон", [
                    "Документ описывает электросетевое строительство на больших территориях и сложном рельефе, где традиционные методы планирования, строительства и обслуживания не обеспечивают нужную скорость, эффективность и точность.",
                    "Дальние линии и элементы опор долго находятся под солнцем, дождем, молниями, ветром и песком. Коррозия, износ и повреждения должны выявляться и устраняться быстро для стабильной работы линий."
                ]),
                ("Тенденция развития", [
                    "Инспекция энергетики переходит от ручных обходов к интеллектуальной инспекции с БПЛА. Ручной обход требует передвижения по сложной местности, создает нагрузку, низкую эффективность, риски безопасности, неполное покрытие, ограниченную точность и слабую прослеживаемость.",
                    "Инспекция БПЛА не требует входа персонала в опасные зоны и использует LiDAR, орто-камеры, пятиобъективные камеры и подвесы для точных цифровых данных, распознавания рисков, 3D-моделирования, архивации и повторного использования."
                ]),
                ("Описание системы", [
                    "Электрический VTOL БПЛА имеет резервированное управление, двухантенную дифференциальную ориентацию, электрический привод, полезную нагрузку до 10 кг и автономность до 4 часов для покрытия больших участков.",
                    "Система поддерживает модульные нагрузки: орто-камеры, пятиобъективные камеры, LiDAR, полнокадровую съемку, громкоговоритель, газоанализ и другое оборудование для инспекции энергетики, охранного мониторинга, картографии и экологии."
                ]),
                ("Примеры применения", [
                    "Пожарная инспекция Southern Grid: 280 км горных ЛЭП за 4 дня и 8 вылетов, почти 10 очагов риска выявлены и оперативно переданы.",
                    "Паводковый патруль в Аньхое: более 150 вылетов по плотным энергетическим коридорам с дальним каналом связи.",
                    "LiDAR-анализ деревьев: высокоточные облака точек для анализа рисков и отчетности.",
                    "Снег/лед: 400 км коридоров 500 кВ при -15 C и 12 быстрых отчетов о состоянии.",
                    "Дальний осмотр в Чжаоцине: 37,9 км линии 110 кВ, 112 опор и перепад 440 м выполнены за 10 вылетов с корректной сшивкой данных."
                ]),
            ],
        },
    },
    "fc-yjtx-01-emergency-communication-drone": {
        "en": {
            "summary": "The emergency communication tethered UAV lifts lightweight communication equipment to form an airborne base station, using continuous ground power for long-duration coverage in disaster areas where networks are interrupted.",
            "key_application": "Emergency communication restoration after earthquakes, floods, freezing rain/snow, typhoons, remote mountain incidents, mines, deserts, and other areas with damaged or unavailable networks.",
            "sections": [
                ("Functional Overview", [
                    "Extreme natural disasters can paralyze regional communication networks, blocking information between the disaster area and the outside world. Rapid reconstruction of emergency communication is therefore a key rescue task.",
                    "The tethered UAV airborne base station can quickly lift lightweight communication equipment, remain aloft through continuous ground power, avoid ground-environment obstruction, and provide wide-area, fast-deploying communication coverage."
                ]),
                ("System Composition", [
                    "The system includes the FC-YJTX-01 UAV, FC-XL20 flight platform, FC-XLGD tethered system, FC-4GKD broadband base station, FC-JZT satellite terminal, FC-ZZW mesh radio, FC-YKQ smart remote controller, FC-FDJ generator, transport flight case, and optional dual-sensor gimbal camera and loudspeaker."
                ]),
                ("Configuration Lists", [
                    "Configuration 1: emergency communication support, including flight platform, tethered system, 4G broadband base station, satellite terminal, mesh radio, smart remote controller, generator, and transport case.",
                    "Configuration 2: reconnaissance command and rescue, including flight platform, tethered system, dual-sensor gimbal camera, loudspeaker, mesh radio, smart remote controller, generator, and transport case.",
                    "Personnel configuration covers a site commander, UAV operators, communication-system operator, equipment support, and data recorder."
                ]),
            ],
        },
        "ru": {
            "summary": "Привязной БПЛА аварийной связи поднимает легкое коммуникационное оборудование как воздушную базовую станцию и использует наземное питание для длительного покрытия в районах с нарушенной связью.",
            "key_application": "Восстановление связи после землетрясений, паводков, ледяного дождя/снега, тайфунов, в горах, шахтах, пустынях и других районах с поврежденной или отсутствующей сетью.",
            "sections": [
                ("Функциональный обзор", [
                    "Сильные природные бедствия могут вывести из строя региональные сети связи и нарушить обмен информацией между зоной ЧС и внешним миром. Быстрое восстановление аварийной связи является ключевой задачей спасательных работ.",
                    "Воздушная базовая станция на привязном БПЛА быстро поднимает легкое оборудование связи, длительно остается в воздухе за счет наземного питания, не зависит от наземных препятствий и обеспечивает широкую зону покрытия."
                ]),
                ("Состав системы", [
                    "Документ перечисляет БПЛА FC-YJTX-01, платформу FC-XL20, привязную систему FC-XLGD, базовую станцию 4G FC-4GKD, спутниковый терминал FC-JZT, mesh-радио FC-ZZW, интеллектуальный пульт FC-YKQ, генератор FC-FDJ, транспортный кейс, а также опциональные двухсенсорную камеру и громкоговоритель."
                ]),
                ("Комплектация", [
                    "Комплектация 1: аварийная связь, включая платформу, привязную систему, 4G-станцию, спутниковый терминал, mesh-радио, пульт, генератор и кейс.",
                    "Комплектация 2: разведка, командование и спасение, включая платформу, привязную систему, двухсенсорную камеру, громкоговоритель, mesh-радио, пульт, генератор и кейс.",
                    "Расчет персонала включает руководителя площадки, операторов БПЛА, оператора связи, инженера оборудования и регистратора данных."
                ]),
            ],
        },
    },
    "fc-yjzm-01-emergency-lighting-drone": {
        "en": {
            "summary": "The tethered lighting UAV uses ground power to maintain long-duration airborne lighting, forming an elevated light tower at 50-100 m for night rescue, emergency repair, geological-disaster response, and temporary site support.",
            "key_application": "Night rescue, emergency repair lighting, geological-disaster response, area search lighting, temporary site support, and fixed-point reconnaissance with lighting.",
            "sections": [
                ("Functional Overview", [
                    "Traditional night emergency lighting has clear limitations: mobile lighting vehicles lack elevation, complex sites produce blind spots, and ordinary UAVs have short endurance. The tethered lighting UAV overcomes these limits with long-duration aerial lighting.",
                    "The system can form an elevated light tower at 50-100 m, delivering wide-area lighting without low-position blind spots."
                ]),
                ("System Composition", [
                    "The document lists the FC-XLZM-01 product, FC-XL5 UAV platform, FC-XLGD tethered system, FC-YKQ smart remote controller, FC-LED lighting module, FC-12S tethered battery, transport flight case, FC-FDJ generator, and optional dual-sensor gimbal camera and loudspeaker."
                ]),
                ("Configuration Lists", [
                    "Configuration 1: tethered lighting system, including UAV platform, tethered system, smart remote controller, lighting module, spare tethered battery, transport case, and generator.",
                    "Configuration 2: tethered lighting and fixed-point reconnaissance system, adding the dual-sensor gimbal camera and loudspeaker.",
                    "Personnel configuration includes the site lead, UAV operators, equipment support, maintenance, reconnaissance recording, and power/equipment support roles according to system type."
                ]),
            ],
        },
        "ru": {
            "summary": "Привязной осветительный БПЛА использует наземное питание для длительного освещения с высоты 50-100 м, создавая воздушную световую башню для ночных спасательных работ, аварийного ремонта и временной поддержки площадок.",
            "key_application": "Ночное спасение, аварийное освещение, реагирование на геологические ЧС, поисковое освещение, временная поддержка площадки и точечная разведка с освещением.",
            "sections": [
                ("Функциональный обзор", [
                    "Обычное ночное освещение имеет ограничения: мобильные осветительные машины недостаточно высоки, сложные площадки дают слепые зоны, а обычные БПЛА имеют короткую автономность. Привязной осветительный БПЛА решает это за счет длительного воздушного освещения.",
                    "Система формирует световую башню на высоте 50-100 м и обеспечивает широкозонное освещение без низких слепых зон."
                ]),
                ("Состав системы", [
                    "Документ перечисляет продукт FC-XLZM-01, платформу FC-XL5, привязную систему FC-XLGD, интеллектуальный пульт FC-YKQ, световой модуль FC-LED, батарею FC-12S, транспортный кейс, генератор FC-FDJ, а также опциональные двухсенсорную камеру и громкоговоритель."
                ]),
                ("Комплектация", [
                    "Комплектация 1: привязная система освещения, включая платформу, привязную систему, пульт, световой модуль, резервную батарею, кейс и генератор.",
                    "Комплектация 2: освещение и точечная разведка, с добавлением двухсенсорной камеры и громкоговорителя.",
                    "Расчет персонала включает руководителя, операторов БПЛА, поддержку оборудования, обслуживание, запись разведданных и обеспечение питания/оборудования в зависимости от системы."
                ]),
            ],
        },
    },
    "fc-yjxf-01-aerial-firefighting-drone": {
        "en": {
            "summary": "The high-rise firefighting tethered UAV is designed for ultra-high-rise buildings, dense urban blocks, chemical parks, and complex fire scenes, supporting long-duration elevated operation, remote spraying, cooling, smoke-ventilation support, and rescue-access preparation.",
            "key_application": "High-rise fires, dense building clusters, chemical-park cooling and isolation, smoke-ventilation support, elevated emergency response, reconnaissance search-and-rescue, and high-rise firefighting operations.",
            "sections": [
                ("Functional Overview", [
                    "The tethered firefighting UAV can break height limits in ultra-high-rise fire response, spray precisely at elevated ignition points, locate hidden fire sources in dense building clusters, and support cooling and isolation in chemical-park scenes.",
                    "The UAV can carry a window-breaking module for curtain-wall glass, use stabilized wind-resistant flight for high-position response, and support reconnaissance, warning, fire-situation monitoring, and rescue-path planning."
                ]),
                ("System Composition", [
                    "The document lists the FC-YJXF-01 firefighting UAV, FC-XL70 flight platform, smart remote controller, dual-sensor gimbal camera, loudspeaker, window-breaking fire-extinguisher launcher, firefighting water lance, fire hose, tethered power supply, generator, compressed-air foam firefighting system, and vehicle-mounted command system."
                ]),
                ("Configuration Lists", [
                    "Configuration 1: window-breaking search-and-rescue system with flight platform, remote controller, dual-sensor camera, loudspeaker, window-breaking launcher, and vehicle command system.",
                    "Configuration 2: high-rise firefighting system with flight platform, remote controller, dual-sensor camera, water lance, fire hose, tethered power, generator, compressed-air foam system, and vehicle command system.",
                    "Personnel configuration covers site command, UAV operators, reconnaissance/fire monitoring, firefighting equipment operation, power support, equipment support, and command-platform operation."
                ]),
            ],
        },
        "ru": {
            "summary": "Привязной БПЛА для высотного пожаротушения предназначен для сверхвысотных зданий, плотной городской застройки, химических парков и сложных пожаров, поддерживая длительную работу на высоте, распыление, охлаждение, дымоудаление и подготовку доступа.",
            "key_application": "Пожары высотных зданий, плотная застройка, охлаждение и изоляция химических парков, поддержка дымоудаления, высотное реагирование, разведка/поиск и высотное пожаротушение.",
            "sections": [
                ("Функциональный обзор", [
                    "Привязной пожарный БПЛА преодолевает ограничения высоты, точно подает средство к очагу на высоте, помогает выявлять скрытые очаги в плотной застройке и поддерживает охлаждение/изоляцию на химических площадках.",
                    "БПЛА может нести модуль пробивания стекла для фасадов, использовать устойчивый полет при ветре и поддерживать разведку, предупреждение, мониторинг пожара и планирование доступа спасателей."
                ]),
                ("Состав системы", [
                    "Документ перечисляет FC-YJXF-01, платформу FC-XL70, интеллектуальный пульт, двухсенсорную камеру, громкоговоритель, устройство пробивания окна, пожарный ствол, рукав, привязное питание, генератор, систему CAFS и бортовую командную систему."
                ]),
                ("Комплектация", [
                    "Комплектация 1: система пробивания окна и разведки/спасения с платформой, пультом, двухсенсорной камерой, громкоговорителем, пусковым устройством и командной системой автомобиля.",
                    "Комплектация 2: система высотного пожаротушения с платформой, пультом, камерой, пожарным стволом, рукавом, привязным питанием, генератором, CAFS и командной системой.",
                    "Расчет персонала включает командование, операторов БПЛА, мониторинг/разведку, операторов пожарного оборудования, питание, техническое обеспечение и оператора командной платформы."
                ]),
            ],
        },
    },
}

SIMPLE_PLATFORM_SUMMARY_EN = {
    "multi-rotor-8kg-payload-uav": "The FC-X6 8kg Payload Multi-Rotor UAV is an industrial platform for inspection, emergency reconnaissance, mapping, environmental monitoring, and payload delivery tasks.",
    "multi-rotor-20kg-payload-uav": "The FC-Z20 20kg Payload Multi-Rotor UAV is an industrial heavy-payload platform for inspection, mapping, emergency response, environmental monitoring, and delivery missions.",
    "multi-rotor-50kg-payload-uav": "The FC-Z50 50kg Payload Multi-Rotor UAV is a heavy-lift industrial platform for demanding payload transport, inspection, emergency response, and mapping missions.",
    "vtol-14kg-mtow-uav": "The FC-CQ14 14kg MTOW VTOL Fixed-Wing UAV combines vertical takeoff convenience with fixed-wing cruise efficiency for corridor patrol and mapping missions.",
    "vtol-26kg-mtow-uav": "The FC-CQ26 26kg MTOW VTOL Fixed-Wing UAV supports medium-payload corridor patrol, mapping, disaster survey, and wide-area monitoring tasks.",
    "vtol-40kg-mtow-uav": "The FC-CQ40 40kg MTOW VTOL Fixed-Wing UAV is built for longer-endurance inspection, mapping, disaster survey, and wide-area monitoring missions.",
    "vtol-64kg-mtow-uav": "The FC-CQ64 64kg MTOW VTOL Fixed-Wing UAV supports extended corridor inspection, mapping, disaster survey, and wide-area monitoring with higher payload capacity.",
    "vtol-135kg-mtow-uav": "The FC-CQ135 135kg MTOW VTOL Fixed-Wing UAV is a large VTOL platform for heavy-payload patrol, mapping, disaster survey, and wide-area monitoring.",
}

SIMPLE_PLATFORM_SUMMARY_RU = {
    "multi-rotor-8kg-payload-uav": "В исходном документе указан мультикоптер FC-X6 и приведена таблица параметров конфигурации с полезной нагрузкой 8 кг.",
    "multi-rotor-20kg-payload-uav": "В исходном документе указан мультикоптер FC-Z20 и приведена таблица параметров конфигурации с полезной нагрузкой 20 кг.",
    "multi-rotor-50kg-payload-uav": "В исходном документе указан мультикоптер FC-Z50 и приведена таблица параметров конфигурации с полезной нагрузкой 50 кг.",
    "vtol-14kg-mtow-uav": "В исходном документе указан конвертоплан FC-CQ14 и приведена таблица параметров конфигурации с взлетной массой 14 кг.",
    "vtol-26kg-mtow-uav": "В исходном документе указан конвертоплан FC-CQ26 и приведена таблица параметров конфигурации с взлетной массой 26 кг.",
    "vtol-40kg-mtow-uav": "В исходном документе указан конвертоплан FC-CQ40 и приведена таблица параметров конфигурации с взлетной массой 40 кг.",
    "vtol-64kg-mtow-uav": "В исходном документе указан конвертоплан FC-CQ64 и приведена таблица параметров конфигурации с взлетной массой 64 кг.",
    "vtol-135kg-mtow-uav": "В исходном документе указан конвертоплан FC-CQ135 и приведена таблица параметров конфигурации с взлетной массой 135 кг.",
}

DETAIL_TABLE_TITLES = {
    "fc-yjtx-01-emergency-communication-drone": {
        "en": [
            "Configuration 1: Emergency Communication Support",
            "Configuration 2: Reconnaissance Command and Rescue",
            "Spare Parts List",
            "Personnel Configuration: Emergency Communication Support",
            "Personnel Configuration: Reconnaissance Command and Rescue",
        ],
        "ru": [
            "Комплектация 1: аварийная связь",
            "Комплектация 2: разведка, командование и спасение",
            "Запасные части",
            "Расчет персонала: аварийная связь",
            "Расчет персонала: разведка, командование и спасение",
        ],
    },
    "fc-yjzm-01-emergency-lighting-drone": {
        "en": [
            "Configuration 1: Tethered Lighting System",
            "Configuration 2: Tethered Lighting and Fixed-Point Reconnaissance",
            "Spare Parts List",
            "Personnel Configuration: Tethered Lighting System",
            "Personnel Configuration: Tethered Lighting and Reconnaissance",
        ],
        "ru": [
            "Комплектация 1: привязное освещение",
            "Комплектация 2: освещение и точечная разведка",
            "Запасные части",
            "Расчет персонала: привязное освещение",
            "Расчет персонала: освещение и разведка",
        ],
    },
    "fc-yjxf-01-aerial-firefighting-drone": {
        "en": [
            "Configuration 1: Window-Breaking Search and Rescue",
            "Configuration 2: High-Rise Firefighting",
            "Spare Parts List",
            "Personnel Configuration: Reconnaissance and Rescue",
            "Personnel Configuration: High-Rise Firefighting",
        ],
        "ru": [
            "Комплектация 1: пробивание окна и спасение",
            "Комплектация 2: высотное пожаротушение",
            "Запасные части",
            "Расчет персонала: разведка и спасение",
            "Расчет персонала: высотное пожаротушение",
        ],
    },
}


def esc(value: Any) -> str:
    return html.escape(str(value), quote=True)


def replace_value(value: str, locale: str) -> str:
    replacements = VALUE_REPLACEMENTS_RU if locale == "ru" else VALUE_REPLACEMENTS_EN
    out = value
    for source, target in replacements:
        out = out.replace(source, target)
    if locale == "ru":
        out = re.sub(r"(\d+)\s*级风", r"ветер уровня \1", out)
        out = re.sub(r"(\d+)\s*级", r"уровень \1", out)
        out = re.sub(r"(\d+)\s*分钟", r"\1 мин", out)
        out = re.sub(r"(\d+)\s*小时", r"\1 ч", out)
        out = re.sub(r"(\d+)\s*秒", r"\1 с", out)
        out = re.sub(r"(\d+)\s*人", r"\1 чел.", out)
        out = re.sub(r"([0-9]+(?:\s*[~～-]\s*[0-9]+)?)\s*米", r"\1 м", out)
        out = out.replace("自主供电", "бортовое питание ")
        out = out.replace("地面供电", "наземное питание ")
    else:
        out = re.sub(r"(\d+)\s*级风", r"Level-\1 wind", out)
        out = re.sub(r"(\d+)\s*级", r"Level \1", out)
        out = re.sub(r"(\d+)\s*分钟", r"\1 min", out)
        out = re.sub(r"(\d+)\s*小时", r"\1 h", out)
        out = re.sub(r"(\d+)\s*秒", r"\1 s", out)
        out = re.sub(r"(\d+)\s*人", r"\1 people", out)
        out = re.sub(r"([0-9]+(?:\s*[~～-]\s*[0-9]+)?)\s*米", r"\1 m", out)
        out = out.replace("自主供电", "onboard power ")
        out = out.replace("地面供电", "ground power ")
    return out


STRICT_DOCX_HANDLES = {
    "emergency-search-rescue-drone",
    "fc-yjtx-01-emergency-communication-drone",
    "smart-substation-autonomous-inspection-system",
    "fc-sljc-01-water-conservancy-monitoring-drone",
    "power-tower-inspection-drone",
    "fc-yjzm-01-emergency-lighting-drone",
    "fc-yjxf-01-aerial-firefighting-drone",
}


EXTRA_LABEL_EN = {
    "型号": "Model",
    "电机": "Motor",
    "桨叶": "Propeller Blades",
    "升空高度": "Operating Altitude",
    "载荷能力": "Payload Capacity",
    "抗风等级": "Wind Resistance",
    "抗风能力": "Wind Resistance",
    "续航能力": "Endurance",
    "续航时长": "Endurance",
    "飞行速度": "Flight Speed",
    "最大上升速度": "Max Climb Speed",
    "最大下降速度": "Max Descent Speed",
    "水平悬停精度": "Horizontal Hovering Accuracy",
    "垂直悬停精度": "Vertical Hovering Accuracy",
    "双冗余定位": "Dual-Redundant Positioning",
    "悬停精度": "Hovering Accuracy",
    "最大作业半径": "Max Operating Radius",
    "最大相对飞行高度": "Max Relative Flight Height",
    "防雨性能": "Rain Resistance",
    "输入电压": "Input Voltage",
    "输出电压": "Output Voltage",
    "自动收放线": "Automatic Cable Reeling",
    "系留线缆材质": "Tether Cable Material",
    "系留线缆长度": "Tether Cable Length",
    "安全设计": "Safety Design",
    "面板显示": "Panel Display",
    "屏幕": "Screen",
    "遥控通道": "Remote-Control Channels",
    "集成功能": "Integrated Functions",
    "数据交互功能": "Data Interaction",
    "视频输出": "Video Output",
    "功能特征": "Functional Features",
    "控制功能": "Control Functions",
    "支持带宽": "Supported Bandwidth",
    "单小区下行速率": "Single-Cell Downlink Rate",
    "单小区上行速率": "Single-Cell Uplink Rate",
    "散热": "Heat Dissipation",
    "防尘防水": "Dust and Water Protection",
    "抗震等级": "Seismic Rating",
    "软件功能": "Software Functions",
    "天线口径": "Antenna Aperture",
    "馈源方式": "Feed Method",
    "工作频段": "Operating Band",
    "调节范围": "Adjustment Range",
    "调节速度": "Adjustment Speed",
    "供电": "Power Supply",
    "整机重量": "Total Weight",
    "工作环境": "Operating Environment",
    "接口": "Interface",
    "工作频率": "Operating Frequency",
    "载波带宽": "Carrier Bandwidth",
    "传输体制": "Transmission System",
    "调制方式": "Modulation",
    "传输能力": "Transmission Capacity",
    "发射功率": "Transmit Power",
    "传输距离": "Transmission Distance",
    "视频输入": "Video Input",
    "接收灵敏度": "Receiver Sensitivity",
    "加密方式": "Encryption",
    "设备功耗": "Device Power Consumption",
    "供电方式": "Power-Supply Mode",
    "工作方式": "Operating Method",
    "功率": "Power",
    "输入电源": "Input Power",
    "光通量": "Luminous Flux",
    "照亮范围": "Illuminated Area",
    "使用方式": "Usage Method",
    "电流": "Current",
    "自动温度保护起点": "Automatic Temperature Protection Point",
    "类型": "Type",
    "放电倍率": "Discharge Rate",
    "容量": "Capacity",
    "放置功能": "Storage Function",
    "额定电压(V)": "Rated Voltage (V)",
    "额定功率（KW）": "Rated Power (kW)",
    "最大功率（KW）": "Max Power (kW)",
    "冷却方式": "Cooling Method",
    "燃油": "Fuel",
    "油箱容量": "Fuel-Tank Capacity",
    "启动方式": "Starting Method",
    "名称": "Name",
    "角度工作范围": "Angle Working Range",
    "云台控制模式": "Gimbal Control Mode",
    "控制信号方式": "Control-Signal Method",
    "AC输入电压": "AC Input Voltage",
    "有效传声距离": "Effective Sound Transmission Distance",
    "输入电压": "Input Voltage",
    "接收距离": "Receiving Distance",
    "有效载荷": "Effective Payload",
    "升降速度": "Climb / Descent Speed",
    "姿态角度": "Attitude Angle",
    "转动角速度": "Angular Velocity",
    "载车储液": "Vehicle Liquid Storage",
    "地面站": "Ground Station",
    "消防车主要参数": "Main Fire Truck Parameters",
    "整车尺寸": "Vehicle Dimensions",
    "驱动形式": "Drive Type",
    "最高车速": "Max Vehicle Speed",
    "乘员人数": "Crew",
    "罐体容积": "Tank Volume",
    "最大总质量": "Max Gross Weight",
    "动力配置": "Powertrain",
    "破窗能力": "Window-Breaking Capability",
    "最大射程": "Max Range",
    "电启动参数": "Electric Start Parameter",
    "发射数量": "Launch Quantity",
    "水带长度": "Hose Length",
    "喷枪长度": "Lance Length",
    "喷射距离": "Spray Distance",
    "水带直径": "Hose Diameter",
    "灭火剂种类消防泡沫/消防水剂": "Fire-Extinguishing Agent: Firefighting Foam / Water Agent",
    "安装方式": "Installation Method",
    "水管长度": "Water Hose Length",
}


EXTRA_LABEL_RU = {
    "型号": "Модель",
    "电机": "Двигатель",
    "桨叶": "Лопасти",
    "升空高度": "Рабочая высота",
    "载荷能力": "Грузоподъемность",
    "抗风等级": "Ветроустойчивость",
    "抗风能力": "Ветроустойчивость",
    "续航能力": "Время работы",
    "续航时长": "Время работы",
    "飞行速度": "Скорость полета",
    "最大上升速度": "Макс. скорость набора высоты",
    "最大下降速度": "Макс. скорость снижения",
    "水平悬停精度": "Точность висения по горизонтали",
    "垂直悬停精度": "Точность висения по вертикали",
    "双冗余定位": "Двойное резервированное позиционирование",
    "悬停精度": "Точность висения",
    "最大作业半径": "Макс. рабочий радиус",
    "最大相对飞行高度": "Макс. относительная высота",
    "防雨性能": "Защита от дождя",
    "输入电压": "Входное напряжение",
    "输出电压": "Выходное напряжение",
    "自动收放线": "Автоматическая смотка кабеля",
    "系留线缆材质": "Материал привязного кабеля",
    "系留线缆长度": "Длина привязного кабеля",
    "安全设计": "Безопасная конструкция",
    "面板显示": "Индикация панели",
    "屏幕": "Экран",
    "遥控通道": "Каналы управления",
    "集成功能": "Интегрированные функции",
    "数据交互功能": "Обмен данными",
    "视频输出": "Видеовыход",
    "功能特征": "Функциональные особенности",
    "控制功能": "Функции управления",
    "支持带宽": "Поддерживаемая полоса",
    "单小区下行速率": "Скорость downlink одной соты",
    "单小区上行速率": "Скорость uplink одной соты",
    "散热": "Охлаждение",
    "防尘防水": "Пыле- и влагозащита",
    "抗震等级": "Сейсмостойкость",
    "软件功能": "Функции ПО",
    "天线口径": "Диаметр антенны",
    "馈源方式": "Способ питания антенны",
    "工作频段": "Рабочий диапазон",
    "调节范围": "Диапазон регулировки",
    "调节速度": "Скорость регулировки",
    "供电": "Питание",
    "整机重量": "Масса изделия",
    "工作环境": "Рабочая среда",
    "接口": "Интерфейс",
    "工作频率": "Рабочая частота",
    "载波带宽": "Полоса несущей",
    "传输体制": "Система передачи",
    "调制方式": "Модуляция",
    "传输能力": "Пропускная способность",
    "发射功率": "Мощность передачи",
    "传输距离": "Дальность передачи",
    "视频输入": "Видеовход",
    "接收灵敏度": "Чувствительность приема",
    "加密方式": "Шифрование",
    "设备功耗": "Потребление устройства",
    "供电方式": "Способ питания",
    "工作方式": "Режим работы",
    "功率": "Мощность",
    "输入电源": "Входное питание",
    "光通量": "Световой поток",
    "照亮范围": "Зона освещения",
    "使用方式": "Способ применения",
    "电流": "Ток",
    "自动温度保护起点": "Порог температурной защиты",
    "类型": "Тип",
    "放电倍率": "Ток разряда",
    "容量": "Емкость",
    "放置功能": "Функция хранения",
    "额定电压(V)": "Номинальное напряжение (В)",
    "额定功率（KW）": "Номинальная мощность (кВт)",
    "最大功率（KW）": "Макс. мощность (кВт)",
    "冷却方式": "Охлаждение",
    "燃油": "Топливо",
    "油箱容量": "Емкость бака",
    "启动方式": "Запуск",
    "名称": "Название",
    "角度工作范围": "Рабочий диапазон углов",
    "云台控制模式": "Режим управления подвесом",
    "控制信号方式": "Способ управляющего сигнала",
    "AC输入电压": "Входное напряжение AC",
    "有效传声距离": "Эффективная дальность передачи звука",
    "接收距离": "Дальность приема",
    "有效载荷": "Полезная нагрузка",
    "升降速度": "Скорость набора / снижения",
    "姿态角度": "Угол ориентации",
    "转动角速度": "Угловая скорость",
    "载车储液": "Запас жидкости на автомобиле",
    "地面站": "Наземная станция",
    "消防车主要参数": "Основные параметры пожарного автомобиля",
    "整车尺寸": "Габариты автомобиля",
    "驱动形式": "Тип привода",
    "最高车速": "Макс. скорость автомобиля",
    "乘员人数": "Экипаж",
    "罐体容积": "Объем резервуаров",
    "最大总质量": "Макс. полная масса",
    "动力配置": "Силовая установка",
    "破窗能力": "Способность пробивать окна",
    "最大射程": "Макс. дальность",
    "电启动参数": "Параметр электрического запуска",
    "发射数量": "Количество пусков",
    "水带长度": "Длина рукава",
    "喷枪长度": "Длина ствола",
    "喷射距离": "Дальность распыления",
    "水带直径": "Диаметр рукава",
    "灭火剂种类消防泡沫/消防水剂": "Огнетушащее вещество: пена / водный раствор",
    "安装方式": "Способ монтажа",
    "水管长度": "Длина водяного рукава",
}


DOCX_EXACT_EN = {
    "替代人工": "Manual Work Replacement",
    "全视角无盲区巡检": "Full-Angle Inspection Without Blind Spots",
    "超高作业效率": "Very High Operating Efficiency",
    "多载荷一体化检测": "Integrated Multi-Payload Detection",
    "复杂环境强适应性": "Strong Adaptability to Complex Environments",
    "数据可追溯可量化": "Traceable and Quantifiable Data",
    "平台集约化管控": "Centralized Platform Management",
    "全自主无人作业": "Fully Autonomous Unattended Operation",
    "零门槛远程调度": "Low-Barrier Remote Dispatch",
    "全天候全域适配": "All-Weather, Full-Area Adaptation",
    "AI 智能缺陷识别": "AI-Based Defect Recognition",
    "灵活巡检策略": "Flexible Inspection Strategy",
    "业务数据闭环管理": "Closed-Loop Business Data Management",
    "多设备集群管控": "Multi-Device Fleet Management",
    "电塔巡检无人机以工业无人机平台 + 多源任务载荷融合可见光成像、热红外检测与 AI 智能识别技术，专为输电线路、铁塔、金具、绝缘子及通道环境打造专业化空中巡检平台。": "The power tower inspection UAV combines an industrial UAV platform with multi-source mission payloads, visible-light imaging, thermal infrared detection, and AI recognition to provide a professional aerial inspection platform for transmission lines, towers, fittings, insulators, and corridor environments.",
    "系统替代传统人工徒步、登塔巡检，突破复杂地形、恶劣天气限制，实现杆塔本体缺陷、线路散股断股、附件松动移位、设备发热、树障及外力施工隐患自动排查，采集影像、温度多源数据，完成从航线规划、自主航拍、缺陷归档、报告输出的全流程运维，适用于输电线路常态化巡检、故障排查与精益化运维管理。": "The system replaces traditional walking and tower-climbing inspection, overcoming complex terrain and adverse weather. It automatically checks tower-body defects, broken or loose conductor strands, accessory loosening or displacement, equipment heating, tree obstruction, and external-construction risks. It collects image and temperature data and completes the full workflow from route planning and autonomous aerial imaging to defect filing and report output for routine transmission-line inspection, fault troubleshooting, and refined operation management.",
    "系统具备航线规划、全自动航拍、多传感器数据采集、缺陷智能识别、点云测绘、杆塔台账管理、巡检成果归档、数据分析研判、标准化报告生成等完整业务能力。 产品在场景应用中具有以下主要特性：": "The system provides route planning, fully automatic aerial imaging, multi-sensor data acquisition, intelligent defect recognition, point-cloud mapping, tower ledger management, inspection-result archiving, data analysis, and standardized report generation. In actual scenarios, the product has the following main characteristics:",
    "无需人员进山踏勘、攀爬铁塔，远离高空坠落、触电、山地迷路等安全风险，从源头降低作业安全隐患。": "Personnel do not need to enter mountains for field survey or climb towers, avoiding fall, electric-shock, and mountain-navigation risks and reducing operational hazards at the source.",
    "多旋翼无人机机动灵活，实现 3D 全方位立体巡检，可抵达人工无法靠近的塔臂、绝缘子顶部、导线下方等死角位置，全覆盖无遗漏。": "The multi-rotor UAV is highly maneuverable and supports 3D all-around inspection. It can reach blind spots such as tower arms, insulator tops, and conductor undersides that personnel cannot safely access, enabling complete coverage.",
    "巡检效率为传统人工20 倍以上，支持大范围、多杆塔批量巡航，大幅缩短巡检周期，适合线路规模化常态化运维。": "Inspection efficiency is more than 20 times that of manual work. The system supports large-area, multi-tower batch cruising, greatly shortens inspection cycles, and suits large-scale routine line operation and maintenance.",
    "集成可见光、热红外载荷，同步完成外观缺陷、温度异常多维度检测。": "Visible-light and thermal infrared payloads are integrated to detect appearance defects and temperature anomalies in one workflow.",
    "无人机 IP55 防护、6 级抗风，可在山区、戈壁、雨雪、大风及电网复杂电磁环境下稳定作业。": "With IP55 protection and Level-6 wind resistance, the UAV can operate stably in mountains, Gobi terrain, rain, snow, strong wind, and complex power-grid electromagnetic environments.",
    "巡检照片、视频、点云、飞行轨迹、缺陷记录全程留存，客观标准化存档，支持查询、复核、追溯，为状态检修提供数据支撑。": "Inspection photos, videos, point clouds, flight tracks, and defect records are retained throughout the process for standardized archiving, query, review, and traceability, supporting condition-based maintenance.",
    "服务管理平台支持航线管理、杆塔台账、缺陷管理、成果归档、多维度统计分析，实现巡检业务数字化、规范化闭环管理。": "The service management platform supports route management, tower ledgers, defect management, result archiving, and multidimensional statistics to realize digital and standardized closed-loop inspection management.",
    "应急搜救无人机集成高清可见光成像、红外热成像、智能目标识别、高清实时图传、精准物资投送等核心功能，可搭载多类型任务载荷，适配洪涝内涝、地震坍塌、野外失联、水域遇险等各类复杂应急救援场景。高效完成全域大范围空中巡查、被困人员探测、救援目标快速定位、现场实况图像回传及应急物资定点投送等作业，全面提升应急搜救处置效率，显著提高遇险人员救援成功率。": "The emergency search-and-rescue UAV integrates HD visible-light imaging, infrared thermal imaging, intelligent target recognition, HD real-time video transmission, and precise delivery of supplies. It can carry multiple mission payloads for floods, urban waterlogging, earthquake collapse, missing-person searches, and water rescue. It efficiently performs wide-area aerial patrol, trapped-person detection, rapid target positioning, live image return, and fixed-point emergency-material delivery, improving rescue efficiency and success rates.",
    "系统具备全域巡查、生命探测、图像传输、物资投送、自主飞行等全流程应急搜救核心能力，产品实际应用中具备以下核心特性：": "The system provides full-area patrol, life detection, image transmission, material delivery, autonomous flight, and the full set of core emergency search-and-rescue capabilities. In actual use, it has the following core characteristics:",
    "全天候全域搜救 搭载红外热成像与高清变焦可见光，不受黑夜、密林遮挡影响，可昼夜不间断开展搜救作业，回传现场环境图像。": "All-weather, full-area search and rescue: infrared thermal imaging and HD zoom visible-light imaging support day/night search despite darkness and dense forest cover, while returning on-site environmental imagery.",
    "智能自主作业支持一键起降、航线规划、自动巡航，适配山地、废墟、峡谷等高危未知搜救区域。": "Intelligent autonomous operation supports one-key takeoff/landing, route planning, and automatic cruising for mountains, ruins, canyons, and other high-risk unknown search areas.",
    "多任务模块化拓展可搭载空中喊话器、强光探照灯、应急物资抛投器等负载，实现喊话安抚、夜间照明、急救包 / 救生圈精准投送等多功能拓展。": "Modular mission expansion supports aerial loudspeakers, high-intensity searchlights, emergency supply droppers, and other payloads for voice guidance, night lighting, and accurate delivery of first-aid kits or lifebuoys.",
    "空地协同联动 实时回传高清现场视频与定位数据，同步共享至指挥平台，实现空中侦察、地面处置一体化协同救援。": "Air-ground coordination returns HD site video and positioning data in real time and shares them with the command platform, integrating aerial reconnaissance with ground response.",
    "适应性强可靠性高具备优异的高低温耐受、强风抗扰能力，可在高海拔、复杂气象、崎岖地形环境稳定飞行，支持长时间连续值守搜救，部署便捷、5 分钟即可快速投入任务。": "Strong adaptability and reliability: the UAV tolerates high and low temperatures and strong wind disturbance, flies stably at high altitude and in complex weather or rugged terrain, supports long-duration search standby, and can be deployed within 5 minutes.",
    "智慧变电站无人机全自动巡检系统以无人机智能机巢 + 工业无人机平台 + 多源任务载荷 + AI 数据分析软件 + 综合管控平台为核心架构，深度融合自动飞行控制、边缘计算、AI 智能缺陷识别、5G/4G 全链路通信技术，实现变电站设备全自主、全天候、无人值守全自动巡检。系统可完成变电站主变、构架、避雷针、母线、绝缘子、互感器等设备可见光高清巡检、红外测温、通道隐患排查，自动采集影像数据、智能识别设备缺陷与环境风险，达成从任务下发、自主飞行、数据采集、AI 分析到隐患工单闭环的全流程智能化运维，适配变电站严寒、大风、温差大、复杂电磁等严苛运行环境。": "The smart substation autonomous UAV inspection system is built around a smart drone dock, industrial UAV platform, multi-source mission payloads, AI data-analysis software, and an integrated management platform. It combines automatic flight control, edge computing, AI defect recognition, and 5G/4G full-link communications to enable fully autonomous, all-weather, unattended substation inspection. It performs HD visible-light inspection, infrared temperature measurement, and corridor-risk inspection for main transformers, frames, lightning rods, busbars, insulators, transformers, and other equipment. It automatically collects imagery, identifies equipment defects and environmental risks, and completes intelligent operation from task dispatch and autonomous flight to data acquisition, AI analysis, and closed-loop work orders in harsh environments such as severe cold, strong wind, large temperature differences, and complex electromagnetic conditions.",
    "智慧变电站无人机全自动巡检": "Smart Substation Autonomous UAV Inspection",
    "系统具备无人机自主起降、自动充换电、航线自主规划、标准化巡检拍摄、全天候待命、AI 缺陷智能识别、多站点集群调度、巡检数据自动分析、隐患工单流转、飞行记录溯源等全链条核心能力。 产品在场景应用中具有以下主要特性：": "The system provides autonomous takeoff/landing, automatic charging and battery swapping, autonomous route planning, standardized inspection shooting, all-weather standby, AI defect recognition, multi-site fleet dispatch, automatic inspection-data analysis, risk work-order circulation, and traceable flight records. In actual scenarios, the product has the following main characteristics:",
    "无需专业飞手现场操控，无人机巢实现自动存放、自主起降、机械臂自动换电换吊舱，90 秒极速启动、5 分钟内完成二次作业准备，全程无人干预。": "No professional pilot is required on site. The dock provides automatic storage, autonomous takeoff and landing, and robotic battery/pod swapping, starts within 90 seconds, prepares for a second mission within 5 minutes, and runs without human intervention.",
    "支持远程一键下发巡检任务，无需巡检专业经验，适配运维人员极简操作模式，彻底摆脱人员野外奔波作业。": "Remote one-key inspection task dispatch is supported without specialized inspection experience, enabling simple operation by maintenance staff and reducing field travel.",
    "系统整机 IP55 工业级防护，内置恒温排水、环境监测、UPS断电保护，可 7×24 小时值守，适配严寒、大风、雨夜、高温等复杂恶劣天气与野外复杂地理环境。": "The whole system has IP55 industrial protection, built-in temperature control and drainage, environmental monitoring, and UPS outage protection. It supports 24/7 standby and adapts to severe cold, strong wind, rainy nights, high temperatures, and complex outdoor geography.",
    "搭载可见光 + 红外双载荷，依托 AI 算法精准识别绝缘子破损、螺栓松动、设备发热、表计异常、树障遮挡、施工机械入侵等本体及通道隐患，识别准确率高。": "With visible-light and infrared dual payloads, AI algorithms identify insulator damage, loose bolts, equipment overheating, abnormal meters, tree obstruction, construction machinery intrusion, and other equipment or corridor risks with high accuracy.",
    "支持自定义巡检航线、巡检频次、定时巡航、应急复飞，可按变电站分区、设备点位定制精细化巡检方案，满足日常巡视、红外测温、突发应急多场景需求。": "Custom inspection routes, frequencies, scheduled cruising, and emergency reflights are supported. Fine inspection plans can be configured by substation area and equipment point for routine patrol, infrared temperature measurement, and emergency response.",
    "巡检数据实时回传云端，自动生成标准化巡检报告，隐患可一键生成工单并同步 PMS 系统，实现隐患发现、诊断、派单、消缺全流程数字化闭环。": "Inspection data is returned to the cloud in real time and standardized reports are generated automatically. Risks can generate work orders with one click and synchronize with the PMS system, closing the digital loop from discovery and diagnosis to dispatch and defect elimination.",
    "综合管控平台支持多机巢、多无人机统一调度、实时状态监控、飞行轨迹回放、设备台账管理，实现变电站巡检集约化、数字化管控。": "The integrated management platform supports unified dispatch of multiple docks and UAVs, real-time status monitoring, flight-track playback, and equipment ledger management for centralized and digital substation inspection.",
    "水利监测无人机是一款专为水域环境与水利工程管理设计的智能化监测系统。该系统由多旋翼飞行平台、高精度监测载荷和便携式地面站组成，通过稳定可靠的无线通信链路，实现对水域状况、水利设施和防汛应急场景的实时监测与数据采集。": "The water conservancy monitoring UAV is an intelligent monitoring system designed for water environments and hydraulic engineering management. It consists of a multi-rotor flight platform, high-precision monitoring payloads, and a portable ground station, using a stable wireless link for real-time monitoring and data collection of water areas, hydraulic facilities, and flood-control emergency scenes.",
    "本系统可根据任务需求灵活配置高清光学相机、热成像仪、多光谱传感器等专业载荷，全面覆盖水利监测核心需求。主要应用于：汛期水文监测与险情勘察，快速获取水位、流速、淹没范围等关键数据；水利设施智能巡检，精准识别坝体裂缝、管涌渗漏等安全隐患；河湖水域常态化监管，高效开展水质监测、排污溯源、非法采砂巡查等任务，为水利现代化管理提供高效可靠的技术支撑。": "The system can be flexibly configured with HD optical cameras, thermal imagers, multispectral sensors, and other professional payloads to cover core water-monitoring needs. It is used for flood-season hydrology monitoring and hazard survey to quickly obtain water level, flow velocity, inundation range, and other key data; intelligent inspection of hydraulic facilities to identify dam cracks, piping leakage, and other risks; and routine supervision of rivers and lakes, including water-quality monitoring, discharge tracing, and illegal sand-mining patrols, providing efficient technical support for modern water management.",
    "传统夜间应急抢险作业中，常规照明设备弊端突出，移动照明车举升高度不足，复杂场地易出现照明盲区；普通无人机续航短暂，无法支撑跨昼夜连续作业，严重制约夜间救援效率。": "In traditional night emergency operations, conventional lighting has clear limitations: mobile lighting vehicles lack sufficient lifting height, complex sites often have lighting blind spots, and ordinary UAVs have short endurance and cannot support continuous day-and-night work, restricting night rescue efficiency.",
    "系留无人机应急照明系统依托地面供电实现超长滞空，可在 50-100 米高空形成高空光塔，完成大范围全域无死角照明，彻底打破低位照明局限，有效消除视觉盲区，为夜间抢险救灾、地质灾害处置等各类应急任务，提供稳定高效的高空照明支撑。": "The tethered UAV emergency lighting system uses ground power for very long airborne endurance. At 50-100 m altitude it forms an aerial light tower, providing wide-area lighting without blind spots, overcoming low-level lighting limits, eliminating visual blind areas, and supporting night emergency rescue, disaster response, and other missions with stable high-altitude illumination.",
    "极端自然灾害极易造成区域通信网络瘫痪，造成灾区内外信息阻断，严重影响救灾指挥、人员搜救与物资统筹工作，快速重建应急通信是抢险救灾的关键环节。传统应急通信车受地形、道路、覆盖范围制约明显，部署效率低、适用性差，难以满足复杂灾情现场通信保障需求。": "Extreme natural disasters can easily paralyze regional communications and cut information flow between disaster areas and the outside, seriously affecting rescue command, personnel search, and material coordination. Rapid emergency-communications restoration is a key part of disaster response. Traditional emergency communication vehicles are strongly constrained by terrain, roads, and coverage, with low deployment efficiency and limited applicability in complex disaster sites.",
    "系留无人机高空基站可搭载轻量化通信设备快速升空组网，依靠持续供电实现长时间空中驻留，不受地面环境阻碍，覆盖范围广、部署便捷、响应迅速，能够高效适配地震、洪水、雨雪冰冻等各类灾害场景，快速恢复灾区全域应急通信。": "The tethered UAV aerial base station can rapidly lift lightweight communication equipment to build a network. Continuous power enables long-duration airborne presence, while the system avoids ground-environment obstacles, provides broad coverage, deploys easily, responds quickly, and adapts to earthquakes, floods, snow/ice, and other disasters to restore emergency communications across affected areas.",
    "系留灭火无人机系统可应用于超高层、城市密集建筑群、化工园区等复杂火灾处置。超高层火灾中，可突破高度限制，精准高压喷淋起火点，解决高位处置难题；密集建筑群中，可定位隐蔽起火点、构建隔离防线；化工园区中，可远程换装专用药剂降温灭火，降低人员伤亡风险。系统具备快速部署、全时段续航优势，实现从地面处置向高位精准、长时保障模式的跨越。": "The tethered firefighting UAV system can be used for complex fire response in super high-rise buildings, dense urban blocks, chemical parks, and similar environments. In high-rise fires it overcomes height limits and performs precise high-pressure spraying at ignition points; in dense buildings it helps locate hidden ignition points and build isolation lines; in chemical parks it can remotely switch to specialized agents for cooling and firefighting, reducing personnel risk. The system offers rapid deployment and all-period endurance, shifting response from ground-only handling to precise elevated, long-duration support.",
    "无人机可挂载破窗装置，在超高层火灾中精准破拆玻璃幕墙，依托抗风稳定性与厘米级定位，锁定最佳破窗点位，开辟作业窗口，为灭火、排烟、救人提供通道。系统可连续破拆多个楼层排烟口，缓解火场浓烟高温，相较于传统人工模式，既保障人员安全，又缩短生命通道构建时间，提升救援效能与安全系数。": "The UAV can carry a window-breaking device to precisely break glass curtain walls during high-rise fires. With wind stability and centimeter-level positioning, it locks onto the best window-breaking point and opens an operation window for firefighting, smoke exhaust, and rescue access. It can continuously open smoke exhaust points on multiple floors, relieving smoke and heat at the fire scene while improving personnel safety and shortening the time needed to create rescue access.",
    "系统由灭火系统主单元、压缩空气单元、操作控制面板组成。灭火系统主单元完成水、压缩空气、泡沫添加剂的精确混合，使之产生泡沫灭火剂。": "The system consists of a main firefighting unit, compressed-air unit, and operation control panel. The main unit precisely mixes water, compressed air, and foam additive to generate foam extinguishing agent.",
    "消防车上配有多屏多画面监控指挥平台，能够实时监控无人机画面、起飞平台和消防车周围情况，通过5G网络通信设备，可将现场数据实时回传至总部指挥中心。": "The fire truck is equipped with a multi-screen command and monitoring platform that monitors UAV imagery, the takeoff platform, and the area around the truck in real time. Through 5G network equipment, on-site data can be returned to headquarters in real time.",
}


DOCX_EXACT_RU = {
    "替代人工": "Замена ручной работы",
    "全视角无盲区巡检": "Полноракурсная инспекция без слепых зон",
    "超高作业效率": "Очень высокая эффективность работ",
    "多载荷一体化检测": "Интегрированная проверка с несколькими нагрузками",
    "复杂环境强适应性": "Высокая адаптация к сложной среде",
    "数据可追溯可量化": "Прослеживаемые и измеримые данные",
    "平台集约化管控": "Централизованное управление платформой",
    "全自主无人作业": "Полностью автономная работа без персонала",
    "零门槛远程调度": "Простая удаленная диспетчеризация",
    "全天候全域适配": "Всепогодная работа на всей территории",
    "AI 智能缺陷识别": "AI-распознавание дефектов",
    "灵活巡检策略": "Гибкая стратегия инспекции",
    "业务数据闭环管理": "Замкнутое управление рабочими данными",
    "多设备集群管控": "Групповое управление несколькими устройствами",
    "电塔巡检无人机以工业无人机平台 + 多源任务载荷融合可见光成像、热红外检测与 AI 智能识别技术，专为输电线路、铁塔、金具、绝缘子及通道环境打造专业化空中巡检平台。": "БПЛА для инспекции опор ЛЭП объединяет промышленную платформу БПЛА, многоканальные полезные нагрузки, видимую съемку, тепловизионный контроль и AI-распознавание, формируя профессиональную воздушную платформу для линий электропередачи, опор, арматуры, изоляторов и коридоров.",
    "系统替代传统人工徒步、登塔巡检，突破复杂地形、恶劣天气限制，实现杆塔本体缺陷、线路散股断股、附件松动移位、设备发热、树障及外力施工隐患自动排查，采集影像、温度多源数据，完成从航线规划、自主航拍、缺陷归档、报告输出的全流程运维，适用于输电线路常态化巡检、故障排查与精益化运维管理。": "Система заменяет пешую и башенную ручную инспекцию, преодолевая ограничения сложного рельефа и плохой погоды. Она автоматически проверяет дефекты опор, повреждение проводов, ослабление или смещение арматуры, нагрев оборудования, деревья и риски внешних строительных работ, собирает изображения и температурные данные и закрывает весь цикл от планирования маршрута и автономной съемки до архивации дефектов и выпуска отчетов.",
    "系统具备航线规划、全自动航拍、多传感器数据采集、缺陷智能识别、点云测绘、杆塔台账管理、巡检成果归档、数据分析研判、标准化报告生成等完整业务能力。 产品在场景应用中具有以下主要特性：": "Система поддерживает планирование маршрутов, полностью автоматическую аэросъемку, сбор данных с нескольких датчиков, интеллектуальное распознавание дефектов, съемку облаков точек, реестр опор, архивирование результатов, анализ данных и выпуск стандартизированных отчетов. В рабочих сценариях продукт имеет следующие особенности:",
    "无需人员进山踏勘、攀爬铁塔，远离高空坠落、触电、山地迷路等安全风险，从源头降低作业安全隐患。": "Персоналу не нужно выходить в горы и подниматься на опоры, что снижает риски падения, поражения током и потери ориентации в горной местности.",
    "多旋翼无人机机动灵活，实现 3D 全方位立体巡检，可抵达人工无法靠近的塔臂、绝缘子顶部、导线下方等死角位置，全覆盖无遗漏。": "Маневренный мультикоптер выполняет 3D-инспекцию со всех ракурсов и достигает траверс, верхней части изоляторов, нижней стороны проводов и других труднодоступных зон.",
    "巡检效率为传统人工20 倍以上，支持大范围、多杆塔批量巡航，大幅缩短巡检周期，适合线路规模化常态化运维。": "Эффективность инспекции более чем в 20 раз выше ручной работы; поддерживаются массовые облеты больших участков и множества опор, что сокращает цикл инспекции.",
    "集成可见光、热红外载荷，同步完成外观缺陷、温度异常多维度检测。": "Видимая и тепловизионная нагрузки одновременно выявляют внешние дефекты и температурные аномалии.",
    "无人机 IP55 防护、6 级抗风，可在山区、戈壁、雨雪、大风及电网复杂电磁环境下稳定作业。": "БПЛА имеет защиту IP55 и устойчивость к ветру уровня 6, стабильно работает в горах, пустынных районах, дождь/снег, сильный ветер и сложной электромагнитной среде энергосети.",
    "巡检照片、视频、点云、飞行轨迹、缺陷记录全程留存，客观标准化存档，支持查询、复核、追溯，为状态检修提供数据支撑。": "Фотографии, видео, облака точек, траектории и записи дефектов сохраняются для стандартизированного архива, поиска, проверки и прослеживаемости.",
    "服务管理平台支持航线管理、杆塔台账、缺陷管理、成果归档、多维度统计分析，实现巡检业务数字化、规范化闭环管理。": "Платформа управления поддерживает маршруты, реестр опор, управление дефектами, архив результатов и многомерную статистику, создавая цифровой замкнутый цикл инспекции.",
    "应急搜救无人机集成高清可见光成像、红外热成像、智能目标识别、高清实时图传、精准物资投送等核心功能，可搭载多类型任务载荷，适配洪涝内涝、地震坍塌、野外失联、水域遇险等各类复杂应急救援场景。高效完成全域大范围空中巡查、被困人员探测、救援目标快速定位、现场实况图像回传及应急物资定点投送等作业，全面提升应急搜救处置效率，显著提高遇险人员救援成功率。": "БПЛА для аварийного поиска и спасения объединяет HD видимую съемку, тепловизор, интеллектуальное распознавание целей, HD видеопередачу в реальном времени и точную доставку грузов. Он несет разные полезные нагрузки для паводков, подтоплений, обрушений после землетрясений, поисков пропавших и спасения на воде, выполняя широкозонный воздушный осмотр, обнаружение людей, быстрое позиционирование целей, передачу изображения и доставку аварийных материалов.",
    "系统具备全域巡查、生命探测、图像传输、物资投送、自主飞行等全流程应急搜救核心能力，产品实际应用中具备以下核心特性：": "Система поддерживает осмотр всей зоны, обнаружение людей, передачу изображения, доставку материалов и автономный полет. В практическом применении она имеет следующие особенности:",
    "全天候全域搜救 搭载红外热成像与高清变焦可见光，不受黑夜、密林遮挡影响，可昼夜不间断开展搜救作业，回传现场环境图像。": "Всепогодный поиск по всей зоне: тепловизор и HD зум-камера видимого диапазона позволяют искать днем и ночью, несмотря на темноту и плотный лес, с передачей изображения места.",
    "智能自主作业支持一键起降、航线规划、自动巡航，适配山地、废墟、峡谷等高危未知搜救区域。": "Интеллектуальная автономная работа поддерживает взлет/посадку одной кнопкой, планирование маршрута и автоматическое патрулирование в горах, завалах, ущельях и других опасных районах.",
    "多任务模块化拓展可搭载空中喊话器、强光探照灯、应急物资抛投器等负载，实现喊话安抚、夜间照明、急救包 / 救生圈精准投送等多功能拓展。": "Модульное расширение позволяет устанавливать громкоговоритель, мощный прожектор, сбрасыватель аварийных грузов и другие нагрузки для голосового оповещения, ночного освещения и точной доставки аптечек или спасательных кругов.",
    "空地协同联动 实时回传高清现场视频与定位数据，同步共享至指挥平台，实现空中侦察、地面处置一体化协同救援。": "Координация воздух-земля передает HD видео и координаты в реальном времени на командную платформу, объединяя воздушную разведку и наземные действия.",
    "适应性强可靠性高具备优异的高低温耐受、强风抗扰能力，可在高海拔、复杂气象、崎岖地形环境稳定飞行，支持长时间连续值守搜救，部署便捷、5 分钟即可快速投入任务。": "Высокая адаптация и надежность: БПЛА устойчив к высоким/низким температурам и сильному ветру, стабильно летает на большой высоте, при сложной погоде и пересеченном рельефе, поддерживает длительное дежурство и разворачивается за 5 минут.",
    "智慧变电站无人机全自动巡检系统以无人机智能机巢 + 工业无人机平台 + 多源任务载荷 + AI 数据分析软件 + 综合管控平台为核心架构，深度融合自动飞行控制、边缘计算、AI 智能缺陷识别、5G/4G 全链路通信技术，实现变电站设备全自主、全天候、无人值守全自动巡检。系统可完成变电站主变、构架、避雷针、母线、绝缘子、互感器等设备可见光高清巡检、红外测温、通道隐患排查，自动采集影像数据、智能识别设备缺陷与环境风险，达成从任务下发、自主飞行、数据采集、AI 分析到隐患工单闭环的全流程智能化运维，适配变电站严寒、大风、温差大、复杂电磁等严苛运行环境。": "Автономная система инспекции умной подстанции с БПЛА построена на интеллектуальном доке, промышленной платформе БПЛА, многоканальных полезных нагрузках, ПО AI-аналитики и общей платформе управления. Она объединяет автоматическое управление полетом, edge computing, AI-распознавание дефектов и связь 5G/4G, обеспечивая полностью автономную, всепогодную и безлюдную инспекцию подстанций. Система выполняет HD визуальную инспекцию, тепловизионный контроль и проверку коридоров для трансформаторов, конструкций, молниеотводов, шин, изоляторов и измерительных трансформаторов, автоматически собирает изображения, выявляет дефекты и замыкает цикл от задачи до AI-анализа и наряда.",
    "智慧变电站无人机全自动巡检": "Автономная инспекция умной подстанции с БПЛА",
    "系统具备无人机自主起降、自动充换电、航线自主规划、标准化巡检拍摄、全天候待命、AI 缺陷智能识别、多站点集群调度、巡检数据自动分析、隐患工单流转、飞行记录溯源等全链条核心能力。 产品在场景应用中具有以下主要特性：": "Система поддерживает автономный взлет и посадку, автоматическую зарядку и замену батарей, автономное планирование маршрутов, стандартизированную съемку, всепогодное дежурство, AI-распознавание дефектов, диспетчеризацию нескольких площадок, анализ данных, маршрутизацию нарядов и прослеживание полетов.",
    "无需专业飞手现场操控，无人机巢实现自动存放、自主起降、机械臂自动换电换吊舱，90 秒极速启动、5 分钟内完成二次作业准备，全程无人干预。": "Профессиональный пилот на месте не требуется. Док автоматически хранит БПЛА, обеспечивает автономный взлет/посадку и роботизированную замену батареи/подвеса, запускается за 90 секунд и готовит повторную работу за 5 минут.",
    "支持远程一键下发巡检任务，无需巡检专业经验，适配运维人员极简操作模式，彻底摆脱人员野外奔波作业。": "Поддерживается удаленная выдача задачи одной кнопкой без специального опыта инспекции, что упрощает работу эксплуатационного персонала и снижает полевые выезды.",
    "系统整机 IP55 工业级防护，内置恒温排水、环境监测、UPS断电保护，可 7×24 小时值守，适配严寒、大风、雨夜、高温等复杂恶劣天气与野外复杂地理环境。": "Система имеет промышленную защиту IP55, встроенный контроль температуры и дренаж, мониторинг среды и защиту UPS, поддерживает дежурство 24/7 и работает при морозе, ветре, дождливой ночи, жаре и сложной географии.",
    "搭载可见光 + 红外双载荷，依托 AI 算法精准识别绝缘子破损、螺栓松动、设备发热、表计异常、树障遮挡、施工机械入侵等本体及通道隐患，识别准确率高。": "Двойная нагрузка видимого и ИК диапазона с AI-алгоритмами выявляет повреждение изоляторов, ослабление болтов, нагрев оборудования, аномалии счетчиков, деревья и вторжение строительной техники.",
    "支持自定义巡检航线、巡检频次、定时巡航、应急复飞，可按变电站分区、设备点位定制精细化巡检方案，满足日常巡视、红外测温、突发应急多场景需求。": "Поддерживаются пользовательские маршруты, частота инспекции, плановый облет и аварийный повторный вылет; планы можно настраивать по зонам подстанции и точкам оборудования.",
    "巡检数据实时回传云端，自动生成标准化巡检报告，隐患可一键生成工单并同步 PMS 系统，实现隐患发现、诊断、派单、消缺全流程数字化闭环。": "Данные инспекции передаются в облако в реальном времени, отчеты формируются автоматически, риски одной кнопкой превращаются в наряды и синхронизируются с PMS, закрывая цифровой цикл.",
    "综合管控平台支持多机巢、多无人机统一调度、实时状态监控、飞行轨迹回放、设备台账管理，实现变电站巡检集约化、数字化管控。": "Общая платформа управления поддерживает единое диспетчерское управление несколькими доками и БПЛА, мониторинг статуса, воспроизведение траекторий и учет оборудования.",
    "水利监测无人机是一款专为水域环境与水利工程管理设计的智能化监测系统。该系统由多旋翼飞行平台、高精度监测载荷和便携式地面站组成，通过稳定可靠的无线通信链路，实现对水域状况、水利设施和防汛应急场景的实时监测与数据采集。": "БПЛА для мониторинга водного хозяйства — интеллектуальная система для водной среды и управления гидротехническими объектами. Она состоит из мультикоптерной платформы, высокоточных нагрузок и переносной наземной станции и через стабильный радиоканал выполняет мониторинг и сбор данных по водным объектам, сооружениям и паводковым ситуациям.",
    "本系统可根据任务需求灵活配置高清光学相机、热成像仪、多光谱传感器等专业载荷，全面覆盖水利监测核心需求。主要应用于：汛期水文监测与险情勘察，快速获取水位、流速、淹没范围等关键数据；水利设施智能巡检，精准识别坝体裂缝、管涌渗漏等安全隐患；河湖水域常态化监管，高效开展水质监测、排污溯源、非法采砂巡查等任务，为水利现代化管理提供高效可靠的技术支撑。": "Система гибко комплектуется HD оптической камерой, тепловизором, мультиспектральным датчиком и другими нагрузками. Она применяется для паводкового гидромониторинга, обследования рисков, получения уровня воды, скорости течения и зоны затопления; инспекции гидросооружений и выявления трещин плотин, фильтрации и других рисков; а также регулярного контроля рек и озер, качества воды, трассировки сбросов и патруля незаконной добычи песка.",
    "传统夜间应急抢险作业中，常规照明设备弊端突出，移动照明车举升高度不足，复杂场地易出现照明盲区；普通无人机续航短暂，无法支撑跨昼夜连续作业，严重制约夜间救援效率。": "В традиционных ночных аварийных работах обычное освещение имеет явные ограничения: мобильные осветительные машины не поднимаются достаточно высоко, на сложных площадках появляются слепые зоны, а обычные БПЛА имеют короткое время полета и не поддерживают непрерывную работу день-ночь.",
    "系留无人机应急照明系统依托地面供电实现超长滞空，可在 50-100 米高空形成高空光塔，完成大范围全域无死角照明，彻底打破低位照明局限，有效消除视觉盲区，为夜间抢险救灾、地质灾害处置等各类应急任务，提供稳定高效的高空照明支撑。": "Привязная система аварийного освещения БПЛА использует наземное питание для сверхдлительного пребывания в воздухе. На высоте 50-100 м она формирует воздушную световую башню, обеспечивает широкую зону освещения без слепых зон и поддерживает ночные спасательные и аварийные работы.",
    "极端自然灾害极易造成区域通信网络瘫痪，造成灾区内外信息阻断，严重影响救灾指挥、人员搜救与物资统筹工作，快速重建应急通信是抢险救灾的关键环节。传统应急通信车受地形、道路、覆盖范围制约明显，部署效率低、适用性差，难以满足复杂灾情现场通信保障需求。": "Экстремальные природные бедствия могут парализовать региональные сети связи и оборвать информационный обмен, что серьезно влияет на управление спасением, поиск людей и координацию ресурсов. Быстрое восстановление аварийной связи — ключевой этап. Традиционные автомобили связи сильно ограничены рельефом, дорогами и покрытием.",
    "系留无人机高空基站可搭载轻量化通信设备快速升空组网，依靠持续供电实现长时间空中驻留，不受地面环境阻碍，覆盖范围广、部署便捷、响应迅速，能够高效适配地震、洪水、雨雪冰冻等各类灾害场景，快速恢复灾区全域应急通信。": "Привязная воздушная базовая станция БПЛА быстро поднимает легкое коммуникационное оборудование и разворачивает сеть. Постоянное питание обеспечивает длительное пребывание в воздухе, широкое покрытие, простое развертывание и быстрый отклик для землетрясений, паводков, снега/льда и других бедствий.",
    "系留灭火无人机系统可应用于超高层、城市密集建筑群、化工园区等复杂火灾处置。超高层火灾中，可突破高度限制，精准高压喷淋起火点，解决高位处置难题；密集建筑群中，可定位隐蔽起火点、构建隔离防线；化工园区中，可远程换装专用药剂降温灭火，降低人员伤亡风险。系统具备快速部署、全时段续航优势，实现从地面处置向高位精准、长时保障模式的跨越。": "Привязная пожарная система БПЛА применяется для сложных пожаров в высотных зданиях, плотной городской застройке и химических парках. Она преодолевает ограничения высоты, точно подает струю к очагу, помогает находить скрытые очаги, создавать изоляционные рубежи и дистанционно применять специальные составы для охлаждения и тушения.",
    "无人机可挂载破窗装置，在超高层火灾中精准破拆玻璃幕墙，依托抗风稳定性与厘米级定位，锁定最佳破窗点位，开辟作业窗口，为灭火、排烟、救人提供通道。系统可连续破拆多个楼层排烟口，缓解火场浓烟高温，相较于传统人工模式，既保障人员安全，又缩短生命通道构建时间，提升救援效能与安全系数。": "БПЛА может нести устройство пробивания окон и точно вскрывать стеклянные фасады при высотных пожарах. Благодаря ветроустойчивости и сантиметровому позиционированию он выбирает точку вскрытия, создает рабочее окно для тушения, дымоудаления и спасения и может последовательно открывать дымовые выходы на нескольких этажах.",
    "系统由灭火系统主单元、压缩空气单元、操作控制面板组成。灭火系统主单元完成水、压缩空气、泡沫添加剂的精确混合，使之产生泡沫灭火剂。": "Система состоит из основного модуля пожаротушения, блока сжатого воздуха и панели управления. Основной модуль точно смешивает воду, сжатый воздух и пенообразователь.",
    "消防车上配有多屏多画面监控指挥平台，能够实时监控无人机画面、起飞平台和消防车周围情况，通过5G网络通信设备，可将现场数据实时回传至总部指挥中心。": "Пожарный автомобиль оснащен многомониторной командной платформой, которая в реальном времени контролирует изображение БПЛА, взлетную платформу и обстановку вокруг автомобиля; данные передаются в штаб по сети 5G.",
}


LEXICON_EN = {
    "产品简介": "Product Introduction", "产品概述": "Product Overview", "功能概述": "Functional Overview", "功能特点": "Functional Characteristics", "技术参数": "Technical Parameters", "技术指标": "Technical Indicators", "系统组成": "System Composition", "应用场景": "Application Scenarios", "基本参数表": "Basic Parameter Table", "产品配置清单": "Product Configuration List", "备品备件清单": "Spare Parts List", "人员配置单": "Personnel Configuration", "部分选配件": "Optional Accessories",
    "消防综合运输车": "Integrated Firefighting Vehicle", "系留供电": "Tethered Power Supply", "压缩空气泡沫灭火系统": "Compressed-Air Foam Firefighting System", "车载指挥系统": "Vehicle-Mounted Command System",
    "配置单一": "Configuration 1", "配置单二": "Configuration 2", "配置一": "Configuration 1", "配置二": "Configuration 2", "系统一": "System 1", "系统二": "System 2", "应急通信保障系统": "Emergency Communication Support System", "侦察指挥救援系统": "Reconnaissance, Command, and Rescue System", "系留照明系统": "Tethered Lighting System", "系留照明定点侦查系统": "Tethered Lighting and Fixed-Point Reconnaissance System", "侦察搜救系统": "Reconnaissance and Rescue System", "高层灭火系统": "High-Rise Firefighting System", "破窗搜救系统": "Window-Breaking Search and Rescue System", "应急通信保障": "Emergency Communication Support", "侦察指挥救援": "Reconnaissance Command and Rescue", "系留照明定点侦查": "Tethered Lighting and Fixed-Point Reconnaissance",
    "高层消防无人机": "High-Rise Firefighting UAV", "应急通讯无人机": "Emergency Communication UAV", "系留照明无人机": "Tethered Lighting UAV", "水利监测无人机": "Water Conservancy Monitoring UAV", "电塔巡检无人机": "Power Tower Inspection UAV", "应急搜救无人机": "Emergency Search and Rescue UAV", "智慧变电站无人机全自动巡检系统": "Smart Substation Autonomous UAV Inspection System", "智慧变电站无人机全自动巡检": "Smart Substation Autonomous UAV Inspection",
    "无人机平台": "UAV Platform", "飞行平台": "Flight Platform", "系留系统": "Tethered System", "智能遥控器": "Smart Remote Controller", "照明模块": "Lighting Module", "系留电池": "Tethered Battery", "系留备用电池": "Tethered Backup Battery", "运输航空箱": "Transport Flight Case", "航空箱": "Flight Case", "发电机": "Generator", "备用电池": "Backup Battery", "双光云台相机": "Dual-Sensor Gimbal Camera", "喊话器": "Loudspeaker", "4G宽带基站": "4G Broadband Base Station", "卫星终端": "Satellite Terminal", "自组网电台": "Mesh Radio", "破窗灭火弹发射器": "Window-Breaking Fire Extinguisher Launcher", "消防水枪": "Firefighting Water Lance", "消防水带": "Fire Hose", "消防无人机指挥车": "Firefighting UAV Command Vehicle",
    "产品名称": "Product Name", "主要参数": "Main Parameters", "数量（套）": "Quantity (sets)", "数量（人）": "Quantity (people)", "配置人数": "Personnel", "岗位名称": "Role", "岗位职责": "Responsibility", "价格": "Price", "序号": "No.", "易损易耗件名称": "Wear/Consumable Part", "规格型号": "Specification / Model", "品牌": "Brand", "原产地": "Origin", "备注": "Remarks",
    "螺旋桨固定螺丝": "Propeller Fixing Screws", "螺旋桨": "Propeller", "电池": "Battery", "电机": "Motor", "天线": "Antenna", "非传": "Feichuan", "北京": "Beijing",
    "现场保障总指挥": "On-Site Support Commander", "现场总指挥": "On-Site Commander", "现场负责人": "On-Site Lead", "无人机操作员": "UAV Operator", "无人机操作岗": "UAV Operation Role", "通信系统操作岗": "Communication System Operation Role", "设备保障岗": "Equipment Support Role", "设备运维岗": "Equipment Operations and Maintenance Role", "数据记录岗": "Data Recording Role", "侦查记录岗": "Reconnaissance Recording Role", "侦察分析员": "Reconnaissance Analyst", "火情监测员": "Fire Monitoring Role", "灭火设备操作员": "Firefighting Equipment Operator", "供电保障员": "Power-Supply Support Role", "指挥平台操作员": "Command Platform Operator",
    "统筹应急通信全流程，协调人员、设备，处置突发问题": "Oversee the full emergency-communication process, coordinate personnel and equipment, and handle unexpected issues", "统筹侦察救援通信，协调人员、设备，处置突发问题": "Oversee reconnaissance and rescue communications, coordinate personnel and equipment, and handle unexpected issues", "操作无人机、系留系统，监控飞行与设备状态": "Operate the UAV and tethered system and monitor flight and equipment status", "操作无人机、系留系统，控制云台、喊话器，监控飞行状态": "Operate the UAV and tethered system, control the gimbal and loudspeaker, and monitor flight status", "操作 4G 基站、卫星终端，保障通信链路稳定": "Operate the 4G base station and satellite terminal and keep communication links stable", "操作自组网电台，保障侦察数据、语音通信稳定": "Operate the mesh radio and maintain stable reconnaissance data and voice communications", "巡检、维护所有设备，保障供电与硬件正常": "Inspect and maintain all equipment and ensure normal power supply and hardware operation", "记录设备运行、通信状态等相关数据并归档": "Record and archive equipment operation and communication status data", "记录飞行、侦察、通信数据，整理归档": "Record, organize, and archive flight, reconnaissance, and communication data",
    "统筹照明保障，协调人员设备，处置突发情况": "Oversee lighting support, coordinate personnel and equipment, and handle incidents", "统筹照明侦查工作，协调人员设备，处置突发情况": "Oversee lighting reconnaissance, coordinate personnel and equipment, and handle incidents", "操作无人机、系留系统，控制照明模块，监控运行状态": "Operate the UAV and tethered system, control the lighting module, and monitor operating status", "操作无人机、系留系统，控制云台、喊话器及照明模块": "Operate the UAV and tethered system and control the gimbal, loudspeaker, and lighting module", "巡检发电机、备用电池等设备，保障供电正常": "Inspect the generator, backup batteries, and other equipment to ensure normal power supply", "负责设备收纳、运输及日常维护，检查备用电池": "Handle equipment storage, transport, routine maintenance, and backup-battery checks", "记录云台侦查数据、照明状态，整理归档": "Record and archive gimbal reconnaissance data and lighting status", "巡检所有设备及备用电池，保障供电与硬件正常": "Inspect all equipment and backup batteries to ensure normal power and hardware operation",
    "统筹侦察搜救全流程，协调岗位配合，对接总部，下达相关指令并把控安全。": "Oversee the full reconnaissance and rescue process, coordinate roles, connect with headquarters, issue commands, and control safety.", "操作飞行平台及遥控器，控制无人机起降巡航，配合相机完成侦察拍摄。": "Operate the flight platform and remote controller, control takeoff, landing, and cruising, and coordinate the camera for reconnaissance imaging.", "查看相机实时画面，识别被困人员及隐患，反馈侦察数据并提供建议。": "View real-time camera images, identify trapped people and risks, return reconnaissance data, and provide recommendations.", "检查、调试、维护各类设备，确保正常运行，处理小型设备故障。": "Inspect, debug, and maintain equipment, ensure normal operation, and handle small equipment faults.", "操作车载指挥系统，监控画面、保障数据回传，做好记录上报。": "Operate the vehicle command system, monitor video, ensure data return, and record and report information.",
    "统筹高层灭火全流程，协调岗位协同，对接总部，下达灭火相关指令。": "Oversee the full high-rise firefighting process, coordinate roles, connect with headquarters, and issue firefighting commands.", "操作飞行平台及遥控器，控制无人机抵达灭火点位，配合监测火情。": "Operate the flight platform and remote controller, guide the UAV to the firefighting point, and support fire monitoring.", "监测火情蔓延及起火点，分析火势，反馈数据并辅助调整灭火方案。": "Monitor fire spread and ignition points, analyze fire conditions, return data, and help adjust the firefighting plan.", "操作、调试各类灭火设备，配合无人机完成高层灭火作业。": "Operate and debug firefighting equipment and work with the UAV to complete high-rise firefighting operations.", "检查、启动、维护供电设备，保障持续稳定供电，处理供电异常。": "Inspect, start, and maintain power equipment, ensure stable continuous power, and handle power anomalies.", "操作指挥系统，监控现场及设备状态，保障数据回传，做好灭火记录。": "Operate the command system, monitor site and equipment status, ensure data return, and keep firefighting records.",
}


LEXICON_RU = {
    "产品简介": "Описание продукта", "产品概述": "Обзор продукта", "功能概述": "Функциональный обзор", "功能特点": "Функциональные особенности", "技术参数": "Технические параметры", "技术指标": "Технические показатели", "系统组成": "Состав системы", "应用场景": "Сценарии применения", "基本参数表": "Таблица основных параметров", "产品配置清单": "Комплект поставки", "备品备件清单": "Запасные части", "人员配置单": "Расчет персонала", "部分选配件": "Дополнительные опции",
    "消防综合运输车": "Комплексный пожарный автомобиль", "系留供电": "Привязное питание", "压缩空气泡沫灭火系统": "Система пенного пожаротушения со сжатым воздухом", "车载指挥系统": "Бортовая командная система",
    "配置单一": "Комплектация 1", "配置单二": "Комплектация 2", "配置一": "Комплектация 1", "配置二": "Комплектация 2", "系统一": "Система 1", "系统二": "Система 2", "应急通信保障系统": "система аварийной связи", "侦察指挥救援系统": "система разведки, командования и спасения", "系留照明系统": "система привязного освещения", "系留照明定点侦查系统": "система привязного освещения и точечной разведки", "侦察搜救系统": "система разведки и спасения", "高层灭火系统": "система высотного пожаротушения", "破窗搜救系统": "система пробивания окна и спасения", "应急通信保障": "аварийная связь", "侦察指挥救援": "разведка, командование и спасение", "系留照明定点侦查": "привязное освещение и точечная разведка",
    "高层消防无人机": "БПЛА для высотного пожаротушения", "应急通讯无人机": "БПЛА для аварийной связи", "系留照明无人机": "Привязной осветительный БПЛА", "水利监测无人机": "БПЛА для мониторинга водного хозяйства", "电塔巡检无人机": "БПЛА для инспекции опор ЛЭП", "应急搜救无人机": "БПЛА для аварийного поиска и спасения", "智慧变电站无人机全自动巡检系统": "Автономная система инспекции умной подстанции с БПЛА", "智慧变电站无人机全自动巡检": "Автономная инспекция умной подстанции с БПЛА",
    "无人机平台": "платформа БПЛА", "飞行平台": "летная платформа", "系留系统": "привязная система", "智能遥控器": "интеллектуальный пульт", "照明模块": "осветительный модуль", "系留电池": "привязная батарея", "系留备用电池": "резервная батарея привязной системы", "运输航空箱": "транспортный кейс", "航空箱": "транспортный кейс", "发电机": "генератор", "备用电池": "резервная батарея", "双光云台相机": "двухспектральная камера на подвесе", "喊话器": "громкоговоритель", "4G宽带基站": "широкополосная базовая станция 4G", "卫星终端": "спутниковый терминал", "自组网电台": "mesh-радиостанция", "破窗灭火弹发射器": "пусковое устройство для пробивания окна", "消防水枪": "пожарный ствол", "消防水带": "пожарный рукав", "消防无人机指挥车": "командный автомобиль пожарного БПЛА",
    "产品名称": "Наименование", "主要参数": "Основные параметры", "数量（套）": "Количество (компл.)", "数量（人）": "Количество (чел.)", "配置人数": "Персонал", "岗位名称": "Роль", "岗位职责": "Обязанность", "价格": "Цена", "序号": "No.", "易损易耗件名称": "Изнашиваемая/расходная часть", "规格型号": "Спецификация / модель", "品牌": "Бренд", "原产地": "Происхождение", "备注": "Примечание",
    "螺旋桨固定螺丝": "винты крепления пропеллера", "螺旋桨": "пропеллер", "电池": "аккумулятор", "电机": "двигатель", "天线": "антенна", "非传": "Feichuan", "北京": "Пекин",
    "现场保障总指挥": "руководитель обеспечения на месте", "现场总指挥": "руководитель на месте", "现场负责人": "ответственный на месте", "无人机操作员": "оператор БПЛА", "无人机操作岗": "оператор БПЛА", "通信系统操作岗": "оператор системы связи", "设备保障岗": "специалист по оборудованию", "设备运维岗": "специалист эксплуатации оборудования", "数据记录岗": "регистратор данных", "侦查记录岗": "регистратор разведданных", "侦察分析员": "аналитик разведки", "火情监测员": "оператор мониторинга пожара", "灭火设备操作员": "оператор пожарного оборудования", "供电保障员": "специалист электропитания", "指挥平台操作员": "оператор командной платформы",
    "统筹应急通信全流程，协调人员、设备，处置突发问题": "руководит всем процессом аварийной связи, координирует персонал и оборудование, решает нештатные ситуации", "统筹侦察救援通信，协调人员、设备，处置突发问题": "руководит связью разведки и спасения, координирует персонал и оборудование, решает нештатные ситуации", "操作无人机、系留系统，监控飞行与设备状态": "управляет БПЛА и привязной системой, контролирует полет и состояние оборудования", "操作无人机、系留系统，控制云台、喊话器，监控飞行状态": "управляет БПЛА и привязной системой, контролирует подвес и громкоговоритель, следит за полетом", "操作 4G 基站、卫星终端，保障通信链路稳定": "эксплуатирует базовую станцию 4G и спутниковый терминал, поддерживает стабильную связь", "操作自组网电台，保障侦察数据、语音通信稳定": "эксплуатирует mesh-радиостанцию, поддерживает стабильные данные разведки и голосовую связь", "巡检、维护所有设备，保障供电与硬件正常": "проверяет и обслуживает оборудование, обеспечивает питание и исправность аппаратуры", "记录设备运行、通信状态等相关数据并归档": "записывает и архивирует данные работы оборудования и связи", "记录飞行、侦察、通信数据，整理归档": "записывает и архивирует данные полета, разведки и связи",
    "统筹照明保障，协调人员设备，处置突发情况": "руководит обеспечением освещения, координирует персонал и оборудование, решает инциденты", "统筹照明侦查工作，协调人员设备，处置突发情况": "руководит освещением и разведкой, координирует персонал и оборудование, решает инциденты", "操作无人机、系留系统，控制照明模块，监控运行状态": "управляет БПЛА и привязной системой, контролирует осветительный модуль и состояние работы", "操作无人机、系留系统，控制云台、喊话器及照明模块": "управляет БПЛА и привязной системой, контролирует подвес, громкоговоритель и осветительный модуль", "巡检发电机、备用电池等设备，保障供电正常": "проверяет генератор, резервные батареи и другое оборудование, обеспечивает нормальное питание", "负责设备收纳、运输及日常维护，检查备用电池": "отвечает за хранение, транспортировку и обслуживание оборудования, проверяет резервные батареи", "记录云台侦查数据、照明状态，整理归档": "записывает и архивирует данные разведки подвеса и состояние освещения", "巡检所有设备及备用电池，保障供电与硬件正常": "проверяет все оборудование и резервные батареи, обеспечивает питание и исправность аппаратуры",
    "统筹侦察搜救全流程，协调岗位配合，对接总部，下达相关指令并把控安全。": "руководит всем процессом разведки и спасения, координирует роли, взаимодействует со штабом, выдает команды и контролирует безопасность.", "操作飞行平台及遥控器，控制无人机起降巡航，配合相机完成侦察拍摄。": "эксплуатирует летную платформу и пульт, управляет взлетом, посадкой и полетом, помогает камере выполнять разведсъемку.", "查看相机实时画面，识别被困人员及隐患，反馈侦察数据并提供建议。": "просматривает видео камеры, выявляет людей и риски, передает разведданные и рекомендации.", "检查、调试、维护各类设备，确保正常运行，处理小型设备故障。": "проверяет, настраивает и обслуживает оборудование, обеспечивает работу и устраняет мелкие отказы.", "操作车载指挥系统，监控画面、保障数据回传，做好记录上报。": "эксплуатирует бортовую командную систему, контролирует видео, обеспечивает передачу данных и отчетность.",
    "统筹高层灭火全流程，协调岗位协同，对接总部，下达灭火相关指令。": "руководит всем процессом высотного пожаротушения, координирует роли, взаимодействует со штабом и выдает команды.", "操作飞行平台及遥控器，控制无人机抵达灭火点位，配合监测火情。": "управляет летной платформой и пультом, направляет БПЛА к точке тушения и поддерживает мониторинг пожара.", "监测火情蔓延及起火点，分析火势，反馈数据并辅助调整灭火方案。": "контролирует распространение пожара и очаги, анализирует обстановку, передает данные и помогает корректировать план тушения.", "操作、调试各类灭火设备，配合无人机完成高层灭火作业。": "эксплуатирует и настраивает пожарное оборудование, совместно с БПЛА выполняет высотное тушение.", "检查、启动、维护供电设备，保障持续稳定供电，处理供电异常。": "проверяет, запускает и обслуживает оборудование питания, обеспечивает стабильное питание и устраняет аномалии.", "操作指挥系统，监控现场及设备状态，保障数据回传，做好灭火记录。": "эксплуатирует командную систему, контролирует площадку и оборудование, обеспечивает передачу данных и ведет записи тушения.",
}


DOCX_EXACT_EN.update({
    "工业无人机平台 + 可见光 / 红外": "Industrial UAV platform + visible-light / infrared payloads",
    "多旋翼应急搜救无人机": "Multi-rotor emergency search-and-rescue UAV",
    "可见光相机 + 红外热成像 可选喊话器 / 探照灯 / 抛投器": "Visible-light camera + infrared thermal imaging; optional loudspeaker / searchlight / dropper",
    "电机：高效无刷电机": "Motor: high-efficiency brushless motor",
    "桨叶：碳素桨叶": "Propeller Blades: carbon propeller blades",
    "双冗余定位：支持北斗、GPS模式。": "Dual-Redundant Positioning: supports BeiDou and GPS modes.",
    "悬停精度：垂直精度：≤±0.5m,水平精度：≤±1m": "Hovering Accuracy: vertical accuracy <= +/-0.5 m, horizontal accuracy <= +/-1 m",
    "悬停精度：垂直精度：≤±0.5m，水平精度：≤±0.5m": "Hovering Accuracy: vertical accuracy <= +/-0.5 m, horizontal accuracy <= +/-0.5 m",
    "防雨性能：≥中雨": "Rain Resistance: medium rain or above",
    "自动收放线：支持": "Automatic Cable Reeling: supported",
    "系留线缆材质：供电：轻型铜合金导线；数据：抗微弯单模耐高温光纤；": "Tether Cable Material: power supply uses lightweight copper-alloy conductor; data uses micro-bending-resistant single-mode high-temperature optical fiber.",
    "安全设计：强电、弱电分离设计；输出过流、过压、过热保护；输出独立开关控制": "Safety Design: strong/weak-current separation; output overcurrent, overvoltage, and overtemperature protection; independent output switch control",
    "面板显示：实时输出电压；实时输出电流；实时扭力大小": "Panel Display: real-time output voltage, output current, and torque",
    "屏幕：应内置7英寸的显示屏，显示屏为触摸式，支持多点触控": "Screen: built-in 7-inch touch display with multi-touch support",
    "遥控通道：≥16个": "Remote-Control Channels: >=16",
    "集成功能：一体化集成图像传输、数据传输及遥控等功能": "Integrated Functions: integrated image transmission, data transmission, remote control, and related functions",
    "数据交互功能：设备应能对无人机进行图像传输、数据传输及遥控，应能通过Type-C、USB接口与PC进行连接，并实现数据传输、图传显示": "Data Interaction: the device supports UAV image transmission, data transmission, and remote control; it connects to a PC through Type-C or USB for data transfer and image display.",
    "视频输出：显示图像分辨率应≥1920*1080": "Video Output: display resolution >=1920*1080",
    "控制功能：支持飞行控制、载荷控制、一键起飞、一键返航、航道规划": "Control Functions: supports flight control, payload control, one-key takeoff, one-key return, and route planning",
    "支持图像实时显示": "Supports real-time image display",
    "支持飞行数据显示": "Supports flight data display",
    "可控制挂载：云台摄像机、投掷器、喊话器等": "Controllable Payloads: gimbal camera, dropper, loudspeaker, etc.",
    "可控制挂载：云台摄像机、投掷器、喊话器、气体探测仪等": "Controllable Payloads: gimbal camera, dropper, loudspeaker, gas detector, etc.",
    "工作方式：无人机遥控PWM开启": "Operating Method: UAV remote-control PWM activation",
    "使用方式：可快速安装，拆解": "Usage Method: quick installation and removal",
    "自动温度保护起点：60℃（随温度上升，功率降低）": "Automatic Temperature Protection Point: 60 deg C; power decreases as temperature rises",
    "材质：轻壳材料铝合金": "Material: lightweight shell aluminum alloy",
    "类型：12S锂电池": "Type: 12S lithium battery",
    "12S 锂电池，容量≥12000mAh": "12S lithium battery, capacity >=12000 mAh",
    "材质：防火木+铝材包边+EVA内衬": "Material: fire-resistant wood + aluminum edging + EVA lining",
    "放置功能：飞行器+遥控器+地面控制站+挂载全套放入": "Storage Function: holds the aircraft, remote controller, ground control station, and full payload set",
    "冷却方式：风冷": "Cooling Method: air cooling",
    "燃油：92以上汽油": "Fuel: gasoline grade 92 or above",
    "启动方式：电启动": "Starting Method: electric start",
    "名称：参数": "Name: Parameter",
    "材质：航空铝合金": "Material: aerospace aluminum alloy",
    "材质：碳纤维": "Material: carbon fiber",
    "尺寸：153.5 (长)×148 (宽)×235.1 (高) mm": "Dimensions: 153.5 (L) x 148 (W) x 235.1 (H) mm",
    "角度工作范围：航向：360°×N；俯仰：-120°~30°；横滚：±40°": "Angle Working Range: heading 360 deg x N; pitch -120 deg to 30 deg; roll +/-40 deg",
    "云台控制模式：速度控制、角度控制": "Gimbal Control Mode: speed control and angle control",
    "控制信号方式：S.BUS、TTL 串口通信、TCP、UDP": "Control Signal Method: S.BUS, TTL serial communication, TCP, UDP",
    "声音强度:≥100dB（1m距离）": "Sound Intensity: >=100 dB at 1 m",
    "接收距离:10公里（无遮挡情况下）": "Receiving Distance: 10 km without obstruction",
    "接收距离:10 公里（无遮挡情况下）": "Receiving Distance: 10 km without obstruction",
    "可见光分辨率：1920×1080 热成像分辨率：1280×1024": "Visible-Light Resolution: 1920x1080; thermal imaging resolution: 1280x1024",
    "支持一键起飞，一键返回飞行功能": "Supports one-key takeoff and one-key return",
    "支持低电自动返航、信号丢失自动返航": "Supports automatic return on low battery and automatic return after signal loss",
    "支持带宽：1.4MHz/3MHz/5MHz/10MHz/15MHz/20MHz 及其他可变带宽": "Supported Bandwidth: 1.4/3/5/10/15/20 MHz and other variable bandwidths",
    "支持多路实时高清视频传输": "Supports multi-channel real-time HD video transmission",
    "散热：无风扇自散热设计": "Heat Dissipation: fanless passive cooling design",
    "软件功能：故障隔离、数据回滚、故障监控、故障弱化、高可靠性设计": "Software Functions: fault isolation, data rollback, fault monitoring, fault degradation, and high-reliability design",
    "馈源方式：偏馈": "Feed Method: offset feed",
    "工作频段：发射：13.75~14.5GHz接收：10.7~12.75GHz": "Operating Band: transmit 13.75-14.5 GHz; receive 10.7-12.75 GHz",
    "调节范围：方位 ±200°，俯仰 10°~90°，极化 ±90°": "Adjustment Range: azimuth +/-200 deg, pitch 10-90 deg, polarization +/-90 deg",
    "供电：AC110-230V，额定 200W，最大 500W": "Power Supply: AC110-230 V, rated 200 W, max 500 W",
    "工作环境：-30℃~+55℃，湿度 0-95%": "Operating Environment: -30 deg C to +55 deg C, humidity 0-95%",
    "载波带宽：5/10/20MHz，灵活可配": "Carrier Bandwidth: 5/10/20 MHz, flexibly configurable",
    "调制方式：BPSK/QPSK/16QAM/64QAM（自适应）": "Modulation: BPSK/QPSK/16QAM/64QAM adaptive",
    "传输能力：峰值速率 52Mbps@20MHz，最高可选 92Mbps": "Transmission Capacity: peak rate 52 Mbps at 20 MHz, optional up to 92 Mbps",
    "视频输入：支持 IP 网络视频输入": "Video Input: supports IP network video input",
    "加密方式：DES/AES128/AES256 (可选配)": "Encryption: DES/AES128/AES256 optional",
    "供电方式：DC 15-36V 供电": "Power-Supply Mode: DC 15-36 V",
    "天线口径1.2m；工作温度-30℃~+55℃": "Antenna aperture 1.2 m; operating temperature -30 deg C to +55 deg C",
    "系留消防无人机参数": "Tethered firefighting UAV parameters",
    "系留模式飞行时间：12h": "Tethered Mode Flight Time: 12 h",
    "最大相对飞行高度：150m（系留情况）": "Max Relative Flight Height: 150 m in tethered mode",
    "破窗能力：单发18米直接穿透钢化双层真空玻璃（厚16mm）": "Window-Breaking Capability: a single shot directly penetrates tempered double-layer vacuum glass, 16 mm thick, at 18 m",
    "发射数量：2发/4发": "Launch Quantity: 2 rounds / 4 rounds",
    "水带长度：100-150m（可定制）": "Hose Length: 100-150 m, customizable",
    "安装方式：快拆结构": "Installation Method: quick-release structure",
    "水管长度：150m（可定制）": "Water Hose Length: 150 m, customizable",
    "设备保障员": "Equipment Support Specialist",
})


DOCX_EXACT_RU.update({
    "工业无人机平台 + 可见光 / 红外": "Промышленная платформа БПЛА + видимый / инфракрасный канал",
    "多旋翼应急搜救无人机": "Мультироторный БПЛА для аварийного поиска и спасения",
    "可见光相机 + 红外热成像 可选喊话器 / 探照灯 / 抛投器": "камера видимого диапазона + тепловизор; опции: громкоговоритель / прожектор / сбрасыватель",
    "电机：高效无刷电机": "Двигатель: высокоэффективный бесщеточный двигатель",
    "桨叶：碳素桨叶": "Лопасти: карбоновые лопасти",
    "双冗余定位：支持北斗、GPS模式。": "Двойное резервированное позиционирование: поддержка BeiDou и GPS.",
    "悬停精度：垂直精度：≤±0.5m,水平精度：≤±1m": "Точность висения: вертикальная <= +/-0,5 м, горизонтальная <= +/-1 м",
    "悬停精度：垂直精度：≤±0.5m，水平精度：≤±0.5m": "Точность висения: вертикальная <= +/-0,5 м, горизонтальная <= +/-0,5 м",
    "防雨性能：≥中雨": "Защита от дождя: средний дождь и выше",
    "自动收放线：支持": "Автоматическая смотка кабеля: поддерживается",
    "系留线缆材质：供电：轻型铜合金导线；数据：抗微弯单模耐高温光纤；": "Материал привязного кабеля: питание - легкий медно-сплавный провод; данные - одномодовое термостойкое волокно, устойчивое к микросгибам.",
    "安全设计：强电、弱电分离设计；输出过流、过压、过热保护；输出独立开关控制": "Безопасная конструкция: разделение силовых и слаботочных цепей; защита от сверхтока, перенапряжения и перегрева; независимое управление выходным выключателем",
    "面板显示：实时输出电压；实时输出电流；实时扭力大小": "Индикация панели: выходное напряжение, выходной ток и момент в реальном времени",
    "屏幕：应内置7英寸的显示屏，显示屏为触摸式，支持多点触控": "Экран: встроенный 7-дюймовый сенсорный дисплей с мультитачем",
    "遥控通道：≥16个": "Каналы управления: >=16",
    "集成功能：一体化集成图像传输、数据传输及遥控等功能": "Интегрированные функции: передача изображения, передача данных, дистанционное управление и связанные функции",
    "数据交互功能：设备应能对无人机进行图像传输、数据传输及遥控，应能通过Type-C、USB接口与PC进行连接，并实现数据传输、图传显示": "Обмен данными: устройство поддерживает передачу изображения, данных и управление БПЛА; подключается к ПК через Type-C или USB для передачи данных и отображения видео.",
    "视频输出：显示图像分辨率应≥1920*1080": "Видеовыход: разрешение отображения >=1920*1080",
    "控制功能：支持飞行控制、载荷控制、一键起飞、一键返航、航道规划": "Функции управления: управление полетом, нагрузкой, взлет одной кнопкой, возврат одной кнопкой и планирование маршрута",
    "支持图像实时显示": "Поддерживает отображение изображения в реальном времени",
    "支持飞行数据显示": "Поддерживает отображение полетных данных",
    "可控制挂载：云台摄像机、投掷器、喊话器等": "Управляемые нагрузки: камера на подвесе, сбрасыватель, громкоговоритель и др.",
    "可控制挂载：云台摄像机、投掷器、喊话器、气体探测仪等": "Управляемые нагрузки: камера на подвесе, сбрасыватель, громкоговоритель, газоанализатор и др.",
    "工作方式：无人机遥控PWM开启": "Режим работы: включение PWM с пульта БПЛА",
    "使用方式：可快速安装，拆解": "Способ применения: быстрая установка и демонтаж",
    "自动温度保护起点：60℃（随温度上升，功率降低）": "Порог температурной защиты: 60 град. C; мощность снижается при росте температуры",
    "材质：轻壳材料铝合金": "Материал: легкий алюминиевый сплав корпуса",
    "类型：12S锂电池": "Тип: литиевая батарея 12S",
    "12S 锂电池，容量≥12000mAh": "литиевая батарея 12S, емкость >=12000 мАч",
    "材质：防火木+铝材包边+EVA内衬": "Материал: огнестойкая древесина + алюминиевая окантовка + подкладка EVA",
    "放置功能：飞行器+遥控器+地面控制站+挂载全套放入": "Функция хранения: помещает летательный аппарат, пульт, наземную станцию и полный комплект нагрузок",
    "冷却方式：风冷": "Охлаждение: воздушное",
    "燃油：92以上汽油": "Топливо: бензин 92 и выше",
    "启动方式：电启动": "Запуск: электрический",
    "名称：参数": "Название: параметр",
    "材质：航空铝合金": "Материал: авиационный алюминиевый сплав",
    "材质：碳纤维": "Материал: углеродное волокно",
    "尺寸：153.5 (长)×148 (宽)×235.1 (高) mm": "Размеры: 153,5 (Д) x 148 (Ш) x 235,1 (В) мм",
    "角度工作范围：航向：360°×N；俯仰：-120°~30°；横滚：±40°": "Рабочий диапазон углов: курс 360 град. x N; тангаж -120...30 град.; крен +/-40 град.",
    "云台控制模式：速度控制、角度控制": "Режим управления подвесом: управление скоростью и углом",
    "控制信号方式：S.BUS、TTL 串口通信、TCP、UDP": "Способ управляющего сигнала: S.BUS, последовательная связь TTL, TCP, UDP",
    "声音强度:≥100dB（1m距离）": "Уровень звука: >=100 дБ на 1 м",
    "接收距离:10公里（无遮挡情况下）": "Дальность приема: 10 км без препятствий",
    "接收距离:10 公里（无遮挡情况下）": "Дальность приема: 10 км без препятствий",
    "可见光分辨率：1920×1080 热成像分辨率：1280×1024": "Разрешение видимого канала: 1920x1080; разрешение тепловизора: 1280x1024",
    "支持一键起飞，一键返回飞行功能": "Поддержка взлета одной кнопкой и возврата одной кнопкой",
    "支持低电自动返航、信号丢失自动返航": "Поддержка автоматического возврата при низком заряде и потере сигнала",
    "支持带宽：1.4MHz/3MHz/5MHz/10MHz/15MHz/20MHz 及其他可变带宽": "Поддерживаемая полоса: 1,4/3/5/10/15/20 МГц и другие переменные полосы",
    "支持多路实时高清视频传输": "Поддержка многоканальной передачи HD-видео в реальном времени",
    "散热：无风扇自散热设计": "Охлаждение: пассивная безвентиляторная конструкция",
    "软件功能：故障隔离、数据回滚、故障监控、故障弱化、高可靠性设计": "Функции ПО: изоляция отказов, откат данных, мониторинг отказов, деградация отказов и высоконадежная конструкция",
    "馈源方式：偏馈": "Способ питания антенны: офсетный",
    "工作频段：发射：13.75~14.5GHz接收：10.7~12.75GHz": "Рабочий диапазон: передача 13,75-14,5 ГГц; прием 10,7-12,75 ГГц",
    "调节范围：方位 ±200°，俯仰 10°~90°，极化 ±90°": "Диапазон регулировки: азимут +/-200 град., тангаж 10-90 град., поляризация +/-90 град.",
    "供电：AC110-230V，额定 200W，最大 500W": "Питание: AC110-230 В, номинал 200 Вт, максимум 500 Вт",
    "工作环境：-30℃~+55℃，湿度 0-95%": "Рабочая среда: -30...+55 град. C, влажность 0-95%",
    "载波带宽：5/10/20MHz，灵活可配": "Полоса несущей: 5/10/20 МГц, гибко настраивается",
    "调制方式：BPSK/QPSK/16QAM/64QAM（自适应）": "Модуляция: BPSK/QPSK/16QAM/64QAM, адаптивная",
    "传输能力：峰值速率 52Mbps@20MHz，最高可选 92Mbps": "Пропускная способность: пик 52 Мбит/с при 20 МГц, опция до 92 Мбит/с",
    "视频输入：支持 IP 网络视频输入": "Видеовход: поддерживает IP-сетевое видео",
    "加密方式：DES/AES128/AES256 (可选配)": "Шифрование: DES/AES128/AES256 опционально",
    "供电方式：DC 15-36V 供电": "Способ питания: DC 15-36 В",
    "天线口径1.2m；工作温度-30℃~+55℃": "Диаметр антенны 1,2 м; рабочая температура -30...+55 град. C",
    "系留消防无人机参数": "Параметры привязного пожарного БПЛА",
    "系留模式飞行时间：12h": "Время полета в привязном режиме: 12 ч",
    "最大相对飞行高度：150m（系留情况）": "Макс. относительная высота: 150 м в привязном режиме",
    "破窗能力：单发18米直接穿透钢化双层真空玻璃（厚16mm）": "Способность пробивания: один выстрел пробивает закаленное двухслойное вакуумное стекло толщиной 16 мм на 18 м",
    "发射数量：2发/4发": "Количество пусков: 2 / 4",
    "水带长度：100-150m（可定制）": "Длина рукава: 100-150 м, настраиваемая",
    "安装方式：快拆结构": "Способ монтажа: быстросъемная конструкция",
    "水管长度：150m（可定制）": "Длина водяного рукава: 150 м, настраиваемая",
    "设备保障员": "специалист по оборудованию",
})


PUNCT_REPLACEMENTS = {
    "：": ": ",
    "；": "; ",
    "，": ", ",
    "。": ".",
    "、": ", ",
    "（": " (",
    "）": ") ",
    "～": "-",
    "＞": ">",
    "＜": "<",
}


def _apply_lexicon(text: str, locale: str) -> str:
    labeled = translate_label(text, locale)
    if labeled != text:
        return labeled
    terms = LEXICON_RU if locale == "ru" else LEXICON_EN
    out = text
    for source in sorted(terms, key=len, reverse=True):
        out = out.replace(source, terms[source])
    out = replace_value(out, locale)
    for source, target in PUNCT_REPLACEMENTS.items():
        out = out.replace(source, target)
    return re.sub(r"\s+", " ", out).strip()


def translate_docx_text(text: str, locale: str) -> str:
    if locale == "cn":
        return text
    exact = DOCX_EXACT_RU if locale == "ru" else DOCX_EXACT_EN
    if text in exact:
        return exact[text]
    figure = re.match(r"^图\s*([0-9]+)\s*(.*)$", text)
    if figure:
        noun = _apply_lexicon(figure.group(2).strip(), locale) if figure.group(2).strip() else ("изображение" if locale == "ru" else "image")
        prefix = "Рисунок" if locale == "ru" else "Figure"
        return f"{prefix} {figure.group(1)}: {noun}"
    if "：" in text or ":" in text:
        sep = "：" if "：" in text else ":"
        key, value = text.split(sep, 1)
        translated_key = translate_label(key.strip(), locale)
        if translated_key == key.strip():
            translated_key = _apply_lexicon(key.strip(), locale)
        return f"{translated_key}: {_apply_lexicon(value.strip(), locale)}"
    return _apply_lexicon(text, locale)


def translate_label(label: str, locale: str) -> str:
    if locale == "ru":
        return PARAM_RU.get(label) or EXTRA_LABEL_RU.get(label) or TITLE_RU.get(label) or GENERIC_TEXT_RU.get(label) or label
    return PARAM_EN.get(label) or EXTRA_LABEL_EN.get(label) or TITLE_EN.get(label) or GENERIC_TEXT_EN.get(label) or label


def translate_cell(cell: str, locale: str) -> str:
    translated = translate_label(cell, locale)
    if translated == cell:
        translated = replace_value(cell, locale)
    return translated


def translate_table(rows: list[list[str]], locale: str) -> list[list[str]]:
    return [[translate_cell(cell, locale) for cell in row] for row in rows]


def table_to_mapping(rows: list[list[str]], locale: str) -> dict[str, str]:
    output: dict[str, str] = {}
    for row in rows[1:]:
        if len(row) < 2:
            continue
        output[translate_label(row[0], locale)] = replace_value(row[1], locale)
    return output


def table_html(title: str, rows: list[list[str]], locale: str) -> str:
    translated = translate_table(rows, locale)
    body = []
    for ri, row in enumerate(translated):
        tag = "th" if ri == 0 else "td"
        cells = "".join(f"<{tag}>{esc(cell)}</{tag}>" for cell in row)
        body.append(f"<tr>{cells}</tr>")
    return f"<h3>{esc(title)}</h3><div class=\"table-wrap\"><table>{''.join(body)}</table></div>"


def section_html(title: str, items: list[str]) -> str:
    if not items:
        return f"<h3>{esc(title)}</h3>"
    if len(items) > 1 and all(len(item) < 260 for item in items[1:]):
        first = f"<p>{esc(items[0])}</p>" if len(items[0]) >= 120 else ""
        list_items = items if not first else items[1:]
        return f"<h3>{esc(title)}</h3>{first}<ul>{''.join(f'<li>{esc(item)}</li>' for item in list_items)}</ul>"
    return f"<h3>{esc(title)}</h3>{''.join(f'<p>{esc(item)}</p>' for item in items)}"


def technical_lines(blocks: dict[str, Any], stop_titles: set[str] | None = None) -> list[str]:
    stop_titles = stop_titles or {"系统组成", "产品配置清单", "备品备件清单", "人员配置单"}
    lines: list[str] = []
    capture = False
    for para in blocks["paragraphs"]:
        text = para["text"]
        if text == "技术参数":
            capture = True
            continue
        if capture and text in stop_titles:
            break
        if capture and ("：" in text or ":" in text):
            lines.append(text)
    return lines


def lines_to_specs(lines: list[str], locale: str) -> dict[str, str]:
    specs: dict[str, str] = {}
    for line in lines:
        sep = "：" if "：" in line else ":"
        key, value = line.split(sep, 1)
        specs[translate_label(key.strip(), locale)] = replace_value(value.strip(), locale)
    return specs


def lines_to_html(lines: list[str], locale: str) -> str:
    if not lines:
        return ""
    return "<h3>{}</h3><ul>{}</ul>".format(
        esc(TITLE_RU["技术参数"] if locale == "ru" else TITLE_EN["技术参数"]),
        "".join(f"<li><strong>{esc(translate_label(line.split('：', 1)[0] if '：' in line else line.split(':', 1)[0], locale))}:</strong> {esc(replace_value((line.split('：', 1)[1] if '：' in line else line.split(':', 1)[1]).strip(), locale))}</li>" for line in lines if ("：" in line or ":" in line)),
    )


def table_to_mapping_cn(rows: list[list[str]]) -> dict[str, str]:
    output: dict[str, str] = {}
    for row in rows[1:]:
        if len(row) < 2:
            continue
        output[row[0]] = row[1]
    return output


def strict_table_to_mapping(rows: list[list[str]], locale: str) -> dict[str, str]:
    if locale == "cn":
        return table_to_mapping_cn(rows)
    output: dict[str, str] = {}
    for row in rows[1:]:
        if len(row) < 2:
            continue
        output[translate_docx_text(row[0], locale)] = translate_docx_text(row[1], locale)
    return output


def strict_translate_table(rows: list[list[str]], locale: str) -> list[list[str]]:
    if locale == "cn":
        return rows
    return [[translate_docx_text(cell, locale) for cell in row] for row in rows]


def strict_table_html(rows: list[list[str]], locale: str, title: str | None = None) -> str:
    translated = strict_translate_table(rows, locale)
    body = []
    for ri, row in enumerate(translated):
        tag = "th" if ri == 0 else "td"
        body.append("<tr>{}</tr>".format("".join(f"<{tag}>{esc(cell)}</{tag}>" for cell in row)))
    title_html = f"<h3>{esc(title)}</h3>" if title else ""
    return f'{title_html}<div class="table-wrap"><table>{"".join(body)}</table></div>'


def paragraph_level(style: str) -> str | None:
    if "1级标题" in style or "Heading 1" in style:
        return "h3"
    if "2级标题" in style or "Heading 2" in style:
        return "h4"
    if "3级标题" in style or "Heading 3" in style:
        return "h5"
    if "4级标题" in style or "Heading 4" in style:
        return "h6"
    return None


def is_figure_style(style: str) -> bool:
    return "图题" in style or "图（居中）" in style


def build_strict_detail(blocks: dict[str, Any], locale: str, image_paths: list[str]) -> str:
    parts: list[str] = []
    image_index = 0

    for paragraph in blocks.get("paragraphs", []):
        text = paragraph.get("text", "")
        style = paragraph.get("style", "")
        if not text:
            continue
        translated = translate_docx_text(text, locale)
        level = paragraph_level(style)
        if level:
            parts.append(f"<{level}>{esc(translated)}</{level}>")
            continue
        if is_figure_style(style):
            if image_index < len(image_paths):
                parts.append(
                    f'<figure><img src="{esc(image_paths[image_index])}" alt="{esc(translated)}" />'
                    f"<figcaption>{esc(translated)}</figcaption></figure>"
                )
                image_index += 1
            else:
                parts.append(f'<p class="figure-caption">{esc(translated)}</p>')
            continue
        parts.append(f"<p>{esc(translated)}</p>")

    while image_index < len(image_paths):
        alt = translate_docx_text(f"图 {image_index + 1}", locale)
        parts.append(f'<figure><img src="{esc(image_paths[image_index])}" alt="{esc(alt)}" /></figure>')
        image_index += 1

    table_titles = DETAIL_TABLE_TITLES.get(blocks.get("handle", ""), {}).get(locale, [])
    for idx, rows in enumerate(blocks.get("tables", [])):
        title = table_titles[idx] if idx < len(table_titles) else None
        parts.append(strict_table_html(rows, locale, title))

    return "".join(parts)


def first_body_paragraph(blocks: dict[str, Any]) -> str:
    for paragraph in blocks.get("paragraphs", []):
        style = paragraph.get("style", "")
        text = paragraph.get("text", "")
        if text and not paragraph_level(style) and not is_figure_style(style):
            return text
    return ""


def apply_strict_docx_content(handle: str, record: Any, blocks: dict[str, Any]) -> None:
    detail_blocks = dict(blocks)
    detail_blocks["handle"] = handle
    image_paths = list(record.extra.get("docx_image_paths") or ([record.main_image] if record.main_image else []))
    record.extra["docx_image_paths"] = image_paths
    record.extra["parameter_tables"] = blocks.get("tables", [])
    record.extra["parameter_tables_en"] = [strict_translate_table(rows, "en") for rows in blocks.get("tables", [])]
    record.extra["parameter_tables_ru"] = [strict_translate_table(rows, "ru") for rows in blocks.get("tables", [])]

    record.detail_html = build_strict_detail(detail_blocks, "cn", image_paths)
    record.detail_html_en = build_strict_detail(detail_blocks, "en", image_paths)
    record.detail_html_ru = build_strict_detail(detail_blocks, "ru", image_paths)

    if blocks.get("tables"):
        record.parameters = strict_table_to_mapping(blocks["tables"][0], "cn")
        record.parameters_en = strict_table_to_mapping(blocks["tables"][0], "en")
        record.parameters_ru = strict_table_to_mapping(blocks["tables"][0], "ru")

    summary_source = first_body_paragraph(blocks)
    if summary_source:
        record.summary = summary_source
        record.summary_en = translate_docx_text(summary_source, "en")
        record.summary_ru = translate_docx_text(summary_source, "ru")


def build_docx_detail(handle: str, record: Any) -> None:
    source_path = DOCX_MAP[handle]
    if source_path.exists():
        blocks = extract_docx(source_path)
    elif record.json_path.exists():
        previous = json.loads(record.json_path.read_text(encoding="utf-8"))
        blocks = previous.get("source_docx_blocks")
        if not blocks:
            if handle not in STRICT_DOCX_HANDLES:
                return
            raise FileNotFoundError(source_path)
    else:
        if handle not in STRICT_DOCX_HANDLES:
            return
        raise FileNotFoundError(source_path)
    record.extra["source_docx_blocks"] = blocks

    if handle in STRICT_DOCX_HANDLES:
        apply_strict_docx_content(handle, record, blocks)
        return

    if handle in NARRATIVE:
        for locale in ("en", "ru"):
            data = NARRATIVE[handle][locale]
            detail = [section_html(title, body) for title, body in data["sections"]]
            if record.main_image:
                detail.insert(1, f'<figure><img src="{esc(record.main_image)}" alt="{esc(data["summary"][:90])}" /></figure>')
            spec_lines = technical_lines(blocks)
            if spec_lines:
                detail.append(lines_to_html(spec_lines, locale))
            if blocks["tables"]:
                titles = DETAIL_TABLE_TITLES.get(handle, {}).get(locale, [])
                for idx, rows in enumerate(blocks["tables"]):
                    if handle in DETAIL_TABLE_TITLES and idx >= 3:
                        continue
                    title = titles[idx] if idx < len(titles) else (TITLE_RU["基本参数"] if locale == "ru" else TITLE_EN["基本参数"])
                    detail.append(table_html(title, rows, locale))
            if locale == "ru":
                record.summary_ru = data["summary"]
                record.key_application_ru = data["key_application"]
                record.detail_html_ru = "".join(detail)
                if spec_lines:
                    record.parameters_ru = lines_to_specs(spec_lines, "ru")
                elif blocks["tables"]:
                    record.parameters_ru = table_to_mapping(blocks["tables"][0], "ru")
            else:
                record.summary_en = data["summary"]
                record.key_application_en = data["key_application"]
                record.detail_html_en = "".join(detail)
                if spec_lines:
                    record.parameters_en = lines_to_specs(spec_lines, "en")
                elif blocks["tables"]:
                    record.parameters_en = table_to_mapping(blocks["tables"][0], "en")
        return

    lines = technical_lines(blocks)
    for locale in ("en", "ru"):
        simple_summary = SIMPLE_PLATFORM_SUMMARY_RU.get(handle) if locale == "ru" else SIMPLE_PLATFORM_SUMMARY_EN.get(handle)
        title = TITLE_RU["产品简介"] if locale == "ru" else TITLE_EN["产品简介"]
        table_title = TITLE_RU["无人机参数"] if locale == "ru" else TITLE_EN["无人机参数"]
        doc_caption = blocks["paragraphs"][0]["text"] if blocks["paragraphs"] else record.product_name_en
        caption = translate_cell(doc_caption, locale)
        detail = [section_html(title, [simple_summary or caption])]
        if record.main_image:
            detail.append(f'<figure><img src="{esc(record.main_image)}" alt="{esc(caption)}" /></figure>')
        if lines:
            detail.append(lines_to_html(lines, locale))
        if blocks["tables"]:
            detail.append(table_html(table_title, blocks["tables"][0], locale))

        if locale == "ru":
            if simple_summary:
                record.summary_ru = simple_summary
            record.detail_html_ru = "".join(detail)
            if blocks["tables"]:
                record.parameters_ru = table_to_mapping(blocks["tables"][0], "ru")
        else:
            if simple_summary:
                record.summary_en = simple_summary
            record.detail_html_en = "".join(detail)
            if blocks["tables"]:
                record.parameters_en = table_to_mapping(blocks["tables"][0], "en")


def apply_docx_content(records: list[Any]) -> None:
    for record in records:
        if record.handle in DOCX_MAP:
            build_docx_detail(record.handle, record)
