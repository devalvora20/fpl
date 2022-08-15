import { ManagerHistoryAggregator } from '../aggregator/manager_history_aggregator';
import { TEST_AGGREGATED_HISTORY_DATA } from '../constants';

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
                    let fourWeekAggAsMap = {};
                    let perWeekPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0];
                    
                    managerData["current"].map((currentSeasonData, i) => {
                        let points = currentSeasonData["points"];
                        let fourWeekAggIndex = Math.floor(currentSeasonData["event"] / 4);
                        let currentFourWeekTotal = fourWeekAgg.at(fourWeekAggIndex) + points;
                        perWeekPoints[i] = points;
                        fourWeekAgg[fourWeekAggIndex] = currentFourWeekTotal;
                        fourWeekAggAsMap[fourWeekAggIndex] = currentFourWeekTotal;
                    })
                    data["manager_id"] = managerData["manager_id"];
                    data["per_gw_points"] = perWeekPoints;
                    data["four_week_aggregate"] = fourWeekAgg;
                    data["four_week_aggregate_as_map"] = fourWeekAggAsMap;

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