import moment from 'moment'

// moment将秒转换为时分秒，使用return返回结果，就可以直接在插值表达式中使用这个方法
export function convertSecToHHmm(min) {
  const currentTime = moment.duration(min, 'minutes')
  // 将获取到的下轮间隔秒数转换成时分秒
  return moment({
    h: currentTime.hours(),
    m: currentTime.minutes()
  }).format('HH:mm')
}

// moment将秒转换为时分秒，使用return返回结果，就可以直接在插值表达式中使用这个方法
export function convertSecToHHmmss(sec) {
  const currentTime = moment.duration(sec, 'seconds')
  // 将获取到的下轮间隔秒数转换成时分秒
  return moment({
    h: currentTime.hours(),
    m: currentTime.minutes()
  }).format('HH:mm:ss')
}

