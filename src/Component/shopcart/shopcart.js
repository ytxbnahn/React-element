/**
 * Created by mty on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import BScroll from 'better-scroll';
import Cartcontrol from '../cartcontrol/cartcontrol'
import { initDataNeed } from '../../Redux/actions'

class shopcart extends Component{
    constructor() {
        super();
        this.state = {
            deliveryPrice:'',
            fold:true
        }
    }
    componentWillMount() {
    }
    totalCount() {
        let count = 0;
        this.props.selectFoods.forEach((food) => {
            count += food.count;
        });
        return count;
    }
    totalPrice() {
        let total = 0;
        this.props.selectFoods.forEach((food) => {
            total += food.price * food.count;
        });
        return total;
    }
    payDesc() {
        if (this.totalPrice() === 0) {
            return `￥${this.props.state.initGetData.seller.minPrice}元起送`;
        } else if (this.totalPrice() < this.props.state.initGetData.seller.minPrice) {
            let diff = this.props.state.initGetData.seller.minPrice - this.totalPrice();
            return `还差￥${diff}元起送`;
        } else {
            return '去结算';
        }
    }
    payClass() {
        if (this.totalPrice() < this.props.state.initGetData.seller.minPrice) {
            return 'not-enough';
        } else {
            return 'enough';
        }
    }
    listShow() {
        if (!this.totalCount()) {
            return false;
        }
        let show = !this.state.fold;
        if (show) {
            if (!this.scroll) {
                this.scroll = new BScroll(this.refs.listContent, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        }
    }
    toggleList() {
        if (!this.totalCount()) {
            this.setState({
                fold:true
            })
            return;
        }
        this.setState({
            fold:!this.state.fold
        })
        this.setState(() => {
            this.listShow();
        });
    }
    addFood() {
        this.props.add();
    }
    empty() {
        this.setState({
            fold:true
        })
        // let data = this.props.state.modifyData
        // data.forEach((good) => {
        //     good.foods.forEach((food,index) =>{
        //         food.count = 0;
        //         return food
        //     })
        // });
        this.props.selectFoods.forEach((food) => {
            food.count = 0
        });
        const { dispatch } = this.props
        dispatch(initDataNeed())
        // dispatch(addFoodCount(this.props.state.initGetData.goods))
         // console.log('22222222222222222222222222222'+JSON.stringify(this.props.state.initGetData.goods))
        // dispatch(addFoodCount(this.props.state.initGetData.goods))

    }
    hidelist() {
        this.setState({
            fold: true
        })
    }
    render () {
        //console.log('========='+JSON.stringify(this.props.selectFoods))
        const count = this.totalCount();
        const totalPrice = this.totalPrice();
        const deliveryPrice = this.props.state.initGetData.seller.deliveryPrice
        const payDesc = this.payDesc()
        const payClass = this.payClass()
        if(!this.totalCount()&&!this.state.fold){
            this.setState({
                fold:true
            })
        }
        return (
            <div>
                <div className="shopcart">
                    <div className="content" onClick={this.toggleList.bind(this)}>
                        <div className="content-left">
                            <div className="logo-wrapper">
                                <div className={'logo '+(count>0?'highlight':'')}>
                                    <i className={'icon-shopping_cart '+(count>0?'highlight':'')}></i>
                                </div>
                                {count>0?(<div className="num">{count}</div>):''}
                            </div>
                            <div className={'price '+(totalPrice>0?'highlight':'')}>￥{totalPrice}</div>
                            <div className="desc">另需配送费￥{deliveryPrice}元</div>
                        </div>
                        <div className="content-right">
                            <div className={'pay '+payClass}>
                                {payDesc}
                            </div>
                        </div>
                    </div>
                    {!this.state.fold?(
                        <div className="shopcart-list">
                            <div className="list-header">
                                <h1 className="title">购物车</h1>
                                <span className="empty" onClick={this.empty.bind(this)}>清空</span>
                            </div>
                            <div className="list-content" ref="listContent">
                                <ul>
                                    {this.props.selectFoods.map((food,index)=>(
                                        <li className="food" key={index}>
                                            <span className="name">{food.name}</span>
                                            <div className="price">
                                                <span>￥{food.price*food.count}</span>
                                            </div>
                                            <div className="cartcontrol-wrapper">
                                                <Cartcontrol add={this.addFood.bind(this)}
                                                             food={food}
                                                             goods = {this.props.state.initGetData.goods}
                                                             i={food.i} //goods[i]
                                                             index = {food.index} // foods[index]
                                                />
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    ):''}
                </div>
                {!this.state.fold?(<div className="list-mask" onClick={this.hidelist.bind(this)}></div>):''}
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
)(shopcart)