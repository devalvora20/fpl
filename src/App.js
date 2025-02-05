
import React from 'react';
import './App.css';
import MainPointsTable from './components/main_points_table';
import Team from './components/manager_team';
import { EventStatusCallable } from './callable/event_status_callable';
import { Divider, Box, CircularProgress, Typography, CircularProgressProps } from '@material-ui/core';
import PlayerChip from './components/player_chip';

function App() {
  const [progress, setProgress] = React.useState(0);
  const [gw, setGw] = React.useState(null);

  React.useEffect(() => {
    const eventStatusCallable = new EventStatusCallable();
    eventStatusCallable.getData().then(data => {
      setGw(data);
    }).catch();

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (    
    <div>
      {
      gw !== null ? 
      (
        <div>
          <div className='root'>
            Current Gameweek : <b>{gw}</b>
          </div>
            <Divider style={{ margin:20 }} />
          <div>
            <MainPointsTable gw={gw}/>
          </div>
        </div>
      ) :
      (
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )
    }
    </div>
  );
}

export default App;
