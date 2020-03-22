export const jsonConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  transform: false
}

export const multipleConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true,
  transform: false
}

export const config = {
  url: {
    development: 'http://192.168.0.112:8089',
    production: 'https://message-platform.huya.com',
    test: ''
  }
}
