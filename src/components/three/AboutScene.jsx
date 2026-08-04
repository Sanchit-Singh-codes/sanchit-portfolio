import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AboutScene() {
  const group = useRef()
  const torus = useRef()
  const wire = useRef()

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.2
      group.current.rotation.x = Math.sin(t * 0.3) * 0.3 + pointer.y * 0.3
      group.current.position.y = Math.sin(t * 0.8) * 0.3
    }
    if (torus.current) torus.current.rotation.z = t * 0.4
    if (wire.current) {
      wire.current.rotation.x = t * 0.3
      wire.current.rotation.y = t * 0.2
    }
  })

  return (
    <group>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshPhysicalMaterial
            color="#12183a"
            metalness={0.85}
            roughness={0.2}
            wireframe={false}
            flatShading
            emissive="#1a2a5c"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh scale={1.01}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.5} />
        </mesh>
      </group>
      <mesh ref={torus} rotation={[Math.PI / 2, 0, 0]} position={[2.2, 0.4, 0]}>
        <torusGeometry args={[0.9, 0.35, 16, 60]} />
        <meshStandardMaterial color="#7c4dff" emissive="#7c4dff" emissiveIntensity={0.4} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh ref={wire} position={[-2.4, -0.5, 0.5]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#ff6ec7" emissive="#ff6ec7" emissiveIntensity={0.35} wireframe />
      </mesh>
      <mesh position={[0, -3.4, -2]}>
        <torusGeometry args={[3.5, 0.015, 8, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>
      <pointLight position={[3, 3, 3]} intensity={2} color="#00e5ff" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#ff6ec7" />
      <ambientLight intensity={0.3} />
    </group>
  )
}
