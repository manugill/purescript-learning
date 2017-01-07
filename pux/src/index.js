import Main from './Main'
var initialState = require('./Layout').init
var debug = process.env.NODE_ENV === 'development'

if (module.hot) {
  var app = Main[debug ? 'debug' : 'main'](window.puxLastState || initialState)()
  app.state.subscribe(function (state) {
    window.puxLastState = state
  })
  module.hot.accept()
} else {
  Main[debug ? 'debug' : 'main'](initialState)()
}
