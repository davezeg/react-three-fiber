import * as THREE from 'three'
import { MouseEvent, PointerEvent, WheelEvent } from './canvas'

export type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
export type Overwrite<T, O> = Omit<T, NonFunctionKeys<O>> & O
/**
 * Allows using a TS v4 labeled tuple even with older typescript versions
 */
export type NamedArrayTuple<T extends (...args: any) => any> = Parameters<T>

/**
 * If **T** contains a constructor, @see ConstructorParameters must be used, otherwise **T**.
 */
type Args<T> = T extends new (...args: any) => any ? ConstructorParameters<T> : T

export type Euler = THREE.Euler | Parameters<THREE.Euler['set']>
export type Matrix4 = THREE.Matrix4 | Parameters<THREE.Matrix4['set']>
export type Vector2 = THREE.Vector2 | Parameters<THREE.Vector2['set']>
export type Vector3 = THREE.Vector3 | Parameters<THREE.Vector3['set']>
export type Color = THREE.Color | number | string // Parameters<T> will not work here because of multiple function signatures in three.js types
export type Layers = THREE.Layers | Parameters<THREE.Layers['set']>
export type Quaternion = THREE.Quaternion | Parameters<THREE.Quaternion['set']>

export type EventHandlers = {
  onClick?: (event: MouseEvent) => void
  onContextMenu?: (event: MouseEvent) => void
  onDoubleClick?: (event: MouseEvent) => void
  onPointerUp?: (event: PointerEvent) => void
  onPointerDown?: (event: PointerEvent) => void
  onPointerOver?: (event: PointerEvent) => void
  onPointerOut?: (event: PointerEvent) => void
  onPointerMove?: (event: PointerEvent) => void
  onPointerMissed?: (event: PointerEvent) => void
  onWheel?: (event: WheelEvent) => void
}

export interface NodeProps<T, P> {
  /** Attaches this class onto the parent under the given name and nulls it on unmount */
  attach?: string
  /** Appends this class to an array on the parent under the given name and removes it on unmount */
  attachArray?: string
  /** Adds this class to an object on the parent under the given name and deletes it on unmount */
  attachObject?: NamedArrayTuple<(target: string, name: string) => void>
  /** Constructor arguments */
  args?: Args<P>
  children?: React.ReactNode
  ref?: React.Ref<React.ReactNode>
  key?: React.Key
  onUpdate?: (self: T) => void
}

export type Node<T, P> = Overwrite<Partial<T>, NodeProps<T, P>>

export type Object3DNode<T, P> = Overwrite<
  Node<T, P>,
  {
    position?: Vector3
    up?: Vector3
    scale?: Vector3
    rotation?: Euler
    matrix?: Matrix4
    quaternion?: Quaternion
    layers?: Layers
    dispose?: (() => void) | null
  }
> &
  EventHandlers

export type GeometryNode<T extends THREE.Geometry, P> = Overwrite<Node<T, P>, { vertices?: Vector3[] }>
export type BufferGeometryNode<T extends THREE.BufferGeometry, P> = Overwrite<Node<T, P>, {}>
export type MaterialNode<T extends THREE.Material, P> = Overwrite<Node<T, P>, { color?: Color }>
export type LightNode<T extends THREE.Light, P> = Overwrite<Object3DNode<T, P>, { color?: Color }>

// export type AudioProps = Object3DNode<THREE.Audio, typeof THREE.Audio>
export type AudioListenerProps = Object3DNode<THREE.AudioListener, typeof THREE.AudioListener>
export type PositionalAudioProps = Object3DNode<THREE.PositionalAudio, typeof THREE.PositionalAudio>

export type MeshProps = Object3DNode<THREE.Mesh, typeof THREE.Mesh>
export type InstancedMeshProps = Object3DNode<THREE.InstancedMesh, typeof THREE.InstancedMesh>
export type SceneProps = Object3DNode<THREE.Scene, typeof THREE.Scene>
export type SpriteProps = Object3DNode<THREE.Sprite, typeof THREE.Sprite>
export type LODProps = Object3DNode<THREE.LOD, typeof THREE.LOD>
export type SkinnedMeshProps = Object3DNode<THREE.SkinnedMesh, typeof THREE.SkinnedMesh>

