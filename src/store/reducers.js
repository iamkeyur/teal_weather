export function reducer(
    state = {
        weatherData: null,
        weatherLocation: 'Montreal',
        isLoading: true,
        errorMessage: '',
    },
    action
) {
    switch (action.type) {
        case 'WEATHER_FETCH_REQUESTED':
            return {
                ...state,
                isLoading: true,
                weatherLocation: action.payload,
            };
        case 'WEATHER_FETCH_SUCCEEDED':
            return {
                ...state,
                weatherData: action.payload,
                isLoading: false,
                errorMessage: '',
            };
        case 'WEATHER_FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
