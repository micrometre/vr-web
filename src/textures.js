// Procedural Texture Generator for Interior Design Walkthrough
// Generates high-quality procedural textures using HTML5 Canvas (zero external image dependencies)

export function generateAllTextures() {
  generateWoodOak('canvas-oak');
  generateWoodWalnut('canvas-walnut');
  generateMarble('canvas-marble');
  generateConcrete('canvas-concrete');
  generateAcousticSlats('canvas-slats');
  generateRug('canvas-rug');
  generateArtCanvas('canvas-art');
  generateWindowView('canvas-view');
  
  // Wallpapers & Decorative Finishes
  generateBotanicalWallpaper('canvas-wallpaper-botanical');
  generateDecoWallpaper('canvas-wallpaper-deco');
  generateStripeWallpaper('canvas-wallpaper-stripe');
  generateGrassclothWallpaper('canvas-wallpaper-grasscloth');
  generateLimewashWallpaper('canvas-wallpaper-limewash');
}

function getCanvas(id, width, height) {
  let canvas = document.getElementById(id);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
  }
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// 1. Natural Scandinavian White Oak Parquet
export function generateWoodOak(id = 'canvas-oak') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Base warm oak tone
  ctx.fillStyle = '#dfcaa4';
  ctx.fillRect(0, 0, 1024, 1024);
  
  const plankHeight = 64;
  const numPlanks = 1024 / plankHeight;
  
  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    // Slight tone variation per plank
    const toneVar = (Math.sin(i * 12.7) * 0.5 + 0.5);
    const r = Math.floor(215 + toneVar * 20);
    const g = Math.floor(195 + toneVar * 18);
    const b = Math.floor(160 + toneVar * 15);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, y, 1024, plankHeight);
    
    // Wood grain lines
    ctx.save();
    ctx.beginPath();
    for (let gIdx = 0; gIdx < 14; gIdx++) {
      const grainY = y + 4 + gIdx * 4.2;
      ctx.strokeStyle = `rgba(140, 115, 80, ${0.08 + Math.random() * 0.08})`;
      ctx.lineWidth = 1 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(0, grainY);
      for (let x = 0; x <= 1024; x += 64) {
        const wave = Math.sin((x + i * 150) * 0.015) * 3 + Math.sin(x * 0.04) * 1.5;
        ctx.lineTo(x, grainY + wave);
      }
      ctx.stroke();
    }
    ctx.restore();
    
    // Plank joint seams (vertical staggered cuts)
    const stagger = (i % 3) * 340;
    for (let cutX = stagger; cutX < 1024; cutX += 512) {
      ctx.fillStyle = 'rgba(70, 50, 30, 0.45)';
      ctx.fillRect(cutX, y, 2, plankHeight);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(cutX + 2, y, 1, plankHeight);
    }
    
    // Horizontal bevel shadow and highlight
    ctx.fillStyle = 'rgba(60, 45, 25, 0.4)';
    ctx.fillRect(0, y + plankHeight - 2, 1024, 2);
    ctx.fillStyle = 'rgba(255, 250, 240, 0.25)';
    ctx.fillRect(0, y, 1024, 1.5);
  }
}

