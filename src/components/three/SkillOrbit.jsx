import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SkillPlanet({ skill, radius, angle, speed, size }) {
  const ref = useRef()
  const orbitAngle = useRef(angle)

  useFrame((_, delta) => {
    orbitAngle.current += delta * speed
    if (ref.current) {
      ref.current.position.x = Math.cos(orbitAngle.current) * radius
      ref.current.position.z = Math.sin(orbitAngle.current) * radius
      ref.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group>
      {/* orbit line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 90]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.35} />
      </mesh>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshPhysicalMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.6}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function SkillOrbit({ skills }) {
  const group = useRef()
  const core = useRef()

  const planets = useMemo(() => {
    return skills.map((skill, i) => ({
      skill,
      radius: 2.6 + (i % 4) * 1.15,
      angle: (i / skills.length) * Math.PI * 2 + Math.random(),
      speed: 0.35 + Math.random() * 0.3,
      size: 0.22 + Math.random() * 0.16
    }))
  }, [skills])

  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.05
      group.current.rotation.x = pointer.y * 0.25
      group.current.position.x = pointer.x * 0.3
    }
    if (core.current) {
      core.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group}>
      <group ref={core} position={[0, 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshPhysicalMaterial color="#0e1330" metalness={0.9} roughness={0.2} emissive="#00e5ff" emissiveIntensity={0.3} flatShading />
        </mesh>
        <mesh scale={1.06}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
      {planets.map((p, i) => (
        <SkillPlanet key={i} {...p} />
      ))}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 2, 3]} intensity={2} color="#ffffff" />
    </group>
  )
}
