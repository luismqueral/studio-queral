#!/usr/bin/env python3
"""
Logo Generator - Creates SVG circle logos with beautiful gradient variations
"""

import os
import random
import colorsys
from datetime import datetime

def generate_color_palette():
    """Generate a harmonious color palette based on a random hue"""
    # Pick a random hue
    base_hue = random.random()
    
    # Create variations with different saturations and lightness
    colors = []
    
    # Light, medium, dark variations
    lightness_values = [0.85, 0.75, 0.65]  # Light to medium-dark
    saturation_values = [0.15, 0.25, 0.35]  # Subtle to moderate saturation
    
    for i, (lightness, saturation) in enumerate(zip(lightness_values, saturation_values)):
        # Slightly vary hue for each color
        hue = (base_hue + (i * 0.02)) % 1.0
        r, g, b = colorsys.hls_to_rgb(hue, lightness, saturation)
        hex_color = f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"
        colors.append(hex_color)
    
    return colors

def generate_hover_palette(base_colors):
    """Generate darker hover colors from base palette"""
    hover_colors = []
    
    for color in base_colors:
        # Convert hex to RGB
        r = int(color[1:3], 16) / 255
        g = int(color[3:5], 16) / 255
        b = int(color[5:7], 16) / 255
        
        # Convert to HLS and darken
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        l = max(0.1, l * 0.8)  # Darken by 20%
        s = min(1.0, s * 1.1)  # Slightly increase saturation
        
        r, g, b = colorsys.hls_to_rgb(h, l, s)
        hex_color = f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"
        hover_colors.append(hex_color)
    
    return hover_colors

def generate_active_palette(hover_colors):
    """Generate even darker colors for active state"""
    active_colors = []
    
    for color in hover_colors:
        # Convert hex to RGB
        r = int(color[1:3], 16) / 255
        g = int(color[3:5], 16) / 255
        b = int(color[5:7], 16) / 255
        
        # Convert to HLS and darken further
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        l = max(0.05, l * 0.7)  # Darken by 30%
        s = min(1.0, s * 1.2)  # Increase saturation more
        
        r, g, b = colorsys.hls_to_rgb(h, l, s)
        hex_color = f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"
        active_colors.append(hex_color)
    
    return active_colors

def create_svg_logo(colors, hover_colors, active_colors, size=48):
    """Create SVG logo with gradient definitions and interactive states"""
    
    # Create unique IDs for gradients
    timestamp = str(int(datetime.now().timestamp()))
    gradient_id = f"grad_{timestamp}"
    hover_gradient_id = f"grad_hover_{timestamp}"
    active_gradient_id = f"grad_active_{timestamp}"
    
    svg_content = f'''<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Default gradient -->
    <linearGradient id="{gradient_id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:{colors[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors[2]};stop-opacity:1" />
    </linearGradient>
    
    <!-- Hover gradient -->
    <linearGradient id="{hover_gradient_id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{hover_colors[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:{hover_colors[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{hover_colors[2]};stop-opacity:1" />
    </linearGradient>
    
    <!-- Active gradient -->
    <linearGradient id="{active_gradient_id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{active_colors[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:{active_colors[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{active_colors[2]};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <style>
    .logo-circle {{
      fill: url(#{gradient_id});
      transition: fill 0.2s ease, transform 0.1s ease;
      cursor: pointer;
    }}
    
    .logo-circle:hover {{
      fill: url(#{hover_gradient_id});
    }}
    
    .logo-circle:active {{
      fill: url(#{active_gradient_id});
      transform: translateY(2px);
    }}
  </style>
  
  <circle cx="{size//2}" cy="{size//2}" r="{size//2}" class="logo-circle" />
</svg>'''
    
    return svg_content

def generate_logo_variations(output_dir="static/images", num_variations=5):
    """Generate multiple logo variations"""
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    variations = []
    
    for i in range(num_variations):
        # Generate color palettes
        base_colors = generate_color_palette()
        hover_colors = generate_hover_palette(base_colors)
        active_colors = generate_active_palette(hover_colors)
        
        # Create SVG content
        svg_content = create_svg_logo(base_colors, hover_colors, active_colors)
        
        # Save to file
        filename = f"logo-variation-{i+1}.svg"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w') as f:
            f.write(svg_content)
        
        variations.append({
            'filename': filename,
            'filepath': filepath,
            'base_colors': base_colors,
            'hover_colors': hover_colors,
            'active_colors': active_colors
        })
        
        print(f"Generated {filename} with colors: {base_colors}")
    
    return variations

def select_current_logo(variations, output_dir="static/images"):
    """Select one variation as the current logo"""
    if not variations:
        print("No variations available to select from")
        return None
    
    # Pick a random variation
    selected = random.choice(variations)
    current_logo_path = os.path.join(output_dir, "logo-current.svg")
    
    # Copy the selected variation to current logo
    with open(selected['filepath'], 'r') as src:
        svg_content = src.read()
    
    with open(current_logo_path, 'w') as dst:
        dst.write(svg_content)
    
    print(f"Selected {selected['filename']} as current logo")
    print(f"Colors: {selected['base_colors']}")
    
    return current_logo_path

def main():
    """Main function - generate logos and select current one"""
    print("🎨 Generating logo variations...")
    
    # Generate variations
    variations = generate_logo_variations()
    
    # Select current logo
    current_logo = select_current_logo(variations)
    
    print(f"✅ Generated {len(variations)} variations")
    print(f"✅ Current logo: {current_logo}")
    print("🚀 Ready for deployment!")

if __name__ == "__main__":
    main() 