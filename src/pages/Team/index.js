import React from 'react'
import moment from "moment";
import axios from '../../axios/index'
import {Table, message, Row, Breadcrumb, Icon} from 'antd'
import './index.less'
import Button from "antd/es/button";
import Col from "antd/es/grid/col";
import Card from "antd/es/card";
import Pie from '../../components/Pie'
import ColumnS from '../../components/ColumnS'
import {Switch} from 'antd'
import NumberCard from "../Home";
import ScheduleCard from "../../components/ScheduleCard";

const item={date:'2019-02-03',home:{'name':'76人','total':'0'},away:{'name':'雷霆','total':'0'},time:"8:00",finish:0};

export default class  Team extends React.Component
{
    state={
        ChartStyle:0,
        Matchlist:[]
    }
    ClickOp=()=>{
        this.setState({
            ChartStyle:this.state.ChartStyle^1,
        })
    }
    componentWillMount() {
        axios.ajax({
            url: '/BackSchedule',
            method: 'get',
            dataType: 'jsonp',
        }).then((res) => {
            if (res.status == 200) {
                let Mlist=[];
                for(let p in res.data)
                {

                    Mlist.push({date:res.data[p].日期,home:{'name':res.data[p].主场球队中文名,'total':res.data[p].主场总分},away:{'name':res.data[p].客场球队中文名,'total':res.data[p].客场总分},time:res.data[p].时间,finish:res.data[p].状态})
                }

                this.setState({
                    Matchlist:Mlist,
                })

            }

        });
    }

    render()
    {

        var numberCards = this.state.Matchlist.map((item, key) => (
            <Col offset={2} key={key} lg={20}>
                <ScheduleCard {...item} />
            </Col>
        ));

        return (
            <div>
            <Row>




                <Col offset={1}>
                    <Breadcrumb className={"bread_team"}>
                        <Breadcrumb.Item >
                            <Icon type="home" />  首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Icon type="user" />  数据分析
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Icon type="heart" />  用户关注
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <p className={"Teamtitle"}>球队数据统计</p>
                </Col>

                <Col offset={1} lg={16} md={24}>

                    <Card className={"cardeffect"}>

                        <Switch  defaultChecked checkedChildren="Pie" unCheckedChildren="Column" className={"opbutton"} size={'large'} onClick={this.ClickOp}/>
                        {this.state.ChartStyle?<ColumnS/>:<Pie/>}

                    </Card>
                </Col>
                <Col  lg={7} className={"scard"}>
                    <Col offset={2}>
                        <p className={"subtitle"}>最近赛事</p>
                    </Col>
                        {numberCards}
                </Col>
            </Row>
        </div>);
    }
}
