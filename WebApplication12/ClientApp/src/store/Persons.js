const requestPagedPersonsType = 'REQUEST_PAGED_PERSONS';
const receivePagedPersonsType = 'RECEIVE_PAGED_PERSONS';
const requestPersonType = 'REQUEST_PERSON';
const receivePersonType = 'RECEIVE_PERSON';
const addPersonType = 'ADD_PERSON';
const editPersonType = 'EDIT_PERSON';
const deletePersonType = 'DELETE_PERSON';

const initialState = { persons: [], person: null, id: null, offset: -1, limit: 0, isLoading: false };

export const actionCreators = {
    pagePersons: (offset, limit) => async (dispatch, getState) => {
        if (offset === getState().persons.offset && limit === getState().persons.limit) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestPagedPersonsType, offset, limit });
        const url = `api/person/persons?offset=${offset}?limit=${limit}`;
        const response = await fetch(url);
        const persons = await response.json();
        dispatch({ type: receivePagedPersonsType, offset, limit, persons });
    },
    addPerson: (person) => async (dispatch, getState) => {
        const url = `api/person/persons`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const returnedPerson = await response.json();
        dispatch({ type: addPersonType, returnedPerson });
    },
    editPerson: (person) => async (dispatch, getState) => {
        const url = `api/person/persons/${person.personId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        });
        const returnedPerson = await response.json();
        dispatch({ type: editPersonType, returnedPerson });
    },
    deletePerson: (id) => async (dispatch, getState) => {
        const url = `api/person/persons/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const result = await response.json();
        dispatch({ type: deletePersonType, result });
    },
    getPerson: (id) => async (dispatch, getState) => {
        if (id === getState().persons.id) return;
        dispatch({ type: requestPersonType, id });
        const url = `api/person/persons/${id}`;
        const response = await fetch(url);
        const person = await response.json();
        dispatch({ type: receivePersonType, id, person });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case requestPagedPersonsType:
            return {
                ...state,
                offset: action.offset,
                limit: action.limit,
                isLoading: true
            };
        case receivePagedPersonsType:
            return {
                ...state,
                offset: action.offset,
                limit: action.limit,
                persons: action.persons,
                isLoading: false
            };
        case requestPersonType:
            return {
                ...state,
                id: action.id,
                isLoading: true
            };
        case receivePersonType:
            return {
                ...state,
                id: action.id,
                person: action.person,
                isLoading: false
            };
        case addPersonType:
            return {
                ...state,
                person: action.returnedPerson,
                offset: -1
            };
        case editPersonType:
            return {
                ...state,
                person: action.returnedPerson,
                offset: -1
            };
        case deletePersonType:
            return {
                ...state,
                person: null,
                offset: -1
            };
        default:
            return state;
    }
};
