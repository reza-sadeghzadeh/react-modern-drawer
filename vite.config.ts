import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const config = {
        build: {},
        plugins: [
            react(),
            dts({
                insertTypesEntry: true,
                exclude: ['src/Dev.tsx', 'src/dev.css'],
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        server: {
            fs: {
                allow: ['.'],
                deny: ['src/Dev.tsx', 'src/dev.css'],
            },
        },
    }

    if (command === 'build') {
        config.build = {
            lib: {
                entry: resolve(__dirname, 'src/index.tsx'),
                name: 'ReactModernDrawer',
                fileName: (format) => `index.${format}.js`,
            },
            rollupOptions: {
                external: ['react', 'react-dom'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
            sourcemap: true,
            exclude: ['src/Dev.tsx', 'src/dev.css'],
        }
    }

    return config
})
