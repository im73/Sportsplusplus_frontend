import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import './index.less'
import axios from "../../axios";
import { Switch } from 'antd'


export default class ColumnS extends React.Component {
    state={
        option:{},
        columnoption:{},
        typechart: 0,
        data:[],
        loading: true,
    }
    loadColumn = ()=>
    {
        let xaxis=[];
        let smdata=[];

        for(let p in this.state.data)
        {
            xaxis.push(p)
            smdata.push(this.state.data[p]);
        }

        this.setState({
            columnoption : {
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
                tooltip: {
                    trigger: 'axis'
                },

                toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                grid: {
                    top: 60,
                    left: 30,
                    right: 60,
                    bottom:30
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: Math.max.apply(null, smdata),
                    color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
                        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
                        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
                },
                xAxis: [
                    {
                        type: 'category',
                        show: true,
                        data: xaxis,
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#000'
                            },
                            rotate:270,

                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10,
                        nameTextStyle:
                            {
                                height: 100,
                            }

                    },

                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: '关注度',
                        max: Math.max.apply(null, smdata)+20,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    },

                ],
                series: [
                    {
                        name:'关注度',
                        type:'bar',

                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                            }
                        },
                        data:smdata,
                    },
                ]
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
                this.loadColumn();
                this.setState({loading:false});
            }

        });

    }

    render(){
        return (

            <div className={"chartwrap"}>

                        <ReactEcharts
                            option={this.state.columnoption}
                            style={{height:'100%',width: '100%'}}
                            className="react_for_echarts"
                            theme="macarons"
                            showLoading={this.state.loading}
                            ref='echarts_react'

                        />

            </div>
        )

    }


}
