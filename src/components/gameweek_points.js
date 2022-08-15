import React from 'react';
import {
    TableBody, TableCell, Paper, TableHead, TableRow, TableContainer, Table
} from '@material-ui/core';
import '../components/components.css';
const GameweekPointsTable = props => {

    let rows = [];

    return (
        <div className="root">
            <TableContainer component={Paper} style={{overflowX : 'auto'}}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Player Name2</TableCell>
                        <TableCell align="center">GW 1</TableCell>
                        <TableCell align="center">GW 5-8</TableCell>
                        <TableCell align="center">GW 9-12</TableCell>
                        <TableCell align="center">GW 13-16</TableCell>
                        <TableCell align="center">GW 17-20</TableCell>
                        <TableCell align="center">GW 21-24</TableCell>
                        <TableCell align="center">GW 25-28</TableCell>
                        <TableCell align="center">GW 29-32</TableCell>
                        <TableCell align="center">GW 33-36</TableCell>
                        <TableCell align="center">GW 37-38</TableCell>
                        <TableCell align="center">G1</TableCell>
                        <TableCell align="center">GW 5-8</TableCell>
                        <TableCell align="center">GW 9-12</TableCell>
                        <TableCell align="center">GW 13-16</TableCell>
                        <TableCell align="center">GW 17-20</TableCell>
                        <TableCell align="center">GW 21-24</TableCell>
                        <TableCell align="center">GW 25-28</TableCell>
                        <TableCell align="center">GW 29-32</TableCell>
                        <TableCell align="center">GW 33-36</TableCell>
                        <TableCell align="center">GW 37-38</TableCell>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">1</TableCell>
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
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default GameweekPointsTable;