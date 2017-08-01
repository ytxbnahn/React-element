/**
 * Created by lau on 2017/8/1.
 */

import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import info from '../Component/info'
import index from '../Component/index'

const RouteConfig = (
    <Router >
        <div>
            <Route exact path="/" component={index}/>
            <Route path='/info' component={info}/>
        </div>
    </Router>
)

export default  RouteConfig