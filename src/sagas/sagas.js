import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../store/actions';
import axios from 'axios';

const API_ROOT = 'https://api.openweathermap.org/data/2.5/weather?q=';

const APP_ID = '&units=metric&appid=147e7031bce0ee2dabfe5833e10328a5';

export function fetchWeatherApi(location) {
    return axios.get(API_ROOT + location + APP_ID);
}

function* fetchWeather(action) {
    try {
        const response = yield call(fetchWeatherApi, action.payload);
        if (response.status >= 200 && response.status < 300) {
            yield put(actions.weatherFetchSucceeded(response.data));
        } else {
            throw response;
        }
    } catch (e) {
        yield put(actions.weatherFetchFailed(e.message));
    }
}

function* mySaga() {
    yield takeEvery('WEATHER_FETCH_REQUESTED', fetchWeather);
}

export default mySaga;
