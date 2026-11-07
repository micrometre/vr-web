import { generateAllTextures } from './textures.js';

// Interior Painting & Wallpaper Studio State
export const interiorState = {
  activeTarget: 'accent', // 'accent' (back wall) | 'all' | 'left' | 'front'
  activeSheen: 'matte', // 'matte' | 'satin' | 'gloss'
  accentFinish: { type: 'wallpaper', id: 'botanical', name: 'Botanical Fronds' },
  mainFinish: { type: 'paint', hex: '#f4f1ea', name: 'Alabaster White' },
  floorMaterial: 'oak',
  lightingPreset: 'day',
  dimensionsVisible: false,
  furnitureVisible: false, // Default hidden as requested!
  customModelLoaded: false
};

// Finish Catalog for Painters & Wallpaper Designers
export const FINISH_CATALOG = {
  paints: [
    { id: 'alabaster', name: 'Alabaster White', hex: '#f4f1ea', code: 'SW 7008' },
    { id: 'greige', name: 'Nordic Greige', hex: '#d8cfc4', code: 'BM 1548' },
    { id: 'sage', name: 'Olive Haze', hex: '#7a8471', code: 'SW 9130' },
    { id: 'terracotta', name: 'Warm Terracotta', hex: '#a35d4d', code: 'SW 6334' },
    { id: 'charcoal', name: 'Parisian Charcoal', hex: '#2c3036', code: 'SW 7069' },
    { id: 'navy', name: 'Aegean Navy', hex: '#1e2b3c', code: 'SW 6244' },
    { id: 'rose', name: 'Dusty Rose Mauve', hex: '#bfa39d', code: 'BM 1262' },
    { id: 'ochre', name: 'Warm Ochre Mustard', hex: '#c99a52', code: 'SW 6388' },
    { id: 'celadon', name: 'Pale Celadon Mist', hex: '#c5d1c5', code: 'BM 2140-50' },
    { id: 'slate', name: 'Heritage Slate Blue', hex: '#5b6f84', code: 'SW 9140' }
  ],
  wallpapers: [
    { id: 'botanical', name: 'Botanical Luxury Fronds', canvasId: '#canvas-wallpaper-botanical', repeat: '3 2', roughness: 0.8 },
    { id: 'deco', name: 'Art Deco Metallic Arches', canvasId: '#canvas-wallpaper-deco', repeat: '4 3', roughness: 0.35, metalness: 0.25 },
    { id: 'stripe', name: 'Tailored French Pinstripe', canvasId: '#canvas-wallpaper-stripe', repeat: '6 2', roughness: 0.85 },
    { id: 'grasscloth', name: 'Natural Woven Grasscloth', canvasId: '#canvas-wallpaper-grasscloth', repeat: '3 2', roughness: 0.95 },
    { id: 'limewash', name: 'Venetian Roman Limewash', canvasId: '#canvas-wallpaper-limewash', repeat: '2 2', roughness: 0.9 }
  ],
  sheens: {
    matte: { roughness: 0.95, metalness: 0.0 },
    satin: { roughness: 0.55, metalness: 0.08 },
    gloss: { roughness: 0.22, metalness: 0.18 }
  },
  floors: [
    { id: 'oak', name: 'Scandinavian White Oak', canvasId: '#canvas-oak', repeat: '4 4', roughness: 0.45 },
    { id: 'walnut', name: 'American Dark Walnut', canvasId: '#canvas-walnut', repeat: '4 4', roughness: 0.4 },
    { id: 'marble', name: 'Italian Carrara Marble', canvasId: '#canvas-marble', repeat: '4 4', roughness: 0.15, metalness: 0.1 },
    { id: 'concrete', name: 'Architectural Polished Concrete', canvasId: '#canvas-concrete', repeat: '3 3', roughness: 0.35 }
  ]
};

