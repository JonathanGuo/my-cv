export default function Data(state = {
    fetching: false,
    data: {
        experiences: [],
        skills: {},
    },
    failed: false,
    fetched: false,
}, action) {
    switch (action.type) {
        case 'FETCHED_DATA':
            return {
                ...state,
                fetching: false,
                failed: false,
                data: action.payload,
            };
        case 'FETCHING_DATA':
            return {
                ...state,
                fetching: true,
                failed: false,
            };
        case 'FETCH_DATA_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                failed: true,
            };
        default:
            return state;
    }
}
