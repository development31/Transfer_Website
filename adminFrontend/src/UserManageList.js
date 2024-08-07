import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CCardText,
  CButton,
  CTable,
  CTableHead,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react';
import './UserManageList.css'; // Import CSS file for styling

const UserManageList = () => {
  const [userManageData, setUserManageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false); // State for modal visibility
  const [editing, setEditing] = useState(false); // State for edit mode
  const [editUserId, setEditUserId] = useState(null); // State to hold the ID of the user being edited

  // Function to fetch user manage data from the backend
  const fetchUserManageData = async () => {
    try {
      const response = await axios.get('https://www.panel.efe-travel.com/api/userManageData/');
      setUserManageData(response.data);
      console.log("HI")
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user manage data:', error);
      setLoading(false);
    }
  };

  // Fetch user manage data when the component mounts
  useEffect(() => {
    fetchUserManageData();
  }, []);

  const handleAddUserManage = async () => {
    if (editing) {
      try {
        const response = await axios.put(`https://www.panel.efe-travel.com/api/userManageData/${editUserId}`, { name, email, password });
        setUserManageData(userManageData.map(user => user._id === editUserId ? response.data : user));
        window.alert('User Manage successfully updated');
      } catch (error) {
        console.error('Error updating user manage:', error);
      }
    } else {
      try {
        const response = await axios.post('https://www.panel.efe-travel.com/api/userManageData/Username', { name, email, password });
        setUserManageData([...userManageData, response.data]);
        window.alert('User Manage successfully added');
      } catch (error) {
        console.error('Error adding user manage:', error);
      }
    }

    setName('');
    setEmail('');
    setPassword('');
    setVisible(false);
    setEditing(false);
    setEditUserId(null);
  };

  const handleDeleteUserManage = async (id) => {
    try {
      await axios.delete(`https://www.panel.efe-travel.com/api/userManageData/${id}`);
      setUserManageData(userManageData.filter(user => user._id !== id));
      window.alert('User Manage successfully deleted');
    } catch (error) {
      console.error('Error deleting user manage:', error);
    }
  };

  const handleEditUserManage = (user) => {
    setName(user.Name);
    setEmail(user.email);
    setPassword(user.password);
    setEditUserId(user._id);
    setEditing(true);
    setVisible(true);
  };

  
  

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <CCard className="d-flex 100%">
        <CCardHeader className="d-flex justify-content-between align-items-center">
        <h1 style={{ fontSize: '24px', color: 'tomato' }}>User Manage List</h1>
          <CButton
            color="primary"
            size="sm"
            className="me-md-2"
            onClick={() => {
              setVisible(!visible);
              setEditing(false);
              setEditUserId(null);
              setName('');
              setEmail('');
              setPassword('');
            }}
          >
            ADD USERS
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            {userManageData.length === 0 ? (
              <div className="no-data">No user manage data found.</div>
            ) : (
              <CRow>
                <CCol>
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                       
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {userManageData.map((user, index) => (
                        <CTableRow key={user._id}>
                          
                          <CTableDataCell>{user.Name}</CTableDataCell>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          <CTableDataCell>{user.password}</CTableDataCell>
                          <CTableDataCell>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: "#aaad10", cursor: "pointer", marginRight: "10px" }}
                              onClick={() => handleEditUserManage(user)}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#bb1616", cursor: "pointer" }}
                              onClick={() => handleDeleteUserManage(user._id)}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            )}
          </CCardText>
        </CCardBody>
      </CCard>

      {/* Add/Edit Users Modal */}
      <CModal
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="AddUsersModalTitle"
      >
        <CModalHeader closeButton>
          <CModalTitle id="AddUsersModalTitle">{editing ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol xs="6">
                <CFormInput
                  type="text"
                  id="name"
                  label="Name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
              <CCol xs="6">
                <CFormInput
                  type="email"
                  id="email"
                  label="Email Address"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <CFormInput
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddUserManage}>
            {editing ? 'Update User' : 'Add User'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default UserManageList;
