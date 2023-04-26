import request from '../utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function add (data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function get (data) {
  return request({
    url: '/user/get',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function del (data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}

export function form (data) {
  return request({
    url: '/user/form',
    method: 'post',
    data
  })
}
