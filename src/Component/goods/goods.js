/**
 * Created by mty on 2017/8/2.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import BScroll from 'better-scroll';
import Shopcart from '../shopcart/shopcart'
import Cartcontrol from '../cartcontrol/cartcontrol'
import Food from '../food/food'
import { addFoodCount } from '../../Redux/actions'

class goods extends Component {
    constructor() {
        super()
        this.state = {
            classMap: [
                'icon decrease',
                'icon discount',
                'icon special',
                'icon invoice',
                'icon guarantee'
            ],
            goods: [],
            listHeight: [],
            scrollY: 1,
            menuCurrent:0,
            selectFoods: [],
            foodShow:false,
            selectedFood:{
                selectedFood: {},
                i:0,
                index:0
            }
        }
    }
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(addFoodCount(this.props.state.initGetData.goods))
    }
    componentDidMount() {
        this.meunScroll = new BScroll(this.refs.menuWrapper, {
            click: true
        });

        this.foodsScroll = new BScroll(this.refs.foodsWrapper, {
            click: true,
            probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => { //当页面滑动时，切换路由此方法无法体质持续触发 解除绑定也无效暂且这样处理
            if(pos.y){ 
                this.setState({
                    scrollY : Math.abs(Math.round(pos.y))
                })
                this.setState((prevState, props) => ({
                    menuCurrent: this.currentIndex()
                }));
            }else{
               this.foodsScroll.destroy();
            }
        });
            
        this._calculateHeight();
    }
    componentWillUnmount (){
        
        console.log('componentWillUnmount')
    }
    selectMenu(index) {
        let foodList = this.refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        this.setState({
            menuCurrent: index
        })
      
    }
    selectFood(food,i,index,event){
        console.log(event)
        console.log('food'+food)
        const selectedFood = {
            selectedFood:food,
            i:i,
            index:index
        }
        this.setState({
            foodShow:true,
            selectedFood:selectedFood
        })
    }
    hideFood() {
        this.setState({
            foodShow:false
        })
    }
    addFood(e,food) {
         console.log("json"+JSON.stringify(food))
        const foods = []
        this.props.state.modifyData.forEach((good,i) => {
            good.foods.forEach((food,index) =>{
                food.i = i;
                food.index = index;
                if(food.count>0){
                    foods.push(food)
                }
            })
        })
        this.setState({
            selectFoods: foods
        })
    }
    currentIndex() {
        for (let i = 0; i < this.state.listHeight.length; i++) {
            let height = this.state.listHeight[i];
            let height2 = this.state.listHeight[i + 1];
            if (!height2 || (this.state.scrollY >= height && this.state.scrollY < height2)) {
                return i;
            }
        }
        return 0;
    }
    _calculateHeight() {
        let foodList =  this.refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        let listHeights = []
        listHeights.push(height);
        for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            listHeights.push(height);
        }
        this.setState({
            listHeight: listHeights
        })
    }
    render() {
        const goods = this.props.state.initGetData.goods;
        const iconImg = {
            width: '57px',
            height: '57px'
        }
        return (
            <div className="wrapper" >
                <div className="tab border-1px">
                    <div className="tab-item">
                        <span  className="active">商品</span>
                    </div>
                    <div className="tab-item">
                        <Link to="/ratings">评论</Link>
                    </div>
                    <div className="tab-item">
                        <Link to="/seller">商家</Link>
                    </div>
                </div>
                <div className="goods-contain">
                    <div className="menu-wrapper" ref="menuWrapper">
                        <ul>
                            {
                                goods.map((element, index)=>(
                                    <li
                                        className={(this.state.menuCurrent===index?'current':'')+' menu-item'}
                                        onClick={this.selectMenu.bind(this,index)}
                                        key={index} >
                                        <span className="text border-1px">
                                            {element.type>0?(<span className={this.state.classMap[element.type]}></span>):''}
                                            {element.name}
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="foods-wrapper" ref="foodsWrapper">
                        <ul>
                            {
                                goods.map((item, i)=> (
                                    <li className="food-list food-list-hook" ref="foodList" key={i}>
                                        <h1 className="title">
                                            {item.name}
                                        </h1>
                                        <ul>
                                            {
                                                item.foods.map((food, index)=> (
                                                    <li className="food-item border-1px"  key={index} onClick={this.selectFood.bind(this,food,i,index)}>
                                                        <div className="icon">
                                                            <img style={iconImg} src={food.icon} alt="图片"/>
                                                        </div>
                                                        <div className="content">
                                                            <h2 className="name">{food.name}</h2>
                                                            <p className="desc">{food.description}</p>
                                                            <div className="extra">
                                                                <span className="count">月售{food.sellCount}份</span><span>好评率{food.rating}%</span>
                                                            </div>
                                                            <div className="price">
                                                                <span className="now">￥{food.price}</span>
                                                                {food.oldPrice?(<span className="old">￥{food.oldPrice}</span>):''}
                                                            </div>
                                                            <div className="cartcontrol-wrapper">
                                                                <Cartcontrol add={this.addFood.bind(this)}
                                                                             food={food}
                                                                             goods = {goods}
                                                                             i={i} // goods[i]
                                                                             index = {index} // foods[index]
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <Shopcart rel="shopcart"
                              selectFoods={this.state.selectFoods}
                              add={this.addFood.bind(this)}/>
                </div>
                {this.state.foodShow?(<Food food={this.state.selectedFood} 
                                            goods = {goods}
                                            add={this.addFood.bind(this)}
                                            hideFood={this.hideFood.bind(this)}/>)
                                            :''}
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
)(goods)