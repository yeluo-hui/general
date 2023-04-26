import request from '../utils/request'

export function learnSummaryList (data) {
  return request({
    url: '/learn/summaryList',
    method: 'post',
    data
  })
}

export function practiceSummaryList (data) {
  return request({
    url: '/practice/summaryList',
    method: 'post',
    data
  })
}

export function examSummaryList (data) {
  return request({
    url: '/exam/summaryList',
    method: 'post',
    data
  })
}


