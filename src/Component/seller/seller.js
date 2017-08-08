/**
 * Created by mty on 2017/8/2.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Star from '../star/star'
import Split from '../split/split'
import BScroll from 'better-scroll'

class seller extends Component {
    constructor() {
        super()
        this.state = {
            favorite: false
        }
    }
    componentDidMount() {
        this._initScroll();
        this._initPics();
    }
    toggleFavorite() {
        this.setState({
            favorite: !this.state.favorite
        })
    }
    favoriteText() {
        return this.state.favorite ? '已收藏' : '收藏';
    }
    _initScroll() {
        if (!this.scroll) {
            this.scroll = new BScroll(this.refs.seller, {
                click: true
            });
        } else {
            this.scroll.refresh();
        }
    }
    _initPics() {
        const seller = this.props.state.initGetData.seller;
        if (seller.pics) {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * seller.pics.length - margin;
            this.refs.picList.style.width = width + 'px';
            if (!this.picScroll) {
                this.picScroll = new BScroll(this.refs.picWrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            } else {
                this.picScroll.refresh();
            }
        }
    }
    render() {
        const seller = this.props.state.initGetData.seller;
        const classMap = ['decrease ', 'discount ', 'special ', 'invoice ', 'guarantee '];
        const img = {
            width: '120px',
            height: '120px'
        }
        const favoriteText = this.favoriteText();
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
                <div className="seller" ref="seller">
                    <div className="seller-content">
                        <div className="overview">
                            <h1 className="title">{seller.name}</h1>
                            <div className="desc border-1px">
                                <Star size="36" score={seller.score} />
                                <span className="text">({seller.ratingCount})</span>
                                <span className="text">月售{seller.sellCount}单</span>
                            </div>
                            <ul className="remark">
                                <li className="block">
                                    <h2>起送价</h2>
                                    <div className="content">
                                        <span className="stress">{seller.minPrice}</span>元
                            </div>
                                </li>
                                <li className="block">
                                    <h2>商家配送</h2>
                                    <div className="content">
                                        <span className="stress">{seller.deliveryPrice}</span>元
                            </div>
                                </li>
                                <li className="block">
                                    <h2>平均配送时间</h2>
                                    <div className="content">
                                        <span className="stress">{seller.deliveryTime}</span>元
                            </div>
                                </li>
                            </ul>
                            <div className="favorite" onClick={this.toggleFavorite.bind(this)}>
                                <i className={(this.state.favorite ? 'active ' : '') + "icon-favorite"}></i>
                                <span>{favoriteText}</span>
                            </div>
                        </div>
                        <Split />
                        <div className="bulletin">
                            <h1 className="title">公告与活动</h1>
                            <div className="content-wrapper border-1px">
                                <p className="content">{seller.bulletin}</p>
                            </div>
                            {seller.supports ? (<ul className="supports">
                                {seller.supports.map((item, index) => (
                                    <li className="support-item" key={index}>
                                        <span className={classMap[seller.supports[index].type] + "icon"} ></span>
                                        <span className="text">{seller.supports[index].description}</span>
                                    </li>
                                ))}

                            </ul>) : ''}

                        </div>
                        <Split />
                        <div className="pics">
                            <h1 className="title">商家实景</h1>
                            <div className="pic-wrapper" ref="picWrapper">
                                <ul className="pic-list" ref="picList">
                                    {seller.pics.map((pic, index) => {
                                        return (
                                            <li className="pic-item" key={index}>
                                                <img src={pic} style={img} alt='图片' />
                                            </li>)
                                    })
                                    }

                                </ul>
                            </div>
                        </div>
                        <Split />
                        <div className="info">
                            <div className="title  border-1px">商家信息</div>
                            <ul>
                                {
                                    seller.infos.map((info, index) => (
                                        <li className="info-item" key={index} >{info}</li>
                                    ))
                                }

                            </ul>
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
)(seller)