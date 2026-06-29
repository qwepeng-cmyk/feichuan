import sqlite3
import json
import os
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(ROOT, 'data', 'ntet.db')
json_path = os.path.join(ROOT, 'public', 'media', 'news_data.json')

restricted_media_ids = {
    'multi-sensor-cuas-architecture-2026',
    'cuas-critical-infrastructure-deployment-2026',
}

def export_db_to_json():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, raw_json FROM media WHERE COALESCE(is_published, 1) = 1")
    rows = cursor.fetchall()
    
    news_data = []
    for row in rows:
        if row['id'] in restricted_media_ids:
            continue

        try:
            item = json.loads(row['raw_json'])
        except Exception:
            continue

        news_data.append(item)

    def sort_key(item):
        try:
            return datetime.strptime(item.get('date', ''), '%b %d, %Y')
        except Exception:
            return datetime.min

    news_data.sort(key=sort_key, reverse=True)
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)
    
    conn.close()
    print(f"Exported {len(news_data)} items to {json_path}")

if __name__ == "__main__":
    export_db_to_json()
