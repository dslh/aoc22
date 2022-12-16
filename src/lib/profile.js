function profile(func) {
  return function() {
    console.log(...arguments);
    const start = new Date().getTime();
    const result = func(...arguments);
    const seconds = (new Date().getTime() - start) / 1000;
    console.log(`Finished in ${seconds}`);
    return result;
  }
}

export default profile;
