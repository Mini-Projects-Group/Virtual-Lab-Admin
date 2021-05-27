import { Button, Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { SERVER_URL } from '../../constants';
import Lab from './Lab';

function LabDashboard() {
    const [labs, setLabs] = useState([]);
    const history = useHistory();

    const fetchLabs = async () => {
        let data = await axios.get(`${SERVER_URL}/labs/getAll`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('vl-token')}`
            }
        });
        setLabs(data?.data?.results);
    }
    useEffect(() => {
        fetchLabs();
    }, []);

    return (
        <div style={{margin: '10px'}}>
            <br />
            <Button type="primary" onClick={() => history.push('/auth')} style={{margin: '5px'}}>Go Back</Button>
            <Row>
                {
                    labs?.map((l, idx) => (
                        <Col style={{padding: '10px'}} span={6}>
                            <Lab key={idx} {...l} fetchLabs={fetchLabs} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default LabDashboard
