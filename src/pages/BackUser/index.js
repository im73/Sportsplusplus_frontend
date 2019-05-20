import React from 'react'
import moment from "moment";
import axios from '../../axios/index'
import {Table, message, Modal, Input, Avatar} from 'antd'
import './index.less'
import Button from "antd/es/button";
const Search = Input.Search;
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
export default class  BackUser extends React.Component
{

    constructor(props){
        super(props)
        this.state=
            {
                searchvalue:'',
                isloading : true,
                sourceData:[],
                modal1Visible:false,
                addvisiable:false,
                modaldata:{
                    username:'',
                    truename:'',
                    userid:'',
                    addtime:'',
                    phnumber:'',
                    },
            }
    }

    handledelete(record) {
        axios.ajax({
            url:'/BackUser',
            method:'delete',
            data:{
                params:{
                    userid:record.id
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
            modaldata:{
                username:record.username,
                password:'',
                userid:record.id,
                phnumber:record.phnumber,
                addtime:record.addtime,
                truename:record.truename}
        })

    }

    componentWillMount() {
        axios.ajax({
            url:'/BackUser',
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
            url:'/BackUser',
            method:'put',
            dataType:'jsonp',
            data:{
                params:{
                    userid:this.state.modaldata.userid,
                    username: document.getElementById('username').value,
                    truename: document.getElementById('truename').value,
                    phnumber: document.getElementById('phnumber').value,
                    password: document.getElementById('password').value,

                },
            },
        }).then((res)=>{
            if(res.status==200)
            {
                const index = this.state.sourceData.findIndex(item => this.state.modaldata.userid === item.id);

                this.state.sourceData[index].username = document.getElementById('username').value;
                this.state.sourceData[index].truename = document.getElementById('truename').value;
                this.state.sourceData[index].phnumber = document.getElementById('phnumber').value;
                this.state.sourceData[index].password = document.getElementById('password').value;

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


    handleadduser=()=>
    {
        axios.ajax({
            url:'/BackUser',
            method:'post',
            dataType:'jsonp',
            data:{
                params:{
                    username: document.getElementById('addusername').value,
                    truename: document.getElementById('addtruename').value,
                    phnumber: document.getElementById('addphnumber').value,
                    password: document.getElementById('addpassword').value,

                },
            },
        }).then((res)=>{
            if(res.status==201)
            {
                let newdata=res.data;
                this.state.sourceData.push(newdata);
                this.setState({sourceData:this.state.sourceData})
                message.success("添加成功");
                this.setState({addvisiable:false})
            }
            else
            {
                message.error("添加失败");
            }
        });

    }
    render()
    {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        }, {
            title: '头像',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record) => {
                return (
                    <div >
                        <Avatar style={{ backgroundColor: colorList[record.id%4], verticalAlign: 'middle'}}  size="large">
                            {record.truename[0]}
                        </Avatar>
                    </div>)
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        }, {
            title: '真实姓名',
            dataIndex: 'truename',
            key: 'truename',
                align: 'center',

        },{
            title: '电话号码',
            dataIndex: 'phnumber',
            key: 'phnumber',
                align: 'center',
        }, {
            title: '添加时间',
            dataIndex: 'addtime',
            key: 'addtime',
                align: 'center',
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
            <div className={"backuser"}>
                <p className={"title"}>后台人员信息表 </p>

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

                <Button type="primary" className={"add"} onClick={()=>this.setState({addvisiable:true})} >添加管理员</Button>

                <Modal
                    title="修改信息"
                    style={{ top: 100}}
                    visible={this.state.modal1Visible}
                    onOk={() => this.handleonok()}
                    onCancel={() => this.setState({modal1Visible:false})}
                >
                    <p>真实姓名</p> <Input allowClear id={'truename'} defaultValue={this.state.modaldata.truename}/>
                    <p>  用户名</p> <Input  allowClear id={'username'} defaultValue={this.state.modaldata.username}/>
                    <p>    密码</p> <Input.Password  allowClear id={'password'} defaultValue={""}/>
                    <p>电话号码</p> <Input  allowClear id={'phnumber'} defaultValue={this.state.modaldata.phnumber}/>

                </Modal>

                <Modal
                    title="添加用户"
                    style={{ top: 100}}
                    visible={this.state.addvisiable}
                    onOk={() => this.handleadduser()}
                    onCancel={() => this.setState({addvisiable:false})}
                >
                    <p>真实姓名</p> <Input   allowClear id={'addtruename'} />
                    <p>  用户名</p> <Input   allowClear id={'addusername'} />
                    <p>    密码</p> <Input.Password   allowClear id={'addpassword'} />
                    <p>电话号码</p> <Input    allowClear id={'addphnumber'} />

                </Modal>

                <Table columns={columns}
                       dataSource={(this.state.sourceData).filter(item => item.truename.indexOf(this.state.searchvalue)!==-1) }
                       loading={this.state.loading} className="table"
                       // dataSource={[]}
                       rowKey={record => record.id}
                       bordered
                       size={"small"}
                       pagination={{
                           pageSize: 10,
                       }}
                      className={"tableback"}
                />

            </div>
        );
    }
}
