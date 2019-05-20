import React from 'react'
import moment from "moment";
import axios from '../../axios/index'
import {Table, message, Modal, Input} from 'antd'
import './index.less'
import Button from "antd/es/button";
const Search = Input.Search;
export default class  AppUser extends React.Component
{
    constructor(props){
        super(props)
        this.state=
            {
                searchvalue:'',
                isloading : true,
                sourceData:[],
                modal1Visible:false,
                modaldata:{username:'',email:'',userid:''},
            }
    }

    handledelete(record) {
        axios.ajax({
            url:'/user',
            method:'delete',
            data:{
                params:{
                    id:record.id
                },
            },
            dataType:'jsonp',
        }).then((res)=>{
            if(res=="")
            {
                message.error("删除失败")
            }
            else if(res.status===204)
            {
                console.log(record.toString());
                const dataSource = [...this.state.sourceData];
                this.setState({ sourceData: dataSource.filter(item => (item.id !== record.id)) });
                message.success("删除成功");
                console.log(this.state.sourceData)

            }
        });
    }
    handleUpdate(record)
    {
        this.setState({
            modal1Visible: true,
            modaldata:{username:record.nick_name,email:record.email,userid:record.id}
        })

    }
    componentWillMount() {
        axios.ajax({
            url:'/user',
            method:'get',
            dataType:'jsonp',
        }).then((res)=>{
            console.log(res.data);

            this.setState(
                {sourceData : res.data,
                        isloading: false,
                    modal1Visible: false,}
                        );
        });

    }
    handleonok=()=>{
        axios.ajax({
            url:'/user',
            method:'put',
            dataType:'jsonp',
            data:{
                params:{
                    id:this.state.modaldata.userid,
                    nick_name: document.getElementById('nick_name').value,
                    email: document.getElementById('email').value,
                },
            },
        }).then((res)=>{
            if(res.status==200)
            {
                const index = this.state.sourceData.findIndex(item => this.state.modaldata.userid === item.id);
                this.state.sourceData[index].nick_name = document.getElementById('nick_name').value
                this.state.sourceData[index].email =document.getElementById('email').value
                this.setState({sourceData:this.state.sourceData})
                message.success("修改成功");
            }
            else
            {
                message.error("修改失败");
            }
        });
        this.setState({modal1Visible:false})
    }

    render()
    {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '昵称',
            dataIndex: 'nick_name',
            key: 'nick_name',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',

        },{
            title: '注册时间',
            dataIndex: 'register_time',
            key: 'register_time',

        },{
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, record) => {
                return (
                    <div>
                    <Button onClick={e => this.handledelete(record, e)} type="danger">删除</Button>
                    <Button onClick={e => this.handleUpdate(record, e)} type="primary" className="bt">修改</Button>
                </div>)
            }


        }];
        const handlesearch=(e)=>{
            this.setState({
                searchvalue:document.getElementById("inputsearch").value,
            })
        }
        return (
            <div className={"appuser"}>
                <p className={"title"}>用户信息表 </p>
                <Search
                    placeholder="input search text"
                    onSearch={value => {
                        this.setState({
                            searchvalue:value
                        })
                    }}
                    style={{ width: 200 }}
                    id={"inputsearch"}
                    className={"search"} onChange={handlesearch}/>
                <Modal
                    title="修改信息"
                    style={{ top: 100}}
                    visible={this.state.modal1Visible}
                    onOk={() => this.handleonok()}
                    onCancel={() => this.setState({modal1Visible:false})}
                >
                    <p>昵称</p> <Input allowClear id={'nick_name'} defaultValue={this.state.modaldata.username}/>
                    <p>邮箱</p> <Input  allowClear id={'email'} defaultValue={this.state.modaldata.email}/>

                </Modal>
                <Table columns={columns}
                       dataSource={this.state.sourceData.filter(item => (item.nick_name.indexOf(this.state.searchvalue)!==-1)) }

                       loading={this.state.loading} className="table" rowKey={record => record.id} bordered
                       size={"small"}
                       pagination={{

                           pageSize: 8,
                       }}
                       className={"tableapp"}
                />

            </div>
        );
    }
}
