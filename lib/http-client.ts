export class HttpClient {
    baseApiUrl = '/api'

    async post(url: string, payload: any, config: any = {}) {
        return await fetch(this.baseApiUrl + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            ...config,
        });
    }

    async postAsFormData(url: string, payload: any, config: any = {}) {
        return await fetch(this.baseApiUrl + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            ...config,
        });
    }
}
