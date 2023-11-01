import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import macrosPlugin from 'vite-plugin-babel-macros'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import requireTransform from 'vite-plugin-require-transform'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), macrosPlugin(), nodePolyfills(), wasm(), topLevelAwait(), requireTransform({})],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      transformMixedEsModules: true
    },
    sourcemap: mode === 'development',
    output: {
      cache: false,
      maxParallelFileOps: 2,
      manualChunks: (id) => {
        if (id.includes('node_modules')) return 'vendor'
      }
    }
  }
}))
