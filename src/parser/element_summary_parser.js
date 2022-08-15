import { ElementSummaryAggregator } from "../aggregator/element_summary_aggregator";

export class ElementSummaryParser {
    getPlayerSummary = (teamData) => {
        let playerSummary = {};
        let elementSummaryAggregator = new ElementSummaryAggregator();
        return new Promise((resolve, reject) => {
            elementSummaryAggregator.getData(teamData).then(aggregatedData => {
                aggregatedData.map(individualPlayerData => {
                    playerSummary[individualPlayerData["id"]] = individualPlayerData["history"][individualPlayerData["history"].length - 1]
                });
                resolve(playerSummary);
            }).catch(exception => {
                reject(exception);
            });
        });
    }

}