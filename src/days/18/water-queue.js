const WaterQueue = () => ({
  layers: [],

  push(position) {
    if (!this.min || this.min > position.y) this.min = position.y;
    if (!this.max || this.max < position.y) this.max = position.y;

    (this.layers[position.y] ||= []).push(position);
  },

  popSome() {
    for (let i = this.min; i <= this.max; ++i) {
      if (this.layers[i] && this.layers[i].length) {
        const popped = this.layers[i];
        delete this.layers[i];
        return popped;
      }
    }
  },

  empty() {
    if (this.min === undefined) return true;

    for (let i = this.min; i <= this.max; ++i)
      if (this.layers[i] && this.layers[i].length)
        return false;

    return true;
  }
});

export default WaterQueue;
