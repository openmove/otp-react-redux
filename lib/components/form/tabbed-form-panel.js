import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import DateTimePreview from './date-time-preview'
import SettingsPreview from './settings-preview'
import DateTimeModal from './date-time-modal'
import ConnectedSettingsSelectorPanel from './connected-settings-selector-panel'

import { setMainPanelContent } from '../../actions/ui'

class TabbedFormPanel extends Component {
  static propTypes = {
    ModeIcon: PropTypes.elementType.isRequired
  }

  _onEditDateTimeClick = () => {
    const { mainPanelContent, setMainPanelContent } = this.props
    setMainPanelContent(mainPanelContent === 'EDIT_DATETIME' ? null : 'EDIT_DATETIME')
  }

  _onEditSettingsClick = () => {
    const { mainPanelContent, setMainPanelContent } = this.props
    setMainPanelContent(mainPanelContent === 'EDIT_SETTINGS' ? null : 'EDIT_SETTINGS')
  }

  _onHideClick = () => this.props.setMainPanelContent(null)

  render () {
    const { ModeIcon, mainPanelContent } = this.props

    return (
      <div className='tabbed-form-panel'>
        <div className='tab-row'>
          <div className={`tab left ${mainPanelContent === 'EDIT_DATETIME' ? ' selected' : ''}`}>
            <div className='tab-content'>
              <DateTimePreview
                onClick={this._onEditDateTimeClick}
              />
            </div>
          </div>
          <div className={`tab right ${mainPanelContent === 'EDIT_SETTINGS' ? ' selected' : ''}`}>
            <div className='tab-content'>
              <SettingsPreview onClick={this._onEditSettingsClick} />
            </div>
          </div>
        </div>
        {(mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS') && (
          <div className='active-panel'>
            {mainPanelContent === 'EDIT_DATETIME' && (<DateTimeModal />)}
            {mainPanelContent === 'EDIT_SETTINGS' && (<ConnectedSettingsSelectorPanel ModeIcon={ModeIcon} />)}
            <div className='hide-button-row'>
              <Button className='hide-button clear-button-formatting' onClick={this._onHideClick}>
                <i className='fa fa-caret-up' /> Nascondi Impostazioni
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// connect to redux store

const mapStateToProps = (state, ownProps) => {
  return {
    mainPanelContent: state.otp.ui.mainPanelContent
  }
}

const mapDispatchToProps = {
  setMainPanelContent
}

export default connect(mapStateToProps, mapDispatchToProps)(TabbedFormPanel)
