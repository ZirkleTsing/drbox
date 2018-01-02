/* eslint-disable */
import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
// import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import purple from 'material-ui/colors/purple'
import { connect } from 'react-redux'
import logo from './logo.png'
import { postAddGoodInfo } from '../../store/redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    background: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    width: 400,
    marginRight: 20,
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }
});


class Search extends React.Component {
  state = {
    goodsUrl: '',
  }
  inputChange = (event) => {
    console.log(123, event.target.value)
    this.setState({
      goodsUrl: event.target.value,
    })
  }

  searchInfo = () => {
    this.props.postAddGoodInfo(this.state.goodsUrl, this.props.userInfo.id)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.logoWrapper}><img alt="" src={logo} /></div>
        <TextField
          defaultValue=""
          label=""
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel,
          }}
          onChange={this.inputChange}
        />
        <Button disabled={this.state.goodsUrl.length === 0} onClick={this.searchInfo} raised color="accent">添加商品url</Button>
      </div>
    )
  }
}

export default withStyles(styles)(
  connect(
    state => state,
    { postAddGoodInfo },
  )(Search))
