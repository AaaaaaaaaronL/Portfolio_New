import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  Billboard,
  ContactShadows,
  Environment,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import type { DeskModalId } from "../DeskModals";

type Props = {
  progress: number;
  enabled: boolean;
  onOpen: (id: DeskModalId) => void;
};

const TEX = {
  woodDiff: `${import.meta.env.BASE_URL}textures/wood_diff.jpg`,
  woodNor: `${import.meta.env.BASE_URL}textures/wood_nor.jpg`,
  woodRough: `${import.meta.env.BASE_URL}textures/wood_rough.jpg`,
  floorDiff: `${import.meta.env.BASE_URL}textures/floor_diff.jpg`,
};

function useWoodMaterial(repeat: [number, number] = [2.2, 1.2]) {
  const [map, normalMap, roughnessMap] = useTexture([
    TEX.woodDiff,
    TEX.woodNor,
    TEX.woodRough,
  ]);

  return useMemo(() => {
    for (const tex of [map, normalMap, roughnessMap]) {
      tex.colorSpace = tex === map ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 8;
      tex.repeat.set(repeat[0], repeat[1]);
    }

    return new THREE.MeshPhysicalMaterial({
      map,
      normalMap,
      roughnessMap,
      roughness: 0.72,
      metalness: 0.02,
      clearcoat: 0.28,
      clearcoatRoughness: 0.45,
      envMapIntensity: 0.55,
    });
  }, [map, normalMap, roughnessMap, repeat]);
}

function DeskFurniture() {
  const woodTop = useWoodMaterial([2.4, 1.35]);
  const woodSide = useWoodMaterial([1.2, 0.5]);
  const woodLeg = useWoodMaterial([0.35, 1.4]);
  const [floorMap] = useTexture([TEX.floorDiff]);

  useMemo(() => {
    floorMap.colorSpace = THREE.SRGBColorSpace;
    floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
    floorMap.repeat.set(4, 4);
  }, [floorMap]);

  return (
    <group>
      <RoundedBox
        args={[3.8, 0.09, 1.9]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.78, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={woodTop} attach="material" />
      </RoundedBox>

      {/* Apron / skirt under the top */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[3.55, 0.1, 1.65]} />
        <primitive object={woodSide} attach="material" />
      </mesh>

      {/* Fixed front panel (no sliding drawer) */}
      <RoundedBox args={[1.15, 0.12, 0.08]} radius={0.008} position={[0, 0.62, 0.86]} castShadow>
        <meshStandardMaterial color="#5c3f28" roughness={0.72} />
      </RoundedBox>
      <mesh position={[0, 0.62, 0.91]}>
        <cylinderGeometry args={[0.014, 0.014, 0.06, 12]} />
        <meshStandardMaterial color="#c9b27a" metalness={0.7} roughness={0.25} />
      </mesh>

      {[
        [-1.55, -0.7],
        [1.55, -0.7],
        [-1.55, 0.7],
        [1.55, 0.7],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.36, 0]} castShadow>
            <boxGeometry args={[0.09, 0.72, 0.09]} />
            <primitive object={woodLeg} attach="material" />
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#2a1c12" roughness={0.85} />
          </mesh>
        </group>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial map={floorMap} roughness={0.92} metalness={0.05} color="#6a6a6a" />
      </mesh>
    </group>
  );
}

function Hotspot({
  id,
  label,
  position,
  onOpen,
  children,
}: {
  id: DeskModalId;
  label: string;
  position: [number, number, number];
  onOpen: (id: DeskModalId) => void;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const hovered = useRef(false);
  const scale = useRef(1);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const targetScale = hovered.current ? 1.035 : 1;
    const targetY = hovered.current ? baseY + 0.03 : baseY;
    scale.current = THREE.MathUtils.damp(scale.current, targetScale, 12, dt);
    ref.current.scale.setScalar(scale.current);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 12, dt);
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        hovered.current = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hovered.current = false;
        document.body.style.cursor = "auto";
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onOpen(id);
      }}
    >
      {children}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.32, 0]}
          fontSize={0.078}
          color="#f4efe8"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#111111"
          fillOpacity={0.95}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

