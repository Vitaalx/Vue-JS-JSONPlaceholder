/**
 * Aplatit un objet en un objet à un seul niveau.
 */

export function flattenObject(obj: Record<string, any>, parentKey: string = ""): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { 
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