export type SkeletonProps = Object3DNode<THREE.Skeleton, typeof THREE.Skeleton>
export type BoneProps = Object3DNode<THREE.Bone, typeof THREE.Bone>
export type LineSegmentsProps = Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>
export type LineLoopProps = Object3DNode<THREE.LineLoop, typeof THREE.LineLoop>
// export type LineProps = Object3DNode<THREE.Line, typeof THREE.Line>
export type PointsProps = Object3DNode<THREE.Points, typeof THREE.Points>
export type GroupProps = Object3DNode<THREE.Group, typeof THREE.Group>
export type ImmediateRenderObjectProps = Object3DNode<THREE.ImmediateRenderObject, typeof THREE.ImmediateRenderObject>

export type CameraProps = Object3DNode<THREE.Camera, typeof THREE.Camera>
export type PerspectiveCameraProps = Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera>
export type OrthographicCameraProps = Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>
export type CubeCameraProps = Object3DNode<THREE.CubeCamera, typeof THREE.CubeCamera>
export type ArrayCameraProps = Object3DNode<THREE.ArrayCamera, typeof THREE.ArrayCamera>

export type GeometryProps = GeometryNode<THREE.Geometry, typeof THREE.Geometry>
export type InstancedBufferGeometryProps = BufferGeometryNode<
  THREE.InstancedBufferGeometry,
  typeof THREE.InstancedBufferGeometry
>
export type BufferGeometryProps = BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>
export type BoxBufferGeometryProps = BufferGeometryNode<THREE.BoxBufferGeometry, typeof THREE.BoxBufferGeometry>
export type CircleBufferGeometryProps = BufferGeometryNode<
  THREE.CircleBufferGeometry,
  typeof THREE.CircleBufferGeometry
>
export type ConeBufferGeometryProps = BufferGeometryNode<THREE.ConeBufferGeometry, typeof THREE.ConeBufferGeometry>
export type CylinderBufferGeometryProps = BufferGeometryNode<
  THREE.CylinderBufferGeometry,
  typeof THREE.CylinderBufferGeometry
>
export type DodecahedronBufferGeometryProps = BufferGeometryNode<
  THREE.DodecahedronBufferGeometry,
  typeof THREE.DodecahedronBufferGeometry
>
export type ExtrudeBufferGeometryProps = BufferGeometryNode<
  THREE.ExtrudeBufferGeometry,
  typeof THREE.ExtrudeBufferGeometry
>
export type IcosahedronBufferGeometryProps = BufferGeometryNode<
  THREE.IcosahedronBufferGeometry,
  typeof THREE.IcosahedronBufferGeometry
>
export type LatheBufferGeometryProps = BufferGeometryNode<THREE.LatheBufferGeometry, typeof THREE.LatheBufferGeometry>
export type OctahedronBufferGeometryProps = BufferGeometryNode<
  THREE.OctahedronBufferGeometry,
  typeof THREE.OctahedronBufferGeometry
>
export type ParametricBufferGeometryProps = BufferGeometryNode<
  THREE.ParametricBufferGeometry,
  typeof THREE.ParametricBufferGeometry
>
export type PlaneBufferGeometryProps = BufferGeometryNode<THREE.PlaneBufferGeometry, typeof THREE.PlaneBufferGeometry>
export type PolyhedronBufferGeometryProps = BufferGeometryNode<
  THREE.PolyhedronBufferGeometry,
  typeof THREE.PolyhedronBufferGeometry
>
export type RingBufferGeometryProps = BufferGeometryNode<THREE.RingBufferGeometry, typeof THREE.RingBufferGeometry>
export type ShapeBufferGeometryProps = BufferGeometryNode<THREE.ShapeBufferGeometry, typeof THREE.ShapeBufferGeometry>
export type SphereBufferGeometryProps = BufferGeometryNode<
  THREE.SphereBufferGeometry,
  typeof THREE.SphereBufferGeometry
>
export type TetrahedronBufferGeometryProps = BufferGeometryNode<
  THREE.TetrahedronBufferGeometry,
  typeof THREE.TetrahedronBufferGeometry
