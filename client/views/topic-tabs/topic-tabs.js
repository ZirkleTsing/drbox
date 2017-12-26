import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import PhoneIcon from 'material-ui-icons/Phone'
import FavoriteIcon from 'material-ui-icons/Favorite'
import PersonPinIcon from 'material-ui-icons/PersonPin'
import HelpIcon from 'material-ui-icons/Help'
import PropTypes from 'prop-types'
// import TopicList from '../topic-list/index'
import { tabs } from '../../util/utils'

const TabContainer = ({ children }) => (
  <Typography>
    {children}
  </Typography>
)

class TopicTabs extends React.Component {
  state = {
    tabIndex: 'all',
    // open: true,
  }

  componentDidMount() {
    const { history } = this.props
    history.push('dashboard?tab=all')
  }

  onTopicIndexChange = (event, value) => {
    const { history } = this.props
    // console.log(value) // eslint-disable-line
    history.push(`dashboard?tab=${value}`)
    this.setState({
      tabIndex: value,
    })
  }

  getIcon = (key) => {
    if (key === '首页') {
      return <HelpIcon />
    } else if (key === '收藏') {
      return <FavoriteIcon />
    } else if (key === '我的') {
      return <PersonPinIcon />
    }
    return <PhoneIcon />
  }

  render() {
    // console.log(`TopicTabs:`, this.props) // eslint-disable-line
    // console.log('state:', this.state.tabIndex) // eslint-disable-line
    return (
      <div>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.onTopicIndexChange}
          fullWidth
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          {
            Object.keys(tabs).map(key => (
              <Tab key={key} label={tabs[key]} value={key} />
            ))
          }
        </Tabs>
        <div> TODO </div>
        {/* <TopicList /> */}
      </div>
    )
  }
}

TabContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
}

TopicTabs.propTypes = {
  history: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
}

export default TopicTabs
