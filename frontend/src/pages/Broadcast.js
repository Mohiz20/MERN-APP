import React from 'react'
import {useEffect, useState} from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';

export default function Broadcast() {
    const [data, setData] = useState([])
    useEffect(() => {
        setData([]);
        axios.post(`http://localhost:3000/api/lead/leadByBroadCast/`).then(res => {
          setData(res.data)
          console.log('response:', res.data)
        }).catch(e => {
          console.log('error', e)
        })
    }, []);

    return (
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Lead Name', field: 'Lead_name' },
            { title: 'Lead Company', field: 'Lead_company' },
            { title: 'Lead Status', field: 'Lead_conversion_status'},
            { title: 'Lead Broadcast Status', field: 'Lead_broadcast_status' }
          ]}
          data={data}
          title="BROADCASTED List"
        />
      </div>
    )
}
