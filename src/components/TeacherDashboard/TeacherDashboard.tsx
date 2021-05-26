import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Select,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL, WHITE } from "../../constants";
import Modal from "antd/lib/modal/Modal";
import NewTeacher from "./NewTeacher";
const { Option } = Select;
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

const TeacherDashboard = (props) => {
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const handleCancel = () => {
    setSelectedFaculty(null);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const f = async () => {
    const res = await axios.get(`${SERVER_URL}/user/getAll/faculty`);
    console.log(res.data, faculties);

    const data = res.data?.faculties.map((item, i) => {
      return {
        key: item.email,
        ...item,
      };
    });

    setFaculties(data);
    console.log(data);
  };

  useEffect(() => {
    setLoading(true);
    f();
    setLoading(false);
  }, [faculties?.length]);

  const handleDelete = async (item) => {
    console.log(item);
    setLoading(true);
    const res = await axios.delete(`${SERVER_URL}/user/delete/faculty/${item}`);
    console.log(res);
    await f();
    setLoading(false);
  };

  const handleUpdate = (record) => {
    console.log(record);
    setSelectedFaculty(record);
    setIsModalVisible(true);
  };

  const handleUpdateSubmit = async (val: any) => {
    console.log(val);
    setLoading(true);
    const res = await axios.put(`${SERVER_URL}/user/update`, {
      type: "faculty",
      ...val,
    });
    console.log(res);
    handleCancel();
    await f();
    setLoading(false);
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
        dataIndex === "batches"
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
      width: "20%",
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
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      width: "10%",
      ...getColumnSearchProps("branch", "branch"),
    },
    {
      title: "Batches",
      dataIndex: "batches",
      key: "batches",
      width: "30%",
      ...getColumnSearchProps("batches", "batches"),
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
      title: "Update",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => (
        <Button onClick={() => handleUpdate(record)}>Update</Button>
      ),
    },
  ];

  const childrenBatches = [];

  const subjects = ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"];
  const batches = ["E", "F", "G", "H", "K", "L", "M", "N", "P", "Q", "R", "S"];
  const numbers = ["1", "2", "3", "4"];

  for (let i = 0; i < subjects.length; i++) {
    for (let j = 0; j < batches.length; j++) {
      for (let k = 0; k < numbers.length; k++) {
        let temp = subjects[i] + " " + batches[j] + numbers[k];
        childrenBatches.push(
          <Option value={temp} key={temp}>
            {temp}
          </Option>
        );
      }
    }
  }

  const handleBatchesChange = (value) => {
    console.log(value);
  };

  return (
    <div
      style={{ minHeight: "100vh", background: WHITE, padding: "45px 20px" }}
    >
      <NewTeacher f={f} {...props} />
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
        dataSource={faculties}
      />

      <Modal
        centered
        title={"Update Faculty"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          layout={"vertical"}
          initialValues={{
            email: selectedFaculty?.email,
            name: selectedFaculty?.name,
            registration_id: selectedFaculty?.registration_id,
            branch: selectedFaculty?.branch,
            batches: selectedFaculty?.batches,
          }}
          onFinish={handleUpdateSubmit}
        >
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
            label="Registration ID"
            name="registration_id"
            rules={[
              {
                required: true,
                message: "Registration ID cannot be empty",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Branch"
            name="branch"
            rules={[
              {
                required: true,
                message: "Branch cannot be empty",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Batches"
            name="batches"
            rules={[{ required: true, message: "Email cannot be empty" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={[]}
              onChange={handleBatchesChange}
            >
              {childrenBatches}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button disabled={disabled} type="primary" htmlType="submit">
              Update Faculty
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherDashboard;
