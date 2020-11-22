import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// @ts-ignore
import defaultAvatar from '../../assets/default_avatar.jpg';
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: window.innerHeight - theme.spacing(12)
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  tabText: {
    textTransform: 'none'
  }
}));

const DialogsPage: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab
          className={classes.tabText}
          id={`vertical-tab-${0}`}
          classes={{wrapper: classes.wrapper}}
          icon={<Avatar variant='rounded' src={defaultAvatar}/>}
          label={<Box pl={1}>Firstname Lastname</Box>}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
    </div>
  );
}

interface ITabPanelProps {
  children: React.ReactNode,
  value: number,
  index: number
}

const TabPanel: React.FC<ITabPanelProps> = props => {
  const {children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
    >
      {value === index && (
        <Box  p={3}>
          <Paper>
            123
          </Paper>
        </Box>
      )}
    </div>
  );
}

export default DialogsPage;