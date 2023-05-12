export const interpolateBetweenColors = (
    fromColor:any,
    toColor:any,
    percent:number
  ) => {
    const delta = percent / 100;
    const r = Math.round(toColor.r + (fromColor.r - toColor.r) * delta);
    const g = Math.round(toColor.g + (fromColor.g - toColor.g) * delta);
    const b = Math.round(toColor.b + (fromColor.b - toColor.b) * delta);
  
    return `rgb(${r}, ${g}, ${b})`;
  };