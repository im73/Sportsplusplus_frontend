import React from 'react'
import ReactEcharts from 'echarts-for-react'

import './index.less'
import axios from "../../axios";
import {Switch, Descriptions, message, Col ,Divider} from 'antd'
import NumberCard from "../../pages/Home";
import Avatar from "antd/es/avatar";
import Row from "antd/es/grid/row";
import MyMatchCard from "../MyMatchCard";


export default class DespMatch extends React.Component {
    state={
        matchInfo:{manager:[],creator:'',star:0,time:'',bfintro:'',create:'',},
        gameInfo:[],
        matchlist:[],
    }
    constructor(props){
        super(props);
    }

    componentWillMount()
    {
        this.getdata(this.props.id);
    }
    componentWillReceiveProps(nextProps) {
        this.getdata(nextProps.id);
        // console.log("haha"+nextProps.id);
    }

    getdata=(ppid)=>{
        axios.ajax({
            url: '/GameInfo',
            method: 'get',
            dataType: 'jsonp',
            data:{
                params:{
                    id:ppid,
                },
            },
        }).then((res) => {

            var info = {};
            if (res.status === 200) {
                info['name'] = res.data.name;
                info['creator'] = res.data.creator;
                info['star'] = res.data.star;
                info['time'] = res.data.time;
                info['bfintro'] = res.data.bfintro;
                info['create'] = res.data.create;
                info['manager'] = res.data.manager;
                this.setState({matchInfo:info,gameInfo:JSON.parse(res.data.matchlist)});
                var matchlist=[];
                for(let i=0;i<this.state.gameInfo.length;i++)
                {
                    var datadic={};
                    datadic["home"] = this.state.gameInfo[i].主场;
                    datadic["away"] = this.state.gameInfo[i].客场;
                    datadic["homes"] = this.state.gameInfo[i].主场总分;
                    datadic["aways"] = this.state.gameInfo[i].客场总分;
                    datadic["date"] = this.state.gameInfo[i].日期;
                    datadic["time"] = this.state.gameInfo[i].时间;
                    datadic["location"] = this.state.gameInfo[i].地点;
                    matchlist.push(datadic);

                }
                this.setState({matchlist:matchlist});

            }
            else
                message.error("");



        });
        console.log(this.props.id);
    }


    render(){
        const colorPalette = [
            '#2ec7c9',
            '#b6a2de',
            '#5ab1ef',
            '#ffb980',
            '#d87a80',
            '#8d98b3',
            '#e5cf0d',
            '#97b552',
            '#95706d',
            '#dc69aa',
            '#07a2a4',
            '#9a7fd1',
            '#588dd5',
            '#f5994e',
            '#c05050',
            '#59678c',
            '#c9ab00',
            '#7eb00a',
            '#6f5553',
            '#c14089',
        ];

        return (

            <div className={"deswarp"}>
                <Descriptions
                    title="赛程详情"
                    border
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="比赛名称">{this.state.matchInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="创建者">{this.state.matchInfo.creator}</Descriptions.Item>
                    <Descriptions.Item label="时间">{this.state.matchInfo.time}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{this.state.matchInfo.create}</Descriptions.Item>
                    <Descriptions.Item label="关注度">{this.state.matchInfo.star}</Descriptions.Item>
                    <Descriptions.Item label="管理员">
                        {
                            this.state.matchInfo["manager"].map((item, key) => (
                                <Avatar style={{ backgroundColor: colorPalette[Math.floor(Math.random()*20)]  }} key={key}>{item}</Avatar>
                            ))
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="简介">{this.state.matchInfo.bfintro}</Descriptions.Item>



                </Descriptions>
                <Divider>比赛详情</Divider>
                <Row>
                    {
                        this.state.matchlist.map((item, key) => (
                            <Col key={key} lg={24} md={10} >
                                <MyMatchCard {...item} />
                            </Col>

                        ))
                    }

                </Row>

            </div>
        )

    }


}