// Initialize procedural textures and A-Frame components
export function initInteriorApp() {
  generateAllTextures();
  registerAFrameComponents();
  setupUI();
  setupDragAndDrop();

  const scene = document.querySelector('a-scene');
  if (scene) {
    if (scene.hasLoaded) {
      refreshAllCanvasMaterials();
    } else {
      scene.addEventListener('loaded', refreshAllCanvasMaterials);
    }
  }

  // Initial finishes
  applyLightingPreset('day');
  applyFloorMaterial('oak');
  applyWallpaper('botanical', 'accent');
  applyPaintColor('#f4f1ea', 'Alabaster White', 'other');
  toggleFurniture(false); // Furniture hidden by default
}

function refreshAllCanvasMaterials() {
  const canvasElements = [
    { selector: '#room-floor', canvasId: '#canvas-oak' },
    { selector: '#window-backdrop', canvasId: '#canvas-view' }
  ];

  canvasElements.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) {
      const mesh = el.getObject3D('mesh');
      if (mesh && mesh.material && mesh.material.map) {
        mesh.material.map.needsUpdate = true;
      }
    }
  });
}

// Register custom A-Frame components
function registerAFrameComponents() {
  if (typeof AFRAME === 'undefined') {
    window.addEventListener('load', registerAFrameComponents);
    return;
  }

  if (AFRAME.components['hotspot-item']) return;

  // 1. Hotspot component (if furniture is toggled on later)
  AFRAME.registerComponent('hotspot-item', {
    schema: {
      itemKey: { type: 'string', default: 'sofa' },
      label: { type: 'string', default: 'Product Info' }
    },
    init: function () {
      const el = this.el;
      el.classList.add('clickable');

      el.addEventListener('mouseenter', () => {
        el.setAttribute('material', 'color', '#ffffff');
        document.body.style.cursor = 'pointer';
      });

      el.addEventListener('mouseleave', () => {
        el.setAttribute('material', 'color', '#aa3bff');
        document.body.style.cursor = 'default';
      });

      el.addEventListener('click', (evt) => {
        evt.stopPropagation();
      });
    }
  });

  // 2. VR In-Headset Swatch Component
  AFRAME.registerComponent('vr-swatch', {
    schema: {
      type: { type: 'string', default: 'paint' }, // 'paint' | 'wallpaper' | 'floor' | 'light'
      value: { type: 'string', default: '#f4f1ea' },
      name: { type: 'string', default: '' },
      target: { type: 'string', default: 'accent' }
    },
    init: function () {
      const el = this.el;
      const data = this.data;
      el.classList.add('clickable');

      el.addEventListener('mouseenter', () => {
        el.setAttribute('scale', '1.25 1.25 1.25');
      });

      el.addEventListener('mouseleave', () => {
        el.setAttribute('scale', '1.0 1.0 1.0');
      });

      el.addEventListener('click', (evt) => {
        evt.stopPropagation();
        if (data.type === 'paint') {
          applyPaintColor(data.value, data.name, interiorState.activeTarget);
        } else if (data.type === 'wallpaper') {
          applyWallpaper(data.value, interiorState.activeTarget);
        } else if (data.type === 'floor') {
          applyFloorMaterial(data.value);
        } else if (data.type === 'light') {
          applyLightingPreset(data.value);
        }
      });
    }
  });

  // 3. Teleport floor marker
  AFRAME.registerComponent('teleport-marker', {
    schema: {
      pos: { type: 'vec3', default: { x: 0, y: 0, z: 2 } },
      rot: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
    },
    init: function () {
      const el = this.el;
      const data = this.data;
      el.classList.add('clickable');

      el.addEventListener('mouseenter', () => el.setAttribute('material', 'opacity', 0.9));
      el.addEventListener('mouseleave', () => el.setAttribute('material', 'opacity', 0.5));
      el.addEventListener('click', () => teleportRig(data.pos, data.rot));
    }
  });
}

