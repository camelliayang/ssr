import axios from 'axios'
// actionType

const GET_LIST = 'INDEX/USER_INFO'

// actinCreator
const changeUserInfo = data=>({
  type:GET_LIST,
  data
})

export const getUserInfo = server=>{
  return (dispatch, getState, axiosInstance)=>{
    return axios.get('http://localhost:9090/api/user/info')
      .then(res=>{
        const {data} = res.data
        console.log('User Info',data)
        dispatch(changeUserInfo(data))
      })
  }
}
const defaultState = {
  userinfo:{}
}

export default (state=defaultState, action)=>{
  switch(action.type){
    case GET_LIST:
      // console.log(12322,action)
      const newState={
        ...state,
        userinfo:action.data
      }
      return newState
    default:
      return state
  }
}
