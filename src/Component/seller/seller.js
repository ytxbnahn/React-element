/**
 * Created by lau on 2017/8/2.
 */
/**
 * Created by lau on 2017/8/2.
 */
/**
 * Created by mty on 2017/8/2.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class seller extends Component {
    constructor(){
        super()
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="wrapper" >
                <div className="tab border-1px">
                    <div className="tab-item ">
                        <Link to="/">商品</Link>
                    </div>
                    <div className="tab-item">
                        <Link to="/ratings">评论</Link>
                    </div>
                    <div className="tab-item">
                        <Link to="/seller" className="active">商家</Link>
                    </div>
                </div>
                <div className="contain">
                    seller
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(seller)