function Laptop() {
  const keyRows = [
    { z: -0.02, count: 12, width: 0.78 },
    { z: 0.05, count: 11, width: 0.72 },
    { z: 0.12, count: 10, width: 0.66 },
  ];

  // Lid open ~105°: inner face (-Y) aims toward user / slightly up
  const lidAngle = -2.15;
  const lidDepth = 0.62;
  const lidHalf = lidDepth / 2;

  return (
    <group>
      {/* Base chassis */}
      <RoundedBox args={[0.98, 0.028, 0.64]} radius={0.012} castShadow>
        <meshStandardMaterial color="#1a1d22" roughness={0.32} metalness={0.55} />
      </RoundedBox>
      <mesh position={[0, -0.008, 0]}>
        <boxGeometry args={[0.96, 0.01, 0.62]} />
        <meshStandardMaterial color="#0f1114" roughness={0.4} metalness={0.5} />
      </mesh>

      <mesh position={[0, 0.016, 0.06]}>
        <boxGeometry args={[0.86, 0.004, 0.36]} />
        <meshStandardMaterial color="#12151a" roughness={0.55} />
      </mesh>

      {keyRows.map((row) =>
        Array.from({ length: row.count }).map((_, i) => {
          const spacing = row.width / row.count;
          const x = -row.width / 2 + spacing * (i + 0.5);
          return (
            <mesh key={`${row.z}-${i}`} position={[x, 0.02, row.z]}>
              <boxGeometry args={[spacing * 0.78, 0.006, 0.042]} />
              <meshStandardMaterial color="#2a3038" roughness={0.45} metalness={0.2} />
            </mesh>
          );
        }),
      )}

      <RoundedBox args={[0.28, 0.004, 0.16]} radius={0.008} position={[0, 0.017, 0.24]}>
        <meshStandardMaterial color="#2c323a" roughness={0.35} metalness={0.25} />
      </RoundedBox>

      {/* Hinge */}
      <mesh position={[0, 0.018, -0.31]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.011, 0.011, 0.94, 12]} />
        <meshStandardMaterial color="#3a4048" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lid pivots at back edge; meshes offset so hinge stays on the rear lip */}
      <group position={[0, 0.018, -0.31]} rotation={[lidAngle, 0, 0]}>
        <group position={[0, 0, lidHalf]}>
          {/* Lid body — thin in Y; +Y = outer shell, -Y = screen side */}
          <RoundedBox args={[0.98, 0.016, lidDepth]} radius={0.01} castShadow>
            <meshStandardMaterial color="#15181d" roughness={0.28} metalness={0.5} />
          </RoundedBox>
          {/* Outer back */}
          <mesh position={[0, 0.009, 0]}>
            <boxGeometry args={[0.96, 0.004, 0.6]} />
            <meshStandardMaterial color="#0c0e11" roughness={0.35} metalness={0.55} />
          </mesh>
          {/* Inner bezel */}
          <mesh position={[0, -0.0085, 0]}>
            <boxGeometry args={[0.92, 0.002, 0.56]} />
            <meshStandardMaterial color="#0a0c0f" roughness={0.5} />
          </mesh>
          {/* Screen flush on inner face */}
          <mesh position={[0, -0.0098, 0]}>
            <boxGeometry args={[0.84, 0.0012, 0.5]} />
            <meshStandardMaterial
              color="#6ea8ff"
              emissive="#1e4f8c"
              emissiveIntensity={0.9}
              roughness={0.18}
              metalness={0.08}
            />
          </mesh>
          <mesh position={[0, -0.0106, -0.16]}>
            <boxGeometry args={[0.7, 0.0006, 0.032]} />
            <meshStandardMaterial color="#dce9ff" emissive="#8eb6ff" emissiveIntensity={0.45} />
          </mesh>
          <mesh position={[-0.18, -0.0106, 0.04]}>
            <boxGeometry args={[0.3, 0.0006, 0.2]} />
            <meshStandardMaterial color="#3d6aa8" emissive="#244a7a" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.2, -0.0106, 0.04]}>
            <boxGeometry args={[0.26, 0.0006, 0.2]} />
            <meshStandardMaterial color="#4a7ab8" emissive="#2a5688" emissiveIntensity={0.35} />
          </mesh>
          {/* Webcam on bezel above screen (toward free edge = +Z in lid space) */}
          <mesh position={[0, -0.009, 0.265]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.003, 12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function DeskProps() {
  return (
    <group position={[0, 0.83, 0]}>
      {/* Notebook */}
      <group position={[-1.55, 0.02, -0.25]} rotation={[0, 0.35, 0]}>
        <RoundedBox args={[0.28, 0.02, 0.36]} radius={0.006} castShadow>
          <meshStandardMaterial color="#2f4a3a" roughness={0.75} />
        </RoundedBox>
        <mesh position={[0, 0.012, 0]}>
          <boxGeometry args={[0.25, 0.002, 0.32]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </mesh>
        {[0.06, 0, -0.06].map((z) => (
          <mesh key={z} position={[0, 0.014, z]}>
            <boxGeometry args={[0.18, 0.0006, 0.008]} />
            <meshStandardMaterial color="#c9bda8" />
          </mesh>
        ))}
      </group>

      {/* Pen */}
      <group position={[-1.35, 0.025, -0.05]} rotation={[0, 0.9, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 10]} />
          <meshStandardMaterial color="#1f3a5c" metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.008, 0.03, 8]} />
          <meshStandardMaterial color="#c0c4c8" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Mouse */}
      <group position={[0.55, 0.025, -0.15]} rotation={[0, -0.2, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.035, 0.06, 6, 12]} />
          <meshStandardMaterial color="#1c1f24" roughness={0.4} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.02, -0.01]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.025, 0.004, 0.035]} />
          <meshStandardMaterial color="#2a3038" roughness={0.5} />
        </mesh>
      </group>

      {/* Coaster */}
      <mesh position={[1.15, 0.012, -0.55]} rotation={[-Math.PI / 2, 0, 0.4]} receiveShadow>
        <circleGeometry args={[0.1, 28]} />
        <meshStandardMaterial color="#4a3424" roughness={0.85} />
      </mesh>
    </group>
  );
}

