import request from '../utils/request'

export function add (data) {
  return request({
    url: '/dragTree/add',
    method: 'post',
    data
  })
}

export function get (data) {
  return request({
    url: '/dragTree/get',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: '/dragTree/list',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/dragTree/update',
    method: 'post',
    data
  })
}

export function del (data) {
  return request({
    url: '/dragTree/del',
    method: 'post',
    data
  })
}

export function form (data) {
  return request({
    url: '/dragTree/form',
    method: 'post',
    data
  })
}
