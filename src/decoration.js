import { generateAllTextures } from './textures.js';

// Interior Design & Decoration State
export const decorationState = {
  sofaFabric: 'boucle',
  tableStone: 'travertine',
  chairWood: 'oak',
  floorMaterial: 'oak',
  wallColor: '#f4f1ea',
  lightingPreset: 'day',
  dimensionsVisible: false,
  customModelLoaded: false
};

// Finish Catalog for Furniture & Decoration
export const DECORATION_CATALOG = {
  sofaFabrics: [
    { id: 'boucle', name: 'Natural Textured Bouclé', hex: '#eae6df', roughness: 0.9, metalness: 0.0 },
    { id: 'cognac', name: 'Saddle Cognac Leather', hex: '#8c4a26', roughness: 0.38, metalness: 0.05 },
    { id: 'emerald', name: 'Forest Emerald Velvet', hex: '#1e3b2b', roughness: 0.75, metalness: 0.0 },
    { id: 'slate', name: 'Charcoal Herringbone Weave', hex: '#29292e', roughness: 0.85, metalness: 0.0 }
  ],
  tableStones: [
    { id: 'travertine', name: 'Honed Roman Travertine', canvasId: '#canvas-travertine', roughness: 0.6, metalness: 0.0 },
    { id: 'carrara', name: 'Italian Carrara Marble', canvasId: '#canvas-marble', roughness: 0.2, metalness: 0.08 },
    { id: 'marquina', name: 'Nero Marquina Black Marble', canvasId: '#canvas-marble-black', roughness: 0.18, metalness: 0.1 }
  ],
  chairWoods: [
    { id: 'oak', name: 'Natural White Oak', hex: '#dfcaa4', roughness: 0.5 },
    { id: 'walnut', name: 'Rich Smoked Walnut', hex: '#4a3325', roughness: 0.45 },
    { id: 'black', name: 'Ebonized Black Ash', hex: '#1c1c1f', roughness: 0.4 }
  ],
  floors: [
    { id: 'oak', name: 'Scandinavian White Oak', canvasId: '#canvas-oak', repeat: '4 4', roughness: 0.45 },
    { id: 'walnut', name: 'American Dark Walnut', canvasId: '#canvas-walnut', repeat: '4 4', roughness: 0.4 },
    { id: 'marble', name: 'Italian Carrara Marble', canvasId: '#canvas-marble', repeat: '4 4', roughness: 0.15, metalness: 0.1 },
    { id: 'concrete', name: 'Architectural Polished Concrete', canvasId: '#canvas-concrete', repeat: '3 3', roughness: 0.35 }
  ],
  walls: [
    { id: 'alabaster', name: 'Alabaster White', hex: '#f4f1ea' },
    { id: 'sage', name: 'Olive Haze', hex: '#7a8471' },
    { id: 'terracotta', name: 'Warm Terracotta', hex: '#a35d4d' },
    { id: 'charcoal', name: 'Parisian Charcoal', hex: '#2c3036' },
    { id: 'greige', name: 'Nordic Greige', hex: '#d4c8ba' },
    { id: 'navy', name: 'Aegean Navy', hex: '#1e2b3c' }
  ]
};

