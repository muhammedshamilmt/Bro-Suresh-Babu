import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spawn, type ChildProcess } from "child_process";

// ── Vite plugin: spawns the Express API server alongside Vite dev server ──────
function expressPlugin(): import("vite").Plugin {
  let apiProcess: ChildProcess | null = null;

  return {
    name: "vite-plugin-express-api",
    apply: "serve", // dev only

    configureServer() {
      // Spawn the Express server as a child process
      apiProcess = spawn("node", ["server/index.js"], {
        stdio: "inherit",   // share stdout/stderr with Vite terminal
        shell: false,
        env: { ...process.env },
      });

      apiProcess.on("error", (err) => {
        console.error("[API] Failed to start:", err.message);
      });

      apiProcess.on("exit", (code) => {
        if (code !== 0 && code !== null) {
          console.error(`[API] Process exited with code ${code}`);
        }
      });

      console.log("[API] Express server starting on port 3001...");
    },

    closeBundle() {
      if (apiProcess) {
        apiProcess.kill();
        apiProcess = null;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // All /api requests are proxied to the Express server
      // → no CORS issues, single origin for the frontend
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && expressPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
