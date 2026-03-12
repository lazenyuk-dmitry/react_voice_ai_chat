export class HttpClient {
    baseApiUrl = '/api'

    async post(url: string, payload: any) {
        return await fetch(this.baseApiUrl + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    }
}
