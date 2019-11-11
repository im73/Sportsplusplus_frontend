import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card,Avatar,message,Modal } from 'antd'
import CountUp from 'react-countup'
import  './index.less'
import axios from "../../axios";


const { Meta } = Card;
const item={name:'金泽是个沙雕',star:14,bfintro:'金泽是沙雕',time:"08:00",create:'im73'};
const confirm = Modal.confirm;



function MatchCard({ id,name ,time ,star  ,bfintro,creator,onupdate,onshow}) {
    let colorPalette = [
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
    ]
    function deletematch()
    {
        axios.ajax({
            url: '/BackGame',
            method: 'post',
            dataType: 'jsonp',
            data:{
                params:{
                    id:id,
                },

            },
        }).then((res) => {

            if (res.status == 204) {

                onupdate();
                message.success("删除成功");
            }
            else
                message.error("删除时出错");


        });
    }
    function showConfirm() {

        confirm({
            title: '警告',
            content: '你确定要删除这项赛程吗？',
            onOk() {
                deletematch(id);

            },
            onCancel() {},

        });
    }
    function showrst() {
        onshow(id);
    }
    return (
        <Card
            cover={
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" onClick={showrst}/>
            }
            actions={[<Icon type="delete" onClick={showConfirm}/>, <p >{time}</p>, <div className={"star"} ><Icon type="star" theme="twoTone" twoToneColor="#FFD700"  size={'large'}/> {star}</div>]}
            className={"MatchCards"}
        >
            <Meta
                avatar={<Avatar style={{ backgroundColor: colorPalette[Math.floor(Math.random()*20)]  }} >{creator[0]}</Avatar>}
                title={name}
                description={creator}
            />
        </Card>
    )
}

MatchCard.propTypes = {

    name: PropTypes.string,
    time: PropTypes.string,
    star: PropTypes.number,
    bfintro: PropTypes.string,
    creator: PropTypes.string,
    id: PropTypes.number,
}

export default MatchCard
