import request from '../utils/request'


export function asyncTree (data) {
  return request({
    url: '/learn/asyncTree',
    method: 'post',
    data
  })
}
