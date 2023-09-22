import { getCurrentInstance as getCurrentInstance$1, version as version$1, toRef, isRef, inject as inject$1, unref, computed, reactive, defineComponent as defineComponent$1, h, onUnmounted, createVNode, mergeProps, toRefs, Transition, ref, watch, nextTick, Text, watchEffect, provide, onScopeDispose, withDirectives, resolveDirective, vShow, Fragment as Fragment$1, capitalize, onServerPrefetch, shallowRef, camelize, toRaw, readonly, TransitionGroup, resolveDynamicComponent, cloneVNode, effectScope, warn as warn$1, toHandlers, Teleport, createTextVNode, vModelText, useSSRContext, createApp, onErrorCaptured, isReadonly, defineAsyncComponent, withCtx, Suspense } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { renderSSRHead } from '@unhead/ssr';
import { composableNames, getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { createMemoryHistory, createRouter, useRouter as useRouter$2, useRoute as useRoute$1, RouterView } from 'vue-router';
import { createError as createError$1, sendRedirect } from 'h3';
import { hasProtocol, parseURL, joinURL } from 'ufo';
import { CoreWarnCodes, CompileErrorCodes, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE as DEFAULT_LOCALE$1, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number } from '@intlify/core-base';
import { parse, serialize } from 'cookie-es';
import isHTTPS from 'is-https';
import { hash } from 'ohash';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-proxy';
import 'unenv/runtime/npm/debug';
import 'is-glob';
import 'micromatch';
import 'url';
import 'is-plain-obj';
import 'zlib';
import 'querystring';

var _a;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtAppCtx.call(nuxtApp, () => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin of _plugins2) {
    if (typeof plugin !== "function") {
      continue;
    }
    let _plugin = plugin;
    if (plugin.length > 1) {
      _plugin = (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a2, _b;
    return (((_a2 = a.meta) == null ? void 0 : _a2.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin, meta) {
  var _a2;
  if (typeof plugin === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin.hooks) {
      nuxtApp.hooks.addHooks(plugin.hooks);
    }
    if (plugin.setup) {
      return plugin.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin.name || ((_a2 = plugin.setup) == null ? void 0 : _a2.name),
    order: (meta == null ? void 0 : meta.order) || plugin.order || orderMap[plugin.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance$1();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const components$1 = {};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components$1) {
      nuxtApp.vueApp.component(name, components$1[name]);
      nuxtApp.vueApp.component("Lazy" + name, components$1[name]);
    }
  }
});
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version$1.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance$1() && inject$1(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
};
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance$1();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a2;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a2 = head.resolvedOptions) == null ? void 0 : _a2.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }, { "name": "mobile-web-app-capable", "content": "yes", "key": "mobile-web-app-capable" }, { "name": "apple-mobile-web-app-title", "content": "ChatGPT UI", "key": "apple-mobile-web-app-title" }, { "name": "description", "content": "- [English](https://wongsaang.github.io/chatgpt-ui/) - [中文](https://wongsaang.github.io/chatgpt-ui/zh/)", "key": "description" }, { "name": "theme-color", "content": "#000000", "key": "theme-color" }, { "property": "og:type", "content": "website", "key": "og:type" }, { "property": "og:title", "content": "ChatGPT UI", "key": "og:title" }, { "property": "og:site_name", "content": "Nuxt PWA", "key": "og:site_name" }, { "property": "og:description", "content": "- [English](https://wongsaang.github.io/chatgpt-ui/) - [中文](https://wongsaang.github.io/chatgpt-ui/zh/)", "key": "og:description" }, { "name": "twitter:card", "content": "summary", "key": "twitter:card" }], "link": [{ "rel": "icon", "href": "/_nuxt/icons/64x64.20fc1257.png", "key": "favicon" }, { "rel": "apple-touch-icon", "href": "/_nuxt/icons/512x512.maskable.20fc1257.png", "sizes": "512x512", "key": "favicon-apple" }, { "rel": "manifest", "href": "/manifest.json" }], "style": [], "script": [], "noscript": [], "title": "ChatGPT UI", "htmlAttrs": { "lang": "en" } };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter$1 = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance$1()) {
    return inject$1("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter$1();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      const redirect = () => nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302)).then(() => inMiddleware ? (
        /* abort route navigation */
        false
      ) : void 0);
      if (!isExternal && inMiddleware) {
        router.beforeEach((final) => final.fullPath === fullPath ? redirect() : void 0);
        return to;
      }
      return redirect();
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const __nuxt_page_meta$5 = {
  layout: "vuetify-app",
  middleware: ["auth"]
};
const __nuxt_page_meta$4 = {
  middleware: ["auth"]
};
const __nuxt_page_meta$3 = {
  layout: "vuetify-app"
};
const __nuxt_page_meta$2 = {
  layout: "vuetify-app"
};
const __nuxt_page_meta$1 = {
  layout: "vuetify-app",
  path: "/account/verify-email/:token",
  title: "Verify Email"
};
const __nuxt_page_meta = {
  middleware: ["auth"],
  path: "/:id?",
  keepalive: true
};
const _routes = [
  {
    name: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) ?? "account-onboarding",
    path: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) ?? "/account/onboarding",
    meta: __nuxt_page_meta$5 || {},
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./onboarding-3a88469e.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) ?? "account-resetPassword",
    path: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) ?? "/account/resetPassword",
    meta: __nuxt_page_meta$4 || {},
    alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
    redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
    component: () => import('./resetPassword-f7b6c7d2.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "account-signin",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/account/signin",
    meta: __nuxt_page_meta$3 || {},
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./signin-cde5553e.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "account-signup",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/account/signup",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./signup-fef51e56.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "account-verify-email",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/account/verify-email",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./verify-email-92fecae6.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "index",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./index-8d2819f2.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useNuxtApp();
  useRouter$1();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  auth: () => import('./auth-34ee0431.mjs')
};
const router_jmwsqit4Rs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b2, _c, _d;
      if (((_b2 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error2])), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a3;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const component of to.matched) {
        const componentMiddleware = component.meta.middleware;
        if (!componentMiddleware) {
          continue;
        }
        if (Array.isArray(componentMiddleware)) {
          for (const entry2 of componentMiddleware) {
            middlewareEntries.add(entry2);
          }
        } else {
          middlewareEntries.add(componentMiddleware);
        }
      }
      for (const entry2 of middlewareEntries) {
        const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a3 = namedMiddleware[entry2]) == null ? void 0 : _a3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
        if (!middleware) {
          throw new Error(`Unknown route middleware: '${entry2}'.`);
        }
        const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
        {
          if (result === false || result instanceof Error) {
            const error2 = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            await callWithNuxt(nuxtApp, showError, [error2]);
            return false;
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await callWithNuxt(nuxtApp, showError, [createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })]);
      } else if (to.redirectedFrom) {
        await callWithNuxt(nuxtApp, navigateTo, [to.fullPath || "/"]);
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #$4982
          force: true
        });
      } catch (error2) {
        await callWithNuxt(nuxtApp, showError, [error2]);
      }
    });
    return { provide: { router } };
  }
}, 1);
const getDefault = () => null;
function useAsyncData(...args) {
  var _a2;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? ((_a2 = options.default) == null ? void 0 : _a2.call(options)) ?? null),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve2, reject) => {
        try {
          resolve2(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick$1(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(((_a3 = options.default) == null ? void 0 : _a3.call(options)) ?? null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance$1()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick$1(obj, keys2) {
  const newObj = {};
  for (const key of keys2) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestHeaders(include) {
  var _a2;
  const headers = ((_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event.node.req.headers) ?? {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
function useRequestFetch() {
  var _a2;
  const event = (_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform: transform2,
    pick: pick2,
    watch: watch2,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform: transform2,
    pick: pick2,
    immediate,
    watch: watch2 === false ? [] : [_fetchOptions, _request, ...watch2 || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const composition_sLxaNGmlSL = /* @__PURE__ */ defineNuxtPlugin(() => {
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var sharedExports = {};
var shared$1 = {
  get exports() {
    return sharedExports;
  },
  set exports(v) {
    sharedExports = v;
  }
};
var shared_prod = {};
/*!
  * shared v9.3.0-beta.16
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
var hasRequiredShared_prod;
function requireShared_prod() {
  if (hasRequiredShared_prod)
    return shared_prod;
  hasRequiredShared_prod = 1;
  Object.defineProperty(shared_prod, "__esModule", { value: true });
  const inBrowser = false;
  let mark;
  let measure;
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject2(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const makeSymbol2 = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn2(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign2 = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isArray2 = Array.isArray;
  const isFunction2 = (val) => typeof val === "function";
  const isString2 = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isSymbol2 = (val) => typeof val === "symbol";
  const isObject2 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject2(val) && isFunction2(val.then) && isFunction2(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray2(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  shared_prod.assign = assign2;
  shared_prod.createEmitter = createEmitter;
  shared_prod.escapeHtml = escapeHtml;
  shared_prod.format = format;
  shared_prod.friendlyJSONstringify = friendlyJSONstringify;
  shared_prod.generateCodeFrame = generateCodeFrame;
  shared_prod.generateFormatCacheKey = generateFormatCacheKey;
  shared_prod.getGlobalThis = getGlobalThis;
  shared_prod.hasOwn = hasOwn;
  shared_prod.inBrowser = inBrowser;
  shared_prod.isArray = isArray2;
  shared_prod.isBoolean = isBoolean;
  shared_prod.isDate = isDate;
  shared_prod.isEmptyObject = isEmptyObject;
  shared_prod.isFunction = isFunction2;
  shared_prod.isNumber = isNumber;
  shared_prod.isObject = isObject2;
  shared_prod.isPlainObject = isPlainObject;
  shared_prod.isPromise = isPromise;
  shared_prod.isRegExp = isRegExp;
  shared_prod.isString = isString2;
  shared_prod.isSymbol = isSymbol2;
  shared_prod.makeSymbol = makeSymbol2;
  shared_prod.mark = mark;
  shared_prod.measure = measure;
  shared_prod.objectToString = objectToString;
  shared_prod.toDisplayString = toDisplayString;
  shared_prod.toTypeString = toTypeString;
  shared_prod.warn = warn2;
  return shared_prod;
}
(function(module) {
  {
    module.exports = requireShared_prod();
  }
})(shared$1);
/*!
  * vue-i18n v9.3.0-beta.16
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.3.0-beta.16";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    sharedExports.getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 29
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__numberParts");
const SetPluralRulesSymbol = sharedExports.makeSymbol("__setPluralRules");
sharedExports.makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ sharedExports.makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!sharedExports.isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!sharedExports.hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (sharedExports.isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (sharedExports.isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = sharedExports.isPlainObject(messages) ? messages : sharedExports.isArray(__i18n) ? {} : { [locale]: {} };
  if (sharedExports.isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy$1(resource, ret[locale2]);
        } else {
          deepCopy$1(resource, ret);
        }
      } else {
        sharedExports.isString(custom) && deepCopy$1(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (sharedExports.hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !sharedExports.isObject(val) || sharedExports.isArray(val);
function deepCopy$1(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (sharedExports.hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy$1(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages = sharedExports.isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(globalThis.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (sharedExports.isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (sharedExports.isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance$1() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance$1();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = sharedExports.isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : sharedExports.isString(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : sharedExports.isString(options.fallbackLocale) || sharedExports.isArray(options.fallbackLocale) || sharedExports.isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(sharedExports.isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(sharedExports.isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : sharedExports.isBoolean(options.missingWarn) || sharedExports.isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : sharedExports.isBoolean(options.fallbackWarn) || sharedExports.isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : sharedExports.isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = sharedExports.isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = sharedExports.isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = sharedExports.isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : sharedExports.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : sharedExports.isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = sharedExports.isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = sharedExports.isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return sharedExports.isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (sharedExports.isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => sharedExports.isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !sharedExports.isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, sharedExports.assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function normalize(values) {
    return values.map((val) => sharedExports.isString(val) || sharedExports.isNumber(val) || sharedExports.isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => sharedExports.isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = sharedExports.isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy$1(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = sharedExports.assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = sharedExports.assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID++;
  if (__root && sharedExports.inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponetI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys2) {
  if (keys2.length === 1 && keys2[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment$1 ? current.children : [current]
      ];
    }, []);
  } else {
    return keys2.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment$1;
}
const TranslationImpl = /* @__PURE__ */ defineComponent$1({
  /* eslint-disable */
  name: "i18n-t",
  props: sharedExports.assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => sharedExports.isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys2 = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = sharedExports.isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys2);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = sharedExports.assign({}, attrs);
      const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return sharedExports.isArray(target) && !sharedExports.isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (sharedExports.isString(props.format)) {
      options.key = props.format;
    } else if (sharedExports.isObject(props.format)) {
      if (sharedExports.isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? sharedExports.assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (sharedExports.isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (sharedExports.isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = sharedExports.assign({}, attrs);
    const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent$1({
  /* eslint-disable */
  name: "i18n-n",
  props: sharedExports.assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent$1({
  /* eslint-disable */
  name: "i18n-d",
  props: sharedExports.assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (sharedExports.inBrowser && i18n.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (sharedExports.inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (sharedExports.isString(value)) {
    return { path: value };
  } else if (sharedExports.isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (sharedExports.isString(locale)) {
    options.locale = locale;
  }
  if (sharedExports.isNumber(choice)) {
    options.plural = choice;
  }
  if (sharedExports.isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = sharedExports.isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = sharedExports.isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ sharedExports.makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = sharedExports.isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ sharedExports.makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (sharedExports.isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        if (__globalInjection) {
          injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          i18n.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance$1();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer$3(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = sharedExports.assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject$1(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return sharedExports.isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$3(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  {
    onUnmounted(() => {
      i18n.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags();
}
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = sharedExports.getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const isVue3 = true;
const STRATEGIES = {
  PREFIX: "prefix",
  PREFIX_EXCEPT_DEFAULT: "prefix_except_default",
  PREFIX_AND_DEFAULT: "prefix_and_default",
  NO_PREFIX: "no_prefix"
};
const DEFAULT_LOCALE = "";
const DEFAULT_STRATEGY = STRATEGIES.PREFIX_EXCEPT_DEFAULT;
const DEFAULT_TRAILING_SLASH = false;
const DEFAULT_ROUTES_NAME_SEPARATOR = "___";
const DEFAULT_LOCALE_ROUTE_NAME_SUFFIX = "default";
const DEFAULT_DETECTION_DIRECTION = "ltr";
const DEFAULT_BASE_URL = "";
const DEFAULT_DYNAMIC_PARAMS_KEY = "";
/*!
  * shared v9.3.0-beta.16
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const assign = Object.assign;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[vue-i18n-routing] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function isExportedGlobalComposer(target) {
  return target != null && !("__composer" in target) && !isRef(target.locale);
}
function isLegacyVueI18n$1(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function getComposer(i18n) {
  return isI18nInstance(i18n) ? isComposer(i18n.global) ? i18n.global : i18n.global.__composer : isVueI18n(i18n) ? i18n.__composer : i18n;
}
function getLocale(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locale.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locale : target.locale;
}
function getLocales(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locales.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locales : target.locales;
}
function getLocaleCodes(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.localeCodes.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.localeCodes : target.localeCodes;
}
function setLocale(i18n, locale) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  if (isComposer(target)) {
    {
      target.locale.value = locale;
    }
  } else if (isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target)) {
    target.locale = locale;
  } else {
    throw new Error("TODO:");
  }
}
function getRouteName(routeName) {
  return isString(routeName) ? routeName : isSymbol(routeName) ? routeName.toString() : "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix
}) {
  let name = getRouteName(routeName) + (strategy === "no_prefix" ? "" : routesNameSeparator + locale);
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.iso.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.iso.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales = [];
  for (const l of locales) {
    const { code: code2 } = l;
    const iso = l.iso || code2;
    normalizedLocales.push({ code: code2, iso });
  }
  const matchedLocales = matcher(normalizedLocales, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function proxyVueInstance(target) {
  return function() {
    return Reflect.apply(
      target,
      {
        getRouteBaseName: this.getRouteBaseName,
        localePath: this.localePath,
        localeRoute: this.localeRoute,
        localeLocation: this.localeLocation,
        resolveRoute: this.resolveRoute,
        switchLocalePath: this.switchLocalePath,
        localeHead: this.localeHead,
        i18n: this.$i18n,
        route: this.$route,
        router: this.$router
      },
      arguments
    );
  };
}
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = DEFAULT_BASE_URL,
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (c) => {
      const g = getComposer(i18n);
      c.locales = computed(() => g.locales.value);
      c.localeCodes = computed(() => g.localeCodes.value);
      c.baseUrl = computed(() => g.baseUrl.value);
      if (isFunction(orgComposerExtend)) {
        Reflect.apply(orgComposerExtend, pluginOptions, [c]);
      }
    };
    if (isVueI18n(i18n.global)) {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        if (isFunction(orgVueI18nExtend)) {
          Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const composer = getComposer(i18n);
    scope.run(() => extendComposer(composer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context }));
    if (isVueI18n(i18n.global)) {
      extendVueI18n(i18n.global, hooks.onExtendVueI18n);
    }
    const app = vue;
    const exported = i18n.mode === "composition" ? app.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, composer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      vue.mixin({
        methods: {
          resolveRoute: proxyVueInstance(resolveRoute),
          localePath: proxyVueInstance(localePath),
          localeRoute: proxyVueInstance(localeRoute),
          localeLocation: proxyVueInstance(localeLocation),
          switchLocalePath: proxyVueInstance(switchLocalePath),
          getRouteBaseName: proxyVueInstance(getRouteBaseName),
          localeHead: proxyVueInstance(localeHead)
        }
      });
    }
    if (app.unmount) {
      const unmountApp = app.unmount;
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendExportedGlobal(exported, g, hook) {
  const properties = [
    {
      locales: {
        get() {
          return g.locales.value;
        }
      },
      localeCodes: {
        get() {
          return g.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return g.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(g));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendVueI18n(vueI18n, hook) {
  const composer = getComposer(vueI18n);
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(vueI18n, key, descriptor);
    }
  }
}
function isPluginOptions(options) {
  return isObject$1(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}
const GlobalOptionsRegistory = makeSymbol("vue-i18n-routing-gor");
function registerGlobalOptions(router, options) {
  const _options = router[GlobalOptionsRegistory];
  if (_options) {
    warn("already registered global options");
  } else {
    router[GlobalOptionsRegistory] = options;
  }
}
function getGlobalOptions(router) {
  var _a2;
  return (_a2 = router[GlobalOptionsRegistory]) != null ? _a2 : {};
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
function createLocaleFromRouteGetter(localeCodes2, routesNameSeparator, defaultLocaleRouteNameSuffix) {
  const localesPattern = `(${localeCodes2.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes2);
  const getLocaleFromRoute = (route) => {
    if (isObject$1(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
function getI18nRoutingOptions(router, proxy, {
  defaultLocale = DEFAULT_LOCALE,
  defaultDirection = DEFAULT_DETECTION_DIRECTION,
  defaultLocaleRouteNameSuffix = DEFAULT_LOCALE_ROUTE_NAME_SUFFIX,
  routesNameSeparator = DEFAULT_ROUTES_NAME_SEPARATOR,
  strategy = DEFAULT_STRATEGY,
  trailingSlash = DEFAULT_TRAILING_SLASH,
  localeCodes: localeCodes2 = [],
  prefixable: prefixable2 = DefaultPrefixable,
  switchLocalePathIntercepter = DefaultSwitchLocalePathIntercepter,
  dynamicRouteParamsKey = DEFAULT_DYNAMIC_PARAMS_KEY
} = {}) {
  const options = getGlobalOptions(router);
  return {
    defaultLocale: proxy.defaultLocale || options.defaultLocale || defaultLocale,
    defaultDirection: proxy.defaultDirection || options.defaultDirection || defaultDirection,
    defaultLocaleRouteNameSuffix: proxy.defaultLocaleRouteNameSuffix || options.defaultLocaleRouteNameSuffix || defaultLocaleRouteNameSuffix,
    routesNameSeparator: proxy.routesNameSeparator || options.routesNameSeparator || routesNameSeparator,
    strategy: proxy.strategy || options.strategy || strategy,
    trailingSlash: proxy.trailingSlash || options.trailingSlash || trailingSlash,
    localeCodes: proxy.localeCodes || options.localeCodes || localeCodes2,
    prefixable: proxy.prefixable || options.prefixable || prefixable2,
    switchLocalePathIntercepter: proxy.switchLocalePathIntercepter || options.switchLocalePathIntercepter || switchLocalePathIntercepter,
    dynamicRouteParamsKey: proxy.dynamicRouteParamsKey || options.dynamicRouteParamsKey || dynamicRouteParamsKey
  };
}
function split(str, index) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}
function resolve(router, route, strategy, locale) {
  if (strategy === "prefix") {
    if (isArray(route.matched) && route.matched.length > 0) {
      return route.matched[0];
    }
    const [rootSlash, restPath] = split(route.path, 1);
    const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
    const _route = router.options.routes.find((r) => r.path === targetPath);
    if (_route == null) {
      return route;
    } else {
      const _resolevableRoute = assign({}, _route);
      _resolevableRoute.path = targetPath;
      return router.resolve(_resolevableRoute);
    }
  } else {
    return router.resolve(route);
  }
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(optons) {
  const { currentLocale, defaultLocale, strategy } = optons;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(givenRoute) {
  const router = this.router;
  const { routesNameSeparator } = getI18nRoutingOptions(router, this);
  const route = givenRoute != null ? isRef(givenRoute) ? unref(givenRoute) : givenRoute : this.route;
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(route, locale) {
  const localizedRoute = resolveRoute.call(this, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom || localizedRoute.fullPath;
}
function localeRoute(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function localeLocation(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function resolveRoute(route, locale) {
  const router = this.router;
  const i18n = this.i18n;
  const _locale = locale || getLocale(i18n);
  const { routesNameSeparator, defaultLocale, defaultLocaleRouteNameSuffix, strategy, trailingSlash, prefixable: prefixable2 } = getI18nRoutingOptions(router, this);
  let _route = route;
  if (isString(route)) {
    if (_route[0] === "/") {
      _route = { path: route };
    } else {
      _route = { name: route };
    }
  }
  let localizedRoute = assign({}, _route);
  if (localizedRoute.path && !localizedRoute.name) {
    let _resolvedRoute = null;
    try {
      _resolvedRoute = resolve(router, localizedRoute, strategy, _locale);
    } catch {
    }
    const resolvedRoute = _resolvedRoute;
    const resolvedRouteName = getRouteBaseName.call(this, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, {
          defaultLocale,
          strategy,
          routesNameSeparator,
          defaultLocaleRouteNameSuffix
        }),
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      {
        localizedRoute.state = resolvedRoute.state;
      }
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !localizedRoute.path) {
      localizedRoute.name = getRouteBaseName.call(this, this.route);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, {
      defaultLocale,
      strategy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    });
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (isVue3 ? resolvedRoute.name : resolvedRoute.route.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(route, key) {
  const metaDefault = {};
  if (key === DEFAULT_DYNAMIC_PARAMS_KEY) {
    return metaDefault;
  }
  const meta = route.meta;
  if (isRef(meta)) {
    return meta.value[key] || metaDefault;
  } else {
    return meta[key] || metaDefault;
  }
}
function switchLocalePath(locale) {
  const route = this.route;
  const name = getRouteBaseName.call(this, route);
  if (!name) {
    return "";
  }
  const { switchLocalePathIntercepter, dynamicRouteParamsKey } = getI18nRoutingOptions(this.router, this);
  const { params, ...routeCopy } = route;
  const langSwitchParams = getLocalizableMetaFromDynamicParams(route, dynamicRouteParamsKey)[locale] || {};
  const _baseRoute = {
    name,
    params: {
      ...params,
      ...langSwitchParams
    }
  };
  const baseRoute = assign({}, routeCopy, _baseRoute);
  let path = localePath.call(this, baseRoute, locale);
  path = switchLocalePathIntercepter(path, locale);
  return path;
}
function localeHead({ addDirAttribute = false, addSeoAttributes = false, identifierAttribute = "hid" } = {}) {
  const router = this.router;
  const i18n = this.i18n;
  const { defaultDirection } = getI18nRoutingOptions(router, this);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (i18n.locales == null || i18n.baseUrl == null) {
    return metaObject;
  }
  const locale = getLocale(i18n);
  const locales = getLocales(i18n);
  const currentLocale = getNormalizedLocales(locales).find((l) => l.code === locale) || {
    code: locale
  };
  const currentLocaleIso = currentLocale.iso;
  const currentLocaleDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentLocaleDir;
  }
  if (addSeoAttributes && locale && i18n.locales) {
    if (currentLocaleIso) {
      metaObject.htmlAttrs.lang = currentLocaleIso;
    }
    addHreflangLinks.call(this, locales, unref(i18n.baseUrl), metaObject.link, identifierAttribute);
    addCanonicalLinks.call(this, unref(i18n.baseUrl), metaObject.link, identifierAttribute, addSeoAttributes);
    addCurrentOgLocale(currentLocale, currentLocaleIso, metaObject.meta, identifierAttribute);
    addAlternateOgLocales(locales, currentLocaleIso, metaObject.meta, identifierAttribute);
  }
  return metaObject;
}
function addHreflangLinks(locales, baseUrl, link, identifierAttribute) {
  const router = this.router;
  const { defaultLocale, strategy } = getI18nRoutingOptions(router, this);
  if (strategy === STRATEGIES.NO_PREFIX) {
    return;
  }
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeIso = locale.iso;
    if (!localeIso) {
      warn("Locale ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeIso.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeIso, locale);
  }
  for (const [iso, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath.call(this, mapLocale.code);
    if (localePath2) {
      link.push({
        [identifierAttribute]: `i18n-alt-${iso}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: iso
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath.call(this, defaultLocale);
    if (localePath2) {
      link.push({
        [identifierAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
}
function addCanonicalLinks(baseUrl, link, identifierAttribute, seoAttributesOptions) {
  const route = this.route;
  const currentRoute = localeRoute.call(this, {
    ...route,
    name: getRouteBaseName.call(this, route)
  });
  if (currentRoute) {
    let href = toAbsoluteUrl(currentRoute.path, baseUrl);
    const canonicalQueries = isObject$1(seoAttributesOptions) && seoAttributesOptions.canonicalQueries || [];
    if (canonicalQueries.length) {
      const currentRouteQueryParams = currentRoute.query;
      const params = new URLSearchParams();
      for (const queryParamName of canonicalQueries) {
        if (queryParamName in currentRouteQueryParams) {
          const queryParamValue = currentRouteQueryParams[queryParamName];
          if (isArray(queryParamValue)) {
            queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
          } else {
            params.append(queryParamName, queryParamValue || "");
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        href = `${href}?${queryString}`;
      }
    }
    link.push({
      [identifierAttribute]: "i18n-can",
      rel: "canonical",
      href
    });
  }
}
function addCurrentOgLocale(currentLocale, currentLocaleIso, meta, identifierAttribute) {
  const hasCurrentLocaleAndIso = currentLocale && currentLocaleIso;
  if (!hasCurrentLocaleAndIso) {
    return;
  }
  meta.push({
    [identifierAttribute]: "i18n-og",
    property: "og:locale",
    content: hypenToUnderscore(currentLocaleIso)
  });
}
function addAlternateOgLocales(locales, currentLocaleIso, meta, identifierAttribute) {
  const localesWithoutCurrent = locales.filter((locale) => {
    const localeIso = locale.iso;
    return localeIso && localeIso !== currentLocaleIso;
  });
  if (localesWithoutCurrent.length) {
    const alternateLocales = localesWithoutCurrent.map((locale) => ({
      [identifierAttribute]: `i18n-og-alt-${locale.iso}`,
      property: "og:locale:alternate",
      content: hypenToUnderscore(locale.iso)
    }));
    meta.push(...alternateLocales);
  }
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//)) {
    return urlOrPath;
  }
  return baseUrl + urlOrPath;
}
function proxyForComposable(options, target) {
  const {
    router,
    route,
    i18n,
    defaultLocale,
    strategy,
    defaultLocaleRouteNameSuffix,
    trailingSlash,
    routesNameSeparator
  } = options;
  return function(...args) {
    return Reflect.apply(
      target,
      {
        router,
        route,
        i18n,
        defaultLocale,
        strategy,
        defaultLocaleRouteNameSuffix,
        trailingSlash,
        routesNameSeparator
      },
      args
    );
  };
}
function useSwitchLocalePath({
  router = useRouter$2(),
  route = useRoute$1(),
  i18n = useI18n(),
  defaultLocale = void 0,
  defaultLocaleRouteNameSuffix = void 0,
  routesNameSeparator = void 0,
  strategy = void 0,
  trailingSlash = void 0
} = {}) {
  return proxyForComposable(
    {
      router,
      route,
      i18n,
      defaultLocale,
      defaultLocaleRouteNameSuffix,
      routesNameSeparator,
      strategy,
      trailingSlash
    },
    switchLocalePath
  );
}
const localeCodes = ["en", "zh-CN", "ru", "fr", "es"];
const localeMessages = {
  "en": [{ key: "../lang/en-US.json", load: () => import(
    './en-US-ef517963.mjs'
    /* webpackChunkName: "lang_en_US_json_en_US_json" */
  ) }],
  "zh-CN": [{ key: "../lang/zh-CN.json", load: () => import(
    './zh-CN-c4a058ce.mjs'
    /* webpackChunkName: "lang_zh_CN_json_zh_CN_json" */
  ) }],
  "ru": [{ key: "../lang/ru-RU.json", load: () => import(
    './ru-RU-7913675f.mjs'
    /* webpackChunkName: "lang_ru_RU_json_ru_RU_json" */
  ) }],
  "fr": [{ key: "../lang/fr-FR.json", load: () => import(
    './fr-FR-515b1d69.mjs'
    /* webpackChunkName: "lang_fr_FR_json_fr_FR_json" */
  ) }],
  "es": [{ key: "../lang/es-ES.json", load: () => import(
    './es-ES-a8940842.mjs'
    /* webpackChunkName: "lang_es_ES_json_es_ES_json" */
  ) }]
};
const additionalMessages = Object({ "en": [], "zh-CN": [], "ru": [], "fr": [], "es": [] });
const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({});
  const vueI18nOptionsLoader = async (context2) => Object({ "fallbackLocale": "en", "messages": Object({}) });
  nuxtI18nOptions.vueI18n = await vueI18nOptionsLoader();
  nuxtI18nOptions.locales = [Object({ "code": "en", "iso": "en-US", "name": "English", "file": "en-US.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/en-US.json" }), Object({ "code": "zh-CN", "iso": "zh-CN", "name": "简体中文", "file": "zh-CN.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/zh-CN.json" }), Object({ "code": "ru", "iso": "ru-RU", "name": "Русский", "file": "ru-RU.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/ru-RU.json" }), Object({ "code": "fr", "iso": "fr-FR", "name": "Français", "file": "fr-FR.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/fr-FR.json" }), Object({ "code": "es", "iso": "es-ES", "name": "Español", "file": "es-ES.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/es-ES.json" })];
  nuxtI18nOptions.defaultLocale = "en";
  nuxtI18nOptions.defaultDirection = "ltr";
  nuxtI18nOptions.routesNameSeparator = "___";
  nuxtI18nOptions.trailingSlash = false;
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default";
  nuxtI18nOptions.strategy = "no_prefix";
  nuxtI18nOptions.lazy = true;
  nuxtI18nOptions.langDir = "lang";
  nuxtI18nOptions.rootRedirect = null;
  nuxtI18nOptions.detectBrowserLanguage = Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true });
  nuxtI18nOptions.differentDomains = false;
  nuxtI18nOptions.baseUrl = "";
  nuxtI18nOptions.dynamicRouteParams = false;
  nuxtI18nOptions.customRoutes = "page";
  nuxtI18nOptions.pages = Object({});
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false;
  nuxtI18nOptions.onBeforeLanguageSwitch = () => "";
  nuxtI18nOptions.onLanguageSwitched = () => null;
  nuxtI18nOptions.types = void 0;
  nuxtI18nOptions.debug = false;
  return nuxtI18nOptions;
};
const nuxtI18nOptionsDefault = Object({ vueI18n: void 0, locales: [], defaultLocale: "", defaultDirection: "ltr", routesNameSeparator: "___", trailingSlash: false, defaultLocaleRouteNameSuffix: "default", strategy: "prefix_except_default", lazy: false, langDir: null, rootRedirect: null, detectBrowserLanguage: Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true }), differentDomains: false, baseUrl: "", dynamicRouteParams: false, customRoutes: "page", pages: Object({}), skipSettingLocaleOnNavigate: false, onBeforeLanguageSwitch: () => "", onLanguageSwitched: () => null, types: void 0, debug: false });
const nuxtI18nInternalOptions = Object({ __normalizedLocales: [Object({ "code": "en", "iso": "en-US", "name": "English", "file": "en-US.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/en-US.json" }), Object({ "code": "zh-CN", "iso": "zh-CN", "name": "简体中文", "file": "zh-CN.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/zh-CN.json" }), Object({ "code": "ru", "iso": "ru-RU", "name": "Русский", "file": "ru-RU.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/ru-RU.json" }), Object({ "code": "fr", "iso": "fr-FR", "name": "Français", "file": "fr-FR.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/fr-FR.json" }), Object({ "code": "es", "iso": "es-ES", "name": "Español", "file": "es-ES.json", "path": "E:/work/KiimGma/web/chatgpt-ui-main/lang/es-ES.json" })] });
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const isSSG = false;
function formatMessage(message) {
  return NUXT_I18N_MODULE_ID + " " + message;
}
function isLegacyVueI18n(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const ret = isComposer(target) ? target[name].value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n(target) ? target[name] : target[name];
  return ret;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function proxyNuxt(nuxt, target) {
  return function() {
    return Reflect.apply(
      target,
      {
        i18n: nuxt.$i18n,
        getRouteBaseName: nuxt.$getRouteBaseName,
        localePath: nuxt.$localePath,
        localeRoute: nuxt.$localeRoute,
        switchLocalePath: nuxt.$switchLocalePath,
        localeHead: nuxt.$localeHead,
        route: nuxt.$router.currentRoute.value,
        router: nuxt.$router
      },
      // eslint-disable-next-line prefer-rest-params
      arguments
    );
  };
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function deepCopy(src, des) {
  for (const key in src) {
    if (sharedExports.isObject(src[key])) {
      if (!sharedExports.isObject(des[key]))
        des[key] = {};
      deepCopy(src[key], des[key]);
    } else {
      des[key] = src[key];
    }
  }
}
async function loadMessage(context, loader) {
  let message = null;
  try {
    const getter = await loader().then((r) => r.default || r);
    if (sharedExports.isFunction(getter)) {
      console.error(formatMessage("Not support executable file (e.g. js, cjs, mjs)"));
    } else {
      message = getter;
    }
  } catch (e) {
    console.error(formatMessage("Failed locale loading: " + e.message));
  }
  return message;
}
const loadedMessages = /* @__PURE__ */ new Map();
async function loadLocale(context, locale, setter) {
  {
    const loaders = localeMessages[locale];
    if (loaders != null) {
      if (loaders.length === 1) {
        const { key, load } = loaders[0];
        let message = null;
        if (loadedMessages.has(key)) {
          message = loadedMessages.get(key);
        } else {
          message = await loadMessage(context, load);
          if (message != null) {
            loadedMessages.set(key, message);
          }
        }
        if (message != null) {
          setter(locale, message);
        }
      } else if (loaders.length > 1) {
        const targetMessage = {};
        for (const { key, load } of loaders) {
          let message = null;
          if (loadedMessages.has(key)) {
            message = loadedMessages.get(key);
          } else {
            message = await loadMessage(context, load);
            if (message != null) {
              loadedMessages.set(key, message);
            }
          }
          if (message != null) {
            deepCopy(message, targetMessage);
          }
        }
        setter(locale, targetMessage);
      }
    }
  }
}
async function loadAdditionalLocale(context, locale, merger) {
  {
    const additionalLoaders = additionalMessages[locale] || [];
    for (const additionalLoader of additionalLoaders) {
      const message = await loadMessage(context, additionalLoader);
      if (message != null) {
        merger(locale, message);
      }
    }
  }
}
function getBrowserLocale(options, context) {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(options.__normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getLocaleCookie(context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  localeCodes: localeCodes2 = []
} = {}) {
  if (useCookie) {
    let localeCode;
    {
      const cookie = useRequestHeaders(["cookie"]);
      if ("cookie" in cookie) {
        const parsedCookie = parse(cookie["cookie"]);
        localeCode = parsedCookie[cookieKey];
      }
    }
    if (localeCode && localeCodes2.includes(localeCode)) {
      return localeCode;
    }
  }
}
function setLocaleCookie(locale, context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  cookieDomain = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieDomain,
  cookieSecure = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieSecure,
  cookieCrossOrigin = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieCrossOrigin
} = {}) {
  if (!useCookie) {
    return;
  }
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: cookieCrossOrigin ? "none" : "lax",
    secure: cookieCrossOrigin || cookieSecure
  };
  if (cookieDomain) {
    cookieOptions.domain = cookieDomain;
  }
  {
    if (context.res) {
      const { res } = context;
      let headers = res.getHeader("Set-Cookie") || [];
      if (!sharedExports.isArray(headers)) {
        headers = [String(headers)];
      }
      const redirectCookie = serialize(cookieKey, locale, cookieOptions);
      headers.push(redirectCookie);
      res.setHeader("Set-Cookie", headers);
    }
  }
}
const DefaultDetectBrowserLanguageFromResult = {
  locale: "",
  stat: false,
  reason: "unknown",
  from: "unknown"
};
function detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions2, localeCodes2 = [], locale = "", mode) {
  const { strategy } = nuxtI18nOptions;
  const { redirectOn, alwaysRedirect, useCookie, fallbackLocale } = nuxtI18nOptions.detectBrowserLanguage;
  const path = sharedExports.isString(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root") {
      if (path !== "/") {
        return { locale: "", stat: false, reason: "not_redirect_on_root" };
      }
    } else if (redirectOn === "no prefix") {
      if (!alwaysRedirect && path.match(getLocalesRegex(localeCodes2))) {
        return { locale: "", stat: false, reason: "not_redirect_on_no_prefix" };
      }
    }
  }
  let localeFrom = "unknown";
  let cookieLocale;
  let matchedLocale;
  if (useCookie) {
    matchedLocale = cookieLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
    localeFrom = "cookie";
  }
  if (!matchedLocale) {
    matchedLocale = getBrowserLocale(nuxtI18nInternalOptions2);
    localeFrom = "navigator_or_header";
  }
  const finalLocale = matchedLocale || fallbackLocale;
  if (!matchedLocale && fallbackLocale) {
    localeFrom = "fallback";
  }
  const vueI18nLocale = locale || nuxtI18nOptions.vueI18n.locale;
  if (finalLocale && (!useCookie || alwaysRedirect || !cookieLocale)) {
    if (strategy === "no_prefix") {
      return { locale: finalLocale, stat: true, from: localeFrom };
    } else {
      if (finalLocale !== vueI18nLocale) {
        return { locale: finalLocale, stat: true, from: localeFrom };
      } else {
        if (alwaysRedirect && path === "/") {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
    }
  }
  if (mode === "ssg_setup" && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  return { locale: "", stat: false, reason: "not_found_match" };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = sharedExports.isArray(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales) {
  let host = getHost() || "";
  if (host) {
    const matchingLocale = locales.find((locale) => locale.domain === host);
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode, locales, nuxt) {
  const lang = locales.find((locale) => locale.code === localeCode);
  if (lang && lang.domain) {
    if (hasProtocol(lang.domain)) {
      return lang.domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxt);
      protocol = req && isHTTPS(req) ? "https" : "http";
    }
    return protocol + "://" + lang.domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (sharedExports.isArray(fallback)) {
    fallbackLocales = fallback;
  } else if (sharedExports.isObject(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (sharedExports.isString(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(context, messages, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, langDir, lazy } = options;
  const setter = (locale, message) => {
    const base = messages[locale] || {};
    messages[locale] = { ...base, ...message };
  };
  if (langDir) {
    if (lazy && fallbackLocale) {
      const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
    }
    const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
    await Promise.all(locales.map((locale) => loadLocale(context, locale, setter)));
  }
  return messages;
}
async function mergeAdditionalMessages(context, i18n, locale) {
  await loadAdditionalLocale(
    context,
    locale,
    (locale2, message) => mergeLocaleMessage(i18n, locale2, message)
  );
}
async function loadAndSetLocale(newLocale, context, i18n, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  initial = false,
  lazy = false,
  langDir = null
} = {}) {
  let ret = false;
  const oldLocale = getLocale(i18n);
  if (!newLocale) {
    return [ret, oldLocale];
  }
  if (!initial && differentDomains) {
    return [ret, oldLocale];
  }
  if (oldLocale === newLocale) {
    return [ret, oldLocale];
  }
  const localeOverride = onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context);
  const localeCodes2 = getLocaleCodes(i18n);
  if (localeOverride && localeCodes2 && localeCodes2.includes(localeOverride)) {
    if (localeOverride === oldLocale) {
      return [ret, oldLocale];
    }
    newLocale = localeOverride;
  }
  if (langDir) {
    const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
    if (lazy) {
      const setter = (locale, message) => mergeLocaleMessage(i18n, locale, message);
      if (i18nFallbackLocales) {
        const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
        await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
      }
      await loadLocale(context, newLocale, setter);
    }
  }
  await mergeAdditionalMessages(context, i18n, newLocale);
  if (skipSettingLocaleOnNavigate) {
    return [ret, oldLocale];
  }
  if (useCookie) {
    setCookieLocale(i18n, newLocale);
  }
  setLocale(i18n, newLocale);
  onLanguageSwitched(i18n, oldLocale, newLocale);
  ret = true;
  return [ret, oldLocale];
}
function detectLocale(route, context, routeLocaleGetter, nuxtI18nOptions, initialLocaleLoader, normalizedLocales, localeCodes2 = [], ssgStatus = "normal") {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  const initialLocale = sharedExports.isFunction(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const { locale: browserLocale, stat, reason, from } = nuxtI18nOptions.detectBrowserLanguage ? detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions, localeCodes2, initialLocale, ssgStatus) : DefaultDetectBrowserLanguageFromResult;
  if (reason === "detect_ignore_on_ssg") {
    return initialLocale;
  }
  let finalLocale = browserLocale;
  if (!finalLocale) {
    if (differentDomains) {
      finalLocale = getLocaleDomain(normalizedLocales);
    } else if (strategy !== "no_prefix") {
      finalLocale = routeLocaleGetter(route);
    } else {
      if (!nuxtI18nOptions.detectBrowserLanguage) {
        finalLocale = initialLocale;
      }
    }
  }
  if (!finalLocale && nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie) {
    finalLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
  }
  if (!finalLocale) {
    finalLocale = defaultLocale || "";
  }
  return finalLocale;
}
function detectRedirect(route, context, targetLocale, routeLocaleGetter, nuxtI18nOptions) {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  let redirectPath = "";
  if (!differentDomains && strategy !== "no_prefix" && // skip if already on the new locale unless the strategy is "prefix_and_default" and this is the default
  // locale, in which case we might still redirect as we prefer unprefixed route in this case.
  (routeLocaleGetter(route) !== targetLocale || strategy === "prefix_and_default" && targetLocale === defaultLocale)) {
    const { fullPath } = route;
    const decodedRoute = decodeURI(fullPath);
    const routePath = context.$switchLocalePath(targetLocale) || context.$localePath(fullPath, targetLocale);
    if (sharedExports.isString(routePath) && routePath && routePath !== fullPath && routePath !== decodedRoute && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  if (differentDomains || isSSG) {
    const switchLocalePath2 = useSwitchLocalePath({
      i18n: getComposer(context.$i18n),
      route,
      router: context.$router
    });
    const routePath = switchLocalePath2(targetLocale);
    if (sharedExports.isString(routePath)) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return sharedExports.isObject(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  {
    return navigateTo(redirectPath, { redirectCode: status });
  }
}
async function navigate(args, {
  status = 301,
  rootRedirect = nuxtI18nOptionsDefault.rootRedirect,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate
} = {}) {
  const { i18n, locale, route } = args;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (sharedExports.isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    return _navigate(redirectPath, status);
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    {
      state.value = redirectPath;
    }
  }
}
function inejctNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", i18n.global);
  for (const pair of [
    ["getRouteBaseName", getRouteBaseName],
    ["localePath", localePath],
    ["localeRoute", localeRoute],
    ["switchLocalePath", switchLocalePath],
    ["localeHead", localeHead]
  ]) {
    defineGetter(nuxt, "$" + pair[0], proxyNuxt(nuxt, pair[1]));
  }
}
function extendPrefixable(differentDomains) {
  return (opts) => {
    return DefaultPrefixable(opts) && !differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxt) {
  return (path, locale) => {
    if (differentDomains) {
      const domain = getDomainFromLocale(locale, normalizedLocales, nuxt);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl(baseUrl, options) {
  return (context) => {
    if (sharedExports.isFunction(baseUrl)) {
      return baseUrl(context);
    }
    const { differentDomains, localeCodeLoader, normalizedLocales } = options;
    const localeCode = sharedExports.isFunction(localeCodeLoader) ? localeCodeLoader() : localeCodeLoader;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode, normalizedLocales, options.nuxt);
      if (domain) {
        return domain;
      }
    }
    return baseUrl;
  };
}
const i18n_yfWm7jX06p = /* @__PURE__ */ defineNuxtPlugin(async (nuxt) => {
  let __temp, __restore;
  const router = useRouter$1();
  const route = useRoute();
  const { vueApp: app } = nuxt;
  const nuxtContext = nuxt;
  const nuxtI18nOptions = ([__temp, __restore] = executeAsync(() => resolveNuxtI18nOptions()), __temp = await __temp, __restore(), __temp);
  const useCookie = nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie;
  const { __normalizedLocales: normalizedLocales } = nuxtI18nInternalOptions;
  const {
    defaultLocale,
    differentDomains,
    skipSettingLocaleOnNavigate,
    lazy,
    langDir,
    routesNameSeparator,
    defaultLocaleRouteNameSuffix,
    strategy,
    rootRedirect
  } = nuxtI18nOptions;
  nuxtI18nOptions.baseUrl = extendBaseUrl(nuxtI18nOptions.baseUrl, {
    differentDomains,
    nuxt: nuxtContext,
    localeCodeLoader: defaultLocale,
    normalizedLocales
  });
  const getLocaleFromRoute = createLocaleFromRouteGetter(localeCodes, routesNameSeparator, defaultLocaleRouteNameSuffix);
  const vueI18nOptions = nuxtI18nOptions.vueI18n;
  vueI18nOptions.messages = vueI18nOptions.messages || {};
  vueI18nOptions.fallbackLocale = vueI18nOptions.fallbackLocale ?? false;
  registerGlobalOptions(router, {
    ...nuxtI18nOptions,
    dynamicRouteParamsKey: "nuxtI18n",
    switchLocalePathIntercepter: extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxtContext),
    prefixable: extendPrefixable(differentDomains)
  });
  const getDefaultLocale = (defaultLocale2) => defaultLocale2 || vueI18nOptions.locale || "en-US";
  let initialLocale = detectLocale(
    route,
    nuxt.ssrContext,
    getLocaleFromRoute,
    nuxtI18nOptions,
    getDefaultLocale(defaultLocale),
    normalizedLocales,
    localeCodes,
    "normal"
  );
  vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(nuxtContext, vueI18nOptions.messages, {
    ...nuxtI18nOptions,
    initialLocale,
    fallbackLocale: vueI18nOptions.fallbackLocale,
    localeCodes
  })), __temp = await __temp, __restore(), __temp);
  initialLocale = getDefaultLocale(initialLocale);
  const i18n = createI18n({
    ...vueI18nOptions,
    locale: initialLocale
  });
  let notInitialSetup = true;
  const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
  extendI18n(i18n, {
    locales: nuxtI18nOptions.locales,
    localeCodes,
    baseUrl: nuxtI18nOptions.baseUrl,
    context: nuxtContext,
    hooks: {
      onExtendComposer(composer) {
        composer.strategy = strategy;
        composer.localeProperties = computed(() => {
          return normalizedLocales.find((l) => l.code === composer.locale.value) || {
            code: composer.locale.value
          };
        });
        composer.setLocale = async (locale) => {
          const localeSetup = isInitialLocaleSetup(locale);
          const [modified] = await loadAndSetLocale(locale, nuxtContext, i18n, {
            useCookie,
            differentDomains,
            initial: localeSetup,
            skipSettingLocaleOnNavigate,
            lazy,
            langDir
          });
          if (modified && localeSetup) {
            notInitialSetup = false;
          }
          const redirectPath = detectRedirect(route, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
          await navigate(
            {
              i18n,
              redirectPath,
              locale,
              route
            },
            {
              differentDomains,
              skipSettingLocaleOnNavigate,
              rootRedirect
            }
          );
        };
        composer.differentDomains = differentDomains;
        composer.getBrowserLocale = () => getBrowserLocale(nuxtI18nInternalOptions, nuxt.ssrContext);
        composer.getLocaleCookie = () => getLocaleCookie(nuxt.ssrContext, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes });
        composer.setLocaleCookie = (locale) => setLocaleCookie(locale, nuxt.ssrContext, nuxtI18nOptions.detectBrowserLanguage || void 0);
        composer.onBeforeLanguageSwitch = nuxtI18nOptions.onBeforeLanguageSwitch;
        composer.onLanguageSwitched = nuxtI18nOptions.onLanguageSwitched;
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) {
            return;
          }
          setLocale(i18n, i18n.__pendingLocale);
          if (i18n.__resolvePendingLocalePromise) {
            await i18n.__resolvePendingLocalePromise();
          }
          i18n.__pendingLocale = void 0;
        };
        composer.waitForPendingLocaleChange = async () => {
          if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
            await i18n.__pendingLocalePromise;
          }
        };
      },
      onExtendExportedGlobal(g) {
        return {
          strategy: {
            get() {
              return g.strategy;
            }
          },
          localeProperties: {
            get() {
              return g.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(g.setLocale, g, [locale]);
            }
          },
          differentDomains: {
            get() {
              return g.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(g.getBrowserLocale, g, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(g.getLocaleCookie, g, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(g.setLocaleCookie, g, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g.onBeforeLanguageSwitch, g, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(g.onLanguageSwitched, g, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(g.finalizePendingLocaleChange, g, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(g.waitForPendingLocaleChange, g, []);
            }
          }
        };
      },
      onExtendVueI18n(composer) {
        return {
          strategy: {
            get() {
              return composer.strategy;
            }
          },
          localeProperties: {
            get() {
              return composer.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
            }
          },
          differentDomains: {
            get() {
              return composer.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(composer.getBrowserLocale, composer, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(composer.getLocaleCookie, composer, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
            }
          }
        };
      }
    }
  });
  const pluginOptions = {
    __composerExtend: (c) => {
      const g = getComposer(i18n);
      c.strategy = g.strategy;
      c.localeProperties = computed(() => g.localeProperties.value);
      c.setLocale = g.setLocale;
      c.differentDomains = g.differentDomains;
      c.getBrowserLocale = g.getBrowserLocale;
      c.getLocaleCookie = g.getLocaleCookie;
      c.setLocaleCookie = g.setLocaleCookie;
      c.onBeforeLanguageSwitch = g.onBeforeLanguageSwitch;
      c.onLanguageSwitched = g.onLanguageSwitched;
      c.finalizePendingLocaleChange = g.finalizePendingLocaleChange;
      c.waitForPendingLocaleChange = g.waitForPendingLocaleChange;
    }
  };
  app.use(i18n, pluginOptions);
  inejctNuxtHelpers(nuxtContext, i18n);
  [__temp, __restore] = executeAsync(() => mergeAdditionalMessages(nuxtContext, i18n, initialLocale)), await __temp, __restore();
  addRouteMiddleware(
    "locale-changing",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
      let __temp2, __restore2;
      const locale = detectLocale(
        to,
        nuxt.ssrContext,
        getLocaleFromRoute,
        nuxtI18nOptions,
        () => {
          return getLocale(i18n) || getDefaultLocale(defaultLocale);
        },
        normalizedLocales,
        localeCodes,
        "normal"
      );
      const localeSetup = isInitialLocaleSetup(locale);
      const [modified] = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, nuxtContext, i18n, {
        useCookie,
        differentDomains,
        initial: localeSetup,
        skipSettingLocaleOnNavigate,
        lazy,
        langDir
      })), __temp2 = await __temp2, __restore2(), __temp2);
      if (modified && localeSetup) {
        notInitialSetup = false;
      }
      const redirectPath = detectRedirect(to, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
      return navigate(
        {
          i18n,
          redirectPath,
          locale,
          route: to
        },
        {
          differentDomains,
          skipSettingLocaleOnNavigate,
          rootRedirect
        }
      );
    }),
    { global: true }
  );
}, 1);
const preference = "system";
const plugin_server_XNCxeHyTuP = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter$1().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const MODELS = {
  "gpt-3.5-turbo": {
    name: "gpt-3.5-turbo",
    frequency_penalty: 0,
    presence_penalty: 0,
    total_tokens: 4096,
    max_tokens: 1e3,
    temperature: 0.7,
    top_p: 1
  },
  "gpt-4": {
    name: "gpt-4",
    frequency_penalty: 0,
    presence_penalty: 0,
    total_tokens: 8192,
    max_tokens: 2e3,
    temperature: 0.7,
    top_p: 1
  }
};
const DEFAULT_MODEL_NAME = "gpt-3.5-turbo";
const get = (key) => {
  return;
};
const getCurrentModel = () => {
  let model = get();
  if (!model) {
    model = MODELS[DEFAULT_MODEL_NAME];
  }
  return model;
};
const setApiKey = (val) => {
  const apiKey = useApiKey();
  apiKey.value = val;
};
const getStoredApiKey = () => {
  return get();
};
const useCurrentModel = () => useState("currentModel", () => getCurrentModel());
const useApiKey = () => useState("apiKey", () => getStoredApiKey());
const useConversations = () => useState("conversations", () => []);
const useUser = () => useState("user", () => null);
const useDrawer = () => useState("drawer", () => false);
const initApiKey_CXMqkhj1VY = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", async () => {
    const apiKey = useApiKey();
    apiKey.value = getStoredApiKey();
  });
});
const getDefaultConversationData = () => {
  useNuxtApp();
  return {
    id: null,
    topic: null,
    messages: [],
    loadingMessages: false
  };
};
const getConversations = async () => {
  const { data, error } = await useAuthFetch("/api/chat/conversations/");
  if (!error.value) {
    return data.value;
  }
  return [];
};
const addConversation = (conversation) => {
  const conversations = useConversations();
  conversations.value = [conversation, ...conversations.value];
};
const genTitle = async (conversationId) => {
  const { $i18n, $settings } = useNuxtApp();
  const openaiApiKey = useApiKey();
  const { data, error } = await useAuthFetch("/api/gen_title/", {
    method: "POST",
    body: {
      conversationId,
      prompt: $i18n.t("genTitlePrompt"),
      openaiApiKey: $settings.open_api_key_setting === "True" ? openaiApiKey.value : null
    }
  });
  if (!error.value) {
    const conversations = useConversations();
    let index = conversations.value.findIndex((item) => item.id === conversationId);
    if (index === -1) {
      index = 0;
    }
    conversations.value[index].topic = data.value.title;
    return data.value.title;
  }
  return null;
};
const fetchUser = async () => {
  return useMyFetch("/api/account/user/");
};
const setUser = (userData) => {
  const user = useUser();
  user.value = userData;
};
const logout = () => {
  const user = useUser();
  user.value = null;
  return navigateTo("/account/signin");
};
const useMyFetch = (url, options = {}) => {
  let defaultOptions = {
    headers: {
      Accept: "application/json"
    }
  };
  {
    defaultOptions.baseURL = process.env.SERVER_DOMAIN;
  }
  return useFetch(url, Object.assign(defaultOptions, options), "$HfV1EJwGX7");
};
const useAuthFetch = async (url, options = {}) => {
  const res = await useMyFetch(url, options);
  if (res.error.value && res.error.value.status === 401) {
    await logout();
  }
  return res;
};
const transformData = (list) => {
  const result = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    result[item.name] = item.value;
  }
  return result;
};
const settings_2MnfoqQ5ue = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", async () => {
    let settings = {};
    const { data, error } = await useAuthFetch("/api/chat/settings/", {
      method: "GET"
    });
    if (!error.value) {
      settings = transformData(data.value);
    }
    nuxtApp.provide("settings", settings);
  });
});
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0)
    return obj === void 0 ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (obj == null)
    return fallback;
  return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  return props.every((p) => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string")
    return fallback;
  if (obj[path] !== void 0)
    return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property == null)
    return item === void 0 ? fallback : item;
  if (item !== Object(item)) {
    if (typeof property !== "function")
      return fallback;
    const value2 = property(item, fallback);
    return typeof value2 === "undefined" ? fallback : value2;
  }
  if (typeof property === "string")
    return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property))
    return getNestedValue(item, property, fallback);
  if (typeof property !== "function")
    return fallback;
  const value = property(item, fallback);
  return typeof value === "undefined" ? fallback : value;
}
function createRange(length) {
  let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length
  }, (v, k) => start + k);
}
function convertToUnit(str) {
  let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (str == null || str === "") {
    return void 0;
  } else if (isNaN(+str)) {
    return String(str);
  } else if (!isFinite(+str)) {
    return void 0;
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function isComponentInstance(obj) {
  return obj == null ? void 0 : obj.$el;
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
const keyValues = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function keys(o) {
  return Object.keys(o);
}
function pick(obj, paths) {
  const found = /* @__PURE__ */ Object.create(null);
  const rest = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key)) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach((prop) => delete clone[prop]);
  return clone;
}
function filterInputAttrs(attrs) {
  return pick(attrs, ["class", "style", "id", /^data-/]);
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function clamp(value) {
  let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(min, Math.min(max, value));
}
function getDecimals(value) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes(".") ? trimmedStr.length - trimmedStr.indexOf(".") - 1 : 0;
}
function padEnd(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return str + char.repeat(Math.max(0, length - str.length));
}
function chunk(str) {
  let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function humanReadableFileSize(bytes) {
  let base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
function mergeDeep() {
  let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function toKebabCase() {
  let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (toKebabCase.cache.has(str))
    return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== "object")
    return [];
  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
function getEventCoordinates(e) {
  if ("touches" in e) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    };
  }
  return {
    clientX: e.clientX,
    clientY: e.clientY
  };
}
function destructComputed(getter) {
  const refs = reactive({});
  const base = computed(getter);
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key];
    }
  }, {
    flush: "sync"
  });
  return toRefs(refs);
}
function includes(arr, val) {
  return arr.includes(val);
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const EventProp = [Function, Array];
function hasEvent(props, name) {
  name = "on" + capitalize(name);
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (Array.isArray(handler)) {
    for (const h2 of handler) {
      h2(...args);
    }
  } else if (typeof handler === "function") {
    handler(...args);
  }
}
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start")
    return isRtl ? "right" : "left";
  if (str === "end")
    return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
class Box {
  constructor(_ref) {
    let {
      x,
      y,
      width,
      height
    } = _ref;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function getOverflow(a, b) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right)
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom)
    }
  };
}
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith("matrix3d(")) {
      ta = tx.slice(9, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[5];
      dx = +ta[12];
      dy = +ta[13];
    } else if (tx.startsWith("matrix(")) {
      ta = tx.slice(7, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[3];
      dx = +ta[4];
      dy = +ta[5];
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
    const w = sx ? rect.width / sx : el.offsetWidth + 1;
    const h2 = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x,
      y,
      width: w,
      height: h2
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === "undefined")
    return {
      finished: Promise.resolve()
    };
  let animation;
  try {
    animation = el.animate(keyframes, options);
  } catch (err) {
    return {
      finished: Promise.resolve()
    };
  }
  if (typeof animation.finished === "undefined") {
    animation.finished = new Promise((resolve2) => {
      animation.onfinish = () => {
        resolve2(animation);
      };
    });
  }
  return animation;
}
function createMessage(message, vm, parent) {
  if (parent) {
    vm = {
      __isVue: true,
      $parent: parent,
      $options: vm
    };
  }
  if (vm) {
    vm.$_alreadyWarned = vm.$_alreadyWarned || [];
    if (vm.$_alreadyWarned.includes(message))
      return;
    vm.$_alreadyWarned.push(message);
  }
  return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : "");
}
function consoleWarn(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.error(newMessage);
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function formatComponentName(vm, includeFile) {
  if (vm.$root === vm) {
    return "<Root>";
  }
  const options = typeof vm === "function" && vm.cid != null ? vm.options : vm.__isVue ? vm.$options || vm.constructor.options : vm || {};
  let name = options.name || options._componentTag;
  const file = options.__file;
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match == null ? void 0 : match[1];
  }
  return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
}
function generateComponentTrace(vm) {
  if (vm.__isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent;
    }
    return "\n\nfound in\n\n" + tree.map((vm2, i) => `${i === 0 ? "---> " : " ".repeat(5 + i * 2)}${Array.isArray(vm2) ? `${formatComponentName(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName(vm2)}`).join("\n");
  } else {
    return `

(found in ${formatComponentName(vm)})`;
  }
}
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
const srgbForwardTransform = (C) => C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
const srgbReverseTransform = (C) => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
function fromXYZ$1(xyz) {
  const rgb2 = Array(3);
  const transform2 = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i = 0; i < 3; ++i) {
    rgb2[i] = Math.round(clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }
  return {
    r: rgb2[0],
    g: rgb2[1],
    b: rgb2[2]
  };
}
function toXYZ$1(_ref) {
  let {
    r,
    g,
    b
  } = _ref;
  const xyz = [0, 0, 0];
  const transform2 = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  r = transform2(r / 255);
  g = transform2(g / 255);
  b = transform2(b / 255);
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}
const delta = 0.20689655172413793;
const cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ(xyz) {
  const transform2 = cielabForwardTransform;
  const transformedY = transform2(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
}
function toXYZ(lab) {
  const transform2 = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
}
function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function parseColor$1(color) {
  if (typeof color === "number") {
    if (isNaN(color) || color < 0 || color > 16777215) {
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 16711680) >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  } else if (typeof color === "string") {
    let hex2 = color.startsWith("#") ? color.slice(1) : color;
    if ([3, 4].includes(hex2.length)) {
      hex2 = hex2.split("").map((char) => char + char).join("");
    } else if (![6, 8].includes(hex2.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = parseInt(hex2, 16);
    if (isNaN(int) || int < 0 || int > 4294967295) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex2);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }
}
function HSVtoRGB(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const f = (n) => {
    const k = (n + h2 / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  const rgb2 = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
  return {
    r: rgb2[0],
    g: rgb2[1],
    b: rgb2[2],
    a
  };
}
function RGBtoHSV(rgba2) {
  if (!rgba2)
    return {
      h: 0,
      s: 1,
      v: 1,
      a: 1
    };
  const r = rgba2.r / 255;
  const g = rgba2.g / 255;
  const b = rgba2.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h2 = 0;
  if (max !== min) {
    if (max === r) {
      h2 = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h2 = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h2 = 60 * (4 + (r - g) / (max - min));
    }
  }
  if (h2 < 0)
    h2 = h2 + 360;
  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h2, s, max];
  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba2.a
  };
}
function HSVtoHSL(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const l = v - v * s / 2;
  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h: h2,
    s: sprime,
    l,
    a
  };
}
function HSLtoHSV(hsl2) {
  const {
    h: h2,
    s,
    l,
    a
  } = hsl2;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h: h2,
    s: sprime,
    v,
    a
  };
}
function RGBtoCSS(_ref) {
  let {
    r,
    g,
    b,
    a
  } = _ref;
  return a === void 0 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}
function HSVtoCSS(hsva) {
  return RGBtoCSS(HSVtoRGB(hsva));
}
function toHex(v) {
  const h2 = Math.round(v).toString(16);
  return ("00".substr(0, 2 - h2.length) + h2).toUpperCase();
}
function RGBtoHex(_ref2) {
  let {
    r,
    g,
    b,
    a
  } = _ref2;
  return `#${[toHex(r), toHex(g), toHex(b), a !== void 0 ? toHex(Math.round(a * 255)) : ""].join("")}`;
}
function HexToRGB(hex2) {
  hex2 = parseHex(hex2);
  let [r, g, b, a] = chunk(hex2, 2).map((c) => parseInt(c, 16));
  a = a === void 0 ? a : a / 255;
  return {
    r,
    g,
    b,
    a
  };
}
function HexToHSV(hex2) {
  const rgb2 = HexToRGB(hex2);
  return RGBtoHSV(rgb2);
}
function HSVtoHex(hsva) {
  return RGBtoHex(HSVtoRGB(hsva));
}
function parseHex(hex2) {
  if (hex2.startsWith("#")) {
    hex2 = hex2.slice(1);
  }
  hex2 = hex2.replace(/([^0-9a-f])/gi, "F");
  if (hex2.length === 3 || hex2.length === 4) {
    hex2 = hex2.split("").map((x) => x + x).join("");
  }
  if (hex2.length !== 6) {
    hex2 = padEnd(padEnd(hex2, 6), 8, "F");
  }
  return hex2;
}
function lighten(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
function darken(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
function getLuma(color) {
  const rgb2 = parseColor$1(color);
  return toXYZ$1(rgb2)[1];
}
function getContrast(first, second) {
  const l1 = getLuma(first);
  const l2 = getLuma(second);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || "must be called from inside a setup function"}`);
  }
  return vm;
}
function getCurrentInstanceName() {
  let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const vm = getCurrentInstance(name).type;
  return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
}
let _uid = 0;
let _map = /* @__PURE__ */ new WeakMap();
function getUid() {
  const vm = getCurrentInstance("getUid");
  if (_map.has(vm))
    return _map.get(vm);
  else {
    const uid = _uid++;
    _map.set(vm, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = /* @__PURE__ */ new WeakMap();
};
function injectSelf(key) {
  const {
    provides
  } = getCurrentInstance("injectSelf");
  if (provides && key in provides) {
    return provides[key];
  }
}
function propsFactory(props, source) {
  return (defaults) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };
      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}
function useToggleScope(source, fn) {
  let scope;
  function start() {
    scope = effectScope();
    scope.run(() => fn.length ? fn(() => {
      scope == null ? void 0 : scope.stop();
      start();
    }) : fn());
  }
  watch(source, (active) => {
    if (active && !scope) {
      start();
    } else if (!active) {
      scope == null ? void 0 : scope.stop();
      scope = void 0;
    }
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
}
function propIsDefined(vnode, prop) {
  var _a2, _b;
  return typeof ((_a2 = vnode.props) == null ? void 0 : _a2[prop]) !== "undefined" || typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== "undefined";
}
function defineComponent(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn("The component is missing an explicit name, unable to generate default prop value");
    return options;
  }
  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, toKebabCase(options.name))();
    const propKeys = Object.keys(options.props);
    options.filterProps = function filterProps(props) {
      return pick(props, propKeys);
    };
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const defaults = useDefaults();
      if (!defaults.value)
        return options._setup(props, ctx);
      const vm = getCurrentInstance$1();
      const componentDefaults = computed(() => defaults.value[props._as ?? options.name]);
      const _props = new Proxy(props, {
        get(target, prop) {
          var _a2, _b;
          const propValue = Reflect.get(target, prop);
          if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
            return ((_a2 = componentDefaults.value) == null ? void 0 : _a2[prop]) ?? ((_b = defaults.value.global) == null ? void 0 : _b[prop]) ?? propValue;
          }
          return propValue;
        }
      });
      const _subcomponentDefaults = shallowRef();
      watchEffect(() => {
        if (componentDefaults.value) {
          const subComponents = Object.entries(componentDefaults.value).filter((_ref) => {
            let [key] = _ref;
            return key.startsWith(key[0].toUpperCase());
          });
          if (subComponents.length)
            _subcomponentDefaults.value = Object.fromEntries(subComponents);
        }
      });
      const setupBindings = options._setup(_props, ctx);
      useToggleScope(_subcomponentDefaults, () => {
        var _a2;
        provideDefaults(mergeDeep(((_a2 = injectSelf(DefaultsSymbol)) == null ? void 0 : _a2.value) ?? {}, _subcomponentDefaults.value));
      });
      return setupBindings;
    };
  }
  return options;
}
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  return (options) => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a2;
        return h(props.tag, {
          class: klass
        }, (_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      };
    }
  });
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode)
      node = node.parentNode;
    if (node !== document)
      return null;
    return document;
  }
  const root = node.getRootNode();
  if (root !== document && root.getRootNode({
    composed: true
  }) !== document)
    return null;
  return root;
}
const standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
const acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
function getScrollParent(el) {
  while (el) {
    if (hasScrollbar(el))
      return el;
    el = el.parentElement;
  }
  return document.scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el))
    return elements;
  while (el) {
    if (hasScrollbar(el))
      elements.push(el);
    if (el === stopAt)
      break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return false;
  const style = window.getComputedStyle(el);
  return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
}
const IN_BROWSER = false;
const SUPPORTS_TOUCH = IN_BROWSER ;
function isFixedPosition(el) {
  while (el) {
    if (window.getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
const DefaultsSymbol = Symbol.for("vuetify:defaults");
function createDefaults(options) {
  return ref(options);
}
function useDefaults() {
  const defaults = inject$1(DefaultsSymbol);
  if (!defaults)
    throw new Error("[Vuetify] Could not find defaults instance");
  return defaults;
}
function provideDefaults(defaults, options) {
  const injectedDefaults = useDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const disabled = unref(options == null ? void 0 : options.disabled);
    if (disabled)
      return injectedDefaults.value;
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped)
      return properties;
    if (reset || root) {
      const len = Number(reset || Infinity);
      for (let i = 0; i <= len; i++) {
        if (!properties || !("prev" in properties)) {
          break;
        }
        properties = properties.prev;
      }
      return properties;
    }
    return mergeDeep(properties.prev, properties);
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
const breakpoints = ["sm", "md", "lg", "xl", "xxl"];
const DisplaySymbol = Symbol.for("vuetify:display");
const defaultDisplayOptions = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};
const parseDisplayOptions = function() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(isHydrate) {
  return 0;
}
function getClientHeight(isHydrate) {
  return 0;
}
function getPlatform(isHydrate) {
  const userAgent = "ssr";
  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }
  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === "ssr"
  };
}
function createDisplay(options, ssr) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = ref(getClientHeight());
  const platform = shallowRef(getPlatform());
  const state = reactive({});
  const width = ref(getClientWidth());
  function updateSize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  }
  function update() {
    updateSize();
    platform.value = getPlatform();
  }
  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md2 = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md2 || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md2 || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? "xs" : sm ? "sm" : md2 ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
    const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = width.value < breakpointValue;
    state.xs = xs;
    state.sm = sm;
    state.md = md2;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md2);
    state.xlAndUp = !(xs || sm || md2 || lg);
    state.smAndDown = !(md2 || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform.value;
    state.thresholds = thresholds;
  });
  return {
    ...toRefs(state),
    update,
    ssr: !!ssr
  };
}
function useDisplay() {
  const display = inject$1(DisplaySymbol);
  if (!display)
    throw new Error("Could not find Vuetify display injection");
  return display;
}
const aliases$1 = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus"
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VClassIcon, {
    ...props,
    class: "mdi"
  })
};
const IconValue = [String, Function, Object];
const IconSymbol = Symbol.for("vuetify:icons");
const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, "icon");
const VComponentIcon = genericComponent()({
  name: "VComponentIcon",
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return createVNode(props.tag, null, {
        default: () => {
          var _a2;
          return [props.icon ? createVNode(props.icon, null, null) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      });
    };
  }
});
const VSvgIcon = /* @__PURE__ */ defineComponent({
  name: "VSvgIcon",
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [createVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
const VLigatureIcon = /* @__PURE__ */ defineComponent({
  name: "VLigatureIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
const VClassIcon = /* @__PURE__ */ defineComponent({
  name: "VClassIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, {
        "class": props.icon
      }, null);
    };
  }
});
const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
};
function createIcons(options) {
  return mergeDeep({
    defaultSet: "mdi",
    sets: {
      ...defaultSets,
      mdi
    },
    aliases: aliases$1
  }, options);
}
const useIcon = (props) => {
  const icons = inject$1(IconSymbol);
  if (!icons)
    throw new Error("Missing Vuetify Icons provide!");
  const iconData = computed(() => {
    var _a2;
    const iconAlias = isRef(props) ? props.value : props.icon;
    if (!iconAlias)
      return {
        component: VComponentIcon
      };
    let icon = iconAlias;
    if (typeof icon === "string") {
      icon = icon.trim();
      if (icon.startsWith("$")) {
        icon = (_a2 = icons.aliases) == null ? void 0 : _a2[icon.slice(1)];
      }
    }
    if (!icon)
      throw new Error(`Could not find aliased icon "${iconAlias}"`);
    if (typeof icon !== "string") {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
  let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
  const vm = getCurrentInstance("useProxiedModel");
  const internal = ref(props[prop] !== void 0 ? props[prop] : defaultValue);
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;
  const isControlled = checkKebab ? computed(() => {
    var _a2, _b, _c, _d;
    void props[prop];
    return !!((((_a2 = vm.vnode.props) == null ? void 0 : _a2.hasOwnProperty(prop)) || ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(kebabProp))) && (((_c = vm.vnode.props) == null ? void 0 : _c.hasOwnProperty(`onUpdate:${prop}`)) || ((_d = vm.vnode.props) == null ? void 0 : _d.hasOwnProperty(`onUpdate:${kebabProp}`))));
  }) : computed(() => {
    var _a2, _b;
    void props[prop];
    return !!(((_a2 = vm.vnode.props) == null ? void 0 : _a2.hasOwnProperty(prop)) && ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(`onUpdate:${prop}`)));
  });
  useToggleScope(() => !isControlled.value, () => {
    watch(() => props[prop], (val) => {
      internal.value = val;
    });
  });
  const model = computed({
    get() {
      return transformIn(isControlled.value ? props[prop] : internal.value);
    },
    set(internalValue) {
      const newValue = transformOut(internalValue);
      const value = toRaw(isControlled.value ? props[prop] : internal.value);
      if (value === newValue || transformIn(value) === internalValue) {
        return;
      }
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
    }
  });
  Object.defineProperty(model, "externalValue", {
    get: () => isControlled.value ? props[prop] : internal.value
  });
  return model;
}
const en = {
  badge: "Badge",
  close: "Close",
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    nextMonthAriaLabel: "Next month",
    nextYearAriaLabel: "Next year",
    prevMonthAriaLabel: "Previous month",
    prevYearAriaLabel: "Previous year"
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  }
};
const LANG_PREFIX = "$vuetify.";
const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function(key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }
    const shortKey = key.replace(LANG_PREFIX, "");
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== "string") {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace(str, params);
  };
};
function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
  internal.value = props[prop] ?? provided.value;
  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = provided.value;
    }
  });
  return internal;
}
function createProvideFunction(state) {
  return (props) => {
    const current = useProvided(props, "locale", state.current);
    const fallback = useProvided(props, "fallback", state.fallback);
    const messages = useProvided(props, "messages", state.messages);
    return {
      name: "vuetify",
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  };
}
function createVuetifyAdapter(options) {
  const current = ref((options == null ? void 0 : options.locale) ?? "en");
  const fallback = ref((options == null ? void 0 : options.fallback) ?? "en");
  const messages = ref({
    en,
    ...options == null ? void 0 : options.messages
  });
  return {
    name: "vuetify",
    current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({
      current,
      fallback,
      messages
    })
  };
}
const defaultRtl = {
  af: false,
  ar: true,
  bg: false,
  ca: false,
  ckb: false,
  cs: false,
  de: false,
  el: false,
  en: false,
  es: false,
  et: false,
  fa: true,
  fi: false,
  fr: false,
  hr: false,
  hu: false,
  he: true,
  id: false,
  it: false,
  ja: false,
  ko: false,
  lv: false,
  lt: false,
  nl: false,
  no: false,
  pl: false,
  pt: false,
  ro: false,
  ru: false,
  sk: false,
  sl: false,
  srCyrl: false,
  srLatn: false,
  sv: false,
  th: false,
  tr: false,
  az: false,
  uk: false,
  vi: false,
  zhHans: false,
  zhHant: false
};
const LocaleSymbol = Symbol.for("vuetify:locale");
function isLocaleInstance(obj) {
  return obj.name != null;
}
function createLocale(options) {
  const i18n = (options == null ? void 0 : options.adapter) && isLocaleInstance(options == null ? void 0 : options.adapter) ? options == null ? void 0 : options.adapter : createVuetifyAdapter(options);
  const rtl = createRtl(i18n, options);
  return {
    ...i18n,
    ...rtl
  };
}
function useLocale() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return locale;
}
function provideLocale(props) {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected locale instance");
  const i18n = locale.provide(props);
  const rtl = provideRtl(i18n, locale.rtl, props);
  const data = {
    ...i18n,
    ...rtl
  };
  provide(LocaleSymbol, data);
  return data;
}
function createRtl(i18n, options) {
  const rtl = ref((options == null ? void 0 : options.rtl) ?? defaultRtl);
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function provideRtl(locale, rtl, props) {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function useRtl() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: locale.isRtl,
    rtlClasses: locale.rtlClasses
  };
}
const mainTRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;
const blkThrs = 0.03;
const blkClmp = 1.45;
const deltaYmin = 5e-4;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const loConThresh = 0.078;
const loConFactor = 12.82051282051282;
const loConOffset = 0.06;
const loClip = 1e-3;
function APCAcontrast(text, background) {
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
  if (Ytxt <= blkThrs)
    Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs)
    Ybg += (blkThrs - Ybg) ** blkClmp;
  if (Math.abs(Ybg - Ytxt) < deltaYmin)
    return 0;
  let outputContrast;
  if (Ybg > Ytxt) {
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}
const ThemeSymbol = Symbol.for("vuetify:theme");
const makeThemeProps = propsFactory({
  theme: String
}, "theme");
const defaultThemeOptions = {
  defaultTheme: "light",
  variations: {
    colors: [],
    lighten: 0,
    darken: 0
  },
  themes: {
    light: {
      dark: false,
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-variant": "#424242",
        "on-surface-variant": "#EEEEEE",
        primary: "#6200EE",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC6",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      variables: {
        "border-color": "#000000",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.04,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.12,
        "dragged-opacity": 0.08,
        "theme-kbd": "#212529",
        "theme-on-kbd": "#FFFFFF",
        "theme-code": "#F5F5F5",
        "theme-on-code": "#000000"
      }
    },
    dark: {
      dark: true,
      colors: {
        background: "#121212",
        surface: "#212121",
        "surface-variant": "#BDBDBD",
        "on-surface-variant": "#424242",
        primary: "#BB86FC",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC5",
        "secondary-darken-1": "#03DAC5",
        error: "#CF6679",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      variables: {
        "border-color": "#FFFFFF",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.1,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.16,
        "dragged-opacity": 0.08,
        "theme-kbd": "#212529",
        "theme-on-kbd": "#FFFFFF",
        "theme-code": "#343434",
        "theme-on-code": "#CCCCCC"
      }
    }
  }
};
function parseThemeOptions() {
  var _a2, _b;
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultThemeOptions;
  if (!options)
    return {
      ...defaultThemeOptions,
      isDisabled: true
    };
  const themes = {};
  for (const [key, theme] of Object.entries(options.themes ?? {})) {
    const defaultTheme = theme.dark || key === "dark" ? (_a2 = defaultThemeOptions.themes) == null ? void 0 : _a2.dark : (_b = defaultThemeOptions.themes) == null ? void 0 : _b.light;
    themes[key] = mergeDeep(defaultTheme, theme);
  }
  return mergeDeep(defaultThemeOptions, {
    ...options,
    themes
  });
}
function createTheme(options) {
  const parsedOptions = reactive(parseThemeOptions(options));
  const name = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const computedThemes = computed(() => {
    const acc = {};
    for (const [name2, original] of Object.entries(themes.value)) {
      const theme = acc[name2] = {
        ...original,
        colors: {
          ...original.colors
        }
      };
      if (parsedOptions.variations) {
        for (const name3 of parsedOptions.variations.colors) {
          const color = theme.colors[name3];
          if (!color)
            continue;
          for (const variation of ["lighten", "darken"]) {
            const fn = variation === "lighten" ? lighten : darken;
            for (const amount of createRange(parsedOptions.variations[variation], 1)) {
              theme.colors[`${name3}-${variation}-${amount}`] = RGBtoHex(fn(parseColor$1(color), amount));
            }
          }
        }
      }
      for (const color of Object.keys(theme.colors)) {
        if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`])
          continue;
        const onColor = `on-${color}`;
        const colorVal = parseColor$1(theme.colors[color]);
        const blackContrast = Math.abs(APCAcontrast(parseColor$1(0), colorVal));
        const whiteContrast = Math.abs(APCAcontrast(parseColor$1(16777215), colorVal));
        theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
      }
    }
    return acc;
  });
  const current = computed(() => computedThemes.value[name.value]);
  const styles = computed(() => {
    const lines = [];
    if (current.value.dark) {
      createCssClass(lines, ":root", ["color-scheme: dark"]);
    }
    createCssClass(lines, ":root", genCssVariables(current.value));
    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${theme.dark ? "dark" : "normal"}`, ...genCssVariables(theme)]);
    }
    const bgLines = [];
    const fgLines = [];
    const colors2 = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
    for (const key of colors2) {
      if (/^on-[a-z]/.test(key)) {
        createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
      } else {
        createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
        createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
      }
    }
    lines.push(...bgLines, ...fgLines);
    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join("");
  });
  function getHead() {
    return {
      style: [{
        children: styles.value,
        id: "vuetify-theme-stylesheet",
        nonce: parsedOptions.cspNonce || false
      }]
    };
  }
  function install(app) {
    const head = app._context.provides.usehead;
    if (head) {
      if (head.push) {
        const entry2 = head.push(getHead);
        watch(styles, () => {
          entry2.patch(getHead);
        });
      } else {
        {
          head.addHeadObjs(getHead());
        }
      }
    } else {
      let updateStyles = function() {
        if (parsedOptions.isDisabled)
          return;
      };
      watch(styles, updateStyles, {
        immediate: true
      });
    }
  }
  const themeClasses = computed(() => parsedOptions.isDisabled ? void 0 : `v-theme--${name.value}`);
  return {
    install,
    isDisabled: parsedOptions.isDisabled,
    name,
    themes,
    current,
    computedThemes,
    themeClasses,
    styles,
    global: {
      name,
      current
    }
  };
}
function provideTheme(props) {
  getCurrentInstance("provideTheme");
  const theme = inject$1(ThemeSymbol, null);
  if (!theme)
    throw new Error("Could not find Vuetify theme injection");
  const name = computed(() => {
    return props.theme ?? (theme == null ? void 0 : theme.name.value);
  });
  const themeClasses = computed(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
  const newTheme = {
    ...theme,
    name,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function useTheme() {
  getCurrentInstance("useTheme");
  const theme = inject$1(ThemeSymbol, null);
  if (!theme)
    throw new Error("Could not find Vuetify theme injection");
  return theme;
}
function createCssClass(lines, selector, content) {
  lines.push(`${selector} {
`, ...content.map((line) => `  ${line};
`), "}\n");
}
function genCssVariables(theme) {
  const lightOverlay = theme.dark ? 2 : 1;
  const darkOverlay = theme.dark ? 1 : 2;
  const variables = [];
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb2 = parseColor$1(value);
    variables.push(`--v-theme-${key}: ${rgb2.r},${rgb2.g},${rgb2.b}`);
    if (!key.startsWith("on-")) {
      variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
    }
  }
  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === "string" && value.startsWith("#") ? parseColor$1(value) : void 0;
    const rgb2 = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
    variables.push(`--v-${key}: ${rgb2 ?? value}`);
  }
  return variables;
}
function useResizeObserver(callback) {
  const resizeRef = ref();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  const id = options.id ?? `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = ref(false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active)
      continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject$1(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = /* @__PURE__ */ new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom))
        continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
        continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a2;
        return ((_a2 = priorities.get(id)) == null ? void 0 : _a2.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = ref(false);
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1)
        registered.value.splice(instanceIndex, 0, id);
      else
        registered.value.push(id);
      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value)
          return styles;
        const item = items.value[index.value];
        if (!item)
          throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: rootZIndex.value,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
function createVuetify() {
  let vuetify = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases: aliases2 = {},
    components: components2 = {},
    directives = {}
  } = options;
  const defaults = createDefaults(options.defaults);
  const display = createDisplay(options.display, options.ssr);
  const theme = createTheme(options.theme);
  const icons = createIcons(options.icons);
  const locale = createLocale(options.locale);
  const install = (app) => {
    for (const key in directives) {
      app.directive(key, directives[key]);
    }
    for (const key in components2) {
      app.component(key, components2[key]);
    }
    for (const key in aliases2) {
      app.component(key, /* @__PURE__ */ defineComponent({
        ...aliases2[key],
        name: key,
        aliasName: aliases2[key].name
      }));
    }
    theme.install(app);
    app.provide(DefaultsSymbol, defaults);
    app.provide(DisplaySymbol, display);
    app.provide(ThemeSymbol, theme);
    app.provide(IconSymbol, icons);
    app.provide(LocaleSymbol, locale);
    getUid.reset();
    {
      app.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol)
            });
          }
        }
      });
    }
  };
  return {
    install,
    defaults,
    display,
    theme,
    icons,
    locale
  };
}
const version = "3.1.12";
createVuetify.version = version;
function inject(key) {
  var _a2, _b;
  const vm = this.$;
  const provides = ((_a2 = vm.parent) == null ? void 0 : _a2.provides) ?? ((_b = vm.vnode.appContext) == null ? void 0 : _b.provides);
  if (provides && key in provides) {
    return provides[key];
  }
}
const aliases = {
  collapse: "keyboard_arrow_up",
  complete: "check",
  cancel: "cancel",
  close: "close",
  delete: "cancel",
  // delete (e.g. v-chip close)
  clear: "cancel",
  success: "check_circle",
  info: "info",
  warning: "priority_high",
  error: "warning",
  prev: "chevron_left",
  next: "chevron_right",
  checkboxOn: "check_box",
  checkboxOff: "check_box_outline_blank",
  checkboxIndeterminate: "indeterminate_check_box",
  delimiter: "fiber_manual_record",
  // for carousel
  sortAsc: "arrow_upward",
  sortDesc: "arrow_downward",
  expand: "keyboard_arrow_down",
  menu: "menu",
  subgroup: "arrow_drop_down",
  dropdown: "arrow_drop_down",
  radioOn: "radio_button_checked",
  radioOff: "radio_button_unchecked",
  edit: "edit",
  ratingEmpty: "star_border",
  ratingFull: "star",
  ratingHalf: "star_half",
  loading: "cached",
  first: "first_page",
  last: "last_page",
  unfold: "unfold_more",
  file: "attach_file",
  plus: "add",
  minus: "remove"
};
const md = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VLigatureIcon, {
    ...props,
    class: "material-icons"
  })
};
const VApp = genericComponent()({
  name: "VApp",
  props: {
    ...makeLayoutProps({
      fullHeight: true
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value],
        "style": layoutStyles.value
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const VDefaultsProvider = genericComponent(false)({
  name: "VDefaultsProvider",
  props: {
    defaults: Object,
    disabled: Boolean,
    reset: [Number, String],
    root: Boolean,
    scoped: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
function createCssTransition(name) {
  let origin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "center center";
  let mode = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name,
    props: {
      group: Boolean,
      hideOnLeave: Boolean,
      leaveAbsolute: Boolean,
      mode: {
        type: String,
        default: mode
      },
      origin: {
        type: String,
        default: origin
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name,
          mode: props.mode,
          onBeforeEnter(el) {
            el.style.transformOrigin = props.origin;
          },
          onLeave(el) {
            if (props.leaveAbsolute) {
              const {
                offsetTop,
                offsetLeft,
                offsetWidth,
                offsetHeight
              } = el;
              el._transitionInitialStyles = {
                position: el.style.position,
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
              };
              el.style.position = "absolute";
              el.style.top = `${offsetTop}px`;
              el.style.left = `${offsetLeft}px`;
              el.style.width = `${offsetWidth}px`;
              el.style.height = `${offsetHeight}px`;
            }
            if (props.hideOnLeave) {
              el.style.setProperty("display", "none", "important");
            }
          },
          onAfterLeave(el) {
            if (props.leaveAbsolute && (el == null ? void 0 : el._transitionInitialStyles)) {
              const {
                position,
                top,
                left,
                width,
                height
              } = el._transitionInitialStyles;
              delete el._transitionInitialStyles;
              el.style.position = position || "";
              el.style.top = top || "";
              el.style.left = left || "";
              el.style.width = width || "";
              el.style.height = height || "";
            }
          }
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name, functions) {
  let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return genericComponent()({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      return () => {
        return h(Transition, {
          name,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...functions
        }, slots.default);
      };
    }
  });
}
function ExpandTransitionGenerator() {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const sizeProperty = x ? "width" : "height";
  const offsetProperty = camelize(`offset-${sizeProperty}`);
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty("transition", "none", "important");
      el.style.overflow = "hidden";
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = "0";
      void el.offsetHeight;
      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: "",
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = "hidden";
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight;
      requestAnimationFrame(() => el.style[sizeProperty] = "0");
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null)
      el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: {
    target: Object
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _a2;
        await new Promise((resolve2) => requestAnimationFrame(resolve2));
        await new Promise((resolve2) => requestAnimationFrame(resolve2));
        el.style.visibility = "";
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }, {}], {
          duration: 225 * speed,
          easing: deceleratedEasing
        });
        (_a2 = getChildren(el)) == null ? void 0 : _a2.forEach((el2) => {
          animate(el2, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * speed,
            easing: standardEasing
          });
        });
        animation.finished.then(() => done());
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _a2;
        await new Promise((resolve2) => requestAnimationFrame(resolve2));
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{}, {
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }], {
          duration: 125 * speed,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
        (_a2 = getChildren(el)) == null ? void 0 : _a2.forEach((el2) => {
          animate(el2, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * speed,
            easing: standardEasing
          });
        });
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _a2;
  const els = (_a2 = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a2.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = target.getBoundingClientRect();
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
const VFabTransition = createCssTransition("fab-transition", "center center", "out-in");
const VDialogBottomTransition = createCssTransition("dialog-bottom-transition");
const VDialogTopTransition = createCssTransition("dialog-top-transition");
const VFadeTransition = createCssTransition("fade-transition");
const VScaleTransition = createCssTransition("scale-transition");
const VScrollXTransition = createCssTransition("scroll-x-transition");
const VScrollXReverseTransition = createCssTransition("scroll-x-reverse-transition");
const VScrollYTransition = createCssTransition("scroll-y-transition");
const VScrollYReverseTransition = createCssTransition("scroll-y-reverse-transition");
const VSlideXTransition = createCssTransition("slide-x-transition");
const VSlideXReverseTransition = createCssTransition("slide-x-reverse-transition");
const VSlideYTransition = createCssTransition("slide-y-transition");
const VSlideYReverseTransition = createCssTransition("slide-y-reverse-transition");
const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", true));
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => ({
    height: convertToUnit(props.height),
    maxHeight: convertToUnit(props.maxHeight),
    maxWidth: convertToUnit(props.maxWidth),
    minHeight: convertToUnit(props.minHeight),
    minWidth: convertToUnit(props.minWidth),
    width: convertToUnit(props.width)
  }));
  return {
    dimensionStyles
  };
}
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: {
    aspectRatio: [String, Number],
    contentClass: String,
    ...makeDimensionProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": "v-responsive",
        "style": dimensionStyles.value
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_a2 = slots.additional) == null ? void 0 : _a2.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
function mounted$2(el, binding) {
  return;
}
function unmounted$2(el, binding) {
  var _a2;
  const observe = (_a2 = el._observe) == null ? void 0 : _a2[binding.instance.$.uid];
  if (!observe)
    return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted: mounted$2,
  unmounted: unmounted$2
};
const Intersect$1 = Intersect;
const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    ...rest
  } = props;
  const {
    component = Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: transition
  } : customProps, rest), slots);
};
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    intersect: Intersect$1
  },
  props: {
    aspectRatio: [String, Number],
    alt: String,
    cover: Boolean,
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: void 0,
        rootMargin: void 0,
        threshold: void 0
      })
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ""
    },
    srcset: String,
    width: [String, Number],
    ...makeTransitionProps()
  },
  emits: {
    loadstart: (event) => true,
    load: (event) => true,
    error: (event) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const currentSrc = ref("");
    const image = ref();
    const state = ref(props.eager ? "loading" : "idle");
    const naturalWidth = ref();
    const naturalHeight = ref();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting)
        return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src)
        return;
      nextTick(() => {
        var _a2, _b;
        emit("loadstart", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
        if ((_b = image.value) == null ? void 0 : _b.complete) {
          if (!image.value.naturalWidth) {
            onError();
          }
          if (state.value === "error")
            return;
          if (!aspectRatio.value)
            pollForSize(image.value, null);
          onLoad();
        } else {
          if (!aspectRatio.value)
            pollForSize(image.value);
          getSrc();
        }
      });
    }
    function onLoad() {
      var _a2;
      getSrc();
      state.value = "loaded";
      emit("load", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _a2;
      state.value = "error";
      emit("error", ((_a2 = image.value) == null ? void 0 : _a2.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img)
        currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = window.setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _a2;
      if (!normalisedSrc.value.src || state.value === "idle")
        return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_a2 = slots.sources) == null ? void 0 : _a2.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient)
        return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = ref(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => withDirectives(createVNode(VResponsive, {
      "class": ["v-img", {
        "v-img--booting": !isBooted.value
      }],
      "style": {
        width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
      },
      "aspectRatio": aspectRatio.value,
      "aria-label": props.alt,
      "role": props.alt ? "img" : void 0
    }, {
      additional: () => createVNode(Fragment$1, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
      default: slots.default
    }), [[resolveDirective("intersect"), {
      handler: init,
      options: props.options
    }, null, {
      once: true
    }]]));
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeTagProps()
}, "v-toolbar-title");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": "v-toolbar-title"
      }, {
        default: () => {
          var _a2;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
        }
      });
    });
    return {};
  }
});
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null)
      return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const classes = [];
    if (rounded === true || rounded === "") {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
function useColor(colors2) {
  return destructComputed(() => {
    const classes = [];
    const styles = {};
    if (colors2.value.background) {
      if (isCssColor(colors2.value.background)) {
        styles.backgroundColor = colors2.value.background;
      } else {
        classes.push(`bg-${colors2.value.background}`);
      }
    }
    if (colors2.value.text) {
      if (isCssColor(colors2.value.text)) {
        styles.color = colors2.value.text;
        styles.caretColor = colors2.value.text;
      } else {
        classes.push(`text-${colors2.value.text}`);
      }
    }
    return {
      colorClasses: classes,
      colorStyles: styles
    };
  });
}
function useTextColor(props, name) {
  const colors2 = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors2);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name) {
  const colors2 = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors2);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
