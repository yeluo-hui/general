import request from '../utils/request'


export function getCatalogTree (data) {
  return request({
    url: '/learn/getCatalogTree',
    method: 'post',
    data
  })
}

export function catalogTeacher (data) {
  return request({
    url: '/learn/catalogTeacher',
    method: 'post',
    data
  })
}

export function catalogLocal (data) {
  return request({
    url: '/learn/catalogLocal',
    method: 'post',
    data
  })
}

