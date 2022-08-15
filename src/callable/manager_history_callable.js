import { BASE_URL } from "../constants";
export class ManagerHistoryCallable {
    getData = async (manager_id) => {
        let url = BASE_URL + `entry/${manager_id}/history/`;
        const response = await fetch(url);
        const data = await response.json();
        data["manager_id"] = manager_id;
        return data;
    }
}