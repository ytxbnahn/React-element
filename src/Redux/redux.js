/**
 * Created by lau on 2017/8/1.
 */
/**
 * Created by lau on 2017/7/4.
 */
const INIT_REDUX = 'INIT_REDUX'

export default function (state, action) {
    if(!state) {
        state = { test:'222' }
    }
    switch (action.type) {
        case INIT_REDUX:
            return { test: action.test }
        default:
            return state
    }
}

export const initRedux = (test) => {
    return {type: INIT_REDUX, test }
}
