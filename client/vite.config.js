import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://codru-server.onrender.com",
        // target: "https://localhost:3000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true,
      },
    },
  },
});
