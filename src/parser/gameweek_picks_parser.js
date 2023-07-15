import { GameweekPicksAggregator } from "../aggregator/gameweek_picks_aggregator";
import { gw38PicksArchive1 } from '../data/season_22-23';
import { BootstrapDataParser } from '../parser/bootstrap_data_parser';

export class GameweekPicksParser {
    getData = (gameweek) => {
        let playerSummary = {};
        let aggregator = new GameweekPicksAggregator();
        const bootstrapdataParser = new BootstrapDataParser();
        const playerData = bootstrapdataParser.getPlayerData();
        
        return new Promise((resolve, reject) => {
            aggregator.getData(gameweek).then(aggregatedData => {
                
                aggregatedData  = gw38PicksArchive1;
                let newAggregatedData = aggregatedData;
                
                console.log("OG AGG DATA")
                console.log(aggregatedData);
                aggregatedData.forEach((mgrData, managerIndex) => {
                    let picks = [ [],[],[],[],[],[] ]; // array of 5: [ gk,def,mid,fwd,subs ]
                    mgrData["picks"].forEach((element, positionIndex) => {
                        const elementType = playerData[element["element"]]["element_type"];
                        let indexOfPlayer = 5
                        if(element["position"] <=11){
                            indexOfPlayer = elementType%5;
                        }
                        
                        picks[indexOfPlayer] = picks[indexOfPlayer].concat(element);
                        
                    });
                    picks.shift();
                    newAggregatedData[managerIndex]["picks"] = picks;
                });

                resolve(newAggregatedData);
            }).catch(exception => {
                reject(exception);
            });
        });
    }

}