import coreUtils from '@opentripplanner/core-utils'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import Icon from '../narrative/icon'
import {
  clearDefaultSettings,
  resetForm,
  storeDefaultSettings
} from '../../actions/form'

/**
 * This component contains the `Remember/Forget my trip options` and `Restore defaults` commands
 * that let the user save the selected trip settings such as mode choices,
 * walk/bike distance and speed, and trip optimization flags.
 * (The code below was previously embedded inside the `SettingsSelectorPanel` component.)
 */
class UserTripSettings extends Component {
  _toggleStoredSettings = () => {
    const options = coreUtils.query.getTripOptionsFromQuery(this.props.query)
    // If user defaults are set, clear them. Otherwise, store them.
    if (this.props.defaults) this.props.clearDefaultSettings()
    else this.props.storeDefaultSettings(options)
  }

  render () {
    const {
      config,
      defaults,
      query,
      resetForm
    } = this.props

    // Do not permit remembering trip options if they do not differ from the
    // defaults and nothing has been stored
    const queryIsDefault = !coreUtils.query.isNotDefaultQuery(query, config)
    const rememberIsDisabled = queryIsDefault && !defaults

    return (
      <div style={{ marginBottom: '5px' }} className='store-settings pull-right'>
        <Button
          bsStyle='link'
          bsSize='xsmall'
          disabled={rememberIsDisabled}
          onClick={this._toggleStoredSettings}
        >{defaults
            ? <span><Icon type='times' /> Dimentica le mie impostazioni</span>
            : <span><Icon type='lock' /> Ricorda impostazioni di viaggio</span>
          }</Button>
        <Button
          bsStyle='link'
          bsSize='xsmall'
          disabled={queryIsDefault && !defaults}
          onClick={resetForm}
        >
          <Icon type='undo' />{' '}
          Ripristina{defaults ? ' le mie' : ''} impostazioni
        </Button>
      </div>
    )
  }
}

// connect to redux store

const mapStateToProps = (state, ownProps) => {
  const { config, currentQuery, user } = state.otp
  const { defaults } = user

  return {
    config,
    defaults,
    query: currentQuery
  }
}

const mapDispatchToProps = {
  clearDefaultSettings,
  resetForm,
  storeDefaultSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTripSettings)
