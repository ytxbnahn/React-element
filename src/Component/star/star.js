/**
 * Created by mty on 2017/8/3.
 */
import React, { Component } from 'react'

class star extends Component {
    constructor(){
        super();
        this.state = {
            itemClasses: []
        }
    }
    componentWillMount(){
        const LENGTH = 5;
        const CLS_ON = 'on';
        const CLS_HALF = 'half';
        const CLS_OFF = 'off';
        let result = [];
        let score = Math.floor(this.props.score*2)/2;
        let hasDecimal = score % 1 !==0;
        let integer = Math.floor(score)
        for(let i = 0; i<integer; i++){
            result.push(CLS_ON);
        }
        if (hasDecimal) {
            result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
            result.push(CLS_OFF);
        }
        this.setState({
            itemClasses: result
        })
    }
    render() {

        const starType = 'star-' +this.props.size + ' star';
        return (
            <div className={starType}>
                {this.state.itemClasses.map((element, index) => (
                    <span className={element+' star-item'} key={index}></span>
                ))}
            </div>
        )
    }
}

export default star