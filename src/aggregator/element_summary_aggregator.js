import {ElementSummaryCallable} from '../callable/element_summary_callable';

export class ElementSummaryAggregator {
    getData = async (data) => {
        let elementSummaryCallable = new ElementSummaryCallable();
        let selectedPlayers = this.getSelectedPlayerElements(data);
        let promises = [];
        
        selectedPlayers.forEach(id => {
            promises.push(elementSummaryCallable.getElementSummary(id));
        })
        const aggregatedPromises = Promise.all(promises);
        return aggregatedPromises;
    }

    getSelectedPlayerElements = (data) => {
        let selectedPlayers = new Set();
        data.map(team => {
            team["picks"].map(player => {
                selectedPlayers.add(player["element"]);
            });
        });
        return selectedPlayers;
    }
}