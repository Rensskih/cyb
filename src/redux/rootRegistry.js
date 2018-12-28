const localStorageItemName = 'rootRegistry';

const initState = {
    items: {
        help: {
            hash: 'QmaC1YFu4Lm65RxU8bzCppAp8TQRFVRMT4czS6gzJXgp7h',
            protocol: 'ipfs',
        },
        cyber: {
            hash: 'QmcEd3zrfsRRx44HLZ6QJcAW1uLsq3fiBLNE9zsu5WX9s4',
            protocol: 'ipfs',
        },
        wiki: {
            hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
            protocol: 'ipfs',
        },
        ewiki: {
            hash: 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX',
            protocol: 'ipfs',
        },
        test: {
            hash: 'QmW9VJVjio3tgDsRRrkpW5mfMi1frDeC1tY177x2gZNgB5',
            protocol: 'ipfs',
        },
        chaingear: {
            hash: 'QmWm1UvpcUL5fizTRTvhBCDeV11PCi6Z7pBgxfQTuheA2i',
            protocol: 'ipfs',
        },
        dragons: {
            hash: 'Qmd22Hupa6obYzX5CDrSoAYmkrde8bVEERZDxGqaqu5U7t',
            protocol: 'ipfs',
        },
        ipfsview: {
            hash: 'QmSDgpiHco5yXdyVTfhKxr3aiJ82ynz8V14QcGKicM3rVh',
            protocol: 'ipfs',
        },
    },
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'SET_ROOT_REGISTRY_ITEMS': {
        return {
            ...state,
            items: { ...action.payload },
        };
    }

    default:
        return state;
    }
};

const saveRootRegistryItemsInLs = () => (dispatch, getState) => {
    const registryItems = getState().rootRegistry.items;

    localStorage.setItem(localStorageItemName, JSON.stringify(registryItems));
};

export const init = () => (dispatch, getState) => new Promise((resolve) => {
    let registryItems;
    const registryItemsJson = localStorage.getItem(localStorageItemName);

    if (registryItemsJson == null) {
        registryItems = initState.items;
    } else {
        registryItems = JSON.parse(registryItemsJson);
    }

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
});

export const deleteRegistryItem = itemName => (dispatch, getState) => {
    const registryItems = getState().rootRegistry.items;

    delete registryItems[itemName];

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());
};

export const getRegistryItemsAsArray = (state) => {
    const registryItems = state.rootRegistry.items;
    const registryItemsArray = Object.keys(registryItems).map(key => ({
        name: key,
        hash: registryItems[key].hash,
        protocol: registryItems[key].protocol,
    }));

    return registryItemsArray;
};

export const getRegistryItems = state => state.rootRegistry.items;

export const addRegistryItem = (
    name, hash, protocol,
) => (dispatch, getState) => new Promise((resolve) => {
    const registryItems = getState().rootRegistry.items;

    registryItems[name] = {
        hash,
        protocol,
    };

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems,
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
});

export const resetToDefault = () => (dispatch) => {
    localStorage.removeItem('rootRegistry');
    dispatch(init());
};