// Teleport the player rig smoothly
export function teleportRig(pos, rot) {
  const rig = document.getElementById('rig');
  if (!rig) return;

  rig.setAttribute('position', `${pos.x} ${pos.y || 0} ${pos.z}`);
  if (rot) {
    rig.setAttribute('rotation', `${rot.x || 0} ${rot.y || 0} ${rot.z || 0}`);
  }
}

// Get the target wall DOM elements based on target selection
function getTargetWallElements(target = interiorState.activeTarget) {
  const accentWall = document.getElementById('wall-back');
  const leftWall = document.getElementById('wall-left');
  const frontWall = document.getElementById('wall-front');

  if (target === 'accent') {
    return accentWall ? [accentWall] : [];
  } else if (target === 'left') {
    return leftWall ? [leftWall] : [];
  } else if (target === 'front') {
    return frontWall ? [frontWall] : [];
  } else if (target === 'other') {
    // All non-accent walls
    return [leftWall, frontWall].filter(Boolean);
  } else {
    // 'all'
    return [accentWall, leftWall, frontWall].filter(Boolean);
  }
}

// Apply Paint Color to specified walls
export function applyPaintColor(hex, name, target = interiorState.activeTarget) {
  const sheenConfig = FINISH_CATALOG.sheens[interiorState.activeSheen] || FINISH_CATALOG.sheens.matte;
  const walls = getTargetWallElements(target);

  walls.forEach((wall) => {
    // Reset any texture/wallpaper mapping
    wall.removeAttribute('material');
    wall.setAttribute('material', {
      color: hex,
      roughness: sheenConfig.roughness,
      metalness: sheenConfig.metalness,
      shader: 'standard'
    });
  });

  if (target === 'accent' || target === 'all') {
    interiorState.accentFinish = { type: 'paint', hex, name };
  }
  if (target !== 'accent') {
    interiorState.mainFinish = { type: 'paint', hex, name };
  }

  // Update UI active swatch pill
  document.querySelectorAll('.paint-color-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.hex === hex);
  });
  document.querySelectorAll('.wallpaper-pill').forEach((btn) => {
    btn.classList.remove('active');
  });

  const customColorInput = document.getElementById('paint-color-input');
  const customHexInput = document.getElementById('paint-hex-input');
  if (customColorInput && hex && hex.startsWith('#')) customColorInput.value = hex;
  if (customHexInput && hex) customHexInput.value = hex.toUpperCase();

  const label = document.getElementById('active-finish-name');
  if (label) label.textContent = `${name} (${interiorState.activeSheen.toUpperCase()} Paint)`;
}

// Apply Wallpaper Pattern to specified walls
export function applyWallpaper(wallpaperId, target = interiorState.activeTarget) {
  const wp = FINISH_CATALOG.wallpapers.find((w) => w.id === wallpaperId) || FINISH_CATALOG.wallpapers[0];
  const walls = getTargetWallElements(target);

  walls.forEach((wall) => {
    wall.removeAttribute('material');
    wall.setAttribute('material', {
      src: wp.canvasId,
      repeat: wp.repeat,
      roughness: wp.roughness,
      metalness: wp.metalness || 0.0,
      shader: 'standard'
    });

    const mesh = wall.getObject3D('mesh');
    if (mesh && mesh.material && mesh.material.map) {
      mesh.material.map.needsUpdate = true;
    }
  });

  if (target === 'accent' || target === 'all') {
    interiorState.accentFinish = { type: 'wallpaper', id: wp.id, name: wp.name };
  }

  // Update UI
  document.querySelectorAll('.wallpaper-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.id === wallpaperId);
  });
  document.querySelectorAll('.paint-color-pill').forEach((btn) => {
    btn.classList.remove('active');
  });

  const label = document.getElementById('active-finish-name');
  if (label) label.textContent = `${wp.name} (Wallpaper)`;
}

