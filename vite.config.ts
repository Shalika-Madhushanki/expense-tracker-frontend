import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import fs from "fs";
// import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Expense Tracker",
        short_name: "Expense Tracker",
        description: "Expense tracking app",
        theme_color: "#000000",
        icons: [
          {
            src: "icon-512x512.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
  //   },
  // },
  base:
    process.env.NODE_ENV === "production" ? "/expense-tracker-frontend/" : "/",
});
