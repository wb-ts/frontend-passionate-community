import Layout from '@/components/layout'
import { Button, Box, Container } from '@material-ui/core'
import Head from 'next/head'
import Banner from '@/components/molecules/banner'
import { makeStyles } from '@material-ui/core/styles'
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { AppContext } from '@/context/state'
import Link from 'next/link'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    table: {
      minWidth: 700,
    },
  },
}))

const columns = [
  //{ field: 'id', headerName: 'Product ID', width: 150 },
  {
    field: 'shortName',
    headerName: 'Title',
    width: 600,
    editable: true,
  },
  {
    field: 'url',
    headerName: 'Downloads',
    width: 250,
    editable: true,
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
  const classes = useStyles()
  const [rows, setRows] = React.useState([])
  const { userMasterId } = useContext(AppContext)

  useEffect(() => {
    if (userMasterId !== undefined) {
      fetch(`/api/digital-assets?userId=${userMasterId}`)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          const items = data
          const rows = items.length
            ? items.map((v, index) => {
                return {
                  id: `${v?.PRODUCT_ID}_${index}`,
                  shortName: v?.SHORT_NAME,
                  url: v?.URL,
                }
              })
            : {}
          setRows(rows)
        })
    }

    /*if (tp) {
      if (!tp.user.isUserValid()) {
        tp.pianoId.show({
          showCloseButton: false,
          loggedIn: function () {
            // Once user logs in - refresh the page
            location.reload()
          },
        })
      }
    }*/
  }, [userMasterId])

  return (
    <Layout>
      <Head>
        <title>{`ASCD: My Downloads`}</title>
      </Head>
      <Banner header1='My Downloads' />
      <Container>
        <Box mt={13} mb={13}>
          {rows.length > 0 && (
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
