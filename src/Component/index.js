/**
 * Created by lau on 2017/8/1.
 */
import React, {Component} from 'react'

class index extends Component {
    constructor(){
        super()
        this.state = {
            index: 'nihao index'
        }
    }
    render() {
        return (
            <div> 大师范德萨发<a href="#/info">index</a></div>
        )
    }
}

export default index