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
    DatePicker,
  } from "antd";
  import {
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
  } from "@ant-design/icons";
  import { useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";

interface Order {
  orderId: number;
  date: Date;
  buyingAddress: string;
  shippingAddress: string;
  productCost: number;
  paymentCost: number;
  total: number  ;
  createdBy:string;
}

const AddOrderModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  form: any;
}> = ({ visible, onClose, onSubmit, form }) => (
  <Modal
    title="Add Order"
    open={visible}
    onCancel={onClose}
    onOk={() => form.submit()} // Submits the form when OK is clicked
  >
    <Form onFinish={onSubmit} layout="vertical" form={form}>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: false }]}
        style={{ marginBottom: 5 }}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Buying Address"
        name="buyingAddress"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Shipping Address"
        name="shippingAddress"
        rules={[{ required: true}]}
        style={{ marginBottom: 5 }}
      >
       <Input />
      </Form.Item>
      <Form.Item
        label="Product Cost"
        name="productCost"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber onChange={() => form.setFieldsValue({ total: (form.getFieldValue("productCost") || 0) + (form.getFieldValue("paymentCost") || 0) })} />
      </Form.Item>
      <Form.Item
        label="Payment Cost"
        name="paymentCost"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber onChange={() => form.setFieldsValue({ total: (form.getFieldValue("productCost") || 0) + (form.getFieldValue("paymentCost") || 0) })} />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber disabled />
      </Form.Item>
    </Form>
  </Modal>
);

  const OrderManager: React.FC = () => {
    const [listOrder, setListOrder] = useState<Order[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [formAdd] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const { Column, ColumnGroup } = Table;
    const [meta, setMeta] = useState({
      currentPage: 1,
      pageSize: 3,
      totalPages: 0,
      total: 0,
    });
    const fetchOrder = async () => {
        const response = await fetch(
          `http://localhost:8080/api/orders?page=${meta.currentPage}&size=${meta.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const json = await response.json();
        console.log(json);
        
        setListOrder(json.data.data);
        setMeta({
          currentPage: json.data.meta.currentPage,
          pageSize: json.data.meta.pageSize,
          totalPages: json.data.meta.totalPages,
          total: json.data.meta.total,
        });
      };
      useEffect(() => {
        fetchOrder();
      }, [meta.currentPage, meta.pageSize]);
    
    const handleAddUser = async (values: any) => {
        const response = await fetch(`http://localhost:8080/api/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        const json = await response.json();
        setListOrder((prev) => [...prev, json.data]);
        setIsModalOpen(false);
        formAdd.resetFields();
      };

      const handleOnChange = (page: number, pageSize: number) => {
        setMeta({
          currentPage: page,
          pageSize: pageSize,
          totalPages: meta.totalPages,
          total: meta.total,
        });
      };
      const deleteOrder = async (orderId: number) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/orders/${orderId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
    
          if (!response.ok) {
            const errorJson = await response.json();
            toast.error(errorJson.message || "Failed to delete order");
          } else {
            toast.success("Order deleted successfully");
            // Update the user list
            setListOrder((prev) => {
              console.log("Previous Orders:", prev);
              console.log("Deleting Order ID:", orderId);
              return prev.filter((order) => order.orderId !== orderId);
            });
          }
        } catch (error) {
          toast.error("An unknown error occurred");
          console.error(error); // Log the error for debugging
        }
      };
    
    return(
          <div>
             <div
               style={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
               }}
             >
               <h1>Manage Orders</h1>
               <Button
                 type="primary"
                 icon={<PlusOutlined />}
                 onClick={() => setIsModalOpen(true)}
               />
             </div>
       
             <AddOrderModal
               visible={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               onSubmit={handleAddUser}
               form={formAdd}
             />
       
            
             <Table<Order>
               dataSource={listOrder}
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
               <Column title="Order ID" dataIndex="orderId" key="orderId" />
               <Column title="Date" dataIndex="date" key="date" />
               <ColumnGroup title="Address">
                 <Column title="Buying Address" dataIndex="buyingAddress" key="buyingAddress" />
                 <Column title="Shipping Address" dataIndex="shippingAddress" key="shippingAddress" />
               </ColumnGroup>
               <ColumnGroup title="Cost">
                 <Column title="Product Cost" dataIndex="productCost" key="productCost" />
                 <Column title="Payment Cost" dataIndex="paymentCost" key="paymentCost" />
               </ColumnGroup>
               <Column title="Total" dataIndex="total" key="total" />

              
               <Column
                 title="Action"
                 key="action"
                 render={(text, record) => (
                   <Space size="middle">
                     <Popconfirm
                       title="Are you sure to delete this user?"
                       onConfirm={() => deleteOrder(record.orderId)}
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
           </div>
    )
  };

  export default OrderManager;
