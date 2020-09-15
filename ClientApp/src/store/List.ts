import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ListState {
    isLoading: boolean;
    startDateIndex?: number;
    products: Product[];
}

export interface Product {
    id: number;
    symbol: string;
    name: string;
    categoryId: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestListAction {
    type: 'REQUEST_PRODUCTS';
    startDateIndex: number;
}

interface ReceiveListAction {
    type: 'RECEIVE_PRODUCTS';
    startDateIndex: number;
    products: Product[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestListAction | ReceiveListAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestProducts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.products && startDateIndex !== appState.products.startDateIndex) {
            fetch(`api/product`)
                .then(response => response.json() as Promise<Product[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_PRODUCTS', startDateIndex: startDateIndex, products: data });
                });

            dispatch({ type: 'REQUEST_PRODUCTS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ListState = { products: [], isLoading: false };

export const reducer: Reducer<ListState> = (state: ListState | undefined, incomingAction: Action): ListState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PRODUCTS':
            return {
                startDateIndex: action.startDateIndex,
                products: state.products,
                isLoading: true
            };
        case 'RECEIVE_PRODUCTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    products: action.products,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
