import { call, put, takeLatest } from "redux-saga/effects";
// import ds from "../../../../shared/dataservices";
import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
} from "../../reducer/app/app.slice";

function* fetchUserWorker() {

    try {
        // const response = yield call([ds, ds.getlucy], "/user/getUserDetails");
        yield put(fetchUserSuccess(response));
    } catch (error) {
        yield put(fetchUserFailure(error.message || "Something went wrong"));
    }
}

export function* appSaga() {
    yield takeLatest(fetchUserRequest.type, fetchUserWorker);
}

