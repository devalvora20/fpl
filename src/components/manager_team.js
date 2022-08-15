import React, { useEffect } from 'react';
import {
    Grid, Paper, Chip, Avatar, Divider, CircularProgress, Box, Badge
} from '@material-ui/core';
import '../components/components.css';

import { GameweekPicksAggregator } from '../aggregator/gameweek_picks_aggregator';
import { MANAGER_ID_NAME_MAP } from '../constants';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';
import { ElementSummaryParser } from '../parser/element_summary_parser';

const Team = props => {
    const bootstrapdataParser = new BootstrapDataParser();
    const playerData = bootstrapdataParser.getPlayerData();
    const [teams, setTeams] = React.useState([]);
    const [detailPlayerData, setDetailPlayerData] = React.useState(null);

    useEffect(() => {

        let elementSummaryParser = new ElementSummaryParser();
        let gameweekPicksAggregator = new GameweekPicksAggregator();
        gameweekPicksAggregator.getData(props.gw).then(data => {
            console.log("Teams");
            console.log(data);
            setTeams(data);
            elementSummaryParser.getPlayerSummary(data).then(playerSummary => {
                console.log("Detailed player data")
                console.log(playerSummary);
                setDetailPlayerData(playerSummary);
            });
        }).catch();

    }, [props]);


    const getPhoto = (number) => {
        return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${number}.png`;
    }

    const getChip = (player, i) => {
        const id = player["element"];
        const playerSummary = detailPlayerData[id];
        const kickOffDate = new Date(playerSummary["kickoff_time"]);

        return (
            <Badge badgeContent={player["is_captain"] ? playerSummary["total_points"]*2:playerSummary["total_points"]} showZero={Date.now() > kickOffDate} overlap="circular" color="primary">
                <Chip
                    className={Date.now() > kickOffDate ? 'played' : 'yetToPlay'}
                    style={{ margin: 8, padding: 4 }}
                    key={i}
                    color="default"
                    avatar={<Avatar alt={playerData[id]["web_name"]} src={getPhoto(playerData[id]["code"])} />}
                    label={`${playerData[id]["web_name"]} ${player["is_captain"] ? '(c)' : player["is_vice_captain"] ? '(vc)' : ''} `}
                    variant="outlined"
                />
            </Badge>
        );
    }


    return (
        <div className="root">
            <div style={{ padding: 10 }}>
                <b>Teams:</b>

            </div>
            {
                detailPlayerData === null &&

                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            {
                detailPlayerData !== null &&
                <div>
                
                    <Paper elevation={5} style={{ margin: 10, padding: 10 }}>
                        {
                            teams.map(team =>

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
                                                    (player, i) =>
                                                        <b key={i}>
                                                            {i === 11 && <b style={{ fontSize: 20, fontWeight: 900 }}>|</b>}
                                                            {getChip(player, i)}
                                                        </b>
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