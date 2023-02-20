"use client"

import {ThreeElements} from "@react-three/fiber"
import {useRef} from "react"
import * as THREE from 'three'

const Box = (props: ThreeElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!)

    return (
        <mesh {...props} ref={ref} >
            <sphereGeometry args={[100, 100, 100]}/>
            <meshStandardMaterial />

        </mesh>
    )
}

export default Box