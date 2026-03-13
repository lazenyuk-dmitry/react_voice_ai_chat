import toast from "react-hot-toast";

class HttpClient {
    baseApiUrl = '/api'

    private async request(url: string, options: RequestInit) {
        try {
            const response = await fetch(this.baseApiUrl + url, options);

            if (!response.ok) {
                const data = await response.json();
                const errorMessage = data.message;
                throw new Error(errorMessage)
            }

            return await response.json();

        } catch(e: unknown) {
            this.logError(e as Error);
            throw e;
        }
    }

    async post(url: string, payload: any, config: RequestInit = {}) {
        return await this.request(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            ...config,
        });
    }

    async postAsFormData(url: string, payload: any, config: RequestInit = {}) {
        return await this.request(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            ...config,
        });
    }


    private logError(error: Error) {
        const errorMessage = error.message;

        toast.error(errorMessage, {
            style: {
                borderRadius: '10px',
                background: '#1e293b',
                color: '#fff',
            },
        });

        console.log(error);
    }
}

export const httpClient = new HttpClient()