>
export type TextBufferGeometryProps = BufferGeometryNode<THREE.TextBufferGeometry, typeof THREE.TextBufferGeometry>
export type TorusBufferGeometryProps = BufferGeometryNode<THREE.TorusBufferGeometry, typeof THREE.TorusBufferGeometry>
export type TorusKnotBufferGeometryProps = BufferGeometryNode<
  THREE.TorusKnotBufferGeometry,
  typeof THREE.TorusKnotBufferGeometry
>
export type TubeBufferGeometryProps = BufferGeometryNode<THREE.TubeBufferGeometry, typeof THREE.TubeBufferGeometry>
export type WireframeGeometryProps = BufferGeometryNode<THREE.WireframeGeometry, typeof THREE.WireframeGeometry>
export type ParametricGeometryProps = GeometryNode<THREE.ParametricGeometry, typeof THREE.ParametricGeometry>
export type TetrahedronGeometryProps = GeometryNode<THREE.TetrahedronGeometry, typeof THREE.TetrahedronGeometry>
export type OctahedronGeometryProps = GeometryNode<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>
export type IcosahedronGeometryProps = GeometryNode<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>
export type DodecahedronGeometryProps = GeometryNode<THREE.DodecahedronGeometry, typeof THREE.DodecahedronGeometry>
export type PolyhedronGeometryProps = GeometryNode<THREE.PolyhedronGeometry, typeof THREE.PolyhedronGeometry>
export type TubeGeometryProps = GeometryNode<THREE.TubeGeometry, typeof THREE.TubeGeometry>
export type TorusKnotGeometryProps = GeometryNode<THREE.TorusKnotGeometry, typeof THREE.TorusKnotGeometry>
export type TorusGeometryProps = GeometryNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>
export type TextGeometryProps = GeometryNode<THREE.TextGeometry, typeof THREE.TextGeometry>
export type SphereGeometryProps = GeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
export type RingGeometryProps = GeometryNode<THREE.RingGeometry, typeof THREE.RingGeometry>
export type PlaneGeometryProps = GeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
export type LatheGeometryProps = GeometryNode<THREE.LatheGeometry, typeof THREE.LatheGeometry>
export type ShapeGeometryProps = GeometryNode<THREE.ShapeGeometry, typeof THREE.ShapeGeometry>
export type ExtrudeGeometryProps = GeometryNode<THREE.ExtrudeGeometry, typeof THREE.ExtrudeGeometry>
export type EdgesGeometryProps = BufferGeometryNode<THREE.EdgesGeometry, typeof THREE.EdgesGeometry>
export type ConeGeometryProps = GeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>
export type CylinderGeometryProps = GeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>
export type CircleGeometryProps = GeometryNode<THREE.CircleGeometry, typeof THREE.CircleGeometry>
export type BoxGeometryProps = GeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>

export type MaterialProps = MaterialNode<THREE.Material, [THREE.MaterialParameters]>
export type ShadowMaterialProps = MaterialNode<THREE.ShadowMaterial, [THREE.ShaderMaterialParameters]>
export type SpriteMaterialProps = MaterialNode<THREE.SpriteMaterial, [THREE.SpriteMaterialParameters]>
export type RawShaderMaterialProps = MaterialNode<THREE.RawShaderMaterial, [THREE.ShaderMaterialParameters]>
export type ShaderMaterialProps = MaterialNode<THREE.ShaderMaterial, [THREE.ShaderMaterialParameters]>
export type PointsMaterialProps = MaterialNode<THREE.PointsMaterial, [THREE.PointsMaterialParameters]>
export type MeshPhysicalMaterialProps = MaterialNode<THREE.MeshPhysicalMaterial, [THREE.MeshPhysicalMaterialParameters]>
export type MeshStandardMaterialProps = MaterialNode<THREE.MeshStandardMaterial, [THREE.MeshStandardMaterialParameters]>
export type MeshPhongMaterialProps = MaterialNode<THREE.MeshPhongMaterial, [THREE.MeshPhongMaterialParameters]>
export type MeshToonMaterialProps = MaterialNode<THREE.MeshToonMaterial, [THREE.MeshToonMaterialParameters]>
export type MeshNormalMaterialProps = MaterialNode<THREE.MeshNormalMaterial, [THREE.MeshNormalMaterialParameters]>
export type MeshLambertMaterialProps = MaterialNode<THREE.MeshLambertMaterial, [THREE.MeshLambertMaterialParameters]>
export type MeshDepthMaterialProps = MaterialNode<THREE.MeshDepthMaterial, [THREE.MeshDepthMaterialParameters]>
export type MeshDistanceMaterialProps = MaterialNode<THREE.MeshDistanceMaterial, [THREE.MeshDistanceMaterialParameters]>
export type MeshBasicMaterialProps = MaterialNode<THREE.MeshBasicMaterial, [THREE.MeshBasicMaterialParameters]>
export type MeshMatcapMaterialProps = MaterialNode<THREE.MeshMatcapMaterial, [THREE.MeshMatcapMaterialParameters]>
export type LineDashedMaterialProps = MaterialNode<THREE.LineDashedMaterial, [THREE.LineDashedMaterialParameters]>
export type LineBasicMaterialProps = MaterialNode<THREE.LineBasicMaterial, [THREE.LineBasicMaterialParameters]>

