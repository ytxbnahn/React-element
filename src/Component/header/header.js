/**
 * Created by mty on 2017/8/2.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

class header extends Component {
    constructor(){
        super()
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        const seller = this.props.state.initGetData.seller
        const avatarImg = {
            width:'64px',
            height: '64px'
        }
        return (
           <div className="header" >
               <div className="header-content-wrapper">
                   <div className="header-avatar">
                       <img style={avatarImg}  alt="图片" src={seller.avatar} />
                   </div>
               </div>
               <div className="header-bulletin-wrapper"></div>
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