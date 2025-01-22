interface config {
    BASE_URL: string;
}

export const Local: config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
}

export default Local;