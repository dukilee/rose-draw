import Canvas from "./Canvas";
import { useState } from "react";

function App() {
  const [angleA, setAngleA] = useState(20);
  const [angleB, setAngleB] = useState(110);
  const [internal, setInternal] = useState(true);

  return (
    <div>
      <div>
        _____
        <input
          type="number"
          value={angleA}
          onChange={(e) => setAngleA(Number(e.target.value))}
        />
        <input
          type="number"
          value={angleB}
          onChange={(e) => setAngleB(Number(e.target.value))}
        />
        <label>
        <input
          type="checkbox"
          checked={internal}
          onChange={e => setInternal(e.target.checked)} 
        />
        Interno
      </label>

      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas angleA={angleA} angleB={angleB} internal={internal}/>
      </div>
    </div>
  );
}

export default App;