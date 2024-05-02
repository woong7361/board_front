
export function blankDateFormat(date) {
  return date.replace('T', "  ")
}

export function searchStartDate() {
  const date = new Date();
  date.setMonth(date.getMonth()-3)
  return date.getFullYear()+'-'+(date.getMonth())+'-'+date.getDate()
}

export function searchStartDateTime() {
  const date = new Date();
  date.setMonth(date.getMonth()-3)
  return date.getFullYear()+'-'+(String(date.getMonth()).padStart(2, '0'))+'-'+String(date.getDate()).padStart(2, '0') + 'T00:00:00'
}



export function searchEndDate() {
  const date = new Date();
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}
export function searchEndDateTime() {
  const date = new Date();
  date.setDate(date.getDate() + 1)
  date.setMonth(date.getMonth() + 1)

  return date.getFullYear()+'-'+(String(date.getMonth()).padStart(2, '0'))+'-'+String(date.getDate()).padStart(2, '0') + 'T00:00:00'
}


export function dateToServerDateTimeFormat(date, adapter) {
  return adapter.toISO(date) + "T00:00:00"
}
