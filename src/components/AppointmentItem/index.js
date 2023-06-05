// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {details, isToggleFavorite} = props
  const {title, id, date, isFavorite} = details

  const starImg = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarImg = () => {
    isToggleFavorite(id)
  }

  return (
    <li className="list">
      <div className="last">
        <h1 className="name">{title}</h1>
        <p className="p">{date}</p>
      </div>
      <button
        type="button"
        className="star-btn"
        onClick={onStarImg}
        data-testid="star"
      >
        <img src={starImg} alt="star" className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
