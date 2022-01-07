import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDropDown'
import { Button, Box, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Layout from '../../components/layout'
import Banner from '../../components/molecules/banner'
import useUserAccount from '../../lib/hooks/useUserAccount'

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
          if (items.length > 0) {
            const rows = items.length
              ? items.map((v, index) => {
                  return {
                    id: `${v?.PRODUCT_ID}_${index}`,
                    date: `${v?.ORDER_DATE}`,
                    shortName: v?.SHORT_NAME,
                    url: v?.URL,
                  }
                })
              : {}
            setRows(rows)
          }
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
          {rows ? (
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
          ) : (
            <p
              style={{
                textAlign: 'center',
                fontWeight: 'normal',
                fontSize: '17px',
              }}
            >
              You do not have any downloads. If you believe this to be
              incorrect, please{' '}
              <Link href='/contact'>
                <a style={{ textDecoration: 'underline' }}>contact us</a>
              </Link>{' '}
              for assistance.
            </p>
          )}
        </Box>
      </Container>
    </Layout>
  )
}
