/**
 * Created by lau on 2017/8/1.
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class index extends Component {
    constructor(){
        super()
        this.state = {
        }
    }
    render() {
        return (
            <div className="tab border-1px">
                <div className="tab-item active">
                    <Link to="/goods">商品</Link>
                </div>
                <div className="tab-item">
                    <Link to="/ratings">评论</Link>
                </div>
                <div className="tab-item">
                    <Link to="/seller">商家</Link>
                </div>
            </div>
        )
    }
}

export default index