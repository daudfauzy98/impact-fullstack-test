/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CTableRow, CTableHeaderCell, CTableDataCell, CButton } from '@coreui/react'
import CurrencyFormat from 'react-currency-format'

const Produk = ({number, data, onClickEdit, onClickDelete}) => {
  return (
    <CTableRow>
      <CTableHeaderCell scope="row" style={{textAlign: 'center'}}>{number}</CTableHeaderCell>
      <CTableDataCell>{data.namaProduk}</CTableDataCell>
      <CTableDataCell>{data.deskripsiProduk}</CTableDataCell>
      <CTableDataCell>
        Rp. <CurrencyFormat 
          value={data.hargaProduk} 
          displayType='text' 
          thousandSeparator={'.'} 
          decimalSeparator=',' 
        />
      </CTableDataCell>
      <CTableDataCell>{data.uom}</CTableDataCell>
      <CTableDataCell>
        <div className="d-flex justify-content-center">
          <CButton color="warning" id="btnUbah_id" className="me-2" onClick={() => onClickEdit(data)}>Ubah</CButton>
          <CButton color="danger" id="btnHapus_id" onClick={() => onClickDelete(data.kodeProduk)}>Hapus</CButton>
        </div>
      </CTableDataCell>
    </CTableRow>
  )
}

Produk.propTypes = {
  number: PropTypes.number,
  data: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
}

export default Produk
