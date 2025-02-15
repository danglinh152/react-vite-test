import { Space, Table, Tag, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Column, ColumnGroup } = Table;

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
}

const UserTable: React.FC = () => {
  const [listUser, setListUser] = useState<User[]>([]);

  const deleteUser = async (userId: number) => {
    const url = `http://localhost:8080/api/users/${userId}`;
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczOTY5NzI1NywiaWF0IjoxNzM5NjEwODU3LCJpbmZvQWNjZXNzVG9rZW4iOiJhZG1pbiJ9.rHoNXTTT0fDBaPYvmaR1XOCn0LMVgwYKVmKtxIYsZ2HYI-3TwmdVT0ihtgmQEKvb1KJH-767H6SGe2V6C0BKkQ"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // Update state to remove the user from the list
      setListUser((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const url = "http://localhost:8080/api/users";
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczOTY5NzI1NywiaWF0IjoxNzM5NjEwODU3LCJpbmZvQWNjZXNzVG9rZW4iOiJhZG1pbiJ9.rHoNXTTT0fDBaPYvmaR1XOCn0LMVgwYKVmKtxIYsZ2HYI-3TwmdVT0ihtgmQEKvb1KJH-767H6SGe2V6C0BKkQ"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    try {
      const response = await fetch(url, {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setListUser(json.data.data);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const data: User[] = listUser;

  return (
    <Table<User> dataSource={data} rowKey="userId">
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column
        title="Email"
        dataIndex="email"
        key="email"
        render={(record: string) => {
          return <a>{record}</a>;
        }}
      />
      <Column
        title="Gender"
        dataIndex="gender"
        key="gender"
        render={(record) => {
          let color = record === "MALE" ? "blue" : "red";
          return (
            <Tag color={color} key={record}>
              {record.toUpperCase()}
            </Tag>
          );
        }}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => deleteUser(record.userId)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;
