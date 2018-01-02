// import { get } from '../util/http' // eslint-disable-line
const { post, get } = require('../util/http')

const ADD = 'ADD'
const LOGIN = 'LOGIN'
const CHAT_INFO = 'CHAT_INFO'
const ADD_GOODS_INFO = 'ADD_GOODS_INFO'
const FAVORITE = 'FAVORITE'

const initialState = {
  count: 1,
  userInfo: {},
  chartInfo: [],
  goodsInfo: [],
  favorite: [],
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
    case ADD_GOODS_INFO: {
      return { ...state, goodsInfo: action.payload }
    }
    case FAVORITE: {
      return { ...state, favorite: action.payload }
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

function goodInfo(info) {
  return { type: ADD_GOODS_INFO, payload: info }
}

function favorite(info) {
  return { type: FAVORITE, payload: info }
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

function getGoodsInfo(userId) {
  return (dispatch) => {
    get('/api/goods/getGoodsInfoByUserId', {
      userId
    })
      .then((data) => {
        console.log('收到:', data.p2pdata)
        dispatch(favorite(data.p2pdata))
      })
  }
}

function postAddGoodInfo(goodsUrl, userId) {
  console.log('参数:', goodsUrl, userId)
  return (dispatch) => {
    post('/api/goods/addGoodsInfo',{
      userId,
      goodsUrl,
      goodsStatus: true,
    })
      .then((data) => {
        console.log('收到:', data.p2pdata)
        dispatch(goodInfo(data.p2pdata))
      })
  }
}

module.exports = {
  add,
  reducer,
  register,
  postRegister,
  getLogin,
  getChatInfo,
  postAddGoodInfo,
  getGoodsInfo
}
