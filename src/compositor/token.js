export function getTokenExpiredMillis(token) {
  return JSON.parse(window.atob(token.split('.')[1])).exp * 1000
}
