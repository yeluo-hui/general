import request from '../utils/request'

export function formFormType (data) {
  return request({
    url: '/formType/form',
    method: 'post',
    data
  })
}

export function getFormType (data) {
  return request({
    url: '/formType/get',
    method: 'post',
    data
  })
}

export function updateFormType (data) {
  return request({
    url: '/formType/update',
    method: 'post',
    data
  })
}

export function addFormType (data) {
  return request({
    url: '/formType/add',
    method: 'post',
    data
  })
}

export function delFormType (data) {
  return request({
    url: '/formType/del',
    method: 'post',
    data
  })
}

export function listFormType (data) {
  return request({
    url: '/formType/list',
    method: 'post',
    data
  })
}


