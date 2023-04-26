import request from '../utils/request'

export function score (data) {
  return request({
    url: '/exam/score',
    method: 'post',
    data
  })
}

export function progress (data) {
  return request({
    url: '/exam/progress',
    method: 'post',
    data
  })
}

export function topic (data) {
  return request({
    url: '/exam/topic',
    method: 'post',
    data
  })
}

export function parse (data) {
  return request({
    url: '/exam/parse',
    method: 'post',
    data
  })
}

export function questionTree (data) {
  return request({
    url: '/exam/questionTree',
    method: 'post',
    data
  })
}

export function getCatalog (data) {
  return request({
    url: '/learn/getCatalog',
    method: 'post',
    data
  })
}

export function curriculum (data) {
  return request({
    url: '/exam/curriculum',
    method: 'post',
    data
  })
}

export function question (data) {
  return request({
    url: '/exam/question',
    method: 'post',
    data
  })
}




