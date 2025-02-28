import {
  Space,
  Table,
  Popconfirm,
  Modal,
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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
        label="Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          customRequest={({ file, onSuccess }) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "image"); // Default folder name

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
        ></Upload>
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
  const bookIdUpdateRef = useRef<number | null>(null);
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
    const currentBookId = bookIdUpdateRef.current;

    try {
      const response = await fetch(`http://localhost:8080/api/books`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          bookId: currentBookId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setListBook((prev) =>
        prev.map((book) =>
          book.bookId === json.data.bookId ? { ...json.data } : book
        )
      );
      bookIdUpdateRef.current = null;
      setIsModalUpdateOpen(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleUpdateBook = async (bookId: number) => {
    bookIdUpdateRef.current = bookId;
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
    try {
      const response = await fetch(
        `http://localhost:8080/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        toast.error(errorJson.message || "Failed to delete book");
      } else {
        toast.success("Book deleted successfully");
        // Update the Book list
        setListBook((prev) => {
          console.log("Previous Books:", prev);
          console.log("Deleting Book ID:", bookId);
          return prev.filter((book) => book.bookId !== bookId);
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
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text) => (
            <img
              src={`http://localhost:8080/storage/upload/${text}`}
              alt="Image"
              style={{ width: 50, height: 50, borderRadius: "50%" }} // Thay đổi kích thước và hình dáng nếu cần
            />
          )}
        />
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
