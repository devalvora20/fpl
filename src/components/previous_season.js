
import * as React from 'react';
import {
    TableBody, 
    TableCell, Paper, TableHead, TableRow, TableContainer, Table, Typography, AccordionDetails,
    AccordionSummary, Accordion
} from '@material-ui/core';
import '../components/components.css';
import { SEASON_22_23_MANAGER_ID_NAME_MAP, MAX_TRANSFERS } from '../constants';
import { ManagerHistoryParser } from '../parser/manager_history_parser';
import { managerHistoryParserArchive } from '../data/season_22-23';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PreviousSeason = props => {

    const managerPointsData = managerHistoryParserArchive["detailed_manager_data"];
    const weekWinners = managerHistoryParserArchive["winners"];

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
        // <Paper elevation={5} style={{ margin: 10, padding: 10 }}>
        <Accordion style={{ marginTop: 20}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography><b>Season 22-23 Points Table</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                                            {SEASON_22_23_MANAGER_ID_NAME_MAP[managerData.manager_id]}
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
            </AccordionDetails>
      </Accordion>
    //   </Paper>
    );
    
}
export default PreviousSeason;

