import React from 'react'
import './index.less'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavLeft from '../../components/NavLeft'
import {Row,Col} from 'antd'
import Login from "../../admin";

export default class Home extends React.Component{

    render(){
        return (
            <Row className="home-wrap">
                <Col span="4" className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span="20">
                    <Header/>
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}
