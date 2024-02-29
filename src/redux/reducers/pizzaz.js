const initialState = {
   items: [],
   isLoaded: false
    }
    const pizzaz = (state = initialState, action) => {
    if(action.type === 'SET_PIZZAZ') {
        return {
            ...state,
            items: action.payload,
           
        }
    }
    return state;
    }
    export default pizzaz;