const allowedDensities$1 = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities$1.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "v-toolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a2;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isExtended = ref(!!(props.extended || ((_a2 = slots.extension) == null ? void 0 : _a2.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a3;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a3 = slots.extension) == null ? void 0 : _a3.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value],
        "style": [backgroundColorStyles.value]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a4, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a4 = slots.prepend) == null ? void 0 : _a4.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
function useSsrBoot() {
  const isBooted = ref(false);
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: {
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    modelValue: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
      default: "top",
      validator: (value) => ["top", "bottom"].includes(value)
    },
    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
    height: {
      type: [Number, String],
      default: 64
    }
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const height = computed(() => {
      var _a2, _b;
      const height2 = ((_a2 = vToolbarRef.value) == null ? void 0 : _a2.contentHeight) ?? 0;
      const extensionHeight = ((_b = vToolbarRef.value) == null ? void 0 : _b.extensionHeight) ?? 0;
      return height2 + extensionHeight;
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: height,
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const [toolbarProps] = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }],
        "style": {
          ...layoutItemStyles.value,
          height: void 0,
          ...ssrBootStyles.value
        }
      }, toolbarProps), slots);
    });
    return {};
  }
});
const allowedDensities = [null, "default", "comfortable", "compact"];
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  }
}, "density");
function useDensity(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
const allowedVariants$2 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name) {
  return createVNode(Fragment$1, null, [isClickable && createVNode("span", {
    "key": "overlay",
    "class": `${name}__overlay`
  }, null), createVNode("span", {
    "key": "underlay",
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants$2.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const makeVBtnGroupProps = propsFactory({
  divided: Boolean,
  ...makeBorderProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "v-btn-group");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value]
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id = getUid();
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject$1(injectKey, null);
  if (!group) {
    if (!required)
      return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(props, "value");
  const disabled = computed(() => group.disabled.value || props.disabled);
  group.register({
    id,
    value,
    disabled
  }, vm);
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  });
  return {
    id,
    isSelected,
    toggle: () => group.select(id, !isSelected.value),
    select: (value2) => group.select(id, value2),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v == null)
      return [];
    return getIds(items, wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
    const index = children.indexOf(vm);
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  function select(id, value) {
    const item = items.find((item2) => item2.id === id);
    if (value && (item == null ? void 0 : item.disabled))
      return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1)
        return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
        return;
      if (index < 0 && value)
        internalValue.push(id);
      else if (index >= 0 && !value)
        internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected)
        return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    if (props.multiple)
      consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i) => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled)
        return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(props, "disabled"),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id) => selected.value.includes(id),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length)
    return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.value != null) {
      if (modelValue.find((value) => deepEqual(value, item.value)) != null) {
        ids.push(item.id);
      }
    } else if (modelValue.includes(i)) {
      ids.push(item.id);
    }
  }
  return ids;
}
function getValues(items, ids) {
  const values = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (ids.includes(item.id)) {
      values.push(item.value != null ? item.value : i);
    }
  }
  return values;
}
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const VBtnToggle = genericComponent()({
  name: "VBtnToggle",
  props: {
    ...makeVBtnGroupProps(),
    ...makeGroupProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const [btnGroupProps] = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": "v-btn-toggle"
      }, btnGroupProps), {
        default: () => {
          var _a2;
          return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })];
        }
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "v-icon");
const VIcon = genericComponent()({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    let slotIcon;
    if (slots.default) {
      slotIcon = computed(() => {
        var _a2, _b;
        const slot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
        if (!slot)
          return;
        return (_b = slot.filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b.children;
      });
    }
    const {
      themeClasses
    } = provideTheme(props);
    const {
      iconData
    } = useIcon(slotIcon || props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => createVNode(iconData.value.component, {
      "tag": props.tag,
      "icon": iconData.value.icon,
      "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
        "v-icon--clickable": !!attrs.onClick,
        "v-icon--start": props.start,
        "v-icon--end": props.end
      }],
      "style": [!sizeClasses.value ? {
        fontSize: convertToUnit(props.size),
        height: convertToUnit(props.size),
        width: convertToUnit(props.size)
      } : void 0, textColorStyles.value],
      "role": attrs.onClick ? "button" : void 0,
      "aria-hidden": !attrs.onClick
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
      }
    }));
    return {};
  }
});
function useIntersectionObserver(callback) {
  const intersectionRef = ref();
  const isIntersecting = ref(false);
  return {
    intersectionRef,
    isIntersecting
  };
}
const VProgressCircular = genericComponent()({
  name: "VProgressCircular",
  props: {
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "div"
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, "bgColor"));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
      }, themeClasses.value, sizeClasses.value, textColorClasses.value],
      "style": [sizeStyles.value, textColorStyles.value],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ["v-progress-circular__underlay", underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
const stopSymbol = Symbol("rippleStop");
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
  return e.constructor.name === "KeyboardEvent";
}
const calculate = function(e, el) {
  var _a2;
  let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if ((_a2 = el._ripple) == null ? void 0 : _a2.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el) {
    var _a2;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((_a2 = el == null ? void 0 : el._ripple) == null ? void 0 : _a2.enabled)) {
      return;
    }
    const container = document.createElement("span");
    const animation = document.createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed2 = window.getComputedStyle(el);
    if (computed2 && computed2.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--in");
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(el) {
    var _a2;
    if (!((_a2 = el == null ? void 0 : el._ripple) == null ? void 0 : _a2.enabled))
      return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0)
      return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding)
      return;
    else
      animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      setTimeout(() => {
        var _a3;
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (((_a3 = animation.parentNode) == null ? void 0 : _a3.parentNode) === el)
          el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple) || element._ripple.touched || e[stopSymbol])
    return;
  e[stopSymbol] = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch)
      return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit)
      return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = window.setTimeout(() => {
      var _a2;
      if ((_a2 = element == null ? void 0 : element._ripple) == null ? void 0 : _a2.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleStop(e) {
  e[stopSymbol] = true;
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple))
    return;
  window.clearTimeout(element._ripple.showTimer);
  if (e.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple))
    return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  window.clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  if (isObject(value) && value.class) {
    el._ripple.class = value.class;
  }
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener("touchstart", rippleStop, {
        passive: true
      });
      el.addEventListener("mousedown", rippleStop);
      return;
    }
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", keyboardRippleShow);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("blur", focusRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("keydown", keyboardRippleShow);
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("dragstart", rippleHide);
  el.removeEventListener("blur", focusRippleHide);
}
function mounted$1(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$1(el) {
  delete el._ripple;
  removeListeners(el);
}
function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$1,
  unmounted: unmounted$1,
  updated
};
const oppositeMap = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const makeLocationProps = propsFactory({
  location: String
}, "location");
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location)
      return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset2(side2) {
      return offset ? offset(side2) : 0;
    }
    const styles = {};
    if (side !== "center") {
      if (opposite)
        styles[oppositeMap[side]] = `calc(100% - ${getOffset2(side)}px)`;
      else
        styles[side] = 0;
    }
    if (align !== "center") {
      if (opposite)
        styles[oppositeMap[align]] = `calc(100% - ${getOffset2(align)}px)`;
      else
        styles[align] = 0;
    } else {
      if (side === "center")
        styles.top = styles.left = "50%";
      else {
        styles[{
          top: "left",
          bottom: "left",
          left: "top",
          right: "top"
        }[side]] = "50%";
      }
      styles.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}
