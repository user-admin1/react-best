import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/heojawon/",
	server: {
		watch: {
			usePolling: true,
		},
		hmr: {
			overlay: true,
		},
	},
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name].[ext]",
				chunkFileNames: "assets/[name].[hash].js",
				entryFileNames: "assets/[name].[hash].js",
			},
		},
	},
});
