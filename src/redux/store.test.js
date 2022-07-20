import { createStore } from 'redux'

import rootReducer from './reducers'
import initialState from './reducers/initialState'
import * as courseActions from './actions/courseActions'

it('should handle creating courses', function () {
  const store = createStore(rootReducer, initialState)
  const course = { title: 'Clean Code' }

  const action = courseActions.createCourseSuccess(course)
  store.dispatch(action)

  const createdCourse = store.getState().courses[0]

  expect(createdCourse).toEqual(course)
})
