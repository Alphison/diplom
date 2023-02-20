// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//
// let scene, renderer, camera, pointlight, controls;
// const canvas = document.querySelector('.canvas');
//
// function init() {
//     scene = new THREE.Scene();
//     scene.position.y = 25;
//     renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true, antialias:true});
//
//     renderer.outputEncoding = THREE.sRGBEncoding;
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 1.25;
//
//     camera = new THREE.PerspectiveCamera(50,2,0.1,1000);
//     camera.position.set(0,0,370);
//     // const helper = new THREE.CameraHelper( camera );
//     // scene.add( helper );
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.autoRotate = true;
//     controls.enableDamping = true;
//     controls.autoRotateSpeed = 10;
//     controls.enableZoom = false;
//
//     pointlight = new THREE.PointLight(0xffffff,1);
//     pointlight.position.set(200,200,200);
//     scene.add(pointlight);
//
//     let envmaploader = new THREE.PMREMGenerator(renderer);
//
//     new RGBELoader().setPath('js/').load('cayley_interior_4k.hdr', function(hdrmap) {
//
//         let envmap = envmaploader.fromCubemap(hdrmap);
//         let texture = new THREE.CanvasTexture(new FlakesTexture());
//         texture.wrapS = THREE.RepeatWrapping;
//         texture.wrapT = THREE.RepeatWrapping;
//         texture.repeat.x = 10;
//         texture.repeat.y = 6;
//
//         const ballMaterial = {
//             clearcoat: 1.0,
//             cleacoatRoughness:0.1,
//             metalness: 0.9,
//             roughness:0.5,
//             color: 0x8418ca,
//             normalMap: texture,
//             normalScale: new THREE.Vector2(0.15,0.15),
//             envMap: envmap.texture
//         };
//
//         let ballGeo = new THREE.SphereGeometry(65,64,64);
//         let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
//         let ballMesh = new THREE.Mesh(ballGeo,ballMat);
//         scene.add(ballMesh);
//     });
//
//     animate();
// }
// function resizeRendererToDisplaySize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//         renderer.setSize(width, height, false);
//     }
//     return needResize;
// }
//
// function animate(time) {
//     time *= 0.001;
//     if (resizeRendererToDisplaySize(renderer)) {
//         const canvas = renderer.domElement;
//         camera.aspect = canvas.clientWidth / canvas.clientHeight;
//         camera.updateProjectionMatrix();
//     }
//     controls.update();
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }
//
// init();

const Model = () => {
    return (
        <>
            <canvas className={'canvas'}></canvas>
        </>
    )
}

export default Model