import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TransacManageList = () => {
  const [transacManageData, setTransacManageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacManageData = async () => {
      try {
        const response = await axios.get('https://www.panel.efe-travel.com/api/TransacManageData');
        const formattedData = response.data.transactions.map(transac => ({
          ...transac,
          createdAt: new Date(transac.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
       
        }));
        setTransacManageData(formattedData);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching transac manage data:', error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacManageData();
  }, []);

  const handleDeleteTransacManage = async (id) => {
    try {
      await axios.delete(`https://www.panel.efe-travel.com/api/TransacManageData/${id}`);
      setTransacManageData(transacManageData.filter((transac) => transac._id !== id));
    } catch (error) {
      console.error('Error deleting transac manage:', error);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between align-items-center">
          <h1 style={{ fontSize: '24px', color: 'green' }}>Transaction Management</h1>
        </div>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <div>Loading...</div>
        ) : transacManageData.length === 0 ? (
          <div>No transactions found.</div>
        ) : (
          <CTable striped hover bordered responsive>
            <CTableHead color="dark">
              <CTableRow>
              <CTableHeaderCell scope="col">Transaction ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {transacManageData.map((transac) => (
                <CTableRow key={transac._id}>
                  <CTableDataCell>{transac.transactionId}</CTableDataCell>
                  <CTableDataCell>{transac.email}</CTableDataCell>
                  <CTableDataCell>{transac.amount}</CTableDataCell>
                  <CTableDataCell>{transac.createdAt}</CTableDataCell>
                  <CTableDataCell>{transac.status}</CTableDataCell>
                 
                  
                  <CTableDataCell>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: '#bb1616', cursor: 'pointer' }}
                      onClick={() => handleDeleteTransacManage(transac._id)}
                    />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default TransacManageList;
