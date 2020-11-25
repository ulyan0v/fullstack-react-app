import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const NewPostForm: React.FC = props => {
  return (
    <Box display='flex'>
      <TextField label='Что у вас нового?' fullWidth variant='outlined' />
      <Box ml={2} my='auto' display='flex'>
        <Button color='primary'>
          Опубликова
        </Button>
      </Box>
    </Box>
  );
}

export default NewPostForm;