const VProgressLinear = genericComponent()({
  name: "VProgressLinear",
  props: {
    absolute: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    bgColor: String,
    bgOpacity: [Number, String],
    bufferValue: {
      type: [Number, String],
      default: 0
    },
    clickable: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    roundedBar: Boolean,
    ...makeLocationProps({
      location: "top"
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const progress = useProxiedModel(props, "modelValue");
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(props, "color");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(computed(() => props.bgColor || props.color));
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(props, "color");
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max = computed(() => parseInt(props.max, 10));
    const height = computed(() => parseInt(props.height, 10));
    const normalizedBuffer = computed(() => parseFloat(props.bufferValue) / max.value * 100);
    const normalizedValue = computed(() => parseFloat(progress.value) / max.value * 100);
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
    const opacity = computed(() => {
      return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
    });
    function handleClick(e) {
      if (!intersectionRef.value)
        return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
      progress.value = Math.round(value / width * max.value);
    }
    useRender(() => createVNode(props.tag, {
      "ref": intersectionRef,
      "class": ["v-progress-linear", {
        "v-progress-linear--absolute": props.absolute,
        "v-progress-linear--active": props.active && isIntersecting.value,
        "v-progress-linear--reverse": isReversed.value,
        "v-progress-linear--rounded": props.rounded,
        "v-progress-linear--rounded-bar": props.roundedBar,
        "v-progress-linear--striped": props.striped
      }, roundedClasses.value, themeClasses.value],
      "style": {
        bottom: props.location === "bottom" ? 0 : void 0,
        top: props.location === "top" ? 0 : void 0,
        height: props.active ? convertToUnit(height.value) : 0,
        "--v-progress-linear-height": convertToUnit(height.value),
        ...locationStyles.value
      },
      "role": "progressbar",
      "aria-hidden": props.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createVNode("div", {
        "key": "stream",
        "class": ["v-progress-linear__stream", textColorClasses.value],
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: opacity.value,
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, "%"),
          "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createVNode("div", {
        "class": ["v-progress-linear__background", backgroundColorClasses.value],
        "style": [backgroundColorStyles.value, {
          opacity: opacity.value,
          width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
        }]
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createVNode("div", {
          "class": ["v-progress-linear__determinate", barColorClasses.value],
          "style": [barColorStyles.value, {
            width: convertToUnit(normalizedValue.value, "%")
          }]
        }, null) : createVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [["long", "short"].map((bar) => createVNode("div", {
          "key": bar,
          "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
          "style": barColorStyles.value
        }, null))])]
      }), slots.default && createVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, "loader");
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  var _a2;
  let {
    slots
  } = _ref;
  return createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
    color: props.color,
    isActive: props.active
  })) || createVNode(VProgressLinear, {
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useRouter() {
  var _a2, _b;
  return (_b = (_a2 = getCurrentInstance("useRouter")) == null ? void 0 : _a2.proxy) == null ? void 0 : _b.$router;
}
function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent("RouterLink");
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
  });
  if (typeof RouterLink === "string") {
    return {
      isLink,
      isClickable,
      href: toRef(props, "href")
    };
  }
  const link = props.to ? RouterLink.useLink(props) : void 0;
  return {
    isLink,
    isClickable,
    route: link == null ? void 0 : link.route,
    navigate: link == null ? void 0 : link.navigate,
    isActive: link && computed(() => {
      var _a2, _b;
      return props.exact ? (_a2 = link.isExactActive) == null ? void 0 : _a2.value : (_b = link.isActive) == null ? void 0 : _b.value;
    }),
    href: computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
function useSelectLink(link, select) {
  watch(() => {
    var _a2;
    return (_a2 = link.isActive) == null ? void 0 : _a2.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  stacked: Boolean,
  ripple: {
    type: Boolean,
    default: true
  },
  ...makeBorderProps(),
  ...makeRoundedProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  directives: {
    Ripple
  },
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a2;
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isLink.value) {
        return (_a2 = link.isActive) == null ? void 0 : _a2.value;
      }
      return group == null ? void 0 : group.isSelected.value;
    });
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0)
        return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      var _a2, _b;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      const hasColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a2 = link.isActive) == null ? void 0 : _a2.value)) || !group || ((_b = link.isActive) == null ? void 0 : _b.value);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value],
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "onClick": (e) => {
          var _a3;
          if (isDisabled.value)
            return;
          (_a3 = link.navigate) == null ? void 0 : _a3.call(link, e);
          group == null ? void 0 : group.toggle();
        },
        "value": valueAttr.value
      }, {
        default: () => {
          var _a3;
          return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, slots.default)]), !props.icon && hasAppend && createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_a3 = slots.loader) == null ? void 0 : _a3.call(slots)) ?? createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "23",
            "width": "2"
          }, null)])];
        }
      }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    });
    return {};
  }
});
const VAppBarNavIcon = genericComponent()({
  name: "VAppBarNavIcon",
  props: {
    icon: {
      type: IconValue,
      default: "$menu"
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, {
      "class": "v-app-bar-nav-icon",
      "icon": props.icon
    }, slots));
    return {};
  }
});
const VToolbarItems = genericComponent()({
  name: "VToolbarItems",
  props: makeVariantProps({
    variant: "text"
  }),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: toRef(props, "color"),
        height: "inherit",
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": "v-toolbar-items"
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const VAppBarTitle = genericComponent()({
  name: "VAppBarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VToolbarTitle, mergeProps(props, {
      "class": "v-app-bar-title"
    }), slots));
    return {};
  }
});
const VAlertTitle = createSimpleFunctional("v-alert-title");
const allowedTypes = ["success", "info", "warning", "error"];
const VAlert = genericComponent()({
  name: "VAlert",
  props: {
    border: {
      type: [Boolean, String],
      validator: (val) => {
        return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
      }
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: "$close"
    },
    closeLabel: {
      type: String,
      default: "$vuetify.close"
    },
    icon: {
      type: [Boolean, String, Function, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    title: String,
    text: String,
    type: {
      type: String,
      validator: (val) => allowedTypes.includes(val)
    },
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "flat"
    })
  },
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = computed(() => {
      if (props.icon === false)
        return void 0;
      if (!props.type)
        return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "borderColor"));
    const {
      t
    } = useLocale();
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasText = !!(props.text || slots.text);
      const hasClose = !!(slots.close || props.closable);
      return isActive.value && createVNode(props.tag, {
        "class": ["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
        "role": "alert"
      }, {
        default: () => {
          var _a2, _b;
          return [genOverlays(false, "v-alert"), props.border && createVNode("div", {
            "key": "border",
            "class": ["v-alert__border", textColorClasses.value],
            "style": textColorStyles.value
          }, null), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-alert__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": icon.value,
            "size": props.prominent ? 44 : 28
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !icon.value,
            "defaults": {
              VIcon: {
                density: props.density,
                icon: icon.value,
                size: props.prominent ? 44 : 28
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-alert__content"
          }, [hasTitle && createVNode(VAlertTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.title) == null ? void 0 : _a3.call(slots)) ?? props.title];
            }
          }), hasText && (((_a2 = slots.text) == null ? void 0 : _a2.call(slots)) ?? props.text), (_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createVNode("div", {
            "key": "append",
            "class": "v-alert__append"
          }, [slots.append()]), hasClose && createVNode("div", {
            "key": "close",
            "class": "v-alert__close"
          }, [!slots.close ? createVNode(VBtn, mergeProps({
            "key": "close-btn",
            "icon": props.closeIcon,
            "size": "x-small",
            "variant": "text"
          }, closeProps.value), null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VBtn: {
                icon: props.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.close) == null ? void 0 : _a3.call(slots, {
                props: closeProps.value
              })];
            }
          })])];
        }
      });
    };
  }
});
function useInputIcon(props) {
  const {
    t
  } = useLocale();
  function InputIcon(_ref) {
    let {
      name
    } = _ref;
    const localeKey = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[name];
    const listener = props[`onClick:${name}`];
    const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
    return createVNode(VIcon, {
      "icon": props[`${name}Icon`],
      "aria-label": label,
      "onClick": listener
    }, null);
  }
  return {
    InputIcon
  };
}
const VLabel = genericComponent()({
  name: "VLabel",
  props: {
    text: String,
    clickable: Boolean,
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a2;
      return createVNode("label", {
        "class": ["v-label", {
          "v-label--clickable": props.clickable
        }]
      }, [props.text, (_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const VFieldLabel = genericComponent()({
  name: "VFieldLabel",
  props: {
    floating: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": ["v-field-label", {
        "v-field-label--floating": props.floating
      }],
      "aria-hidden": props.floating || void 0
    }, slots));
    return {};
  }
});
const makeFocusProps = propsFactory({
  focused: Boolean
}, "focus");
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, "focused");
  const focusClasses = computed(() => {
    return {
      [`${name}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}
const allowedVariants$1 = ["underlined", "outlined", "filled", "solo", "plain"];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: "$clear"
  },
  active: Boolean,
  color: String,
  dirty: Boolean,
  disabled: Boolean,
  error: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (v) => allowedVariants$1.includes(v)
  },
  "onClick:clear": EventProp,
  "onClick:appendInner": EventProp,
  "onClick:prependInner": EventProp,
  ...makeThemeProps(),
  ...makeLoaderProps()
}, "v-field");
const VField = genericComponent()({
  name: "VField",
  inheritAttrs: false,
  props: {
    id: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const isActive = computed(() => props.dirty || props.active);
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label));
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : void 0;
    }));
    watch(isActive, (val) => {
      if (hasLabel.value) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : void 0;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
          const color = targetStyle.getPropertyValue("color");
          el.style.visibility = "visible";
          targetEl.style.visibility = "hidden";
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? "normal" : "reverse"
          }).finished.then(() => {
            el.style.removeProperty("visibility");
            targetEl.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus
    }));
    function onClick(e) {
      if (e.target !== document.activeElement) {
        e.preventDefault();
      }
    }
    useRender(() => {
      var _a2, _b, _c;
      const isOutlined = props.variant === "outlined";
      const hasPrepend = slots["prepend-inner"] || props.prependInnerIcon;
      const hasClear = !!(props.clearable || slots.clear);
      const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode("div", mergeProps({
        "class": ["v-field", {
          "v-field--active": isActive.value,
          "v-field--appended": hasAppend,
          "v-field--disabled": props.disabled,
          "v-field--dirty": props.dirty,
          "v-field--error": props.error,
          "v-field--has-background": !!props.bgColor,
          "v-field--persistent-clear": props.persistentClear,
          "v-field--prepended": hasPrepend,
          "v-field--reverse": props.reverse,
          "v-field--single-line": props.singleLine,
          "v-field--no-label": !label,
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value],
        "style": [backgroundColorStyles.value, textColorStyles.value],
        "onClick": onClick
      }, attrs), [createVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? "error" : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner"
      }, null), (_a2 = slots["prepend-inner"]) == null ? void 0 : _a2.call(slots, slotProps.value)]), createVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [["solo", "filled"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": [textColorClasses.value],
        "floating": true,
        "for": id.value
      }, {
        default: () => [label]
      }), createVNode(VFieldLabel, {
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label]
      }), (_b = slots.default) == null ? void 0 : _b.call(slots, {
        ...slotProps.value,
        props: {
          id: id.value,
          class: "v-field__input",
          "aria-describedby": messagesId.value
        },
        focus,
        blur
      })]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-field__clearable",
          "onMousedown": (e) => {
            e.preventDefault();
            e.stopPropagation();
          }
        }, [slots.clear ? slots.clear() : createVNode(InputIcon, {
          "name": "clear"
        }, null)]), [[vShow, props.dirty]])]
      }), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [(_c = slots["append-inner"]) == null ? void 0 : _c.call(slots, slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner"
      }, null)]), createVNode("div", {
        "class": ["v-field__outline", textColorClasses.value]
      }, [isOutlined && createVNode(Fragment$1, null, [createVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasLabel.value && createVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value
      }, {
        default: () => [label]
      })]), createVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), ["plain", "underlined"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value
      }, {
        default: () => [label]
      })])]);
    });
    return {
      controlRef
    };
  }
});
function filterFieldProps(attrs) {
  const keys2 = Object.keys(VField.props).filter((k) => !isOn(k));
  return pick(attrs, keys2);
}
const VMessages = genericComponent()({
  name: "VMessages",
  props: {
    active: Boolean,
    color: String,
    messages: {
      type: [Array, String],
      default: () => []
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition,
        leaveAbsolute: true,
        group: true
      }
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => props.color));
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": ["v-messages", textColorClasses.value],
      "style": textColorStyles.value,
      "role": "alert",
      "aria-live": "polite"
    }, {
      default: () => [props.active && messages.value.map((message, i) => createVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    }));
    return {};
  }
});
const FormKey = Symbol.for("vuetify:form");
const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function createForm(props) {
  const model = useProxiedModel(props, "modelValue");
  const isDisabled = computed(() => props.disabled);
  const isReadonly2 = computed(() => props.readonly);
  const isValidating = ref(false);
  const items = ref([]);
  const errors = ref([]);
  async function validate2() {
    const results = [];
    let valid = true;
    errors.value = [];
    isValidating.value = true;
    for (const item of items.value) {
      const itemErrorMessages = await item.validate();
      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }
      if (!valid && props.fastFail)
        break;
    }
    errors.value = results;
    isValidating.value = false;
    return {
      valid,
      errors: errors.value
    };
  }
  function reset() {
    items.value.forEach((item) => item.reset());
    model.value = null;
  }
  function resetValidation() {
    items.value.forEach((item) => item.resetValidation());
    errors.value = [];
    model.value = null;
  }
  watch(items, () => {
    let valid = 0;
    let invalid = 0;
    const results = [];
    for (const item of items.value) {
      if (item.isValid === false) {
        invalid++;
        results.push({
          id: item.id,
          errorMessages: item.errorMessages
        });
      } else if (item.isValid === true)
        valid++;
    }
    errors.value = results;
    model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
  }, {
    deep: true
  });
  provide(FormKey, {
    register: (_ref) => {
      let {
        id,
        validate: validate3,
        reset: reset2,
        resetValidation: resetValidation2
      } = _ref;
      if (items.value.some((item) => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`);
      }
      items.value.push({
        id,
        validate: validate3,
        reset: reset2,
        resetValidation: resetValidation2,
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (id) => {
      items.value = items.value.filter((item) => {
        return item.id !== id;
      });
    },
    update: (id, isValid, errorMessages2) => {
      const found = items.value.find((item) => item.id === id);
      if (!found)
        return;
      found.isValid = isValid;
      found.errorMessages = errorMessages2;
    },
    isDisabled,
    isReadonly: isReadonly2,
    isValidating,
    items,
    validateOn: toRef(props, "validateOn")
  });
  return {
    errors,
    isDisabled,
    isReadonly: isReadonly2,
    isValidating,
    items,
    validate: validate2,
    reset,
    resetValidation
  };
}
function useForm() {
  return inject$1(FormKey, null);
}
const makeValidationProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: Boolean,
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, "validation");
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : getUid();
  const model = useProxiedModel(props, "modelValue");
  const validationModel = computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
  const form = useForm();
  const internalErrorMessages = ref([]);
  const isPristine = ref(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
  const isDisabled = computed(() => !!(props.disabled || (form == null ? void 0 : form.isDisabled.value)));
  const isReadonly2 = computed(() => !!(props.readonly || (form == null ? void 0 : form.isReadonly.value)));
  const errorMessages2 = computed(() => {
    return props.errorMessages.length ? wrapInArray(props.errorMessages).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
  });
  const isValid = computed(() => {
    if (props.error || errorMessages2.value.length)
      return false;
    if (!props.rules.length)
      return true;
    return isPristine.value ? null : true;
  });
  const isValidating = ref(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly2.value
    };
  });
  const uid = computed(() => props.name ?? unref(id));
  const validateOn = computed(() => props.validateOn || (form == null ? void 0 : form.validateOn.value) || "input");
  useToggleScope(() => validateOn.value === "input", () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate2();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, (val) => {
          if (!val)
            validate2();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value === "blur", () => {
    watch(() => props.focused, (val) => {
      if (!val)
        validate2();
    });
  });
  watch(isValid, () => {
    form == null ? void 0 : form.update(uid.value, isValid.value, errorMessages2.value);
  });
  function reset() {
    resetValidation();
    model.value = null;
  }
  function resetValidation() {
    isPristine.value = true;
    internalErrorMessages.value = [];
  }
  async function validate2() {
    const results = [];
    isValidating.value = true;
    for (const rule of props.rules) {
      if (results.length >= (props.maxErrors ?? 1)) {
        break;
      }
      const handler = typeof rule === "function" ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true)
        continue;
      if (typeof result !== "string") {
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result);
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = false;
    return internalErrorMessages.value;
  }
  return {
    errorMessages: errorMessages2,
    isDirty,
    isDisabled,
    isReadonly: isReadonly2,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate: validate2,
    validationClasses
  };
}
const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["horizontal", "vertical"].includes(v)
  },
  "onClick:prepend": EventProp,
  "onClick:append": EventProp,
  ...makeDensityProps(),
  ...makeValidationProps()
}, "v-input");
const VInput = genericComponent()({
  name: "VInput",
  props: {
    ...makeVInputProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);
    const {
      errorMessages: errorMessages2,
      isDirty,
      isDisabled,
      isReadonly: isReadonly2,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate: validate2,
      validationClasses
    } = useValidation(props, "v-input", id);
    const slotProps = computed(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly: isReadonly2,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate: validate2
    }));
    useRender(() => {
      var _a2, _b, _c, _d, _e;
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      const hasMessages = !!(((_a2 = props.messages) == null ? void 0 : _a2.length) || errorMessages2.value.length);
      const hasDetails = !props.hideDetails || props.hideDetails === "auto" && (hasMessages || !!slots.details);
      return createVNode("div", {
        "class": ["v-input", `v-input--${props.direction}`, densityClasses.value, validationClasses.value]
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [(_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps.value), props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend"
      }, null)]), slots.default && createVNode("div", {
        "class": "v-input__control"
      }, [(_c = slots.default) == null ? void 0 : _c.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append"
      }, null), (_d = slots.append) == null ? void 0 : _d.call(slots, slotProps.value)]), hasDetails && createVNode("div", {
        "class": "v-input__details"
      }, [createVNode(VMessages, {
        "id": messagesId.value,
        "active": hasMessages,
        "messages": errorMessages2.value.length > 0 ? errorMessages2.value : props.messages
      }, {
        message: slots.message
      }), (_e = slots.details) == null ? void 0 : _e.call(slots, slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate: validate2
    };
  }
});
function filterInputProps(props) {
  const keys2 = Object.keys(VInput.props).filter((k) => !isOn(k));
  return pick(props, keys2);
}
const VCounter = genericComponent()({
  name: "VCounter",
  functional: true,
  props: {
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition
      }
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": "v-counter"
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});
const Refs = Symbol("Forwarded refs");
function getDescriptor(obj, key) {
  let currentObj = obj;
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
    if (descriptor)
      return descriptor;
    currentObj = Object.getPrototypeOf(currentObj);
  }
  return void 0;
}
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target2, key) {
      if (Reflect.has(target2, key)) {
        return Reflect.get(target2, key);
      }
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          const val = Reflect.get(ref2.value, key);
          return typeof val === "function" ? val.bind(ref2.value) : val;
        }
      }
    },
    getOwnPropertyDescriptor(target2, key) {
      var _a2;
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
      if (descriptor)
        return descriptor;
      if (typeof key === "symbol" || key.startsWith("__"))
        return;
      for (const ref2 of refs) {
        if (!ref2.value)
          continue;
        const descriptor2 = getDescriptor(ref2.value, key) ?? ("_" in ref2.value ? getDescriptor((_a2 = ref2.value._) == null ? void 0 : _a2.setupState, key) : void 0);
        if (descriptor2)
          return descriptor2;
      }
      for (const ref2 of refs) {
        const childRefs = ref2.value && ref2.value[Refs];
        if (!childRefs)
          continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref3 = queue.shift();
          const descriptor2 = getDescriptor(ref3.value, key);
          if (descriptor2)
            return descriptor2;
          const childRefs2 = ref3.value && ref3.value[Refs];
          if (childRefs2)
            queue.push(...childRefs2);
        }
      }
      return void 0;
    }
  });
}
const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  hint: String,
  persistentHint: Boolean,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  type: {
    type: String,
    default: "text"
  },
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "v-text-field");
const VTextField = genericComponent()({
  name: "VTextField",
  directives: {
    Intersect: Intersect$1
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value ?? "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a2, _b;
      if (!props.autofocus || !isIntersecting)
        return;
      (_b = (_a2 = entries[0].target) == null ? void 0 : _a2.focus) == null ? void 0 : _b.call(_a2);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isFocused.value || props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      var _a2;
      if (inputRef.value !== document.activeElement) {
        (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
      if (e.target === inputRef.value)
        return;
      onFocus();
      e.preventDefault();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = null;
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      model.value = el.value;
      if (["text", "search", "password", "tel", "url"].includes(props.type)) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-text-field", {
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
        }],
        "onClick:prepend": props["onClick:prepend"],
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly: isReadonly2,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": "textbox"
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              const placeholder = computed(() => {
                return (props.persistentPlaceholder || isFocused.value) && !isDirty.value ? props.placeholder : "";
              });
              const inputNode = withDirectives(createVNode("input", mergeProps({
                "ref": inputRef,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly2.value,
                "disabled": isDisabled.value,
                "name": props.name,
                "placeholder": placeholder.value,
                "size": 1,
                "type": props.type,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]);
              return createVNode(Fragment$1, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), slots.default ? createVNode("div", {
                "class": fieldClass,
                "data-no-activator": ""
              }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a2;
          return createVNode(Fragment$1, null, [(_a2 = slots.details) == null ? void 0 : _a2.call(slots, slotProps), hasCounter && createVNode(Fragment$1, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: Boolean,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: Boolean,
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeThemeProps(),
  ...makeDensityProps()
}, "v-selection-control-group");
const VSelectionControlGroup = genericComponent()({
  name: "VSelectionControlGroup",
  props: {
    defaultsTarget: {
      type: String,
      default: "VSelectionControl"
    },
    ...makeSelectionControlGroupProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid = getUid();
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        density: toRef(props, "density"),
        error: toRef(props, "error"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        type: toRef(props, "type"),
        valueComparator: toRef(props, "valueComparator")
      }
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": ["v-selection-control-group", {
          "v-selection-control-group--inline": props.inline
        }],
        "role": props.type === "radio" ? "radiogroup" : void 0
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const makeSelectionControlProps = propsFactory({
  label: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeSelectionControlGroupProps()
}, "v-selection-control");
function useSelectionControl(props) {
  const group = inject$1(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? val.some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly)
        return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : void 0;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: makeSelectionControlProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const isFocused = ref(false);
    const isFocusVisible = ref(false);
    const input = ref();
    group == null ? void 0 : group.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      isFocused.value = true;
      {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onInput(e) {
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      var _a2, _b;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      return createVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value]
      }, rootAttrs), [createVNode("div", {
        "class": ["v-selection-control__wrapper", textColorClasses.value],
        "style": textColorStyles.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots), withDirectives(createVNode("div", {
        "class": ["v-selection-control__input"]
      }, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), createVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": props.readonly,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null), (_b = slots.input) == null ? void 0 : _b.call(slots, {
        model,
        textColorClasses,
        textColorStyles,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
        "for": id.value,
        "clickable": true
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});
const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "v-checkbox-btn");
const VCheckboxBtn = genericComponent()({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = computed(() => {
      return props.indeterminate ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return props.indeterminate ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => createVNode(VSelectionControl, mergeProps(props, {
      "modelValue": model.value,
      "onUpdate:modelValue": [($event) => model.value = $event, onChange],
      "class": "v-checkbox-btn",
      "type": "checkbox",
      "inline": true,
      "falseIcon": falseIcon.value,
      "trueIcon": trueIcon.value,
      "aria-checked": props.indeterminate ? "mixed" : void 0
    }), slots));
    return {};
  }
});
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: {
    ...makeVInputProps(),
    ...omit(makeVCheckboxBtnProps(), ["inline"])
  },
  emits: {
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const uid = getUid();
    const id = computed(() => props.id || `checkbox-${uid}`);
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [checkboxProps, _2] = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "class": "v-checkbox"
      }, inputAttrs, inputProps, {
        "id": id.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly: isReadonly2
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly2.value
          }, controlAttrs, {
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return {};
  }
});
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "v-avatar");
const VAvatar = genericComponent()({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-avatar", {
        "v-avatar--start": props.start,
        "v-avatar--end": props.end
      }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
      "style": [colorStyles.value, sizeStyles.value]
    }, {
      default: () => {
        var _a2;
        return [props.image ? createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots), genOverlays(false, "v-avatar")];
      }
    }));
    return {};
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const VChipGroup = genericComponent()({
  name: "VChipGroup",
  props: {
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeGroupProps({
      selectedClass: "v-chip--selected"
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-chip-group", {
        "v-chip-group--column": props.column
      }, themeClasses.value]
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    }));
    return {};
  }
});
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: "$delete"
    },
    closeLabel: {
      type: String,
      default: "$vuetify.close"
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: "$complete"
    },
    label: Boolean,
    link: {
      type: Boolean,
      default: void 0
    },
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    onClick: EventProp,
    onClickOnce: EventProp,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "span"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  },
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a2;
      emit("click", e);
      if (!isClickable.value)
        return;
      (_a2 = link.navigate) == null ? void 0 : _a2.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value],
        "style": [hasColor ? colorStyles.value : void 0],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a2;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : withDirectives(createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, null), [[resolveDirective("slot"), slots.filter, "default"]])]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment$1, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), ((_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text, hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment$1, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("div", mergeProps({
            "key": "close",
            "class": "v-chip__close"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const VDivider = genericComponent()({
  name: "VDivider",
  props: {
    color: String,
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      attrs
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "maxHeight" : "maxWidth"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    useRender(() => createVNode("hr", {
      "class": [{
        "v-divider": true,
        "v-divider--inset": props.inset,
        "v-divider--vertical": props.vertical
      }, themeClasses.value, textColorClasses.value],
      "style": [dividerStyles.value, textColorStyles.value],
      "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
      "role": `${attrs.role || "separator"}`
    }, null));
    return {};
  }
});
const ListKey = Symbol.for("vuetify:list");
function createList() {
  const parent = inject$1(ListKey, {
    hasPrepend: ref(false),
    updateHasPrepend: () => null
  });
  const data = {
    hasPrepend: ref(false),
    updateHasPrepend: (value) => {
      if (value)
        data.hasPrepend.value = value;
    }
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject$1(ListKey, null);
}
const singleOpenStrategy = {
  open: (_ref) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: (_ref2) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: (_ref3) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref3;
    if (!value)
      return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref) => {
      let {
        id,
        value,
        selected
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value2] = _ref2;
          return value2 === "on" ? [...arr, key] : arr;
        }, []);
        if (on.length === 1 && on[0] === id)
          return selected;
      }
      selected.set(id, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on")
          arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref3) => {
      let {
        selected,
        id,
        ...rest
      } = _ref3;
      id = toRaw(id);
      const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      if (v == null ? void 0 : v.length) {
        map = parentStrategy.in(v.slice(0, 1), children, parents);
      }
      return map;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref4) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id))
        return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: (_ref5) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref5;
      id = toRaw(id);
      if (children.has(id))
        return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref6) => {
      let {
        id,
        value,
        selected,
        children,
        parents
      } = _ref6;
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        selected.set(item, value ? "on" : "off");
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = parents.get(id);
      while (parent) {
        const childrenIds = children.get(parent);
        const everySelected = childrenIds.every((cid) => selected.get(cid) === "on");
        const noneSelected = childrenIds.every((cid) => !selected.has(cid) || selected.get(cid) === "off");
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = parents.get(parent);
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value2] = _ref7;
          return value2 === "on" ? [...arr, key] : arr;
        }, []);
        if (on.length === 0)
          return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key))
          arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = Symbol.for("vuetify:nested");
