import { BACKEND_PROXY_URL, FANTASY_BASE_URL } from "../constants";
export class ManagerHistoryCallable {
    getData = async (manager_id) => {
        let url = FANTASY_BASE_URL + `entry/${manager_id}/history/`;

        const response = await fetch(BACKEND_PROXY_URL,{
            headers: {
                'Target-URL': url,
                'Authorization':'auth'
              }
        });
        const data = await response.json();
    
        data["manager_id"] = manager_id;

        return data;
    }
}