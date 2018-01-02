/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { getGoodsInfo } from '../../store/redux'
import marked from 'marked'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import FolderIcon from 'material-ui-icons/Folder'
import DeleteIcon from 'material-ui-icons/Delete'
import icon from './icon.png'

class Favorite extends React.Component {
  componentDidMount() {
    this.props.getGoodsInfo(this.props.userInfo.id)
  }
  render() {
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
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
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

export default connect(
  state => state,
  { getGoodsInfo },
)(Favorite)
