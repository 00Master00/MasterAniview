  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";

  export default defineConfig(({ mode }) => ({
    server: {
      host: true,
      port: 8080,
    }, // ✅ ต้องมี comma
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: "/MasterAniview/", // 👈 สำหรับ GitHub Pages
  }));
