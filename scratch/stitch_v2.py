import os
from PIL import Image

def stitch():
    banner_w = 1920
    banner_h = 500
    cell_w = 480
    cell_h = 250
    
    banner = Image.new('RGB', (banner_w, banner_h), (26, 42, 68))
    source_dir = 'public/case_banner'
    output_path = 'public/cases/case_banner_final.png'
    
    os.makedirs('public/cases', exist_ok=True)
    
    for i in range(8):
        img_id = i + 1
        img_path = os.path.join(source_dir, f'{img_id}.png')
        try:
            with Image.open(img_path) as img:
                # Custom Offset logic for specific images
                # img_id 5 (Top 3rd): Compensate for white border
                # img_id 3 (Bottom 1st): Ensure drone is visible
                
                img_ratio = img.width / img.height
                target_ratio = cell_w / cell_h
                
                # Default cropping logic (Center)
                anchor_y = 0.5 
                anchor_x = 0.5
                
                if img_id == 5:
                    # Top 3rd: If it has top white border, crop slightly lower
                    anchor_y = 0.6 
                if img_id == 3:
                    # Bottom 1st: Ensure drone (often in middle-low) is the center
                    anchor_y = 0.4 # Higher anchor means see more of the bottom
                
                if img_ratio > target_ratio:
                    new_w = int(target_ratio * img.height)
                    left = (img.width - new_w) * anchor_x
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
                print(f"Refined placement for {img_id}.png")
        except Exception as e:
            print(f"Error: {e}")
            
    banner.save(output_path)
    print(f"Successfully updated: {output_path}")

if __name__ == "__main__":
    stitch()
