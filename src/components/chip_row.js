import React from 'react';
import PlayerChip from './player_chip';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';

const bootstrapdataParser = new BootstrapDataParser();
const playerData = bootstrapdataParser.getPlayerData();

const ChipRow = props => {

    // props.row.sort(compare);
    return (
        <span style={{display:'flex', overflow:'scroll'}}>
                
            {
             props.row.map((element,i) => 
                    <PlayerChip key={i} player={element}/>     
            )
            }
        
        </span>
    );
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const elementA = playerData[a.element]["web_name"];
    const elementB = playerData[b.element]["web_name"];
  
    let comparison = 0;
    if (elementA > elementB) {
      comparison = 1;
    } else if (elementA < elementB) {
      comparison = -1;
    }
    return comparison;
  }

export default ChipRow;