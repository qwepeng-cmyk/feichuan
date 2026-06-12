#!/usr/bin/env python3
"""Sync UAV solution and case content into the local SQLite database."""

from __future__ import annotations

import json
import re
import shutil
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "ntet.db"
SOLUTION_DIR = ROOT / "\u7f51\u7ad9\u8d44\u6599" / "\u65e0\u4eba\u673a\u89e3\u51b3\u65b9\u6848"
PUBLIC_CASE_DIR = ROOT / "public" / "cases"


SOLUTION_TRANSLATIONS: dict[str, dict[str, Any]] = {
    "power-tower-inspection-uav-solution": {
        "category_id": "02_InfrastructureProtection",
        "category_name": "Infrastructure Protection",
        "product_name_en": "Power Tower Inspection UAV Solution",
        "product_name_ru": "Решение БПЛА для инспекции опор ЛЭП",
        "summary_en": "A UAV-based inspection solution for transmission-line operations, covering routine patrols, fault positioning, disaster response, tree-obstruction checks, and standardized reporting.",
        "summary_ru": "Решение на базе БПЛА для эксплуатации линий электропередачи: плановые обходы, локализация неисправностей, аварийные осмотры, контроль древесных помех и выпуск отчетов.",
        "key_application_en": "Transmission corridors, towers, insulators, fittings, tree-obstruction risks, and post-disaster patrols.",
        "key_application_ru": "Коридоры ЛЭП, опоры, изоляторы, арматура, риски от растительности и осмотры после ЧС.",
        "parameters_en": {
            "Primary scenarios": "Routine transmission-line inspection, tower inspection, disaster patrol, tree-obstruction and external-risk checks",
            "Recommended platforms": "Power Tower Inspection UAV; Medium/Long-Range UAV Inspection System; Smart Substation Autonomous UAV Inspection System",
            "Typical outputs": "Visible-light imagery, thermal data, flight tracks, defect archives, inspection reports",
        },
        "parameters_ru": {
            "Основные сценарии": "Плановая инспекция ЛЭП, осмотр опор, аварийные обходы, контроль растительности и внешних рисков",
            "Рекомендуемые платформы": "БПЛА для инспекции опор ЛЭП; средне- и дальнедистанционная система инспекции БПЛА; автономная система инспекции подстанций",
            "Типовые результаты": "Фото, тепловые данные, треки полета, архив дефектов, отчеты инспекции",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Transmission lines cross mountains, forests, river valleys, and complex corridors. Manual walking patrols and tower climbing are risky and slow, while tower bodies, insulators, and fittings often have blind spots. After severe weather, traditional inspection methods struggle to cover long corridors quickly.</p><h2>UAV-Enabled Upgrade</h2><p>Automated flight routes, visible-light and thermal payloads, AI defect recognition, and inspection-result management turn manual judgment into a data-driven, traceable, and reviewable maintenance process.</p><h2>Solution</h2><p>The solution supports routine transmission-line inspection, fault and disaster emergency patrols, tree-obstruction and external-risk checks, and standardized report output. The system can collect imagery, temperature, and track data by tower number and archive defects for follow-up maintenance.</p><h2>Related Equipment</h2><p>Power Tower Inspection UAV, Medium/Long-Range UAV Inspection System, Smart Substation Autonomous UAV Inspection System.</p><h2>Related Cases</h2><p>Zhaoqing long-distance power-line inspection, LiDAR tree-obstruction inspection, and Southern Grid wildfire-prevention inspection.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Линии электропередачи проходят через горы, леса, долины рек и сложные коридоры. Пеший обход и подъем на опоры связаны с риском и занимают много времени, а элементы опор, изоляторы и арматура часто имеют зоны ограниченного обзора. После сложной погоды традиционные методы не позволяют быстро закрыть протяженные участки.</p><h2>Как БПЛА повышают эффективность</h2><p>Автоматические маршруты, видимые и тепловизионные нагрузки, распознавание дефектов на базе ИИ и управление результатами переводят инспекцию в цифровой, прослеживаемый и проверяемый процесс.</p><h2>Решение</h2><p>Решение покрывает плановые инспекции ЛЭП, аварийные обходы после отказов и ЧС, контроль древесных помех и внешних рисков, а также стандартизированный выпуск отчетов. Система собирает изображения, температурные данные и треки по номерам опор и архивирует дефекты для последующего обслуживания.</p><h2>Связанное оборудование</h2><p>БПЛА для инспекции опор ЛЭП, средне- и дальнедистанционная система инспекции БПЛА, автономная система инспекции подстанций.</p><h2>Связанные проекты</h2><p>Дальняя инспекция ЛЭП в Чжаоцине, инспекция древесных помех с LiDAR, пожарная инспекция Southern Grid.</p>",
    },
    "high-rise-firefighting-uav-solution": {
        "category_id": "04_EmergencyRescue",
        "category_name": "Emergency & Disaster Rescue",
        "product_name_en": "High-Rise Firefighting UAV Solution",
        "product_name_ru": "Решение БПЛА для тушения высотных пожаров",
        "summary_en": "A tethered UAV firefighting solution for high-rise buildings, dense urban blocks, and industrial parks, combining elevated water/agent delivery, window breaking, smoke exhaust, thermal reconnaissance, and command linkage.",
        "summary_ru": "Решение с привязным БПЛА для высотных зданий, плотной городской застройки и промышленных парков: подача воды или состава с высоты, вскрытие окон, дымоудаление, тепловизионная разведка и связь с командным пунктом.",
        "key_application_en": "High-rise firefighting, facade and window access, thermal reconnaissance, industrial cooling and isolation.",
        "key_application_ru": "Высотное пожаротушение, доступ к фасадам и окнам, тепловизионная разведка, охлаждение и изоляция промышленных зон.",
        "parameters_en": {
            "Primary scenarios": "High-rise building fires, dense blocks, industrial-park cooling and isolation",
            "Recommended platforms": "High-Rise Firefighting Tethered UAV; Tethered Lighting UAV; Emergency Search & Rescue Drone; Emergency Communication Tethered UAV",
            "Typical outputs": "Elevated suppression channel, thermal imagery, command video, continuous power and liquid supply",
        },
        "parameters_ru": {
            "Основные сценарии": "Пожары в высотных зданиях, плотная городская застройка, охлаждение и изоляция промышленных зон",
            "Рекомендуемые платформы": "Привязной БПЛА для высотного пожаротушения; привязной осветительный БПЛА; поисково-спасательный БПЛА; привязной БПЛА связи",
            "Типовые результаты": "Высотный канал тушения, тепловизионное изображение, видео для командования, непрерывное питание и подача жидкости",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>High-rise buildings, glass curtain walls, dense blocks, and industrial parks create difficult fire scenes. Ground equipment is limited by height and angle, firefighters face high risk when working close to the fire, and ordinary UAVs cannot sustain long-duration suppression and reconnaissance.</p><h2>UAV-Enabled Upgrade</h2><p>Tethered firefighting UAVs lift high-pressure spraying, window breaking, smoke exhaust, thermal reconnaissance, and command video return to elevated fire areas. Ground power and liquid supply systems enable long-duration fixed-position response.</p><h2>Solution</h2><p>The solution covers high-rise fire suppression, window breaking and smoke exhaust, cooling and isolation in industrial parks, and vehicle-based command linkage, creating a fast aerial suppression and reconnaissance channel.</p><h2>Related Equipment</h2><p>High-Rise Firefighting Tethered UAV, Tethered Lighting UAV, Emergency Search & Rescue Drone, Emergency Communication Tethered UAV.</p><h2>Related Cases</h2><p>No high-rise firefighting field case is currently in the local case library. Demonstration cases for high-rise buildings and industrial-park cooling can be added later.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Высотные здания, стеклянные фасады, плотная застройка и промышленные парки усложняют пожарные работы. Наземная техника ограничена высотой и углом подачи, пожарные подвергаются риску при сближении с очагом, а обычные БПЛА не рассчитаны на длительное тушение и разведку.</p><h2>Как БПЛА повышают эффективность</h2><p>Привязной пожарный БПЛА поднимает высоконапорную подачу, вскрытие окон, дымоудаление, тепловизионную разведку и видеосвязь с командным пунктом к верхним этажам. Наземное питание и подача жидкости позволяют работать длительно в фиксированной точке.</p><h2>Решение</h2><p>Решение применяется для тушения высотных зданий, вскрытия окон и удаления дыма, охлаждения и изоляции промышленных площадок, а также для связи с машиной управления. Оно быстро формирует воздушный канал тушения и разведки.</p><h2>Связанное оборудование</h2><p>Привязной БПЛА для высотного пожаротушения, привязной осветительный БПЛА, поисково-спасательный БПЛА, привязной БПЛА связи.</p><h2>Связанные проекты</h2><p>В локальной базе пока нет практического кейса высотного пожаротушения. Позже можно добавить демонстрационные проекты для высотных зданий и охлаждения промышленных зон.</p>",
    },
    "water-conservancy-monitoring-uav-solution": {
        "category_id": "02_InfrastructureProtection",
        "category_name": "Infrastructure Protection",
        "product_name_en": "Water Conservancy Monitoring UAV Solution",
        "product_name_ru": "Решение БПЛА для мониторинга водного хозяйства",
        "summary_en": "A UAV monitoring solution for rivers, lakes, reservoirs, flood-control tasks, water-facility inspection, water-quality sampling, pollution tracing, and evidence collection.",
        "summary_ru": "Решение БПЛА для мониторинга рек, озер, водохранилищ, паводковых задач, инспекции гидротехнических объектов, отбора проб воды, поиска источников загрязнения и фиксации доказательств.",
        "key_application_en": "River and lake patrol, flood-control emergency response, hydraulic facility inspection, water-quality and pollution-source monitoring.",
        "key_application_ru": "Патрулирование рек и озер, паводковое реагирование, инспекция гидротехнических объектов, мониторинг качества воды и источников загрязнения.",
        "parameters_en": {
            "Primary scenarios": "River/lake patrol, reservoir and levee inspection, flood response, pollution tracing",
            "Recommended platforms": "Water Conservancy Monitoring UAV; Medium/Long-Range UAV Inspection System; Emergency Communication Tethered UAV; Tethered Lighting UAV",
            "Typical outputs": "Aerial imagery, water-quality sampling records, location evidence, emergency situational data",
        },
        "parameters_ru": {
            "Основные сценарии": "Патрулирование рек и озер, инспекция водохранилищ и дамб, паводковое реагирование, поиск источников загрязнения",
            "Рекомендуемые платформы": "БПЛА мониторинга водного хозяйства; средне- и дальнедистанционная система инспекции БПЛА; привязной БПЛА связи; привязной осветительный БПЛА",
            "Типовые результаты": "Аэрофото, записи отбора проб воды, координатные доказательства, данные обстановки при ЧС",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Water areas are wide and monitoring points are scattered. Boat patrols and walking inspections are inefficient, flood-season scenes carry safety risks, and illegal discharge, floating debris, and water/air pollution can be sudden and hidden, making evidence collection and source tracing difficult.</p><h2>UAV-Enabled Upgrade</h2><p>UAVs rapidly cover rivers, lakes, dams, reservoirs, and discharge outlets, returning imagery and location data in real time. Water-quality, gas, infrared, and visible-light payloads support multi-dimensional data collection.</p><h2>Solution</h2><p>The solution includes river and lake patrol, illegal-activity identification, water-quality monitoring, pollution-source tracing, flood emergency response, and hydraulic-facility inspection, forming a closed loop from discovery and sampling to positioning and reporting.</p><h2>Related Equipment</h2><p>Water Conservancy Monitoring UAV, Medium/Long-Range UAV Inspection System, Emergency Communication Tethered UAV, Tethered Lighting UAV.</p><h2>Related Cases</h2><p>Water conservancy facility low-altitude security and Anhui flood-season emergency UAV patrol.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Водные территории велики, а точки контроля рассредоточены. Судовые и пешие обходы неэффективны, паводковые работы несут риски, а незаконные сбросы, плавающий мусор и загрязнение воды или воздуха часто возникают внезапно и скрыто, что усложняет фиксацию и поиск источника.</p><h2>Как БПЛА повышают эффективность</h2><p>БПЛА быстро закрывают реки, озера, дамбы, водохранилища и выпуски, передавая изображение и координаты в реальном времени. Нагрузки для качества воды, газа, ИК и видимого диапазона позволяют собирать многомерные данные.</p><h2>Решение</h2><p>Решение включает патрулирование рек и озер, выявление незаконной деятельности, мониторинг качества воды, поиск источников загрязнения, паводковое реагирование и инспекцию гидротехнических объектов, формируя замкнутый процесс от обнаружения и отбора проб до координат и отчета.</p><h2>Связанное оборудование</h2><p>БПЛА мониторинга водного хозяйства, средне- и дальнедистанционная система инспекции БПЛА, привязной БПЛА связи, привязной осветительный БПЛА.</p><h2>Связанные проекты</h2><p>Низковысотная охрана водохозяйственных объектов и паводковый аварийный патруль БПЛА в Аньхое.</p>",
    },
    "tethered-lighting-uav-solution": {
        "category_id": "04_EmergencyRescue",
        "category_name": "Emergency & Disaster Rescue",
        "product_name_en": "Tethered Lighting UAV Solution",
        "product_name_ru": "Решение привязного осветительного БПЛА",
        "summary_en": "A persistent aerial lighting solution that improves night rescue, emergency repair, evacuation, and temporary-site operations with high-altitude continuous illumination.",
        "summary_ru": "Решение длительного воздушного освещения для ночных спасательных работ, аварийного ремонта, эвакуации и временных площадок за счет непрерывной подсветки с высоты.",
        "key_application_en": "Night emergency lighting, search and evacuation, temporary site support, and linkage with rescue, communication, firefighting, and security teams.",
        "key_application_ru": "Ночное аварийное освещение, поиск и эвакуация, временное обеспечение площадок, работа совместно со спасателями, связью, пожарными и охраной.",
        "parameters_en": {
            "Primary scenarios": "Night rescue lighting, regional search, evacuation support, temporary large-site lighting",
            "Recommended platforms": "Tethered Lighting UAV; Emergency Search & Rescue Drone; Emergency Communication Tethered UAV",
            "Typical outputs": "Continuous elevated illumination, safer working area, real-time visual support",
        },
        "parameters_ru": {
            "Основные сценарии": "Ночное спасательное освещение, поиск по району, поддержка эвакуации, временное освещение крупных площадок",
            "Рекомендуемые платформы": "Привязной осветительный БПЛА; поисково-спасательный БПЛА; привязной БПЛА связи",
            "Типовые результаты": "Непрерывное освещение с высоты, более безопасная рабочая зона, визуальная поддержка в реальном времени",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Night rescue and emergency-repair scenes suffer from poor visibility. Mobile lighting trucks are limited by lifting height and deployment position, while ordinary UAVs cannot maintain long-duration high-brightness lighting, creating search blind spots and operational risk.</p><h2>UAV-Enabled Upgrade</h2><p>Tethered lighting UAVs combine overhead illumination with continuous ground power, upgrading fixed ground lighting into a rapidly deployed, long-duration aerial light source.</p><h2>Solution</h2><p>The solution covers night emergency lighting, regional search and evacuation, and temporary support for large sites. It can operate together with search-and-rescue, communication, firefighting, and security equipment.</p><h2>Related Equipment</h2><p>Tethered Lighting UAV, Emergency Search & Rescue Drone, Emergency Communication Tethered UAV.</p><h2>Related Cases</h2><p>Ice and snow disaster emergency inspection. Night emergency-lighting exercise cases can be added later.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Ночные спасательные и аварийно-восстановительные работы страдают от плохой видимости. Осветительные машины ограничены высотой подъема и местом установки, а обычные БПЛА не могут долго поддерживать яркое освещение, из-за чего возникают слепые зоны поиска и рабочие риски.</p><h2>Как БПЛА повышают эффективность</h2><p>Привязной осветительный БПЛА сочетает верхнее освещение и непрерывное питание с земли, превращая фиксированный наземный свет в быстро развертываемый длительный воздушный источник.</p><h2>Решение</h2><p>Решение применяется для ночного аварийного освещения, поиска и эвакуации, а также временного обеспечения крупных площадок. Оно может работать совместно с поисково-спасательными, коммуникационными, пожарными и охранными средствами.</p><h2>Связанное оборудование</h2><p>Привязной осветительный БПЛА, поисково-спасательный БПЛА, привязной БПЛА связи.</p><h2>Связанные проекты</h2><p>Аварийная инспекция при снеголедовых бедствиях. Кейсы ночных учений освещения можно добавить позже.</p>",
    },
    "emergency-search-rescue-uav-solution": {
        "category_id": "04_EmergencyRescue",
        "category_name": "Emergency & Disaster Rescue",
        "product_name_en": "Emergency Search & Rescue UAV Solution",
        "product_name_ru": "Решение поисково-спасательного БПЛА",
        "summary_en": "A rapid-response UAV solution for disaster reconnaissance, missing-person search, target positioning, supply delivery, and command collaboration across floods, earthquakes, forests, waters, and remote areas.",
        "summary_ru": "Быстро развертываемое решение БПЛА для разведки ЧС, поиска людей, определения целей, доставки грузов и координации командования при паводках, землетрясениях, в лесах, на воде и в удаленных районах.",
        "key_application_en": "Disaster reconnaissance, trapped-person detection, target positioning, supply delivery, and field command support.",
        "key_application_ru": "Разведка ЧС, обнаружение пострадавших, позиционирование целей, доставка грузов и поддержка полевого командования.",
        "parameters_en": {
            "Primary scenarios": "Floods, earthquakes, landslides, forest search, water rescue, remote missing-person missions",
            "Recommended platforms": "Emergency Search & Rescue Drone; Emergency Communication Tethered UAV; Tethered Lighting UAV",
            "Typical outputs": "Situation imagery, target coordinates, thermal clues, delivery records, command video",
        },
        "parameters_ru": {
            "Основные сценарии": "Паводки, землетрясения, обвалы, поиск в лесу, спасение на воде, поиск людей в удаленных районах",
            "Рекомендуемые платформы": "Поисково-спасательный БПЛА; привязной БПЛА связи; привязной осветительный БПЛА",
            "Типовые результаты": "Изображение обстановки, координаты целей, тепловые признаки, записи доставки, видео для командования",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Disaster sites often involve road interruption, communication loss, and secondary hazards, making it difficult for rescue teams to enter the core area quickly. Targets in forests, waters, ruins, and night environments can be hidden, and manual search is slow over large areas.</p><h2>UAV-Enabled Upgrade</h2><p>UAVs provide early aerial reconnaissance, visible-light and thermal payloads, AI target recognition, real-time video transmission, and supply delivery, helping command centers build a fast situation map and improve search, positioning, and coordinated rescue efficiency.</p><h2>Solution</h2><p>The solution covers disaster-site reconnaissance, trapped-person search and positioning, emergency supply delivery, and field command collaboration.</p><h2>Related Equipment</h2><p>Emergency Search & Rescue Drone, Emergency Communication Tethered UAV, Tethered Lighting UAV.</p><h2>Related Cases</h2><p>Anhui flood-season emergency UAV patrol. Mountain or water rescue field cases can be added later.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>На местах ЧС часто нарушены дороги и связь, сохраняются вторичные риски, поэтому спасателям трудно быстро попасть в ключевую зону. В лесах, на воде, в завалах и ночью цели скрыты, а ручной поиск на больших площадях идет медленно.</p><h2>Как БПЛА повышают эффективность</h2><p>БПЛА выполняют раннюю воздушную разведку, используют видимые и тепловизионные нагрузки, распознавание целей на базе ИИ, передачу видео в реальном времени и доставку грузов, помогая штабу быстро строить карту обстановки и повышать эффективность поиска, позиционирования и взаимодействия.</p><h2>Решение</h2><p>Решение покрывает разведку района ЧС, поиск и позиционирование пострадавших, доставку аварийных грузов и взаимодействие с полевым командованием.</p><h2>Связанное оборудование</h2><p>Поисково-спасательный БПЛА, привязной БПЛА связи, привязной осветительный БПЛА.</p><h2>Связанные проекты</h2><p>Паводковый аварийный патруль БПЛА в Аньхое. Практические кейсы горного или водного поиска можно добавить позже.</p>",
    },
    "emergency-communication-uav-solution": {
        "category_id": "04_EmergencyRescue",
        "category_name": "Emergency & Disaster Rescue",
        "product_name_en": "Emergency Communication UAV Solution",
        "product_name_ru": "Решение БПЛА для аварийной связи",
        "summary_en": "An aerial communication solution for post-disaster network outage, remote no-signal areas, and temporary communication support, restoring public coverage or building a rescue private network quickly.",
        "summary_ru": "Воздушное коммуникационное решение для отключения сети после ЧС, удаленных зон без сигнала и временного обеспечения связи, позволяющее быстро восстановить публичное покрытие или развернуть спасательную частную сеть.",
        "key_application_en": "Public-network restoration, emergency private network, remote temporary coverage, and command-to-frontline connectivity.",
        "key_application_ru": "Восстановление публичной сети, аварийная частная сеть, временное покрытие удаленных районов и связь штаба с передовой.",
        "parameters_en": {
            "Primary scenarios": "Post-disaster outage, remote no-signal area, temporary event or rescue-site communication",
            "Recommended platforms": "Emergency Communication Tethered UAV; Emergency Search & Rescue Drone; Tethered Lighting UAV",
            "Typical outputs": "Elevated base-station coverage, private-network relay, command data return",
        },
        "parameters_ru": {
            "Основные сценарии": "Отключение связи после ЧС, удаленные зоны без сигнала, временная связь для мероприятий или спасательных площадок",
            "Рекомендуемые платформы": "Привязной БПЛА связи; поисково-спасательный БПЛА; привязной осветительный БПЛА",
            "Типовые результаты": "Высотное покрытие базовой станции, ретрансляция частной сети, возврат командных данных",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Earthquakes, floods, typhoons, and other disasters may damage base stations, fiber cables, and power supply. Communication vehicles can be constrained by roads and terrain, making it difficult to support public communication, rescue-team private networks, and command data return at the same time.</p><h2>UAV-Enabled Upgrade</h2><p>After takeoff, an emergency communication UAV can act as an elevated airborne base station carrying public-network equipment, PDT trunking, broadband mesh, and satellite communication modules for rapid cross-terrain coverage.</p><h2>Solution</h2><p>The solution includes targeted public-network recovery in disaster areas, emergency private-network setup, and temporary coverage in remote areas, keeping command centers and frontline rescuers connected in real time.</p><h2>Related Equipment</h2><p>Emergency Communication Tethered UAV, Emergency Search & Rescue Drone, Tethered Lighting UAV.</p><h2>Related Cases</h2><p>Post-disaster information-island communication support and large emergency-drill communication cases can be added later.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Землетрясения, паводки, тайфуны и другие ЧС могут повредить базовые станции, оптические линии и питание. Машины связи ограничены дорогами и рельефом, поэтому сложно одновременно обеспечить связь населения, частную сеть спасателей и возврат данных в штаб.</p><h2>Как БПЛА повышают эффективность</h2><p>После подъема аварийный коммуникационный БПЛА работает как высотная воздушная базовая станция и может нести оборудование публичной сети, PDT-транкинг, широкополосную mesh-сеть и спутниковую связь для быстрого покрытия через сложный рельеф.</p><h2>Решение</h2><p>Решение включает целевое восстановление публичной сети в зоне ЧС, развертывание аварийной частной сети и временное покрытие удаленных районов, поддерживая связь штаба и спасателей в реальном времени.</p><h2>Связанное оборудование</h2><p>Привязной БПЛА связи, поисково-спасательный БПЛА, привязной осветительный БПЛА.</p><h2>Связанные проекты</h2><p>Кейсы связи для информационных островов после ЧС и крупных аварийных учений можно добавить позже.</p>",
    },
    "smart-substation-autonomous-inspection-solution": {
        "category_id": "02_InfrastructureProtection",
        "category_name": "Infrastructure Protection",
        "product_name_en": "Smart Substation Autonomous UAV Inspection Solution",
        "product_name_ru": "Решение автономной инспекции подстанций с БПЛА",
        "summary_en": "An autonomous substation inspection solution combining a UAV dock, industrial UAV platform, multi-source payloads, AI analytics, and a management platform for unattended patrol, thermal measurement, defect recognition, and work-order closure.",
        "summary_ru": "Решение автономной инспекции подстанций, объединяющее док-станцию БПЛА, промышленную платформу, мультисенсорные нагрузки, аналитику ИИ и систему управления для автономных обходов, теплового контроля, распознавания дефектов и закрытия заявок.",
        "key_application_en": "Substation routine inspection, thermal anomaly detection, defect recognition, centralized multi-site management, and station-line maintenance.",
        "key_application_ru": "Плановая инспекция подстанций, выявление тепловых отклонений, распознавание дефектов, централизованное управление несколькими площадками и совместная эксплуатация станций и линий.",
        "parameters_en": {
            "Primary scenarios": "Unattended substation patrol, thermal measurement, defect archive, multi-site control",
            "Recommended platforms": "Smart Substation Autonomous UAV Inspection System; Power Tower Inspection UAV; Medium/Long-Range UAV Inspection System",
            "Typical outputs": "Visible and thermal inspection data, AI defect records, work orders, operation logs",
        },
        "parameters_ru": {
            "Основные сценарии": "Автономный обход подстанций, тепловой контроль, архив дефектов, управление несколькими площадками",
            "Рекомендуемые платформы": "Автономная система инспекции подстанций; БПЛА для инспекции опор ЛЭП; средне- и дальнедистанционная система инспекции БПЛА",
            "Типовые результаты": "Данные видимого и теплового контроля, записи дефектов ИИ, рабочие заявки, журналы операций",
        },
        "detail_html_en": "<h2>Industry Pain Points</h2><p>Substations require frequent inspection across many points, while high-voltage and strong electromagnetic environments limit close manual operation. Manual records, thermal measurement, defect judgment, and work-order handling are often scattered and hard to close as one process.</p><h2>UAV-Enabled Upgrade</h2><p>Smart docks, industrial UAVs, visible-light and thermal payloads, AI defect recognition, and an integrated management platform enable automatic takeoff and landing, unattended inspection, thermal measurement, defect archiving, and work-order closure.</p><h2>Solution</h2><p>The solution covers routine autonomous substation inspection, equipment-status and temperature-anomaly recognition, centralized multi-site management, and station-line collaborative maintenance.</p><h2>Related Equipment</h2><p>Smart Substation Autonomous UAV Inspection System, Power Tower Inspection UAV, Medium/Long-Range UAV Inspection System.</p><h2>Related Cases</h2><p>Zhaoqing long-distance power-line inspection and ice/snow disaster emergency inspection. Unattended substation inspection cases can be added later.</p>",
        "detail_html_ru": "<h2>Отраслевые задачи</h2><p>Подстанции требуют частых обходов множества точек, а высокое напряжение и сильная электромагнитная среда ограничивают близкую работу персонала. Ручные записи, тепловой контроль, оценка дефектов и обработка заявок часто разрознены и не образуют единый замкнутый процесс.</p><h2>Как БПЛА повышают эффективность</h2><p>Умная док-станция, промышленный БПЛА, видимые и тепловизионные нагрузки, распознавание дефектов ИИ и единая платформа управления обеспечивают автоматический взлет и посадку, автономную инспекцию, тепловой контроль, архивирование дефектов и закрытие заявок.</p><h2>Решение</h2><p>Решение покрывает плановую автономную инспекцию подстанций, распознавание состояния оборудования и температурных аномалий, централизованное управление несколькими площадками и совместную эксплуатацию станций и линий.</p><h2>Связанное оборудование</h2><p>Автономная система инспекции подстанций, БПЛА для инспекции опор ЛЭП, средне- и дальнедистанционная система инспекции БПЛА.</p><h2>Связанные проекты</h2><p>Дальняя инспекция ЛЭП в Чжаоцине и аварийная инспекция при снеголедовых бедствиях. Кейсы автономной инспекции подстанций можно добавить позже.</p>",
    },
}


CASE_TRANSLATIONS: dict[str, dict[str, Any]] = {
    "anhui-flood-season-uav-patrol": {
        "title_ru": "Аварийный паводковый патруль БПЛА в Аньхое",
        "description_ru": "Аварийный паводковый патруль БПЛА в Аньхое\nДля обеспечения безопасности линий электропередачи в летний паводковый сезон State Grid применил наши VTOL БПЛА самолетного типа для специального аварийного патрулирования плотного энергетического коридора Чичжоу Цзюхуа. Операция включала более 150 вылетов, обеспечила сверхдальнюю передачу рабочих сигналов и завершила паводковую инспекцию в срок с требуемым качеством, усилив защиту энергетического коридора в период паводков.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Дальний канал передачи данных и видео"],
    },
    "ice-snow-emergency-uav-inspection": {
        "title_ru": "Аварийная инспекция БПЛА при снеголедовых бедствиях",
        "description_ru": "Аварийная инспекция БПЛА при снеголедовых бедствиях\nВ условиях сильного холода -15 C State Grid использовал наши VTOL БПЛА с LiDAR для инспекции 400 км коридоров ЛЭП 500 кВ, включая линию Яньпин и линии Пинцзи I и II. Работы велись с пяти площадок базирования, включая город Яньцзи и уезд Анту, с развертыванием 18 временных точек взлета и посадки. 3D-лазерное сканирование позволило собрать полный массив данных, выявить 12 серьезных дефектов обледенения на опорах и арматуре, выполнить сканирование заданных участков и подготовить 12 быстрых отчетов о состоянии.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Бортовой LiDAR", "Система 3D-лазерного сканирования и быстрых отчетов"],
    },
    "lidar-tree-obstruction-uav-inspection": {
        "title_ru": "Инспекция древесных помех с LiDAR-БПЛА",
        "description_ru": "Инспекция древесных помех с LiDAR-БПЛА\nЗимой 2024 года одна из компаний Southern Grid использовала VTOL БПЛА с интегрированной системой LiDAR для воздушного сканирования в рамках специальной проверки рисков древесных помех. Миссия получила высокоточные и надежные 3D-облака точек, которые стали основой для последующего анализа скрытых рисков и подготовки инспекционных отчетов.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Бортовая LiDAR-система", "Система анализа 3D-облаков точек"],
    },
    "southern-grid-wildfire-uav-inspection": {
        "title_ru": "Пожарно-профилактическая инспекция Southern Grid с БПЛА",
        "description_ru": "Пожарно-профилактическая инспекция Southern Grid с БПЛА\nВ весенний период высокого риска лесных пожаров такие угрозы могут серьезно повлиять на устойчивую работу электросетей и нормальное электроснабжение. Для усиления безопасности коридоров ЛЭП Southern Grid применил наши VTOL БПЛА для интеллектуальной инспекции 280 км горных линий. Операция длилась 4 дня и включала 8 вылетов, выявив около 10 пожароопасных точек. Все риски передавались в реальном времени и быстро обрабатывались, что помогло предотвратить повреждение ЛЭП и защитить электроснабжение.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Бортовая оптико-электронная инспекционная нагрузка"],
    },
    "wildfire-emergency-transmission-line-uav-patrol": {
        "title_ru": "Аварийный пожарный патруль ЛЭП с БПЛА",
        "description_ru": "Аварийный пожарный патруль ЛЭП с БПЛА\nВ 2025 году наша энергетическая команда VTOL БПЛА успешно выполнила инспекционную задачу State Grid по коридорам ЛЭП в 13 регионах, включая Хунань, Шаньдун, Шаньси, Хэбэй и Аньхой. Команда проводила ежедневные регулярные патрули и качественно завершила инспекцию десятков тысяч километров линий, достигнув этапных целей.\nДля повышения эффективности и точности ключевая информация, включая маршруты инспекции и важные точки контроля опор, накладывалась на видеопоток в реальном времени. Это делало треки понятными, показывало базовую информацию по опорам, помогало персоналу быстро определять неисправности и риски и давало визуальное понимание хода работ.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Система наложения инспекционной информации на видео", "Дальний канал видеопередачи"],
    },
    "zhaoqing-long-distance-power-line-uav-inspection": {
        "title_ru": "Дальняя инспекция ЛЭП с БПЛА в Чжаоцине",
        "description_ru": "Дальняя инспекция ЛЭП с БПЛА в Чжаоцине\nВо время инспекции линии 110 кВ в Чжаоцине наше решение показало высокую эффективность и удобство применения. Линия имеет общую длину 37,9 км, среднюю высоту опор 35 м, 112 опор и максимальный перепад высот 440 м. В этой сложной среде было выполнено 10 вылетов и успешно обследована вся линия. После каждого вылета данные сразу обрабатывались и сшивались с данными предыдущего вылета. Итоговые данные были полными и стандартизированными, без повторных теней на поворотах и без смещений на стыках, что соответствует высоким требованиям инспекции ЛЭП.",
        "devices_ru": ["Средне- и дальнедистанционная система инспекции БПЛА", "VTOL БПЛА самолетного типа", "Система обработки и сшивки инспекционных данных", "Нагрузка для инспекции линий электропередачи"],
    },
}


CASE_HANDLES = [
    "anhui-flood-season-uav-patrol",
    "ice-snow-emergency-uav-inspection",
    "lidar-tree-obstruction-uav-inspection",
    "southern-grid-wildfire-uav-inspection",
    "wildfire-emergency-transmission-line-uav-patrol",
    "zhaoqing-long-distance-power-line-uav-inspection",
]

SOLUTION_DETAIL_IMAGE_MAP = {
    "power-tower-inspection-uav-solution": (
        "/solutions/uav-detail/power-line-inspection.webp",
        "Power line UAV inspection field operation",
    ),
    "high-rise-firefighting-uav-solution": (
        "/solutions/uav-detail/high-rise-firefighting.webp",
        "High-rise firefighting UAV field operation",
    ),
    "water-conservancy-monitoring-uav-solution": (
        "/solutions/uav-detail/water-conservancy-monitoring.webp",
        "Water conservancy UAV monitoring field operation",
    ),
    "tethered-lighting-uav-solution": (
        "/solutions/uav-detail/night-emergency-lighting.webp",
        "Night emergency lighting UAV support operation",
    ),
    "emergency-search-rescue-uav-solution": (
        "/solutions/uav-detail/disaster-search-rescue.webp",
        "Disaster-site UAV search and rescue reconnaissance",
    ),
    "emergency-communication-uav-solution": (
        "/solutions/uav-detail/emergency-communication.webp",
        "Emergency communication UAV support operation",
    ),
    "smart-substation-autonomous-inspection-solution": (
        "/solutions/uav-detail/smart-substation-inspection.webp",
        "Smart substation autonomous UAV inspection",
    ),
}


def dump_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def now_iso() -> str:
    return datetime.now().isoformat(timespec="seconds")


def insert_detail_image(html: str, src: str, alt: str) -> str:
    if src in html:
        return html
    figure = f'<figure class="solution-detail-figure"><img src="{src}" alt="{alt}" /></figure>'
    match = re.search(r"</p>", html, flags=re.IGNORECASE)
    if not match:
        return figure + html
    return html[: match.end()] + figure + html[match.end() :]


def with_detail_image(handle: str, content: dict[str, Any]) -> dict[str, Any]:
    image = SOLUTION_DETAIL_IMAGE_MAP.get(handle)
    if not image:
        return content
    src, alt = image
    next_content = dict(content)
    for key in ("detail_html", "detail_html_en", "detail_html_ru"):
        if key in next_content:
            next_content[key] = insert_detail_image(next_content[key] or "", src, alt)
    return next_content


def sync_solutions(conn: sqlite3.Connection) -> int:
    count = 0
    for path in sorted(SOLUTION_DIR.glob("*.json")):
        source = json.loads(path.read_text(encoding="utf-8"))
        handle = source["handle"]
        content = with_detail_image(handle, SOLUTION_TRANSLATIONS[handle])
        raw_json = dict(source)
        raw_json.update(content)
        raw_json["source_file"] = str(path.relative_to(ROOT))

        conn.execute(
            """
            INSERT INTO solutions (
              handle, category_id, category_name,
              product_name_en, summary_en, key_application_en, parameters_en, detail_html_en,
              product_name_ru, summary_ru, key_application_ru, key_parameter_1_ru, key_parameter_2_ru,
              parameters_ru, detail_html_ru,
              main_image, recommended_products, raw_json, created_at, updated_at, is_published
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            ON CONFLICT(handle) DO UPDATE SET
              category_id = excluded.category_id,
              category_name = excluded.category_name,
              product_name_en = excluded.product_name_en,
              summary_en = excluded.summary_en,
              key_application_en = excluded.key_application_en,
              parameters_en = excluded.parameters_en,
              detail_html_en = excluded.detail_html_en,
              product_name_ru = excluded.product_name_ru,
              summary_ru = excluded.summary_ru,
              key_application_ru = excluded.key_application_ru,
              key_parameter_1_ru = excluded.key_parameter_1_ru,
              key_parameter_2_ru = excluded.key_parameter_2_ru,
              parameters_ru = excluded.parameters_ru,
              detail_html_ru = excluded.detail_html_ru,
              main_image = excluded.main_image,
              recommended_products = excluded.recommended_products,
              raw_json = excluded.raw_json,
              updated_at = excluded.updated_at,
              is_published = 1
            """,
            (
                handle,
                content["category_id"],
                content["category_name"],
                content["product_name_en"],
                content["summary_en"],
                content["key_application_en"],
                dump_json(content["parameters_en"]),
                content["detail_html_en"],
                content["product_name_ru"],
                content["summary_ru"],
                content["key_application_ru"],
                "",
                "",
                dump_json(content["parameters_ru"]),
                content["detail_html_ru"],
                source.get("main_image", ""),
                dump_json(source.get("recommended_products", [])),
                dump_json(raw_json),
                now_iso(),
                now_iso(),
            ),
        )
        count += 1
    return count


def case_parameters(data: dict[str, Any], locale: str) -> dict[str, str]:
    if locale == "ru":
        return {
            "Регион": "Китай",
            "Категория решения": "Защита инфраструктуры",
            "Оборудование": "; ".join(CASE_TRANSLATIONS[data["handle"]]["devices_ru"]),
        }
    return {
        "Region": "China",
        "Solution category": "Infrastructure Protection",
        "Equipment": "; ".join(data.get("devices_en", [])),
    }


def sync_cases(conn: sqlite3.Connection) -> int:
    count = 0
    for handle in CASE_HANDLES:
        path = PUBLIC_CASE_DIR / f"{handle}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        ru = CASE_TRANSLATIONS[handle]
        data.update(
            {
                "title_ru": ru["title_ru"],
                "description_ru": ru["description_ru"],
                "devices_ru": ru["devices_ru"],
                "region_ru": "Азия",
                "country_ru": "Китай",
                "region_en": data.get("region_en") or "Asia",
                "country_en": data.get("country_en") or "China",
                "solution_category_id": data.get("solution_category_id") or "02_InfrastructureProtection",
            }
        )
        recommended = data.get("recommendedProductHandles") or data.get("recommended_product_handles") or []

        conn.execute(
            """
            INSERT INTO cases (
              handle, title_en, description_en, devices_en, parameters_en,
              title_ru, description_ru, devices_ru, parameters_ru,
              main_image, case_images, region_en, country_en, region_ru, country_ru,
              solution_category_id, recommended_product_handles, raw_json,
              created_at, updated_at, is_published
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            ON CONFLICT(handle) DO UPDATE SET
              title_en = excluded.title_en,
              description_en = excluded.description_en,
              devices_en = excluded.devices_en,
              parameters_en = excluded.parameters_en,
              title_ru = excluded.title_ru,
              description_ru = excluded.description_ru,
              devices_ru = excluded.devices_ru,
              parameters_ru = excluded.parameters_ru,
              main_image = excluded.main_image,
              case_images = excluded.case_images,
              region_en = excluded.region_en,
              country_en = excluded.country_en,
              region_ru = excluded.region_ru,
              country_ru = excluded.country_ru,
              solution_category_id = excluded.solution_category_id,
              recommended_product_handles = excluded.recommended_product_handles,
              raw_json = excluded.raw_json,
              updated_at = excluded.updated_at,
              is_published = 1
            """,
            (
                handle,
                data["title_en"],
                data["description_en"],
                dump_json(data.get("devices_en", [])),
                dump_json(case_parameters(data, "en")),
                data["title_ru"],
                data["description_ru"],
                dump_json(data.get("devices_ru", [])),
                dump_json(case_parameters(data, "ru")),
                data.get("main_image", ""),
                dump_json(data.get("case_images", [])),
                data["region_en"],
                data["country_en"],
                data["region_ru"],
                data["country_ru"],
                data["solution_category_id"],
                dump_json(recommended),
                dump_json(data),
                now_iso(),
                now_iso(),
            ),
        )
        count += 1
    return count


def main() -> None:
    if not SOLUTION_DIR.exists():
        raise SystemExit(f"Missing source directory: {SOLUTION_DIR}")

    backup = DB_PATH.with_name(f"{DB_PATH.name}.bak.uav-solutions-cases-{datetime.now():%Y%m%d%H%M%S}")
    shutil.copy2(DB_PATH, backup)

    conn = sqlite3.connect(DB_PATH)
    try:
        solution_count = sync_solutions(conn)
        case_count = sync_cases(conn)
        conn.commit()
    finally:
        conn.close()

    print(f"Backed up DB to {backup}")
    print(f"Synced {solution_count} UAV solutions and {case_count} UAV cases.")


if __name__ == "__main__":
    main()
