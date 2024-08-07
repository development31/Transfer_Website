import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CFormLabel,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CCardText,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const VehicleManageList = () => {
  const [vehicleManageData, setVehicleManageData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sno, setSno] = useState('')
  const [vname, setVname] = useState('')
  const [vcolor, setVcolor] = useState('')
  const [vnumber, setVnumber] = useState('')
  const [vseats, setVseats] = useState('')
  const [vprice, setVprice] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [perKmCharge, setPerKmCharge] = useState('')
  const [suitcase, setSuitcase] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [currentVehicleId, setCurrentVehicleId] = useState(null)
  const [image, setImage] = useState(null)
  const [visible, setVisible] = useState(false)

  const base_url = 'https://www.panel.efe-travel.com/api/'
  const local_url = 'https://www.panel.efe-travel.com/api/'

  const fetchVehicleManageData = async () => {
    try {
      const response = await axios.get(local_url+'VehicleManageData')
      setVehicleManageData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching vehicle manage data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicleManageData()
  }, [])

  const handleAddVehicleManage = async () => {
    const formData = new FormData()
    formData.append('sno', sno)
    formData.append('vname', vname)
    formData.append('vcolor', vcolor)
    formData.append('vnumber', vnumber)
    formData.append('vseats', vseats)
    formData.append('vprice', vprice)
    formData.append('vperKmcharge', perKmCharge)
    formData.append('contact', contact)
    formData.append('email', email)
    formData.append('suitcase', suitcase)

    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await axios.post(
       local_url+ 'VehicleManageData',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      setVehicleManageData([...vehicleManageData, response.data])
      resetForm()
      setVisible(false)
      window.alert('Vehicle successfully added')
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }

  const handleEditVehicleManage = (vehicle) => {
    setSno(vehicle.sno)
    setVname(vehicle.vname)
    setVcolor(vehicle.vcolor)
    setVnumber(vehicle.vnumber)
    setVseats(vehicle.vseats)
    setVprice(vehicle.vprice)
    setContact(vehicle.contact)
    setEmail(vehicle.email)
    setSuitcase(vehicle.suitcase)
    setPerKmCharge(vehicle?.vperKmcharge ?? '')
    setEditMode(true)
    setCurrentVehicleId(vehicle._id)
    setVisible(true)
  }

  const handleUpdateVehicleManage = async () => {
    const formData = new FormData()
    formData.append('sno', sno)
    formData.append('vname', vname)
    formData.append('vcolor', vcolor)
    formData.append('vnumber', vnumber)
    formData.append('vseats', vseats)
    formData.append('vprice', vprice)
    formData.append('contact', contact)
    formData.append('email', email)
    formData.append('suitcase', suitcase)
    formData.append('vperKmcharge', perKmCharge)
  
    if (image) {
      formData.append('image', image)
    }
  
    try {
      const response = await axios.put(
        `${local_url}VehicleManageData/${currentVehicleId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      const updatedVehicle = response.data
  
      setVehicleManageData(vehicleManageData.map((vehicle) => 
        vehicle._id === currentVehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
      ))
  
      resetForm()
      setEditMode(false)
      setCurrentVehicleId(null)
      setVisible(false)
      window.alert('Vehicle successfully updated')
    } catch (error) {
      console.error('Error updating vehicle manage:', error)
    }
  }
  

  const handleDeleteVehicleManage = async (id) => {
    try {
      await axios.delete(`${local_url}VehicleManageData/${id}`)
      setVehicleManageData(vehicleManageData.filter((vehicle) => vehicle._id !== id))
      window.alert('Vehicle successfully deleted')
    } catch (error) {
      console.error('Error deleting vehicle manage:', error)
    }
  }

  const resetForm = () => {
    setSno('')
    setVname('')
    setVcolor('')
    setVnumber('')
    setVseats('')
    setVprice('')
    setContact('')
    setEmail('')
    setSuitcase('')
    setPerKmCharge('')  
    setImage(null)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <CCard className="d-flex 100%">
        <CCardHeader className="d-flex justify-content-between align-items-center">
        <h1 style={{ fontSize: '24px', color: 'purple' }}>Vehicle Manage List</h1>
          <CButton
            color="primary"
            size="sm"
            className="me-md-2"
            onClick={() => {
              resetForm()
              setEditMode(false)
              setVisible(true)
            }}
          >
            {editMode ? 'Edit Vehicle' : 'Add Vehicle'}
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            {vehicleManageData.length === 0 ? (
              <div className="no-data">No vehicle manage data found.</div>
            ) : (
              <CRow>
                <CCol>
                  <CTable striped hover bordered responsive>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">S No.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vehicle type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vehicle Color</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Flight Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vehicle Seats</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vehicle Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Per Km price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Suitcase</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {vehicleManageData.map((vehicle, index) => (
                        <CTableRow key={vehicle._id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{vehicle.vname}</CTableDataCell>
                          <CTableDataCell>{vehicle.vcolor}</CTableDataCell>
                          <CTableDataCell>{vehicle.vnumber}</CTableDataCell>
                          <CTableDataCell>{vehicle.vseats}</CTableDataCell>
                          <CTableDataCell>{vehicle.vprice}</CTableDataCell>
                          <CTableDataCell>{vehicle.vperKmcharge}</CTableDataCell>
                          <CTableDataCell>{vehicle.contact}</CTableDataCell>
                          <CTableDataCell>{vehicle.email}</CTableDataCell>
                          <CTableDataCell>{vehicle.suitcase}</CTableDataCell>
                          <CTableDataCell>
                            {vehicle.image && (
                              <img
                                src={`https://www.panel.efe-travel.com/api/uploads/${vehicle.image}`}
                                alt={vehicle.vname}
                                style={{ width: '100px' }}
                              />
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: '#b3ae0f', cursor: 'pointer', marginRight: '10px' }}
                              onClick={() => handleEditVehicleManage(vehicle)}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: '#bb1616', cursor: 'pointer' }}
                              onClick={() => handleDeleteVehicleManage(vehicle._id)}
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
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="sno">S No.</CFormLabel>
      <CFormInput
        type="text"
        id="sno"
        value={sno}
        onChange={(e) => setSno(e.target.value)}
        placeholder="S No."
        disabled={editMode}
      />
    </CCol>
    <CCol>
      <CFormLabel htmlFor="vname">Vehicle Type</CFormLabel>
      <CFormInput
        type="text"
        id="vname"
        value={vname}
        onChange={(e) => setVname(e.target.value)}
        placeholder="Vehicle Type"
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="vcolor">Vehicle Color</CFormLabel>
      <CFormInput
        type="text"
        id="vcolor"
        value={vcolor}
        onChange={(e) => setVcolor(e.target.value)}
        placeholder="Vehicle Color"
      />
    </CCol>
    <CCol>
      <CFormLabel htmlFor="vnumber">Flight Number</CFormLabel>
      <CFormInput
        type="text"
        id="vnumber"
        value={vnumber}
        onChange={(e) => setVnumber(e.target.value)}
        placeholder="Flight Number"
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="vseats">Vehicle Seats</CFormLabel>
      <CFormInput
        type="text"
        id="vseats"
        value={vseats}
        onChange={(e) => setVseats(e.target.value)}
        placeholder="Vehicle Seats"
      />
    </CCol>
    <CCol>
      <CFormLabel htmlFor="vprice">Vehicle Price</CFormLabel>
      <CFormInput
        type="text"
        id="vprice"
        value={vprice}
        onChange={(e) => setVprice(e.target.value)}
        placeholder="Vehicle Price"
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="contact">Contact</CFormLabel>
      <CFormInput
        type="text"
        id="contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact"
      />
    </CCol>
    <CCol>
      <CFormLabel htmlFor="email">Email</CFormLabel>
      <CFormInput
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="suitcase">Per KM. Price</CFormLabel>
      <CFormInput
        type="text"
        id="perkmprice"
        value={perKmCharge}
        onChange={(e) => setPerKmCharge(e.target.value)}
        placeholder="Per KM. Price"
      />
    </CCol>
    <CCol>
      <CFormLabel htmlFor="suitcase">Suitcase</CFormLabel>
      <CFormInput
        type="text"
        id="suitcase"
        value={suitcase}
        onChange={(e) => setSuitcase(e.target.value)}
        placeholder="Suitcase"
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      <CFormLabel htmlFor="image">Image</CFormLabel>
      <CFormInput
        type="file"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
    </CCol>
  </CRow>
  <CRow className="mb-3">
    <CCol>
      
        <div className="text-info">Image size should not exceed 5 MB.</div>
      
    </CCol>
  </CRow>
</CForm>

        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              resetForm()
              setVisible(false)
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={editMode ? handleUpdateVehicleManage : handleAddVehicleManage}
          >
            {editMode ? 'Update Vehicle' : 'Add Vehicle'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default VehicleManageList
