export function weatherFetchRequested(location) {
    return { type: 'WEATHER_FETCH_REQUESTED', payload: location };
}
export function weatherFetchSucceeded(data) {
    return { type: 'WEATHER_FETCH_SUCCEEDED', payload: data };
}

export function weatherFetchFailed(error) {
    return { type: 'WEATHER_FETCH_FAILED', payload: error };
}
