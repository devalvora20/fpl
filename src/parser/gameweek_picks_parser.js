import { GameweekPicksAggregator } from "../aggregator/gameweek_picks_aggregator";
import { gw38PicksDummyData } from '../data/season_22-23';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';
import { MANAGER_ID_NAME_MAP } from "../constants";

export class GameweekPicksParser {
    
    getData = (gameweek) => {
        let aggregator = new GameweekPicksAggregator();
        const bootstrapdataParser = new BootstrapDataParser();
        const playerData = bootstrapdataParser.getPlayerData();
        
        return new Promise((resolve, reject) => {
            let playerToManagerReverseMap = {};
            aggregator.getData(gameweek).then(aggregatedData => {
                
                // aggregatedData  = gw38PicksArchive1;
                let newAggregatedData = aggregatedData;
                
                aggregatedData.forEach((mgrData, managerIndex) => {
                    let picks = [ [],[],[],[],[],[]]; // array of 5: [ gk,def,mid,fwd,subs ]
                    mgrData["picks"].forEach((element, positionIndex) => {
                        const elementType = playerData[element["element"]]["element_type"];
                        let indexOfPlayer = 5
                        if(element["position"] <=11){
                            indexOfPlayer = elementType%5;
                        }
                        
                        picks[indexOfPlayer] = picks[indexOfPlayer].concat(element);
                        
                        // playerToManagerReverseMap
                        const playerWebName = playerData[element["element"]]["web_name"];
                        const currentManagersWhoOwnPlayer = playerToManagerReverseMap[playerWebName] === undefined ? "" : playerToManagerReverseMap[playerWebName] + ", ";
                        playerToManagerReverseMap[playerWebName] = currentManagersWhoOwnPlayer + MANAGER_ID_NAME_MAP[mgrData["manager_id"]];
                
                    });
                    picks.shift();
                    newAggregatedData[managerIndex]["picks"] = picks;
                });

                const response = {
                    teams: newAggregatedData,
                    playerToManagerReverseMap: this.parsePlayerToManagerReverseMap(playerToManagerReverseMap)
                };

                resolve(response);
            }).catch(exception => {
                reject(exception);
            });
        });
    }

    // This method created following data structure:
    // [
    //  { playerName: "Erling Haaland", teamCount: "4", teams: "Deval, Rishab" },
    //  { playerName: "Erling Haaland", teamCount: "4", teams: "Deval, Rishab" }
    // ]
    parsePlayerToManagerReverseMap = (playerToManagerReverseMap) => {
        let parsedPlayerToManagerMap = [];

        for (const player in playerToManagerReverseMap) {
            const teamCount = playerToManagerReverseMap[player].split(",").length;
            const parsedPlayer = {
                playerName: player,
                teamCount: teamCount,
                teams: playerToManagerReverseMap[player]
            };

            parsedPlayerToManagerMap.push(parsedPlayer);
        }

        return parsedPlayerToManagerMap;
    }
}