export type PrimitiveProps = { object: any } & { [properties: string]: any }

export type LightProps = LightNode<THREE.Light, typeof THREE.Light>
export type SpotLightShadowProps = Node<THREE.SpotLightShadow, typeof THREE.SpotLightShadow>
export type SpotLightProps = LightNode<THREE.SpotLight, typeof THREE.SpotLight>
export type PointLightProps = LightNode<THREE.PointLight, typeof THREE.PointLight>
export type RectAreaLightProps = LightNode<THREE.RectAreaLight, typeof THREE.RectAreaLight>
export type HemisphereLightProps = LightNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>
export type DirectionalLightShadowProps = Node<THREE.DirectionalLightShadow, typeof THREE.DirectionalLightShadow>
export type DirectionalLightProps = LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
export type AmbientLightProps = LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>
export type LightShadowProps = Node<THREE.LightShadow, typeof THREE.LightShadow>
export type AmbientLightProbeProps = LightNode<THREE.AmbientLightProbe, typeof THREE.AmbientLightProbe>
export type HemisphereLightProbeProps = LightNode<THREE.HemisphereLightProbe, typeof THREE.HemisphereLightProbe>
export type LightProbeProps = LightNode<THREE.LightProbe, typeof THREE.LightProbe>

export type SpotLightHelperProps = Object3DNode<THREE.SpotLightHelper, typeof THREE.SpotLightHelper>
export type SkeletonHelperProps = Object3DNode<THREE.SkeletonHelper, typeof THREE.SkeletonHelper>
export type PointLightHelperProps = Object3DNode<THREE.PointLightHelper, typeof THREE.PointLightHelper>
export type HemisphereLightHelperProps = Object3DNode<THREE.HemisphereLightHelper, typeof THREE.HemisphereLightHelper>
export type GridHelperProps = Object3DNode<THREE.GridHelper, typeof THREE.GridHelper>
export type PolarGridHelperProps = Object3DNode<THREE.PolarGridHelper, typeof THREE.PolarGridHelper>
export type DirectionalLightHelperProps = Object3DNode<
  THREE.DirectionalLightHelper,
  typeof THREE.DirectionalLightHelper
>
export type CameraHelperProps = Object3DNode<THREE.CameraHelper, typeof THREE.CameraHelper>
export type BoxHelperProps = Object3DNode<THREE.BoxHelper, typeof THREE.BoxHelper>
export type Box3HelperProps = Object3DNode<THREE.Box3Helper, typeof THREE.Box3Helper>
export type PlaneHelperProps = Object3DNode<THREE.PlaneHelper, typeof THREE.PlaneHelper>
export type ArrowHelperProps = Object3DNode<THREE.ArrowHelper, typeof THREE.ArrowHelper>
export type AxesHelperProps = Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>

