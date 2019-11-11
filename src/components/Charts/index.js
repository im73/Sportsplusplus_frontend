import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import './index.less'
import axios from "../../axios";

export default class SimpleChartComponent extends React.Component {
    state={
        option:{}
    }
    componentWillMount()
     {

        axios.ajax({
            url: '/BackHome',
            method: 'get',
            dataType: 'jsonp',
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)

                this.setState({
                    option : {
                        title: {
                            text: '用户变化',
                        },
                        tooltip: {
                            trigger: 'axis',
                        },
                        legend: {
                            data: ['总用户', '活跃用户', '新增用户'],
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {},
                            },
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true,
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: res.data["dates"],
                            },
                        ],
                        yAxis: [
                            {
                                type: 'value',
                            },
                        ],
                        series: [
                            {
                                name: '总用户',
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: res.data["totalnum"],
                            },
                            {
                                name: '活跃用户',
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: res.data["tknum"],
                            },
                            {
                                name: '新增用户',
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: res.data["newnum"],
                            },
                        ],
                    }
                })
            }



        });


     }

        render(){
            return (
            <div className="examples">
                <div className="parent">

                    <ReactEcharts
                        option={this.state.option}
                        style={{height: '350px', width: '100%'}}
                        className="react_for_echarts"
                        theme="macarons"
                    />


                </div>
            </div>)

        }


}
