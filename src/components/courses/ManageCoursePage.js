import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import CourseForm from '../courses/CourseForm'
import { newCourse } from '../../../tools/mockData'

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error)
      })
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error)
      })
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  function handleSave(event) {
    event.preventDefault()
    saveCourse(course).then(() => {
      history.push('/courses')
    })
  }

  return (
    <CourseForm
      onChange={handleChange}
      course={course}
      errors={errors}
      authors={authors}
      onSave={handleSave}
    />
  )
}

ManageCoursePage.propTypes = {
  loadCourses: PropTypes.object.isRequired,
  loadAuthors: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  newCourse: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    course: newCourse,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
