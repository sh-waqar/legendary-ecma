class Dom {
  constructor() {
    this.count = 0;
    this.list = [];
  }

  getId() {
    this.count++;
    return this.count;
  }
  
  pushItem(item) {
      this.list.push(item);
  }
  
  getItem(idx) {
      return this.list[idx - 1];
  }
}

// Export the module
export default Dom;