const Node = (value, prev, next) => ({
  value, prev, next,

  unlink() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  },

  insertAfter(other) {
    this.prev = other;
    this.next = other.next;
    this.prev.next = this;
    this.next.prev = this;
  }
});

const isUnique = array => {
  const seen = [];
  for (let i = 0; i < array.length; ++i) {
    if (seen[i]) return false;
    seen[i] = true;
  }
  return true;
};

const toLinkedList = array => {
  const start = Node(array[0]);

  let node = start;
  for (let i = 1; i < array.length; ++i) {
    node = Node(array[i], node);
    node.prev.next = node;
  }
  node.next = start;
  start.prev = node;

  if (!isUnique(array))
    throw new Error('Algorithm assumes array elements are unique');

  return start;
};

const distance = (n, length) => {
  const dist = ((n % length) + length) % length;
  if (dist > length / 2) return dist - length;
  return dist;
}

const mix = (start) => {
  const queue = [];
  let node = start;
  do {
    queue.push(node);
    node = node.next;
  } while (node !== start);

  for (let i = 0; i < queue.length; ++i) {
    node = queue[i];
    let dist = node.value;
    if (!dist) continue;

    node.unlink();

    let pos = node;
    if (dist > 0)
      while (dist-- > 0) pos = pos.next;
    else
      while (dist++ <= 0) pos = pos.prev;

    node.insertAfter(pos);
  }
}

const partOne = array => {
  const length = array.length;
  const list = toLinkedList(array);

  mix(list, length);

  let node = list;
  while (node.value !== 0) node = node.next;

  let out = node;
  do {
    console.log(out.value);
    out = out.next;
  } while (out.value);

  let sum = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 1000; ++j)
      node = node.next;

    sum += node.value;
  }

  return sum;
}

export default partOne;
