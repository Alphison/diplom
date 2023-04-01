import { useEffect, useState } from "react";

export function Counter({ val, time }) {
    const [ currVal, setCurrVal ] = useState(0);
  
    useEffect(() => {
      currVal !== val && setTimeout(setCurrVal, time, currVal + 1);
      console.log(val)
    }, [currVal]);
  
    return <div className="count-stat">{currVal}</div>;
}