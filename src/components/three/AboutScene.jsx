import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSwarm({ count = 140 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#f0c040'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#f97068')
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

    // Orbiting Energy Rings
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
        {/* Luminous Inner Core */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.1, 4]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#f0c040"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer Faceted Glass Shell */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshPhysicalMaterial
            color="#141126"
            emissive="#a78bfa"
            emissiveIntensity={0.3}
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
            color="#f0c040"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Energy Ring 1 (Amber) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.035, 16, 100]} />
          <meshStandardMaterial
            color="#f0c040"
            emissive="#f0c040"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Energy Ring 2 (Coral) */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.6, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#f97068"
            emissive="#f97068"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Particle Swarm */}
        <ParticleSwarm count={140} />
      </group>

      {/* Warm Dynamic Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#f0c040" />
      <pointLight position={[-5, -4, -2]} intensity={2.5} color="#f97068" />
      <pointLight position={[0, 3, -4]} intensity={1.5} color="#a78bfa" />
    </group>
  )
}
