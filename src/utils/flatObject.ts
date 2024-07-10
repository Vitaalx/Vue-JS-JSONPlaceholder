export function flattenObject(obj: object, parentKey = '') {
    let flattened = {};
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const propName = parentKey ? `${parentKey}.${key}` : key;
  
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(flattened, flattenObject(obj[key], propName));
        } else {
          flattened[propName] = obj[key];
        }
      }
    }
  
    return flattened;
  }