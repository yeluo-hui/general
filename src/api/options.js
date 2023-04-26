import request from '../utils/request'


export function selectOptions (data) {
  return request({
    url: '/options/select',
    method: 'post',
    data
  })
}


export function demonstrationOptions (data) {
  return request({
    url: '/options/demonstration',
    method: 'post',
    data
  })
}

