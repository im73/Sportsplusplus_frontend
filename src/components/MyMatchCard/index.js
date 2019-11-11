import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card,Avatar,Tag,Row,Col } from 'antd'
import CountUp from 'react-countup'
import  './index.less'


function MyMatchCard({ date, time, home, away , location,homes,aways}) {
    let colorPalette = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980',
        '#d87a80', '#8d98b3', '#e5cf0d', '#97b552',
        '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1',
        '#588dd5', '#f5994e', '#c05050', '#59678c',
        '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
    ]
    return (
        <Card
            className={"MyMatchCard"}
            bordered={false}
            bodyStyle={{ padding: 10 ,backgroundColor:colorPalette[Math.floor(Math.random()*20)]}}
            headStyle={{height:10}}

        >
            {/*<Icon className={"iconWarp"} style="white" />*/}

            <Row type="flex" justify="space-around" align="middle">
                <Col span={4}>
                    <p className={"upname"}>
                        {home}
                    </p>
                    <br/>
                    <p className={"bottmename"}>
                        {away}
                    </p>
                </Col>
                <Col span={10}>

                    <p className={"date"}>
                        {date+" "+time}
                    </p>
                    <br/>
                    <p className={"bottomscore"}>
                        {location}
                    </p>

                </Col>
                <Col span={4}>
                    <p className={"upname"}>
                        {homes}
                    </p>
                    <br/>
                    <p className={"bottmename"}>
                        {aways}
                    </p>
                </Col>

            </Row>
        </Card>
    )
}

MyMatchCard.propTypes = {
    date: PropTypes.string,
    home: PropTypes.string,
    away: PropTypes.string,
    time: PropTypes.string,
    homes: PropTypes.string,
    aways: PropTypes.string,
    location: PropTypes.string,

}

export default MyMatchCard