// Apply Paint Sheen (Matte / Satin / Gloss)
export function applyPaintSheen(sheenId) {
  interiorState.activeSheen = sheenId;
  const sheenConfig = FINISH_CATALOG.sheens[sheenId] || FINISH_CATALOG.sheens.matte;

  document.querySelectorAll('.sheen-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.sheen === sheenId);
  });

  // Re-apply sheen properties to any walls that currently have paint (no canvas src)
  const allWalls = getTargetWallElements('all');
  allWalls.forEach((wall) => {
    const mat = wall.getAttribute('material');
    if (mat && !mat.src) {
      wall.setAttribute('material', 'roughness', sheenConfig.roughness);
      wall.setAttribute('material', 'metalness', sheenConfig.metalness);
    }
  });

  const label = document.getElementById('active-finish-name');
  if (label && interiorState.accentFinish.type === 'paint') {
    label.textContent = `${interiorState.accentFinish.name} (${sheenId.toUpperCase()} Paint)`;
  }
}

// Set Target Wall (Accent vs All vs Left vs Front)
export function setTargetWall(targetId) {
  interiorState.activeTarget = targetId;

  document.querySelectorAll('.wall-target-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.targetWall === targetId);
  });

  const targetLabel = document.getElementById('active-target-label');
  if (targetLabel) {
    const names = {
      accent: 'Accent Feature Wall (Back)',
      all: 'All Room Walls',
      left: 'Left Wall',
      front: 'Front Entrance Wall'
    };
    targetLabel.textContent = names[targetId] || targetId;
  }
}

// Apply Flooring Material
export function applyFloorMaterial(floorId) {
  const floorConfig = FINISH_CATALOG.floors.find((f) => f.id === floorId) || FINISH_CATALOG.floors[0];
  interiorState.floorMaterial = floorConfig.id;

  const floorEl = document.getElementById('room-floor');
  if (floorEl) {
    floorEl.setAttribute('material', {
      src: floorConfig.canvasId,
      repeat: floorConfig.repeat,
      roughness: floorConfig.roughness,
      metalness: floorConfig.metalness || 0.05
    });

    const mesh = floorEl.getObject3D('mesh');
    if (mesh && mesh.material && mesh.material.map) {
      mesh.material.map.needsUpdate = true;
    }
  }

  // Update 2D UI pills
  document.querySelectorAll('.floor-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.floor === floorId);
  });

  const activeFloorLabel = document.getElementById('active-floor-name');
  if (activeFloorLabel) activeFloorLabel.textContent = floorConfig.name;
}

// Apply Lighting Scenario Preset
export function applyLightingPreset(preset) {
  interiorState.lightingPreset = preset;

  const sunLight = document.getElementById('sun-light');
  const ambientLight = document.getElementById('ambient-light');
  const sky = document.querySelector('a-sky');
  const coveLights = document.querySelectorAll('.cove-light');
  const ceilingSpots = document.querySelectorAll('.ceiling-spot');
  const windowScene = document.getElementById('window-backdrop');

  if (preset === 'day') {
    // Crisp daylight for accurate color rendering
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #ffffff; intensity: 0.85');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #fffdf5; intensity: 1.4; castShadow: true');
    if (sunLight) sunLight.setAttribute('position', '5 8 4');
    if (sky) sky.setAttribute('color', '#d9e9f7');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 1; color: #ffffff');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.15'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 0.4'));
  } else if (preset === 'sunset') {
    // Warm sunset to inspect warm light reaction on paint/wallpaper
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #ffd6b3; intensity: 0.6');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #ff8c42; intensity: 2.0; castShadow: true');
    if (sunLight) sunLight.setAttribute('position', '8 2.5 5');
    if (sky) sky.setAttribute('color', '#fca374');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 0.9; color: #ffb885');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.45; color: #ff9d47'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 0.7; color: #ffe2bd'));
  } else if (preset === 'night') {
    // Night artificial light inspection (spotlights & architectural cove)
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #161e30; intensity: 0.3');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #3b4e70; intensity: 0.2; castShadow: false');
    if (sunLight) sunLight.setAttribute('position', '4 8 3');
    if (sky) sky.setAttribute('color', '#090d16');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 0.35; color: #3b5072');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.9; color: #ffa756'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 1.3; color: #fff1d6'));
  }

  document.querySelectorAll('.lighting-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.preset === preset);
  });
}

