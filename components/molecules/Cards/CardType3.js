import React from 'react'
import {
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/core/styles'
import TextStyle from '@/components/atoms/TextStyle'
import PropTypes from 'prop-types'
import CustomLink from '@/components/atoms/CustomLink'
import CtaButton from '@/components/atoms/CtaButton'

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '310px',
  },
  helperText: {
    color: theme.palette.primary.main,
  },
  labelText: {
    color: theme.palette.primary.main,
  },
  mainBox: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
  },
  secondBox: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 1,
      marginRight: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
  buttons: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
}))

export default function CardItem({ cardData }) {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    text1Value: '',
    text2Value: '',
    text3Value: '',
    showText1Value: false,
    showText2Value: false,
    showText3Value: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }

  const handleClickShowText1 = () => {
    setValues({ ...values, showText1Value: !values.showText1Value })
  }

  const handleMouseDownText1 = (event) => {
    event.preventDefault()
  }

  const handleClickShowText2 = () => {
    setValues({ ...values, showText2Value: !values.showText2Value })
  }

  const handleMouseDownText2 = (event) => {
    event.preventDefault()
  }
  const handleClickShowText3 = () => {
    setValues({ ...values, showText3Value: !values.showText3Value })
  }

  const handleMouseDownText3 = (event) => {
    event.preventDefault()
  }

  return (
    <Card style={{ borderRadius: '0px 0px 0px 32px' }}>
      <Box display='flex' flexDirection='row' className={classes.mainBox}>
        <Box
          p={5}
          display='flex'
          flexDirection='column'
          bgcolor={cardData.bgColor}
          width='34%'
          className={classes.title}
        >
          <TextStyle variant='h3' color='white'>
            {cardData.itemTitle}
          </TextStyle>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          ml={2}
          mr={3}
          mt={5}
          pb={3}
          width='66%'
          className={classes.secondBox}
        >
          {cardData.showInput1 && (
            <Box pb={2}>
              <TextField
                label={cardData.input1Title}
                type={values.showText1Value ? 'text' : 'password'}
                value={values.text1Value}
                className={classes.textField}
                onChange={handleChange('text1Value')}
                helperText={cardData.input1HelpText}
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                InputLabelProps={{
                  className: classes.labelText,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle text visibility'
                        onClick={handleClickShowText1}
                        onMouseDown={handleMouseDownText1}
                        edge='center'
                      >
                        {values.showText1Value ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
          {cardData.showInput2 && (
            <Box pb={2}>
              <TextField
                error={values.text2Value !== values.text1Value}
                label={cardData.input2Title}
                type={values.showText2Value ? 'text' : 'password'}
                value={values.text2Value}
                className={classes.textField}
                onChange={handleChange('text2Value')}
                helperText={
                  values.text2Value !== values.text1Value
                    ? cardData.errorMessage
                    : cardData.input2HelpText
                }
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                InputLabelProps={{
                  className: classes.labelText,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle text visibility'
                        onClick={handleClickShowText2}
                        onMouseDown={handleMouseDownText2}
                        edge='center'
                      >
                        {values.showText2Value ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
          {cardData.showInput3 && (
            <Box pb={2}>
              <TextField
                label={cardData.input3Title}
                type={values.showText3Value ? 'text' : 'password'}
                value={values.text3Value}
                className={classes.textField}
                onChange={handleChange('text3Value')}
                helperText={cardData.input3HelpText}
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                InputLabelProps={{
                  className: classes.labelText,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle text visibility'
                        onClick={handleClickShowText3}
                        onMouseDown={handleMouseDownText3}
                        edge='center'
                      >
                        {values.showText3Value ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
          {cardData.showButton1 && (
            <Box
              pb={2}
              width='45%'
              alignSelf='flex-end'
              className={classes.buttons}
            >
              <CtaButton
                variant='outlined'
                color='primary'
                fullWidth={true}
                size='medium'
                label={cardData.button1Text}
                onClick={() => {
                  console.log('clicked')
                }}
              />
            </Box>
          )}
          {cardData.showButton2 && (
            <Box
              pb={2}
              width='45%'
              alignSelf='flex-end'
              className={classes.buttons}
            >
              <CtaButton
                disabled={
                  !values.text1Value ||
                  !values.text2Value ||
                  (cardData.showInput3 && !values.text3Value) ||
                  values.text2Value !== values.text1Value
                }
                variant='contained'
                color='primary'
                fullWidth={true}
                size='medium'
                label={cardData.button2Text}
                onClick={() => {
                  console.log('clicked')
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  )
}

//please just add props as needed to make this card re usable.
CardItem.propTypes = {
  cardData: PropTypes.shape({
    bgColor: PropTypes.string,
    itemTitle: PropTypes.string,
    input1Title: PropTypes.string,
    input1HelpText: PropTypes.string,
    showInput1: PropTypes.bool,
    input2Title: PropTypes.string,
    input2HelpText: PropTypes.string,
    showInput2: PropTypes.bool,
    input3Title: PropTypes.string,
    input3HelpText: PropTypes.string,
    showInput3: PropTypes.bool,
    button1Text: PropTypes.string,
    button1Url: PropTypes.string,
    showButton1: PropTypes.bool,
    button2Text: PropTypes.string,
    button2Url: PropTypes.string,
    showButton2: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
}
