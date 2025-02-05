import React, { useEffect } from 'react';
import {
    Paper, Divider, CircularProgress, Box, Badge,AccordionDetails,
    AccordionSummary, Accordion, Typography
} from '@material-ui/core';
import '../components/components.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUIDataTable from "mui-datatables";
import { MANAGER_ID_NAME_MAP } from '../constants';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';
import { gw38PicksDummyData } from '../data/season_22-23';
import ChipRow from './chip_row';

import { GameweekPicksParser } from '../parser/gameweek_picks_parser';
import { Block } from '@material-ui/icons';
// commented lines are to get more info of each player as in the total points scored, if their match is pending or not (yellow, green color) etc.
// they are commented to reduce the number of API calls made
const Team = props => {
    
    const [newTeams, setNewTeams] = React.useState([]);
    const [playerToManagerReverseMap, setPlayerToManagerReverseMap] = React.useState([]);

    useEffect(() => {
        


        // To enable working code - uncomment this
        //  ---------------
        let gameweekPicksParser = new GameweekPicksParser();
        gameweekPicksParser.getData(props.gw).then(data => {
            setNewTeams(data["teams"]);
            setPlayerToManagerReverseMap(data["playerToManagerReverseMap"]);
        }).catch();
        

        // ---------------
        
        // To disable network calls  and enable dummy data - uncomment this

        // setNewTeams(gw38PicksDummyData);

    }, []);

    const columns = [
        {
          name: "playerName",
          label: "Player",
          options: {
            sort: true
          }
        },
        {
          name: "teamCount",
          label: "No. of Teams",
          options: {
            sort: true
          }
        },
        {
            name: "teams",
            label: "Teams",
            options: {
              sort: true
            }
          }
      ];
      
    const options = {
        selectableRows: 'none',
        responsive: "standard",
        download:false,
        print:false,
        filter:false,
        viewColumns:false,
        searchOpen: true,
        sortOrder: {
            name: 'teamCount',
            direction: 'desc'
        },
        rowsPerPage:5
      };


    return (
        <div >
            
            {
                newTeams.length === 0 &&
                <div>
                    <div style={{ padding: 10 }}>
                        <b>Teams:</b>
                    </div>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                </div>
            }
            {
                newTeams.length > 0 &&
                <div>
                    <div style={{ padding: 10 }}>
                        <b>Most owned players:</b>
                    </div>
                    <Paper elevation={5} style={{ margin: 10, padding: 10 }}>
                        <MUIDataTable
                            title={"Player ownership"}
                            data={playerToManagerReverseMap}
                            columns={columns}
                            options={options}
                        />
                    </Paper>
                    <div style={{ padding: 10 }}>
                        <b>Teams:</b>
                    </div>
                    <Paper elevation={5} style={{ margin: 10, padding: 10 }}>
                        {
                            newTeams.map((team, i) =>                                  
                                    <Accordion style={{ marginTop: 20}} key={i}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <Typography>
                                                <u><b>
                                                    {MANAGER_ID_NAME_MAP[team["manager_id"]]} - {team["entry_history"]["points"]} pts
                                                </b></u>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{display: Block}}>
                                            {
                                                team && team["picks"].map(
                                                    (row, i) =>
                                                    <span key={i}>
                                                        {i===4 && <Divider key={i+60} style={{height:2, backgroundColor:'black'}}/>}
                                                        <div key={i} style={{justifyContent:'center', display:'flex', overflow:'scroll'}}>     
                                                            <ChipRow row={row} /> 
                                                        </div>
                                                    </span>         
                                                )
                                            }
                                        </AccordionDetails>
                                    </Accordion>         
                            )
                        }
                    </Paper>
                </div>
            }
        </div>
    );
}

export default Team;