// Toggle Furniture Visibility (Default false, ready for later use)
export function toggleFurniture(force) {
  const group = document.getElementById('furniture-group');
  if (!group) return;

  interiorState.furnitureVisible = typeof force === 'boolean' ? force : !interiorState.furnitureVisible;
  group.setAttribute('visible', interiorState.furnitureVisible);

  const btn = document.getElementById('toggle-furniture-btn');
  if (btn) {
    btn.classList.toggle('active', interiorState.furnitureVisible);
    btn.textContent = interiorState.furnitureVisible ? '🪑 Hide Furniture (Clear Walls)' : '🪑 Show Furniture (For Staging)';
  }
}

// Toggle Architectural Dimensions Overlay
export function toggleDimensions(force) {
  interiorState.dimensionsVisible = typeof force === 'boolean' ? force : !interiorState.dimensionsVisible;
  const overlay = document.getElementById('dimension-overlay');
  if (overlay) {
    overlay.setAttribute('visible', interiorState.dimensionsVisible);
  }

  const btn = document.getElementById('toggle-dimensions-btn');
  if (btn) {
    btn.classList.toggle('active', interiorState.dimensionsVisible);
    btn.textContent = interiorState.dimensionsVisible ? '📐 Hide Measurements' : '📐 Show Measurements';
  }
}

// Setup 2D HUD UI Interactions
function setupUI() {
  // Tabs switching
  const tabs = document.querySelectorAll('.hud-tab-btn');
  const panes = document.querySelectorAll('.hud-pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.dataset.target);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Target wall selector buttons
  document.querySelectorAll('.wall-target-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setTargetWall(btn.dataset.targetWall);
    });
  });

  // Paint color buttons
  document.querySelectorAll('.paint-color-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyPaintColor(btn.dataset.hex, btn.dataset.name, interiorState.activeTarget);
    });
  });

  // Custom Color Wheel & Hex Field
  const colorInput = document.getElementById('paint-color-input');
  const hexInput = document.getElementById('paint-hex-input');

  if (colorInput) {
    colorInput.addEventListener('input', (e) => {
      const hex = e.target.value;
      if (hexInput) hexInput.value = hex.toUpperCase();
      applyPaintColor(hex, `Custom (${hex.toUpperCase()})`, interiorState.activeTarget);
    });
  }

  if (hexInput) {
    hexInput.addEventListener('input', (e) => {
      let val = e.target.value.trim();
      if (!val.startsWith('#') && val.length > 0) val = '#' + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        if (colorInput) colorInput.value = val;
        applyPaintColor(val, `Custom (${val.toUpperCase()})`, interiorState.activeTarget);
      }
    });
  }

  // Wallpaper buttons
  document.querySelectorAll('.wallpaper-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyWallpaper(btn.dataset.id, interiorState.activeTarget);
    });
  });

  // Sheen buttons
  document.querySelectorAll('.sheen-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyPaintSheen(btn.dataset.sheen);
    });
  });

  // Flooring buttons
  document.querySelectorAll('.floor-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyFloorMaterial(btn.dataset.floor);
    });
  });

  // Lighting scenario buttons
  document.querySelectorAll('.lighting-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLightingPreset(btn.dataset.preset);
    });
  });

  // Dimension toggle button
  const dimBtn = document.getElementById('toggle-dimensions-btn');
  if (dimBtn) {
    dimBtn.addEventListener('click', () => toggleDimensions());
  }

  // Furniture toggle button
  const furnBtn = document.getElementById('toggle-furniture-btn');
  if (furnBtn) {
    furnBtn.addEventListener('click', () => toggleFurniture());
  }

  // Quick viewpoint buttons
  document.querySelectorAll('.viewpoint-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const x = parseFloat(btn.dataset.x);
      const y = parseFloat(btn.dataset.y);
      const z = parseFloat(btn.dataset.z);
      const rx = parseFloat(btn.dataset.rx || 0);
      const ry = parseFloat(btn.dataset.ry || 0);
      teleportRig({ x, y, z }, { x: rx, y: ry, z: 0 });
    });
  });

  // Toggle HUD minimize/expand
  const hudToggle = document.getElementById('hud-toggle-btn');
  const hudClose = document.getElementById('hud-close-btn');
  const hudPanel = document.getElementById('interior-hud');

  if (hudClose && hudPanel) {
    hudClose.addEventListener('click', () => {
      hudPanel.classList.add('collapsed');
    });
  }

  if (hudToggle && hudPanel) {
    hudToggle.addEventListener('click', () => {
      hudPanel.classList.remove('collapsed');
    });
  }

  // Bind globals for inline onclicks or console debugging
  if (typeof window !== 'undefined') {
    window.teleportRig = teleportRig;
    window.applyPaintColor = applyPaintColor;
    window.applyWallpaper = applyWallpaper;
    window.applyPaintSheen = applyPaintSheen;
    window.setTargetWall = setTargetWall;
    window.applyFloorMaterial = applyFloorMaterial;
    window.applyLightingPreset = applyLightingPreset;
    window.toggleDimensions = toggleDimensions;
    window.toggleFurniture = toggleFurniture;
  }
}

