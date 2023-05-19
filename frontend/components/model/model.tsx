"use client"

import {Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {FC, Suspense} from "react";
import Scene from "./model2";

export interface modelType {
    model: string,
    scale: number,
    position: [number, number, number]
}

const Model:FC<modelType> = ({model, scale, position}) => {

    return (
        <Canvas gl={{ alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding,
            toneMappingExposure: 1.25 }}
                camera={{position: [0, 0, 370]}}
        >
            <ambientLight intensity={0.1}/>
            <pointLight color={'0xffffff'} position={[200, 200 , 200]} intensity={1}/>
            <pointLight color={'0xffffff'} position={[-750, 200 , -750]} intensity={1}/>
            <Suspense fallback={false}>
                <Scene model={model} scale={scale} position={position}/>
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate={true} enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI - Math.PI / 2}
        />
        </Canvas>
    )
}

export default Model