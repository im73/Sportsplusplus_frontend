import React, { Component } from 'react';
import { Typography } from 'antd';
import './App.css';
import { Row, Col } from 'antd';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';




const { Title } = Typography;


class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div className="loginform">
          <Form onSubmit={this.handleSubmit} className="login-form">
              <Title level={2} type={"danger"}>后台管理登录</Title>
              <Form.Item>
                  {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                  })(
                      <Checkbox>Remember me</Checkbox>
                  )}

                  <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                  </Button>

              </Form.Item>
          </Form>
          </div>
      );
  }

}

const WrappedNormalLoginForm = Form.create({ name: 'loginform' })(LoginForm);


export default WrappedNormalLoginForm;
