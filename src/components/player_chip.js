import {
    Avatar
} from '@material-ui/core';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';

const PlayerChip = props => {
    const bootstrapdataParser = new BootstrapDataParser();
    const playerData = bootstrapdataParser.getPlayerData();
    const player = props.player;
    const id = player["element"];
    const getPhoto = (number) => {
        return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${number}.png`;
    }
    return (
        <span
            className='chipDiv'
        
        >
            <Avatar
                style={{margin:"auto"}}
                alt="Remy Sharp"
                src={getPhoto(playerData[id]["code"])}
            />
            <p style={{textAlign:"center", margin:"0px 5px 5px 5px"}}>
                {playerData[id]["web_name"]} {player["is_captain"] ? '(c)' : player["is_vice_captain"] ? '(vc)' : ''}
            </p>
            
        </span>
    );
    
}

export default PlayerChip;