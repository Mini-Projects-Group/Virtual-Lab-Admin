import { Button, Input, Popconfirm, Space, Spin, Table, Tag, Form } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PRIMARY, SERVER_URL, WHITE } from "../../constants";
import axios from "axios";
import NewStudent from "./NewStudent";
import Modal from "antd/lib/modal/Modal";
const getYear = (num: any) => {
  switch (num) {
    case 1:
      return "FE";
    case 2:
      return "SE";
    case 3:
      return "TE";
    case 4:
      return "BE";
  }
};

const StudentDashboard = (props) => {
  /* Update Modal */
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setSelectedStudent(null);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const f = async () => {
    const res = await axios.get(`${SERVER_URL}/user/getAll/student`);
    console.log(res.data, students);

    const data = res.data?.students.map((item, i) => {
      return {
        key: item.email,
        ...item,
      };
    });

    setStudents(data);
    console.log(data);
  };

  useEffect(() => {
    setLoading(true);
    f();
    setLoading(false);
  }, [students?.length]);

  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (page, pageSize) => {
    console.log("HAndle change", page, pageSize);

    setCurrentPage(page);
  };

  const handlePageChange = (current, size) => {
    console.log("HAndle page change", current, size);

    setPageSize(size);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState((prev) => {
      return { ...prev, searchText: "" };
    });
  };

  const getColumnSearchProps = (dataIndex, props) => {
    const { searchInput } = props;
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      render:
        dataIndex === "subjects"
          ? (subjects) => (
              <>
                {subjects?.map((tag) => {
                  let color = "geekblue";
                  return (
                    <Tag color={color} key={tag} style={{ margin: "5px" }}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            )
          : (text) =>
              state.searchedColumn === dataIndex ? (
                <Highlighter
                  highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                  searchWords={[state.searchText]}
                  autoEscape
                  textToHighlight={text ? text.toString() : ""}
                />
              ) : (
                text
              ),
    };
  };

  const handleDelete = async (item) => {
    console.log(item);
    setLoading(true);
    const res = await axios.delete(`${SERVER_URL}/user/delete/student/${item}`);
    console.log(res);
    await f();
    setLoading(false);
  };

  const handleUpdate = (record) => {
    console.log(record);
    setSelectedStudent(record);
    setIsModalVisible(true);
  };

  const handleUpdateSubmit = async (val: any) => {
    console.log(val);
    setLoading(true);
    const res = await axios.put(`${SERVER_URL}/user/update`, {
      type: "student",
      ...val,
    });
    console.log(res);
    handleCancel();
    await f();
    setLoading(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name", "name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email", "email"),
    },
    {
      title: "Registration_id",
      dataIndex: "registration_id",
      key: "registration_id",
      width: "10%",
      ...getColumnSearchProps("registration_id", "registration_id"),
    },
    {
      title: "Roll_no",
      dataIndex: "roll_no",
      key: "roll_no",
      width: "10%",
      ...getColumnSearchProps("roll_no", "roll_no"),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: "5%",
      ...getColumnSearchProps("year", "year"),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      width: "10%",
      ...getColumnSearchProps("branch", "branch"),
    },

    {
      title: "Div",
      dataIndex: "div",
      key: "div",
      width: "5%",
      ...getColumnSearchProps("div", "div"),
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
      width: "10%",
      ...getColumnSearchProps("batch", "batch"),
    },
    {
      title: "Subjects",
      dataIndex: "subjects",
      key: "subjects",
      width: "20%",
      ...getColumnSearchProps("subjects", "subjects"),
    },

    {
      title: "Delete",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
    {
      title: "Delete",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => (
        <Button onClick={() => handleUpdate(record)}>Update</Button>
      ),
    },
  ];

  console.log(students);

  if (loading) return <Spin size="large" />;

  return (
    <div
      style={{ minHeight: "100vh", background: WHITE, padding: "45px 20px" }}
    >
      <NewStudent f={f} {...props} />

      <Table
        pagination={{
          position: ["bottomRight"],
          pageSize,
          pageSizeOptions: ["4", "6", "10"],
          onChange: handleChange,
          onShowSizeChange: handlePageChange,
        }}
        bordered
        columns={columns}
        dataSource={students}
      />

      <Modal
        centered
        title={"Update Student"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          layout={"vertical"}
          initialValues={{
            email: selectedStudent?.email,
            name: selectedStudent?.name,
            roll_no: selectedStudent?.roll_no,
            registration_id: selectedStudent?.registration_id,
          }}
          onFinish={handleUpdateSubmit}
        >
          {console.log(selectedStudent)}
          <br />
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email cannot be empty" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Roll no"
            name="roll_no"
            rules={[{ required: true, message: "Roll_no cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Registration_Id"
            name="registration_id"
            rules={[
              { required: true, message: "Registered_Id cannot be empty" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button disabled={disabled} type="primary" htmlType="submit">
              Update Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
