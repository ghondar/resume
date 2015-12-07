const _defineProperties = Symbol.for('Class.defineProperties');

export default class Class{
  constructor(options){
    this[_defineProperties](options);
  }

  [_defineProperties](properties){
    const isObject = typeof properties === 'object';
    const isArray = properties instanceof Array;

    if(!isObject || isArray){
      return false;
    }

    Object.keys(properties).map((property) => {
      const symbol = Symbol.for(`${this.constructor.name}.${property}`);
      this[symbol] = properties[property];
    });
  }

  get(property){
    return this[Symbol.for(`${this.constructor.name}.${property}`)];
  }
  set(property, v){
    return !!(this[Symbol.for(`${this.constructor.name}.${property}`)] = v);
  }
}