const emptyNested = {
  id: ref(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(/* @__PURE__ */ new Map()),
    children: ref(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    select: () => null,
    opened: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([])
  }
};
const makeNestedProps = propsFactory({
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  selected: Array,
  mandatory: Boolean
}, "nested");
const useNested = (props) => {
  const children = ref(/* @__PURE__ */ new Map());
  const parents = ref(/* @__PURE__ */ new Map());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(v), (v) => [...v.values()]);
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object")
      return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object")
      return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  function getPath(id) {
    const path = [];
    let parent = id;
    while (parent != null) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nested = {
    id: ref(),
    root: {
      opened,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on")
            arr.push(key);
        }
        return arr;
      }),
      register: (id, parentId, isGroup) => {
        parentId && id !== parentId && parents.value.set(id, parentId);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id]);
        }
      },
      unregister: (id) => {
        children.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter((child) => child !== id));
        }
        parents.value.delete(id);
        opened.value.delete(id);
      },
      open: (id, value, event) => {
        vm.emit("click:open", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit("click:select", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      children,
      parents
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isGroup) => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  const uidSymbol = Symbol(getUid());
  const computedId = computed(() => id.value ?? uidSymbol);
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
const VListGroupActivator = /* @__PURE__ */ defineComponent({
  name: "VListGroupActivator",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const makeVListGroupProps = propsFactory({
  activeColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  value: null,
  ...makeTagProps()
}, "v-list-group");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: {
    title: String,
    ...makeVListGroupProps()
  },
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(toRef(props, "value"), true);
    const id = computed(() => `v-list-group--id-${String(_id.value)}`);
    const list = useList();
    function onClick(e) {
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-group", {
        "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }]
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": {
          VListItem: {
            active: isOpen.value,
            activeColor: props.activeColor,
            color: props.color,
            prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
            appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
            title: props.title,
            value: props.value
          }
        }
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(VExpandTransition, null, {
        default: () => {
          var _a2;
          return [withDirectives(createVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), [[vShow, isOpen.value]])];
        }
      })]
    }));
    return {};
  }
});
const VListItemSubtitle = createSimpleFunctional("v-list-item-subtitle");
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    Ripple
  },
  props: {
    active: {
      type: Boolean,
      default: void 0
    },
    activeClass: String,
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    lines: String,
    link: {
      type: Boolean,
      default: void 0
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    subtitle: [String, Number, Boolean],
    title: [String, Number, Boolean],
    value: null,
    onClick: EventProp,
    onClickOnce: EventProp,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const id = computed(() => props.value ?? link.href.value);
    const {
      select,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect
    } = useNestedItem(id, false);
    const list = useList();
    const isActive = computed(() => {
      var _a2;
      return props.active !== false && (props.active || ((_a2 = link.isActive) == null ? void 0 : _a2.value) || isSelected.value);
    });
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
    const roundedProps = computed(() => props.rounded || props.nav);
    const variantProps = computed(() => ({
      color: isActive.value ? props.activeColor ?? props.color : props.color,
      variant: props.variant
    }));
    watch(() => {
      var _a2;
      return (_a2 = link.isActive) == null ? void 0 : _a2.value;
    }, (val) => {
      if (val && parent.value != null) {
        root.open(parent.value, true);
      }
      if (val) {
        openOnSelect(val);
      }
    }, {
      immediate: true
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    }));
    function onClick(e) {
      var _a2;
      emit("click", e);
      if (isGroupActivator || !isClickable.value)
        return;
      (_a2 = link.navigate) == null ? void 0 : _a2.call(link, e);
      props.value != null && select(!isSelected.value, e);
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasColor = !list || isSelected.value || isActive.value;
      const hasTitle = slots.title || props.title;
      const hasSubtitle = slots.subtitle || props.subtitle;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      return withDirectives(createVNode(Tag, {
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value],
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a2;
          return [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-list-item__prepend"
          }, [!slots.prepend ? createVNode(Fragment$1, null, [props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "density": props.density,
            "image": props.prependAvatar
          }, null), props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": props.prependIcon
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.prependAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.prependIcon
              },
              VListItemAction: {
                start: true
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, slotProps.value)];
            }
          })]), createVNode("div", {
            "class": "v-list-item__content",
            "data-no-activator": ""
          }, [hasTitle && createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                title: props.title
              })) ?? props.title];
            }
          }), hasSubtitle && createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
                subtitle: props.subtitle
              })) ?? props.subtitle];
            }
          }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-list-item__append"
          }, [!slots.append ? createVNode(Fragment$1, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "density": props.density,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "density": props.density,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                end: true
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.append) == null ? void 0 : _a3.call(slots, slotProps.value)];
            }
          })])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple]]);
    });
    return {};
  }
});
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: {
    color: String,
    inset: Boolean,
    sticky: Boolean,
    title: String,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": ["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value],
        "style": {
          textColorStyles
        }
      }, {
        default: () => {
          var _a2;
          return [hasText && createVNode("div", {
            "class": "v-list-subheader__text"
          }, [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.title])];
        }
      });
    });
    return {};
  }
});
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: {
    items: Array
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => {
      var _a2, _b;
      return ((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? ((_b = props.items) == null ? void 0 : _b.map((_ref2) => {
        var _a3, _b2;
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === "divider") {
          return ((_a3 = slots.divider) == null ? void 0 : _a3.call(slots, {
            props: itemProps
          })) ?? createVNode(VDivider, itemProps, null);
        }
        if (type === "subheader") {
          return ((_b2 = slots.subheader) == null ? void 0 : _b2.call(slots, {
            props: itemProps
          })) ?? createVNode(VListSubheader, itemProps, {
            default: slots.subheader
          });
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps) => {
            var _a4;
            return (_a4 = slots.subtitle) == null ? void 0 : _a4.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          prepend: slots.prepend ? (slotProps) => {
            var _a4;
            return (_a4 = slots.prepend) == null ? void 0 : _a4.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          append: slots.append ? (slotProps) => {
            var _a4;
            return (_a4 = slots.append) == null ? void 0 : _a4.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          default: slots.default ? (slotProps) => {
            var _a4;
            return (_a4 = slots.default) == null ? void 0 : _a4.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          title: slots.title ? (slotProps) => {
            var _a4;
            return (_a4 = slots.title) == null ? void 0 : _a4.call(slots, {
              ...slotProps,
              item
            });
          } : void 0
        };
        const [listGroupProps, _1] = VListGroup.filterProps(itemProps);
        return children ? createVNode(VListGroup, mergeProps({
          "value": itemProps == null ? void 0 : itemProps.value
        }, listGroupProps), {
          activator: (_ref3) => {
            let {
              props: activatorProps
            } = _ref3;
            return slots.header ? slots.header({
              props: {
                ...itemProps,
                ...activatorProps
              }
            }) : createVNode(VListItem, mergeProps(itemProps, activatorProps), slotsWithItem);
          },
          default: () => createVNode(VListChildren, {
            "items": children
          }, slots)
        }) : slots.item ? slots.item(itemProps) : createVNode(VListItem, itemProps, slotsWithItem);
      }));
    };
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean
}, "item");
function transformItem$1(props, item) {
  const title = getPropertyFromItem(item, props.itemTitle, item);
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue, title);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? typeof item === "object" && item != null && !Array.isArray(item) ? "children" in item ? pick(item, ["children"])[1] : item : void 0 : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    title: String(_props.title ?? ""),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformItems$1(props, children) : void 0,
    raw: item
  };
}
function transformItems$1(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$1(props, item));
  }
  return array;
}
function useItems(props) {
  const items = computed(() => transformItems$1(props, props.items));
  function transformIn(value) {
    return value.map((item) => transformItem$1(props, item));
  }
  function transformOut(value) {
    return value.map((_ref) => {
      let {
        props: props2
      } = _ref;
      return props2.value;
    });
  }
  return {
    items,
    transformIn,
    transformOut
  };
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function transformItem(props, item) {
  const type = getPropertyFromItem(item, props.itemType, "item");
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? pick(item, ["children"])[1] : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const VList = genericComponent()({
  name: "VList",
  props: {
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    lines: {
      type: [Boolean, String],
      default: "one"
    },
    nav: Boolean,
    ...makeNestedProps({
      selectStrategy: "single-leaf",
      openStrategy: "list"
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    itemType: {
      type: String,
      default: "type"
    },
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    "update:selected": (val) => true,
    "update:opened": (val) => true,
    "click:open": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      open,
      select
    } = useNested(props);
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(props, "activeColor");
    const color = toRef(props, "color");
    createList();
    provideDefaults({
      VListGroup: {
        activeColor,
        color
      },
      VListItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor,
        color,
        density: toRef(props, "density"),
        disabled: toRef(props, "disabled"),
        lines: toRef(props, "lines"),
        nav: toRef(props, "nav"),
        variant: toRef(props, "variant")
      }
    });
    const isFocused = ref(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a2;
      if (!isFocused.value && !(e.relatedTarget && ((_a2 = contentRef.value) == null ? void 0 : _a2.contains(e.relatedTarget))))
        focus();
    }
    function onKeydown(e) {
      if (!contentRef.value)
        return;
      if (e.key === "ArrowDown") {
        focus("next");
      } else if (e.key === "ArrowUp") {
        focus("prev");
      } else if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      } else {
        return;
      }
      e.preventDefault();
    }
    function focus(location2) {
      var _a2, _b, _c;
      if (!contentRef.value)
        return;
      const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
      const idx = focusable.indexOf(document.activeElement);
      if (!location2) {
        if (!contentRef.value.contains(document.activeElement)) {
          (_a2 = focusable[0]) == null ? void 0 : _a2.focus();
        }
      } else if (location2 === "first") {
        (_b = focusable[0]) == null ? void 0 : _b.focus();
      } else if (location2 === "last") {
        (_c = focusable.at(-1)) == null ? void 0 : _c.focus();
      } else {
        let el;
        let idxx = idx;
        const inc2 = location2 === "next" ? 1 : -1;
        do {
          idxx += inc2;
          el = focusable[idxx];
        } while ((!el || el.offsetParent == null) && idxx < focusable.length && idxx >= 0);
        if (el)
          el.focus();
        else
          focus(location2 === "next" ? "first" : "last");
      }
    }
    useRender(() => {
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": ["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value],
        "role": "listbox",
        "aria-activedescendant": void 0,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onKeydown": onKeydown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus
    };
  }
});
const VListImg = createSimpleFunctional("v-list-img");
const VListItemAction = genericComponent()({
  name: "VListItemAction",
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-action", {
        "v-list-item-action--start": props.start,
        "v-list-item-action--end": props.end
      }]
    }, slots));
    return {};
  }
});
const VListItemMedia = genericComponent()({
  name: "VListItemMedia",
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-list-item-media", {
          "v-list-item-media--start": props.start,
          "v-list-item-media--end": props.end
        }]
      }, slots);
    });
    return {};
  }
});
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  const runDelayFactory = (prop) => () => {
    return Promise.resolve(true);
  };
  return {
    runCloseDelay: runDelayFactory(),
    runOpenDelay: runDelayFactory()
  };
}
const VMenuSymbol = Symbol.for("vuetify:v-menu");
const makeActivatorProps = propsFactory({
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "v-overlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop
  } = _ref;
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay();
  const availableEvents = {
    click: (e) => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      isActive.value = !isActive.value;
    },
    mouseenter: (e) => {
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    mouseleave: (e) => {
      isHovered = false;
      runCloseDelay();
    },
    focus: (e) => {
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    blur: (e) => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.click = availableEvents.click;
    }
    if (props.openOnHover) {
      events.mouseenter = availableEvents.mouseenter;
      events.mouseleave = availableEvents.mouseleave;
    }
    if (openOnFocus.value) {
      events.focus = availableEvents.focus;
      events.blur = availableEvents.blur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.mouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.mouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject$1(VMenuSymbol, null);
      events.click = () => {
        isActive.value = false;
        menu == null ? void 0 : menu.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.mouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.mouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
      isActive.value = false;
    }
  });
  const activatorRef = ref();
  watchEffect(() => {
    if (!activatorRef.value)
      return;
    nextTick(() => {
      const activator = activatorRef.value;
      activatorEl.value = isComponentInstance(activator) ? activator.$el : activator;
    });
  });
  const vm = getCurrentInstance("useActivator");
  let scope;
  watch(() => !!props.activator, (val) => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
  return {
    activatorEl,
    activatorRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function _useActivator(props, vm, _ref2) {
  let {
    activatorEl,
    activatorEvents
  } = _ref2;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    Object.entries(activatorEvents.value).forEach((_ref3) => {
      let [name, cb] = _ref3;
      el.addEventListener(name, cb);
    });
    Object.keys(_props).forEach((k) => {
      if (_props[k] == null) {
        el.removeAttribute(k);
      } else {
        el.setAttribute(k, _props[k]);
      }
    });
  }
  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    Object.entries(activatorEvents.value).forEach((_ref4) => {
      let [name, cb] = _ref4;
      el.removeEventListener(name, cb);
    });
    Object.keys(_props).forEach((k) => {
      el.removeAttribute(k);
    });
  }
  function getActivator() {
    var _a2, _b;
    let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
    let activator;
    if (selector) {
      if (selector === "parent") {
        let el = (_b = (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$el) == null ? void 0 : _b.parentNode;
        while (el.hasAttribute("data-no-activator")) {
          el = el.parentNode;
        }
        activator = el;
      } else if (typeof selector === "string") {
        activator = document.querySelector(selector);
      } else if ("$el" in selector) {
        activator = selector.$el;
      } else {
        activator = selector;
      }
    }
    activatorEl.value = (activator == null ? void 0 : activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
    return activatorEl.value;
  }
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = ref(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager)
      isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset$1(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "v-overlay-location-strategies");
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el) {
  const contentBox = nullifyTransforms(el);
  contentBox.x -= parseFloat(el.style.left || 0);
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = isFixedPosition(data.activatorEl.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed"
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2)
        offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  const observer = new ResizeObserver(() => {
    if (observe)
      updateLocation();
  });
  watch([data.activatorEl, data.contentEl], (_ref, _ref2) => {
    let [newActivatorEl, newContentEl] = _ref;
    let [oldActivatorEl, oldContentEl] = _ref2;
    if (oldActivatorEl)
      observer.unobserve(oldActivatorEl);
    if (newActivatorEl)
      observer.observe(newActivatorEl);
    if (oldContentEl)
      observer.unobserve(oldContentEl);
    if (newContentEl)
      observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => observe = true);
    });
    if (!data.activatorEl.value || !data.contentEl.value)
      return;
    const targetBox = data.activatorEl.value.getBoundingClientRect();
    const contentBox = getIntrinsicSize(data.contentEl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push(document.documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const rect = el.getBoundingClientRect();
      const scrollBox = new Box({
        x: el === document.documentElement ? 0 : rect.x,
        y: el === document.documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight
      });
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x2,
        y: y2
      } = getOffset$1(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x2 -= offset.value[0];
          break;
        case "right":
          x2 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x2 -= offset.value[1];
          break;
        case "right":
          x2 += offset.value[1];
          break;
      }
      box.x += x2;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x2,
        y: y2
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped[key] = true;
            }
          }
        });
        if (reset)
          continue;
      }
      if (overflows.x.before) {
        x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        x += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: convertToUnit(pixelRound(x)),
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();
    if (!result)
      return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame)
      frame();
    if (frames.length)
      run();
    else
      clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "v-overlay-scroll-strategies");
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(data.activatorEl.value ?? data.contentEl.value, onScroll);
}
function blockScrollStrategy(data, props) {
  var _a2;
  const offsetParent = (_a2 = data.root.value) == null ? void 0 : _a2.offsetParent;
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data.activatorEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
  if (scrollableParent) {
    data.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x;
      el.scrollTop = -y;
    });
    if (scrollableParent) {
      data.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf2 = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      var _a2, _b;
      const start = performance.now();
      (_b = (_a2 = data.updateLocation).value) == null ? void 0 : _b.call(_a2, e);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(data.activatorEl.value ?? data.contentEl.value, (e) => {
        if (slow) {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
    cancelAnimationFrame(raf2);
  });
}
function bindScroll(el, onScroll) {
  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
function useHydration() {
  return ref(false);
}
function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}
const StackSymbol = Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject$1(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = ref(+zIndex.value);
  useToggleScope(isActive, () => {
    var _a2;
    const lastZIndex = (_a2 = globalStack.at(-1)) == null ? void 0 : _a2[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent == null ? void 0 : parent.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = ref(true);
  if (createStackEntry) {
    watchEffect(() => {
      var _a2;
      const _isTop = ((_a2 = globalStack.at(-1)) == null ? void 0 : _a2[0]) === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = computed(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target.value;
    if (_target === true || !IN_BROWSER)
      return void 0;
    const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
    if (targetElement == null) {
      warn$1(`Unable to locate target ${_target}`);
      return void 0;
    }
    let container = targetElement.querySelector(":scope > .v-overlay-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "v-overlay-container";
      targetElement.appendChild(container);
    }
    return container;
  });
  return {
    teleportTarget
  };
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false)
    return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target)
    return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(document);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: true
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  unmounted(el, binding) {
    if (!el._clickOutside)
      return;
    handleShadow(el, (app) => {
      var _a2;
      if (!app || !((_a2 = el._clickOutside) == null ? void 0 : _a2[binding.instance.$.uid]))
        return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [String, Boolean],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, "v-overlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    "click:outside": (e) => true,
    "update:modelValue": (value) => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled))
          model.value = v;
      }
    });
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, toRef(props, "zIndex"), props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v)
        isActive.value = false;
    });
    const root = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies();
    function onClickOutside(e) {
      emit("click:outside", e);
      if (!props.persistent)
        isActive.value = false;
      else
        animateClick();
    }
    function closeConditional() {
      return isActive.value && globalTop.value;
    }
    useRouter();
    useToggleScope(() => props.closeOnBack, () => {
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation)
        return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    useRender(() => {
      var _a2;
      return createVNode(Fragment$1, null, [(_a2 = slots.activator) == null ? void 0 : _a2.call(slots, {
        isActive: isActive.value,
        props: mergeProps({
          ref: activatorRef
        }, toHandlers(activatorEvents.value), props.activatorProps)
      }), isMounted.value && createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [hasContent.value && createVNode("div", mergeProps({
          "class": ["v-overlay", {
            "v-overlay--absolute": props.absolute || props.contained,
            "v-overlay--active": isActive.value,
            "v-overlay--contained": props.contained
          }, themeClasses.value, rtlClasses.value],
          "style": [stackStyles.value, {
            top: convertToUnit(top.value)
          }],
          "ref": root
        }, scopeId, attrs), [createVNode(Scrim, mergeProps({
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim
        }, toHandlers(scrimEvents.value)), null), createVNode(MaybeTransition, {
          "appear": true,
          "persisted": true,
          "transition": props.transition,
          "target": activatorEl.value,
          "onAfterLeave": () => {
            onAfterLeave();
            emit("afterLeave");
          }
        }, {
          default: () => {
            var _a3;
            return [withDirectives(createVNode("div", mergeProps({
              "ref": contentEl,
              "class": ["v-overlay__content", props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, toHandlers(contentEvents.value), props.contentProps), [(_a3 = slots.default) == null ? void 0 : _a3.call(slots, {
              isActive
            })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])];
          }
        })])]
      })]);
    });
    return {
      activatorEl,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
const VMenu = genericComponent()({
  name: "VMenu",
  props: {
    // TODO
    // disableKeys: Boolean,
    id: String,
    ...omit(makeVOverlayProps({
      closeDelay: 250,
      closeOnContentClick: true,
      locationStrategy: "connected",
      openDelay: 300,
      scrim: false,
      scrollStrategy: "reposition",
      transition: {
        component: VDialogTransition
      }
    }), ["absolute"])
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject$1(VMenuSymbol, null);
    const openChildren = ref(0);
    provide(VMenuSymbol, {
      register() {
        ++openChildren.value;
      },
      unregister() {
        --openChildren.value;
      },
      closeParents() {
        setTimeout(() => {
          if (!openChildren.value) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    watch(isActive, (val) => {
      val ? parent == null ? void 0 : parent.register() : parent == null ? void 0 : parent.unregister();
    });
    function onClickOutside() {
      parent == null ? void 0 : parent.closeParents();
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-owns": id.value
    }, props.activatorProps));
    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-menu"]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "onClick:outside": onClickOutside
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeItemsProps({
    itemChildren: false
  })
}, "v-select");
const VSelect = genericComponent()({
  name: "VSelect",
  props: {
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a2;
        if (_menu.value && !v && ((_a2 = vMenuRef.value) == null ? void 0 : _a2.ΨopenChildren))
          return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm();
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const selected = computed(() => selections.value.map((selection) => selection.props.value));
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !selections.value.some((s) => s === item));
      }
      return items.value;
    });
    const listRef = ref();
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (props.hideNoData && !items.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      var _a2, _b, _c, _d;
      if (props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "ArrowDown") {
        (_a2 = listRef.value) == null ? void 0 : _a2.focus("next");
      } else if (e.key === "ArrowUp") {
        (_b = listRef.value) == null ? void 0 : _b.focus("prev");
      } else if (e.key === "Home") {
        (_c = listRef.value) == null ? void 0 : _c.focus("first");
      } else if (e.key === "End") {
        (_d = listRef.value) == null ? void 0 : _d.focus("last");
      }
    }
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection) => props.valueComparator(selection, item.value));
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }
    function onBlur(e) {
      var _a2;
      if (!((_a2 = listRef.value) == null ? void 0 : _a2.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onFocusout(e) {
      var _a2;
      if (e.relatedTarget == null) {
        (_a2 = vTextFieldRef.value) == null ? void 0 : _a2.focus();
      }
    }
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots["no-data"]);
      const [textFieldProps] = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": (v) => {
          if (v == null)
            model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": true,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createVNode(Fragment$1, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition
        }, props.menuProps), {
          default: () => [hasList && createVNode(VList, {
            "ref": listRef,
            "selected": selected.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onFocusout": onFocusout
          }, {
            default: () => {
              var _a2, _b, _c;
              return [!displayItems.value.length && !props.hideNoData && (((_a2 = slots["no-data"]) == null ? void 0 : _a2.call(slots)) ?? createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), (_b = slots["prepend-item"]) == null ? void 0 : _b.call(slots), displayItems.value.map((item, index) => {
                var _a3;
                if (slots.item) {
                  return (_a3 = slots.item) == null ? void 0 : _a3.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  });
                }
                return createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  }
                });
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), selections.value.map((item, index) => {
          var _a2;
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          return createVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.chip) == null ? void 0 : _a3.call(slots, {
                item,
                index,
                props: slotProps
              })];
            }
          }) : ((_a2 = slots.selection) == null ? void 0 : _a2.call(slots, {
            item,
            index
          })) ?? createVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })])
      });
    });
    return forwardRefs({
      menu,
      select
    }, vTextFieldRef);
  }
});
const defaultFilter = (value, query, item) => {
  if (value == null || query == null)
    return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a2;
  const array = [];
  const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
  const keys2 = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
  if (!(items == null ? void 0 : items.length))
    return array;
  loop:
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const customMatches = {};
      const defaultMatches = {};
      let match = -1;
      if (query && !(options == null ? void 0 : options.noFilter)) {
        if (typeof item === "object") {
          const filterKeys = keys2 || Object.keys(item);
          for (const key of filterKeys) {
            const value = getPropertyFromItem(item, key, item);
            const keyFilter = (_a2 = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a2[key];
            match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match !== -1 && match !== false) {
              if (keyFilter)
                customMatches[key] = match;
              else
                defaultMatches[key] = match;
            } else if ((options == null ? void 0 : options.filterMode) === "every") {
              continue loop;
            }
          }
        } else {
          match = filter(item, query, item);
          if (match !== -1 && match !== false) {
            defaultMatches.title = match;
          }
        }
        const defaultMatchesLength = Object.keys(defaultMatches).length;
        const customMatchesLength = Object.keys(customMatches).length;
        if (!defaultMatchesLength && !customMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength))
          continue;
      }
      array.push({
        index: i,
        matches: {
          ...defaultMatches,
          ...customMatches
        }
      });
    }
  return array;
}
function useFilter(props, items, query, options) {
  const strQuery = computed(() => typeof (query == null ? void 0 : query.value) !== "string" && typeof (query == null ? void 0 : query.value) !== "number" ? "" : String(query.value));
  const filteredItems = ref([]);
  const filteredMatches = ref(/* @__PURE__ */ new Map());
  watchEffect(() => {
    filteredItems.value = [];
    filteredMatches.value = /* @__PURE__ */ new Map();
    const transformedItems = unref(items);
    const results = filterItems(transformedItems, strQuery.value, {
      customKeyFilter: props.customKeyFilter,
      default: props.customFilter,
      filterKeys: unref(options == null ? void 0 : options.filterKeys) ?? props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = transformedItems[index];
      filteredItems.value.push(item);
      filteredMatches.value.set(item.value, matches);
    });
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
function highlightResult$1(text, matches, length) {
  if (matches == null)
    return text;
  if (Array.isArray(matches))
    throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment$1, null, [createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const VAutocomplete = genericComponent()({
  name: "VAutocomplete",
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ["title"]
    }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    "update:search": (val) => true,
    "update:modelValue": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const vMenuRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a2;
        if (_menu.value && !v && ((_a2 = vMenuRef.value) == null ? void 0 : _a2.ΨopenChildren))
          return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const search = useProxiedModel(props, "search", "");
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm();
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, computed(() => isPristine.value ? void 0 : search.value));
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !selections.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const selected = computed(() => selections.value.map((selection) => selection.props.value));
    const listRef = ref();
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = "";
    }
    function onMousedownControl() {
      if (props.hideNoData && !items.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      menu.value = true;
    }
    function onKeydown(e) {
      var _a2, _b;
      if (props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown"].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e.key)) {
        menu.value = false;
      }
      if (["Enter", "Escape", "Tab"].includes(e.key)) {
        isPristine.value = true;
      }
      if (e.key === "ArrowDown") {
        (_a2 = listRef.value) == null ? void 0 : _a2.focus("next");
      } else if (e.key === "ArrowUp") {
        (_b = listRef.value) == null ? void 0 : _b.focus("prev");
      }
    }
    function onInput(e) {
      search.value = e.target.value;
    }
    function onAfterLeave() {
      if (isFocused.value)
        isPristine.value = true;
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      var _a2;
      if (e.relatedTarget == null) {
        (_a2 = vTextFieldRef.value) == null ? void 0 : _a2.focus();
      }
    }
    const isSelecting = ref(false);
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection) => props.valueComparator(selection, item.value));
        if (index === -1) {
          model.value = [...model.value, item];
          search.value = "";
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        isSelecting.value = true;
        if (!slots.selection) {
          search.value = item.title;
        }
        menu.value = false;
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      }
    }
    watch(isFocused, (val) => {
      var _a2;
      if (val) {
        isSelecting.value = true;
        search.value = props.multiple || !!slots.selection ? "" : String(((_a2 = selections.value.at(-1)) == null ? void 0 : _a2.props.title) ?? "");
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        menu.value = false;
        search.value = "";
      }
    });
    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value)
        return;
      if (val)
        menu.value = true;
      isPristine.value = !val;
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots["no-data"]);
      const [textFieldProps] = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": (v) => {
          if (v == null)
            model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "onInput": onInput,
        "class": ["v-autocomplete", {
          "v-autocomplete--active-menu": menu.value,
          "v-autocomplete--chips": !!props.chips,
          [`v-autocomplete--${props.multiple ? "multiple" : "single"}`]: true,
          "v-autocomplete--selection-slot": !!slots.selection
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": props.readonly,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createVNode(Fragment$1, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-autocomplete__content",
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => [hasList && createVNode(VList, {
            "ref": listRef,
            "selected": selected.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onFocusin": onFocusin,
            "onFocusout": onFocusout
          }, {
            default: () => {
              var _a2, _b, _c;
              return [!displayItems.value.length && !props.hideNoData && (((_a2 = slots["no-data"]) == null ? void 0 : _a2.call(slots)) ?? createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), (_b = slots["prepend-item"]) == null ? void 0 : _b.call(slots), displayItems.value.map((item, index) => {
                var _a3;
                return ((_a3 = slots.item) == null ? void 0 : _a3.call(slots, {
                  item,
                  index,
                  props: mergeProps(item.props, {
                    onClick: () => select(item)
                  })
                })) ?? createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  },
                  title: () => {
                    var _a4, _b2;
                    return isPristine.value ? item.title : highlightResult$1(item.title, (_a4 = getMatches(item)) == null ? void 0 : _a4.title, ((_b2 = search.value) == null ? void 0 : _b2.length) ?? 0);
                  }
                });
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), selections.value.map((item, index) => {
          var _a2;
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          return createVNode("div", {
            "key": item.value,
            "class": "v-autocomplete__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => {
              var _a3;
              return [(_a3 = slots.chip) == null ? void 0 : _a3.call(slots, {
                item,
                index,
                props: slotProps
              })];
            }
          }) : ((_a2 = slots.selection) == null ? void 0 : _a2.call(slots, {
            item,
            index
          })) ?? createVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])])]);
        })])
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: {
    bordered: Boolean,
    color: String,
    content: [Number, String],
    dot: Boolean,
    floating: Boolean,
    icon: IconValue,
    inline: Boolean,
    label: {
      type: String,
      default: "$vuetify.badge"
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...makeLocationProps({
      location: "top end"
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeTransitionProps({
      transition: "scale-rotate-transition"
    })
  },
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? +(props.offsetY ?? 0) : ["left", "right"].includes(side) ? +(props.offsetX ?? 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pick(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }]
      }, attrs), {
        default: () => {
          var _a2, _b;
          return [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a2 = ctx.slots).default) == null ? void 0 : _b.call(_a2), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a3, _b2;
              return [withDirectives(createVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b2 = (_a3 = ctx.slots).badge) == null ? void 0 : _b2.call(_a3) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const VBannerActions = genericComponent()({
  name: "VBannerActions",
  props: {
    color: String,
    density: String
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": "v-banner-actions"
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const VBannerText = createSimpleFunctional("v-banner-text");
const VBanner = genericComponent()({
  name: "VBanner",
  props: {
    avatar: String,
    color: String,
    icon: IconValue,
    lines: String,
    stacked: Boolean,
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      mobile
    } = useDisplay();
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const color = toRef(props, "color");
    const density = toRef(props, "density");
    provideDefaults({
      VBannerActions: {
        color,
        density
      }
    });
    useRender(() => {
      const hasText = !!(props.text || slots.text);
      const hasPrependMedia = !!(props.avatar || props.icon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return createVNode(props.tag, {
        "class": ["v-banner", {
          "v-banner--stacked": props.stacked || mobile.value,
          "v-banner--sticky": props.sticky,
          [`v-banner--${props.lines}-line`]: !!props.lines
        }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, themeClasses.value],
        "style": [dimensionStyles.value, locationStyles.value],
        "role": "banner"
      }, {
        default: () => {
          var _a2;
          return [hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-banner__prepend"
          }, [!slots.prepend ? createVNode(VAvatar, {
            "key": "prepend-avatar",
            "color": color.value,
            "density": density.value,
            "icon": props.icon,
            "image": props.avatar
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                color: color.value,
                density: density.value,
                icon: props.icon,
                image: props.avatar
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-banner__content"
          }, [hasText && createVNode(VBannerText, {
            "key": "text"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.text) == null ? void 0 : _a3.call(slots)) ?? props.text];
            }
          }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), slots.actions && createVNode(VBannerActions, {
            "key": "actions"
          }, slots.actions)];
        }
      });
    });
  }
});
const VBottomNavigation = genericComponent()({
  name: "VBottomNavigation",
  props: {
    bgColor: String,
    color: String,
    grow: Boolean,
    mode: {
      type: String,
      validator: (v) => !v || ["horizontal", "shift"].includes(v)
    },
    height: {
      type: [Number, String],
      default: 56
    },
    active: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: "bottom-navigation"
    }),
    ...makeTagProps({
      tag: "header"
    }),
    ...makeGroupProps({
      modelValue: true,
      selectedClass: "v-btn--selected"
    }),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme();
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const height = computed(() => Number(props.height) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0));
    const isActive = toRef(props, "active");
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useGroup(props, VBtnToggleSymbol);
    provideDefaults({
      VBtn: {
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        stacked: computed(() => props.mode !== "horizontal"),
        variant: "text"
      }
    }, {
      scoped: true
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-bottom-navigation", {
          "v-bottom-navigation--active": isActive.value,
          "v-bottom-navigation--grow": props.grow,
          "v-bottom-navigation--shift": props.mode === "shift"
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, {
          height: convertToUnit(height.value),
          transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, "%")})`
        }, ssrBootStyles.value]
      }, {
        default: () => [slots.default && createVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      });
    });
    return {};
  }
});
const VBreadcrumbsDivider = genericComponent()({
  name: "VBreadcrumbsDivider",
  props: {
    divider: [Number, String]
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a2;
      return createVNode("li", {
        "class": "v-breadcrumbs-divider"
      }, [((_a2 = slots == null ? void 0 : slots.default) == null ? void 0 : _a2.call(slots)) ?? props.divider]);
    });
    return {};
  }
});
const VBreadcrumbsItem = genericComponent()({
  name: "VBreadcrumbsItem",
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    title: String,
    ...makeRouterProps(),
    ...makeTagProps({
      tag: "li"
    })
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a2;
      return props.active || ((_a2 = link.isActive) == null ? void 0 : _a2.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      const Tag = link.isLink.value ? "a" : props.tag;
      return createVNode(Tag, {
        "class": ["v-breadcrumbs-item", {
          "v-breadcrumbs-item--active": isActive.value,
          "v-breadcrumbs-item--disabled": props.disabled,
          "v-breadcrumbs-item--link": link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "href": link.href.value,
        "aria-current": isActive.value ? "page" : void 0,
        "onClick": link.navigate
      }, {
        default: () => {
          var _a2;
          return [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.title];
        }
      });
    });
    return {};
  }
});
const VBreadcrumbs = genericComponent()({
  name: "VBreadcrumbs",
  props: {
    activeClass: String,
    activeColor: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: "/"
    },
    icon: IconValue,
    items: {
      type: Array,
      default: () => []
    },
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "ul"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(props, "divider")
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor: toRef(props, "activeColor"),
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled")
      }
    });
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value],
        "style": backgroundColorStyles.value
      }, {
        default: () => {
          var _a2;
          return [hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-breadcrumbs__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "start": true,
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.icon,
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, slots.prepend)]), props.items.map((item, index, array) => createVNode(Fragment$1, null, [createVNode(VBreadcrumbsItem, mergeProps({
            "key": index,
            "disabled": index >= array.length - 1
          }, typeof item === "string" ? {
            title: item
          } : item), {
            default: slots.title ? () => {
              var _a3;
              return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
                item,
                index
              });
            } : void 0
          }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
            default: slots.divider ? () => {
              var _a3;
              return (_a3 = slots.divider) == null ? void 0 : _a3.call(slots, {
                item,
                index
              });
            } : void 0
          })])), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      });
    });
    return {};
  }
});
const VCardActions = /* @__PURE__ */ defineComponent({
  name: "VCardActions",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": "v-card-actions"
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const VCardSubtitle = createSimpleFunctional("v-card-subtitle");
const VCardTitle = createSimpleFunctional("v-card-title");
const VCardItem = genericComponent()({
  name: "VCardItem",
  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: String,
    title: String,
    ...makeDensityProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a2;
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title || slots.title);
      const hasSubtitle = !!(props.subtitle || slots.subtitle);
      return createVNode("div", {
        "class": "v-card-item"
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-card-item__prepend"
      }, [!slots.prepend ? hasPrependMedia && createVNode(VAvatar, {
        "key": "prepend-avatar",
        "density": props.density,
        "icon": props.prependIcon,
        "image": props.prependAvatar
      }, null) : createVNode(VDefaultsProvider, {
        "key": "prepend-defaults",
        "disabled": !hasPrependMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            icon: props.prependIcon,
            image: props.prependAvatar
          }
        }
      }, slots.prepend)]), createVNode("div", {
        "class": "v-card-item__content"
      }, [hasTitle && createVNode(VCardTitle, {
        "key": "title"
      }, {
        default: () => {
          var _a3;
          return [((_a3 = slots.title) == null ? void 0 : _a3.call(slots)) ?? props.title];
        }
      }), hasSubtitle && createVNode(VCardSubtitle, {
        "key": "subtitle"
      }, {
        default: () => {
          var _a3;
          return [((_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots)) ?? props.subtitle];
        }
      }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-card-item__append"
      }, [!slots.append ? hasAppendMedia && createVNode(VAvatar, {
        "key": "append-avatar",
        "density": props.density,
        "icon": props.appendIcon,
        "image": props.appendAvatar
      }, null) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !hasAppendMedia,
        "defaults": {
          VAvatar: {
            density: props.density,
            icon: props.appendIcon,
            image: props.appendAvatar
          }
        }
      }, slots.append)])]);
    });
    return {};
  }
});
const VCardText = createSimpleFunctional("v-card-text");
const VCard = genericComponent()({
  name: "VCard",
  directives: {
    Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: {
      type: Boolean,
      default: void 0
    },
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeVariantProps({
      variant: "elevated"
    })
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      return withDirectives(createVNode(Tag, {
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
        "href": link.href.value,
        "onClick": isClickable.value && link.navigate,
        "tabindex": props.disabled ? -1 : void 0
      }, {
        default: () => {
          var _a2;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-card__image"
          }, [!slots.image ? createVNode(VImg, {
            "key": "image-img",
            "cover": true,
            "src": props.image
          }, null) : createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, slots.image)]), createVNode(LoaderSlot, {
            "name": "v-card",
            "active": !!props.loading,
            "color": typeof props.loading === "boolean" ? void 0 : props.loading
          }, {
            default: slots.loader
          }), hasCardItem && createVNode(VCardItem, {
            "key": "item",
            "prependAvatar": props.prependAvatar,
            "prependIcon": props.prependIcon,
            "title": props.title,
            "subtitle": props.subtitle,
            "appendAvatar": props.appendAvatar,
            "appendIcon": props.appendIcon
          }, {
            default: slots.item,
            prepend: slots.prepend,
            title: slots.title,
            subtitle: slots.subtitle,
            append: slots.append
          }), hasText && createVNode(VCardText, {
            "key": "text"
          }, {
            default: () => {
              var _a3;
              return [((_a3 = slots.text) == null ? void 0 : _a3.call(slots)) ?? props.text];
            }
          }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots), slots.actions && createVNode(VCardActions, null, {
            default: slots.actions
          }), genOverlays(isClickable.value, "v-card")];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple]]);
    });
    return {};
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a2 = wrapper.start) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a2 = wrapper.end) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a2;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a2 = wrapper.move) == null ? void 0 : _a2.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (value == null ? void 0 : value.options) ?? {
    passive: true
  };
  const uid = (_a2 = binding.instance) == null ? void 0 : _a2.$.uid;
  if (!target || !uid)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a2, _b;
  const target = ((_a2 = binding.value) == null ? void 0 : _a2.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? void 0 : _b.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid)
    return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const Touch$1 = Touch;
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: {
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String, Function, Object],
      default: "$next"
    },
    prevIcon: {
      type: [Boolean, String, Function, Object],
      default: "$prev"
    },
    reverse: Boolean,
    showArrows: {
      type: [Boolean, String],
      validator: (v) => typeof v === "boolean" || v === "hover"
    },
    touch: {
      type: [Object, Boolean],
      default: void 0
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    modelValue: null,
    disabled: Boolean,
    selectedClass: {
      type: String,
      default: "v-window-item--active"
    },
    // TODO: mandatory should probably not be exposed but do this for now
    mandatory: {
      default: "force"
    },
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = ref(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = ref(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        ariaLabel: t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        ariaLabel: t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false)
        return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value]
    }, {
      default: () => {
        var _a2, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? void 0 : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch: Touch$1
  },
  props: {
    reverseTransition: {
      type: [Boolean, String],
      default: void 0
    },
    transition: {
      type: [Boolean, String],
      default: void 0
    },
    ...makeGroupItemProps(),
    ...makeLazyProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window2 = inject$1(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window2 || !groupItem)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = ref(false);
    const hasTransition = computed(() => window2.isReversed.value ? props.reverseTransition !== false : props.transition !== false);
    function onAfterTransition() {
      if (!isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = false;
      if (window2.transitionCount.value > 0) {
        window2.transitionCount.value -= 1;
        if (window2.transitionCount.value === 0) {
          window2.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a2;
      if (isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = true;
      if (window2.transitionCount.value === 0) {
        window2.transitionHeight.value = convertToUnit((_a2 = window2.rootRef.value) == null ? void 0 : _a2.clientHeight);
      }
      window2.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window2) {
          return;
        }
        window2.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window2.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window2.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": isBooted.value && transition.value
    }, {
      default: () => {
        var _a2;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value]
        }, [hasContent.value && ((_a2 = slots.default) == null ? void 0 : _a2.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {};
  }
});
const VCarousel = genericComponent()({
  name: "VCarousel",
  props: {
    color: String,
    cycle: Boolean,
    delimiterIcon: {
      type: IconValue,
      default: "$delimiter"
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6e3,
      validator: (value) => value > 0
    },
    modelValue: null,
    progress: [Boolean, String],
    showArrows: {
      type: [Boolean, String],
      default: true,
      validator: (v) => typeof v === "boolean" || v === "hover"
    },
    verticalDelimiters: [Boolean, String]
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      t
    } = useLocale();
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, (val) => {
      if (val)
        restartTimeout();
      else
        window.clearTimeout(slideTimeout);
    });
    function startTimeout() {
      if (!props.cycle || !windowRef.value)
        return;
      slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6e3);
    }
    function restartTimeout() {
      window.clearTimeout(slideTimeout);
      window.requestAnimationFrame(startTimeout);
    }
    useRender(() => createVNode(VWindow, {
      "ref": windowRef,
      "modelValue": model.value,
      "onUpdate:modelValue": ($event) => model.value = $event,
      "class": ["v-carousel", {
        "v-carousel--hide-delimiter-background": props.hideDelimiterBackground,
        "v-carousel--vertical-delimiters": props.verticalDelimiters
      }],
      "style": {
        height: convertToUnit(props.height)
      },
      "continuous": true,
      "mandatory": "force",
      "showArrows": props.showArrows
    }, {
      default: slots.default,
      additional: (_ref2) => {
        let {
          group
        } = _ref2;
        return createVNode(Fragment$1, null, [!props.hideDelimiters && createVNode("div", {
          "class": "v-carousel__controls",
          "style": {
            left: props.verticalDelimiters === "left" && props.verticalDelimiters ? 0 : "auto",
            right: props.verticalDelimiters === "right" ? 0 : "auto"
          }
        }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              color: props.color,
              icon: props.delimiterIcon,
              size: "x-small",
              variant: "text"
            }
          },
          "scoped": true
        }, {
          default: () => [group.items.value.map((item, index) => {
            const props2 = {
              "aria-label": t("$vuetify.carousel.ariaLabel.delimiter", index + 1, group.items.value.length),
              class: [group.isSelected(item.id) && "v-btn--active"],
              onClick: () => group.select(item.id, true)
            };
            return slots.item ? slots.item({
              props: props2,
              item
            }) : createVNode(VBtn, mergeProps(item, props2), null);
          })]
        })]), props.progress && createVNode(VProgressLinear, {
          "class": "v-carousel__progress",
          "color": typeof props.progress === "string" ? props.progress : void 0,
          "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
        }, null)]);
      },
      prev: slots.prev,
      next: slots.next
    }));
    return {};
  }
});
const VCarouselItem = genericComponent()({
  name: "VCarouselItem",
  inheritAttrs: false,
  props: {
    value: null
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => createVNode(VWindowItem, {
      "class": "v-carousel-item",
      "value": props.value
    }, {
      default: () => [createVNode(VImg, attrs, slots)]
    }));
  }
});
const VCode = createSimpleFunctional("v-code");
const VColorPickerCanvas = /* @__PURE__ */ defineComponent({
  name: "VColorPickerCanvas",
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    height: {
      type: [Number, String],
      default: 150
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },
  emits: {
    "update:color": (color) => true,
    "update:position": (hue) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = ref(false);
    const isOutsideUpdate = ref(false);
    const dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotStyles = computed(() => {
      const {
        x,
        y
      } = dotPosition.value;
      const radius = parseInt(props.dotSize, 10) / 2;
      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
      };
    });
    const canvasRef = ref();
    const canvasWidth = ref(parseFloat(props.width));
    const canvasHeight = ref(parseFloat(props.height));
    const {
      resizeRef
    } = useResizeObserver();
    function updateDotPosition(x, y, rect) {
      const {
        left,
        top,
        width,
        height
      } = rect;
      dotPosition.value = {
        x: clamp(x - left, 0, width),
        y: clamp(y - top, 0, height)
      };
    }
    function handleClick(e) {
      if (props.disabled || !canvasRef.value)
        return;
      updateDotPosition(e.clientX, e.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseDown(e) {
      e.preventDefault();
      if (props.disabled)
        return;
      isInteracting.value = true;
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    function handleMouseMove(e) {
      if (props.disabled || !canvasRef.value)
        return;
      isInteracting.value = true;
      const coords = getEventCoordinates(e);
      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    watch(dotPosition, () => {
      var _a2, _b;
      if (isOutsideUpdate.value) {
        isOutsideUpdate.value = false;
        return;
      }
      if (!canvasRef.value)
        return;
      const {
        x,
        y
      } = dotPosition.value;
      emit("update:color", {
        h: ((_a2 = props.color) == null ? void 0 : _a2.h) ?? 0,
        s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
        v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
        a: ((_b = props.color) == null ? void 0 : _b.a) ?? 1
      });
    });
    function updateCanvas() {
      var _a2;
      if (!canvasRef.value)
        return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext("2d");
      if (!ctx)
        return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, "hsla(0, 0%, 100%, 1)");
      saturationGradient.addColorStop(1, `hsla(${((_a2 = props.color) == null ? void 0 : _a2.h) ?? 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, "hsla(0, 0%, 100%, 0)");
      valueGradient.addColorStop(1, "hsla(0, 0%, 0%, 1)");
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    watch(() => {
      var _a2;
      return (_a2 = props.color) == null ? void 0 : _a2.h;
    }, updateCanvas, {
      immediate: true
    });
    watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
      updateCanvas();
      dotPosition.value = {
        x: dotPosition.value.x * newVal[0] / oldVal[0],
        y: dotPosition.value.y * newVal[1] / oldVal[1]
      };
    }, {
      flush: "post"
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }
      isOutsideUpdate.value = true;
      dotPosition.value = props.color ? {
        x: props.color.s * canvasWidth.value,
        y: (1 - props.color.v) * canvasHeight.value
      } : {
        x: 0,
        y: 0
      };
    }, {
      deep: true,
      immediate: true
    });
    useRender(() => createVNode("div", {
      "ref": resizeRef,
      "class": "v-color-picker-canvas",
      "onClick": handleClick,
      "onMousedown": handleMouseDown,
      "onTouchstart": handleMouseDown
    }, [createVNode("canvas", {
      "ref": canvasRef,
      "width": canvasWidth.value,
      "height": canvasHeight.value
    }, null), props.color && createVNode("div", {
      "class": ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": props.disabled
      }],
      "style": dotStyles.value
    }, null)]));
    return {};
  }
});
function has(obj, key) {
  return key.every((k) => obj.hasOwnProperty(k));
}
function parseColor(color) {
  if (!color)
    return null;
  let hsva = null;
  if (typeof color === "string") {
    const hex2 = parseHex(color);
    hsva = HexToHSV(hex2);
  }
  if (typeof color === "object") {
    if (has(color, ["r", "g", "b"])) {
      hsva = RGBtoHSV(color);
    } else if (has(color, ["h", "s", "l"])) {
      hsva = HSLtoHSV(color);
    } else if (has(color, ["h", "s", "v"])) {
      hsva = color;
    }
  }
  return hsva;
}
function stripAlpha(color, stripAlpha2) {
  if (stripAlpha2) {
    const {
      a,
      ...rest
    } = color;
    return rest;
  }
  return color;
}
function extractColor(color, input) {
  if (input == null || typeof input === "string") {
    const hex2 = HSVtoHex(color);
    if (color.a === 1)
      return hex2.slice(0, 7);
    else
      return hex2;
  }
  if (typeof input === "object") {
    let converted;
    if (has(input, ["r", "g", "b"]))
      converted = HSVtoRGB(color);
    else if (has(input, ["h", "s", "l"]))
      converted = HSVtoHSL(color);
    else if (has(input, ["h", "s", "v"]))
      converted = color;
    return stripAlpha(converted, !has(input, ["a"]) && color.a === 1);
  }
  return color;
}
const nullColor = {
  h: 0,
  s: 0,
  v: 1,
  a: 1
};
const rgba = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "R",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.r),
    getColor: (c, v) => ({
      ...c,
      r: Number(v)
    })
  }, {
    label: "G",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.g),
    getColor: (c, v) => ({
      ...c,
      g: Number(v)
    })
  }, {
    label: "B",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.b),
    getColor: (c, v) => ({
      ...c,
      b: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref) => {
      let {
        a
      } = _ref;
      return a ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoRGB,
  from: RGBtoHSV
};
const rgb = {
  ...rgba,
  inputs: (_a = rgba.inputs) == null ? void 0 : _a.slice(0, 3)
};
const hsla = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "H",
    max: 360,
    step: 1,
    getValue: (c) => Math.round(c.h),
    getColor: (c, v) => ({
      ...c,
      h: Number(v)
    })
  }, {
    label: "S",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      s: Number(v)
    })
  }, {
    label: "L",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      l: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref2) => {
      let {
        a
      } = _ref2;
      return a ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoHSL,
  from: HSLtoHSV
};
const hsl = {
  ...hsla,
  inputs: hsla.inputs.slice(0, 3)
};
const hexa = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (c) => c,
    getColor: (c, v) => v
  }],
  to: HSVtoHex,
  from: HexToHSV
};
const hex = {
  ...hexa,
  inputs: [{
    label: "HEX",
    getValue: (c) => c.slice(0, 7),
    getColor: (c, v) => v
  }]
};
const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa
};
const VColorPickerInput = (_ref) => {
  let {
    label,
    ...rest
  } = _ref;
  return createVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createVNode("input", rest, null), createVNode("span", null, [label])]);
};
const VColorPickerEdit = /* @__PURE__ */ defineComponent({
  name: "VColorPickerEdit",
  props: {
    color: Object,
    disabled: Boolean,
    mode: {
      type: String,
      default: "rgba",
      validator: (v) => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
    }
  },
  emits: {
    "update:color": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props, _ref2) {
    let {
      emit
    } = _ref2;
    const enabledModes = computed(() => {
      return props.modes.map((key) => ({
        ...modes[key],
        name: key
      }));
    });
    const inputs = computed(() => {
      var _a2;
      const mode = enabledModes.value.find((m) => m.name === props.mode);
      if (!mode)
        return [];
      const color = props.color ? mode.to(props.color) : null;
      return (_a2 = mode.inputs) == null ? void 0 : _a2.map((_ref3) => {
        let {
          getValue,
          getColor,
          ...inputProps
        } = _ref3;
        return {
          ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: color && getValue(color),
          onChange: (e) => {
            const target = e.target;
            if (!target)
              return;
            emit("update:color", mode.from(getColor(color ?? nullColor, target.value)));
          }
        };
      });
    });
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": "v-color-picker-edit"
      }, [(_a2 = inputs.value) == null ? void 0 : _a2.map((props2) => createVNode(VColorPickerInput, props2, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
        "icon": "$unfold",
        "size": "x-small",
        "variant": "plain",
        "onClick": () => {
          const mi = enabledModes.value.findIndex((m) => m.name === props.mode);
          emit("update:mode", enabledModes.value[(mi + 1) % enabledModes.value.length].name);
        }
      }, null)]);
    });
    return {};
  }
});
const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ("touches" in e && e.touches.length)
    return e.touches[0][position];
  else if ("changedTouches" in e && e.changedTouches.length)
    return e.changedTouches[0][position];
  else
    return e[position];
}
const makeSliderProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  readonly: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: void 0,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  reverse: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  })
}, "slider");
const useSlider = (_ref) => {
  let {
    props,
    handleSliderMouseUp,
    handleMouseMove,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(props, "reverse");
  const horizontalDirection = computed(() => {
    let hd = isRtl.value ? "rtl" : "ltr";
    if (props.reverse) {
      hd = hd === "rtl" ? "ltr" : "rtl";
    }
    return hd;
  });
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(props, "disabled");
  const vertical = computed(() => props.direction === "vertical");
  const thumbColor = computed(() => props.error || props.disabled ? void 0 : props.thumbColor ?? props.color);
  const trackColor = computed(() => props.error || props.disabled ? void 0 : props.trackColor ?? props.color);
  const trackFillColor = computed(() => props.error || props.disabled ? void 0 : props.trackFillColor ?? props.color);
  const mousePressed = ref(false);
  const startOffset = ref(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function roundValue(value) {
    if (step.value <= 0)
      return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }
  function parseMouseMove(e) {
    var _a2;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_a2 = trackContainerRef.value) == null ? void 0 : _a2.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 || horizontalDirection.value === "rtl")
      clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  let thumbMoved = false;
  const handleStop = (e) => {
    if (!thumbMoved) {
      startOffset.value = 0;
      handleSliderMouseUp(parseMouseMove(e));
    }
    mousePressed.value = false;
    thumbMoved = false;
    startOffset.value = 0;
  };
  const handleStart = (e) => {
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value)
      return;
    activeThumbRef.value.focus();
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      thumbMoved = true;
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      handleMouseMove(parseMouseMove(e));
    }
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    thumbMoved = true;
    handleMouseMove(parseMouseMove(e));
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    window.removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    window.removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a2;
    handleStop(e);
    window.removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a2 = e.target) == null ? void 0 : _a2.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a2;
    handleStart(e);
    window.addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a2 = e.target) == null ? void 0 : _a2.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    e.preventDefault();
    handleStart(e);
    window.addEventListener("mousemove", onMouseMove, moveListenerOptions);
    window.addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(props, "showTicks");
  const parsedTicks = computed(() => {
    if (!showTicks.value)
      return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks))
      return props.ticks.map((t) => ({
        value: t,
        position: position(t),
        label: t.toString()
      }));
    return Object.keys(props.ticks).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some((_ref2) => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(props, "color"),
    decimals,
    disabled,
    direction: toRef(props, "direction"),
    elevation: toRef(props, "elevation"),
    hasLabels,
    horizontalDirection,
    isReversed,
    min,
    max,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(props, "readonly"),
    rounded: toRef(props, "rounded"),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, "thumbLabel"),
    ticks: toRef(props, "ticks"),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};
