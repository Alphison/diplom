
"use client"
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl} from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Box from "./box";
import {FC, Suspense, useEffect, useState, useRef, useCallback} from "react";
import Scene from "./model2";

// interface Prop{
//     setCameraRotation: (x:number) => void;
// }

// const Controls:FC<Prop> = ({setCameraRotation}) => {
//     const controlsRef = useRef<OrbitControlsImpl>(null);
//     const { camera, gl } = useThree();
    
//     useFrame((state) => {
//       if (controlsRef.current) {
//         const controls = controlsRef.current;
//         const horizontalAngle = controls.getAzimuthalAngle();
//         const radiansToDegrees = (horizontalAngle:number) => (horizontalAngle * 180) / Math.PI;
//         setCameraRotation(radiansToDegrees(horizontalAngle))
//       }
//     });
  
//     return (
//         <OrbitControls enableZoom={false} autoRotate={true} enablePan={false}
//         minPolarAngle={Math.PI / 2}
//         maxPolarAngle={Math.PI - Math.PI / 2}
//         ref={controlsRef}
//         args={[camera, gl.domElement]}
//         />
//     );
// }

const Model = () => {

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
                {/* <Box position={[0, 0, 0]}/> */}
                <Scene />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate={true} enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI - Math.PI / 2}
        />
        </Canvas>
    )
}

export default Model