import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card,Avatar,Tag } from 'antd'
import CountUp from 'react-countup'
import  './index.less'


function ScheduleCard({ date, home, away, time,finish}) {
    let context;
    let title;
    if (finish===1)
    {
        context = <p className={"score"}>
            {home.total}<br/>
            {away.total}</p>;
        title = <Tag color="green">已结束</Tag>
    }
    else if(finish===0){
        context=<p style={{marginTop:20,marginBottom:20}}>{time}</p>;
        title = <Tag color="blue">未开始</Tag>
    }
    else{
        context = <p className={"score"}>
            {home.total}<br/>
            {away.total}</p>;
        title = <Tag color="orange">正进行</Tag>
    }
    return (
        <Card
            className={"ScheduleCard"}
            bordered={false}
            bodyStyle={{ padding: 10 }}
            title={date}
            headStyle={{height:10,color:'black'}}
            extra={title}
        >
            {/*<Icon className={"iconWarp"} style="white" />*/}
            <div className={"Schedulecontent"}>
                <Avatar src={"http://114.116.156.240/api/GetTeamImage/"+home.name} size={'large'}/>&nbsp;&nbsp;&nbsp;{home.name}
                <div className={"context"}>
                    {context}
                </div>
                <Avatar src={"http://114.116.156.240/api/GetTeamImage/"+away.name} size={'large'}/>&nbsp;&nbsp;&nbsp;{away.name}
            </div>
        </Card>
    )
}

ScheduleCard.propTypes = {
    date: PropTypes.string,
    home: PropTypes.object,
    away: PropTypes.object,
    time: PropTypes.string,
    finish: PropTypes.number,
}

export default ScheduleCard
