/**
 * Created by mty on 2017/8/4.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cartcontrol from '../cartcontrol/cartcontrol'
import Split from '../split/split'
import Ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date';
import { addFoodCount } from '../../Redux/actions'
const ALL = 2;

class food extends Component {
    constructor() {
        super()
        this.state = {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐' ,
                negative: '吐槽'
            }
        }
    }
    componentDidMount() {
        this.setState({
            showFlag : true,
            selectType : ALL,
            onlyContent : true
        })
        if (!this.scroll) {
            this.scroll = new BScroll(this.refs.food, {
                click: true
            });
        } else {
        this.scroll.refresh();
        }
    }
    hide() {
        this.props.hideFood()
    }
    addOne(event) {
        console.log('addOne')
        console.log(this.props.goods[this.props.food.i])
        const {dispatch} = this.props
        this.props.goods[this.props.food.i].foods[this.props.food.index].count
        ? (this.props.goods[this.props.food.i].foods[this.props.food.index].count++)
        : (this.props.goods[this.props.food.i].foods[this.props.food.index].count = 1)
        dispatch(addFoodCount(this.props.goods))
        this.props.add(event,this.props.food)
    }
    needShow(type, text) {
        if (this.state.onlyContent && !text) {
          return false;
        }
        if (this.state.selectType === ALL) {
          return true;
        } else {
          return type === this.state.selectType;
        }
    }
    incrementTotal(type, data) {
        if(type ==="selectType"){
            this.setState({
                selectType: data
            })
        }else{
             this.setState({
                onlyContent: data
            })
        }
        
        this.setState((prevState) => {
            this.scroll.refresh(); 
        })
    }
    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
    render() {
        const goods = this.props.state.initGetData.goods;
        const food = this.props.food.selectedFood
        const i = this.props.food.i
        const index = this.props.food.index
        return (
            <div className='food' ref="food">
                <div className='food-content'>
                    <div className="image-header">
                        <img src={food.image} alt="" />
                        <div className="back" onClick={this.hide.bind(this)}>
                            <i className="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div className="content">
                        <h1 className="title">{food.name}</h1>
                        <div className="detail">
                            <span className="sell-count">月售{food.sellCount}份</span>
                            <span className="rating"> 好评率{food.rating}%</span>
                        </div>
                        <div className="price">
                            <span className="now">￥{food.price}</span>
                            {food.oldPrice?(<span className="old" >￥{food.oldPrice}</span>):''}
                        </div>
                        <div className="cartControl-wrapper">
                                <Cartcontrol    add={this.props.add.bind(this)}
                                                food={food}
                                                goods = {goods}
                                                i={i} // goods[i]
                                                index = {index} // foods[index]
                                />
                        </div>
                        {!food.count || food.count === 0?(<div className="buy" onClick={this.addOne.bind(this)}>
                            加入购物车
                        </div>):""}
                    </div>
                     <Split/> 
                    {food.info?(<div className="info" >
                        <h1 className="title">商品信息</h1>
                        <p className="text">{food.info}</p>
                    </div>):''}
                    
                    <Split/> 
                    <div className="rating">
                        <h1 className="title">商品评价</h1>
                         <Ratingselect increment={this.incrementTotal.bind(this)}
                                       selectType={this.state.selectType} 
                                       onlyContent={this.state.onlyContent} 
                                       desc={this.state.desc}
                                       ratings={food.ratings}/> 
                        <div className="rating-wrapper">
                            {food.ratings && food.ratings.length ? (
                                <ul>
                                    {
                                        food.ratings.map((rating, index) => {
                                           const needShow = this.needShow(rating.rateType, rating.text)
                                           const rateTime = this.formatDate(rating.rateTime)
                                            return (needShow?(<li className="rating-item border-1px" key={index}>
                                                <div className="user">
                                                    <span className="name">{rating.username}</span>
                                                    <img width="12" height="12" src={rating.avatar} alt="" className="avatar" />
                                                </div>
                                                <div className="time">{rateTime}</div>
                                                <p className="text">
                                                    <i className="iconfont" ></i>
                                                    { rating.text }
                                                </p>
                                            </li>):'')
                                        })
                                    }
                                </ul>
                                ) : ''
                            }
                            {(!food.ratings || food.ratings.length === 0)?(<div className="no-rating"></div>):''}
                        </div>
                    </div>
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
)(food)