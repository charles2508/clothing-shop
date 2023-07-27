import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';
import { userSaga } from './user/user.saga';

// Inside generator function, the execution will be paused when seeing the 'yeild' keyword
// When seeing the yeild keyword, the function will return an object of this type: {value: ..., done: true/false}
// Think of the yield as the ability to pause the function
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)]);
}