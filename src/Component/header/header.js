/**
 * Created by mty on 2017/8/2.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Star from '../star/star'

class header extends Component {
    constructor(){
        super()
        this.state = {
            classMap:[
                        'icon header-decrease',
                        'icon header-discount',
                        'icon header-special',
                        'icon header-invoice',
                        'icon header-guarantee'
                      ],
            detailShow: false
        }
    }
    componentDidMount() {
    }
    showDetail() {
        this.setState({
            detailShow: true
        })
    }
    hideDetail() {
        this.setState({
            detailShow: false
        })
    }
    render() {
        const seller = this.props.state.initGetData.seller
        const avatarImg = {
            width:'64px',
            height: '64px'
        }
        const headerBackgound = {
            width: '100%',
            height: '100%'
        }
        const supportItem = seller.supports.map((element,index)=> {
            return (<li className="support-item" key={index}>
                <span className={this.state.classMap[seller.supports[index].type]}></span>
                <span className="text">{seller.supports[index].description}</span>
            </li>)
        })
        const supportIcon = this.state.classMap[seller.supports[0].type]
        return (
           <div className="header-m" >
               <div className="header-content-wrapper">
                   <div className="header-avatar">
                       <img style={avatarImg}  alt="图片" src={seller.avatar} />
                   </div>
                   <div className="header-content">
                       <div className="header-title">
                           <span className="header-brand"></span>
                           <span className="header-name">{seller.name}</span>
                       </div>
                       <div className="header-description">
                           {seller.description}/{seller.deliveryTime}分钟送达
                       </div>
                       {seller.supports?(
                           <div className="header-support">
                               <span className={supportIcon}></span>
                           <span className="text">{seller.supports[0].description}</span>
                           </div>
                       ):''}
                   </div>
                   {seller.supports?(<div  className="header-support-count" onClick={this.showDetail.bind(this)}>
                       <span className="header-count">{seller.supports.length}个</span>
                       <i className="icon-keyboard_arrow_right"></i>
                       </div>):''}
               </div>
               <div className="header-bulletin-wrapper">
                   <span className="header-bulletin-title"></span>
                   <span className="header-bulletin-text">{seller.bulletin}</span>
                   <i className="icon-keyboard_arrow_right"></i>
               </div>
               <div className="header-background">
                   <img src={seller.avatar} style={headerBackgound} alt="背景"/>
               </div>
               {this.state.detailShow?
                   (<div className="detail">
                       <div className="detail-wrapper clearfix">
                            <div className="detail-main">
                                <h1 className="name">{seller.name}</h1>
                                <div className="star-wrapper">
                                    <Star
                                        size='48'
                                        score={seller.score}/>
                                </div>
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">优惠信息</div>
                                    <div className="line"></div>
                                </div>
                                {seller.supports?
                                    (
                                        <ul className="supports">
                                            {supportItem}
                                        </ul>
                                    ):''
                                }
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">商家公告</div>
                                    <div className="line"></div>
                                </div>
                                <div className="bulletin">
                                    <p className="content">{seller.bulletin}</p>
                                </div>
                            </div>
                       </div>
                       <div className="detail-close" onClick={this.hideDetail.bind(this)}>
                        <i className="icon-close"></i>
                       </div>
                   </div>):''
               }

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
)(header)