// 2. Rich Dark Walnut
export function generateWoodWalnut(id = 'canvas-walnut') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#3e271a';
  ctx.fillRect(0, 0, 1024, 1024);
  
  const plankHeight = 64;
  const numPlanks = 1024 / plankHeight;
  
  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    const toneVar = (Math.sin(i * 9.3) * 0.5 + 0.5);
    const r = Math.floor(55 + toneVar * 18);
    const g = Math.floor(35 + toneVar * 14);
    const b = Math.floor(25 + toneVar * 10);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, y, 1024, plankHeight);
    
    // Deep grain
    ctx.save();
    for (let gIdx = 0; gIdx < 16; gIdx++) {
      const grainY = y + 3 + gIdx * 3.8;
      ctx.strokeStyle = `rgba(25, 15, 10, ${0.12 + Math.random() * 0.1})`;
      ctx.lineWidth = 1 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.moveTo(0, grainY);
      for (let x = 0; x <= 1024; x += 64) {
        const wave = Math.sin((x + i * 200) * 0.012) * 3.5;
        ctx.lineTo(x, grainY + wave);
      }
      ctx.stroke();
    }
    ctx.restore();
    
    // Staggered vertical seams
    const stagger = ((i * 2) % 4) * 256;
    for (let cutX = stagger; cutX < 1024; cutX += 512) {
      ctx.fillStyle = 'rgba(15, 10, 5, 0.6)';
      ctx.fillRect(cutX, y, 2.5, plankHeight);
    }
    
    // Bevels
    ctx.fillStyle = 'rgba(10, 5, 2, 0.5)';
    ctx.fillRect(0, y + plankHeight - 2, 1024, 2);
    ctx.fillStyle = 'rgba(120, 85, 60, 0.2)';
    ctx.fillRect(0, y, 1024, 1);
  }
}

// 3. Luxurious Italian Carrara White Marble with delicate organic veins
export function generateMarble(id = 'canvas-marble') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Soft milky white gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#f9f9fb');
  grad.addColorStop(0.5, '#f0f0f4');
  grad.addColorStop(1, '#f7f7fa');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Subtle cloudy marble undertones
  for (let c = 0; c < 8; c++) {
    const cx = Math.random() * 1024;
    const cy = Math.random() * 1024;
    const r = 150 + Math.random() * 250;
    const cloudGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, r);
    cloudGrad.addColorStop(0, 'rgba(215, 220, 228, 0.25)');
    cloudGrad.addColorStop(1, 'rgba(215, 220, 228, 0)');
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Natural marble veining branches
  function drawVein(startX, startY, angle, length, branchDepth, opacity) {
    if (branchDepth <= 0 || length <= 5) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    let curX = startX;
    let curY = startY;
    let curAngle = angle;
    const steps = Math.floor(length / 15);
    
    for (let s = 0; s < steps; s++) {
      curAngle += (Math.random() - 0.5) * 0.45;
      curX += Math.cos(curAngle) * 15;
      curY += Math.sin(curAngle) * 15;
      ctx.lineTo(curX, curY);
      
      // Secondary minor vein branches
      if (Math.random() < 0.25 && branchDepth > 1) {
        const branchAngle = curAngle + (Math.random() > 0.5 ? 0.7 : -0.7);
        drawVein(curX, curY, branchAngle, length * 0.45, branchDepth - 1, opacity * 0.65);
      }
    }
    
    ctx.strokeStyle = `rgba(95, 105, 120, ${opacity})`;
    ctx.lineWidth = branchDepth === 3 ? 2.5 : branchDepth === 2 ? 1.5 : 0.8;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }
  
  // Major veins
  drawVein(100, 50, 0.65, 950, 3, 0.35);
  drawVein(250, 950, -0.75, 800, 3, 0.30);
  drawVein(850, 200, 2.2, 700, 3, 0.25);
  drawVein(50, 550, 0.2, 600, 2, 0.2);
  
  // Tile grid seams with subtle grout line (large luxury slabs 512x512)
  ctx.strokeStyle = 'rgba(160, 165, 175, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.strokeRect(512, 0, 512, 512);
  ctx.strokeRect(0, 512, 512, 512);
  ctx.strokeRect(512, 512, 512, 512);
}

