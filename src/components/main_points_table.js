import React, { useEffect } from 'react';
import {
    TableBody, 
    TableCell, Paper, TableHead, TableRow, TableContainer, Table, Divider, Box, CircularProgress
} from '@material-ui/core';
import '../components/components.css';
import { MANAGER_ID_NAME_MAP, MAX_TRANSFERS } from '../constants';
import { ManagerHistoryParser } from '../parser/manager_history_parser';
import { managerHistoryParserArchive } from '../data/season_22-23';
const MainPointsTable = props => {

    const [managerPointsData, setManagerPointsData] = React.useState([]);
    const [weekWinners, setWeekWinners] = React.useState([]);

    useEffect(() => {

        // let managerHistoryParser = new ManagerHistoryParser();
        // managerHistoryParser.getData().then(data => {
        //     setManagerPointsData(data["detailed_manager_data"]);
        //     setWeekWinners(data["winners"]);
        // }).catch();

        setManagerPointsData(managerHistoryParserArchive["detailed_manager_data"]);
            setWeekWinners(managerHistoryParserArchive["winners"]);
    }, []);

    const getGameweekHeader = () => {
        let content = [];
        if (managerPointsData.length > 0) {
            for (let i = 1; i <= 38; i++) {
                content.push(
                    <TableCell key={i} align="center" style={{ minWidth: '37px' }}>GW {i}</TableCell>
                );
            }
        }

        return content;
    };

    const getPointsCellRow = (points, transfers) => {
    
        let result;
        if(transfers > MAX_TRANSFERS) {
            let transferPenalty = (transfers - MAX_TRANSFERS ) * 4;
            let pointsBeforePenalty = points > 0? points + transferPenalty : 0;
            result = <div> Pts: ({pointsBeforePenalty} - {transferPenalty}) = <b>{pointsBeforePenalty - transferPenalty} </b></div>;
        }
        else {
            result = <div> Pts: <b>{points}</b></div> ;
        }
        return result;
    }

    return (
        <div className="root">
            <div style={{ padding: 10 }}>
                <b>4 week points table: </b> 
            </div>
            {
                managerPointsData == 0 &&

                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            {
                managerPointsData != 0 &&

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#D3D3D3' }}>
                            <TableRow>
                                <TableCell>Player Name</TableCell>
                                <TableCell align="center">GW 1-4</TableCell>
                                <TableCell align="center">GW 5-8</TableCell>
                                <TableCell align="center">GW 9-12</TableCell>
                                <TableCell align="center">GW 13-16</TableCell>
                                <TableCell align="center">GW 17-20</TableCell>
                                <TableCell align="center">GW 21-24</TableCell>
                                <TableCell align="center">GW 25-28</TableCell>
                                <TableCell align="center">GW 29-32</TableCell>
                                <TableCell align="center">GW 33-36</TableCell>
                                <TableCell align="center">GW 37-38</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managerPointsData.map((managerData) => (
                                <TableRow key={managerData.manager_id}>
                                    <TableCell component="th" scope="row" style={{position:"sticky", left:0, background:"lightgray"}}>
                                        {MANAGER_ID_NAME_MAP[managerData.manager_id]}
                                    </TableCell>
                                    {
                                        managerData && managerData["four_week_aggregate"].map((points, i) =>
                                            <TableCell key={i} align="center" style={{minWidth:110}} className={weekWinners[i] === managerData.manager_id ? 'winnerCell' : ''} >
                                                {getPointsCellRow(points, i > 0? managerData["four_week_transfer_aggregate"][i-1]:0)}
                                                
                                                Xfers: <b style={{color: managerData["four_week_transfer_aggregate"][i]> MAX_TRANSFERS ?"red":""}}> {managerData["four_week_transfer_aggregate"][i]}</b>
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <div style={{ padding: 10 }}>
                <b>Gameweek points:</b>
            </div>

            {
                managerPointsData == 0 &&

                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            {
                managerPointsData != 0 &&

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#D3D3D3' }}>
                            <TableRow>
                                <TableCell>Player Name</TableCell>
                                {getGameweekHeader()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managerPointsData.map((managerData) => (
                                <TableRow key={managerData.manager_id}>
                                    <TableCell component="th" scope="row" style={{position:"sticky", left:0, background:"lightgray"}}>
                                        {MANAGER_ID_NAME_MAP[managerData.manager_id]}
                                    </TableCell>
                                    {
                                        managerData && managerData["per_gw_points"].map((points, i) =>
                                
                                            <TableCell key={i} align="center" style={{minWidth:95}}>{points+managerData["per_gw_transfers_cost"][i]} - {managerData["per_gw_transfers_cost"][i]} = <b>{points}</b></TableCell>
                                        )
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}

export default MainPointsTable;