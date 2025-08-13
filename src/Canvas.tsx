function calculatePoints(angleA: number, angleB: number){
   const angleC = Math.PI - angleA - angleB; // Calculate angle C

   const pointA = { x: 100, y: 100 };
   const pointB = { x: 400, y: 100 };

   const lengthAB = Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
   )
   const lengthAC = Math.sin(angleB) * lengthAB / Math.sin(angleC);
   let pointC = { x: pointA.x + lengthAC*Math.cos(angleA),
                  y: pointA.y - lengthAC*Math.sin(angleA) };

   return [pointA, pointB, pointC];
}

function angleArcM(cx: number, cy: number, start: number, end: number, r: number) {

   const x1 = cx + r * Math.cos(start);
   const y1 = cy + r * Math.sin(start);
   const x2 = cx + r * Math.cos(end);
   const y2 = cy + r * Math.sin(end);
   return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

function angleArcPath(cx: number, cy: number, start: number, end: number, internal: boolean, incoginito: boolean = false) {
   const r = 20;
   if( !internal ) {
      const aux = start;
      start = end;
      end = aux + Math.PI;
   }
   return (
      <>
         <path
            d={angleArcM(cx, cy, start, end, r)}
            stroke="red"
            fill="none"
            strokeWidth="2"
         />
         <text
            x={ cx + (r+18 ) * Math.cos((end + start)/2)}
            y={ cy + (r+18) * Math.sin((end + start)/2)}
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="black"
            >
               {incoginito?"x":Math.round((end - start) * (180 / Math.PI))} {incoginito?"":"°"}
            </text>
         { internal ? "":
            <line x1={cx} y1={cy} x2={cx + 2*r*Math.cos(end)} y2={cy + 2*r*Math.sin(end)} stroke="black" />
         }
      </>
  );
  
}

interface CanvasProps {
   angleA: number;
   angleB: number;
   internal: boolean;
}
export default function Canvas({ angleA, angleB, internal}: CanvasProps) {
   angleA = angleA * Math.PI / 180; // Convert degrees to radians
   angleB = angleB * Math.PI / 180; // Convert degrees to radians
   const angleC = Math.PI - angleA - angleB; // Calculate angle C in degrees

   const [pa, pb, pc] = calculatePoints(angleA, angleB);
   return <div>
      <div>
          <svg
            width="70%"
            height="70%"
            viewBox = "0 -300 1000 1000"
            style={{ background: "#f5f5f5", border: "1px solid #ccc" }}
         >
            <line x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="black" />
            <line x1={pa.x} y1={pa.y} x2={pc.x} y2={pc.y} stroke="black" />
            <line x1={pb.x} y1={pb.y} x2={pc.x} y2={pc.y} stroke="black" />
            <circle cx={pa.x} cy={pa.y} r="5" fill="red" />
            <circle cx={pb.x} cy={pb.y} r="5" fill="red" />
            <circle cx={pc.x} cy={pc.y} r="5" fill="red" />


            {angleArcPath(pa.x, pa.y, -angleA, 0, true)}
            {angleArcPath(pb.x, pb.y, Math.PI, Math.PI+angleB, true)}
            {angleArcPath(pc.x, pc.y, angleB, angleB + angleC, internal, true)}
         </svg>
      </div>
   </div>
}