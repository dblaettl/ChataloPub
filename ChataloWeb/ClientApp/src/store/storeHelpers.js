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

export async function handleErrors(response, options) {
    if (!response.ok) {
        var result = await fetch(response.url, options).then(res => {
            if (!res.ok) throw Error(res.statusText);
            else return res;
        }).catch(error => console.log(error));
        return result;
    } else {
        return response;
    }
}