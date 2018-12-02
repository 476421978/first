/**
 * 保存账号密码信息
 */
export function set(name, value, days) {
  const d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}


export function get(name) {
  const v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}


export function cl(name){
  set(name, '', -1);
}
