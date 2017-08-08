/**
 * Created by mty on 2017/8/4.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { addFoodCount } from '../../Redux/actions'

class cartcontrol extends Component{
    componentWillMount() {
    }
    addCart(event) {
        event.stopPropagation()
        const {dispatch} = this.props
        this.props.goods[this.props.i].foods[this.props.index].count
            ? (this.props.goods[this.props.i].foods[this.props.index].count++)
            : (this.props.goods[this.props.i].foods[this.props.index].count = 1)
        dispatch(addFoodCount(this.props.goods))
        this.props.add(event.target,this.props.food)
    }
    decreaseCart(event){
        event.stopPropagation()
        const { dispatch } = this.props
        this.props.goods[this.props.i].foods[this.props.index].count--
        dispatch(addFoodCount(this.props.goods))
        this.props.add(event.target,this.props.food)
    }
    render() {
        return (
            <div className="cartcontrol">
                {this.props.food.count>0?(
                    <span>
                        <div className="cart-decrease" onClick={this.decreaseCart.bind(this)} >
                        <span className="inner icon-remove_circle_outline"></span>
                        </div>
                        <div className="cart-count">{this.props.food.count}</div>
                    </span>
                ):''}

                <div className="cart-add icon-add_circle" onClick={this.addCart.bind(this)}></div>
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
)(cartcontrol)