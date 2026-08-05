import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  RoundedBox,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import type { DeskModalId } from "../DeskModals";

type Props = {
  progress: number;
  enabled: boolean;
  onOpen: (id: DeskModalId) => void;
};

const WOOD = "#8b5e3c";
const WOOD_DARK = "#5a3a22";
const PAPER = "#efe4d2";
const FOLDER = "#d4a017";
const METAL = "#cfd6df";

function DeskFurniture() {
  return (
    <group>
      {/* Tabletop */}
      <RoundedBox args={[4.6, 0.16, 2.5]} radius={0.04} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {/* Front lip / thickness cue */}
      <mesh position={[0, 0.8, 1.18]} castShadow>
        <boxGeometry args={[4.55, 0.12, 0.08]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[
        [-1.9, 0.4, -0.95],
        [1.9, 0.4, -0.95],
        [-1.9, 0.4, 0.95],
        [1.9, 0.4, 0.95],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.14, 0.8, 0.14]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.75} />
        </mesh>
      ))}
      {/* Floor plate for grounding */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[5.5, 48]} />
        <meshStandardMaterial color="#0a0a0c" roughness={1} />
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
  const hovered = useRef(false);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = hovered.current ? 1.08 : 1;
    const z = hovered.current ? 0.06 : 0;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 1 - Math.exp(-10 * dt));
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, position[1] + z, 8, dt);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
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
        <Text
          position={[0, 0.42, 0]}
          fontSize={0.12}
          color="#f3eee7"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#000000"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function DeskObjects({ onOpen }: { onOpen: (id: DeskModalId) => void }) {
  return (
    <group position={[0, 0.98, 0]}>
      <Hotspot id="dossier" label="Dossier" position={[-1.6, 0.12, 0.35]} onOpen={onOpen}>
        <RoundedBox args={[0.45, 0.55, 0.08]} radius={0.02} castShadow>
          <meshStandardMaterial color={PAPER} roughness={0.85} />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.05]}>
          <boxGeometry args={[0.32, 0.02, 0.01]} />
          <meshStandardMaterial color="#c4b49a" />
        </mesh>
      </Hotspot>

      <Hotspot id="projects" label="Projects" position={[-0.25, 0.08, -0.15]} onOpen={onOpen}>
        <RoundedBox args={[1.15, 0.05, 0.75]} radius={0.02} castShadow>
          <meshStandardMaterial color="#2a3038" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.08, -0.05]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[1.05, 0.02, 0.65]} />
          <meshStandardMaterial color="#10151c" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.1, -0.05]} rotation={[-0.35, 0, 0]}>
          <planeGeometry args={[0.95, 0.55]} />
          <meshStandardMaterial color="#6ea8ff" emissive="#1b3d66" emissiveIntensity={0.45} />
        </mesh>
      </Hotspot>

      <Hotspot id="experience" label="Experience" position={[1.15, 0.1, 0.25]} onOpen={onOpen}>
        <RoundedBox args={[0.7, 0.12, 0.5]} radius={0.02} castShadow>
          <meshStandardMaterial color={FOLDER} roughness={0.65} />
        </RoundedBox>
        <mesh position={[-0.12, 0.1, 0]}>
          <boxGeometry args={[0.28, 0.06, 0.48]} />
          <meshStandardMaterial color="#e0b14f" />
        </mesh>
      </Hotspot>

      <Hotspot id="certificates" label="Certificates" position={[1.75, 0.14, -0.35]} onOpen={onOpen}>
        <RoundedBox args={[0.4, 0.52, 0.04]} radius={0.015} castShadow>
          <meshStandardMaterial color="#f7f1e4" roughness={0.8} />
        </RoundedBox>
        <mesh position={[0.03, -0.03, -0.03]}>
          <boxGeometry args={[0.4, 0.52, 0.04]} />
          <meshStandardMaterial color="#e8dcc3" />
        </mesh>
      </Hotspot>

      <Hotspot id="contact" label="Contact" position={[0.7, 0.05, 0.7]} onOpen={onOpen}>
        <RoundedBox args={[0.55, 0.04, 0.35]} radius={0.015} castShadow>
          <meshStandardMaterial color="#e8dfd2" roughness={0.75} />
        </RoundedBox>
        <mesh position={[0, 0.025, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.35, 0.02]} />
          <meshStandardMaterial color="#b59c7a" />
        </mesh>
      </Hotspot>

      {/* Decorative mug — not clickable */}
      <Float speed={1} floatIntensity={0.1}>
        <group position={[0.15, 0.12, 0.55]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.22, 24]} />
            <meshStandardMaterial color="#ddd2c3" roughness={0.5} />
          </mesh>
          <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.07, 0.018, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#ddd2c3" />
          </mesh>
        </group>
      </Float>

      {/* Desk lamp */}
      <group position={[1.85, 0.05, 0.85]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
          <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.52, -0.05]} rotation={[0.6, 0, 0]}>
          <coneGeometry args={[0.16, 0.18, 24, 1, true]} />
          <meshStandardMaterial color="#9aa3b0" side={THREE.DoubleSide} />
        </mesh>
        <spotLight
          position={[0, 0.48, -0.08]}
          angle={0.55}
          penumbra={0.5}
          intensity={1.4}
          distance={5}
          color="#fff4df"
          castShadow
        />
      </group>
    </group>
  );
}

function CameraRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const eased = p * p * (3 - 2 * p);
    const target = new THREE.Vector3(
      THREE.MathUtils.lerp(0.15, 0.05, eased),
      THREE.MathUtils.lerp(3.6, 2.15, eased),
      THREE.MathUtils.lerp(5.2, 3.1, eased),
    );
    state.camera.position.lerp(target, 0.08);
    state.camera.lookAt(0, 0.95, 0);
  });
  return null;
}

function MouseSpotlight({ enabled }: { enabled: boolean }) {
  const light = useRef<THREE.SpotLight>(null);
  const target = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!light.current || !enabled) return;
    const x = (state.pointer.x * 2.2);
    const z = (-state.pointer.y * 1.4);
    target.position.lerp(new THREE.Vector3(x, 0.95, z), 0.15);
    light.current.target = target;
    light.current.intensity = THREE.MathUtils.damp(light.current.intensity, 2.2, 6, state.clock.getDelta());
  });

  return (
    <>
      <primitive object={target} />
      <spotLight
        ref={light}
        position={[0, 4.2, 2.2]}
        angle={0.35}
        penumbra={0.7}
        intensity={enabled ? 2.2 : 0}
        color="#fff8e8"
        castShadow={false}
        distance={12}
      />
    </>
  );
}

function SceneContent({ progress, enabled, onOpen }: Props) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[-3, 6, 2]}
        intensity={0.55}
        color="#e8eef8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <MouseSpotlight enabled={enabled} />
      <CameraRig progress={progress} />
      <DeskFurniture />
      <DeskObjects onOpen={onOpen} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={10} blur={2.5} far={4} />
    </>
  );
}

export function DeskScene3D({ progress, enabled, onOpen }: Props) {
  return (
    <div className="desk3d">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0.15, 3.6, 5.2], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050505");
        }}
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} enabled={enabled} onOpen={onOpen} />
        </Suspense>
      </Canvas>
    </div>
  );
}
