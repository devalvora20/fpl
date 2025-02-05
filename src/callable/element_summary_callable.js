import { BACKEND_PROXY_URL, FANTASY_BASE_URL } from "../constants";
export class ElementSummaryCallable {
    getElementSummary = async (elementId) => {
        console.log("Making a call from element summary callable");
        let url = FANTASY_BASE_URL + `element-summary/${elementId}/`;
        const response = await fetch(BACKEND_PROXY_URL+url, {
            headers: {
                'Target-URL': url,
                'Authorization':'auth'
              }
        });
        const data = await response.json();
        data["id"] = elementId;
        return data;
    }
}