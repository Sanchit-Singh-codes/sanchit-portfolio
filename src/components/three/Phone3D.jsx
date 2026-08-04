import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function CodeParticles() {
  const ref = useRef()
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2
      arr.push({
        position: [
          Math.cos(angle) * (2.6 + Math.random() * 0.8),
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * (2.6 + Math.random() * 0.8)
        ],
        size: 0.05 + Math.random() * 0.06
      })
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.25
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <icosahedronGeometry args={[p.size, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00e5ff' : '#7c4dff'}
            emissive={i % 2 === 0 ? '#00e5ff' : '#7c4dff'}
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Phone3D() {
  const group = useRef()
  const ring = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.4
      group.current.position.y = Math.sin(t * 0.6) * 0.25
    }
    if (ring.current) {
      ring.current.rotation.x = t * 0.5
      ring.current.rotation.z = t * 0.3
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <group ref={group} position={[0, 0, 0]}>
          {/* Phone body */}
          <RoundedBox args={[2.2, 4.2, 0.28]} radius={0.28} smoothness={4} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#0d1226"
              metalness={0.9}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </RoundedBox>
          {/* Screen */}
          <RoundedBox args={[1.95, 3.9, 0.02]} radius={0.16} smoothness={4} position={[0, 0, 0.15]}>
            <meshPhysicalMaterial
              color="#05070f"
              emissive="#1a3a5c"
              emissiveIntensity={0.35}
              metalness={0.1}
              roughness={0.2}
              clearcoat={1}
            />
          </RoundedBox>
          {/* Screen content - glowing blocks = app icons */}
          {[
            [-0.55, 1.3], [0.55, 1.3],
            [-0.55, 0.6], [0.55, 0.6],
            [-0.55, -0.1], [0.55, -0.1],
            [-0.55, -0.8], [0.55, -0.8]
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.18]}>
              <boxGeometry args={[0.5, 0.5, 0.02]} />
              <meshStandardMaterial
                color={['#00e5ff', '#7c4dff', '#ff6ec7', '#ffb300'][i % 4]}
                emissive={['#00e5ff', '#7c4dff', '#ff6ec7', '#ffb300'][i % 4]}
                emissiveIntensity={0.7}
                metalness={0.4}
                roughness={0.3}
              />
            </mesh>
          ))}
          {/* Camera notch */}
          <mesh position={[0, 1.85, 0.17]}>
            <boxGeometry args={[0.5, 0.08, 0.02]} />
            <meshStandardMaterial color="#11162b" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Orbit ring */}
      <mesh ref={ring}>
        <torusGeometry args={[3.4, 0.02, 16, 120]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.9, 0.012, 16, 120]} />
        <meshStandardMaterial color="#7c4dff" emissive="#7c4dff" emissiveIntensity={0.4} transparent opacity={0.45} />
      </mesh>

      <CodeParticles />
      <Sparkles count={70} scale={6} size={3} speed={0.4} color="#00e5ff" opacity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={2} color="#00e5ff" />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#7c4dff" />
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 5, 5]} intensity={1.2} />
    </group>
  )
}
