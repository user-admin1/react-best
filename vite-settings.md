# Vite 설정 항목 정리

## 기본 구성

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
	// 여기에 설정들을 추가
});
```

---

## 1. root

```js
root: "./src";
// 프로젝트 루트를 ./src 폴더로 지정
```

---

## 2. base

```js
base: "/static/";
// 모든 리소스 경로 앞에 /static/이 붙음
```

---

## 3. mode

```js
mode: "development";
// 실행 시 모드를 명시적으로 설정
```

---

## 4. define

```js
define: {
	__APP_VERSION__: JSON.stringify("1.0.0");
}
// 전역 상수 정의, 코드 내에서 __APP_VERSION__ 사용 가능
```

---

## 5. publicDir

```js
publicDir: "static";
// 정적 파일 디렉토리 변경 (기본: public)
```

---

## 6. cacheDir

```js
cacheDir: "node_modules/.my-vite-cache";
// Vite 캐시 디렉토리 경로 변경
```

---

## 7. resolve

```js
resolve: {
  alias: {
    '@': '/src',
    '@utils': '/src/utils'
  },
  dedupe: ['react'],
  extensions: ['.js', '.ts', '.jsx', '.tsx']
}
// 모듈 경로, 중복 제거, 확장자 처리
```

---

## 8. server

```js
server: {
  port: 5173,
  host: true,
  open: true,
  cors: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```

---

## 9. build

```js
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: true,
  minify: 'esbuild',
  target: 'es2015',
  cssCodeSplit: true,
  emptyOutDir: true,
  rollupOptions: {
    input: './index.html',
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom']
      }
    }
  }
}
```

---

## 10. preview

```js
preview: {
  port: 8080,
  host: '0.0.0.0'
}
```

---

## 11. plugins

```js
import vue from "@vitejs/plugin-vue";

plugins: [vue()];
```

---

## 12. envDir

```js
envDir: "./env";
// 환경 변수 파일을 ./env 디렉토리에서 찾음
```

---

## 13. envPrefix

```js
envPrefix: ["VITE_", "APP_"];
// 특정 접두사를 가진 env 변수만 로딩
```

---

## 14. css

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`
    }
  },
  modules: {
    scopeBehaviour: 'local',
    globalModulePaths: [/global\.module\.scss$/]
  },
  devSourcemap: true
}
```

---

## 15. json

```js
json: {
  namedExports: true,
  stringify: false
}
```

---

## 16. esbuild

```js
esbuild: {
  jsxInject: `import React from 'react'`,
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
}
```

---

## 17. logLevel

```js
logLevel: "info";
// 'info' | 'warn' | 'error' | 'silent'
```

---

## 18. clearScreen

```js
clearScreen: false;
// 터미널 출력 초기화 방지
```

---

## 19. optimizeDeps

```js
optimizeDeps: {
  include: ['lodash-es'],
  exclude: ['some-large-lib']
}
```

---

## 20. ssr

```js
ssr: {
  external: ['firebase'],
  noExternal: ['my-lib']
}
```

---

## 21. worker

```js
worker: {
  format: 'es',
  plugins: []
}
```

---

## 22. appType

```js
appType: "spa";
// 또는 'mpa', 'custom'
```

---

## 전체 예시 모음 요약

```js
export default defineConfig({
	root: "./src",
	base: "/static/",
	mode: "production",
	define: {
		__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
	},
	publicDir: "static-assets",
	cacheDir: "node_modules/.vite-cache",
	resolve: {
		alias: {
			"@": "/src",
		},
		extensions: [".js", ".ts"],
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			input: "./index.html",
		},
	},
	plugins: [],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/global.scss";`,
			},
		},
	},
	envPrefix: "VITE_",
});
```

---

이 문서는 최신 Vite 기준으로 작성되었으며, 대부분의 설정은 Vite 3 이상에서 공통적으로 적용됩니다. 필요에 따라 `vite.config.ts`에서도 동일하게 사용할 수 있습니다.
더 고급 기능은 플러그인을 통해 확장 가능합니다.
