import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import './index.less'
import axios from "../../axios";
import { Switch } from 'antd'


export default class Pie extends React.Component {
    state={
        option:{},
        columnoption:{},
        typechart: 0,
        data:[],
        loading: true,
    }

    loadPie=()=>
    {
        let xaxis=[];
        let smdata=[];

        for(let p in this.state.data)
        {
            xaxis.push(p);
            smdata.push({value:this.state.data[p],name:p});
        }
        this.setState({
            option : {
                title : {
                    text: '球队关注度',
                    padding: 5,
                    x: 'center',
                    textStyle:{
                        color:'#000',
                        fontSize: 24,
                        fontFamily:'Microsoft YaHei',
                        fontWeight:'bold'

                    }

                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    animation: true,
                    padding: 10,
                    left:'left',
                    data: xaxis,
                },
                series : [
                    {
                        name: '关注人数',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: smdata,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
            }
        })
    }


    componentWillMount()
    {

        axios.ajax({
            url: '/TeamSubscribe',
            method: 'get',
            dataType: 'jsonp',
        }).then((res) => {
            if (res.status == 200) {
                this.setState({data:res.data});
                this.loadPie();
                this.setState({loading:false});
            }

        });

    }

    render(){
        return (

                <div className={"chartwrap"}>



                        <ReactEcharts
                            option={this.state.option}
                            style={{height:'100%', width: '100%'}}
                            className="react_for_echarts"
                            theme="macarons"
                            showLoading={this.state.loading}
                            ref='echarts_react'

                        />



                </div>
            )

    }


}
