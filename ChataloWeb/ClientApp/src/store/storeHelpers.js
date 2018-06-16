export const updateHash = (stateEntities, id, val) => {
    return {
        ...stateEntities,
        byHash: {
            ...stateEntities.byHash,
            [id]: val
        }
    };
};

export const arrayToMap = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});

export const itemToMap = (item, keyField) => {
    let map = {};
    map[item[keyField]] = item;
    return map;
};
