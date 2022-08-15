import { MANAGERS } from "../constants";
import {GameweekPicksCallable} from '../callable/gameweek_picks_callable';

export class GameweekPicksAggregator {
    getData = async (gw) => {
        let gameweekPicksCallable = new GameweekPicksCallable();
        let promises = [];
        MANAGERS.forEach(id => {
            promises.push(gameweekPicksCallable.getData(id , gw));
        })
        const aggregatedPromises = Promise.all(promises);
        return aggregatedPromises;
    }
}