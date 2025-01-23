import axios from 'axios';

const API_BASE_URL = 'https://repulsive-marylynne-0x194-7a5f566a.koyeb.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false // Disable sending credentials
});

export const checkHealth = async () => {
    try {
        const start = performance.now();
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const latency = Math.round(performance.now() - start);
        const data = await response.json();
        return {
            status: data.status === 'OK',
            latency
        };
    } catch (error) {
        return { status: false, latency: 0 };
    }
};

export const sendMessage = async (message: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        return "Sorry, I'm unable to respond right now.";
    }
};