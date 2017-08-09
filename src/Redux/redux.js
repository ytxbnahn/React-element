/**
 * Created by mty on 2017/8/1.
 */
import { combineReducers } from 'redux'
import { INIT_DATA, ADDFOOD_COUNT } from './actions'

function initGetData(state = { }, action) {
    switch (action.type) {
        case INIT_DATA:
            return {...action.data}
        default:
            return state
    }
}
function modifyData(state = [], action) {
    switch (action.type) {
        case ADDFOOD_COUNT:
            return [...action.data]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    initGetData,
    modifyData
})

export default rootReducer