// 4. Polished Architectural Concrete
export function generateConcrete(id = 'canvas-concrete') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Base neutral grey
  ctx.fillStyle = '#b3b7bb';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Fine noise / speckled aggregates
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 22;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);
  
  // Modern panel seams (512x512 grid with formwork tie-rod holes)
  ctx.strokeStyle = 'rgba(70, 75, 80, 0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.strokeRect(512, 0, 512, 512);
  ctx.strokeRect(0, 512, 512, 512);
  ctx.strokeRect(512, 512, 512, 512);
  
  // Architectural formwork tie-hole circles
  const tieHoles = [
    [40, 40], [472, 40], [40, 472], [472, 472],
    [552, 40], [984, 40], [552, 472], [984, 472],
    [40, 552], [472, 552], [40, 984], [472, 984],
    [552, 552], [984, 552], [552, 984], [984, 984]
  ];
  for (const [hx, hy] of tieHoles) {
    ctx.fillStyle = 'rgba(40, 45, 50, 0.5)';
    ctx.beginPath();
    ctx.arc(hx, hy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// 5. Vertical Acoustic Wood Slat Accent Wall
export function generateAcousticSlats(id = 'canvas-slats') {
  const canvas = getCanvas(id, 512, 512);
  const ctx = canvas.getContext('2d');
  
  // Black acoustic felt backing
  ctx.fillStyle = '#18191b';
  ctx.fillRect(0, 0, 512, 512);
  
  const slatWidth = 24;
  const gapWidth = 8;
  const pitch = slatWidth + gapWidth;
  const numSlats = Math.ceil(512 / pitch);
  
  for (let s = 0; s < numSlats; s++) {
    const x = s * pitch;
    // Slat face (natural warm oak)
    ctx.fillStyle = '#c9a875';
    ctx.fillRect(x, 0, slatWidth, 512);
    
    // Slat wood grain
    ctx.save();
    for (let g = 0; g < 4; g++) {
      ctx.strokeStyle = 'rgba(120, 85, 45, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 4 + g * 5, 0);
      ctx.lineTo(x + 4 + g * 5 + (Math.sin(s + g) * 2), 512);
      ctx.stroke();
    }
    ctx.restore();
    
    // Slat 3D side bevel & depth shadow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(x, 0, 1.5, 512); // left highlight
    ctx.fillStyle = 'rgba(40, 25, 10, 0.4)';
    ctx.fillRect(x + slatWidth - 2, 0, 2, 512); // right shadow
  }
}

// 6. Nordic Wool Berber Rug
export function generateRug(id = 'canvas-rug') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Off-white warm wool
  ctx.fillStyle = '#eae6dd';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Woven texture speckles
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);
  
  // Minimalist Moroccan Berber diamond grid
  ctx.strokeStyle = 'rgba(75, 68, 60, 0.35)';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([8, 6]);
  
  const step = 128;
  for (let x = -1024; x < 2048; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 1024, 1024);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, 1024);
    ctx.lineTo(x + 1024, 0);
    ctx.stroke();
  }
  
  // Braided edge border
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(90, 80, 70, 0.5)';
  ctx.lineWidth = 12;
  ctx.strokeRect(10, 10, 1004, 1004);
}

// 7. Curated Modern Gallery Art
export function generateArtCanvas(id = 'canvas-art') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Warm ecru raw linen background
  ctx.fillStyle = '#f2efe9';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Layered architectural abstract forms
  // Form 1: Terracotta arch
  ctx.fillStyle = '#b7654d';
  ctx.beginPath();
  ctx.arc(420, 600, 260, Math.PI, 0, false);
  ctx.lineTo(680, 900);
  ctx.lineTo(160, 900);
  ctx.closePath();
  ctx.fill();
  
  // Form 2: Muted Sage circle
  ctx.fillStyle = '#7a887b';
  ctx.beginPath();
  ctx.arc(680, 360, 180, 0, Math.PI * 2);
  ctx.fill();
  
  // Form 3: Ochre accent crescent
  ctx.fillStyle = '#d4a259';
  ctx.beginPath();
  ctx.arc(360, 300, 110, 0, Math.PI * 2);
  ctx.fill();
  
  // Form 4: Charcoal bold minimalist brush line
  ctx.strokeStyle = '#232528';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(220, 780);
  ctx.bezierCurveTo(450, 480, 600, 650, 840, 240);
  ctx.stroke();
  
  // Artist signature
  ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillText('No. 04', 700, 980);
}