// Furniture Specifications for Hotspot Modals
export const FURNITURE_SPECS = {
  sofa: {
    title: 'VITA Modular Lounge Sectional',
    category: 'Seating & Upholstery',
    designer: 'Atelier Studio Copenhagen',
    dimensions: '280 cm (W) × 185 cm (D) × 74 cm (H)',
    seatHeight: '42 cm (16.5 in)',
    materials: 'Kiln-dried FSC beech frame, multi-density high-resilience foam, feather-down wrap',
    price: '$3,850 USD',
    leadTime: '3-4 weeks',
    description: 'Generously proportioned modular sofa with deep seats, organic silhouette, and tailored seams. Designed for relaxed social lounging and architectural interiors.'
  },
  table: {
    title: 'AURA Travertine Oval Cocktail Table',
    category: 'Occasional Tables',
    designer: 'Studio Luca & Co., Milan',
    dimensions: '130 cm (L) × 75 cm (W) × 34 cm (H)',
    weight: '68 kg (Solid Stone)',
    materials: 'Honed Roman Travertine with open pores, matte biological sealer',
    price: '$1,920 USD',
    leadTime: 'In Stock',
    description: 'Monolithic organic cocktail table sculpted from untreated honed Roman travertine. The subtle creamy tones and natural voids celebrate raw earthen textures.'
  },
  chair: {
    title: 'SOLIS Sculptural Reading Armchair',
    category: 'Accent Seating',
    designer: 'Kari Nieminen',
    dimensions: '82 cm (W) × 85 cm (D) × 78 cm (H)',
    seatHeight: '40 cm',
    materials: 'Steam-bent solid white oak, tailored wool blend cushion, concealed brass pivot hardware',
    price: '$1,480 USD',
    leadTime: '2 weeks',
    description: 'An ergonomic statement lounge chair featuring a continuous curved solid oak backrest and deep floating feather-down seat cushion.'
  },
  lamp: {
    title: 'ARCUS Architectural Overhang Floor Lamp',
    category: 'Architectural Lighting',
    designer: 'Henrik Flindt',
    dimensions: '195 cm (H) × 140 cm (Reach) × 38 cm Base',
    specs: 'Integrated 2700K warm LED (1600 lumens), step-less touch dimmer, CRI 96',
    materials: 'Spun brushed brass arm & reflector, honed Nero Marquina marble cylindrical base',
    price: '$1,150 USD',
    leadTime: 'In Stock',
    description: 'A grand architectural arc that extends illumination gracefully over the seating ensemble without requiring ceiling wiring.'
  },
  wallArt: {
    title: 'Terrene Harmony No. 04 (Original Canvas)',
    category: 'Curated Fine Art',
    designer: 'Uncredited',
    dimensions: '180 cm (W) × 120 cm (H) × 4.5 cm (D)',
    materials: 'Natural mineral pigments and plaster on raw Belgian linen, ebonized ash floating frame',
    price: '$2,400 USD',
    leadTime: 'Original Piece (1 of 1)',
    description: 'Large-scale abstract color field exploring terracotta, washed sage, and negative space to anchor high-ceiling modern spaces.'
  },
  slats: {
    title: 'ACOUSTIX Architectural Wood Slat Wall',
    category: 'Architectural Surfaces',
    designer: 'Nordic Acoustic Systems',
    dimensions: '3.6 m (W) × 3.0 m (H) coverage',
    specs: 'NRC (Noise Reduction Coefficient) 0.85, Class A fire rated',
    materials: 'Natural American white oak real-wood veneer slats over 9mm recycled PET acoustic felt',
    price: '$145 / m²',
    leadTime: '1-2 weeks',
    description: 'Improves room acoustics while adding vertical cadence, warmth, and modern architectural texture to primary feature walls.'
  }
};

// Initialize decoration showroom app
export function initDecorationApp() {
  generateAllTextures();
  registerAFrameComponents();
  setupUI();
  setupDragAndDrop();

  const scene = document.querySelector('a-scene');
  if (scene) {
    if (scene.hasLoaded) {
      refreshAllTextures();
    } else {
      scene.addEventListener('loaded', refreshAllTextures);
    }
  }

  // Initial defaults
  applyLightingPreset('day');
  applyFloorMaterial('oak');
  applyWallColor('#f4f1ea', 'Alabaster White');
  applySofaFabric('boucle');
  applyTableStone('travertine');
  applyChairWood('oak');
}

