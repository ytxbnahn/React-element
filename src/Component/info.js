/**
 * Created by lau on 2017/8/1.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'


class info extends  Component {
    constructor() {
        super()
        this.state = {
            info: 'nihao info'
        }
    }
    componentDidMount() {
    }
    handleClick(){
        console.log(this.props.state.initGetData.seller)
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>{this.state.info}{this.props.test}</div>
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
)(info)