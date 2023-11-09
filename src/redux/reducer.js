// reducers.js

const initialState = {
//  searchTerm: '',
  data: [
    // { id: 1, name: 'John', phone: '123-456-7890' },
    // { id: 2, name: 'Jane', phone: '987-654-3210' },
    // { id: 3, name: 'Bob', phone: '111-222-3333' },
    // 추가적인 데이터...
  ],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ARR":
            return { ...state, data:action.payload};
        default:
            return state;
    }
};


export default rootReducer;