function DeskObjects({ onOpen }: { onOpen: (id: DeskModalId) => void }) {
  return (
    <group position={[0, 0.83, 0]}>
      {/* Dossier */}
      <Hotspot id="dossier" label="Dossier" position={[-1.2, 0.06, 0.38]} onOpen={onOpen}>
        <group rotation={[0, 0.12, 0]}>
          <RoundedBox args={[0.4, 0.5, 0.035]} radius={0.006} castShadow>
            <meshStandardMaterial color="#f3e9d8" roughness={0.88} />
          </RoundedBox>
          <mesh position={[0.012, -0.015, -0.018]} rotation={[0, 0, 0.05]} castShadow>
            <boxGeometry args={[0.39, 0.49, 0.028]} />
            <meshStandardMaterial color="#e6d7c0" roughness={0.9} />
          </mesh>
          <mesh position={[-0.012, 0.01, -0.03]} rotation={[0, 0, -0.03]} castShadow>
            <boxGeometry args={[0.38, 0.47, 0.022]} />
            <meshStandardMaterial color="#ddd0ba" roughness={0.92} />
          </mesh>
          {/* Binding clip */}
          <mesh position={[0, 0.22, 0.02]}>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshStandardMaterial color="#b08a3c" metalness={0.55} roughness={0.35} />
          </mesh>
          {/* Ruled lines */}
          {[0.1, 0.04, -0.02, -0.08].map((y) => (
            <mesh key={y} position={[0.02, y, 0.02]}>
              <boxGeometry args={[0.26, 0.008, 0.002]} />
              <meshStandardMaterial color="#c4b59a" />
            </mesh>
          ))}
          {/* Photo corner */}
          <mesh position={[-0.1, 0.12, 0.02]}>
            <boxGeometry args={[0.1, 0.12, 0.003]} />
            <meshStandardMaterial color="#d2c4ae" />
          </mesh>
        </group>
      </Hotspot>

      {/* Laptop / Projects */}
      <Hotspot id="projects" label="Projects" position={[-0.1, 0.02, -0.08]} onOpen={onOpen}>
        <Laptop />
      </Hotspot>

      {/* Experience folder */}
      <Hotspot id="experience" label="Experience" position={[0.95, 0.04, 0.32]} onOpen={onOpen}>
        <group rotation={[0, -0.25, 0]}>
          <RoundedBox args={[0.56, 0.025, 0.4]} radius={0.006} castShadow>
            <meshStandardMaterial color="#c9952e" roughness={0.72} />
          </RoundedBox>
          {/* Tab */}
          <mesh position={[-0.16, 0.02, 0]} castShadow>
            <boxGeometry args={[0.2, 0.035, 0.38]} />
            <meshStandardMaterial color="#d9a93a" roughness={0.68} />
          </mesh>
          {/* Papers peeking out */}
          <mesh position={[0.06, 0.02, 0.02]} rotation={[0.04, 0, 0.1]}>
            <boxGeometry args={[0.4, 0.008, 0.32]} />
            <meshStandardMaterial color="#f6f0e6" roughness={0.9} />
          </mesh>
          <mesh position={[0.04, 0.028, -0.01]} rotation={[0.02, 0, -0.05]}>
            <boxGeometry args={[0.36, 0.006, 0.28]} />
            <meshStandardMaterial color="#efe4d4" roughness={0.9} />
          </mesh>
          {/* Label strip */}
          <mesh position={[-0.16, 0.04, 0]}>
            <boxGeometry args={[0.14, 0.002, 0.2]} />
            <meshStandardMaterial color="#f8f2e4" />
          </mesh>
        </group>
      </Hotspot>

      {/* Certificates */}
      <Hotspot id="certificates" label="Certificates" position={[1.42, 0.08, -0.28]} onOpen={onOpen}>
        <group rotation={[0, -0.15, 0.05]}>
          <RoundedBox args={[0.36, 0.44, 0.022]} radius={0.005} castShadow>
            <meshStandardMaterial color="#faf6ee" roughness={0.8} />
          </RoundedBox>
          <mesh position={[0.018, -0.02, -0.018]} castShadow>
            <boxGeometry args={[0.35, 0.43, 0.018]} />
            <meshStandardMaterial color="#f0e6d4" roughness={0.82} />
          </mesh>
          <mesh position={[0.03, -0.04, -0.032]} castShadow>
            <boxGeometry args={[0.34, 0.42, 0.014]} />
            <meshStandardMaterial color="#e8dcc8" roughness={0.85} />
          </mesh>
          {/* Border frame */}
          <mesh position={[0, 0, 0.012]}>
            <boxGeometry args={[0.3, 0.38, 0.002]} />
            <meshStandardMaterial color="#e8dfd0" />
          </mesh>
          {/* Seal */}
          <mesh position={[0, -0.08, 0.015]}>
            <cylinderGeometry args={[0.055, 0.055, 0.008, 24]} />
            <meshStandardMaterial color="#b08a3c" metalness={0.45} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.08, 0.02]}>
            <ringGeometry args={[0.03, 0.048, 24]} />
            <meshStandardMaterial color="#d4b56a" metalness={0.4} roughness={0.4} />
          </mesh>
          {/* Ribbon */}
          <mesh position={[0, -0.14, 0.014]}>
            <boxGeometry args={[0.04, 0.08, 0.004]} />
            <meshStandardMaterial color="#8b1e2d" roughness={0.55} />
          </mesh>
        </group>
      </Hotspot>

      {/* Contact envelope */}
      <Hotspot id="contact" label="Contact" position={[0.42, 0.02, 0.55]} onOpen={onOpen}>
        <group rotation={[0, 0.3, 0]}>
          <RoundedBox args={[0.5, 0.018, 0.32]} radius={0.005} castShadow>
            <meshStandardMaterial color="#efe6d8" roughness={0.86} />
          </RoundedBox>
          {/* Flap */}
          <mesh position={[0, 0.012, -0.02]} rotation={[Math.PI / 2.4, 0, 0]}>
            <planeGeometry args={[0.48, 0.2]} />
            <meshStandardMaterial color="#e4d8c6" side={THREE.DoubleSide} roughness={0.88} />
          </mesh>
          {/* Address lines */}
          {[0.04, 0, -0.04].map((z) => (
            <mesh key={z} position={[0.06, 0.012, z]}>
              <boxGeometry args={[0.22, 0.001, 0.01]} />
              <meshStandardMaterial color="#c2b6a2" />
            </mesh>
          ))}
          {/* Stamp */}
          <mesh position={[-0.16, 0.012, -0.08]}>
            <boxGeometry args={[0.08, 0.002, 0.1]} />
            <meshStandardMaterial color="#c45c4a" roughness={0.7} />
          </mesh>
        </group>
      </Hotspot>
    </group>
  );
}

