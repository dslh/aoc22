Array.prototype.eachSlice = function (size, fn) {
  const out = new Array(Math.trunc(this.length / size));

  for (let i = 0; i < this.length; i += size)
    out.push(fn(this.slice(i, i + size)));

  return out;
}