const VSliderThumb = genericComponent()({
  name: "VSliderThumb",
  directives: {
    Ripple
  },
  props: {
    focused: Boolean,
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    ripple: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    if (!slider)
      throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor,
      step,
      vertical,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      readonly: readonly2,
      elevation,
      isReversed,
      horizontalDirection,
      mousePressed,
      decimals
    } = slider;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      pageup,
      pagedown,
      end,
      home,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value)
        return [1, 2, 3];
      else
        return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key))
        return;
      e.preventDefault();
      const _step = step.value || 0.1;
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = horizontalDirection.value === "rtl" ? [left, up] : [right, up];
        const direction2 = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        value = value + direction2 * _step * multipliers.value[multiplier];
      } else if (e.key === home) {
        value = props.min;
      } else if (e.key === end) {
        value = props.max;
      } else {
        const direction2 = e.key === pagedown ? 1 : -1;
        value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e) {
      const newValue = parseKeydown(e, props.modelValue);
      newValue != null && emit("update:modelValue", newValue);
    }
    useRender(() => {
      const positionPercentage = convertToUnit(vertical.value || isReversed.value ? 100 - props.position : props.position, "%");
      const {
        elevationClasses
      } = useElevation(computed(() => !disabled.value ? elevation.value : void 0));
      return createVNode("div", {
        "class": ["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }],
        "style": {
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        },
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": readonly2.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly2.value ? onKeydown : void 0
      }, [createVNode("div", {
        "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ["v-slider-thumb__ripple", textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => {
          var _a2;
          return [withDirectives(createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createVNode("div", {
            "class": ["v-slider-thumb__label"]
          }, [createVNode("div", null, [((_a2 = slots["thumb-label"]) == null ? void 0 : _a2.call(slots, {
            modelValue: props.modelValue
          })) ?? props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])];
        }
      })]);
    });
    return {};
  }
});
const VSliderTrack = genericComponent()({
  name: "VSliderTrack",
  props: {
    start: {
      type: Number,
      required: true
    },
    stop: {
      type: Number,
      required: true
    }
  },
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    if (!slider)
      throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color,
      horizontalDirection,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? "block-end" : "inline-start"}`);
    const endDir = computed(() => vertical.value ? "height" : "width");
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: "0%",
        [endDir.value]: "100%"
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, "%"),
        [endDir.value]: convertToUnit(trackFillWidth.value, "%")
      };
    });
    const computedTicks = computed(() => {
      if (!showTicks.value)
        return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _a2;
        const directionProperty = vertical.value ? "bottom" : "margin-inline-start";
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : void 0;
        return createVNode("div", {
          "key": tick.value,
          "class": ["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min.value,
            "v-slider-track__tick--last": tick.value === max.value
          }],
          "style": {
            [directionProperty]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [((_a2 = slots["tick-label"]) == null ? void 0 : _a2.call(slots, {
          tick,
          index
        })) ?? tick.label])]);
      });
    });
    useRender(() => {
      return createVNode("div", {
        "class": ["v-slider-track", roundedClasses.value],
        "style": {
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value),
          direction: !vertical.value ? horizontalDirection.value : void 0
        }
      }, [createVNode("div", {
        "class": ["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }],
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ["v-slider-track__fill", trackFillColorClasses.value],
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }]
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const VSlider = genericComponent()({
  name: "VSlider",
  props: {
    ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const thumbContainerRef = ref();
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly: readonly2
    } = useSlider({
      props,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleSliderMouseUp: (newValue) => model.value = roundValue(newValue),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleMouseMove: (newValue) => model.value = roundValue(newValue),
      getActiveThumb: () => {
        var _a2;
        return (_a2 = thumbContainerRef.value) == null ? void 0 : _a2.$el;
      }
    });
    const model = useProxiedModel(props, "modelValue", void 0, (v) => {
      const value = typeof v === "string" ? parseFloat(v) : v == null ? min.value : v;
      return roundValue(value);
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const [inputProps, _] = filterInputProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }]
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a2, _b;
          return createVNode(Fragment$1, null, [((_a2 = slots.label) == null ? void 0 : _a2.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
            "id": slotProps.id,
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps)]);
        } : void 0,
        default: (_ref2) => {
          let {
            id,
            messagesId
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly2.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly2.value ? onSliderTouchstart : void 0
          }, [createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": (v) => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const VColorPickerPreview = /* @__PURE__ */ defineComponent({
  name: "VColorPickerPreview",
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    hideAlpha: Boolean
  },
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => {
      var _a2, _b;
      return createVNode("div", {
        "class": ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": props.hideAlpha
        }]
      }, [createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [createVNode("div", {
        "style": {
          background: HSVtoCSS(props.color ?? nullColor)
        }
      }, null)]), createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": (_a2 = props.color) == null ? void 0 : _a2.h,
        "onUpdate:modelValue": (h2) => emit("update:color", {
          ...props.color ?? nullColor,
          h: h2
        }),
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": ((_b = props.color) == null ? void 0 : _b.a) ?? 1,
        "onUpdate:modelValue": (a) => emit("update:color", {
          ...props.color ?? nullColor,
          a
        }),
        "step": 1 / 256,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]);
    });
    return {};
  }
});
const red = Object.freeze({
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
});
const pink = Object.freeze({
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
});
const purple = Object.freeze({
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
});
const deepPurple = Object.freeze({
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
});
const indigo = Object.freeze({
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
});
const blue = Object.freeze({
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
});
const lightBlue = Object.freeze({
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
});
const cyan = Object.freeze({
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
});
const teal = Object.freeze({
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
});
const green = Object.freeze({
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
});
const lightGreen = Object.freeze({
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
});
const lime = Object.freeze({
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
});
const yellow = Object.freeze({
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
});
const amber = Object.freeze({
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
});
const orange = Object.freeze({
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
});
const deepOrange = Object.freeze({
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
});
const brown = Object.freeze({
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
});
const blueGrey = Object.freeze({
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
});
const grey = Object.freeze({
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
});
const shades = Object.freeze({
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
});
const colors = Object.freeze({
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey,
  shades
});
function parseDefaultColors(colors2) {
  return Object.keys(colors2).map((key) => {
    const color = colors2[key];
    return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
  });
}
const VColorPickerSwatches = /* @__PURE__ */ defineComponent({
  name: "VColorPickerSwatches",
  props: {
    swatches: {
      type: Array,
      default: () => parseDefaultColors(colors)
    },
    disabled: Boolean,
    color: Object,
    maxHeight: [Number, String]
  },
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => createVNode("div", {
      "class": "v-color-picker-swatches",
      "style": {
        maxHeight: convertToUnit(props.maxHeight)
      }
    }, [createVNode("div", null, [props.swatches.map((swatch) => createVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map((color) => {
      const hsva = parseColor(color);
      return createVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit("update:color", hsva)
      }, [createVNode("div", {
        "style": {
          background: color
        }
      }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
        "size": "x-small",
        "icon": "$success",
        "color": getContrast(color, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])]));
    return {};
  }
});
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "v-sheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: {
    ...makeVSheetProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value]
    }, slots));
    return {};
  }
});
const VColorPicker = /* @__PURE__ */ defineComponent({
  name: "VColorPicker",
  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    hideCanvas: Boolean,
    hideSliders: Boolean,
    hideInputs: Boolean,
    mode: {
      type: String,
      default: "rgba",
      validator: (v) => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
    },
    showSwatches: Boolean,
    swatches: Array,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150
    },
    modelValue: {
      type: [Object, String]
    },
    width: {
      type: [Number, String],
      default: 300
    },
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props) {
    const mode = useProxiedModel(props, "mode");
    const lastPickedColor = ref(null);
    const currentColor = useProxiedModel(props, "modelValue", void 0, (v) => {
      let c = parseColor(v);
      if (!c)
        return null;
      if (lastPickedColor.value) {
        c = {
          ...c,
          h: lastPickedColor.value.h
        };
        lastPickedColor.value = null;
      }
      return c;
    }, (v) => {
      if (!v)
        return null;
      return extractColor(v, props.modelValue);
    });
    const updateColor = (hsva) => {
      currentColor.value = hsva;
      lastPickedColor.value = hsva;
    };
    provideDefaults({
      VSlider: {
        color: void 0,
        trackColor: void 0,
        trackFillColor: void 0
      }
    });
    useRender(() => createVNode(VSheet, {
      "rounded": props.rounded,
      "elevation": props.elevation,
      "theme": props.theme,
      "class": ["v-color-picker"],
      "style": {
        "--v-color-picker-color-hsv": HSVtoCSS({
          ...currentColor.value ?? nullColor,
          a: 1
        })
      },
      "maxWidth": props.width
    }, {
      default: () => [!props.hideCanvas && createVNode(VColorPickerCanvas, {
        "key": "canvas",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "disabled": props.disabled,
        "dotSize": props.dotSize,
        "width": props.width,
        "height": props.canvasHeight
      }, null), (!props.hideSliders || !props.hideInputs) && createVNode("div", {
        "key": "controls",
        "class": "v-color-picker__controls"
      }, [!props.hideSliders && createVNode(VColorPickerPreview, {
        "key": "preview",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "hideAlpha": !mode.value.endsWith("a"),
        "disabled": props.disabled
      }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
        "key": "edit",
        "modes": props.modes,
        "mode": mode.value,
        "onUpdate:mode": (m) => mode.value = m,
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "disabled": props.disabled
      }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
        "key": "swatches",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "maxHeight": props.swatchesMaxHeight,
        "swatches": props.swatches,
        "disabled": props.disabled
      }, null)]
    }));
    return {};
  }
});
function highlightResult(text, matches, length) {
  if (matches == null)
    return text;
  if (Array.isArray(matches))
    throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment$1, null, [createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-combobox__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const VCombobox = genericComponent()({
  name: "VCombobox",
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    delimiters: Array,
    ...makeFilterProps({
      filterKeys: ["title"]
    }),
    ...makeSelectProps({
      hideNoData: true,
      returnObject: true
    }),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:search": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    var _a2;
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const vMenuRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a3;
        if (_menu.value && !v && ((_a3 = vMenuRef.value) == null ? void 0 : _a3.ΨopenChildren))
          return;
        _menu.value = v;
      }
    });
    const selectionIndex = ref(-1);
    let cleared = false;
    const color = computed(() => {
      var _a3;
      return (_a3 = vTextFieldRef.value) == null ? void 0 : _a3.color;
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v || [])), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm();
    const _search = ref(!props.multiple ? ((_a2 = model.value[0]) == null ? void 0 : _a2.title) ?? "" : "");
    const search = computed({
      get: () => {
        return _search.value;
      },
      set: (val) => {
        var _a3;
        _search.value = val;
        if (!props.multiple) {
          model.value = [transformItem$1(props, val)];
        }
        if (val && props.multiple && ((_a3 = props.delimiters) == null ? void 0 : _a3.length)) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join("|")})+`));
          if (values.length > 1) {
            values.forEach((v) => {
              v = v.trim();
              if (v)
                select(transformItem$1(props, v));
            });
            _search.value = "";
          }
        }
        if (!val)
          selectionIndex.value = -1;
        isPristine.value = !val;
      }
    });
    watch(_search, (value) => {
      if (cleared) {
        nextTick(() => cleared = false);
      } else if (isFocused.value && !menu.value) {
        menu.value = true;
      }
      emit("update:search", value);
    });
    watch(model, (value) => {
      var _a3;
      if (!props.multiple) {
        _search.value = ((_a3 = value[0]) == null ? void 0 : _a3.title) ?? "";
      }
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, computed(() => isPristine.value ? void 0 : search.value));
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !selections.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const selected = computed(() => selections.value.map((selection2) => selection2.props.value));
    const selection = computed(() => selections.value[selectionIndex.value]);
    const listRef = ref();
    function onClear(e) {
      cleared = true;
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (props.hideNoData && !items.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      menu.value = true;
    }
    function onKeydown(e) {
      var _a3, _b;
      if (props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = selected.value.length;
      if (selectionIndex.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown"].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e.key)) {
        menu.value = false;
      }
      if (["Enter", "Escape", "Tab"].includes(e.key)) {
        isPristine.value = true;
      }
      if (e.key === "ArrowDown") {
        (_a3 = listRef.value) == null ? void 0 : _a3.focus("next");
      } else if (e.key === "ArrowUp") {
        (_b = listRef.value) == null ? void 0 : _b.focus("prev");
      }
      if (!props.multiple)
        return;
      if (["Backspace", "Delete"].includes(e.key)) {
        if (selectionIndex.value < 0) {
          if (e.key === "Backspace" && !search.value) {
            selectionIndex.value = length - 1;
          }
          return;
        }
        select(selection.value);
        nextTick(() => !selection.value && (selectionIndex.value = length - 2));
      }
      if (e.key === "ArrowLeft") {
        if (selectionIndex.value < 0 && selectionStart > 0)
          return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (selections.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
        }
      }
      if (e.key === "ArrowRight") {
        if (selectionIndex.value < 0)
          return;
        const next = selectionIndex.value + 1;
        if (selections.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
      if (e.key === "Enter" && search.value) {
        select(transformItem$1(props, search.value));
        search.value = "";
      }
    }
    function onAfterLeave() {
      if (isFocused.value)
        isPristine.value = true;
    }
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection2) => props.valueComparator(selection2, item.value));
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
        search.value = "";
      } else {
        model.value = [item];
        _search.value = item.title;
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      var _a3;
      if (e.relatedTarget == null) {
        (_a3 = vTextFieldRef.value) == null ? void 0 : _a3.focus();
      }
    }
    watch(filteredItems, (val) => {
      if (!val.length && props.hideNoData)
        menu.value = false;
    });
    watch(isFocused, (val) => {
      if (val) {
        selectionIndex.value = -1;
      } else {
        menu.value = false;
        if (!props.multiple || !search.value)
          return;
        model.value = [...model.value, transformItem$1(props, search.value)];
        search.value = "";
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots["no-data"]);
      const [textFieldProps] = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [($event) => search.value = $event, (v) => {
          if (v == null)
            model.value = [];
        }],
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "class": ["v-combobox", {
          "v-combobox--active-menu": menu.value,
          "v-combobox--chips": !!props.chips,
          "v-combobox--selecting-index": selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? "multiple" : "single"}`]: true
        }],
        "appendInnerIcon": props.items.length ? props.menuIcon : void 0,
        "readonly": props.readonly,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createVNode(Fragment$1, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-combobox__content",
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => [hasList && createVNode(VList, {
            "ref": listRef,
            "selected": selected.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onFocusin": onFocusin,
            "onFocusout": onFocusout
          }, {
            default: () => {
              var _a3, _b, _c;
              return [!displayItems.value.length && !props.hideNoData && (((_a3 = slots["no-data"]) == null ? void 0 : _a3.call(slots)) ?? createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), (_b = slots["prepend-item"]) == null ? void 0 : _b.call(slots), displayItems.value.map((item, index) => {
                var _a4;
                return ((_a4 = slots.item) == null ? void 0 : _a4.call(slots, {
                  item,
                  index,
                  props: mergeProps(item.props, {
                    onClick: () => select(item)
                  })
                })) ?? createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  },
                  title: () => {
                    var _a5, _b2;
                    return isPristine.value ? item.title : highlightResult(item.title, (_a5 = getMatches(item)) == null ? void 0 : _a5.title, ((_b2 = search.value) == null ? void 0 : _b2.length) ?? 0);
                  }
                });
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), selections.value.map((item, index) => {
          var _a3;
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          return createVNode("div", {
            "key": item.value,
            "class": ["v-combobox__selection", index === selectionIndex.value && ["v-combobox__selection--selected", textColorClasses.value]],
            "style": index === selectionIndex.value ? textColorStyles.value : {}
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => {
              var _a4;
              return [(_a4 = slots.chip) == null ? void 0 : _a4.call(slots, {
                item,
                index,
                props: slotProps
              })];
            }
          }) : ((_a3 = slots.selection) == null ? void 0 : _a3.call(slots, {
            item,
            index
          })) ?? createVNode("span", {
            "class": "v-combobox__selection-text"
          }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-combobox__selection-comma"
          }, [createTextVNode(",")])])]);
        })])
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const VDialog = genericComponent()({
  name: "VDialog",
  props: {
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    ...makeVOverlayProps({
      origin: "center center",
      scrollStrategy: "block",
      transition: {
        component: VDialogTransition
      },
      zIndex: 2400
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    watch(isActive, async (val) => {
      var _a2, _b;
      await nextTick();
      if (val) {
        (_a2 = overlay.value.contentEl) == null ? void 0 : _a2.focus({
          preventScroll: true
        });
      } else {
        (_b = overlay.value.activatorEl) == null ? void 0 : _b.focus({
          preventScroll: true
        });
      }
    });
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "dialog",
      "aria-expanded": String(isActive.value)
    }, props.activatorProps));
    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps.value,
        "role": "dialog"
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VExpansionPanelSymbol = Symbol.for("vuetify:v-expansion-panel");
const allowedVariants = ["default", "accordion", "inset", "popout"];
const VExpansionPanels = genericComponent()({
  name: "VExpansionPanels",
  props: {
    color: String,
    variant: {
      type: String,
      default: "default",
      validator: (v) => allowedVariants.includes(v)
    },
    readonly: Boolean,
    ...makeGroupProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        color: toRef(props, "color")
      },
      VExpansionPanelTitle: {
        readonly: toRef(props, "readonly")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-expansion-panels", themeClasses.value, variantClass.value]
    }, slots));
    return {};
  }
});
const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean
}, "v-expansion-panel-title");
const VExpansionPanelTitle = genericComponent()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple
  },
  props: {
    ...makeVExpansionPanelTitleProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel)
      throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    useRender(() => {
      var _a2;
      return withDirectives(createVNode("button", {
        "class": ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": expansionPanel.isSelected.value
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : void 0,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : void 0
      }, [createVNode("span", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_a2 = slots.default) == null ? void 0 : _a2.call(slots, slotProps.value), !props.hideActions && createVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions ? slots.actions(slotProps.value) : createVNode(VIcon, {
        "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
      }, null)])]), [[resolveDirective("ripple"), props.ripple]]);
    });
    return {};
  }
});
const VExpansionPanelText = genericComponent()({
  name: "VExpansionPanelText",
  props: {
    ...makeLazyProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel)
      throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => {
        var _a2;
        return [withDirectives(createVNode("div", {
          "class": "v-expansion-panel-text"
        }, [slots.default && hasContent.value && createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])];
      }
    }));
    return {};
  }
});
const VExpansionPanel = genericComponent()({
  name: "VExpansionPanel",
  props: {
    title: String,
    text: String,
    bgColor: String,
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "bgColor");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id))
        arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      return createVNode(props.tag, {
        "class": ["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "aria-expanded": groupItem.isSelected.value
      }, {
        default: () => {
          var _a2;
          return [createVNode("div", {
            "class": ["v-expansion-panel__shadow", ...elevationClasses.value]
          }, null), hasTitle && createVNode(VExpansionPanelTitle, {
            "key": "title",
            "collapseIcon": props.collapseIcon,
            "color": props.color,
            "expandIcon": props.expandIcon,
            "hideActions": props.hideActions,
            "ripple": props.ripple
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && createVNode(VExpansionPanelText, {
            "key": "text",
            "eager": props.eager
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      });
    });
    return {};
  }
});
const VFileInput = genericComponent()({
  name: "VFileInput",
  inheritAttrs: false,
  props: {
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: "$vuetify.fileInput.counterSize"
    },
    counterString: {
      type: String,
      default: "$vuetify.fileInput.counter"
    },
    multiple: Boolean,
    hint: String,
    persistentHint: Boolean,
    placeholder: String,
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: (v) => {
        return typeof v === "boolean" || [1e3, 1024].includes(v);
      }
    },
    ...makeVInputProps({
      prependIcon: "$file"
    }),
    modelValue: {
      type: Array,
      default: () => [],
      validator: (val) => {
        return wrapInArray(val).every((v) => v != null && typeof v === "object");
      }
    },
    ...makeVFieldProps({
      clearable: true
    })
  },
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue");
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map((file) => {
      const {
        name = "",
        size = 0
      } = file;
      return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      var _a2;
      const fileCount = ((_a2 = model.value) == null ? void 0 : _a2.length) ?? 0;
      if (props.showSize)
        return t(props.counterSizeString, fileCount, totalBytesReadable.value);
      else
        return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const inputRef = ref();
    const messages = computed(() => {
      return props.messages.length ? props.messages : props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      var _a2;
      if (inputRef.value !== document.activeElement) {
        (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
      }
      if (!isFocused.value) {
        isFocused.value = true;
      }
    }
    function onClickPrepend(e) {
      callEvent(props["onClick:prepend"], e);
      onControlClick(e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onControlClick(e) {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.click();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props["onClick:clear"], e);
      });
    }
    watch(model, (newValue) => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = "";
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": "v-file-input",
        "onClick:prepend": onClickPrepend,
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref3) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly: isReadonly2,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isDirty.value || isFocused.value,
            "dirty": isDirty.value,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref4) => {
              var _a2;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment$1, null, [createVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly2.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": (e) => {
                  e.stopPropagation();
                  onFocus();
                },
                "onChange": (e) => {
                  if (!e.target)
                    return;
                  const target = e.target;
                  model.value = [...target.files ?? []];
                },
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), createVNode("div", {
                "class": fieldClass
              }, [!!((_a2 = model.value) == null ? void 0 : _a2.length) && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                "key": text,
                "size": "small",
                "color": props.color
              }, {
                default: () => [text]
              })) : fileNames.value.join(", "))])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a2, _b;
          return createVNode(Fragment$1, null, [(_a2 = slots.details) == null ? void 0 : _a2.call(slots, slotProps), hasCounter && createVNode(Fragment$1, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": !!((_b = model.value) == null ? void 0 : _b.length),
            "value": counterValue.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const VFooter = genericComponent()({
  name: "VFooter",
  props: {
    app: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: "auto"
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "footer"
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = ref(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: height,
      elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, props.app ? layoutItemStyles.value : void 0]
    }, slots));
    return {};
  }
});
const VForm = genericComponent()({
  name: "VForm",
  props: {
    ...makeFormProps()
  },
  emits: {
    "update:modelValue": (val) => true,
    submit: (e) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit("submit", e);
      if (!e.defaultPrevented) {
        ready.then((_ref2) => {
          var _a2;
          let {
            valid
          } = _ref2;
          if (valid) {
            (_a2 = formRef.value) == null ? void 0 : _a2.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => {
      var _a2;
      return createVNode("form", {
        "ref": formRef,
        "class": "v-form",
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, form)]);
    });
    return forwardRefs(form, formRef);
  }
});
const VContainer = genericComponent()({
  name: "VContainer",
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }]
    }, slots));
    return {};
  }
});
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const VCol = genericComponent()({
  name: "VCol",
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: (str) => ALIGN_SELF_VALUES.includes(str)
    },
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _a2;
      return h(props.tag, {
        class: classes.value
      }, (_a2 = slots.default) == null ? void 0 : _a2.call(slots));
    };
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const VRow = genericComponent()({
  name: "VRow",
  props: {
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a2;
      return h(props.tag, {
        class: ["v-row", classes.value]
      }, (_a2 = slots.default) == null ? void 0 : _a2.call(slots));
    };
  }
});
const VSpacer = createSimpleFunctional("flex-grow-1", "div", "VSpacer");
const VHover = genericComponent()({
  name: "VHover",
  props: {
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: void 0
    },
    ...makeDelayProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isHovering = useProxiedModel(props, "modelValue");
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay();
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
        isHovering: isHovering.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }
});
const VItemGroupSymbol = Symbol.for("vuetify:v-item-group");
const VItemGroup = genericComponent()({
  name: "VItemGroup",
  props: {
    ...makeGroupProps({
      selectedClass: "v-item--selected"
    }),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => createVNode(props.tag, {
      "class": ["v-item-group", themeClasses.value]
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    });
  }
});
const VItem = genericComponent()({
  name: "VItem",
  props: makeGroupItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }
});
const VKbd = createSimpleFunctional("v-kbd");
const VLayout = genericComponent()({
  name: "VLayout",
  props: makeLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "ref": layoutRef,
        "class": layoutClasses.value,
        "style": layoutStyles.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }
});
const VLayoutItem = genericComponent()({
  name: "VLayoutItem",
  props: {
    position: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 300
    },
    modelValue: Boolean,
    ...makeLayoutItemProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "position"),
      elementSize: toRef(props, "size"),
      layoutSize: toRef(props, "size"),
      active: toRef(props, "modelValue"),
      absolute: toRef(props, "absolute")
    });
    return () => {
      var _a2;
      return createVNode("div", {
        "class": ["v-layout-item"],
        "style": layoutItemStyles.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
const VLazy = genericComponent()({
  name: "VLazy",
  directives: {
    intersect: Intersect$1
  },
  props: {
    modelValue: Boolean,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: void 0,
        rootMargin: void 0,
        threshold: void 0
      })
    },
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: "fade-transition"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const isActive = useProxiedModel(props, "modelValue");
    function onIntersect(isIntersecting) {
      if (isActive.value)
        return;
      isActive.value = isIntersecting;
    }
    useRender(() => withDirectives(createVNode(props.tag, {
      "class": "v-lazy",
      "style": dimensionStyles.value
    }, {
      default: () => [isActive.value && createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => {
          var _a2;
          return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
        }
      })]
    }), [[resolveDirective("intersect"), {
      handler: onIntersect,
      options: props.options
    }, null]]));
    return {};
  }
});
const VLocaleProvider = genericComponent()({
  name: "VLocaleProvider",
  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = provideLocale(props);
    useRender(() => {
      var _a2;
      return createVNode("div", {
        "class": ["v-locale-provider", rtlClasses.value]
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    });
    return {};
  }
});
const VMain = genericComponent()({
  name: "VMain",
  props: {
    scrollable: Boolean,
    ...makeTagProps({
      tag: "main"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }],
      "style": [mainStyles.value, ssrBootStyles.value]
    }, {
      default: () => {
        var _a2, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]) : (_b = slots.default) == null ? void 0 : _b.call(slots)];
      }
    }));
    return {};
  }
});
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = ref(false);
  const stuckPosition = ref(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = ref(false);
  const dragProgress = ref(0);
  ref(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: {
      type: Boolean,
      default: null
    },
    railWidth: {
      type: [Number, String],
      default: 56
    },
    scrim: {
      type: [String, Boolean],
      default: true
    },
    image: String,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    location: {
      type: String,
      default: "start",
      validator: (value) => locations.includes(value)
    },
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const rootEl = ref();
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location2 = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location2.value !== "bottom");
    if (props.expandOnHover && props.rail != null) {
      watch(isHovering, (val) => emit("update:rail", !val));
    }
    if (!props.disableResizeWatcher) {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    }
    if (!props.disableRouteWatcher && router) {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    }
    watch(() => props.permanent, (val) => {
      if (val)
        isActive.value = true;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location2
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutRect,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location2,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom)
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createVNode(Fragment$1, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location2.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value]
      }, attrs), {
        default: () => {
          var _a2, _b, _c, _d;
          return [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_a2 = slots.image) == null ? void 0 : _a2.call(slots, {
            image: props.image
          }) : createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_b = slots.prepend) == null ? void 0 : _b.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_c = slots.default) == null ? void 0 : _c.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_d = slots.append) == null ? void 0 : _d.call(slots)])];
        }
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", {
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const VNoSsr = /* @__PURE__ */ defineComponent({
  name: "VNoSsr",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    const show = useHydration();
    return () => {
      var _a2;
      return show.value && ((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
    };
  }
});
function useRefs() {
  const refs = ref([]);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const VPagination = genericComponent()({
  name: "VPagination",
  props: {
    activeColor: String,
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: (props) => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: (val) => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: IconValue,
      default: "$first"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    lastIcon: {
      type: IconValue,
      default: "$last"
    },
    ariaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.root"
    },
    pageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.page"
    },
    currentPageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.currentPage"
    },
    firstAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.first"
    },
    previousAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.previous"
    },
    nextAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.next"
    },
    lastAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.last"
    },
    ellipsis: {
      type: String,
      default: "..."
    },
    showFirstLastPage: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = ref(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver();
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible)
        return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0)
        return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER)
        return [];
      if (totalVisible.value <= 1)
        return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 3);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(props, "color"),
        border: toRef(props, "border"),
        density: toRef(props, "density"),
        size: toRef(props, "size"),
        variant: toRef(props, "variant"),
        rounded: toRef(props, "rounded"),
        elevation: toRef(props, "elevation")
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              color: isActive ? props.activeColor : props.color,
              ariaCurrent: isActive,
              ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          ariaLabel: t(props.firstAriaLabel),
          ariaDisabled: prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          ariaLabel: t(props.previousAriaLabel),
          ariaDisabled: prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          ariaLabel: t(props.nextAriaLabel),
          ariaDisabled: nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          ariaLabel: t(props.lastAriaLabel),
          ariaDisabled: nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      var _a2;
      const currentIndex = page.value - start.value;
      (_a2 = refs.value[currentIndex]) == null ? void 0 : _a2.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-pagination", themeClasses.value],
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
        "key": item.key,
        "class": ["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
function floor(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}
const VParallax = genericComponent()({
  name: "VParallax",
  props: {
    scale: {
      type: [Number, String],
      default: 0.5
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const {
      height: displayHeight
    } = useDisplay();
    const root = ref();
    watchEffect(() => {
      var _a2;
      intersectionRef.value = resizeRef.value = (_a2 = root.value) == null ? void 0 : _a2.$el;
    });
    let scrollParent;
    watch(isIntersecting, (val) => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
        scrollParent.addEventListener("scroll", onScroll, {
          passive: true
        });
        onScroll();
      } else {
        scrollParent.removeEventListener("scroll", onScroll);
      }
    });
    watch(displayHeight, onScroll);
    watch(() => {
      var _a2;
      return (_a2 = contentRect.value) == null ? void 0 : _a2.height;
    }, onScroll);
    const scale = computed(() => {
      return 1 - clamp(+props.scale);
    });
    let frame = -1;
    function onScroll() {
      if (!isIntersecting.value)
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        var _a2;
        const el = ((_a2 = root.value) == null ? void 0 : _a2.$el).querySelector(".v-img__img");
        if (!el)
          return;
        const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight;
        const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop;
        const top = intersectionRef.value.getBoundingClientRect().top + scrollPos;
        const height = contentRect.value.height;
        const center = top + (height - scrollHeight) / 2;
        const translate2 = floor((scrollPos - center) * scale.value);
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
        el.style.setProperty("transform", `translateY(${translate2}px) scale(${sizeScale})`);
      });
    }
    useRender(() => createVNode(VImg, {
      "class": ["v-parallax", {
        "v-parallax--active": isIntersecting.value
      }],
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots));
    return {};
  }
});
const VRadio = genericComponent()({
  name: "VRadio",
  props: {
    ...makeSelectionControlProps({
      falseIcon: "$radioOff",
      trueIcon: "$radioOn"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VSelectionControl, mergeProps(props, {
      "class": "v-radio",
      "type": "radio"
    }), slots));
    return {};
  }
});
const VRadioGroup = genericComponent()({
  name: "VRadioGroup",
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String],
      default: "auto"
    },
    ...makeVInputProps(),
    ...omit(makeSelectionControlGroupProps(), ["multiple"]),
    trueIcon: {
      type: IconValue,
      default: "$radioOn"
    },
    falseIcon: {
      type: IconValue,
      default: "$radioOff"
    },
    type: {
      type: String,
      default: "radio"
    }
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = getUid();
    const id = computed(() => props.id || `radio-group-${uid}`);
    const model = useProxiedModel(props, "modelValue");
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = VSelectionControl.filterProps(props);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "class": "v-radio-group"
      }, inputAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly: isReadonly2
          } = _ref2;
          return createVNode(Fragment$1, null, [label && createVNode(VLabel, {
            "id": id2.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "defaultsTarget": "VRadio",
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly2.value,
            "aria-labelledby": label ? id2.value : void 0,
            "multiple": false
          }, controlAttrs, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event
          }), slots)]);
        }
      });
    });
    return {};
  }
});
const VRangeSlider = genericComponent()({
  name: "VRangeSlider",
  props: {
    ...makeFocusProps(),
    ...makeVInputProps(),
    ...makeSliderProps(),
    strict: Boolean,
    modelValue: {
      type: Array,
      default: () => [0, 0]
    }
  },
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();
    function getActiveThumb(e) {
      if (!startThumbRef.value || !stopThumbRef.value)
        return;
      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }
    const {
      activeThumbRef,
      hasLabels,
      max,
      min,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      roundValue,
      trackContainerRef
    } = useSlider({
      /* eslint-disable @typescript-eslint/no-use-before-define */
      props,
      handleSliderMouseUp: (newValue) => {
        var _a2;
        model.value = activeThumbRef.value === ((_a2 = startThumbRef.value) == null ? void 0 : _a2.$el) ? [newValue, model.value[1]] : [model.value[0], newValue];
      },
      handleMouseMove: (newValue) => {
        var _a2, _b, _c, _d;
        const [start, stop] = model.value;
        if (!props.strict && start === stop && start !== min.value) {
          activeThumbRef.value = newValue > start ? (_a2 = stopThumbRef.value) == null ? void 0 : _a2.$el : (_b = startThumbRef.value) == null ? void 0 : _b.$el;
          (_c = activeThumbRef.value) == null ? void 0 : _c.focus();
        }
        if (activeThumbRef.value === ((_d = startThumbRef.value) == null ? void 0 : _d.$el)) {
          model.value = [Math.min(newValue, stop), stop];
        } else {
          model.value = [start, Math.max(start, newValue)];
        }
      },
      getActiveThumb
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });
    const model = useProxiedModel(props, "modelValue", void 0, (arr) => {
      if (!arr || !arr.length)
        return [0, 0];
      return arr.map((value) => roundValue(value));
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    useRender(() => {
      const [inputProps, _] = filterInputProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", "v-range-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }],
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a2, _b;
          return createVNode(Fragment$1, null, [((_a2 = slots.label) == null ? void 0 : _a2.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps)]);
        } : void 0,
        default: (_ref2) => {
          var _a2, _b;
          let {
            id,
            messagesId
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": onSliderMousedown,
            "onTouchstartPassive": onSliderTouchstart
          }, [createVNode("input", {
            "id": `${id.value}_start`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), createVNode("input", {
            "id": `${id.value}_stop`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === ((_a2 = startThumbRef.value) == null ? void 0 : _a2.$el),
            "modelValue": model.value[0],
            "onUpdate:modelValue": (v) => model.value = [v, model.value[1]],
            "onFocus": (e) => {
              var _a3, _b2, _c, _d;
              focus();
              activeThumbRef.value = (_a3 = startThumbRef.value) == null ? void 0 : _a3.$el;
              if (model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== ((_b2 = stopThumbRef.value) == null ? void 0 : _b2.$el)) {
                (_c = startThumbRef.value) == null ? void 0 : _c.$el.blur();
                (_d = stopThumbRef.value) == null ? void 0 : _d.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": min.value,
            "max": model.value[1],
            "position": trackStart.value
          }, {
            "thumb-label": slots["thumb-label"]
          }), createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === ((_b = stopThumbRef.value) == null ? void 0 : _b.$el),
            "modelValue": model.value[1],
            "onUpdate:modelValue": (v) => model.value = [model.value[0], v],
            "onFocus": (e) => {
              var _a3, _b2, _c, _d;
              focus();
              activeThumbRef.value = (_a3 = stopThumbRef.value) == null ? void 0 : _a3.$el;
              if (model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== ((_b2 = startThumbRef.value) == null ? void 0 : _b2.$el)) {
                (_c = stopThumbRef.value) == null ? void 0 : _c.$el.blur();
                (_d = startThumbRef.value) == null ? void 0 : _d.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": model.value[0],
            "max": max.value,
            "position": trackStop.value
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const VRating = genericComponent()({
  name: "VRating",
  props: {
    name: String,
    itemAriaLabel: {
      type: String,
      default: "$vuetify.rating.ariaLabel.item"
    },
    activeColor: String,
    color: String,
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: IconValue,
      default: "$ratingEmpty"
    },
    fullIcon: {
      type: IconValue,
      default: "$ratingFull"
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5
    },
    readonly: Boolean,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: "top",
      validator: (v) => ["top", "bottom"].includes(v)
    },
    ripple: Boolean,
    ...makeDensityProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, "modelValue");
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = ref(-1);
    const focusIndex = ref(-1);
    const firstRef = ref();
    let isClicking = false;
    const itemState = computed(() => increments.value.map((value) => {
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = props.activeColor ?? props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onFocus() {
        var _a2;
        if (value === 0 && normalizedValue.value === 0) {
          (_a2 = firstRef.value) == null ? void 0 : _a2.focus();
        } else {
          focusIndex.value = value;
        }
      }
      function onBlur() {
        if (!isClicking)
          focusIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly)
          return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : void 0,
        onMouseleave: props.hover ? onMouseleave : void 0,
        onFocus,
        onBlur,
        onClick
      };
    }));
    function onMousedown() {
      isClicking = true;
    }
    function onMouseup() {
      isClicking = false;
    }
    const name = computed(() => props.name ?? `v-rating-${getUid()}`);
    function VRatingItem(_ref2) {
      var _a2, _b;
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onFocus,
        onBlur,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace(".", "-")}`;
      const btnProps = {
        color: (_a2 = itemState.value[index]) == null ? void 0 : _a2.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_b = itemState.value[index]) == null ? void 0 : _b.icon,
        ripple: props.ripple,
        size: props.size,
        tag: "span",
        variant: "plain"
      };
      return createVNode(Fragment$1, null, [createVNode("label", {
        "for": id,
        "class": {
          "v-rating__item--half": props.halfIncrements && value % 1 > 0,
          "v-rating__item--full": props.halfIncrements && value % 1 === 0
        },
        "onMousedown": onMousedown,
        "onMouseup": onMouseup,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [createVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index
      }) : createVNode(VBtn, btnProps, null)]), createVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "onClick": onClick,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "ref": index === 0 ? firstRef : void 0,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots["item-label"])
        return slots["item-label"](labelProps);
      if (labelProps.label)
        return createVNode("span", null, [labelProps.label]);
      return createVNode("span", null, [createTextVNode(" ")]);
    }
    useRender(() => {
      var _a2;
      const hasLabels = !!((_a2 = props.itemLabels) == null ? void 0 : _a2.length) || slots["item-label"];
      return createVNode(props.tag, {
        "class": ["v-rating", {
          "v-rating--hover": props.hover,
          "v-rating--readonly": props.readonly
        }, themeClasses.value]
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => {
          var _a3, _b;
          return createVNode("div", {
            "class": "v-rating__wrapper"
          }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
            value,
            index: i,
            label: (_a3 = props.itemLabels) == null ? void 0 : _a3[i]
          }) : void 0, createVNode("div", {
            "class": ["v-rating__item", {
              "v-rating__item--focused": Math.ceil(focusIndex.value) === value
            }]
          }, [props.halfIncrements ? createVNode(Fragment$1, null, [createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null), createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null)]) : createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
            value,
            index: i,
            label: (_b = props.itemLabels) == null ? void 0 : _b[i]
          }) : void 0]);
        })]
      });
    });
    return {};
  }
});
function bias(val) {
  const c = 0.501;
  const x = Math.abs(val);
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
}
function calculateUpdatedOffset(_ref) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    currentScrollOffset,
    isHorizontal
  } = _ref;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;
  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }
  return currentScrollOffset;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: {
    centerActive: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    symbol: {
      type: null,
      default: VSlideGroupSymbol
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    showArrows: {
      type: [Boolean, String],
      validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
    },
    ...makeTagProps(),
    ...makeGroupProps({
      selectedClass: "v-slide-group-item--active"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      mobile
    } = useDisplay();
    const group = useGroup(props, props.symbol);
    const isOverflowing = ref(false);
    const scrollOffset = ref(0);
    const containerSize = ref(0);
    const contentSize = ref(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const disableTransition = ref(false);
    let startTouch = 0;
    let startOffset = 0;
    function onTouchstart(e) {
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      startOffset = sign * scrollOffset.value;
      startTouch = e.touches[0][sizeProperty];
      disableTransition.value = true;
    }
    function onTouchmove(e) {
      if (!isOverflowing.value)
        return;
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
    }
    function onTouchend(e) {
      const maxScrollOffset = contentSize.value - containerSize.value;
      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0;
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset;
      }
      disableTransition.value = false;
    }
    function onScroll() {
      if (!containerRef.value)
        return;
      containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
    }
    const isFocused = ref(false);
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.value)
        return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.value.children) {
          if (item === el) {
            scrollOffset.value = calculateUpdatedOffset({
              selectedElement: item,
              containerSize: containerSize.value,
              contentSize: contentSize.value,
              isRtl: isRtl.value,
              currentScrollOffset: scrollOffset.value,
              isHorizontal: isHorizontal.value
            });
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a2;
      if (!isFocused.value && !(e.relatedTarget && ((_a2 = contentRef.value) == null ? void 0 : _a2.contains(e.relatedTarget))))
        focus();
    }
    function onKeydown(e) {
      if (!contentRef.value)
        return;
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          focus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          focus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          focus("next");
        } else if (e.key === "ArrowUp") {
          focus("prev");
        }
      }
      if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      }
    }
    function focus(location2) {
      var _a2, _b, _c, _d, _e;
      if (!contentRef.value)
        return;
      if (!location2) {
        const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
        (_a2 = focusable[0]) == null ? void 0 : _a2.focus();
      } else if (location2 === "next") {
        const el = (_b = contentRef.value.querySelector(":focus")) == null ? void 0 : _b.nextElementSibling;
        if (el)
          el.focus();
        else
          focus("first");
      } else if (location2 === "prev") {
        const el = (_c = contentRef.value.querySelector(":focus")) == null ? void 0 : _c.previousElementSibling;
        if (el)
          el.focus();
        else
          focus("last");
      } else if (location2 === "first") {
        (_d = contentRef.value.firstElementChild) == null ? void 0 : _d.focus();
      } else if (location2 === "last") {
        (_e = contentRef.value.lastElementChild) == null ? void 0 : _e.focus();
      }
    }
    function scrollTo(location2) {
      const newAbsoluteOffset = scrollOffset.value + (location2 === "prev" ? -1 : 1) * containerSize.value;
      scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
    }
    const contentStyles = computed(() => {
      let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
      if (scrollOffset.value <= 0) {
        scrollAmount = bias(-scrollOffset.value);
      }
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      return {
        transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
        transition: disableTransition.value ? "none" : "",
        willChange: disableTransition.value ? "transform" : ""
      };
    });
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case "always":
          return true;
        case "desktop":
          return !mobile.value;
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 0;
    });
    const hasNext = computed(() => {
      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }],
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a2, _b, _c;
        return [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onClick": () => scrollTo("prev")
        }, [((_a2 = slots.prev) == null ? void 0 : _a2.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onClick": () => scrollTo("next")
        }, [((_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus
    };
  }
});
const VSlideGroupItem = genericComponent()({
  name: "VSlideGroupItem",
  props: {
    ...makeGroupItemProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value
      });
    };
  }
});
const VSnackbar = genericComponent()({
  name: "VSnackbar",
  props: {
    multiLine: Boolean,
    timeout: {
      type: [Number, String],
      default: 5e3
    },
    vertical: Boolean,
    ...makeLocationProps({
      location: "bottom"
    }),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeVariantProps(),
    ...makeThemeProps(),
    ...omit(makeVOverlayProps({
      transition: "v-snackbar-transition"
    }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const overlay = ref();
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    let activeTimeout = -1;
    function startTimeout() {
      window.clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1)
        return;
      activeTimeout = window.setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function onPointerenter() {
      window.clearTimeout(activeTimeout);
    }
    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--vertical": props.vertical
        }, positionClasses.value]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "contentProps": mergeProps({
          class: ["v-snackbar__wrapper", themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          style: [locationStyles.value, colorStyles.value],
          onPointerenter,
          onPointerleave: startTimeout
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "_disableGlobalStack": true
      }, scopeId), {
        default: () => [genOverlays(false, "v-snackbar"), slots.default && createVNode("div", {
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.default()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: "text",
              ripple: false
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions()])]
        })],
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VSwitch = genericComponent()({
  name: "VSwitch",
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": () => true,
    "update:indeterminate": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    const {
      loaderClasses
    } = useLoader(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const loaderColor = computed(() => {
      return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
    });
    const uid = getUid();
    const id = computed(() => props.id || `switch-${uid}`);
    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = VSelectionControl.filterProps(props);
      const control = ref();
      function onClick() {
        var _a2, _b;
        (_b = (_a2 = control.value) == null ? void 0 : _a2.input) == null ? void 0 : _b.click();
      }
      return createVNode(VInput, mergeProps({
        "class": ["v-switch", {
          "v-switch--inset": props.inset
        }, {
          "v-switch--indeterminate": indeterminate.value
        }, loaderClasses.value]
      }, inputAttrs, inputProps, {
        "id": id.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly: isReadonly2,
            isValid
          } = _ref2;
          return createVNode(VSelectionControl, mergeProps({
            "ref": control
          }, controlProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": [($event) => model.value = $event, onChange],
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "type": "checkbox",
            "aria-checked": indeterminate.value ? "mixed" : void 0,
            "disabled": isDisabled.value,
            "readonly": isReadonly2.value,
            "onFocus": focus,
            "onBlur": blur
          }, controlAttrs), {
            ...slots,
            default: () => createVNode("div", {
              "class": "v-switch__track",
              "onClick": onClick
            }, null),
            input: (_ref3) => {
              let {
                textColorClasses,
                textColorStyles
              } = _ref3;
              return createVNode("div", {
                "class": ["v-switch__thumb", textColorClasses.value],
                "style": textColorStyles.value
              }, [props.loading && createVNode(LoaderSlot, {
                "name": "v-switch",
                "active": true,
                "color": isValid.value === false ? void 0 : loaderColor.value
              }, {
                default: (slotProps) => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
                  "active": slotProps.isActive,
                  "color": slotProps.color,
                  "indeterminate": true,
                  "size": "16",
                  "width": "2"
                }, null)
              })]);
            }
          });
        }
      });
    });
    return {};
  }
});
const VSystemBar = genericComponent()({
  name: "VSystemBar",
  props: {
    color: String,
    height: [Number, String],
    window: Boolean,
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const height = computed(() => props.height ?? (props.window ? 32 : 24));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: ref("top"),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-system-bar", {
        "v-system-bar--window": props.window
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value]
    }, slots));
    return {};
  }
});
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const VTab = genericComponent()({
  name: "VTab",
  props: {
    fixed: Boolean,
    title: String,
    sliderColor: String,
    hideSlider: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    ...omit(makeVBtnProps({
      selectedClass: "v-tab--selected",
      variant: "text"
    }), ["active", "block", "flat", "location", "position", "symbol"])
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = ref(false);
    const rootEl = ref();
    const sliderEl = ref();
    function updateSlider(_ref2) {
      var _a2, _b;
      let {
        value
      } = _ref2;
      isSelected.value = value;
      if (value) {
        const prevEl = (_b = (_a2 = rootEl.value) == null ? void 0 : _a2.$el.parentElement) == null ? void 0 : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl)
          return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta2 = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta2) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta2) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta2) + (Math.sign(delta2) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]);
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight];
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, ""],
          transform: [`translate${XY}(${delta2}px) scale${XY}(${initialScale})`, `translate${XY}(${delta2 / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ""],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const [btnProps] = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "_as": "VTab",
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab"],
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false,
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "rounded": 0
      }, btnProps, attrs, {
        "onGroup:selected": updateSlider
      }), {
        default: () => [slots.default ? slots.default() : props.title, !props.hideSlider && createVNode("div", {
          "ref": sliderEl,
          "class": ["v-tab__slider", sliderColorClasses.value],
          "style": sliderColorStyles.value
        }, null)]
      });
    });
    return {};
  }
});
function parseItems(items) {
  if (!items)
    return [];
  return items.map((item) => {
    if (typeof item === "string")
      return {
        title: item,
        value: item
      };
    return item;
  });
}
const VTabs = genericComponent()({
  name: "VTabs",
  props: {
    alignTabs: {
      type: String,
      default: "start"
    },
    color: String,
    direction: {
      type: String,
      default: "horizontal"
    },
    fixedTabs: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    stacked: Boolean,
    bgColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: void 0
    },
    hideSlider: Boolean,
    sliderColor: String,
    modelValue: null,
    mandatory: {
      type: [Boolean, String],
      default: "force"
    },
    ...makeDensityProps(),
    ...makeTagProps()
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const parsedItems = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => createVNode(VSlideGroup, {
      "modelValue": model.value,
      "onUpdate:modelValue": ($event) => model.value = $event,
      "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
        "v-tabs--fixed-tabs": props.fixedTabs,
        "v-tabs--grow": props.grow,
        "v-tabs--stacked": props.stacked
      }, densityClasses.value, backgroundColorClasses.value],
      "style": [{
        "--v-tabs-height": convertToUnit(props.height)
      }, backgroundColorStyles.value],
      "role": "tablist",
      "symbol": VTabsSymbol,
      "mandatory": props.mandatory,
      "direction": props.direction
    }, {
      default: () => [slots.default ? slots.default() : parsedItems.value.map((item) => createVNode(VTab, mergeProps(item, {
        "key": item.title
      }), null))]
    }));
    return {};
  }
});
const VTable = genericComponent()({
  name: "VTable",
  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],
    hover: Boolean,
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover
      }, themeClasses.value, densityClasses.value]
    }, {
      default: () => {
        var _a2, _b, _c;
        return [(_a2 = slots.top) == null ? void 0 : _a2.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_b = slots.wrapper) == null ? void 0 : _b.call(slots), (_c = slots.bottom) == null ? void 0 : _c.call(slots)];
      }
    }));
    return {};
  }
});
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect: Intersect$1
  },
  inheritAttrs: false,
  props: {
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    hint: String,
    persistentHint: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: (v) => !isNaN(parseFloat(v))
    },
    maxRows: {
      type: [Number, String],
      validator: (v) => !isNaN(parseFloat(v))
    },
    suffix: String,
    ...makeVInputProps(),
    ...makeVFieldProps()
  },
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a2, _b;
      if (!props.autofocus || !isIntersecting)
        return;
      (_b = (_a2 = entries[0].target) == null ? void 0 : _a2.focus) == null ? void 0 : _b.call(_a2);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = ref("");
    const textareaRef = ref();
    const isActive = computed(() => isFocused.value || props.persistentPlaceholder);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isActive.value || props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      var _a2;
      if (textareaRef.value !== document.activeElement) {
        (_a2 = textareaRef.value) == null ? void 0 : _a2.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      const caretPosition = [el.selectionStart, el.selectionEnd];
      model.value = el.value;
      nextTick(() => {
        el.selectionStart = caretPosition[0];
        el.selectionEnd = caretPosition[1];
      });
    }
    const sizerRef = ref();
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        controlHeight.value = convertToUnit(clamp(height ?? 0, minHeight, maxHeight));
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
        }],
        "onClick:prepend": props["onClick:prepend"],
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            isDisabled,
            isDirty,
            isReadonly: isReadonly2,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": "textbox"
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment$1, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly2.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a2;
          return createVNode(Fragment$1, null, [(_a2 = slots.details) == null ? void 0 : _a2.call(slots, slotProps), hasCounter && createVNode(Fragment$1, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const VThemeProvider = genericComponent()({
  name: "VThemeProvider",
  props: {
    withBackground: Boolean,
    ...makeThemeProps(),
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    return () => {
      var _a2;
      if (!props.withBackground)
        return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      return createVNode(props.tag, {
        "class": ["v-theme-provider", themeClasses.value]
      }, {
        default: () => {
          var _a3;
          return [(_a3 = slots.default) == null ? void 0 : _a3.call(slots)];
        }
      });
    };
  }
});
const VTimeline = genericComponent()({
  name: "VTimeline",
  props: {
    align: {
      type: String,
      default: "center",
      validator: (v) => ["center", "start"].includes(v)
    },
    direction: {
      type: String,
      default: "vertical",
      validator: (v) => ["vertical", "horizontal"].includes(v)
    },
    justify: {
      type: String,
      default: "auto",
      validator: (v) => ["auto", "center"].includes(v)
    },
    side: {
      type: String,
      validator: (v) => v == null || ["start", "end"].includes(v)
    },
    lineInset: {
      type: [String, Number],
      default: 0
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      validator: (v) => ["start", "end", "both"].includes(v)
    },
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    provideDefaults({
      VTimelineDivider: {
        lineColor: toRef(props, "lineColor")
      },
      VTimelineItem: {
        density: toRef(props, "density"),
        lineInset: toRef(props, "lineInset")
      }
    });
    const sideClasses = computed(() => {
      const side = props.side ? props.side : props.density !== "default" ? "end" : null;
      return side && `v-timeline--side-${side}`;
    });
    const truncateClasses = computed(() => {
      const classes = ["v-timeline--truncate-line-start", "v-timeline--truncate-line-end"];
      switch (props.truncateLine) {
        case "both":
          return classes;
        case "start":
          return classes[0];
        case "end":
          return classes[1];
        default:
          return null;
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-timeline", `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
        "v-timeline--inset-line": !!props.lineInset
      }, themeClasses.value, densityClasses.value, sideClasses.value],
      "style": {
        "--v-timeline-line-thickness": convertToUnit(props.lineThickness)
      }
    }, slots));
    return {};
  }
});
const VTimelineDivider = genericComponent()({
  name: "VTimelineDivider",
  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    icon: IconValue,
    iconColor: String,
    lineColor: String,
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, "v-timeline-divider__dot");
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(toRef(props, "dotColor"));
    const {
      roundedClasses
    } = useRounded(props, "v-timeline-divider__dot");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles
    } = useBackgroundColor(toRef(props, "lineColor"));
    useRender(() => createVNode("div", {
      "class": ["v-timeline-divider", {
        "v-timeline-divider--fill-dot": props.fillDot
      }]
    }, [createVNode("div", {
      "class": ["v-timeline-divider__before", lineColorClasses.value],
      "style": lineColorStyles.value
    }, null), !props.hideDot && createVNode("div", {
      "key": "dot",
      "class": ["v-timeline-divider__dot", elevationClasses.value, roundedClasses.value, sizeClasses.value],
      "style": sizeStyles.value
    }, [createVNode("div", {
      "class": ["v-timeline-divider__inner-dot", backgroundColorClasses.value, roundedClasses.value],
      "style": backgroundColorStyles.value
    }, [!slots.default ? createVNode(VIcon, {
      "key": "icon",
      "color": props.iconColor,
      "icon": props.icon,
      "size": props.size
    }, null) : createVNode(VDefaultsProvider, {
      "key": "icon-defaults",
      "disabled": !props.icon,
      "defaults": {
        VIcon: {
          color: props.iconColor,
          icon: props.icon,
          size: props.size
        }
      }
    }, slots.default)])]), createVNode("div", {
      "class": ["v-timeline-divider__after", lineColorClasses.value],
      "style": lineColorStyles.value
    }, null)]));
    return {};
  }
});
const VTimelineItem = genericComponent()({
  name: "VTimelineItem",
  props: {
    density: String,
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: void 0
    },
    icon: IconValue,
    iconColor: String,
    lineInset: [Number, String],
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeDimensionProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = ref(0);
    const dotRef = ref();
    watch(dotRef, (newValue) => {
      var _a2;
      if (!newValue)
        return;
      dotSize.value = ((_a2 = newValue.$el.querySelector(".v-timeline-divider__dot")) == null ? void 0 : _a2.getBoundingClientRect().width) ?? 0;
    }, {
      flush: "post"
    });
    useRender(() => {
      var _a2, _b;
      return createVNode("div", {
        "class": ["v-timeline-item", {
          "v-timeline-item--fill-dot": props.fillDot
        }],
        "style": {
          "--v-timeline-dot-size": convertToUnit(dotSize.value),
          "--v-timeline-line-inset": props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
        }
      }, [createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), createVNode(VTimelineDivider, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }), props.density !== "compact" && createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_b = slots.opposite) == null ? void 0 : _b.call(slots))])]);
    });
    return {};
  }
});
const VTooltip = genericComponent()({
  name: "VTooltip",
  props: {
    id: String,
    text: String,
    ...omit(makeVOverlayProps({
      closeOnBack: false,
      location: "end",
      locationStrategy: "connected",
      minWidth: 0,
      offset: 10,
      openOnClick: false,
      openOnHover: true,
      origin: "auto",
      scrim: false,
      scrollStrategy: "reposition",
      transition: false
    }), ["absolute", "persistent", "eager"])
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-tooltip-${uid}`);
    const overlay = ref();
    const location2 = computed(() => {
      return props.location.split(" ").length > 1 ? props.location : props.location + " center";
    });
    const origin = computed(() => {
      return props.origin === "auto" || props.origin === "overlap" || props.origin.split(" ").length > 1 || props.location.split(" ").length > 1 ? props.origin : props.origin + " center";
    });
    const transition = computed(() => {
      if (props.transition)
        return props.transition;
      return isActive.value ? "scale-transition" : "fade-transition";
    });
    const activatorProps = computed(() => mergeProps({
      "aria-describedby": id.value
    }, props.activatorProps));
    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-tooltip"],
        "id": id.value
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "transition": transition.value,
        "absolute": true,
        "location": location2.value,
        "origin": origin.value,
        "persistent": true,
        "role": "tooltip",
        "eager": true,
        "activatorProps": activatorProps.value,
        "_disableGlobalStack": true
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _a2;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return ((_a2 = slots.default) == null ? void 0 : _a2.call(slots, ...args)) ?? props.text;
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VValidation = genericComponent()({
  name: "VValidation",
  props: {
    ...makeValidationProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const validation = useValidation(props, "validation");
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots, validation);
    };
  }
});
const components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  VAlert,
  VAlertTitle,
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VAppBarTitle,
  VAutocomplete,
  VAvatar,
  VBadge,
  VBanner,
  VBannerActions,
  VBannerText,
  VBottomNavigation,
  VBreadcrumbs,
  VBreadcrumbsDivider,
  VBreadcrumbsItem,
  VBtn,
  VBtnGroup,
  VBtnToggle,
  VCard,
  VCardActions,
  VCardItem,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCarousel,
  VCarouselItem,
  VCheckbox,
  VCheckboxBtn,
  VChip,
  VChipGroup,
  VClassIcon,
  VCode,
  VCol,
  VColorPicker,
  VCombobox,
  VComponentIcon,
  VContainer,
  VCounter,
  VDefaultsProvider,
  VDialog,
  VDialogBottomTransition,
  VDialogTopTransition,
  VDialogTransition,
  VDivider,
  VExpandTransition,
  VExpandXTransition,
  VExpansionPanel,
  VExpansionPanelText,
  VExpansionPanelTitle,
  VExpansionPanels,
  VFabTransition,
  VFadeTransition,
  VField,
  VFieldLabel,
  VFileInput,
  VFooter,
  VForm,
  VHover,
  VIcon,
  VImg,
  VInput,
  VItem,
  VItemGroup,
  VKbd,
  VLabel,
  VLayout,
  VLayoutItem,
  VLazy,
  VLigatureIcon,
  VList,
  VListGroup,
  VListImg,
  VListItem,
  VListItemAction,
  VListItemMedia,
  VListItemSubtitle,
  VListItemTitle,
  VListSubheader,
  VLocaleProvider,
  VMain,
  VMenu,
  VMessages,
  VNavigationDrawer,
  VNoSsr,
  VOverlay,
  VPagination,
  VParallax,
  VProgressCircular,
  VProgressLinear,
  VRadio,
  VRadioGroup,
  VRangeSlider,
  VRating,
  VResponsive,
  VRow,
  VScaleTransition,
  VScrollXReverseTransition,
  VScrollXTransition,
  VScrollYReverseTransition,
  VScrollYTransition,
  VSelect,
  VSelectionControl,
  VSelectionControlGroup,
  VSheet,
  VSlideGroup,
  VSlideGroupItem,
  VSlideXReverseTransition,
  VSlideXTransition,
  VSlideYReverseTransition,
  VSlideYTransition,
  VSlider,
  VSnackbar,
  VSpacer,
  VSvgIcon,
  VSwitch,
  VSystemBar,
  VTab,
  VTable,
  VTabs,
  VTextField,
  VTextarea,
  VThemeProvider,
  VTimeline,
  VTimelineItem,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VTooltip,
  VValidation,
  VWindow,
  VWindowItem
});
const md3 = {
  defaults: {
    VAppBar: {
      flat: true
    },
    VAutocomplete: {
      variant: "filled"
    },
    VBanner: {
      color: "primary"
    },
    VBtn: {
      color: "primary",
      rounded: "xl"
    },
    VBtnGroup: {
      rounded: "xl",
      VBtn: {
        rounded: null
      }
    },
    VCard: {
      rounded: "lg"
    },
    VCheckbox: {
      color: "secondary"
    },
    VChip: {
      rounded: "sm"
    },
    VCombobox: {
      variant: "filled"
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VSelect: {
      variant: "filled"
    },
    VSlider: {
      color: "primary"
    },
    VTabs: {
      color: "primary"
    },
    VTextarea: {
      variant: "filled"
    },
    VTextField: {
      variant: "filled"
    }
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#6750a4",
          secondary: "#b4b0bb",
          tertiary: "#7d5260",
          error: "#b3261e",
          surface: "#fffbfe"
        }
      }
    }
  }
};
const vuetify_8NhHJigKc1 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md3,
    icons: {
      defaultSet: "md",
      aliases,
      sets: {
        md
      }
    },
    components
    // directives
  });
  nuxtApp.vueApp.use(vuetify);
});
const _plugins = [
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_jmwsqit4Rs,
  composition_sLxaNGmlSL,
  i18n_yfWm7jX06p,
  plugin_server_XNCxeHyTuP,
  initApiKey_CXMqkhj1VY,
  settings_2MnfoqQ5ue,
  vuetify_8NhHJigKc1
];
const Fragment = /* @__PURE__ */ defineComponent$1({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const layouts = {
  default: () => import('./default-9104ea19.mjs').then((m) => m.default || m),
  "vuetify-app": () => import('./vuetifyApp-ed607b44.mjs').then((m) => m.default || m)
};
const LayoutLoader = /* @__PURE__ */ defineComponent$1({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent$1({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject$1("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
const __nuxt_component_1 = /* @__PURE__ */ defineComponent$1({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transform: `scaleX(${indicator.progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    if (opts.throttle && false) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
      }, opts.throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_2 = /* @__PURE__ */ defineComponent$1({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent$1({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtLoadingIndicator = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtLoadingIndicator),
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./error-component-0eaaa29c.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./island-renderer-deb5392b.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useUser as a, useFetch as b, createError as c, useRouter$1 as d, entry$1 as default, useNuxtApp as e, useI18n as f, useRuntimeConfig as g, useAuthFetch as h, useCurrentModel as i, useApiKey as j, addConversation as k, logout as l, genTitle as m, navigateTo as n, useDrawer as o, getDefaultConversationData as p, defineNuxtRouteMiddleware as q, fetchUser as r, setUser as s, setApiKey as t, useRoute as u, useState as v, useDisplay as w, useConversations as x, getConversations as y, useHead as z };
//# sourceMappingURL=server.mjs.map
