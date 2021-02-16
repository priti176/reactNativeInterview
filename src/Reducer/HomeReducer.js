import { HomeReducer } from "../Config/ReducerKeys";

const INITIAL_STATE = {
    personalData: {
        Name:'Pritiranjan sahoo',
        Address :'Dumuduma, Bhubaneswar',
        Location :'Bhubaneswar',
        Profession :'Senior Software Engineer',
        Work_experience : '2 years 11 months'
    },
    apiListData: [],
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case HomeReducer.PERSONAL_DATA:
            return { ...state, personalData: action.payload };
        case HomeReducer.API_LIST_DATA:
            return { ...state, apiListData: action.payload };
        case HomeReducer.IS_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;
    }
}
