import _ from 'lodash';

// list转换map
const formatListToMap = <T>(
  list: T[],
  keys: string | string[],
  values?: string | string[],
  isUnique?: true | false,
): Record<string, any> => {
  // 1. 处理参数keys
  let keyArr: string[] = [];
  if (_.isArray(keys)) {
    keyArr = keys as string[];
  } else if (_.isString(keys)) {
    keyArr = [keys as string];
  } else {
    throw new Error('keys需要传入字符串或数组');
  }

  // 2. 处理参数values
  let valueArr: string[] = [];
  let hasOrderValue = false;
  if (values) {
    if (_.isArray(values)) {
      valueArr = values as string[];
      hasOrderValue = true;
    } else if (_.isString(values)) {
      valueArr = [values as string];
      hasOrderValue = true;
    } else {
      throw new Error('values需要传入字符串或数组');
    }
  }
  let isSingleValue = false;
  if (valueArr && valueArr.length === 1) {
    isSingleValue = true;
  }

  // 3. 转换list为指定的keys和values的map
  const result: Record<string, T> | Record<string, T[]> = {};
  list.forEach((item: any) => {
    const resultKey: any[] = [];
    keyArr.forEach((key) => {
      resultKey.push(item[key]);
    });
    const k = resultKey.join('-');
    const pv = isSingleValue ? item[valueArr[0]] : _.pick(item, valueArr);
    const v = hasOrderValue ? pv : item;

    if (!isUnique) {
      result[k] = ((result[k] as T[]) || []).concat([v]);
    } else {
      result[k] = v;
    }
  });
  return result;
};

export {
  formatListToMap,
};
