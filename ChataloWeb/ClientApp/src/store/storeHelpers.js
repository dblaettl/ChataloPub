export const updateHash = (stateEntities, id, val) => {
    return {
        ...stateEntities,
        byHash: {
            ...stateEntities.byHash,
            [id]: val
        }
    };
};

export const undefinedIds = (array, itemHash) => {
    return new Set(array.filter(d => !itemHash[d]));
};

export const arrayToMap = (array, keyField) =>
    array.reduce((obj, item) => {
        let current = obj[item[keyField]];
        if (current !== undefined) {
            obj[item[keyField]] = { ...current, ...item };
        } else {
            obj[item[keyField]] = item;
        }
        return obj;
    }, {});

export const itemToMap = (item, keyField) => {
    let map = {};
    map[item[keyField]] = item;
    return map;
};
