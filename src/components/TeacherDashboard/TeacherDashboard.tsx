import { Button, Input, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const TeacherDashboard = () => {
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
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      width: "10%",
      ...getColumnSearchProps("branch", "branch"),
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
  ];

  return <div></div>;
};

export default TeacherDashboard;
