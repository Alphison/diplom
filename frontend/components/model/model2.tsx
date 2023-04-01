import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Scene() {
    const gltf = useLoader(GLTFLoader, `star.glb`)
    return <primitive object={gltf.scene} scale={35}/>
}

export default Scene