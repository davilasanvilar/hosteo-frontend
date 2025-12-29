import { defineConfig } from 'cypress';

export default defineConfig({
    chromeWebSecurity: false,
    e2e: {
        baseUrl: 'https://localhost:3000/'
    },
    env: {
        apiUrl: 'https://fundshare.e2e.dviladev.com/api/'
    }
});
