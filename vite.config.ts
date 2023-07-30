import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kh-homepage/",
  plugins: [react(), tsconfigPaths()],
  build: {
    // produce sourcemaps for debug builds
    sourcemap: true,
  },
})
