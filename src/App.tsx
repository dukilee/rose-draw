import Canvas from "./Canvas";
import { useState } from "react";

function App() {
  const [angleA, setAngleA] = useState(20);
  const [angleB, setAngleB] = useState(110);
  const [internalA, setInternalA] = useState(true);
  const [internalB, setInternalB] = useState(true);
  const [internalC, setInternalC] = useState(true);

  return (
    <div>
      <div>
        <input
          type="number"
          value={angleA}
          onChange={(e) => setAngleA(Number(e.target.value))}
        />
        <label>
          <input
            type="checkbox"
            checked={internalA}
            onChange={e => {
              setInternalA(e.target.checked)
              setAngleA(180 - angleA);
            }} 
          /> interno
        </label>
        <br/>
        <input
          type="number"
          value={angleB}
          onChange={(e) => setAngleB(Number(e.target.value))}
        />
        <label>
          <input
            type="checkbox"
            checked={internalB}
            onChange={e => {
              setInternalB(e.target.checked)
              setAngleB(180 - angleB);
            }} 
          /> interno
        </label>

        <br/>
        <label>
          X
          <input
            type="checkbox"
            checked={internalC}
            onChange={e => setInternalC(e.target.checked)} 
          /> interno
        </label>

      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          angleA={angleA}
          angleB={angleB}
          internalA={internalA}
          internalB={internalB}
          internalC={internalC}/>
      </div>
    </div>
  );
}

export default App;