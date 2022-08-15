import { MANAGERS } from "../constants";
import { ManagerHistoryCallable } from "../callable/manager_history_callable";

export class ManagerHistoryAggregator {
    getData = async () => {
        let managerHistoryCallable = new ManagerHistoryCallable();
        let promises = [];
        MANAGERS.forEach(id => {
            promises.push(managerHistoryCallable.getData(id));
        })
        const aggregatedPromises = Promise.all(promises);
        return aggregatedPromises;
    }
}