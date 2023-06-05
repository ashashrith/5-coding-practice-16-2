// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appList: [], showFavorites: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitItem = event => {
    event.preventDefault()
    const {title, date} = this.state

    const toDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newList = {
      id: uuidv4(),
      title,
      date: toDate,
      isFavorite: false,
    }

    if (title !== '' && date !== '') {
      this.setState(prevState => ({
        appList: [...prevState.appList, newList],
        title: '',
        date: '',
      }))
    }
  }

  showFavorites = id => {
    const {appList} = this.state
    const filterList = appList.filterList(each => each.id === id)
    this.setState({appList: filterList})

    this.setState(prevState => ({showFavorites: !prevState.showFavorites}))
  }

  isToggleFavorite = id => {
    this.setState(prevState => ({
      appList: prevState.appList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  render() {
    const {title, date, appList, showFavorites} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <div className="details">
            <div className="cont">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onClick={this.onSubmitItem}>
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  className="title"
                  placeholder="Title"
                  label="title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="title"
                  placeholder="dd/mm/yyyy"
                  label="date"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="submit-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="mini">
            <div>
              <h1 className="head">Appointments</h1>
            </div>
            <div>
              <button
                className={showFavorites ? 'ex-btn' : 'stared'}
                type="button"
                onClick={this.showFavorites}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="list-container">
            {appList.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                isToggleFavorite={this.isToggleFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
