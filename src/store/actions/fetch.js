export default async function sendRequest(configObj) {
    const response = await fetch(configObj.url, {
        method: configObj.method || "GET",
        headers: configObj.headers || {},
        body: JSON.stringify(configObj.body) || null,
    });

    if (!response.ok && response.status !== 422) {
        throw new Error("Hiba a kérés küldése közben!");
    }

    const responseData = await response.json();
    return responseData;
}
