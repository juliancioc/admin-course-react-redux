import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import CourseList from './CourseList'

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  }

  componentDidMount() {
    const { actions } = this.props

    actions.loadCourses.loadCourses().catch((error) => {
      alert('Loading courses failed' + error)
    })

    actions.loadAuthors.loadAuthors().catch((error) => {
      alert('Loading authors failed' + error)
    })
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    )
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            }
          }),
    authors: state.authors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions, dispatch),
      loadAuthors: bindActionCreators(authorActions, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
