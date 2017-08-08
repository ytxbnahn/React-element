/**
 * Created by mty on 2017/8/2.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Star from '../star/star';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';
import BScroll from 'better-scroll'
const ALL = 2;

class ratings extends Component {
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
        console.log('did')
        this.ratings = new BScroll(this.refs.ratings, {
            click: true
        });
    }
    incrementTotal(type, data) {
        if (type === "selectType") {
            this.setState({
                selectType: data
            }, () => {
               this.ratings.refresh();
            });
        } else {
            this.setState({
                onlyContent: data
            }, () => {
               this.ratings.refresh();
            });
        }
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
    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
    render() {
        const seller = this.props.state.initGetData.seller;
        const ratings = this.props.state.initGetData.ratings
        return (
            <div className="wrapper" >
                <div className="tab border-1px">
                    <div className="tab-item">
                        <Link to="/">商品</Link>
                    </div>
                    <div className="tab-item">
                        <span className="active">评论</span>
                    </div>
                    <div className="tab-item">
                        <Link to="/seller">商家</Link>
                    </div>
                </div>
                <div className="ratings" ref="ratings">
                    <div>
                        <div className="ratings-content">
                            <div className="overview">
                                <div className="overview-left">
                                    <h1 className="score">{seller.score}</h1>
                                    <div className="title">综合评分</div>
                                    <div className="rank">高于周边商家{seller.rankRate}%</div>
                                </div>
                                <div className="overview-right">
                                    <div className="score-wrapper">
                                        <span className="title">服务态度</span>
                                        <Star size="36"
                                            score={seller.serviceScore} />
                                        <span className="score">{seller.serviceScore}</span>
                                    </div>
                                    <div className="score-wrapper">
                                        <span className="title">商品评分</span>
                                        <Star size="36"
                                            score={seller.foodScore} />
                                        <span className="score">{seller.foodScore}</span>
                                    </div>
                                    <div className="delivery-wrapper">
                                        <span className="title">送达时间</span>
                                        <span className="delivery">{seller.deliveryTime}分钟</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Split/>
                        <Ratingselect increment={this.incrementTotal.bind(this)}
                            selectType={this.state.selectType}
                            onlyContent={this.state.onlyContent}
                            desc={this.state.desc}
                            ratings={ratings} />
                        <div className="rating-wrapper border-1px">
                            <ul>
                                {ratings.map((rating, index) => {
                                    const needShow = this.needShow(rating.rateType, rating.text)
                                    const avatarImg = {
                                        width: '28px',
                                        height: '28px'
                                    }
                                    const rateTime = this.formatDate(rating.rateTime)
                                    return (needShow ? (
                                        <li className="rating-item"  key={index}>
                                            <div className="avatar">
                                                <img src={rating.avatar} alt="" style={avatarImg} />
                                            </div>
                                            <div className="content">
                                                <h1 className="name">{rating.username}</h1>
                                                <div className="star-wrapper">
                                                    <Star size="24" score={rating.score} />
                                                    {
                                                        rating.deliveryTime ? (
                                                            <span className="delivery">
                                                                {rating.deliveryTime}
                                                            </span>) : ''
                                                    }

                                                </div>
                                                <p className="text">{rating.text}</p>
                                                {rating.recommend && rating.recommend.length ? (
                                                    <div className="recommend">
                                                        <i className="iconfont icon-damuzhi"></i>
                                                         {
                                                            rating.recommend.map((item, index) => (
                                                                <span className="item" key={index}>{ item }</span>
                                                            ))
                                                        } 
                                                    </div>
                                                ) : ''
                                                }

                                                <div className="time">
                                                    {rateTime}
                                                </div>
                                            </div>
                                        </li>
                                    ) : '')
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
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
)(ratings)