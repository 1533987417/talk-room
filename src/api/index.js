import wepy from 'wepy'
import storage from '../utils/storage'

// const baseUrl = 'https://leshijie.online:6379/'
//const baseUrl = 'https://booking.ffan.com/api'
// const baseUrl = 'http://localhost:8081/'
// const baseUrl = 'http://121.40.140.66:6379/'
const baseUrl = 'https://leshijie.online:6379/'

const wxRequest = async (url, params = {}, notice = '加载中...') => {
  if (wepy.hideToast) {
    wepy.hideToast()
  }

  if (notice !== '') {
    wepy.showToast({
      title: notice,
      icon: 'loading',
      mask: true,
      duration: 20000
    })
  }

  const token = await storage.get('token')

  console.log(url, params.data)
  let res = await wepy.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    }
  })

  if (wepy.hideToast) {
    wepy.hideToast()
  }

  if (res.statusCode !== 200) {
    // error
    // return res.data
  } else if (res.data.code === '401') {
    await storage.set('userInfo', null)
    await storage.set('token', '')
  }

  return res.data
}

const login = params => wxRequest(baseUrl + '/user/login', {
  data: params,
  method: 'POST'
})

const bind = params => wxRequest(baseUrl + '/user/bind', {
  data: params,
  method: 'POST'
}, '绑定中...')

const meetingRoom = params => wxRequest(baseUrl + '//getRooms', {
  data: params,
  method: 'GET'
})

const bookingList = params => wxRequest(baseUrl + '/bookings', {
  data: params,
  method: 'GET'
})
const meetingList = params => wxRequest(baseUrl + '/getMeeting', {
  data: params,
  method: 'POST'
})
const setUser = params => wxRequest(baseUrl + '/setUsers', {
  data: params,
  method: 'POST'
})
const cancelBook = params => wxRequest(baseUrl + '/bookings/' + params.id, {
  method: 'DELETE'
})
const getBook = params => wxRequest(baseUrl + '/bookings/' + params.id, {
  method: 'GET'
})
const addBook = params => wxRequest(baseUrl + '/saveMeeting', {
  data: params,
  method: 'POST'
})
const cancelMeeting = params => wxRequest(baseUrl + '/cancelMeeting', {
  data: params,
  method: 'POST'
})

const getLocations = () => wxRequest(baseUrl + '/locations', {
  method: 'GET'
}, '楼号加载中...')

const booking = params => wxRequest(baseUrl + '/bookings', {
  data: params,
  method: 'POST'
})

const feedback = params => wxRequest(baseUrl + '/feedback', {
  data: params,
  method: 'POST'
})
const getMeetingContent = params => wxRequest(baseUrl + '/getMeetingContent', {
  data: params,
  method: 'GET'
})
const getUsers = params => wxRequest(baseUrl + '/getUsers', {
  data: params,
  method: 'POST'
})

const getSchedules = () => wxRequest(baseUrl + '/schedules', {
  method: 'GET'
})

const getUserInfo = (params) => wxRequest(baseUrl + '/users/' + params.id, {
  method: 'GET'
})

const getSuperUsers = (params) => wxRequest(baseUrl + '/superusers', {
  method: 'GET'
}, '')


export default {
  feedback,
  addBook,
  cancelBook,
  getBook,
  bookingList,
  login,
  bind,
  meetingRoom,
  getLocations,
  booking,
  getSchedules,
  getUserInfo,
  getSuperUsers,
  meetingList,
  cancelMeeting,
  setUser,
  getUsers,
  getMeetingContent
}
