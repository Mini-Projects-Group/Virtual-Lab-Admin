import {
  Button,
  Input,
  Form,
  Modal,
  Alert,
  Upload,
  message,
  Select,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../constants";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const NewTeacher = ({ f, ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [choice, setChoice]: [Number, any] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState([]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (c: Number) => {
    setChoice(c);
    setIsModalVisible(true);
  };

  const handleSubmit = async (val: any) => {
    console.log(val);
    setDisabled(true);

    let data = await axios.post(
      `${SERVER_URL}/user/register`,
      { type: "faculty", ...val },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("vl-token")}`,
        },
      }
    );

    console.log(data.data);
    if (data.data.error) {
      setError(data.data.message);

      setTimeout(() => setError(""), 5000);
    } else {
      setSuccess(data.data.message);
      setTimeout(() => setSuccess(""), 5000);

      form.resetFields();
      f();
    }
    handleCancel();
    setDisabled(false);
  };

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
    <>
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2px",
          marginTop: "5px",
        }}
      >
        <Button style={{ marginRight: "5px" }} onClick={() => showModal(0)}>
          Add Faculty
        </Button>

        {/* ADD NEW FACULTY MODAL */}
        <Modal
          centered
          title={choice == 0 ? "New Faculty" : "Upload a CSV"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {choice == 0 && (
            <>
              <Form
                form={form}
                name="basic"
                layout={"vertical"}
                initialValues={{ password: 123456 }}
                onFinish={handleSubmit}
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
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Password cannot be empty" },
                  ]}
                >
                  <Input.Password value="123456" />
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
                    Add Faculty
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
        {/* END OF NEW STUDENT MODAL */}
      </div>
    </>
  );
};

export default NewTeacher;
