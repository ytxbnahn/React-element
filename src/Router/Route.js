/**
 * Created by mty on 2017/8/1.
 */

import React from 'react'
import {
    HashRouter as Router,
    Route
} from 'react-router-dom'
import seller from '../Component/seller/seller'
import goods from '../Component/goods/goods'
import ratings from '../Component/ratings/ratings'
import createHistory from 'history/createHashHistory'
const history = createHistory()

const RouteConfig = (
    <Router  history={history}>
        <div>
            <Route exact path='/' component={goods}/>
            <Route path='/ratings' component={ratings}/>
            <Route path='/seller' component={seller}/>
        </div>
    </Router>
)

export default  RouteConfig