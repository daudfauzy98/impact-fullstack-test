/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  CCard, 
  CCardBody, 
  CTable, 
  CTableHead, 
  CTableRow, 
  CTableHeaderCell, 
  CTableBody,
} from '@coreui/react'
import Produk from 'src/components/Produk'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

const DaftarProduk = () => {
  const apiData = useSelector((state) => state.apiData)
  const dispatch = useDispatch()

  const getProducts = () => {
    fetch('http://localhost:8000/products').then(res => res.json()).then(({data}) => {
      dispatch({type: 'set', apiData: data})
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getProducts()
  }, [])
  
  /* useEffect(() => {
    console.log('sini', apiData);
  }, [apiData]); */

  let navigate = useNavigate()
  const handleUbahProduk = (data) => {
    dispatch({type: 'set', productData: data})
    navigate('/produk/form')
  }

  const handleHapusProduk = (id) => {
    MySwal.fire({
      title: 'Konfirmasi',
      text: 'Anda yakin ingin menghapus produk ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:8000/product/'+id, {
          method: 'DELETE'
        }).then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText)
          }
          MySwal.fire({
            title: 'Berhasil!',
            text: 'Produk telah dihapus',
            icon: 'success',
          })
          getProducts()
        }).catch((err) => {
          MySwal.fire({
            title: 'Gagal',
            text: 'Terjadi error saat menghapus produk',
            icon: 'error',
          })
          console.error(err)
        })
      }
    })
  }

  return (
    <CCard>
      <CCardBody>
        <CTable hover stripedColumns>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" className="text-center">Nomor</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Nama Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Deskripsi Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Harga Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Satuan</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
            <CTableBody>
              {
                apiData.map((product, idx) => {
                  return <Produk 
                    key={(idx+1)}
                    number={(idx+1)}
                    data={product}
                    onClickEdit={handleUbahProduk}
                    onClickDelete={handleHapusProduk}
                  />
                })
              }
            </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default DaftarProduk