// Setup GLB / GLTF Drag-and-Drop and File Picker
function setupDragAndDrop() {
  const fileInput = document.getElementById('glb-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) loadCustomGlbFile(file);
    });
  }

  const dropZone = document.getElementById('model-drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-active');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-active');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-active');
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
        loadCustomGlbFile(file);
      } else {
        alert('Please drop a 3D model file ending in .glb or .gltf');
      }
    });
  }

  const toggleModelBtn = document.getElementById('toggle-model-view-btn');
  if (toggleModelBtn) {
    toggleModelBtn.addEventListener('click', () => {
      const builtInRoom = document.getElementById('procedural-room');
      const customRoom = document.getElementById('custom-model-container');
      if (!builtInRoom || !customRoom) return;

      const isCustomActive = customRoom.getAttribute('visible') === true || customRoom.getAttribute('visible') === 'true';
      if (isCustomActive) {
        customRoom.setAttribute('visible', false);
        builtInRoom.setAttribute('visible', true);
        toggleModelBtn.textContent = 'Switch to Custom 3D Model';
      } else {
        builtInRoom.setAttribute('visible', false);
        customRoom.setAttribute('visible', true);
        toggleModelBtn.textContent = 'Switch to Paint & Wallpaper Studio';
      }
    });
  }
}

// Load user-supplied GLB file
export function loadCustomGlbFile(file) {
  const blobUrl = URL.createObjectURL(file);
  const customModelEl = document.getElementById('custom-model-entity');
  const customContainer = document.getElementById('custom-model-container');
  const builtInRoom = document.getElementById('procedural-room');
  const statusLabel = document.getElementById('custom-model-status');

  if (customModelEl && customContainer && builtInRoom) {
    customModelEl.setAttribute('gltf-model', blobUrl);
    customContainer.setAttribute('visible', true);
    builtInRoom.setAttribute('visible', false);

    if (statusLabel) {
      statusLabel.textContent = `Loaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`;
      statusLabel.style.color = '#38b000';
    }

    const toggleBtn = document.getElementById('toggle-model-view-btn');
    if (toggleBtn) {
      toggleBtn.style.display = 'inline-block';
      toggleBtn.textContent = 'Switch to Paint & Wallpaper Studio';
    }
  }
}

// Self-init on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteriorApp);
  } else {
    initInteriorApp();
  }
}
