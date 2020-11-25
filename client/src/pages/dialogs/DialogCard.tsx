import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Box from "@material-ui/core/Box";

interface IProps {
  firstName: string,
  lastName: string,
  avatar: string,
  id: string
}

const DialogCard: React.FC<IProps> = props => {
  const {firstName, lastName, avatar, id} = props;
  return (
    <Button>
      <Box mr={1}>
        <Avatar variant='rounded' src={avatar}/>
      </Box>
      <NavLink to={`/dialogs/${id}`}>
        <Typography color='textPrimary'>
          {`${firstName} ${lastName}`}
        </Typography>
      </NavLink>
    </Button>
  );
}

export default DialogCard;