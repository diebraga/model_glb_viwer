import { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

export function Dog({ playSound }) {
  const { nodes } = useGLTF('/level.glb') as any
  const [spring, api] = useSpring(() => ({ rotation: [0, 0, 0], config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({ rotation: [0.8 + Math.random() * 0.4, 0.25 + Math.random() * 0.25, 0] })
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

// console.log(soundRef.current)
  return (
    <>
      <mesh
        geometry={nodes.Sudo.geometry}
        material={nodes.Sudo.material}
        position={[0.68,0.33,-0.67]}
        rotation={[Math.PI / 2, 0, 0.29]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}   
        onClick={playSound}
      />
      {/* @ts-ignore */}
      <a.group position={[0.72, 0.29, -0.65]} rotation={[Math.PI / 2, 0, 0.29]} {...spring}>
        <mesh geometry={nodes.SudoHead_1.geometry} material={nodes.SudoHead_1.material} />
        <mesh geometry={nodes.SudoHead_2.geometry} material={nodes.SudoHead_2.material} />
      </a.group>
    </>
  )
}
