import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function SingleCube({ skill, position, scale, rotSpeed }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * rotSpeed.x + (hovered ? 0.5 : 0)
      meshRef.current.rotation.y = t * rotSpeed.y + (hovered ? 0.8 : 0)
    }
  })

  // Normalize scale for aesthetics
  const cubeSize = 0.9 + (scale / 100) * 0.7

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1.2}
      position={position}
    >
      <group
        ref={groupRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Floating 3D Cube */}
        <mesh ref={meshRef} scale={hovered ? cubeSize * 1.15 : cubeSize}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshPhysicalMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.6 : 0.25}
            metalness={0.7}
            roughness={0.2}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Outer wireframe outline */}
        <mesh scale={hovered ? cubeSize * 1.22 : cubeSize * 1.06}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial
            color={skill.color}
            wireframe
            transparent
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>

        {/* Floating text label under/over cube */}
        <Text
          position={[0, -cubeSize * 0.9 - 0.2, 0]}
          fontSize={0.28}
          color={hovered ? '#ffffff' : '#f0eef5'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  )
}

export default function SkillCubes({ skills }) {
  const mainGroup = useRef()

  // Layout positions for 8 skill cubes in a 3D cloud
  const cubeLayout = useMemo(() => {
    const coords = [
      [-2.8,  1.8,  0.5],
      [ 0.0,  2.2, -0.8],
      [ 2.8,  1.6,  0.8],
      [-3.2, -0.6, -0.5],
      [-0.8, -0.2,  1.2],
      [ 1.8, -0.4, -0.2],
      [-2.0, -2.4,  0.2],
      [ 1.2, -2.2,  0.6]
    ]

    return skills.map((skill, index) => {
      const pos = coords[index % coords.length]
      return {
        skill,
        position: pos,
        scale: skill.level,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.4 + 0.2,
          y: (Math.random() - 0.5) * 0.4 + 0.3
        }
      }
    })
  }, [skills])

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime()
    if (mainGroup.current) {
      // Gentle parallax follow mouse
      mainGroup.current.rotation.y = THREE.MathUtils.lerp(
        mainGroup.current.rotation.y,
        pointer.x * 0.35 + t * 0.05,
        0.05
      )
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(
        mainGroup.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      )
    }
  })

  return (
    <group ref={mainGroup}>
      {cubeLayout.map((item, i) => (
        <SingleCube key={item.skill.name + i} {...item} />
      ))}

      <Sparkles count={60} scale={10} size={2.5} speed={0.4} color="#f0c040" opacity={0.4} />

      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={2.0} color="#f0c040" />
      <pointLight position={[-6, -4, 4]} intensity={2.0} color="#a78bfa" />
      <pointLight position={[0, -5, -4]} intensity={1.5} color="#f97068" />
    </group>
  )
}