function refreshAllTextures() {
  const targets = [
    { selector: '#room-floor', map: '#canvas-oak' },
    { selector: '#table-top', map: '#canvas-travertine' },
    { selector: '#slat-wall', map: '#canvas-slats' },
    { selector: '#window-backdrop', map: '#canvas-view' }
  ];

  targets.forEach((t) => {
    const el = document.querySelector(t.selector);
    if (el) {
      const mesh = el.getObject3D('mesh');
      if (mesh && mesh.material && mesh.material.map) {
        mesh.material.map.needsUpdate = true;
      }
    }
  });
}

function registerAFrameComponents() {
  if (typeof AFRAME === 'undefined') {
    window.addEventListener('load', registerAFrameComponents);
    return;
  }

  if (AFRAME.components['hotspot-item']) return;

  // 1. Hotspot component
  AFRAME.registerComponent('hotspot-item', {
    schema: {
      itemKey: { type: 'string', default: 'sofa' }
    },
    init: function () {
      const el = this.el;
      const data = this.data;
      el.classList.add('clickable');

      el.setAttribute('animation__hover', {
        property: 'scale',
        dir: 'alternate',
        dur: 1200,
        easing: 'easeInOutSine',
        loop: true,
        to: '1.2 1.2 1.2'
      });

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
        openFurnitureModal(data.itemKey);
      });
    }
  });

  // 2. Quick Teleport Floor Marker Component
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

export function teleportRig(pos, rot) {
  const rig = document.getElementById('rig');
  if (!rig) return;

  rig.setAttribute('position', `${pos.x} ${pos.y || 0} ${pos.z}`);
  if (rot) {
    rig.setAttribute('rotation', `${rot.x || 0} ${rot.y || 0} ${rot.z || 0}`);
  }
}

// 1. Apply Sofa Upholstery Fabric
export function applySofaFabric(id) {
  const config = DECORATION_CATALOG.sofaFabrics.find((f) => f.id === id) || DECORATION_CATALOG.sofaFabrics[0];
  decorationState.sofaFabric = config.id;

  const cushions = document.querySelectorAll('.sofa-cushion');
  cushions.forEach((el) => {
    el.setAttribute('material', {
      color: config.hex,
      roughness: config.roughness,
      metalness: config.metalness
    });
  });

  document.querySelectorAll('.sofa-fabric-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.fabric === id);
  });

  const label = document.getElementById('active-sofa-label');
  if (label) label.textContent = config.name;
}

// 2. Apply Table Stone Material (Travertine, Carrara Marble, Nero Marquina)
export function applyTableStone(id) {
  const config = DECORATION_CATALOG.tableStones.find((s) => s.id === id) || DECORATION_CATALOG.tableStones[0];
  decorationState.tableStone = config.id;

  const tabletop = document.getElementById('table-top');
  if (tabletop) {
    tabletop.setAttribute('material', {
      src: config.canvasId,
      roughness: config.roughness,
      metalness: config.metalness
    });

    const mesh = tabletop.getObject3D('mesh');
    if (mesh && mesh.material && mesh.material.map) {
      mesh.material.map.needsUpdate = true;
    }
  }

  document.querySelectorAll('.table-stone-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.stone === id);
  });

  const label = document.getElementById('active-table-label');
  if (label) label.textContent = config.name;
}

// 3. Apply Accent Chair Wood
export function applyChairWood(id) {
  const config = DECORATION_CATALOG.chairWoods.find((w) => w.id === id) || DECORATION_CATALOG.chairWoods[0];
  decorationState.chairWood = config.id;

  const chairFrames = document.querySelectorAll('.chair-wood');
  chairFrames.forEach((el) => {
    el.setAttribute('material', {
      color: config.hex,
      roughness: config.roughness
    });
  });

  document.querySelectorAll('.chair-wood-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.wood === id);
  });

  const label = document.getElementById('active-chair-label');
  if (label) label.textContent = config.name;
}

