class SingleMap {
  private static instance: SingleMap;

  map: Map<number, string> = new Map();

  private constructor() {}

  clean() {
    this.map = new Map();
  }

  public static get(): SingleMap {
    if (!SingleMap.instance) {
      SingleMap.instance = new SingleMap();
    }
    return SingleMap.instance;
  }
}

class Service1 {
  addMap(key: number, value: string) {
    const singleMap = SingleMap.get();
    singleMap.map.set(key, value);
  }
}

class Service2 {
  getKeys(key: number) {
    const singleMap = SingleMap.get();
    singleMap.map.get(key);
  }
}
