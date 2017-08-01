/**
 * Created by lau on 2017/8/1.
 */

import React from 'react'
import {
    HashRouter as Router,
    Route
} from 'react-router-dom'
import info from '../Component/info'
import index from '../Component/index'
import createHistory from 'history/createHashHistory'
const history = createHistory()

const RouteConfig = (
    <Router  history={history}>
        <div>
            <Route exact path="/" component={index}/>
            <Route path='/info' component={info}/>
        </div>
    </Router>
)

export default  RouteConfig