// 4. Apply Flooring
export function applyFloorMaterial(id) {
  const floorConfig = DECORATION_CATALOG.floors.find((f) => f.id === id) || DECORATION_CATALOG.floors[0];
  decorationState.floorMaterial = floorConfig.id;

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

  document.querySelectorAll('.floor-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.floor === id);
  });

  const label = document.getElementById('active-floor-label');
  if (label) label.textContent = floorConfig.name;
}

// 5. Apply Wall Paint
export function applyWallColor(hex, name) {
  decorationState.wallColor = hex;

  const walls = document.querySelectorAll('.interior-wall');
  walls.forEach((wall) => {
    wall.setAttribute('material', {
      color: hex,
      roughness: 0.9
    });
  });

  document.querySelectorAll('.wall-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.hex === hex);
  });

  const label = document.getElementById('active-wall-label');
  if (label) label.textContent = name || hex;
}

// 6. Apply Lighting Scenario
export function applyLightingPreset(preset) {
  decorationState.lightingPreset = preset;

  const sunLight = document.getElementById('sun-light');
  const ambientLight = document.getElementById('ambient-light');
  const sky = document.querySelector('a-sky');
  const lampLight = document.getElementById('floor-lamp-light');
  const coveLights = document.querySelectorAll('.cove-light');
  const ceilingSpots = document.querySelectorAll('.ceiling-spot');
  const windowScene = document.getElementById('window-backdrop');

  if (preset === 'day') {
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #ffffff; intensity: 0.8');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #fffdf5; intensity: 1.4; castShadow: true');
    if (sunLight) sunLight.setAttribute('position', '5 8 4');
    if (sky) sky.setAttribute('color', '#d9e9f7');
    if (lampLight) lampLight.setAttribute('light', 'intensity: 0.3; color: #ffe7ba');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 1; color: #ffffff');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.15'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 0.35'));
  } else if (preset === 'sunset') {
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #ffd6b3; intensity: 0.55');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #ff8c42; intensity: 2.0; castShadow: true');
    if (sunLight) sunLight.setAttribute('position', '8 2.5 5');
    if (sky) sky.setAttribute('color', '#fca374');
    if (lampLight) lampLight.setAttribute('light', 'intensity: 1.2; color: #ffa24c');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 0.9; color: #ffb885');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.45; color: #ff9d47'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 0.65; color: #ffe2bd'));
  } else if (preset === 'night') {
    if (ambientLight) ambientLight.setAttribute('light', 'type: ambient; color: #161e30; intensity: 0.25');
    if (sunLight) sunLight.setAttribute('light', 'type: directional; color: #3b4e70; intensity: 0.2; castShadow: false');
    if (sunLight) sunLight.setAttribute('position', '4 8 3');
    if (sky) sky.setAttribute('color', '#090d16');
    if (lampLight) lampLight.setAttribute('light', 'intensity: 2.2; color: #ffaa55');
    if (windowScene) windowScene.setAttribute('material', 'opacity: 0.35; color: #3b5072');

    coveLights.forEach((l) => l.setAttribute('light', 'intensity: 0.9; color: #ffa756'));
    ceilingSpots.forEach((s) => s.setAttribute('light', 'intensity: 1.3; color: #fff1d6'));
  }

  document.querySelectorAll('.lighting-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.preset === preset);
  });
}

// 7. Toggle Dimensions
export function toggleDimensions(force) {
  decorationState.dimensionsVisible = typeof force === 'boolean' ? force : !decorationState.dimensionsVisible;
  const overlay = document.getElementById('dimension-overlay');
  if (overlay) {
    overlay.setAttribute('visible', decorationState.dimensionsVisible);
  }

  const btn = document.getElementById('toggle-dimensions-btn');
  if (btn) {
    btn.classList.toggle('active', decorationState.dimensionsVisible);
    btn.textContent = decorationState.dimensionsVisible ? '📐 Hide Measurements' : '📐 Show Measurements';
  }
}

