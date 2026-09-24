import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Type, Sun, Moon } from 'lucide-react';

/**
 * Creates an off-screen canvas texture with repeating bold typography.
 * Accurately replicates the Codrops "Kinetic Typography with Three.js" reference aesthetic.
 */
function createTypographyTexture(text = 'ENDLESS', theme = 'dark') {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0A0A09' : '#F5F2EA';
  const textColor = isDark ? '#FFFFFF' : '#141413';
  const borderColor = isDark ? '#262624' : '#E8E5DC';

  // Clear surface
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top & bottom edge stroke
  ctx.fillStyle = borderColor;
  ctx.fillRect(0, 0, canvas.width, 4);
  ctx.fillRect(0, canvas.height - 4, canvas.width, 4);

  // Heavy geometric sans font
  ctx.fillStyle = textColor;
  ctx.font = '900 135px "Manrope", "Inter", "Arial Black", "Montserrat", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const cleanText = (text || 'ENDLESS').trim().toUpperCase();
  const textWidth = ctx.measureText(cleanText).width;

  // Calculate repetitions to fill 2048px canvas evenly
  let repeats = Math.max(1, Math.round(canvas.width / (textWidth + 140)));
  if (repeats < 2 && cleanText.length < 10) repeats = 2;

  const segmentWidth = canvas.width / repeats;
  for (let i = 0; i < repeats; i++) {
    const x = i * segmentWidth + segmentWidth / 2;
    ctx.fillText(cleanText, x, canvas.height / 2 + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  return texture;
}

/**
 * 3D Mesh Component:
 * - TorusKnotGeometry with 3 radial segments (triangular ribbon prism)
 * - Custom GLSL Shader with conveyor UV scrolling and volumetric depth shadow
 * - Circular vortex rotation + 3D spatial orbit
 */
const TorusKnotRibbonMesh = ({
  text,
  theme,
  speedMultiplier = 1,
  reverse = false,
  isPaused = false,
}) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // Pure texture creation on text or theme change
  const texture = useMemo(() => {
    return createTypographyTexture(text, theme);
  }, [text, theme]);

  // Clean memory disposal when texture changes or unmounts
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uSpeed: { value: 0.18 },
      uRepeatX: { value: 8.0 }, // repetitions along the knot curve
      uRepeatY: { value: 3.0 }, // 3 repetitions for the 3 triangular faces
      uDepthDarkness: { value: theme === 'dark' ? 0.88 : 0.65 },
    }),
    [texture, theme]
  );

  // Update texture uniform whenever texture prop updates
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uDepthDarkness.value = theme === 'dark' ? 0.88 : 0.65;
    }
  }, [texture, theme]);

  // TorusKnotGeometry:
  // radius = 1.35, tube = 0.44, tubularSegments = 768 (smooth curves), radialSegments = 3 (triangular ribbon prism), p = 4, q = 3
  const geometry = useMemo(() => {
    return new THREE.TorusKnotGeometry(1.35, 0.44, 768, 3, 4, 3);
  }, []);

  // Kinetic animation loop: Conveyor flow + Circular rotation
  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    // 1. Kinetic conveyor stream
    if (!isPaused) {
      const dir = reverse ? -1 : 1;
      materialRef.current.uniforms.uTime.value += delta * speedMultiplier * dir;
    }

    // 2. Circular rotation around Z axis (creates the circular gear/vortex movement)
    const rotSpeed = isPaused ? 0.05 : 0.38;
    meshRef.current.rotation.z += delta * rotSpeed * (reverse ? -1 : 1);

    // 3. Gentle 3D spatial turn around Y and X axes to reveal depth
    meshRef.current.rotation.y += delta * 0.16;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.14;

    // 4. Subtle mouse tilt parallax
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.25;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + mouseX * 0.04,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouseY * 0.35,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPos;
          varying vec3 vNormal;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPos.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uSpeed;
          uniform float uRepeatX;
          uniform float uRepeatY;
          uniform float uDepthDarkness;

          varying vec2 vUv;
          varying vec3 vWorldPos;
          varying vec3 vNormal;

          void main() {
            // Scroll UV along knot length (X) and wrap around 3 faces (Y)
            vec2 uv = vec2(
              fract(vUv.x * uRepeatX - uTime * uSpeed),
              fract(vUv.y * uRepeatY)
            );

            vec4 tex = texture2D(uTexture, uv);

            // Codrops "fake shadow" volumetric depth illusion:
            // Foreground segments (high Z) are 100% bright
            // Receding segments (low Z) fade deeply into shadow
            float depth = smoothstep(-1.2, 1.2, vWorldPos.z);
            float shadow = mix(1.0 - uDepthDarkness, 1.0, depth);

            // Directional specular sheen along ribbon facets
            vec3 lightDir = normalize(vec3(0.4, 0.7, 1.0));
            float diff = max(dot(vNormal, lightDir), 0.0);
            float light = 0.82 + 0.28 * diff;

            vec3 finalColor = tex.rgb * shadow * light;
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Fallback for non-WebGL environments
const KnotFallback = () => (
  <div className="w-full h-full flex items-center justify-center p-6 text-center">
    <div className="p-6 rounded-2xl bg-[#0F0F0E] text-[#E8E5DC] font-mono text-xs max-w-sm space-y-2 border border-[#262624]">
      <div className="text-sm font-bold text-white tracking-widest uppercase">
        ENDLESS ✦ KINETIC 3D
      </div>
      <p className="text-[#8C8A82]">WebGL hardware acceleration active</p>
    </div>
  </div>
);

/**
 * Main Exported Component:
 * Embeds the 3D Canvas, Orbit Controls, and interactive text presets + custom input.
 */
export const KineticKnot3D = ({ className = '' }) => {
  const [activeText, setActiveText] = useState('ENDLESS');
  const [customInput, setCustomInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isPaused, setIsPaused] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const presets = [
    { label: 'ENDLESS', text: 'ENDLESS' },
    { label: 'PIYUSH', text: 'PIYUSH UJGAOKAR' },
    { label: 'FULL STACK', text: 'FULL STACK • MERN' },
    { label: 'GEMINI AI', text: 'GEMINI AI • SOCKET' },
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      setActiveText(customInput.trim());
      setShowInput(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full rounded-3xl transition-colors duration-300 border shadow-2xl overflow-hidden flex flex-col ${
        isDark
          ? 'bg-[#0F0F0E] border-[#262624]'
          : 'bg-[#FFFFFF] border-[#E8E5DC]'
      } ${className}`}
    >
      {/* Top Header Bar */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between text-xs font-mono transition-colors ${
          isDark
            ? 'bg-[#161614] border-[#262624] text-[#E8E5DC]'
            : 'bg-[#FAF8F5] border-[#E8E5DC] text-[#1E1E1C]'
        }`}
      >
        {/* <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider">
             TYPOGRAPHY
          </span>
          <span className="text-[#8C8A82] text-[10px] hidden sm:inline">
            // CODROPS TORUS KNOT
          </span>
        </div> */}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className={`p-1.5 rounded text-[11px] transition-colors ${
              isDark
                ? 'bg-[#222220] hover:bg-[#2D2D2A] text-[#E8E5DC]'
                : 'bg-[#E8E5DC] hover:bg-[#D5D2C9] text-[#1E1E1C]'
            }`}
            title="Toggle Ribbon Theme"
          >
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
          </button>

          {/* Reverse button */}
          <button
            onClick={() => setReverse((r) => !r)}
            className={`px-2 py-1 rounded text-[10px] transition-colors flex items-center gap-1 ${
              isDark
                ? 'bg-[#222220] hover:bg-[#2D2D2A] text-[#E8E5DC]'
                : 'bg-[#E8E5DC] hover:bg-[#D5D2C9] text-[#1E1E1C]'
            }`}
            title="Reverse Rotation Direction"
          >
            <RotateCcw size={11} className={reverse ? 'rotate-180 transition-transform' : ''} />
            <span className="hidden sm:inline">REVERSE</span>
          </button>

          {/* Pause / Resume button */}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`px-2 py-1 rounded text-[10px] transition-colors flex items-center gap-1 font-semibold ${
              isDark
                ? 'bg-[#222220] hover:bg-[#2D2D2A] text-[#E8E5DC]'
                : 'bg-[#E8E5DC] hover:bg-[#D5D2C9] text-[#1E1E1C]'
            }`}
            title={isPaused ? 'Resume Animation' : 'Pause Animation'}
          >
            {isPaused ? (
              <>
                <Play size={11} className="text-amber-400" />
                <span>RESUME</span>
              </>
            ) : (
              <>
                <Pause size={11} className="text-emerald-400" />
                <span>PAUSE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[450px] cursor-grab active:cursor-grabbing">
        <Suspense fallback={<KnotFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full"
          >
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.8}
            />
            <TorusKnotRibbonMesh
              text={activeText}
              theme={theme}
              speedMultiplier={speedMultiplier}
              reverse={reverse}
              isPaused={isPaused}
            />
          </Canvas>
        </Suspense>

        {/* Floating Hint Overlay */}
        {/* <div
          className={`absolute top-3 left-3 pointer-events-none px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-mono border ${
            isDark
              ? 'bg-black/60 border-white/10 text-[#8C8A82]'
              : 'bg-white/70 border-black/10 text-[#6E6E6A]'
          }`}
        >
          ✦ DRAG TO ROTATE 360° • CIRCULAR LOOP
        </div> */}

        {/* Active Phrase Overlay */}
        <div
          className={`absolute bottom-3 left-3 pointer-events-none px-3 py-1 rounded-full backdrop-blur-md text-[11px] font-mono border ${
            isDark
              ? 'bg-black/70 border-white/10 text-white'
              : 'bg-white/80 border-black/10 text-[#1E1E1C]'
          }`}
        >
          CURRENT: <strong className="font-bold">{activeText}</strong>
        </div>
      </div>

      {/* Bottom Preset Switcher & Custom Text Bar */}
      <div
        className={`p-3 border-t flex flex-wrap items-center justify-between gap-2 transition-colors ${
          isDark
            ? 'bg-[#141413] border-[#262624]'
            : 'bg-[#FAF8F5] border-[#E8E5DC]'
        }`}
      >
        {showInput ? (
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type custom text (e.g. YOUR COMPANY)..."
              maxLength={24}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-mono outline-none border ${
                isDark
                  ? 'bg-[#1E1E1C] border-[#3E3E38] text-white placeholder-[#6E6E6A] focus:border-white'
                  : 'bg-white border-[#D5D2C9] text-[#1E1E1C] placeholder-[#8C8A82] focus:border-[#1E1E1C]'
              }`}
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              APPLY
            </button>
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="px-2 py-1.5 rounded-lg text-xs font-mono text-[#8C8A82] hover:text-[#1E1E1C]"
            >
              CANCEL
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[#8C8A82] uppercase tracking-wider mr-1 hidden sm:inline">
                TEXT:
              </span>
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setActiveText(preset.text)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                    activeText === preset.text
                      ? isDark
                        ? 'bg-white text-[#0F0F0E] font-bold shadow-sm'
                        : 'bg-[#1E1E1C] text-[#F5F2EA] font-bold shadow-sm'
                      : isDark
                      ? 'bg-[#222220] text-[#8C8A82] hover:text-[#E8E5DC] hover:bg-[#2A2A28]'
                      : 'bg-white border border-[#E8E5DC] text-[#6E6E6A] hover:text-[#1E1E1C]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}

              {/* Custom input toggle */}
              <button
                onClick={() => {
                  setCustomInput(activeText);
                  setShowInput(true);
                }}
                className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1 transition-colors ${
                  isDark
                    ? 'text-[#8C8A82] hover:text-white hover:bg-[#222220]'
                    : 'text-[#6E6E6A] hover:text-[#1E1E1C] hover:bg-[#E8E5DC]'
                }`}
                title="Type Custom Text"
              >
                <Type size={12} />
                <span className="hidden sm:inline">CUSTOM</span>
              </button>
            </div>

            {/* Speed Multiplier */}
            <div className="flex items-center gap-1">
              {[1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    speedMultiplier === s
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-[#8C8A82] hover:text-[#1E1E1C] dark:hover:text-[#E8E5DC]'
                  }`}
                >
                  {s}X
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KineticKnot3D;
