console.log(process.env.NEXT_PUBLIC_API_URL);

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://10.41.24.56:8000/").replace(/\/$/, "");
