import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSwarm({ count = 120 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#00e5ff'),
      new THREE.Color('#7c4dff'),
      new THREE.Color('#ff6ec7')
    ]

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const color = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.15
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function AboutScene() {
  const coreRef = useRef()
  const outerWireRef = useRef()
  const innerMeshRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const groupRef = useRef()

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()

    // Smooth hover responsiveness
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.6 + t * 0.25, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.6 + Math.sin(t * 0.5) * 0.2, 0.05)
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.25
    }

    // Core pulsing & rotation
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.05
      coreRef.current.scale.set(scale, scale, scale)
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = -t * 0.35
      outerWireRef.current.rotation.z = t * 0.2
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = t * 0.4
      innerMeshRef.current.rotation.y = t * 0.3
    }

    // Orbiting Plasma Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.2
      ring1Ref.current.rotation.y = t * 0.6
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.5) * 0.2
      ring2Ref.current.rotation.y = -t * 0.8
    }
  })

  return (
    <group>
      <group ref={groupRef}>
        {/* Luminous Inner Energy Sphere */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.1, 4]} />
          <meshStandardMaterial
            color="#7c4dff"
            emissive="#00e5ff"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer Faceted Holographic Shell */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshPhysicalMaterial
            color="#0d1b3e"
            emissive="#7c4dff"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.8}
            transmission={0.4}
            thickness={0.5}
            transparent
            opacity={0.85}
            flatShading
          />
        </mesh>

        {/* Outer Wireframe Lattice Layer */}
        <mesh ref={outerWireRef} scale={1.08}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshBasicMaterial
            color="#00e5ff"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Plasma Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.035, 16, 100]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Plasma Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.6, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#ff6ec7"
            emissive="#ff6ec7"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Particle Swarm */}
        <ParticleSwarm count={140} />
      </group>

      {/* Dynamic Lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#00e5ff" />
      <pointLight position={[-5, -4, -2]} intensity={2.5} color="#ff6ec7" />
      <pointLight position={[0, 3, -4]} intensity={1.5} color="#7c4dff" />
    </group>
  )
}
