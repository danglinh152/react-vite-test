import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import Password from "antd/es/input/Password";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Role {
  roleId: number;
  roleName: string;
}

const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [listRole, setListRole] = useState<Role[]>([]);

  const onFinish = async (values: any) => {
    const url = "http://localhost:8080/api/users"; // Your API endpoint
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5nbGluaDE1MiIsImV4cCI6MTczOTkzMjk1OCwiaWF0IjoxNzM5ODQ2NTU4LCJpbmZvQWNjZXNzVG9rZW4iOiJkYW5nbGluaDE1MiJ9.xBbL3zf6n-HZFPtUgxPSOeSjRPzvnRnyd9Dj8U3no6kaPvcc7pJ8XUxkFAINlcf8hizMskTU8Sy464aFql3q2g"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    const newValues = values;
    newValues.avatar = values.avatar[0].name;
    newValues.role = {
      roleId: values.role,
    };
    console.log(newValues);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRoleData = async () => {
    const url = "http://localhost:8080/api/roles";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5nbGluaDE1MiIsImV4cCI6MTczOTkzMjk1OCwiaWF0IjoxNzM5ODQ2NTU4LCJpbmZvQWNjZXNzVG9rZW4iOiJkYW5nbGluaDE1MiJ9.xBbL3zf6n-HZFPtUgxPSOeSjRPzvnRnyd9Dj8U3no6kaPvcc7pJ8XUxkFAINlcf8hizMskTU8Sy464aFql3q2g"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(url, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setListRole(json.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoleData();
  }, []);

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio value="MALE"> MALE </Radio>
            <Radio value="FEMALE"> FEMALE </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item label="User Name" name="userName">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        {/* <Form.Item label="TreeSelect" name="treeSelect">
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item label="Cascader" name="cascader">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item label="Birthday" name="birthday">
          <DatePicker />
        </Form.Item> */}
        {/* <Form.Item label="RangePicker" name="rangePicker">
          <RangePicker />
        </Form.Item> */}
        <Form.Item label="Phone No." name="phoneNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Address" name="buyingAddress">
          <TextArea rows={2} />
        </Form.Item>
        {/* <Form.Item label="Switch" name="switch" valuePropName="checked">
          <Switch />
        </Form.Item> */}
        <Form.Item
          label="Avatar"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("folder", "upload"); // Default folder name

              fetch("http://localhost:8080/api/upload", {
                method: "POST",
                body: formData,
              })
                .then((response) => {
                  if (response.ok) {
                    if (onSuccess) {
                      onSuccess(file);
                    }
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
            listType="picture-card"
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        {/* <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        {/* <Form.Item label="Slider" name="slider">
          <Slider />
        </Form.Item> */}
        {/* <Form.Item label="ColorPicker" name="colorPicker">
          <ColorPicker />
        </Form.Item> */}
        {/* <Form.Item label="Rate" name="rate">
          <Rate />
        </Form.Item> */}
        <Form.Item label="Role" name="role">
          <Select>
            {listRole.map((item) => (
              <Select.Option value={item.roleId}>{item.roleName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item label="Policy" name="disabled" valuePropName="checked">
          <Checkbox>I accept all your policy</Checkbox>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormDisabledDemo;
