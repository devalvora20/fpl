import { Team } from "../model/team";
import { bootstrap_data } from "../model/bootstrap_data"
import { Player } from "../model/player";
export class BootstrapDataParser {
    player_data = {};
    team_data = {};

    getPlayerData = () => {
        bootstrap_data.elements.forEach((player) => {
            this.player_data[player.id] = new Player(player.code, player.web_name, player.first_name, player.second_name, player.team_code, player.element_type, player.id, player.team);
        });
        return this.player_data;
    }

    getTeamData = () => {
        bootstrap_data.teams.forEach((team) => {
            this.team_data[team.code] = new Team(team.code, team.name, team.short_name, team.pulse_id, team.id)
        });
        return this.team_data;
    }
}