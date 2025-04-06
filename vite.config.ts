
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add environment variables to notify Netlify not to use the CommandBar plugin
  define: {
    'process.env.DISABLE_COMMANDBAR': JSON.stringify('true'),
    'process.env.COMMANDBAR_ORG_ID': JSON.stringify('Netlify Purge Cache Token'), // This should prevent the error about missing organization ID
  },
}));
