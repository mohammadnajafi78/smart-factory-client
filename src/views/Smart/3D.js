// import { Canvas } from "@react-three/fiber"
// import { useGLTF, Stage, PresentationControls } from "@react-three/drei"

// function Model(props) {
//   const { scene } = useGLTF('/furnace.glb');
//   return <primitive object={scene} {...props} />
// }

// function App() {
//   return (
//     <Canvas dpr={[1,2]} shadows camera={{ fov: 45}} style={{"position": "absolute"}}>
//       <color attach="background" args={["#101010"]} />
//       <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI/4]}>
//         <Stage environment={null}>
//           <Model scale={0.01} />
//         </Stage>
//       </PresentationControls>
//     </Canvas>
//   );
// }

// export default App;

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

import React from 'react';
// import Draggable from 'react-draggable';
// import './App.css';

function Model(props) {
  const { scene } = useGLTF('/furnaceGLB.glb');
  return <primitive object={scene} {...props} />;
}

function App() {
  return (
    <>
      {/* <div className="wrapper">
        <h4>React-Draggable</h4>
        <div className="dragdiv">
          <Draggable> */}
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: 'absolute', width: '1100px', height: '480px' }}
      >
        {/* <color attach="background" args={['#101010']} /> */}
        <color attach="background" args={['#fafafa']} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
      {/* </Draggable>
          <Draggable>
            <div>
              <img src="/p&id.png" alt="My Image" width="400" height="300" />
            </div>
          </Draggable> */}
      {/* </div>
      </div> */}
    </>
  );
}

export default App;
