
import React from 'react';
import './App.css';
import MainPointsTable from './components/main_points_table';
import Team from './components/manager_team';
import { EventStatusCallable } from './callable/event_status_callable';
import { Divider } from '@material-ui/core';
function App() {

  const [gw, setGw] = React.useState(null);
  React.useEffect(() => {
    let eventStatusCallable = new EventStatusCallable();
    eventStatusCallable.getData().then(data => {
      setGw(data);
    }).catch();

  }, []);

  return (
    gw !== null && 
    <div>
      <div className='root'>
        Current Gameweek : <b>{gw}</b>
      </div>
      <Divider style={{ margin:20 }} />
      <div>
        <MainPointsTable />
      </div>
      <div>
        <Team gw = {gw} />
      </div>
    </div>
  );
}

export default App;
