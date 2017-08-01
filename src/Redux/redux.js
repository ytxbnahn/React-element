/**
 * Created by lau on 2017/8/1.
 */
/**
 * Created by lau on 2017/7/4.
 */
import axios from 'axios'
const INIT_REDUX = 'INIT_REDUX'

export default function (state, action) {
    if(!state) {
        state = { data:'222' }
    }
    switch (action.type) {
        case INIT_REDUX:
            return { test: action.test }
        default:
            return state
    }
}

export const initRedux = (test) => {
    axios.get('/data.json').then(function (res) {
        console.log(res)
    }).catch(function (err) {
        console.log(err)
    })
    return {type: INIT_REDUX, test }
}
