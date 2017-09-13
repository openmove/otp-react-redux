import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import moment from 'moment'

class DateTimePreview extends Component {
  static propTypes = {
    caret: PropTypes.string,
    compressed: PropTypes.bool,
    date: PropTypes.string,
    departArrive: PropTypes.string,
    time: PropTypes.string,
    onClick: PropTypes.func,
    routingType: PropTypes.string
  }

  render () {
    const { caret, date, time, departArrive, routingType, startTime, endTime } = this.props

    let timeStr
    let dateStr = date
    if (routingType === 'ITINERARY') {
      if (departArrive === 'NOW') timeStr = 'Leave now'
      else if (departArrive === 'ARRIVE') timeStr = 'Arrive ' + time
      else if (departArrive === 'DEPART') timeStr = 'Depart ' + time
    } else if (routingType === 'PROFILE') {
      const mday = moment(date).day()
      if (mday === 0) dateStr = 'Sunday'
      else if (mday === 6) dateStr = 'Saturday'
      else dateStr = 'Weekday'
      timeStr = startTime + ' to ' + endTime
    }

    const summary = (
      <div className='details'>
        <i className='fa fa-calendar' /> {dateStr}
        <br />
        <i className='fa fa-clock-o' /> {timeStr}
      </div>
    )

    const button = (
      <div className='button-container'>
        <Button className='change-button' onClick={this.props.onClick}>
          Change {caret && <span> <i className={`fa fa-caret-${caret}`} /></span>}
        </Button>
      </div>
    )

    return this.props.compressed
      ? /* 'compressed' layout -- button is below selected mode preview */ (
        <div className='date-time-preview compressed'>
          {summary}
          {button}
        </div>
      ) : /* 'wide' layout -- button and selected mode preview are side-by-side  */ (
        <div className='date-time-preview wide'>
          {button}
          {summary}
          <div style={{ clear: 'both' }} />
        </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { departArrive, date, time, routingType, startTime, endTime } = state.otp.currentQuery
  return {
    config: state.otp.config,
    routingType,
    departArrive,
    date,
    time,
    startTime,
    endTime
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePreview)