import { useLoader } from '@react-three/fiber'
import { FC } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { modelType } from './model'

const Scene:FC<modelType> = ({model, scale, position}) => {
    const gltf = useLoader(GLTFLoader, model)
    return (
    <primitive object={gltf.scene} scale={scale} position={position}/>
    )
}

export default Scene