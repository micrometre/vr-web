# Browser-Based Interior Studios

This project contains two separate browser-based 3D experiences. The Paint & Wallpaper Studio is an A-Frame WebXR walkthrough for testing wall finishes. The Interior Room Composer is a Three.js room preview for changing colors, floors, lighting, and staging.

## Choose a Studio

| Studio | Best for | Technology |
| --- | --- | --- |
| [Paint & Wallpaper Studio](/paint-wallpaper-studio.html) | Comparing paint, sheen, wallpaper, lighting, and custom room models in an immersive walkthrough | A-Frame 1.6, A-Frame Extras, Blink Controls, WebXR |
| [Interior Room Composer](/room-composer.html) | Quickly composing a furnished room and comparing wall, floor, and lighting choices | Three.js 0.170, OrbitControls, WebXR VRButton |

Both experiences run in the browser and are built and served by Vite. They are separate implementations; controls and features are not shared between them.

## Features

### Paint & Wallpaper Studio

- Pick a custom wall color or enter a hex value; choose from ten preset colors.
- Compare matte, satin, and semi-gloss paint finishes.
- Apply five procedural wallpaper designs to the accent, left, front, or all walls. Canvas textures are generated in the browser.
- Compare four floor finishes and switch between daylight, golden-hour, and evening lighting presets.
- Use preset viewpoints, desktop movement, and WebXR controller locomotion where supported.
- Toggle furniture staging and room measurement overlays.
- Load a `.glb` or `.gltf` model with the file picker or drag-and-drop zone.

### Interior Room Composer

- Adjust wall color with preset swatches or a custom color picker.
- Compare white oak, dark walnut, Carrara marble, and polished concrete floor colors.
- Switch between daylight, golden-hour, and evening lighting.
- Toggle furniture staging and room measurement lines.
- Orbit and zoom the 3D preview with the mouse; use the WebXR button where supported.

## Technology

- **Vite 8** provides the development server and multi-page production build.
- **Paint & Wallpaper Studio:** A-Frame and its locomotion/teleport add-ons are loaded from external CDNs. Scene behavior and finish controls live in `src/interior.js`; procedural Canvas texture generation lives in `src/textures.js`.
- **Interior Room Composer:** Three.js is installed from npm and imported through the page's import map. Its scene, controls, and rendering loop are currently defined in `room-composer.html`.
- The project uses plain HTML, CSS, and JavaScript modules; it does not use a frontend framework.

The Paint & Wallpaper Studio needs network access to load its A-Frame scripts from the configured CDNs. The room composer loads Three.js modules from the local Vite-served `node_modules` directory.

## Requirements

- Node.js supported by Vite 8 (20.19+ or 22.12+)
- pnpm
- A modern browser with WebGL for the desktop 3D previews

Immersive WebXR requires a compatible browser and headset, browser permissions, and a secure context. HTTPS is required when hosted; `localhost` is treated as secure for local development. WebXR availability varies by browser and device, so the presence of a VR control does not guarantee headset support on every platform.

## Run Locally

Install the locked dependencies and start Vite:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by Vite. The default local address is usually `http://localhost:5173`; Vite selects another port if that one is busy.

### Production Build

```bash
pnpm build
pnpm preview
```

The build outputs all three pages to `dist/`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page and studio selector |
| `/paint-wallpaper-studio.html` | A-Frame paint and wallpaper walkthrough |
| `/room-composer.html` | Three.js interior room composer |

## Controls

| Studio | Desktop | Immersive mode |
| --- | --- | --- |
| Paint & Wallpaper Studio | `W`, `A`, `S`, `D` to move; click and drag to look; use the HUD and floor/viewpoint controls | A-Frame controller locomotion and teleport controls when supported |
| Interior Room Composer | Drag to orbit; scroll to zoom; use the room controls in the side panel | Enter through the Three.js WebXR button when supported |

## Project Structure

```text
front-end-vr/
├── index.html                    # Landing page and studio selector
├── paint-wallpaper-studio.html   # A-Frame WebXR experience
├── room-composer.html            # Three.js room composer
├── vite.config.js                # Multi-page Vite build inputs
├── package.json                  # Scripts and direct dependencies
├── pnpm-lock.yaml                # Locked pnpm dependency versions
├── public/                       # Static public assets
└── src/
    ├── landing.css               # Landing page styles
    ├── style.css                 # Paint studio HUD styles
    ├── interior.js               # Paint studio controls and scene behavior
    └── textures.js               # Procedural Canvas textures
```
