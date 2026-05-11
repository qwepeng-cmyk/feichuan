import os
import json
import sqlite3

DIR_PATH = '/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护'
DB_PATH = '/Users/mattchyi/Documents/Project/fc/data/ntet.db'

def push():
    if not os.path.exists(DB_PATH):
        print(f"Error: DB not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    files = [f for f in os.listdir(DIR_PATH) if f.endswith('.json')]
    print(f"Found {len(files)} JSON files to push.")
    
    updated_count = 0
    for f_name in files:
        json_path = os.path.join(DIR_PATH, f_name)
        with open(json_path, 'r', encoding='utf-8') as jf:
            data = json.load(jf)
            
        handle = data.get('handle')
        if not handle:
            print(f"Skipping {f_name}, no handle found.")
            continue
            
        # Convert to string for storage
        raw_json = json.dumps(data, ensure_ascii=False)
        
        # Check if exists
        cursor.execute("SELECT handle FROM products WHERE handle=?", (handle,))
        exists = cursor.fetchone()
        
        if exists:
            print(f"Updating product: {handle}")
            cursor.execute("""
                UPDATE products 
                SET raw_json = ?, 
                    product_name_en = ?,
                    category_primary = ?
                WHERE handle = ?
            """, (raw_json, data.get('product_name_en', ''), data.get('category_primary', ''), handle))
        else:
            print(f"Inserting new product: {handle}")
            cursor.execute("""
                INSERT INTO products (handle, product_name_en, category_primary, raw_json)
                VALUES (?, ?, ?, ?)
            """, (handle, data.get('product_name_en', ''), data.get('category_primary', ''), raw_json))
            
        updated_count += 1

    conn.commit()
    conn.close()
    print(f"Success! {updated_count} products synchronized to the website database.")

if __name__ == "__main__":
    push()
