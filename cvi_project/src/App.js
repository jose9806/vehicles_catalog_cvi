import "./App.css";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { useRef, Suspense, useState } from "react";
import Dragable from './components/Dragable';
import Model from './components/Model';
import CameraControls from './components/CameraControls';
import CameraButtons from './components/CameraButtons';
import state from './state';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
extend({OrbitControls})

const Orbit = () => {
  const { camera, gl } = useThree();
  return (
    <orbitControls args={[camera, gl.domElement]} attach="orbitControls" />
  );
};
const Box = (props) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y += 0.01;
  });
  const handlePointerDown = (e) => {
    e.object.active = true;
    if (window.activeMesh) {
      scaleDown(window.activeMesh);
      window.activeMesh.active = false;
    }
    window.activeMesh = e.object;
  };
  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
  };
  const handlePointeLeave = (e) => {
    if (!e.object.active) {
      scaleDown(e.object);
    }
  };
  const scaleDown = (object) => {
    if (!object.active) {
      object.scale.x = 1;
      object.scale.y = 1;
      object.scale.z = 1;
    }
  };
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointeLeave}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color="blue" fog={false} />
    </mesh>
  );
};

const Background = (props) => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/GTA-ONLINE-Casino-penthouse-Car-Park.jpg"
  );
  texture.encoding = THREE.sRGBEncoding;
  return <primitive attach="background" object={texture} />;
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20,0.5,20]}/>
      <meshPhysicalMaterial color='#41453A' fog={false}/>
    </mesh>
  );
};

const Bulb = props =>{
  return(
    <mesh {...props} >
      <pointLight 
        castShadow
        shadow-mapSize-height={2**9}
        shadow-mapSize-width={2**9}/>
      <sphereBufferGeometry args={[0.2, 20, 20]}/>
      <meshPhongMaterial emissive='yellow'/>
    </mesh>
  );
};
function App() {
  const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
  const handleClick = e => {
    if(!state.activeMesh) return;
    state.activeMesh.material.color = new THREE.Color(e.target.style.background)
    console.log("color changed")
  }

  return (
    <div style={{ height: "100vh", widht: "100vw" }}>
      <div style={{ 
        position: "absolute", 
        zIndex:1, margin:'auto', 
        width:'fit-content',
        display:'flex', top:'15vh', left:0, right:0}}>
        <div 
        style={{ height: 50, width:50, background: 'blue'}} 
        onClick={handleClick}>

        </div>
        <div 
        onClick={handleClick} 
        style={{ height: 50, width:50, background: 'yellow'}}>

        </div>
        <div 
        onClick={handleClick} 
        style={{ height: 50, width:50, background: 'red'}}>

        </div>
        <div 
        onClick={handleClick} 
        style={{ height: 50, width:50, background: 'white'}}>

        </div>
      </div>
      <CameraButtons/>
      <Canvas
        shadows={true}
        style={{ background: "black" }}
        camera={{position:[3,3,3]}}
        >
          <CameraControls/>
          <ambientLight intensity={0.2}/>
          <Bulb position={[-3,-4,0]}/>
          <Bulb position={[0,-4,0]}/>
          <Bulb position={[3,-4,0]}/>
        
            
              <Suspense fallback={null}>
                <Dragable transformGroup>

                  <Model
                  path='/ferrari_mission_winnow_2022_f1/scene.gltf'
                  scale={new Array(3).fill(0.1)}
                  position={[3,-5.9,0]}
                  rotation={[0,-1.6,0]}
                  />
                </Dragable>
                <Dragable transformGroup>
                  <Model
                  path='/rigged_porche_cayman_gt4/scene.gltf'
                  scale={new Array(3).fill(0.7)}
                  position={[-3,-6.2,0]}
                  />
                </Dragable>
              </Suspense>
          
          <Suspense fallback={null}>
            <Background windowDimensions={windowDimensions}/>
          </Suspense>
          <Floor 
          position={[0,-6.5,0]}
/>
          <Orbit/>

        <Suspense fallback={null}>
          <Background windowDimensions={windowDimensions} />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}
export default App;
