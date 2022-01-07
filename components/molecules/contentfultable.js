import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {},
  headerRow: {
    backgroundColor: theme.palette.background.main,
  },
}))

export default function ContentfulTable({ item }) {
  const classes = useStyles()
  switch (item.sys.contentType.sys.id) {
    case 'componentTableExtension':
      return (
        <TableContainer>
          <Box display='flex' justifyContent='center'>
            <TextStyle>{item.fields.title}</TextStyle>
          </Box>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow className={classes.headerRow}>
                {item.fields.data.tableData[0].map((column, key) => (
                  <TableCell key={key}>
                    <TextStyle>{column}</TextStyle>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {item.fields.data.tableData.map(
                (row, Key) =>
                  Key !== 0 && (
                    <TableRow key={Key}>
                      {row.map((col, colKey) => (
                        <TableCell key={colKey} align='left'>
                          {col}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )
    default:
      return (
        <TableContainer>
          <Box display='flex' justifyContent='center'>
            <TextStyle>{item.fields.title}</TextStyle>
          </Box>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                {item.fields.tableRowContent[0].fields.tableColumnContent.map(
                  (column, key) => (
                    <TableCell key={key}>
                      <TextStyle>{column.fields.title}</TextStyle>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {item.fields.tableRowContent.map((row) => (
                <TableRow key={row.fields.title}>
                  {row.fields.tableColumnContent.map((col, key) => (
                    <TableCell key={key} align='left'>
                      {documentToReactComponents(col.fields.columnContent)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
  }
}
