import React, { Component } from 'react';
import './App.css';
import configureStore from './Router/Route';
import Header from './Component/header/header';
import {connect} from 'react-redux'
import { initDataNeed } from './Redux/actions'
import './style/base.less';
import './style/app.less';

class App extends Component {
   componentWillMount() {
       const { dispatch } = this.props
       dispatch(initDataNeed())
   }
   componentWillReceiveProps(){
   }
  render() {
    if(!this.props.state.initGetData.seller){
      return (<div></div>)
    }
    return (
        <div>
            <Header/>
            {configureStore}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(App)
