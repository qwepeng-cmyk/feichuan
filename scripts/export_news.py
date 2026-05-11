import sqlite3
import json
import os

db_path = '/Users/mattchyi/Documents/Project/fc/data/ntet.db'
json_path = '/Users/mattchyi/Documents/Project/fc/public/media/news_data.json'

def export_db_to_json():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM media")
    rows = cursor.fetchall()
    
    news_data = []
    for row in rows:
        item = dict(row)
        # Remove DB specific fields
        item.pop('created_at', None)
        item.pop('updated_at', None)
        # Remove raw_json to avoid redundancy in the final json file
        item.pop('raw_json', None)
        
        # Filter out nulls
        news_data.append({k: v for k, v in item.items() if v is not None})
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)
    
    conn.close()
    print(f"Exported {len(news_data)} items to {json_path}")

if __name__ == "__main__":
    export_db_to_json()
