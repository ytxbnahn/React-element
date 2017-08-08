import React, { Component } from 'react'
const POSITIVE = 0;
const NEGATIVE = 1;

class ratingselect extends Component {
    select(it, event) {
        console.log('select')
    //   this.props.selectType = it;
      //        this.dispatchEvent()
      this.props.increment('selectType', it);
    }
    toggleContent() {
    //   this.props.onlyContent = !this.props.onlyContent;
      this.props.increment('onlyContent', !this.props.onlyContent);
    }
    positives() {
        return this.props.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
        });
    }
    nagatives() {
        return this.props.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
        });
    }
    render() {
        const ratings = this.props.ratings
        const selectType = this.props.selectType
        console.log("selectType"+selectType)
        const desc = this.props.desc
        const onlyContent = this.props.onlyContent
        const positives = this.positives()
        const nagatives = this.nagatives()
        return (
            <div className="ratingselect">
                <div className="rating-type border-1px">
                    <span className={(selectType === 2 ? 'active ' : '') + "block positive"} onClick={this.select.bind(this, 2)}>{desc.all}<span
                        className="count">{ratings.length}</span> </span>
                    <span className={(selectType === 0 ? 'active ' : '') + "block positive"} onClick={this.select.bind(this, 0)}>{desc.positive}<span
                        className="count">{positives.length}</span></span>
                    <span className={(selectType === 1 ? 'active ' : '') + "block negative"} onClick={this.select.bind(this, 1)}>{desc.negative}<span
                        className="count">{nagatives.length}</span></span>
                </div>
                <div className={(onlyContent ? 'on ' : '') + "switch"} onClick={this.toggleContent.bind(this)}>
                    <i className="icon-check_circle"></i>
                    <span className="text">只看有内容的评价</span>
                </div>
            </div>
        )
    }
}

export default ratingselect