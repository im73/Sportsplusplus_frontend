import React from 'react'
import {Breadcrumb, Icon, Row} from 'antd'
import Col from "antd/es/grid/col";
import  Header from './components/Header'
import  Footer from './components/Footer'
import  NavLeft from './components/NavLeft'
import  './style/common.less'
export default  class Admin extends React.Component
{
    state={
        username:'',
    }
    componentWillMount() {
       this.setState({
           username: window.location.href.split('=').pop(),
       })
    }

    render() {
        return (
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span={20}>
                    <Header default={this.state.username}/>
                    <Row className="main_content">
                        {this.props.children}
                    </Row>
                </Col>
                <Col span={20} >
                    <Footer/>
                </Col>



            </Row>
        );
    }
}
