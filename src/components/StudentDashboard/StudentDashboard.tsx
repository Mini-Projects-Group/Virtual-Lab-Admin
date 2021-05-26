import { Button, Input, Space, Spin, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PRIMARY, SERVER_URL, WHITE } from "../../constants";
import axios from "axios";
import NewStudent from "./NewStudent";

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

// const data = [
//   {
//     key: "1",
//     name: "Sanket Mundada",
//     email: "mundadasanket2000@gmail.com",
//     registration_id: "C2K18105870",
//     roll_no: 31142,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "2",
//     name: "Nimish Dadlani",
//     email: "nmd2611@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31143,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "3",
//     name: "Pradyumnaraje Patil",
//     email: "pradyumnaraje@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31147,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "1",
//     name: "Sanket Mundada",
//     email: "mundadasanket2000@gmail.com",
//     registration_id: "C2K18105870",
//     roll_no: 31142,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "2",
//     name: "Nimish Dadlani",
//     email: "nmd2611@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31143,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "3",
//     name: "Pradyumnaraje Patil",
//     email: "pradyumnaraje@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31147,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "1",
//     name: "Sanket Mundada",
//     email: "mundadasanket2000@gmail.com",
//     registration_id: "C2K18105870",
//     roll_no: 31142,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "2",
//     name: "Nimish Dadlani",
//     email: "nmd2611@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31143,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "3",
//     name: "Pradyumnaraje Patil",
//     email: "pradyumnaraje@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31147,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "1",
//     name: "San Mundada",
//     email: "mundadasanket2000@gmail.com",
//     registration_id: "C2K18105870",
//     roll_no: 31142,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "2",
//     name: "Nimish Dadlani",
//     email: "nmd2611@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31143,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
//   {
//     key: "3",
//     name: "Pradyumnaraje Patil",
//     email: "pradyumnaraje@gmail.com",
//     registration_id: "C2K1111111",
//     roll_no: 31147,
//     year: getYear(3),
//     branch: "C",
//     div: "1",
//     batch: "M1",
//     subjects: ["SDL", "CNL", "DBMSL", "ESIOTL", "WTL", "SPOSL"],
//   },
// ];

const StudentDashboard = (props) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);


  const f = async () => {
    
    const res = await axios.get(`${SERVER_URL}/student/getAll`);
    console.log(res.data.students);

    const data = res.data?.students.map((item, i) => {
      return {
        key: i,
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
      width: "10%",
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
      width: "10%",
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
  ];

  console.log(students);

  if (loading) return <Spin size="large" />;

  return (
    <div
      style={{ minHeight: "100vh", background: WHITE, padding: "45px 20px" }}
    >

      <NewStudent f={f} {...props}/>

      <Table
        pagination={{
          position: ["bottomRight"],
          pageSize,
          pageSizeOptions: ["4", "6", "10"],
          onChange: handleChange,
          onShowSizeChange: handlePageChange,
        }}
        columns={columns}
        dataSource={students}
      />
    </div>
  );
};

export default StudentDashboard;
