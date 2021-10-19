import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, Container } from '@material-ui/core'
import Head from 'next/head'
import Banner from '../../components/molecules/banner'
import { DataGrid } from '@material-ui/data-grid'
import useUserAccount from '../../lib/hooks/useUserAccount'
import Link from 'next/link'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDropDown'

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    renderCell: (params) => {
      let d = params.value
      let date = new Date(d)
      var day = ('0' + date.getDate()).slice(-2)
      var month = ('0' + (date.getMonth() + 1)).slice(-2)
      var year = date.getFullYear()
      return month + '-' + day + '-' + year
    },
  },
  {
    field: 'shortName',
    headerName: 'Title',
    width: 600,
    editable: true,
  },
  {
    field: 'url',
    headerName: 'Downloads',
    width: 200,
    renderCell: (params) => (
      <h4 style={{ fontWeight: '600' }}>
        <Link
          href={`${params.value}`}
          style={{
            color: '#0000ff',
          }}
        >
          <a style={{ marginLeft: '7px' }}>
            Download {<ArrowDownwardIcon style={{ verticalAlign: 'middle' }} />}
          </a>
        </Link>
      </h4>
    ),
  },
]

export default function UserDashboard() {
  const [rows, setRows] = useState()
  const { userAccountUser } = useUserAccount()

  useEffect(() => {
    if (userAccountUser?.masterCustomerId) {
      fetch(`/api/digital-assets?userId=${userAccountUser.masterCustomerId}`)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          const items = data
          const rows = items.length
            ? items.map((v) => {
                return {
                  id: v?.PRODUCT_ID,
                  shortName: v?.SHORT_NAME,
                  url: v?.URL,
                }
              })
            : {}
          setRows(rows)
        })
    } else {
      setRows()
    }
  }, [userAccountUser?.masterCustomerId])

  return (
    <Layout>
      <Head>
        <title>{`ASCD: My Downloads`}</title>
      </Head>
      <Banner header1='My Downloads' />
      <Container>
        <Box mt={13} mb={13}>
          {rows && (
            <div style={{ height: '30vw', width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                color='primary'
              />
            </div>
          )}
        </Box>
      </Container>
    </Layout>
  )
}
