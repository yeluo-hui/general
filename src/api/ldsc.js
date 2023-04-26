import request from '../utils/request'
const url = ''
export function login (data) {
    return request({
        url: url+'/sso/api/v1.0/login',
        method: 'post',
        data
    })
}

//基础数据测量历史
export function ellD1 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD1/list1',
        method: 'get',
        params: data
    })
}

//基础数据查询
export function listByAnchorSegmentId (data) {
    return request({
        url: url + '/sdsy/jcw/ell/listByAnchorSegmentId',
        method: 'get',
        params: data
    })
}

//岔线中心测量数据
export function ellD2 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD2/list1',
        method: 'get',
        params: data
    })
}
//限界测量数据
export function ellD3 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD3/list1',
        method: 'get',
        params: data
    })
}

//非支测量数据
export function ellD5 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD5/list1',
        method: 'get',
        params: data
    })
}
//定位器测量数据
export function ellD6 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD6/list1',
        method: 'get',
        params: data
    })
}
//承力索高差测量
export function ellD7 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD7/list1',
        method: 'get',
        params: data
    })
}
//500m处高差测量
export function ellD8 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD8/list1',
        method: 'get',
        params: data
    })
}
//自由测数据
export function ellD9 (data) {
    return request({
        url: url + '/sdsy/jcw/ellD9/list1',
        method: 'get',
        params: data
    })
}
//垂直度数据
export function ellDc (data) {
    return request({
        url: url + '/sdsy/jcw/ellDc/list1',
        method: 'get',
        params: data
    })
}
//跨距测量数据
export function ellDe (data) {
    return request({
        url: url + '/sdsy/jcw/ellDe/list1',
        method: 'get',
        params: data
    })
}
//一级目录树
export function getTreeList (data) {
    return request({
        url: url + '/sdsy/sdsytree/getTreeList',
        method: 'post',
        params: data
    })
}