// 8. Product Hotspot Modal
export function openFurnitureModal(key) {
  const spec = FURNITURE_SPECS[key];
  if (!spec) return;

  const modal = document.getElementById('furniture-modal');
  const title = document.getElementById('modal-title');
  const cat = document.getElementById('modal-category');
  const dims = document.getElementById('modal-dims');
  const mats = document.getElementById('modal-materials');
  const price = document.getElementById('modal-price');
  const desc = document.getElementById('modal-desc');

  if (title) title.textContent = spec.title;
  if (cat) cat.textContent = `${spec.category} • by ${spec.designer}`;
  if (dims) dims.textContent = spec.dimensions;
  if (mats) mats.textContent = spec.materials;
  if (price) price.textContent = `${spec.price} (${spec.leadTime})`;
  if (desc) desc.textContent = spec.description;

  if (modal) modal.classList.add('visible');
}

export function closeFurnitureModal() {
  const modal = document.getElementById('furniture-modal');
  if (modal) modal.classList.remove('visible');
}

// Setup UI Event Listeners
function setupUI() {
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

  // Sofa fabric pills
  document.querySelectorAll('.sofa-fabric-pill').forEach((btn) => {
    btn.addEventListener('click', () => applySofaFabric(btn.dataset.fabric));
  });

  // Table stone pills
  document.querySelectorAll('.table-stone-pill').forEach((btn) => {
    btn.addEventListener('click', () => applyTableStone(btn.dataset.stone));
  });

  // Chair wood pills
  document.querySelectorAll('.chair-wood-pill').forEach((btn) => {
    btn.addEventListener('click', () => applyChairWood(btn.dataset.wood));
  });

  // Floor pills
  document.querySelectorAll('.floor-pill').forEach((btn) => {
    btn.addEventListener('click', () => applyFloorMaterial(btn.dataset.floor));
  });

  // Wall color pills
  document.querySelectorAll('.wall-pill').forEach((btn) => {
    btn.addEventListener('click', () => applyWallColor(btn.dataset.hex, btn.dataset.name));
  });

  // Lighting buttons
  document.querySelectorAll('.lighting-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLightingPreset(btn.dataset.preset));
  });

  // Dimensions button
  const dimBtn = document.getElementById('toggle-dimensions-btn');
  if (dimBtn) dimBtn.addEventListener('click', () => toggleDimensions());

  // Viewpoint buttons
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

  // Modal close
  const modalClose = document.getElementById('modal-close-btn');
  if (modalClose) modalClose.addEventListener('click', closeFurnitureModal);

  const modal = document.getElementById('furniture-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeFurnitureModal();
    });
  }

  // HUD collapse toggle
  const hudToggle = document.getElementById('hud-toggle-btn');
  const hudClose = document.getElementById('hud-close-btn');
  const hudPanel = document.getElementById('interior-hud');

  if (hudClose && hudPanel) {
    hudClose.addEventListener('click', () => hudPanel.classList.add('collapsed'));
  }
  if (hudToggle && hudPanel) {
    hudToggle.addEventListener('click', () => hudPanel.classList.remove('collapsed'));
  }

  // Bind globals
  if (typeof window !== 'undefined') {
    window.teleportRig = teleportRig;
    window.openFurnitureModal = openFurnitureModal;
    window.closeFurnitureModal = closeFurnitureModal;
    window.applySofaFabric = applySofaFabric;
    window.applyTableStone = applyTableStone;
    window.applyChairWood = applyChairWood;
    window.applyFloorMaterial = applyFloorMaterial;
    window.applyWallColor = applyWallColor;
    window.applyLightingPreset = applyLightingPreset;
    window.toggleDimensions = toggleDimensions;
  }
}

// Drag and drop custom model
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
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-active'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-active');
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
        loadCustomGlbFile(file);
      }
    });
  }
}

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
  }
}

// Initialize on DOM load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDecorationApp);
  } else {
    initDecorationApp();
  }
}
