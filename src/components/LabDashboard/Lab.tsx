import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, List, message, Popconfirm, Select, Tooltip, Typography } from 'antd'
import { Option } from 'antd/lib/mentions';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../constants';


const branchData = { 
    C : "Computer",
    I : "IT",
    E : "ENTC"
}
function Lab({_id,batch, subject, students, branch, faculty, fetchLabs}) {
    const [facultyModal, setFacultyModal] = useState(false);
    const [studentModal, setStudentModal] = useState(false);

    const [departmentFaculty, setDepartmentFaculty] = useState([]);
    const [departmentStudents, setDepartmentStudents] = useState([]);

    const [selectedFaculty, setSelectedFaculty] = useState(faculty?._id);
    const [newStudents, setNewStudents] = useState([]);

    const getDepartmentData = async () => {
        let data = await axios.get(`${SERVER_URL}/faculty/branch?branch=${branch}`,{headers: {
            authorization: `Bearer ${localStorage.getItem('vl-token')}`
        }});

        setDepartmentFaculty(data.data.results);
        setDepartmentStudents(data.data.students);
    }

    useEffect( () => {
       getDepartmentData();
    },[students])


    function onChange(value) {
        setSelectedFaculty(value);
    }

    const assignLab = async () => {
        let data = await axios.post(`${SERVER_URL}/labs/add/faculty?lab_id=${_id}`, 
                                    { faculty_id:selectedFaculty },
                                    {
                                        headers: {
                                            authorization: `Bearer ${localStorage.getItem('vl-token')}`
                                        }
                                    });
        if(!data.data.error) {
            fetchLabs();
            message.success(data.data.message);
            setFacultyModal(false);
        }
    }

    const onStudentChange = (val) => {
        setNewStudents(val);
    }

    const addStudents = async () => {
        let data = await axios.post(`${SERVER_URL}/labs/add/students?lab_id=${_id}`, 
                                {students: newStudents},
                                {
                                    headers: {
                                        authorization: `Bearer ${localStorage.getItem('vl-token')}`
                                    }
                                });
        if(!data.data.error) {
            message.success(data.data.message);
            setStudentModal(false);
            fetchLabs();
        }
    }

    const removeStudent = async (val) => {
        let data = await axios.post(`${SERVER_URL}/labs/remove/students?lab_id=${_id}`,{
                        students: [val] },{
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('vl-token')}`
                            }
                        });

        if(!data.data.error) {
            message.success('Student has been removed');
            fetchLabs();
        }
    }
    
    return (
        <Card 
            title={batch + "_ " + subject} 
            hoverable 
            bordered={true}
            actions={[
              <Tooltip placement="topLeft" title="Students" arrowPointAtCenter>
                    <UsergroupAddOutlined onClick={() => setStudentModal(true)} />
              </Tooltip>,
              <Tooltip placement="topLeft" title="Faculty" arrowPointAtCenter>
                <UserOutlined onClick={() => setFacultyModal(true) } />
              </Tooltip>
            ]}
        > 
            <b>Branch: { branchData[branch] }</b>
            <br />
            <b>Students: {students.length}</b>
            <p><b>Faculty: { (faculty) ? faculty.name : 'Not Assigned' }</b></p>


            <Modal 
                title={batch + "_ " + subject + " Faculty" }
                visible={facultyModal} 
                onCancel={() => setFacultyModal(false)} footer={false}>

                    <p><b>{ faculty ? faculty.name + " has been assigned" :  "Not Assigned" }</b></p>
                    <p>{ faculty ? "Assign new one" :  "Assign One" }</p>

                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select a Faculty"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            departmentFaculty?.map((f, i) => (
                                <Option key={i + ""} value={f._id}>{f.name}</Option>
                            ))
                        }
                    </Select>
                    <Button block type="primary" style={{marginTop: '10px'}} onClick={ assignLab }>Assign</Button>
            </Modal>


            <Modal
                title={batch + "_" + subject + " Students"}
                visible={ studentModal }
                onCancel={() => setStudentModal(false)}
                footer={false}
                >
                <List
                    bordered
                    dataSource={students}
                    renderItem={(s: any) => (
                        <List.Item style={{display:'flex'}}>
                            <Typography.Text >{s.name } </Typography.Text> {s.roll_no}
                            <Popconfirm
                                style={{alignItems: 'flex-end'}}
                                title="Are you sure to remove this student?"
                                onConfirm={() => removeStudent(s._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button>Delete</Button>
                            </Popconfirm>
                        </List.Item>
                    )}
                />
                <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%', marginTop: '10px' }}
                        placeholder="Select Students"
                        optionFilterProp="children"
                        onChange={onStudentChange}
                    >
                        
                        {
                        
                            departmentStudents?.map((s, i) => {
                                if(students?.filter((ss) => ss._id == s._id).length == 0)
                                    return <Option key={i + ""} value={s._id}>{s.registration_id } - {s.name}</Option>
                                else <></>
                            })
                        }
                </Select>
                <Button block type="primary" style={{marginTop: '20px'}} onClick={ addStudents }>Add</Button>

            </Modal>
        </Card>
    )
}

export default Lab
