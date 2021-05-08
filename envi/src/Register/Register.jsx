import React from "react";
import "./Register.css";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };
  onFinishFailed = () => {
    console.log("Failed:");
  };

  onChangeUsername = (evt) => {
    this.setState({ username: evt.target.value });
  };

  onChangePassword = (evt) => {
    this.setState({ password: evt.target.value });
  };

  render() {
    return (
      <div className="Container">
        <Form
          {...this.layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </Form.Item>

          <Form.Item {...this.tailLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}