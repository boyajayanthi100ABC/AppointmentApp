// Write your code here

import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarted = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="white-container">
          <div className="row-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading"> Add Appointment </h1>
                <label htmlFor="title" className="label">
                  {' '}
                  Title{' '}
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={titleInput}
                  className="input"
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date"> DATE </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointments-image"
                alt="appointments"
              />
            </div>
            <hr className="hor-line" />
            <div className="header-with-filter-content">
              <h1 className="appointments-heading"> Appointments </h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
