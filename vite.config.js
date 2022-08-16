import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [vue()],

        server: {
            proxy: {
                '^/api': {
                    target: "https://staging.vps2day.k8s.rescaled.de",
                    pathRewrite: { '^/api': '' },
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        'staging.vps2day.k8s.rescaled.de': 'localhost'
                    },
                },
                '/sanctum/csrf-cookie': {
                    target: "https://staging.vps2day.k8s.rescaled.de",
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        'staging.vps2day.k8s.rescaled.de': 'localhost'
                    },
                },
            },
        },

        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            },
            extensions: ['.js', '.vue', '.json']
        }
    });
}
