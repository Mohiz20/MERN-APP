import React from 'react';
import MaterialTable from 'material-table'
import { DataGrid } from '@material-ui/data-grid';
import {useEffect, useState} from 'react'
import axios from 'axios';

const columns = [
  {field: '_id', headerName: 'ID'},
  {field: 'Lead_name', headerName: 'Lead Name'},
  {field: 'Lead_company', headerName: 'Lead Company', width: 300},
  {field: 'Lead_conversion_status', headerName: 'Lead Status', width: 300},
  {field: 'Lead_broadcast_status', headerName: 'Lead Broadcast Status', width: 300}
]

export default function DataTable() {
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const name = localStorage.getItem('user')
    console.log(name)
      axios.post(`http://localhost:3000/api/lead/leadByUser/`, {
          lead_created_by: name
      }).then(res => {
        setData(res.data)
        setTableData(res.data)
        console.log('response:', res.data)
      }).catch(e => {
        console.log('error', e)
      })
  }, []);
  
  return (
    // <div style={{height: 700, width: '100%'}}>
    //   <DataGrid 
    //     rows={tableData}
    //     columns={columns}
    //     pageSize={12}
    //     checkboxSelection
    //   />
    // </div>
    <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Lead Name', field: 'Lead_name' },
            { title: 'Lead Company', field: 'Lead_company' },
            { title: 'Lead Status', field: 'Lead_conversion_status'},
            { title: 'Lead Broadcast Status', field: 'Lead_broadcast_status' }
          ]}
          data={data}
          title="Lead Details"
        />
      </div>
  );
}