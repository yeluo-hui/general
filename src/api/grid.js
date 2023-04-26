import request from '../utils/request'

export function list (data) {
  return request({
    url: '/course/list',
    method: 'post',
    data
  })
}
