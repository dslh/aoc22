const Node = (value) => ({
  value,

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

export const toLinkedList = array => {
  const list = array.map(v => Node(v));
  for (let i = 0; i < list.length - 1; ++i)
    list[i].next = list[i + 1];
  for (let i = 1; i < list.length; ++i)
    list[i].prev = list[i - 1];

  const last = list[list.length - 1];
  list[0].prev = last;
  last.nxet = list[0];
  const start = Node(array[0]);

  return list;
};

const distance = (n, length) => {
  length = length - 1;
  const dist = ((n % length) + length) % length;
  if (dist > length / 2) return dist - length;
  return dist;
}

export const mix = (list) => {
  for (let i = 0; i < list.length; ++i) {
    const node = list[i];

    //let dist = node.value;
    let dist = distance(node.value, list.length);
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

export const score = list => {
  let node = list[0];
  while (node.value !== 0) node = node.next;

  let sum = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 1000; ++j)
      node = node.next;

    sum += node.value;
  }

  return sum;
}

const partOne = array => {
  const list = toLinkedList(array);

  mix(list);

  return score(list);
}

export default partOne;
