import isString from 'lodash/isString';
import path from 'path';

const relocateGlob = (glob) => {

  if (!isString(glob))
  {
    throw new TypeError(`invalid glob value: ${glob}`);
  }

  // NOTE: if path is excluded
  if (glob.charAt(0) === '!')
  {
    return "!" + path.resolve("../", glob.substring(1));
  }
  return path.resolve("../", glob);
};

export const relocate = (value) => {

  if (isString(value))
  {
    return relocateGlob(value);
  }
  else if (value instanceof Array)
  {
    return value.map((glob) => relocateGlob(glob));
  }
  throw new TypeError('unexpected value type');
};

export default {
  relocate
};
