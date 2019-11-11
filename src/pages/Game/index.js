import React from 'react'

import moment from "moment";
import axios from '../../axios/index'
import {Table, message, Card, Breadcrumb, Icon, Divider,Button, Radio,Row,Drawer,Select, DatePicker,Form } from 'antd'
import './index.less'

import { Input } from 'antd';
import MatchCard from '../../components/MatchCard'
import Col from "antd/es/grid/col";
import DespMatch from '../../components/DespMatch'
import NumberCard from "../Home";
import MyMatchCard from '../../components/MyMatchCard'

const { Option } = Select;


const Search = Input.Search;

const item111={date:'2019-08-01',time:'8:00',home:'buaa',away:'bupt',location:"buaa",homes:1,aways:3};
export default class  Game extends React.Component
{
    state ={
        sourcedata:[],
        tmp_sourcedata:[],
        time:'',
        sort:'创建时间',
        keyname:'',
        matchcards:'',
        searchvalue:'',
        visiable: false,
        nowCard:1,
    }
    componentWillMount() {
        axios.ajax({
            url: '/BackGame',
            method: 'get',
            dataType: 'jsonp',
        }).then((res) => {
            if (res.status == 200) {
                let Mlist=[];
                for(let p in res.data)
                {

                    Mlist.push({name:res.data[p].name,creator:res.data[p].creator,star:res.data[p].star,time:res.data[p].time,id:res.data[p].id,bfintro:res.data[p].bfintro,create:res.data[p].create})
                }

                this.setState({
                    sourcedata:Mlist,
                    tmp_sourcedata:Mlist,
                })
                this.getCard();
            }

        });
    }
    handleChange=(e)=>{
        console.log(e.target.value);
        this.setState({time:e.target.value})
        var tmp_card=[];
        for(var item in this.state.sourcedata)
        {

            if(this.state.sourcedata[item].time===e.target.value)
            {
                tmp_card.push(this.state.sourcedata[item]);
            }
        }
        this.setState({
            tmp_sourcedata:tmp_card,
        });

        var tmp=tmp_card.map((item, key) => (
            <Col key={key}   lg={5} offset={1} >
                <MatchCard {...item} onupdate={this.componentWillMount.bind(this)} onshow={this.showDrawer.bind(this)}/>
            </Col>
        ));
        this.setState({matchcards:tmp})
    }
    handleChangesort=(e)=>{
        this.setState({sort:e.target.value})

        var tmp_data=this.state.tmp_sourcedata;

        if(e.target.value==="创建时间"){
            for(let i=0;i<tmp_data.length;i++)
            {
                for(let j=i+1;j<tmp_data.length;j++)
                {
                    if(tmp_data[i].create>tmp_data[j].create)
                    {
                        var tmmmp=tmp_data[i];
                        tmp_data[i]=tmp_data[j];
                        tmp_data[j]=tmmmp;
                    }
                }
            }
        }
        else{
            for(let i=0;i<tmp_data.length;i++)
            {
                for(let j=i+1;j<tmp_data.length;j++)
                {
                    if(tmp_data[i].star<tmp_data[j].star)
                    {
                        var tmmmp=tmp_data[i];
                        tmp_data[i]=tmp_data[j];
                        tmp_data[j]=tmmmp;
                    }
                }
            }
        }
        this.setState({
            tmp_sourcedata:tmp_data,
        });
        var tmp=tmp_data.map((item, key) => (
            <Col key={key}   lg={5} offset={1} >
                <MatchCard {...item} onupdate={this.componentWillMount.bind(this)} onshow={this.showDrawer.bind(this)}/>
            </Col>
        ));
        this.setState({matchcards:tmp})
    }
    showDrawer = (id) => {
        this.setState({
            visible: true,
            nowCard: id,
        });


    };

    onClose = () => {
        this.setState({
            visible: false,
        });

    };

    getCard=()=>
    {
        var tmp="";

        tmp=this.state.tmp_sourcedata.map((item, key) => (
            <Col key={key}   lg={5} offset={1} >
                <MatchCard {...item} onupdate={this.componentWillMount.bind(this)} onshow={this.showDrawer.bind(this)}/>
            </Col>
        ));
        this.setState({matchcards:tmp})
    }

    handlesearch=(keyname)=>{

        var tmp_val=[];

        tmp_val=this.state.sourcedata.filter(item => (item.name.indexOf(keyname)!==-1));
        var tmp=tmp_val.map((item, key) => (
            <Col key={key}   lg={5} offset={1} >
                <MatchCard {...item} onupdate={this.componentWillMount.bind(this)} onshow={this.showDrawer.bind(this)}/>
            </Col>
        ));
        this.setState({tmp_sourcedata:tmp_val});
        this.setState({matchcards:tmp})
    }



    render()
    {

        return (<div className={"wrp"}>

            <Card className={"top_con"}>

                <Breadcrumb className={"bread_match"}>
                    <Breadcrumb.Item >
                        <Icon type="home" />  首页
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Icon type="heart" />  我的比赛
                    </Breadcrumb.Item>
                </Breadcrumb>

                <p className={"mygame_title"}>我的比赛</p>
                <Search
                    placeholder="请输入赛程名"
                    enterButton="搜索"
                    size="large"
                    onSearch={value => {this.handlesearch(value)}}
                    className={"search_text"}
                />
            </Card>



            <Card className={"type_con"}>
                <div className={"up_con"}>

                    <p className={"st_time"}>开始时间</p><Radio.Group value={this.state.time} onChange={this.handleChange} className={"bt_group"} buttonStyle="solid">
                        <Radio.Button value="星期一">星期一</Radio.Button>
                        <Radio.Button value="星期二">星期二</Radio.Button>
                        <Radio.Button value="星期三">星期三</Radio.Button>
                        <Radio.Button value="星期四">星期四</Radio.Button>
                        <Radio.Button value="星期五">星期五</Radio.Button>
                        <Radio.Button value="星期六">星期六</Radio.Button>
                        <Radio.Button value="星期天">星期天</Radio.Button>
                    </Radio.Group>
                </div>

                <Divider dashed  className={"div_line"}/>
                <div className={"bottom_con"}>
                    <p className={"st_time"} >排序方式</p>
                    <Radio.Group value={this.state.sort} defaultValue="创建时间" onChange={this.handleChangesort} className={"bt_group"} buttonStyle="solid">
                        <Radio.Button value="创建时间">创建时间</Radio.Button>
                        <Radio.Button value="关注度">关注度</Radio.Button>
                    </Radio.Group>
                </div>
            </Card>

            {this.state.matchcards}
            <Drawer
                title="赛程信息"
                width={600}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <div
                    style={{

                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'center',
                    }}
                >
                    <DespMatch id = {this.state.nowCard} />


                </div>
            </Drawer>




        </div>);
    }
}
