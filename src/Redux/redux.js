/**
 * Created by lau on 2017/8/1.
 */
import { combineReducers } from 'redux'
import { INIT_DATA } from './actions'

function initGetData(state = { }, action) {
    switch (action.type) {
        case INIT_DATA:
            console.log('ddd')
            return action.data
        default:
            return state
    }
}

const rootReducer = combineReducers({
    initGetData
})

export default rootReducer
//
// export default function (state, action) {
//     if(!state) {
//         state = {
//                    seller: '',
//                    ratings: '',
//                    goods: ''
//                 }
//     }
//     console.log("------"+action.initData)
//     switch (action.type) {
//         case INIT_REDUX:
//             return {
//                 seller: action.initData.seller,
//                 ratings: action.initData.ratings,
//                 goods: action.initData.goods
//             }
//         default:
//             return state
//     }
// }
//
// export const initRedux = () => {
//     let initData;
//     axios.get('/data.json').then(function (res) {
//         initData = res.data
//         console.log(initData)
//         return {type: INIT_REDUX, initData }
//     }).catch(function (err) {
//         console.log(err)
//     })
// }