// 8. Scenic Window Panorama Backdrop (Modern Garden Terrace & Skyline)
export function generateWindowView(id = 'canvas-view') {
  const canvas = getCanvas(id, 2048, 1024);
  const ctx = canvas.getContext('2d');
  
  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 650);
  skyGrad.addColorStop(0, '#5a98d6');
  skyGrad.addColorStop(0.6, '#9ac2ec');
  skyGrad.addColorStop(1, '#e3effc');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 2048, 650);
  
  // Soft distant mountains / hills
  ctx.fillStyle = '#8ca3bc';
  ctx.beginPath();
  ctx.moveTo(0, 620);
  for (let x = 0; x <= 2048; x += 128) {
    const y = 520 + Math.sin(x * 0.003) * 60 + Math.cos(x * 0.007) * 35;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(2048, 1024);
  ctx.lineTo(0, 1024);
  ctx.fill();
  
  // Modern City Skyline silhouette
  const bldgs = [
    [100, 120, 240], [240, 90, 310], [350, 140, 280], [510, 110, 350],
    [640, 130, 260], [790, 80, 390], [890, 150, 310], [1060, 100, 360],
    [1180, 130, 280], [1330, 160, 340], [1510, 110, 370], [1640, 140, 290],
    [1800, 120, 320], [1940, 90, 270]
  ];
  for (const [bx, bw, bh] of bldgs) {
    // Glass tower gradient
    const bGrad = ctx.createLinearGradient(bx, 600 - bh, bx + bw, 600);
    bGrad.addColorStop(0, '#92b0c9');
    bGrad.addColorStop(1, '#65819a');
    ctx.fillStyle = bGrad;
    ctx.fillRect(bx, 600 - bh, bw, bh);
    
    // Windows grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let wy = 600 - bh + 15; wy < 580; wy += 20) {
      for (let wx = bx + 8; wx < bx + bw - 8; wx += 16) {
        ctx.fillRect(wx, wy, 8, 10);
      }
    }
  }
  
  // Lush terrace greenery & treetops
  ctx.fillStyle = '#3c6e43';
  for (let gx = 0; gx < 2048; gx += 45) {
    const gy = 580 + Math.sin(gx * 0.02) * 30;
    ctx.beginPath();
    ctx.arc(gx, gy, 45 + Math.random() * 20, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Lower terrace balcony deck
  ctx.fillStyle = '#2f343a';
  ctx.fillRect(0, 680, 2048, 344);
}

// 9. Botanical Luxury Foliage Wallpaper
export function generateBotanicalWallpaper(id = 'canvas-wallpaper-botanical') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');

  // Warm eggshell parchment background
  ctx.fillStyle = '#f3efe6';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft organic foliage motifs repeated seamlessly
  function drawLeafCluster(cx, cy, scale) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Palm / monstera stylized fronds
    const leafAngles = [-0.6, -0.3, 0, 0.3, 0.6];
    for (let a of leafAngles) {
      ctx.save();
      ctx.rotate(a);
      ctx.fillStyle = 'rgba(105, 135, 110, 0.55)';
      ctx.beginPath();
      ctx.ellipse(0, -90, 22, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delicate gold stem line
      ctx.strokeStyle = 'rgba(201, 168, 117, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -170);
      ctx.stroke();
      ctx.restore();
    }

    // Secondary sage tone leaves
    for (let a of [-0.45, 0.45]) {
      ctx.save();
      ctx.rotate(a);
      ctx.fillStyle = 'rgba(68, 92, 73, 0.7)';
      ctx.beginPath();
      ctx.ellipse(0, -65, 18, 65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  // Seamless grid of botanical motifs
  const step = 256;
  for (let x = 0; x <= 1024; x += step) {
    for (let y = 0; y <= 1024; y += step) {
      const offsetX = (y / step) % 2 === 0 ? 0 : step / 2;
      drawLeafCluster(x + offsetX, y, 0.85);
    }
  }
}

// 10. Art Deco Geometric Luxury Wallpaper (Gold Arches on Charcoal)
export function generateDecoWallpaper(id = 'canvas-wallpaper-deco') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');

  // Deep matte obsidian charcoal background
  ctx.fillStyle = '#1b1e22';
  ctx.fillRect(0, 0, 1024, 1024);

  const tileW = 128;
  const tileH = 128;

  ctx.strokeStyle = '#c9a875';
  ctx.lineWidth = 2;

  for (let y = 0; y <= 1024 + tileH; y += tileH) {
    for (let x = 0; x <= 1024 + tileW; x += tileW) {
      const stagger = (Math.floor(y / tileH) % 2) * (tileW / 2);
      const cx = x + stagger;
      const cy = y;

      // Concentric Art Deco Fan Arches
      for (let r = 20; r <= 60; r += 14) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.stroke();
      }

      // Vertical connecting lines
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + tileH);
      ctx.stroke();
    }
  }
}

