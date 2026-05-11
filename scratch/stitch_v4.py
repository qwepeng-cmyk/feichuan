import os
from PIL import Image

def stitch():
    banner_w = 1920
    banner_h = 400
    cell_w = 480
    cell_h = 200
    
    banner = Image.new('RGB', (banner_w, banner_h), (26, 42, 68))
    source_dir = 'public/case_banner'
    output_path = 'public/cases/case_banner_final_v3.png' # Overwrite V3
    
    os.makedirs('public/cases', exist_ok=True)
    
    for i in range(8):
        img_id = i + 1
        img_path = os.path.join(source_dir, f'{img_id}.png')
        try:
            with Image.open(img_path) as img:
                img_ratio = img.width / img.height
                target_ratio = cell_w / cell_h
                
                # Default anchor is center
                anchor_y = 0.5
                
                # SPECIFIC OVERRIDES
                if img_id == 3: 
                    # Bottom 1st: User says drone is missing. Assuming drone is in LOWER part of photo.
                    anchor_y = 0.95 # Crop closer to the BOTTOM
                if img_id == 5: 
                    # Top 3rd: Avoid top white border
                    anchor_y = 0.8  # Crop closer to the BOTTOM
                
                if img_ratio > target_ratio:
                    new_w = int(target_ratio * img.height)
                    left = (img.width - new_w) * 0.5
                    img = img.crop((left, 0, left + new_w, img.height))
                else:
                    new_h = int(img.width / target_ratio)
                    top = (img.height - new_h) * anchor_y
                    img = img.crop((0, top, img.width, top + new_h))
                
                img = img.resize((cell_w, cell_h), Image.Resampling.LANCZOS)
                
                col = i % 2
                row = (i // 2) % 2
                offset_x = 960 if i >= 4 else 0
                
                x = offset_x + (col * cell_w)
                y = row * cell_h
                
                banner.paste(img, (x, y))
        except Exception as e:
            print(f"Error {img_id}: {e}")
            
    banner.save(output_path)
    print(f"Successfully refined Case Banner V3 at {output_path}")

if __name__ == "__main__":
    stitch()
