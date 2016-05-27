module.exports = {
  login(email, pass, cb) {
    if (typeof document !== 'undefined') {
      cb = arguments[arguments.length - 1]
      if (localStorage.token) {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      pretendRequest(email, pass, (res) => {
        if (res.authenticated) {
          localStorage.token = res.token
          if (cb) cb(true)
          this.onChange(true)
        } else {
          if (cb) cb(false)
          this.onChange(false)
        }
      })
    }
  },

  getToken() {

    if (typeof document !== 'undefined') {
      return localStorage.token
    }
  },

  logout(cb) {

    if (typeof document !== 'undefined') {
      delete localStorage.token
      if (cb) cb()
      this.onChange(false)
    }
  },

  loggedIn() {

    if (typeof document !== 'undefined') {
      return !!localStorage.token
    }
  },

  onChange() {
  }
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({authenticated: false})
    }
  }, 0)
}