function CameraRig({ progress }: { progress: number }) {
  const desired = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    // 0–0.34 far eye-level · 0.34–0.58 rise into overhead · 0.58–0.78 desk fills · 0.78+ hold → About
    let cam: [number, number, number];
    let focus: [number, number, number];

    if (p < 0.34) {
      const t = p / 0.34;
      const e = t * t * (3 - 2 * t);
      cam = [
        THREE.MathUtils.lerp(0.25, 0.4, e),
        THREE.MathUtils.lerp(1.05, 0.95, e),
        THREE.MathUtils.lerp(6.4, 3.8, e),
      ];
      focus = [0, 0.88, 0];
    } else if (p < 0.58) {
      const t = (p - 0.34) / 0.24;
      const e = t * t * (3 - 2 * t);
      cam = [
        THREE.MathUtils.lerp(0.4, 0.12, e),
        THREE.MathUtils.lerp(0.95, 2.65, e),
        THREE.MathUtils.lerp(3.8, 1.55, e),
      ];
      focus = [
        0,
        THREE.MathUtils.lerp(0.88, 0.78, e),
        THREE.MathUtils.lerp(0, 0.05, e),
      ];
    } else if (p < 0.78) {
      const t = (p - 0.58) / 0.2;
      const e = t * t * (3 - 2 * t);
      cam = [
        THREE.MathUtils.lerp(0.12, 0.02, e),
        THREE.MathUtils.lerp(2.65, 3.4, e),
        THREE.MathUtils.lerp(1.55, 0.28, e),
      ];
      focus = [0, 0.78, 0];
    } else {
      const t = Math.min(1, (p - 0.78) / 0.22);
      const e = t * t * (3 - 2 * t);
      cam = [
        THREE.MathUtils.lerp(0.02, 0, e),
        THREE.MathUtils.lerp(3.4, 3.2, e),
        THREE.MathUtils.lerp(0.28, 0.15, e),
      ];
      focus = [0, 0.78, 0];
    }

    desired.set(cam[0], cam[1], cam[2]);
    look.set(focus[0], focus[1], focus[2]);
    state.camera.position.lerp(desired, 0.08);
    state.camera.lookAt(look);
  });

  return null;
}

