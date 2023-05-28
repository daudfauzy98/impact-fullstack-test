/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'

const MySwal = withReactContent(Swal)

const FormProduk = () => {
  const [state, setState] = useState({
    formProduk: {
      kodeProduk: '',
      namaProduk: '',
      deskripsiProduk: '',
      hargaProduk: '',
      uom: ''
    },
    isUpdating: false
  })
  let floatRight = {display: 'block', marginLeft: 'auto', marginRight: '0'}

  const handleFormChange = (event) => {
    let produkBaru = {...state.formProduk}
    produkBaru[event.target.name] = event.target.value

    setState({...state, formProduk: produkBaru})
  }

  const handleTambahProduk = () => {
    fetch('http://localhost:8000/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(state.formProduk)
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      MySwal.fire({
        title: 'Berhasil',
        text: 'Produk baru berhasil ditambahkan!',
        icon: 'success'
      })
    }).catch((err) => {
      MySwal.fire({
        title: 'Gagal',
        text: 'Terjadi error saat menambahkan produk baru',
        icon: 'error'
      })
      console.error(err)
    })
    
    setState({
      ...state, 
      formProduk: {
        kodeProduk: '',
        namaProduk: '',
        deskripsiProduk: '',
        hargaProduk: '',
        uom: ''
      }, 
      isUpdating: false
    })
  }

  const productData = useSelector((state) => state.productData)
  useEffect(() => {
    if (Object.keys(productData).length !== 0) {
      // console.log('product data is true')
      setState({...state, formProduk: productData, isUpdating: true})
    }
  }, [productData])

  const dispatch = useDispatch()
  const handleBatalkan = () => {
    dispatch({type: 'set', productData: {}})
    setState({
      ...state, 
      formProduk: {
        kodeProduk: '',
        namaProduk: '',
        deskripsiProduk: '',
        hargaProduk: '',
        uom: ''
      }, 
      isUpdating: false
    })
  }

  const handleUbahProduk = () => {
    let id = state.formProduk.kodeProduk
    fetch('http://localhost:8000/product/' + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(state.formProduk)
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      MySwal.fire({
        title: 'Berhasil',
        text: 'Produk berhasil diubah!',
        icon: 'success'
      })
    }).catch((err) => {
      MySwal.fire({
        title: 'Gagal',
        text: 'Terjadi error saat mengubah produk',
        icon: 'error'
      })
      console.error(err)
    })
    handleBatalkan()
  }
  
  return (
    <CCard>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol className='mb-3'>
              <CFormLabel>Nama Produk</CFormLabel>
              <CFormInput 
                type='text' 
                placeholder='masukkan nama produk' 
                name='namaProduk' 
                onChange={handleFormChange} 
                value={state.formProduk.namaProduk}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mb-3'>
              <CFormLabel>Deskripsi Produk</CFormLabel>
              <CFormInput 
                type='text' 
                placeholder='masukkan deskripsi produk' 
                name='deskripsiProduk' 
                onChange={handleFormChange} 
                value={state.formProduk.deskripsiProduk}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mb-3'>
              <CFormLabel>Harga Produk (Rp)</CFormLabel>
              <CFormInput 
                type='number' 
                placeholder='masukkan harga produk' 
                name='hargaProduk' 
                onChange={handleFormChange} 
                value={state.formProduk.hargaProduk}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mb-3'>
              <CFormLabel htmlFor='select_uom'>UOM (Unit of Measurement)</CFormLabel>
              <CFormSelect name='uom' onChange={handleFormChange} value={state.formProduk.uom}>
                <option style={{display: 'none'}}>pilih satuan produk</option>
                <option value='SHEET'>SHEET</option>
                <option value='ROLL'>ROLL</option>
                <option value='PCS'>PCS</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mb-3'>
              {(() => {
                if (state.isUpdating) {
                  return (<div style={{float: 'right'}}>
                    <CButton color='secondary' className='me-2' onClick={handleBatalkan}>Batalkan</CButton>
                    <CButton color='warning' onClick={handleUbahProduk}>Ubah Produk</CButton>
                  </div>)
                } else {
                  return (<CButton color='primary' style={floatRight} onClick={handleTambahProduk}>Tambah Produk</CButton>)
                }
              })()}
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default FormProduk