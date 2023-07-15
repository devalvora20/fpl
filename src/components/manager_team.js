import React, { useEffect } from 'react';
import {
    Grid, Paper, Chip, Avatar, Divider, CircularProgress, Box, Badge
} from '@material-ui/core';
import '../components/components.css';

import { GameweekPicksAggregator } from '../aggregator/gameweek_picks_aggregator';
import { MANAGER_ID_NAME_MAP } from '../constants';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';
import { ElementSummaryParser } from '../parser/element_summary_parser';
import { gw38PicksArchive } from '../data/season_22-23';
import ChipRow from './chip_row';

import { GameweekPicksParser } from '../parser/gameweek_picks_parser';
// commented lines are to get more info of each player as in the total points scored, if their match is pending or not (yellow, green color) etc.
// they are commented to reduce the number of API calls made
const Team = props => {
    
    const bootstrapdataParser = new BootstrapDataParser();
    const playerData = bootstrapdataParser.getPlayerData();
    
    const [teams, setTeams] = React.useState([]);
    const [newTeams, setNewTeams] = React.useState([]);
    const [detailPlayerData, setDetailPlayerData] = React.useState(null);
    const SUSTITUTE_ELEMENT_TYPE = 0;
    const FORWARD_ELEMENT_TYPE = 4;


    let lastElementType = 1;

    useEffect(() => {
        
        let elementSummaryParser = new ElementSummaryParser();
        let gameweekPicksAggregator = new GameweekPicksAggregator();
        let gameweekPicksParser = new GameweekPicksParser();
        // gameweekPicksAggregator.getData(props.gw).then(data => {
        //     setTeams(data);
        //     // elementSummaryParser.getPlayerSummary(data).then(playerSummary => {

        //     //     setDetailPlayerData(playerSummary);
        //     // });
        // }).catch();

        gameweekPicksParser.getData(props.gw).then(data => {
            setNewTeams(data);
            console.log("NEW TEAMS DATA");
            console.log(data);    
        }).catch();
        
        setTeams(gw38PicksArchive);

    }, [props]);

    const getPhoto = (number) => {
        return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${number}.png`;
    }

    const getDivider = (player) => {
        const elementType = playerData[player["element"]]["element_type"];
        
        // new line if a new player type comes and only for the first substitute line
        if((elementType !== lastElementType && player["multiplier"]!==0) || (lastElementType===FORWARD_ELEMENT_TYPE && player["multiplier"]===0)){
            lastElementType = player["multiplier"]=== 0 ? 0 : elementType;
            return player["multiplier"]=== 0? <Divider style={{height:3, backgroundColor:'black'}}/> : <Divider/>;
        }
    }

    const getChip = (player, i) => {
        const id = player["element"];
        // const playerSummary = detailPlayerData[id];
        // const kickOffDate = new Date(playerSummary["kickoff_time"]);
        let result;
        try {
            result = 
            // <Badge badgeContent={player["is_captain"] ? playerSummary["total_points"]*2:playerSummary["total_points"]} showZero={Date.now() > kickOffDate} overlap="circular" color="primary">
            <Badge overlap="circular" color="primary">
                <Chip
                    // className={Date.now() > kickOffDate ? 'played' : 'yetToPlay'}
                    className={player["is_captain"] ? 'captain':'regularChip'}
                    style={{ margin: 8, padding: 4 }}
                    key={i}
                    color="default"
                    avatar={<Avatar alt={playerData[id]["web_name"]} src={getPhoto(playerData[id]["code"])} />}
                    label={`${playerData[id]["web_name"]} ${player["is_captain"] ? '(c)' : player["is_vice_captain"] ? '(vc)' : ''} `}
                    variant="outlined"
                />
            </Badge>
          } catch (error) {
            result = 
            // <Badge badgeContent={player["is_captain"] ? playerSummary["total_points"]*2:playerSummary["total_points"]} showZero={Date.now() > kickOffDate} overlap="circular" color="primary">
            <Badge overlap="circular" color="primary">
                <Chip
                    // className={Date.now() > kickOffDate ? 'played' : 'yetToPlay'}
                    className={'regularChip'}
                    style={{ margin: 8, padding: 4 }}
                    key={i}
                    color="default"
                    label={`${player["element"]}`}
                    variant="outlined"
                />
            </Badge>
           
        }

        // result =  <PlayerChip/>
        return result;
    }


    return (
        <div className="root">
            
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
                        <b>Teams:</b>
                    </div>
                    <Paper elevation={5} style={{ margin: 10, padding: 10 }}>
                        {
                            // teams.map(team =>

                            //     <Grid container spacing={2} key={team["manager_id"]}>
                                
                            //         <Grid item xs={12} className='teamGrid'>
                            //             <Paper elevation={3}>
                            //                 <div style={{marginTop:10, marginLeft:10, paddingTop:10}}>
                            //                 <u><b>
                            //                 {MANAGER_ID_NAME_MAP[team["manager_id"]]} - {team["entry_history"]["points"]} pts
                            //                 </b></u>
                            //                 </div>
                                        
                            //                 <br/>
                            //                 {
                            //                     team && team["picks"].map(
                            //                         (player, i) =>
                            //                             <b key={i}>
                            //                                 {getDivider(player)}
                            //                                 {getChip(player, i)}
                            //                             </b>
                            //                     )
                            //                 }

                                            
                            //             </Paper>
                            //         </Grid>
                            //     </Grid>
                            // )
                        }


                        {
                            newTeams.map(team =>

                                <Grid container spacing={2} key={team["manager_id"]}>
                                
                                    <Grid item xs={12} className='teamGrid'>
                                        <Paper elevation={3}>
                                            <div style={{marginTop:10, marginLeft:10, paddingTop:10}}>
                                            <u><b>
                                            {MANAGER_ID_NAME_MAP[team["manager_id"]]} - {team["entry_history"]["points"]} pts
                                            </b></u>
                                            </div>
                                        
                                            <br/>
                                            {
                                                team && team["picks"].map(
                                                    (row, i) =>
                                                    <span>
                                                        {i===4 && <Divider key={i} style={{height:2, backgroundColor:'black'}}/>}
                                                        <div key={i} style={{justifyContent:'center', display:'flex', overflow:'scroll'}}>     
                                                            <ChipRow row={row} /> 
                                                        </div>
                                                    </span>
                                                        
                                                )
                                            }

                                            
                                        </Paper>
                                    </Grid>
                                </Grid>
                            )
                        }

                    </Paper>
                </div>
            }
        </div>
    );
}

export default Team;