/**
 * Created by lau on 2017/8/1.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {initRedux} from '../Redux/redux'


class info extends  Component {
    constructor() {
        super()
        this.state = {
            info: 'nihao info'
        }
    }
    static propTypes = {
        test: PropTypes.string,
        initRedux: PropTypes.func
    }
    handleClick(){
        this.props.initRedux('ddddd')
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>{this.state.info}{this.props.test}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        test: state.test
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initRedux: (it) => {
            dispatch(initRedux(it))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(info)