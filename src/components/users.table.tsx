import { Space, Table, Tag, Button, Popconfirm, Modal } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import FormDisabledDemo from "./form";

const { Column, ColumnGroup } = Table;

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  username: string;
  role: { roleId: number };
}

interface Role {
  roleId: number;
  roleName: string;
}

const UserTable: React.FC = () => {
  const [listUser, setListUser] = useState<User[]>([]);
  const [listRole, setListRole] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [userUpdate, setUserUpdate] = useState<User | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // const username = (document.getElementById("username") as HTMLInputElement)
    //   .value;
    // const password = (document.getElementById("password") as HTMLInputElement)
    //   .value;
    // const firstName = (document.getElementById("firstname") as HTMLInputElement)
    //   .value;
    // const lastName = (document.getElementById("lastname") as HTMLInputElement)
    //   .value;
    // const gender = (document.getElementById("gender") as HTMLSelectElement)
    //   .value;
    // const email = (document.getElementById("email") as HTMLInputElement).value;
    // const phoneNumber = (
    //   document.getElementById("phonenumber") as HTMLInputElement
    // ).value;
    // const roleId = (document.getElementById("role") as HTMLSelectElement).value;

    // const newUser = {
    //   username,
    //   password,
    //   firstName,
    //   lastName,
    //   gender,
    //   email,
    //   phoneNumber,
    //   role: { roleId: Number(roleId) },
    // };

    // const url = "http://localhost:8080/api/users"; // Your API endpoint
    // const token =
    //   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5nbGluaDE1MiIsImV4cCI6MTczOTkzMjk1OCwiaWF0IjoxNzM5ODQ2NTU4LCJpbmZvQWNjZXNzVG9rZW4iOiJkYW5nbGluaDE1MiJ9.xBbL3zf6n-HZFPtUgxPSOeSjRPzvnRnyd9Dj8U3no6kaPvcc7pJ8XUxkFAINlcf8hizMskTU8Sy464aFql3q2g"; // Replace with your actual token
    // const headers = new Headers({
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "application/json",
    // });

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(newUser),
    //   });
    //   if (!response.ok) {
    //     throw new Error(`Response status: ${response.status}`);
    //   }

    //   const json = await response.json();
    //   setListUser((prevUsers) => [...prevUsers, json.data]); // Update state with the new user
    //   setIsModalOpen(false); // Close the modal

    //   // Clear input fields
    //   clearInputFields();
    // } catch (error: any) {
    //   console.error(error.message);
    // }
  };

  const handleOkUpdate = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const firstName = (document.getElementById("firstname") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastname") as HTMLInputElement)
      .value;
    const gender = (document.getElementById("gender") as HTMLSelectElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phoneNumber = (
      document.getElementById("phonenumber") as HTMLInputElement
    ).value;
    const roleId = (document.getElementById("role") as HTMLSelectElement).value;

    const updatedUser = {
      userId: userUpdate?.userId,
      username,
      password,
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      role: { roleId: Number(roleId) },
    };

    const url = `http://localhost:8080/api/users`; // Your API endpoint
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5nbGluaDE1MiIsImV4cCI6MTczOTkzMjk1OCwiaWF0IjoxNzM5ODQ2NTU4LCJpbmZvQWNjZXNzVG9rZW4iOiJkYW5nbGluaDE1MiJ9.xBbL3zf6n-HZFPtUgxPSOeSjRPzvnRnyd9Dj8U3no6kaPvcc7pJ8XUxkFAINlcf8hizMskTU8Sy464aFql3q2g"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setListUser((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === json.data.userId ? json.data : user
        )
      ); // Update state with the updated user
      setIsModalUpdateOpen(false); // Close the modal

      // Clear input fields
      clearInputFields();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const showUpdateModal = (userId: number) => {
    getOneUser(userId);
    setIsModalUpdateOpen(true);
  };

  const getOneUser = async (userId: number) => {
    const url = `http://localhost:8080/api/users/${userId}`;
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

      setUserUpdate(json.data); // Set user data for update
      populateUpdateFields(json.data); // Populate fields with user data
    } catch (error: any) {
      console.log(error);
    }
  };

  const populateUpdateFields = (user: User) => {
    (document.getElementById("username") as HTMLInputElement).value =
      user.username;
    (document.getElementById("password") as HTMLInputElement).value = ""; // Password should not be pre-filled
    (document.getElementById("firstname") as HTMLInputElement).value =
      user.firstName;
    (document.getElementById("lastname") as HTMLInputElement).value =
      user.lastName;
    (document.getElementById("gender") as HTMLSelectElement).value =
      user.gender;
    (document.getElementById("email") as HTMLInputElement).value = user.email;
    (document.getElementById("phonenumber") as HTMLInputElement).value =
      user.phoneNumber;
    (document.getElementById("role") as HTMLSelectElement).value =
      user.role.roleId.toString();
  };

  const clearInputFields = () => {
    (document.getElementById("username") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("firstname") as HTMLInputElement).value = "";
    (document.getElementById("lastname") as HTMLInputElement).value = "";
    (document.getElementById("gender") as HTMLSelectElement).value = "MALE"; // Default value
    (document.getElementById("email") as HTMLInputElement).value = "";
    (document.getElementById("phonenumber") as HTMLInputElement).value = "";
    (document.getElementById("role") as HTMLSelectElement).value = ""; // Default value
  };

  const deleteUser = async (userId: number) => {
    const url = `http://localhost:8080/api/users/${userId}`;
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5nbGluaDE1MiIsImV4cCI6MTczOTkzMjk1OCwiaWF0IjoxNzM5ODQ2NTU4LCJpbmZvQWNjZXNzVG9rZW4iOiJkYW5nbGluaDE1MiJ9.xBbL3zf6n-HZFPtUgxPSOeSjRPzvnRnyd9Dj8U3no6kaPvcc7pJ8XUxkFAINlcf8hizMskTU8Sy464aFql3q2g"; // Replace with your actual token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers,
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
    getUserData();
    getRoleData();
  }, []);

  async function getUserData() {
    const url = "http://localhost:8080/api/users";
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
      setListUser(json.data.data);
    } catch (error: any) {
      console.error(error.message);
    }
  }

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
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b>My Table</b>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} />
        <Modal
          title="Add User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          {/* <div>
            <p>First Name</p>
            <input type="text" id="firstname" />
            <p>Last Name</p>
            <input type="text" id="lastname" />
            <p>Gender</p>
            <select id="gender">
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
            <p>Username</p>
            <input type="text" id="username" />
            <p>Password</p>
            <input type="password" id="password" />
            <p>Email</p>
            <input type="text" id="email" />
            <p>Phone Number</p>
            <input type="text" id="phonenumber" />
            <p>Role</p>
            <select id="role">
              {listRole.map((item) => (
                <option key={item.roleId} value={item.roleId}>
                  {item.roleName}
                </option>
              ))}
            </select>
          </div> */}
          <FormDisabledDemo />
        </Modal>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table<User>
          dataSource={listUser}
          pagination={{
            pageSizeOptions: [2, 4, 6, 8],
            defaultPageSize: 2,
          }}
          rowKey="userId"
        >
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            render={(text: string) => <a>{text}</a>}
          />
          <Column
            title="Gender"
            dataIndex="gender"
            key="gender"
            render={(text) => {
              const color = text === "MALE" ? "blue" : "red";
              return (
                <Tag color={color} key={text}>
                  {text.toUpperCase()}
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
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={() => showUpdateModal(record.userId)}
                >
                  Update
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={handleOkUpdate}
        onCancel={() => setIsModalUpdateOpen(false)}
      >
        <div>
          <p>First Name</p>
          <input type="text" id="firstname" />
          <p>Last Name</p>
          <input type="text" id="lastname" />
          <p>Gender</p>
          <select id="gender">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <p>Username</p>
          <input type="text" id="username" />
          <p>Password</p>
          <input type="password" id="password" />
          <p>Email</p>
          <input type="text" id="email" />
          <p>Phone Number</p>
          <input type="text" id="phonenumber" />
          <p>Role</p>
          <select id="role">
            {listRole.map((item) => (
              <option key={item.roleId} value={item.roleId}>
                {item.roleName}
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
