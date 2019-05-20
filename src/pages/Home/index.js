import React from 'react'
import styles from './index.less'

import {Row, Col, Card, message} from 'antd'
import Login from "../../admin";
import NumberCard from '../../components/NumberCard'
import axios from "../../axios";
import Chart from '../../components/Charts'
import Weather from '../../components/Weather'
import Qoute from '../../components/Qoute'






export default class Home extends React.Component{

    state={
        numbers:[
            {color: "#8fc9fb",icon: "user-add",number: 3241,title: "新增用户"},
            {color: "red",icon: "user",number: 2781,title: "活跃用户"},
            {color: "#64ea91",icon: "team",number: 2781,title: "总用户"},
        ],
        qoute:{
            name:"Michael Jordan",
            content:"I can accept failure, but I can't accept not trying",
            title:"",
            avatar:"https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=c078f99007f41bd5ce5ee0a630b3eaae/72f082025aafa40ff69dd066a264034f78f01935.jpg"
        },
        weather : {
            city: "北京",
            icon: "http://s5.sencdn.com/web/icons/3d_50/10.png",
            name: "雨",
            temperature: "29"
        }
    }

    componentWillMount() {
        axios.ajax({
            url:'/BackHome',
            method:'get',
            dataType:'jsonp',
        }).then((res)=>{
            if(res.status==200)
            {
                this.setState({
                    numbers:[
                        {color: "#8fc9fb",icon: "user-add",number: res.data["newnum"].pop(),title: "新增用户"},
                        {color: "red",icon: "user",number: res.data["tknum"].pop(),title: "活跃用户"},
                        {color: "#64ea91",icon: "team",number: res.data["totalnum"].pop(),title: "总用户"},
                    ]
                })

            }

        });
        let city = '北京';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{

            if(res.status == 'success'){
                console.log(res);
                let data = res.results[0].weather_data[0];
                let now = new Date();
                let hour = now.getHours();
                let url="";
                if(hour<=4||hour>=19)
                {
                    url=data["nightPictureUrl"];
                }
                else
                {
                    url=data["dayPictureUrl"];
                }
                this.setState({
                    weather : {
                        city: res.results[0]["currentCity"],
                        icon: url,
                        name: data["weather"],
                        temperature: data["date"].split("：")[1].split(")")[0]
                    }
                })
            }
        })
    }

    render(){
        var numberCards = this.state.numbers.map((item, key) => (
            <Col key={key} lg={8} md={10}>
                <NumberCard {...item} />
            </Col>
        ));
        return (
            <Row className={"home-wrap"} gutter={24}>
                <Col offset={1} className={"cardgroup"} >
                {numberCards}
                </Col>
                <Col offset={1} lg={16} md={24}>
                    <Card
                        bordered={false}
                        bodyStyle={{
                            padding: '24px 36px 24px 0',
                        }}
                        className={"homechart"}
                    >
                        <Chart />

                    </Card>

                </Col>
                <Col lg={6} md={24}>
                    <Row gutter={24}>
                        <Col lg={24} md={12} >
                            <Card
                                bordered={false}
                                className={styles.weather}
                                bodyStyle={{
                                    padding: 0,
                                    height: 204,
                                    backgroundColor: 'skyblue',
                                    marginBottom:  10,
                                }}
                            >
                                <Weather {...(this.state.weather)}/>
                            </Card>
                        </Col>
                        <Col lg={24} md={12}>
                            <Card
                                bordered={false}
                                className={styles.quote}
                                bodyStyle={{
                                    padding: 0,
                                    height: 204,
                                    backgroundColor:'Thistle',
                                }}
                            >
                                    <Qoute {...(this.state.qoute)} />

                            </Card>
                        </Col>

                    </Row>
                </Col>
            </Row>
        );
    }
}
