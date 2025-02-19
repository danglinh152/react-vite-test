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
import { useEffect, useState } from "react";

const { Column, ColumnGroup } = Table;

interface Book {
  bookId: number;
  author: string;
  title: string;
  avgRate: number;
  isbn: string;
  sellingPrice: number;
  listPrice: number;
  quantity: number;
}

const AddBookModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Book) => void;
}> = ({ visible, onClose, onSubmit }) => (
  <Modal title="Add Book" open={visible} onCancel={onClose} footer={null}>
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Author"
        name="author"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ISBN"
        name="isbn"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Average Rating"
        name="avgRate"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Selling Price"
        name="sellingPrice"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="List Price"
        name="listPrice"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Book
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

const UpdateBookModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Book) => void;
  book: Book | null;
}> = ({ visible, onClose, onSubmit, book }) => (
  <Modal title="Update Book" open={visible} onCancel={onClose} footer={null}>
    <Form
      onFinish={onSubmit}
      layout="vertical"
      initialValues={
        book || {
          title: "",
          author: "",
          isbn: "",
          avgRate: 0,
          sellingPrice: 0,
          listPrice: 0,
          quantity: 0,
        }
      }
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Author"
        name="author"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ISBN"
        name="isbn"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Average Rating"
        name="avgRate"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Selling Price"
        name="sellingPrice"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="List Price"
        name="listPrice"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, type: "number" }]}
        style={{ marginBottom: 5 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Book
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

const BookManager: React.FC = () => {
  const [listBook, setListBook] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [bookUpdate, setBookUpdate] = useState<Book | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    total: 0,
  });

  const fetchBooks = async () => {
    const response = await fetch(
      `http://localhost:8080/api/books?page=${meta.currentPage}&size=${meta.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const json = await response.json();

    setListBook(json.data.data);

    setMeta({
      currentPage: json.data.meta.currentPage,
      pageSize: json.data.meta.pageSize,
      totalPages: json.data.meta.totalPages,
      total: json.data.meta.total,
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [meta.currentPage, meta.pageSize]);

  const handleAddBook = async (values: Book) => {
    const response = await fetch(`http://localhost:8080/api/books`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const json = await response.json();
    setListBook((prev) => [...prev, json.data]);
    setIsModalOpen(false);
  };

  const handleUpdateBookSubmit = async (values: Book) => {
    const response = await fetch(`http://localhost:8080/api/books`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const json = await response.json();
    setListBook((prev) =>
      prev.map((book) => (book.bookId === json.data.bookId ? json.data : book))
    );
    setIsModalUpdateOpen(false);
  };

  const handleUpdateBook = async (bookId: number) => {
    const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const json = await response.json();
    setBookUpdate(json.data);
    setIsModalUpdateOpen(true);
  };

  const deleteBook = async (bookId: number) => {
    console.log(bookId);

    await fetch(`http://localhost:8080/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    setListBook((prev) => prev.filter((book) => book.bookId !== bookId));
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
        <h1>Manage Books</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <AddBookModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBook}
      />

      <UpdateBookModal
        visible={isModalUpdateOpen}
        onClose={() => setIsModalUpdateOpen(false)}
        onSubmit={handleUpdateBookSubmit}
        book={bookUpdate}
      />

      <Table<Book>
        dataSource={listBook}
        rowKey="bookId"
        pagination={{
          current: meta.currentPage,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20", "25"],
        }}
      >
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column title="ISBN" dataIndex="isbn" key="isbn" />
        <Column title="Avg Rate" dataIndex="avgRate" key="avgRate" />
        <Column
          title="Selling Price"
          dataIndex="sellingPrice"
          key="sellingPrice"
        />
        <Column title="List Price" dataIndex="listPrice" key="listPrice" />
        <Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Popconfirm
                title="Are you sure to delete this book?"
                onConfirm={() => deleteBook(record.bookId)}
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
                onClick={() => handleUpdateBook(record.bookId)}
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

export default BookManager;
