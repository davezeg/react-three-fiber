import * as React from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'

extend(meshline)

function FatLine({ curve, width, color, speed }) {
  const material = React.useRef()
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed))
  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  )
}

function Lines({ count, colors }) {
  const lines = React.useMemo(
    () =>
      new Array(count).fill().map(() => {
        const pos = new THREE.Vector3(10 - Math.random() * 20, 10 - Math.random() * 20, 10 - Math.random() * 20)
        const points = new Array(30)
          .fill()
          .map(() =>
            pos.add(new THREE.Vector3(4 - Math.random() * 8, 4 - Math.random() * 8, 2 - Math.random() * 4)).clone()
          )
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.max(0.1, 0.65 * Math.random()),
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve,
        }
      }),
    [colors, count]
  )
  return lines.map((props, index) => <FatLine key={index} {...props} />)
}

function Rig({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current[0] / 50 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

const style = { background: '#ffc9e7' }
const camera = { position: [0, 0, 10], fov: 25 }
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
const defaultMouse = [0, 0]

function MeshLine() {
  const mouse = React.useRef(defaultMouse)

  const onMouseMove = React.useCallback(function callback(e) {
    mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2]
  }, [])

  return (
    <Canvas style={style} camera={camera} onMouseMove={onMouseMove}>
      <Lines count={200} colors={colors} />
      <Rig mouse={mouse} />
    </Canvas>
  )
}

export default React.memo(MeshLine)
