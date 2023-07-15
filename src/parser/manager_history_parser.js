import { ManagerHistoryAggregator } from '../aggregator/manager_history_aggregator';
import { FREE_WILD_CARD_GW_LIST, LAST_GW_NUMBER_OF_SESSIONS, MAX_TRANSFERS } from '../constants';

export class ManagerHistoryParser {
   
    getData = async () => {

        return new Promise((resolve, reject) => {
            
            let managerHistoryAggregator = new ManagerHistoryAggregator();
            let mainTablePointsData = {};
            let detailedManagersData = [];
            let winners = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            

            managerHistoryAggregator.getData().then(aggregatedData => {

                aggregatedData.map(managerData => {
                    let data = {}
                    let fourWeekAgg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let fourWeekTransferAgg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let fourWeekAggAsMap = {};
                    let fourWeekTransferAggAsMap = {};
                    let perWeekPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0];
                    let perWeekTransfers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0];
                    
                    managerData["current"].map((currentSeasonData, i) => {
                        
                        
                        // get current session index:
                        const current_session_index = Math.floor(currentSeasonData["event"] / 4.1);

                        const current_gw_transfers = FREE_WILD_CARD_GW_LIST.includes(currentSeasonData["event"]) ? 0:currentSeasonData["event_transfers"];
                        // Total FPL gw points after deduction of this weeks transfers:
                        const current_gw_transfer_cost = currentSeasonData["event_transfers_cost"];
                        const current_gw_points_minus_gw_transfer_cost = currentSeasonData["points"] - current_gw_transfer_cost;
                    
                        
                        const current_session_Transfers = fourWeekTransferAgg.at(current_session_index) + current_gw_transfers;
                        let current_session_points = fourWeekAgg.at(current_session_index) + current_gw_points_minus_gw_transfer_cost;
                        // If this is the last gw of the session then deduct the session_transfer_penalty from this session.
                        if ( LAST_GW_NUMBER_OF_SESSIONS.includes(i)){
                            const previous_session_transfers = current_session_index > 0? fourWeekTransferAgg.at(current_session_index -1 ) : 0;
                
                            if(previous_session_transfers >MAX_TRANSFERS){
                                current_session_points = current_session_points - ((previous_session_transfers - MAX_TRANSFERS)*4);
                            }
                        }
                        

                        
                        perWeekPoints[currentSeasonData["event"]-1] = current_gw_points_minus_gw_transfer_cost;
                        perWeekTransfers[currentSeasonData["event"]-1] = current_gw_transfer_cost;
                        fourWeekAgg[current_session_index] = current_session_points;
                        fourWeekAggAsMap[current_session_index] = current_session_points;
                        fourWeekTransferAgg[current_session_index] = current_session_Transfers;
                        fourWeekTransferAggAsMap[current_session_index] = current_session_Transfers;
                    })
                    data["manager_id"] = managerData["manager_id"];
                    data["per_gw_points"] = perWeekPoints;
                    data["per_gw_transfers_cost"] = perWeekTransfers;
                    data["four_week_aggregate"] = fourWeekAgg;
                    data["four_week_aggregate_as_map"] = fourWeekAggAsMap;
                    data["four_week_transfer_aggregate"] = fourWeekTransferAgg;
                    data["four_week_transfer_aggregate_as_map"] = fourWeekTransferAggAsMap;

                    detailedManagersData.push(data);
                });

                for (let i = 0; i < 10; i++) {
                    let max = 0;
                    let max_manager_id = 0;
                    detailedManagersData.map((managerData) => {
                        let managerPointsPerAggergate = managerData["four_week_aggregate_as_map"][i];
                        if (max < managerPointsPerAggergate) {
                            max = managerPointsPerAggergate;
                            max_manager_id = managerData["manager_id"];
                        }
                    });
                    winners[i] = max_manager_id;
                }

                mainTablePointsData["detailed_manager_data"] = detailedManagersData;
                mainTablePointsData["winners"] = winners;

                resolve(mainTablePointsData);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}