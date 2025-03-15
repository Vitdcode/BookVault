import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.178.179:8080", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes /api prefix
      },
    },
  },
});
