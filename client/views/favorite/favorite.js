/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { getGoodsInfo } from '../../store/redux'
import marked from 'marked'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import FolderIcon from 'material-ui-icons/Folder'
import DeleteIcon from 'material-ui-icons/Delete'
// import Chip from 'material-ui/Chip'
import icon from './icon.png'

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    // display: 'inline-block',
  },
  price: {
    fontSize: '20px',
    color: 'red',
    marginRight: 15,
    backgroundColor: '#2196f3',
    color: 'rgb(255, 255, 255)',
    padding: '3px 8px',
    borderRadius: '5px',
  },
  wrapper: {
    display: 'flex',
    // alignItems: 'center',
    marginRight: 15,
  },
})

class Favorite extends React.Component {
  componentDidMount() {
    this.props.getGoodsInfo(this.props.userInfo.id)
  }

  go = (url) => () => {
    window.open(url)
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <List>
          {
            this.props.favorite.length
            ?
              this.props.favorite.map((ele) => {
                console.log(marked(ele.goodsName))
                return (
                  <ListItem button key={ele.goodsUrl}>
                    <ListItemIcon>
                      <Avatar alt="头像" src={icon}/>
                    </ListItemIcon>
                    <ListItemText
                      primary={<div dangerouslySetInnerHTML={{__html: marked(ele.goodsName)}}></div>}
                    />
                    <ListItemSecondaryAction>
                     <div className={classes.wrapper}>
                      <span className={classes.price}>{ele.goodsPrice}</span>
                      <Button raised color="accent" onClick={this.go(ele.goodsUrl)}>去购买</Button>
                     </div>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            :
              null
          }
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(connect(
  state => state,
  { getGoodsInfo },
)(Favorite))
