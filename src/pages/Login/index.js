import React from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd';
import axios from '../../axios/index'
import Footer from '../../components/Footer'
import Utils from '../../utils/utils'
import './index.less'
const FormItem = Form.Item;

export default class Login extends React.Component {
    state = {};

    componentDidMount() {//每次进入登录页清除之前的登录信息

    }



    render() {
        return (
            <div className={"login-page"}>
                <div className={"login-header"}>
                    <div className={"logo"}>
                        <img src="/assets/logo-ant.svg" alt="Sports++后台管理系统"/>
                        Sports++ 后台管理系统
                    </div>
                </div>
                <div className={"login-content-wrap"}>
                    <div className={"login-content"}>
                        <div className={"word"}>Sports++ <br />你的比赛记录者</div>
                        <div className={"login-box"}>
                            <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg?"show":""}>
                                    {this.state.errorMsg}
                                </div>
                            </div>
                            <div className={"title"}>登录</div>
                            <LoginForm ref="login" loginSubmit={this.loginReq}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    state = {};

    loginSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                axios.ajax({
                    url:'/back_login',
                    data:{
                        params:{
                            nick_name:formValue.username,
                            password: formValue.password,

                        },

                    },
                    method:'get',
                    dataType:'jsonp',
                }).then((res)=>
                {
                    if(res.status  ==  200)
                    {
                        message.success('登录成功');
                        localStorage.setItem("username",formValue.username);
                        window.location.href = '/#/home'+'?username='+formValue.username;

                    }
                    else
                    {
                        message.warn('用户名或者密码错误');
                    }
                })
            }
        });
    };

    checkUsername = (rule, value, callback) => {
        var reg = /^\w+$/;
        if (!value) {
            callback('请输入用户名!');
        } else if (!reg.test(value)) {
            callback('用户名只允许输入英文字母');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={"login-form"} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                <FormItem label="账号">
                    {getFieldDecorator('username', {

                        rules: [{validator: this.checkUsername}]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem label={"密码"}>
                    {getFieldDecorator('password', {

                        rules: [{validator: this.checkPassword}]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className={"login-form-button"}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
LoginForm = Form.create({})(LoginForm);
