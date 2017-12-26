// import { get } from '../util/http' // eslint-disable-line
const { post, get } = require('../util/http')

const ADD = 'ADD'
const LOGIN = 'LOGIN'
const CHAT_INFO = 'CHAT_INFO'


const initialState = {
  count: 1,
  userInfo: {},
  chartInfo: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      return { ...state, count: state.count + 1 }
    }
    case LOGIN: {
      return { ...state, userInfo: action.payload }
    }
    case CHAT_INFO: {
      return { ...state, chartInfo: action.payload }
    }
    default: {
      return state
    }
  }
}

function add() {
  return { type: ADD }
}

function register(userinfo) {
  return { type: LOGIN, payload: userinfo }
}

function chatInfo(info) {
  return { type: CHAT_INFO, payload: info }
}

/* eslint-disable */
function postRegister({ name, email, password }) {
  return (dispatch) => {
    post('/api/user/adduser', {
      name,
      email,
      password,
      userStatus: true,
    })
      .then((data) => {
        console.log('收到:', data.p2pdata)
        dispatch(register(data.p2pdata))
      })
  }
}

function getLogin(id) {
  return (dispatch) => {
    get('/api/user/getUserInfoById', {
      id,
    })
      .then((data) => {
        console.log('收到:', data.p2pdata)
        dispatch(register(data.p2pdata))
      })
  }
}

function getChatInfo() {
  return (dispatch) => {
    get('/api/chart/getChatInfoByGoodsId', {
      goods_id: 1,
    })
      .then((data) => {
        console.log('收到:', data.p2pdata)
        dispatch(chatInfo(data.p2pdata))
      })
  }
}

module.exports = {
  add,
  reducer,
  register,
  postRegister,
  getLogin,
  getChatInfo
}