// 11. Tailored Pinstripe Wallpaper
export function generateStripeWallpaper(id = 'canvas-wallpaper-stripe') {
  const canvas = getCanvas(id, 512, 512);
  const ctx = canvas.getContext('2d');

  // Warm off-white
  ctx.fillStyle = '#f8f6f0';
  ctx.fillRect(0, 0, 512, 512);

  const stripePitch = 32;
  const numStripes = 512 / stripePitch;

  for (let i = 0; i < numStripes; i++) {
    const x = i * stripePitch;
    // Main soft taupe band
    ctx.fillStyle = '#d2c8ba';
    ctx.fillRect(x, 0, 12, 512);

    // Crisp accent pinstripe
    ctx.fillStyle = '#8f8373';
    ctx.fillRect(x + 5, 0, 2, 512);
  }
}

// 12. Natural Woven Grasscloth Wallpaper
export function generateGrassclothWallpaper(id = 'canvas-wallpaper-grasscloth') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');

  // Warm honey-flax natural grass base
  ctx.fillStyle = '#d8cbba';
  ctx.fillRect(0, 0, 1024, 1024);

  // Horizontal woven fibrous threads with natural organic variations
  const numRows = 256;
  const rowHeight = 4;

  for (let r = 0; r < numRows; r++) {
    const y = r * rowHeight;
    const tone = Math.sin(r * 15.3) * 0.5 + 0.5;
    const alpha = 0.15 + tone * 0.25;

    ctx.fillStyle = `rgba(130, 105, 75, ${alpha})`;
    ctx.fillRect(0, y, 1024, rowHeight - 1);

    // Fine organic thread variations
    for (let seg = 0; seg < 1024; seg += 40 + Math.random() * 80) {
      ctx.fillStyle = 'rgba(75, 55, 35, 0.35)';
      ctx.fillRect(seg, y, 30 + Math.random() * 40, rowHeight - 1);
    }
  }

  // Subtle vertical warp weave ties
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let x = 0; x < 1024; x += 16) {
    ctx.fillRect(x, 0, 1, 1024);
  }
}

// 13. Artisanal Venetian Limewash & Textured Plaster
export function generateLimewashWallpaper(id = 'canvas-wallpaper-limewash') {
  const canvas = getCanvas(id, 1024, 1024);
  const ctx = canvas.getContext('2d');

  // Base Roman clay plaster tone (warm greige)
  ctx.fillStyle = '#d5cdc3';
  ctx.fillRect(0, 0, 1024, 1024);

  // Multidirectional painterly cross-hatch limewash brush sweeps
  for (let b = 0; b < 180; b++) {
    const bx = Math.random() * 1024;
    const by = Math.random() * 1024;
    const bw = 120 + Math.random() * 200;
    const bh = 50 + Math.random() * 90;
    const angle = (Math.random() - 0.5) * 1.5;

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(angle);

    const isLight = Math.random() > 0.45;
    ctx.fillStyle = isLight ? 'rgba(245, 240, 232, 0.14)' : 'rgba(165, 150, 135, 0.14)';
    ctx.beginPath();
    ctx.ellipse(0, 0, bw / 2, bh / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Micro fine stippling plaster noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);
}