export type TextureProps = Node<THREE.Texture, typeof THREE.Texture>
export type VideoTextureProps = Node<THREE.VideoTexture, typeof THREE.VideoTexture>
export type DataTextureProps = Node<THREE.DataTexture, typeof THREE.DataTexture>
export type DataTexture3DProps = Node<THREE.DataTexture3D, typeof THREE.DataTexture3D>
export type CompressedTextureProps = Node<THREE.CompressedTexture, typeof THREE.CompressedTexture>
export type CubeTextureProps = Node<THREE.CubeTexture, typeof THREE.CubeTexture>
export type CanvasTextureProps = Node<THREE.CanvasTexture, typeof THREE.CanvasTexture>
export type DepthTextureProps = Node<THREE.DepthTexture, typeof THREE.DepthTexture>

export type RaycasterProps = Node<THREE.Raycaster, typeof THREE.Raycaster>
export type Vector2Props = Node<THREE.Vector2, typeof THREE.Vector2>
export type Vector3Props = Node<THREE.Vector3, typeof THREE.Vector3>
export type Vector4Props = Node<THREE.Vector4, typeof THREE.Vector4>
export type EulerProps = Node<THREE.Euler, typeof THREE.Euler>
export type Matrix3Props = Node<THREE.Matrix3, typeof THREE.Matrix3>
export type Matrix4Props = Node<THREE.Matrix4, typeof THREE.Matrix4>
export type QuaternionProps = Node<THREE.Quaternion, typeof THREE.Quaternion>
export type BufferAttributeProps = Node<THREE.BufferAttribute, typeof THREE.BufferAttribute>
export type InstancedBufferAttributeProps = Node<THREE.InstancedBufferAttribute, typeof THREE.InstancedBufferAttribute>
export type Face3Props = Node<THREE.Face3, typeof THREE.Face3>
export type ColorProps = Node<THREE.Color, typeof THREE.Color>
export type FogProps = Node<THREE.Fog, typeof THREE.Fog>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // `audio` works but conflicts with @types/react. Try using Audio from react-three-fiber/components instead
      // audio: AudioProps
      audioListener: AudioListenerProps
      positionalAudio: PositionalAudioProps

      mesh: MeshProps
      instancedMesh: InstancedMeshProps
      scene: SceneProps
      sprite: SpriteProps
      lOD: LODProps
      skinnedMesh: SkinnedMeshProps
      skeleton: SkeletonProps
      bone: BoneProps
      lineSegments: LineSegmentsProps
      lineLoop: LineLoopProps
      // see `audio`
      // line: LineProps
      points: PointsProps
      group: GroupProps
      immediateRenderObject: ImmediateRenderObjectProps

      // cameras
      camera: CameraProps
      perspectiveCamera: PerspectiveCameraProps
      orthographicCamera: OrthographicCameraProps
      cubeCamera: CubeCameraProps
      arrayCamera: ArrayCameraProps

      // geometry
      geometry: GeometryProps
      instancedBufferGeometry: InstancedBufferGeometryProps
      bufferGeometry: BufferGeometryProps
      boxBufferGeometry: BoxBufferGeometryProps
      circleBufferGeometry: CircleBufferGeometryProps
      coneBufferGeometry: ConeBufferGeometryProps
      cylinderBufferGeometry: CylinderBufferGeometryProps
      dodecahedronBufferGeometry: DodecahedronBufferGeometryProps
      extrudeBufferGeometry: ExtrudeBufferGeometryProps
      icosahedronBufferGeometry: IcosahedronBufferGeometryProps
      latheBufferGeometry: LatheBufferGeometryProps
      octahedronBufferGeometry: OctahedronBufferGeometryProps
      parametricBufferGeometry: ParametricBufferGeometryProps
      planeBufferGeometry: PlaneBufferGeometryProps
      polyhedronBufferGeometry: PolyhedronBufferGeometryProps
      ringBufferGeometry: RingBufferGeometryProps
      shapeBufferGeometry: ShapeBufferGeometryProps
      sphereBufferGeometry: SphereBufferGeometryProps
      tetrahedronBufferGeometry: TetrahedronBufferGeometryProps
      textBufferGeometry: TextBufferGeometryProps
      torusBufferGeometry: TorusBufferGeometryProps
      torusKnotBufferGeometry: TorusKnotBufferGeometryProps
      tubeBufferGeometry: TubeBufferGeometryProps
      wireframeGeometry: WireframeGeometryProps
      parametricGeometry: ParametricGeometryProps
      tetrahedronGeometry: TetrahedronGeometryProps
      octahedronGeometry: OctahedronGeometryProps
      icosahedronGeometry: IcosahedronGeometryProps
      dodecahedronGeometry: DodecahedronGeometryProps
      polyhedronGeometry: PolyhedronGeometryProps
      tubeGeometry: TubeGeometryProps
      torusKnotGeometry: TorusKnotGeometryProps
      torusGeometry: TorusGeometryProps
      textGeometry: TextGeometryProps
      sphereGeometry: SphereGeometryProps
      ringGeometry: RingGeometryProps
      planeGeometry: PlaneGeometryProps
      latheGeometry: LatheGeometryProps
      shapeGeometry: ShapeGeometryProps
      extrudeGeometry: ExtrudeGeometryProps
      edgesGeometry: EdgesGeometryProps
      coneGeometry: ConeGeometryProps
      cylinderGeometry: CylinderGeometryProps
      circleGeometry: CircleGeometryProps
      boxGeometry: BoxGeometryProps

      // materials
      material: MaterialProps
      shadowMaterial: ShadowMaterialProps
      spriteMaterial: SpriteMaterialProps
      rawShaderMaterial: RawShaderMaterialProps
      shaderMaterial: ShaderMaterialProps
      pointsMaterial: PointsMaterialProps
      meshPhysicalMaterial: MeshPhysicalMaterialProps
      meshStandardMaterial: MeshStandardMaterialProps
      meshPhongMaterial: MeshPhongMaterialProps
      meshToonMaterial: MeshToonMaterialProps
      meshNormalMaterial: MeshNormalMaterialProps
      meshLambertMaterial: MeshLambertMaterialProps
      meshDepthMaterial: MeshDepthMaterialProps
      meshDistanceMaterial: MeshDistanceMaterialProps
      meshBasicMaterial: MeshBasicMaterialProps
      meshMatcapMaterial: MeshMatcapMaterialProps
      lineDashedMaterial: LineDashedMaterialProps
      lineBasicMaterial: LineBasicMaterialProps

      // primitive
      primitive: PrimitiveProps

      // lights and other
      light: LightProps
      spotLightShadow: SpotLightShadowProps
      spotLight: SpotLightProps
      pointLight: PointLightProps
      rectAreaLight: RectAreaLightProps
      hemisphereLight: HemisphereLightProps
      directionalLightShadow: DirectionalLightShadowProps
      directionalLight: DirectionalLightProps
      ambientLight: AmbientLightProps
      lightShadow: LightShadowProps
      ambientLightProbe: AmbientLightProbeProps
      hemisphereLightProbe: HemisphereLightProbeProps
      lightProbe: LightProbeProps

      // helpers
      spotLightHelper: SpotLightHelperProps
      skeletonHelper: SkeletonHelperProps
      pointLightHelper: PointLightHelperProps
      hemisphereLightHelper: HemisphereLightHelperProps
      gridHelper: GridHelperProps
      polarGridHelper: PolarGridHelperProps
      directionalLightHelper: DirectionalLightHelperProps
      cameraHelper: CameraHelperProps
      boxHelper: BoxHelperProps
      box3Helper: Box3HelperProps
      planeHelper: PlaneHelperProps
      arrowHelper: ArrowHelperProps
      axesHelper: AxesHelperProps

      // textures
      texture: TextureProps
      videoTexture: VideoTextureProps
      dataTexture: DataTextureProps
      dataTexture3D: DataTexture3DProps
      compressedTexture: CompressedTextureProps
      cubeTexture: CubeTextureProps
      canvasTexture: CanvasTextureProps
      depthTexture: DepthTextureProps

      // misc
      raycaster: RaycasterProps
      vector2: Vector2Props
      vector3: Vector3Props
      vector4: Vector4Props
      euler: EulerProps
      matrix3: Matrix3Props
      matrix4: Matrix4Props
      quaternion: QuaternionProps
      bufferAttribute: BufferAttributeProps
      instancedBufferAttribute: InstancedBufferAttributeProps
      face3: Face3Props
      color: ColorProps
      fog: FogProps
    }
  }
}
