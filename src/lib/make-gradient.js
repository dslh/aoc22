const makeGradient = ([rA, gA, bA], [rB, gB, bB], size = 26) => {
  const dR = rB - rA;
  const dG = gB - gA;
  const dB = bB - bA;

  return [...Array(size)].map((_,i) => {
    const r = i / size;
    return `rgb(${
      Math.round(rA + dR * r)
    },${
      Math.round(gA + dG * r)
    },${
      Math.round(bA + dB * r)
    }`
  });
};

export default makeGradient;
