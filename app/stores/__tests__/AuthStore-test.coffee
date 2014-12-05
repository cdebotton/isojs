jest.dontMock 'immutable'
jest.dontMock 'lodash'
jest.dontMock 'react/lib/keyMirror'
jest.dontMock '../AuthStore'
jest.dontMock '../../constants/AppConstants'

describe 'AuthStore', ->
  AppDispatcher = null
  AuthStore = null
  callback = null

  beforeEach ->
    AppDispatcher = require '../../dispatchers/AppDispatcher'
    AuthStore = require '../AuthStore'
    callback = AppDispatcher.register.mock.calls[0][0]

  it 'should log a user in', ->
