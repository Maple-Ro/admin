import React  from 'react'
import PropTypes from 'prop-types'
import styles from './weather.less'

function Weather ({ city, icon, dateTime, temperature, weatherName }) {
  return (<div className={styles.weather}>
    <div className={styles.left}>
      <div className={styles.icon} style={{
        backgroundImage: `url(${icon})`,
      }} />
      <p>{weatherName}</p>
    </div>
    <div className={styles.right}>
      <h1 className={styles.temperature}>{`${temperature}°`}</h1>
      <p className={styles.description}>{city} {dateTime}</p>
    </div>
  </div>)
}

Weather.propTypes = {
  city: PropTypes.string,
  icon: PropTypes.string,
  dateTime: PropTypes.string,
  temperature: PropTypes.string,
  weatherName: PropTypes.string,
}

export default Weather
