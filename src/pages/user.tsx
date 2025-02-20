import {
  Space,
  Table,
  Tag,
  Popconfirm,
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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

const AddUserModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  listRole: Role[];
  form: any;
}> = ({ visible, onClose, onSubmit, listRole, form }) => (
  <Modal
    title="Add User"
    open={visible}
    onCancel={onClose}
    onOk={() => form.submit()} // Submits the form when OK is clicked
  >
    <Form onFinish={onSubmit} layout="vertical" form={form}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Radio.Group>
          <Radio value="MALE">MALE</Radio>
          <Radio value="FEMALE">FEMALE</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email" }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone No."
        name="phoneNumber"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true }]}
        style={{ marginBottom: 15 }}
      >
        <Select>
          {listRole.map((item) => (
            <Select.Option key={item.roleId} value={item.roleId}>
              {item.roleName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  </Modal>
);

const UpdateUserModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  listRole: Role[];
  form: any;
}> = ({ visible, onClose, onSubmit, listRole, form }) => (
  <Modal title="Update User" open={visible} onCancel={onClose} footer={null}>
    <Form onFinish={onSubmit} layout="vertical" form={form}>
      <Form.Item
        label="First Name"
        name="firstName"
        style={{ marginBottom: 5 }}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        style={{ marginBottom: 5 }}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        style={{ marginBottom: 5 }}
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value="MALE">MALE</Radio>
          <Radio value="FEMALE">FEMALE</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        style={{ marginBottom: 5 }}
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone No."
        name="phoneNumber"
        style={{ marginBottom: 5 }}
        rules={[{ required: true, type: "number" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        style={{ marginBottom: 5 }}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        style={{ marginBottom: 15 }}
        rules={[{ required: true }]}
      >
        <Select>
          {listRole.map((item) => (
            <Select.Option key={item.roleId} value={item.roleId}>
              {item.roleName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

const ManageUser: React.FC = () => {
  const [listUser, setListUser] = useState<User[]>([]);
  const [listRole, setListRole] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const userIdUpdateRef = useRef<number | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 3,
    totalPages: 0,
    total: 0,
  });

  const fetchUsers = async () => {
    const response = await fetch(
      `http://localhost:8080/api/users?page=${meta.currentPage}&size=${meta.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    
    setListUser(json.data.data);
    setMeta({
      currentPage: json.data.meta.currentPage,
      pageSize: json.data.meta.pageSize,
      totalPages: json.data.meta.totalPages,
      total: json.data.meta.total,
    });
  };

  const fetchRoles = async () => {
    const response = await fetch("http://localhost:8080/api/roles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const json = await response.json();
    setListRole(json.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [meta.currentPage, meta.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddUser = async (values: any) => {
    const response = await fetch(`http://localhost:8080/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, role: { roleId: values.role } }),
    });

    const json = await response.json();
    setListUser((prev) => [...prev, json.data]);
    setIsModalOpen(false);
    formAdd.resetFields();
  };

  const handleUpdateUserSubmit = async (values: any) => {
    const currentUserId = userIdUpdateRef.current;

    const response = await fetch(`http://localhost:8080/api/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        role: { roleId: values.role },
        userId: currentUserId,
      }),
    });

    const json = await response.json();

    setListUser((prev) =>
      prev.map((user) => (user.userId === json.data.userId ? json.data : user))
    );
    userIdUpdateRef.current = null;
    setIsModalUpdateOpen(false);
    formUpdate.resetFields();
  };

  const handleUpdateUser = async (userId: number) => {
    userIdUpdateRef.current = userId;
    console.log(userIdUpdateRef);

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const json = await response.json();

    formUpdate.setFieldsValue(json.data); // Set form values after fetching

    setIsModalUpdateOpen(true);
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        toast.error(errorJson.message || "Failed to delete user");
      } else {
        toast.success("User deleted successfully");
        // Update the user list
        setListUser((prev) => {
          console.log("Previous Users:", prev);
          console.log("Deleting User ID:", userId);
          return prev.filter((user) => user.userId !== userId);
        });
      }
    } catch (error) {
      toast.error("An unknown error occurred");
      console.error(error); // Log the error for debugging
    }
  };

  const handleOnChange = (page: number, pageSize: number) => {
    setMeta({
      currentPage: page,
      pageSize: pageSize,
      totalPages: meta.totalPages,
      total: meta.total,
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Manage Users</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <AddUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
        listRole={listRole}
        form={formAdd}
      />

      <UpdateUserModal
        visible={isModalUpdateOpen}
        onClose={() => {
          setIsModalUpdateOpen(false);
          formUpdate.resetFields();
        }}
        onSubmit={handleUpdateUserSubmit}
        listRole={listRole}
        form={formUpdate}
      />

      <Table<User>
        dataSource={listUser}
        rowKey="userId"
        pagination={{
          current: meta.currentPage,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9", "12", "15"],
        }}
      >
        <Column title="User ID" dataIndex="userId" key="userId" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          render={(text) => <a>{text}</a>}
        />
        <Column
          title="Gender"
          dataIndex="gender"
          key="gender"
          render={(text) => (
            <Tag color={text === "MALE" ? "blue" : "red"}>
              {text.toUpperCase()}
            </Tag>
          )}
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
                onClick={() => handleUpdateUser(record.userId)}
              >
                Update
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ManageUser;
