const baseUrl = 'https://api.coinmarketcap.com/v2'

function fetchJSON (url) {
  console.log(url)
  return fetch(url).then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.json()
    }).then(body => {
      if (body.Response === 'Error') throw body.Message
      return body
    })
}

const api = {
  cryptoList: (start, limit, sort) => {
    let url = `${baseUrl}/ticker/`
    if (start || start === 0) url += `?start=${start}`
    if (limit) url += `&limit=${limit}`
    if (sort) url += `&sort=${sort}`
    url += `&structure=array&convert=BTC`
    return fetchJSON(url).then(result => result)
  },
  globalData: () => {
    let url = `${baseUrl}/global/`
    return fetchJSON(url).then(result => result)
  }
}

export default api