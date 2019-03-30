export const postFetch = async (urlExtension, body, url = 'http://localhost:8888') => {
  return fetch(url + urlExtension, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const getFetch = async (urlExtension, url = 'http://localhost:8888') => {
  return fetch(url + urlExtension, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
}
    