/**
 * Created by mty on 2017/8/2.
 */
import axios from 'axios'

export const INIT_DATA = 'INIT_DATA'
export const ADDFOOD_COUNT = 'ADDFOOD_COUNT'

function initGet(json) {
    return {
        type: INIT_DATA,
        data: json
    }
}

function initData() {
    return dispatch => {
        return axios.get('/data.json').then(function (res) {
            dispatch(initGet(res.data))
        }).catch(function (err) {
            console.log(err)
        })
    }
}

export const addFoodCount = (json) => {
    return {
        type: ADDFOOD_COUNT,
        data: json
    }
}
export function initDataNeed() {
    return (dispatch) => {
        return dispatch(initData())
    }
}
