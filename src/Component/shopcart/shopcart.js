/**
 * Created by lau on 2017/8/3.
 */
import React, {Component} from 'react'

class shopcart extends Component{
    render () {
        return (
            <div>
                <div className="shopcart">
                    <div className="content">
                        <div className="content-left">
                            <div className="logo-wrapper">
                                <div className="logo">
                                    <i className="icon-shopping_cart"></i>
                                </div>
                                <div className="num"></div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="pay">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default shopcart