function MouseFillLight({ enabled }: { enabled: boolean }) {
  const light = useRef<THREE.SpotLight>(null);
  const aim = useMemo(() => new THREE.Object3D(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    if (!light.current) return;
    desired.set(state.pointer.x * 1.6, 0.85, -state.pointer.y * 0.9);
    aim.position.lerp(desired, 1 - Math.exp(-7 * dt));
    light.current.target = aim;
    light.current.intensity = enabled ? 8 : 1.5;
  });

  return (
    <>
      <primitive object={aim} />
      <spotLight
        ref={light}
        position={[0.4, 3.2, 1.8]}
        angle={0.42}
        penumbra={0.85}
        intensity={enabled ? 8 : 1.5}
        color="#fff5e4"
        castShadow={false}
        distance={10}
      />
    </>
  );
}

function SceneContent({ progress, enabled, onOpen }: Props) {
  return (
    <>
      <color attach="background" args={["#070707"]} />
      <fog attach="fog" args={["#070707", 6, 14]} />

      <ambientLight intensity={0.28} />
      <directionalLight
        position={[2.5, 6.5, 1.5]}
        intensity={1.35}
        color="#fff7ea"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-3, 3.5, -1]} intensity={0.35} color="#9eb6ff" />
      <spotLight
        position={[0, 4.2, 0.4]}
        angle={0.55}
        penumbra={0.7}
        intensity={6}
        distance={12}
        color="#fff5e4"
        castShadow={false}
      />

      <Environment preset="warehouse" environmentIntensity={0.35} />
      <MouseFillLight enabled={enabled} />
      <CameraRig progress={progress} />
      <DeskFurniture />
      <DeskObjects onOpen={onOpen} />
      <DeskProps />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.65}
        scale={12}
        blur={2.8}
        far={5}
        color="#000000"
      />
    </>
  );
}

export function DeskScene3D({ progress, enabled, onOpen }: Props) {
  return (
    <div className="desk3d">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0.55, 2.35, 3.4], fov: 38, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#070707");
        }}
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} enabled={enabled} onOpen={onOpen} />
        </Suspense>
      </Canvas>
    </div>
  );
}
