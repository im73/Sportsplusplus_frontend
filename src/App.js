import React, { Component } from 'react';
import { Typography,Breadcrumb ,Icon } from 'antd';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className={"wrap_con"}>

                {this.props.children}
            </div>
        );
    }
}

export default App;
