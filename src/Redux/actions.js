/**
 * Created by lau on 2017/8/2.
 */
import axios from 'axios'

export const INIT_DATA = 'INIT_DATA'
export const ADDFOOD_COUNT = 'ADDFOOD_COUNT'


// function requestPosts(subreddit) {
//     return {
//         type: REQUEST_POSTS,
//         subreddit
//     }
// }

function initGet(json) {
    return {
        type: INIT_DATA,
        data: json
    }
}

// function addFoodCounteds(json) {
//     return {
//         type: ADDFOOD_COUNT,
//         data: json
//     }
// }

function initData() {
    return dispatch => {
        return axios.get('/data.json').then(function (res) {
            dispatch(initGet(res.data))
        }).catch(function (err) {
            console.log(err)
        })
    }
}

// function addFoodCounted(json) {
//     return dispatch => {
//         return dispatch(addFoodCounteds(json))
//     }
// }

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

// function shouldFetchPosts(state, subreddit) {
//     const posts = state.postsBySubreddit[subreddit]
//     if (!posts) {
//         return true
//     } else if (posts.isFetching) {
//         return false
//     } else {
//         return posts.didInvalidate
//     }
// }
//
// export function fetchPostsIfNeeded(subreddit) {
//     return (dispatch, getState) => {
//         if (shouldFetchPosts(getState(), subreddit)) {
//             return dispatch(fetchPosts(subreddit))
//         }
//     }
// }