import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Remove "/api" from the request path and forward it to the backend
      "/api": {
        // target: "https://codru-server.vercel.app/api",
        target: "https://codru-server.vercel.app/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove /api prefix if it's part of the path
        secure: true,
      },
    },
  },
});
