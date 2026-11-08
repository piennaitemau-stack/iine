import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" にすると、Androidアプリ内でも、Webの好きな場所に置いても動きます
export default defineConfig({
  base: "./",
  plugins: [react()],
});
