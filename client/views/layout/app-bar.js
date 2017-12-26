import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { postRegister, getLogin } from '../../store/redux'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  buttonMargin: {
    marginRight: 10,
  },
}

class MainAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    postRegister: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    getLogin: PropTypes.func.isRequired,
  }

  // constructor(props) {
  //   super(props)
  //   // this.closeModal = this.closeModal.bind(this)
  // }

  state = {
    open: false,
    name: '',
    email: '',
    pwd: '',
    openRegister: false,
    id: '',
  }

  /* eslint-disable */
  onHomeIconClick = () => {
  }

  registerButtonClick = () => {
    this.setState({
      openRegister: true,
    })
  }

  loginButtonClick = () => {
    this.setState({
      open: true,
    })
  }

  closeModal = () => {
    this.setState({
      open: false
    })
  }

  closeRegisterModal = () => {
    this.setState({
      openRegister: false
    })
  }

  signin = () => {
    console.log('注册')
    this.props.postRegister({
      name: this.state.name,
      email: this.state.email,
      password: this.state.pwd,
    })
    this.setState({
      openRegister: false
    })
  }

  login = () => {
    console.log('登录')
    this.props.getLogin(this.state.id)
    this.setState({
      open: false,
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
    console.log(event.target.value)
  }

  /* eslint-enable */
  render() {
    const { classes } = this.props
    return (
      <section className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton color="contrast" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              心愿盒
            </Typography>
            <Button raised color="accent" onClick={this.registerButtonClick} className={classes.buttonMargin}>
              注册
            </Button>
            {
              this.props.userInfo.name ?
                <div>你好, {this.props.userInfo.name}</div>
                :
                (
                  <Button raised color="accent" onClick={this.loginButtonClick}>
                    登录
                  </Button>
                )
            }
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          onClose={this.closeModal}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">登录</DialogTitle>
          <DialogContent>
            <DialogContentText>
              user token
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="userid"
              label="输入用户id"
              type="text"
              fullWidth
              value={this.state.id}
              onChange={this.handleChange('id')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              取消
            </Button>
            <Button onClick={this.login} color="primary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openRegister}
          onClose={this.closeRegisterModal}
          aria-labelledby="form-dialog-title"
          fullWidth
          ignoreBackdropClick
        >
          <DialogTitle id="form-dialog-title">用户注册</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="username"
              label="输入用户名"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <TextField
              margin="normal"
              id="email"
              label="输入邮箱"
              type="email"
              fullWidth
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            <TextField
              margin="normal"
              id="pwd"
              label="输入密码"
              type="password"
              fullWidth
              value={this.state.pwd}
              onChange={this.handleChange('pwd')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRegisterModal} color="primary">
              取消
            </Button>
            <Button onClick={this.signin} color="primary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    )
  }
}

export default connect(
  state => state,
  { postRegister, getLogin },
)(withStyles(styles)(MainAppBar))
