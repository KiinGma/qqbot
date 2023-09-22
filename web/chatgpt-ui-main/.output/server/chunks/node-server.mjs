globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import * as httpProxy$1 from 'http-proxy';
import require$$0$6 from 'unenv/runtime/npm/debug';
import * as isGlob$1 from 'is-glob';
import * as micromatch$1 from 'micromatch';
import * as url$2 from 'url';
import * as isPlainObj$2 from 'is-plain-obj';
import * as zlib$1 from 'zlib';
import * as querystring$1 from 'querystring';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"appName":"ChatGPT UI","typewriter":false,"typewriterDelay":50,"customApiKey":false,"pwaManifest":{"name":"ChatGPT UI","short_name":"ChatGPT UI","description":"A ChatGPT web Client","lang":"en","start_url":"/?standalone=true","display":"standalone","background_color":"#ffffff","theme_color":"#000000","icons":[{"src":"/_nuxt/icons/64x64.20fc1257.png","type":"image/png","sizes":"64x64","purpose":"any"},{"src":"/_nuxt/icons/64x64.maskable.20fc1257.png","type":"image/png","sizes":"64x64","purpose":"maskable"},{"src":"/_nuxt/icons/120x120.20fc1257.png","type":"image/png","sizes":"120x120","purpose":"any"},{"src":"/_nuxt/icons/120x120.maskable.20fc1257.png","type":"image/png","sizes":"120x120","purpose":"maskable"},{"src":"/_nuxt/icons/144x144.20fc1257.png","type":"image/png","sizes":"144x144","purpose":"any"},{"src":"/_nuxt/icons/144x144.maskable.20fc1257.png","type":"image/png","sizes":"144x144","purpose":"maskable"},{"src":"/_nuxt/icons/152x152.20fc1257.png","type":"image/png","sizes":"152x152","purpose":"any"},{"src":"/_nuxt/icons/152x152.maskable.20fc1257.png","type":"image/png","sizes":"152x152","purpose":"maskable"},{"src":"/_nuxt/icons/192x192.20fc1257.png","type":"image/png","sizes":"192x192","purpose":"any"},{"src":"/_nuxt/icons/192x192.maskable.20fc1257.png","type":"image/png","sizes":"192x192","purpose":"maskable"},{"src":"/_nuxt/icons/384x384.20fc1257.png","type":"image/png","sizes":"384x384","purpose":"any"},{"src":"/_nuxt/icons/384x384.maskable.20fc1257.png","type":"image/png","sizes":"384x384","purpose":"maskable"},{"src":"/_nuxt/icons/512x512.20fc1257.png","type":"image/png","sizes":"512x512","purpose":"any"},{"src":"/_nuxt/icons/512x512.maskable.20fc1257.png","type":"image/png","sizes":"512x512","purpose":"maskable"}]}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const _JNdo8wRhfq = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(
      [
        "<script>",
        "if ('serviceWorker' in navigator) {",
        "  navigator.serviceWorker.getRegistrations().then((registrations) => {",
        "    for (const registration of registrations) {",
        "      console.info('[PWA] Unregistering Service Worker:', registration)",
        "      registration.unregister()",
        "    }",
        "  })",
        "}",
        "if ('caches' in window) {",
        "  caches.keys()",
        "    .then((keys) => {",
        "      if (keys.length) {",
        "        console.info('[PWA] Cleaning cache for:', keys.join(', '))",
        "        for (const key of keys) {",
        "          caches.delete(key)",
        "        }",
        "      }",
        "    })",
        "}",
        "<\/script>"
      ].join("\n")
    );
  });
});

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _vEErtnshzP = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _JNdo8wRhfq,
_vEErtnshzP
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-06-15T07:00:22.510Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/icon-black.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c0-W+qqtG4qMk1bCn3Yo2VdCD4IIWg\"",
    "mtime": "2023-06-15T07:00:22.523Z",
    "size": 1216,
    "path": "../public/icon-black.svg"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"6163-o0X+RsBUf6opCcJb1dhMfwEOeKY\"",
    "mtime": "2023-06-15T07:00:22.536Z",
    "size": 24931,
    "path": "../public/icon.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
    "mtime": "2023-06-15T07:00:22.545Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/_nuxt/auth.514ef4f2.js": {
    "type": "application/javascript",
    "etag": "\"150-D5xFFOakryxSyphrSp1WfxHqJAY\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 336,
    "path": "../public/_nuxt/auth.514ef4f2.js"
  },
  "/_nuxt/default.4c479559.js": {
    "type": "application/javascript",
    "etag": "\"3d85-BAexTNp6F6Q2PmqnRsCt/kXqBxI\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 15749,
    "path": "../public/_nuxt/default.4c479559.js"
  },
  "/_nuxt/default.e02826d9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e0-cblgBx50MH9O5zAi06E+Fp0Pbmg\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 224,
    "path": "../public/_nuxt/default.e02826d9.css"
  },
  "/_nuxt/en-US.5d834323.js": {
    "type": "application/javascript",
    "etag": "\"1db2-UEqu0+o0djZ6XRyx+Jqpo/vpLIc\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 7602,
    "path": "../public/_nuxt/en-US.5d834323.js"
  },
  "/_nuxt/entry.7de5b8ce.js": {
    "type": "application/javascript",
    "etag": "\"77158-oEDZ24ypR4UdxlymwtFvtYUyrNE\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 487768,
    "path": "../public/_nuxt/entry.7de5b8ce.js"
  },
  "/_nuxt/entry.c3d98912.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"83b54-e4xE6MqjGNiuiaTUMQ84bpXFOGA\"",
    "mtime": "2023-06-15T07:23:30.725Z",
    "size": 539476,
    "path": "../public/_nuxt/entry.c3d98912.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.ac9c1a17.js": {
    "type": "application/javascript",
    "etag": "\"8ef-3yCEC9um6AT2DkPLm4POFdXY+ws\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 2287,
    "path": "../public/_nuxt/error-404.ac9c1a17.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.bddacf91.js": {
    "type": "application/javascript",
    "etag": "\"757-AoH4j4IFAmFJSj95rujE/Jk7aLc\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 1879,
    "path": "../public/_nuxt/error-500.bddacf91.js"
  },
  "/_nuxt/error-component.61c9ba0d.js": {
    "type": "application/javascript",
    "etag": "\"48e-xePlZWW6fTtvvn7jByOKEtKLRwM\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 1166,
    "path": "../public/_nuxt/error-component.61c9ba0d.js"
  },
  "/_nuxt/es-ES.51fbb4ee.js": {
    "type": "application/javascript",
    "etag": "\"1e94-pTrgr5S7oE4l67a0Z1Y+n4jNc0A\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 7828,
    "path": "../public/_nuxt/es-ES.51fbb4ee.js"
  },
  "/_nuxt/fr-FR.94512d98.js": {
    "type": "application/javascript",
    "etag": "\"1f06-TNtzvS+0nPD1LpIAezk9/YIdA+8\"",
    "mtime": "2023-06-15T07:23:30.725Z",
    "size": 7942,
    "path": "../public/_nuxt/fr-FR.94512d98.js"
  },
  "/_nuxt/index.448cf7b3.js": {
    "type": "application/javascript",
    "etag": "\"31f610-YAFmp7i8a+b897f4ACoj6Z6jb0I\"",
    "mtime": "2023-06-15T07:23:30.732Z",
    "size": 3274256,
    "path": "../public/_nuxt/index.448cf7b3.js"
  },
  "/_nuxt/index.df506803.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b6-rKQPHtcZS3bPbHz3ILnnNnFvw44\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 1718,
    "path": "../public/_nuxt/index.df506803.css"
  },
  "/_nuxt/Languages.4cc3a478.js": {
    "type": "application/javascript",
    "etag": "\"562-4CLV6dT1/SxVU92tzbk2OCRYTGA\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 1378,
    "path": "../public/_nuxt/Languages.4cc3a478.js"
  },
  "/_nuxt/MaterialIcons-Regular.11ec382a.woff": {
    "type": "font/woff",
    "etag": "\"27340-5fpSVkjHQhPN64VUqncFfwxNhIg\"",
    "mtime": "2023-06-15T07:23:30.721Z",
    "size": 160576,
    "path": "../public/_nuxt/MaterialIcons-Regular.11ec382a.woff"
  },
  "/_nuxt/MaterialIcons-Regular.29c11fa5.ttf": {
    "type": "font/ttf",
    "etag": "\"54dc4-tYK4af4F819aHQjN9QsrXrN7rkQ\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 347588,
    "path": "../public/_nuxt/MaterialIcons-Regular.29c11fa5.ttf"
  },
  "/_nuxt/MaterialIcons-Regular.5743ed3d.woff2": {
    "type": "font/woff2",
    "etag": "\"1e8bc-fmes9W9tUnmAUEw9DdKjDXBuUzk\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 125116,
    "path": "../public/_nuxt/MaterialIcons-Regular.5743ed3d.woff2"
  },
  "/_nuxt/MaterialIcons-Regular.e69d687a.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2305c-WeR7bd7nzLd2G0q5uBxGYbgYEf0\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 143452,
    "path": "../public/_nuxt/MaterialIcons-Regular.e69d687a.eot"
  },
  "/_nuxt/nuxt-link.95b7fa91.js": {
    "type": "application/javascript",
    "etag": "\"fea-Xdmd2rEqhPgTRKqH7QX5ArxBXtY\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 4074,
    "path": "../public/_nuxt/nuxt-link.95b7fa91.js"
  },
  "/_nuxt/onboarding.45bf3cf2.js": {
    "type": "application/javascript",
    "etag": "\"7c9-JOKeVo7PA7Qu05JCU4sbNj/JG2g\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 1993,
    "path": "../public/_nuxt/onboarding.45bf3cf2.js"
  },
  "/_nuxt/onboarding.fd1b9e7a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"52-MI6vSf8tsuKTKKNQ+kcrPl4ZIEo\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 82,
    "path": "../public/_nuxt/onboarding.fd1b9e7a.css"
  },
  "/_nuxt/ready.ceb3753a.js": {
    "type": "application/javascript",
    "etag": "\"17c-bqHYGllLamsc8sYk/7qU7i9fQBs\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 380,
    "path": "../public/_nuxt/ready.ceb3753a.js"
  },
  "/_nuxt/resetPassword.82122afa.js": {
    "type": "application/javascript",
    "etag": "\"e15-1TTbrHXZc2VF4r6OeJMmCeJpFtI\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 3605,
    "path": "../public/_nuxt/resetPassword.82122afa.js"
  },
  "/_nuxt/ru-RU.98a73995.js": {
    "type": "application/javascript",
    "etag": "\"22aa-d09eqCCdtNi5AuoTrgEQp/NLbxc\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 8874,
    "path": "../public/_nuxt/ru-RU.98a73995.js"
  },
  "/_nuxt/signin.5b3e48f1.js": {
    "type": "application/javascript",
    "etag": "\"9e6-D2JlZYmRnVoNmLdv42pJ2fqjWn0\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 2534,
    "path": "../public/_nuxt/signin.5b3e48f1.js"
  },
  "/_nuxt/signup.610ab909.js": {
    "type": "application/javascript",
    "etag": "\"eb3-fhgKJx9ntvHt8hwTv48tNjD7Th8\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 3763,
    "path": "../public/_nuxt/signup.610ab909.js"
  },
  "/_nuxt/verify-email.16f32f12.js": {
    "type": "application/javascript",
    "etag": "\"777-laX0HLsySHtnvAZpdovxxibMKNg\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 1911,
    "path": "../public/_nuxt/verify-email.16f32f12.js"
  },
  "/_nuxt/verify-email.86923d61.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-IFv9N7TSClOV/AAxdm+M3RZMnAA\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 40,
    "path": "../public/_nuxt/verify-email.86923d61.css"
  },
  "/_nuxt/vuetifyApp.9316d3dc.js": {
    "type": "application/javascript",
    "etag": "\"110-MD4+HlHi7FMJ8g3Kueidsc72JS8\"",
    "mtime": "2023-06-15T07:23:30.724Z",
    "size": 272,
    "path": "../public/_nuxt/vuetifyApp.9316d3dc.js"
  },
  "/_nuxt/zh-CN.f84162e6.js": {
    "type": "application/javascript",
    "etag": "\"1f8c-OtPITo01l2qSp8UOAXJPYlnmVIs\"",
    "mtime": "2023-06-15T07:23:30.731Z",
    "size": 8076,
    "path": "../public/_nuxt/zh-CN.f84162e6.js"
  },
  "/_nuxt/icons/120x120.20fc1257.png": {
    "type": "image/png",
    "etag": "\"1378-8x58UwUSM1F5TKb208vFZ6QNhow\"",
    "mtime": "2023-06-15T07:23:20.256Z",
    "size": 4984,
    "path": "../public/_nuxt/icons/120x120.20fc1257.png"
  },
  "/_nuxt/icons/120x120.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"e18-LR6YonrCAp1ec0mS+/qvuvFXLGU\"",
    "mtime": "2023-06-15T07:23:20.367Z",
    "size": 3608,
    "path": "../public/_nuxt/icons/120x120.maskable.20fc1257.png"
  },
  "/_nuxt/icons/144x144.20fc1257.png": {
    "type": "image/png",
    "etag": "\"1835-9RJaC7dDi6rDFG7SNRTv49CG0Vw\"",
    "mtime": "2023-06-15T07:23:20.256Z",
    "size": 6197,
    "path": "../public/_nuxt/icons/144x144.20fc1257.png"
  },
  "/_nuxt/icons/144x144.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"10d5-wfAk5wS3zYZpipExmEWNYCopzHc\"",
    "mtime": "2023-06-15T07:23:20.369Z",
    "size": 4309,
    "path": "../public/_nuxt/icons/144x144.maskable.20fc1257.png"
  },
  "/_nuxt/icons/152x152.20fc1257.png": {
    "type": "image/png",
    "etag": "\"194e-oA3mHDRMn8P3um6b6OQDQzqhooI\"",
    "mtime": "2023-06-15T07:23:20.256Z",
    "size": 6478,
    "path": "../public/_nuxt/icons/152x152.20fc1257.png"
  },
  "/_nuxt/icons/152x152.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"11f8-HmrEQjACQ+V3MsHuOelt6shUZXY\"",
    "mtime": "2023-06-15T07:23:20.373Z",
    "size": 4600,
    "path": "../public/_nuxt/icons/152x152.maskable.20fc1257.png"
  },
  "/_nuxt/icons/192x192.20fc1257.png": {
    "type": "image/png",
    "etag": "\"2139-VVlTjR9v7VojQ0dEhjp45rgoH4Q\"",
    "mtime": "2023-06-15T07:23:20.289Z",
    "size": 8505,
    "path": "../public/_nuxt/icons/192x192.20fc1257.png"
  },
  "/_nuxt/icons/192x192.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"16a7-sD0Ior+jaGch5ssSsbgzHgDQxwE\"",
    "mtime": "2023-06-15T07:23:20.380Z",
    "size": 5799,
    "path": "../public/_nuxt/icons/192x192.maskable.20fc1257.png"
  },
  "/_nuxt/icons/384x384.20fc1257.png": {
    "type": "image/png",
    "etag": "\"5211-T6GlXeboMHCnEwqiGqwUAMNSXbA\"",
    "mtime": "2023-06-15T07:23:20.295Z",
    "size": 21009,
    "path": "../public/_nuxt/icons/384x384.20fc1257.png"
  },
  "/_nuxt/icons/384x384.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"32e8-tizlEYU051N+v5KWAFyntnl6Th4\"",
    "mtime": "2023-06-15T07:23:20.371Z",
    "size": 13032,
    "path": "../public/_nuxt/icons/384x384.maskable.20fc1257.png"
  },
  "/_nuxt/icons/512x512.20fc1257.png": {
    "type": "image/png",
    "etag": "\"7927-3YQ8Ty21nXwbTUyzv7Z9duSJaUw\"",
    "mtime": "2023-06-15T07:23:20.306Z",
    "size": 31015,
    "path": "../public/_nuxt/icons/512x512.20fc1257.png"
  },
  "/_nuxt/icons/512x512.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"4a56-bOT9vsDSWVuleGO0YHY2/wYFDQk\"",
    "mtime": "2023-06-15T07:23:20.374Z",
    "size": 19030,
    "path": "../public/_nuxt/icons/512x512.maskable.20fc1257.png"
  },
  "/_nuxt/icons/64x64.20fc1257.png": {
    "type": "image/png",
    "etag": "\"9a8-QyH4rZULfxfM/GbPFYFSclghRuc\"",
    "mtime": "2023-06-15T07:23:20.256Z",
    "size": 2472,
    "path": "../public/_nuxt/icons/64x64.20fc1257.png"
  },
  "/_nuxt/icons/64x64.maskable.20fc1257.png": {
    "type": "image/png",
    "etag": "\"6c4-SnP4/p3ftoPcPu/yiQLsQPGRVYI\"",
    "mtime": "2023-06-15T07:23:20.360Z",
    "size": 1732,
    "path": "../public/_nuxt/icons/64x64.maskable.20fc1257.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : "undefined" !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var dist = {};

var httpProxyMiddleware = {};

const require$$0$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(httpProxy$1);

var configuration = {};

var errors = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ERRORS = void 0;
	(function (ERRORS) {
	    ERRORS["ERR_CONFIG_FACTORY_TARGET_MISSING"] = "[HPM] Missing \"target\" option. Example: {target: \"http://www.example.org\"}";
	    ERRORS["ERR_CONTEXT_MATCHER_GENERIC"] = "[HPM] Invalid context. Expecting something like: \"/api\" or [\"/api\", \"/ajax\"]";
	    ERRORS["ERR_CONTEXT_MATCHER_INVALID_ARRAY"] = "[HPM] Invalid pathFilter. Expecting something like: [\"/api\", \"/ajax\"] or [\"/api/**\", \"!**.html\"]";
	    ERRORS["ERR_PATH_REWRITER_CONFIG"] = "[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function";
	})(exports.ERRORS || (exports.ERRORS = {}));
} (errors));

Object.defineProperty(configuration, "__esModule", { value: true });
configuration.verifyConfig = void 0;
const errors_1$2 = errors;
function verifyConfig(options) {
    if (!options.target && !options.router) {
        throw new Error(errors_1$2.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);
    }
}
configuration.verifyConfig = verifyConfig;

var getPlugins$1 = {};

var _default = {};

var debugProxyErrorsPlugin$1 = {};

var debug$6 = {};

Object.defineProperty(debug$6, "__esModule", { value: true });
debug$6.Debug = void 0;
const createDebug = require$$0$6;
/**
 * Debug instance with the given namespace: http-proxy-middleware
 */
debug$6.Debug = createDebug('http-proxy-middleware');

Object.defineProperty(debugProxyErrorsPlugin$1, "__esModule", { value: true });
debugProxyErrorsPlugin$1.debugProxyErrorsPlugin = void 0;
const debug_1$6 = debug$6;
const debug$5 = debug_1$6.Debug.extend('debug-proxy-errors-plugin');
/**
 * Subscribe to {@link https://www.npmjs.com/package/http-proxy#listening-for-proxy-events http-proxy error events} to prevent server from crashing.
 * Errors are logged with {@link https://www.npmjs.com/package/debug debug} library.
 */
const debugProxyErrorsPlugin = (proxyServer) => {
    /**
     * http-proxy doesn't handle any errors by default (https://github.com/http-party/node-http-proxy#listening-for-proxy-events)
     * Prevent server from crashing when http-proxy errors (uncaught errors)
     */
    proxyServer.on('error', (error, req, res, target) => {
        debug$5(`http-proxy error event: \n%O`, error);
    });
    proxyServer.on('proxyReq', (proxyReq, req, socket) => {
        socket.on('error', (error) => {
            debug$5('Socket error in proxyReq event: \n%O', error);
        });
    });
    /**
     * Fix SSE close events
     * @link https://github.com/chimurai/http-proxy-middleware/issues/678
     * @link https://github.com/http-party/node-http-proxy/issues/1520#issue-877626125
     */
    proxyServer.on('proxyRes', (proxyRes, req, res) => {
        res.on('close', () => {
            if (!res.writableEnded) {
                debug$5('Destroying proxyRes in proxyRes close event');
                proxyRes.destroy();
            }
        });
    });
    /**
     * Fix crash when target server restarts
     * https://github.com/chimurai/http-proxy-middleware/issues/476#issuecomment-746329030
     * https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-790602225
     */
    proxyServer.on('proxyReqWs', (proxyReq, req, socket) => {
        socket.on('error', (error) => {
            debug$5('Socket error in proxyReqWs event: \n%O', error);
        });
    });
    proxyServer.on('open', (proxySocket) => {
        proxySocket.on('error', (error) => {
            debug$5('Socket error in open event: \n%O', error);
        });
    });
    proxyServer.on('close', (req, socket, head) => {
        socket.on('error', (error) => {
            debug$5('Socket error in close event: \n%O', error);
        });
    });
    // https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-1103136590
    proxyServer.on('econnreset', (error, req, res, target) => {
        debug$5(`http-proxy econnreset event: \n%O`, error);
    });
};
debugProxyErrorsPlugin$1.debugProxyErrorsPlugin = debugProxyErrorsPlugin;

var errorResponsePlugin$1 = {};

var statusCode = {};

Object.defineProperty(statusCode, "__esModule", { value: true });
statusCode.getStatusCode = void 0;
function getStatusCode(errorCode) {
    let statusCode;
    if (/HPE_INVALID/.test(errorCode)) {
        statusCode = 502;
    }
    else {
        switch (errorCode) {
            case 'ECONNRESET':
            case 'ENOTFOUND':
            case 'ECONNREFUSED':
            case 'ETIMEDOUT':
                statusCode = 504;
                break;
            default:
                statusCode = 500;
                break;
        }
    }
    return statusCode;
}
statusCode.getStatusCode = getStatusCode;

Object.defineProperty(errorResponsePlugin$1, "__esModule", { value: true });
errorResponsePlugin$1.errorResponsePlugin = void 0;
const status_code_1 = statusCode;
const errorResponsePlugin = (proxyServer, options) => {
    proxyServer.on('error', (err, req, res, target) => {
        // Re-throw error. Not recoverable since req & res are empty.
        if (!req && !res) {
            throw err; // "Error: Must provide a proper URL as target"
        }
        if (res.writeHead && !res.headersSent) {
            const statusCode = (0, status_code_1.getStatusCode)(err.code);
            res.writeHead(statusCode);
        }
        const host = req.headers && req.headers.host;
        res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
    });
};
errorResponsePlugin$1.errorResponsePlugin = errorResponsePlugin;

var loggerPlugin$1 = {};

var logger = {};

/* eslint-disable @typescript-eslint/no-empty-function */
Object.defineProperty(logger, "__esModule", { value: true });
logger.getLogger = void 0;
/**
 * Compatibility matrix
 *
  | Library  |  log  |  info  | warn  |  error  | \<interpolation\> |
  |----------|:------|:-------|:------|:--------|:------------------|
  | console  |   ✅   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | bunyan   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | pino     |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | winston  |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)^1 |
  | log4js   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
 *
 * ^1: https://github.com/winstonjs/winston#string-interpolation
 */
const noopLogger = {
    info: () => { },
    warn: () => { },
    error: () => { },
};
function getLogger(options) {
    return options.logger || noopLogger;
}
logger.getLogger = getLogger;

Object.defineProperty(loggerPlugin$1, "__esModule", { value: true });
loggerPlugin$1.loggerPlugin = void 0;
const logger_1$1 = logger;
const loggerPlugin = (proxyServer, options) => {
    const logger = (0, logger_1$1.getLogger)(options);
    proxyServer.on('error', (err, req, res, target) => {
        var _a;
        const hostname = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.host;
        const requestHref = `${hostname}${req === null || req === void 0 ? void 0 : req.url}`;
        const targetHref = `${target === null || target === void 0 ? void 0 : target.href}`; // target is undefined when websocket errors
        const errorMessage = '[HPM] Error occurred while proxying request %s to %s [%s] (%s)';
        const errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors'; // link to Node Common Systems Errors page
        logger.error(errorMessage, requestHref, targetHref, err.code || err, errReference);
    });
    /**
     * Log request and response
     * @example
     * ```shell
     * [HPM] GET /users/ -> http://jsonplaceholder.typicode.com/users/ [304]
     * ```
     */
    proxyServer.on('proxyRes', (proxyRes, req, res) => {
        var _a;
        // BrowserSync uses req.originalUrl
        // Next.js doesn't have req.baseUrl
        const originalUrl = (_a = req.originalUrl) !== null && _a !== void 0 ? _a : `${req.baseUrl || ''}${req.url}`;
        const exchange = `[HPM] ${req.method} ${originalUrl} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        logger.info(exchange);
    });
    /**
     * When client opens WebSocket connection
     */
    proxyServer.on('open', (socket) => {
        logger.info('[HPM] Client connected: %o', socket.address());
    });
    /**
     * When client closes WebSocket connection
     */
    proxyServer.on('close', (req, proxySocket, proxyHead) => {
        logger.info('[HPM] Client disconnected: %o', proxySocket.address());
    });
};
loggerPlugin$1.loggerPlugin = loggerPlugin;

var proxyEvents = {};

var _function = {};

/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(_function, "__esModule", { value: true });
_function.getFunctionName = void 0;
function getFunctionName(fn) {
    return fn.name || '[anonymous Function]';
}
_function.getFunctionName = getFunctionName;

Object.defineProperty(proxyEvents, "__esModule", { value: true });
proxyEvents.proxyEventsPlugin = void 0;
const debug_1$5 = debug$6;
const function_1$2 = _function;
const debug$4 = debug_1$5.Debug.extend('proxy-events-plugin');
/**
 * Implements option.on object to subscribe to http-proxy events.
 *
 * @example
 * ```js
 * createProxyMiddleware({
 *  on: {
 *    error: (error, req, res, target) => {},
 *    proxyReq: (proxyReq, req, res, options) => {},
 *    proxyReqWs: (proxyReq, req, socket, options) => {},
 *    proxyRes: (proxyRes, req, res) => {},
 *    open: (proxySocket) => {},
 *    close: (proxyRes, proxySocket, proxyHead) => {},
 *    start: (req, res, target) => {},
 *    end: (req, res, proxyRes) => {},
 *    econnreset: (error, req, res, target) => {},
 *  }
 * });
 * ```
 */
const proxyEventsPlugin = (proxyServer, options) => {
    Object.entries(options.on || {}).forEach(([eventName, handler]) => {
        debug$4(`register event handler: "${eventName}" -> "${(0, function_1$2.getFunctionName)(handler)}"`);
        proxyServer.on(eventName, handler);
    });
};
proxyEvents.proxyEventsPlugin = proxyEventsPlugin;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(debugProxyErrorsPlugin$1, exports);
	__exportStar(errorResponsePlugin$1, exports);
	__exportStar(loggerPlugin$1, exports);
	__exportStar(proxyEvents, exports);
} (_default));

Object.defineProperty(getPlugins$1, "__esModule", { value: true });
getPlugins$1.getPlugins = void 0;
const default_1 = _default;
function getPlugins(options) {
    var _a, _b;
    // don't load default errorResponsePlugin if user has specified their own
    const maybeErrorResponsePlugin = !!((_a = options.on) === null || _a === void 0 ? void 0 : _a.error) ? [] : [default_1.errorResponsePlugin];
    const defaultPlugins = !!options.ejectPlugins
        ? [] // no default plugins when ejecting
        : [default_1.debugProxyErrorsPlugin, default_1.proxyEventsPlugin, default_1.loggerPlugin, ...maybeErrorResponsePlugin];
    const userPlugins = (_b = options.plugins) !== null && _b !== void 0 ? _b : [];
    return [...defaultPlugins, ...userPlugins];
}
getPlugins$1.getPlugins = getPlugins;

var pathFilter = {};

const require$$0$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(isGlob$1);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(micromatch$1);

const require$$0$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(url$2);

Object.defineProperty(pathFilter, "__esModule", { value: true });
pathFilter.matchPathFilter = void 0;
const isGlob = require$$0$4;
const micromatch = require$$1;
const url$1 = require$$0$3;
const errors_1$1 = errors;
function matchPathFilter(pathFilter = '/', uri, req) {
    // single path
    if (isStringPath(pathFilter)) {
        return matchSingleStringPath(pathFilter, uri);
    }
    // single glob path
    if (isGlobPath(pathFilter)) {
        return matchSingleGlobPath(pathFilter, uri);
    }
    // multi path
    if (Array.isArray(pathFilter)) {
        if (pathFilter.every(isStringPath)) {
            return matchMultiPath(pathFilter, uri);
        }
        if (pathFilter.every(isGlobPath)) {
            return matchMultiGlobPath(pathFilter, uri);
        }
        throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);
    }
    // custom matching
    if (typeof pathFilter === 'function') {
        const pathname = getUrlPathName(uri);
        return pathFilter(pathname, req);
    }
    throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);
}
pathFilter.matchPathFilter = matchPathFilter;
/**
 * @param  {String} pathFilter '/api'
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchSingleStringPath(pathFilter, uri) {
    const pathname = getUrlPathName(uri);
    return pathname.indexOf(pathFilter) === 0;
}
function matchSingleGlobPath(pattern, uri) {
    const pathname = getUrlPathName(uri);
    const matches = micromatch([pathname], pattern);
    return matches && matches.length > 0;
}
function matchMultiGlobPath(patternList, uri) {
    return matchSingleGlobPath(patternList, uri);
}
/**
 * @param  {String} pathFilterList ['/api', '/ajax']
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchMultiPath(pathFilterList, uri) {
    let isMultiPath = false;
    for (const context of pathFilterList) {
        if (matchSingleStringPath(context, uri)) {
            isMultiPath = true;
            break;
        }
    }
    return isMultiPath;
}
/**
 * Parses URI and returns RFC 3986 path
 *
 * @param  {String} uri from req.url
 * @return {String}     RFC 3986 path
 */
function getUrlPathName(uri) {
    return uri && url$1.parse(uri).pathname;
}
function isStringPath(pathFilter) {
    return typeof pathFilter === 'string' && !isGlob(pathFilter);
}
function isGlobPath(pathFilter) {
    return isGlob(pathFilter);
}

var pathRewriter = {};

const require$$0$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(isPlainObj$2);

Object.defineProperty(pathRewriter, "__esModule", { value: true });
pathRewriter.createPathRewriter = void 0;
const isPlainObj$1 = require$$0$2;
const errors_1 = errors;
const debug_1$4 = debug$6;
const debug$3 = debug_1$4.Debug.extend('path-rewriter');
/**
 * Create rewrite function, to cache parsed rewrite rules.
 *
 * @param {Object} rewriteConfig
 * @return {Function} Function to rewrite paths; This function should accept `path` (request.url) as parameter
 */
function createPathRewriter(rewriteConfig) {
    let rulesCache;
    if (!isValidRewriteConfig(rewriteConfig)) {
        return;
    }
    if (typeof rewriteConfig === 'function') {
        const customRewriteFn = rewriteConfig;
        return customRewriteFn;
    }
    else {
        rulesCache = parsePathRewriteRules(rewriteConfig);
        return rewritePath;
    }
    function rewritePath(path) {
        let result = path;
        for (const rule of rulesCache) {
            if (rule.regex.test(path)) {
                result = result.replace(rule.regex, rule.value);
                debug$3('rewriting path from "%s" to "%s"', path, result);
                break;
            }
        }
        return result;
    }
}
pathRewriter.createPathRewriter = createPathRewriter;
function isValidRewriteConfig(rewriteConfig) {
    if (typeof rewriteConfig === 'function') {
        return true;
    }
    else if (isPlainObj$1(rewriteConfig)) {
        return Object.keys(rewriteConfig).length !== 0;
    }
    else if (rewriteConfig === undefined || rewriteConfig === null) {
        return false;
    }
    else {
        throw new Error(errors_1.ERRORS.ERR_PATH_REWRITER_CONFIG);
    }
}
function parsePathRewriteRules(rewriteConfig) {
    const rules = [];
    if (isPlainObj$1(rewriteConfig)) {
        for (const [key, value] of Object.entries(rewriteConfig)) {
            rules.push({
                regex: new RegExp(key),
                value: value,
            });
            debug$3('rewrite rule created: "%s" ~> "%s"', key, value);
        }
    }
    return rules;
}

var router = {};

Object.defineProperty(router, "__esModule", { value: true });
router.getTarget = void 0;
const isPlainObj = require$$0$2;
const debug_1$3 = debug$6;
const debug$2 = debug_1$3.Debug.extend('router');
async function getTarget(req, config) {
    let newTarget;
    const router = config.router;
    if (isPlainObj(router)) {
        newTarget = getTargetFromProxyTable(req, router);
    }
    else if (typeof router === 'function') {
        newTarget = await router(req);
    }
    return newTarget;
}
router.getTarget = getTarget;
function getTargetFromProxyTable(req, table) {
    let result;
    const host = req.headers.host;
    const path = req.url;
    const hostAndPath = host + path;
    for (const [key, value] of Object.entries(table)) {
        if (containsPath(key)) {
            if (hostAndPath.indexOf(key) > -1) {
                // match 'localhost:3000/api'
                result = value;
                debug$2('match: "%s" -> "%s"', key, result);
                break;
            }
        }
        else {
            if (key === host) {
                // match 'localhost:3000'
                result = value;
                debug$2('match: "%s" -> "%s"', host, result);
                break;
            }
        }
    }
    return result;
}
function containsPath(v) {
    return v.indexOf('/') > -1;
}

Object.defineProperty(httpProxyMiddleware, "__esModule", { value: true });
httpProxyMiddleware.HttpProxyMiddleware = void 0;
const httpProxy = require$$0$5;
const configuration_1 = configuration;
const get_plugins_1 = getPlugins$1;
const path_filter_1 = pathFilter;
const PathRewriter = pathRewriter;
const Router = router;
const debug_1$2 = debug$6;
const function_1$1 = _function;
class HttpProxyMiddleware {
    constructor(options) {
        this.wsInternalSubscribed = false;
        this.serverOnCloseSubscribed = false;
        // https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript#red-flags-for-this
        this.middleware = async (req, res, next) => {
            var _a, _b;
            if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
                try {
                    const activeProxyOptions = await this.prepareProxyRequest(req);
                    (0, debug_1$2.Debug)(`proxy request to target: %O`, activeProxyOptions.target);
                    this.proxy.web(req, res, activeProxyOptions);
                }
                catch (err) {
                    next && next(err);
                }
            }
            else {
                next && next();
            }
            /**
             * Get the server object to subscribe to server events;
             * 'upgrade' for websocket and 'close' for graceful shutdown
             *
             * NOTE:
             * req.socket: node >= 13
             * req.connection: node < 13 (Remove this when node 12/13 support is dropped)
             */
            const server = (_b = (((_a = req.socket) !== null && _a !== void 0 ? _a : req.connection))) === null || _b === void 0 ? void 0 : _b.server;
            if (server && !this.serverOnCloseSubscribed) {
                server.on('close', () => {
                    (0, debug_1$2.Debug)('server close signal received: closing proxy server');
                    this.proxy.close();
                });
                this.serverOnCloseSubscribed = true;
            }
            if (this.proxyOptions.ws === true) {
                // use initial request to access the server object to subscribe to http upgrade event
                this.catchUpgradeRequest(server);
            }
        };
        this.catchUpgradeRequest = (server) => {
            if (!this.wsInternalSubscribed) {
                (0, debug_1$2.Debug)('subscribing to server upgrade event');
                server.on('upgrade', this.handleUpgrade);
                // prevent duplicate upgrade handling;
                // in case external upgrade is also configured
                this.wsInternalSubscribed = true;
            }
        };
        this.handleUpgrade = async (req, socket, head) => {
            if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
                const activeProxyOptions = await this.prepareProxyRequest(req);
                this.proxy.ws(req, socket, head, activeProxyOptions);
                (0, debug_1$2.Debug)('server upgrade event received. Proxying WebSocket');
            }
        };
        /**
         * Determine whether request should be proxied.
         */
        this.shouldProxy = (pathFilter, req) => {
            return (0, path_filter_1.matchPathFilter)(pathFilter, req.url, req);
        };
        /**
         * Apply option.router and option.pathRewrite
         * Order matters:
         *    Router uses original path for routing;
         *    NOT the modified path, after it has been rewritten by pathRewrite
         * @param {Object} req
         * @return {Object} proxy options
         */
        this.prepareProxyRequest = async (req) => {
            /**
             * Incorrect usage confirmed: https://github.com/expressjs/express/issues/4854#issuecomment-1066171160
             * Temporary restore req.url patch for {@link src/legacy/create-proxy-middleware.ts legacyCreateProxyMiddleware()}
             * FIXME: remove this patch in future release
             */
            if (this.middleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__) {
                req.url = req.originalUrl || req.url;
            }
            const newProxyOptions = Object.assign({}, this.proxyOptions);
            // Apply in order:
            // 1. option.router
            // 2. option.pathRewrite
            await this.applyRouter(req, newProxyOptions);
            await this.applyPathRewrite(req, this.pathRewriter);
            return newProxyOptions;
        };
        // Modify option.target when router present.
        this.applyRouter = async (req, options) => {
            let newTarget;
            if (options.router) {
                newTarget = await Router.getTarget(req, options);
                if (newTarget) {
                    (0, debug_1$2.Debug)('router new target: "%s"', newTarget);
                    options.target = newTarget;
                }
            }
        };
        // rewrite path
        this.applyPathRewrite = async (req, pathRewriter) => {
            if (pathRewriter) {
                const path = await pathRewriter(req.url, req);
                if (typeof path === 'string') {
                    (0, debug_1$2.Debug)('pathRewrite new path: %s', req.url);
                    req.url = path;
                }
                else {
                    (0, debug_1$2.Debug)('pathRewrite: no rewritten path found: %s', req.url);
                }
            }
        };
        (0, configuration_1.verifyConfig)(options);
        this.proxyOptions = options;
        (0, debug_1$2.Debug)(`create proxy server`);
        this.proxy = httpProxy.createProxyServer({});
        this.registerPlugins(this.proxy, this.proxyOptions);
        this.pathRewriter = PathRewriter.createPathRewriter(this.proxyOptions.pathRewrite); // returns undefined when "pathRewrite" is not provided
        // https://github.com/chimurai/http-proxy-middleware/issues/19
        // expose function to upgrade externally
        this.middleware.upgrade = (req, socket, head) => {
            if (!this.wsInternalSubscribed) {
                this.handleUpgrade(req, socket, head);
            }
        };
    }
    registerPlugins(proxy, options) {
        const plugins = (0, get_plugins_1.getPlugins)(options);
        plugins.forEach((plugin) => {
            (0, debug_1$2.Debug)(`register plugin: "${(0, function_1$1.getFunctionName)(plugin)}"`);
            plugin(proxy, options);
        });
    }
}
httpProxyMiddleware.HttpProxyMiddleware = HttpProxyMiddleware;

var handlers$1 = {};

var _public$1 = {};

var responseInterceptor$1 = {};

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(zlib$1);

Object.defineProperty(responseInterceptor$1, "__esModule", { value: true });
responseInterceptor$1.responseInterceptor = void 0;
const zlib = require$$0$1;
const debug_1$1 = debug$6;
const function_1 = _function;
const debug$1 = debug_1$1.Debug.extend('response-interceptor');
/**
 * Intercept responses from upstream.
 * Automatically decompress (deflate, gzip, brotli).
 * Give developer the opportunity to modify intercepted Buffer and http.ServerResponse
 *
 * NOTE: must set options.selfHandleResponse=true (prevent automatic call of res.end())
 */
function responseInterceptor(interceptor) {
    return async function proxyResResponseInterceptor(proxyRes, req, res) {
        debug$1('intercept proxy response');
        const originalProxyRes = proxyRes;
        let buffer = Buffer.from('', 'utf8');
        // decompress proxy response
        const _proxyRes = decompress(proxyRes, proxyRes.headers['content-encoding']);
        // concat data stream
        _proxyRes.on('data', (chunk) => (buffer = Buffer.concat([buffer, chunk])));
        _proxyRes.on('end', async () => {
            // copy original headers
            copyHeaders(proxyRes, res);
            // call interceptor with intercepted response (buffer)
            debug$1('call interceptor function: %s', (0, function_1.getFunctionName)(interceptor));
            const interceptedBuffer = Buffer.from(await interceptor(buffer, originalProxyRes, req, res));
            // set correct content-length (with double byte character support)
            debug$1('set content-length: %s', Buffer.byteLength(interceptedBuffer, 'utf8'));
            res.setHeader('content-length', Buffer.byteLength(interceptedBuffer, 'utf8'));
            debug$1('write intercepted response');
            res.write(interceptedBuffer);
            res.end();
        });
        _proxyRes.on('error', (error) => {
            res.end(`Error fetching proxied request: ${error.message}`);
        });
    };
}
responseInterceptor$1.responseInterceptor = responseInterceptor;
/**
 * Streaming decompression of proxy response
 * source: https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L116
 */
function decompress(proxyRes, contentEncoding) {
    let _proxyRes = proxyRes;
    let decompress;
    switch (contentEncoding) {
        case 'gzip':
            decompress = zlib.createGunzip();
            break;
        case 'br':
            decompress = zlib.createBrotliDecompress();
            break;
        case 'deflate':
            decompress = zlib.createInflate();
            break;
    }
    if (decompress) {
        debug$1(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
        _proxyRes.pipe(decompress);
        _proxyRes = decompress;
    }
    return _proxyRes;
}
/**
 * Copy original headers
 * https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L78
 */
function copyHeaders(originalResponse, response) {
    debug$1('copy original response headers');
    response.statusCode = originalResponse.statusCode;
    response.statusMessage = originalResponse.statusMessage;
    if (response.setHeader) {
        let keys = Object.keys(originalResponse.headers);
        // ignore chunked, brotli, gzip, deflate headers
        keys = keys.filter((key) => !['content-encoding', 'transfer-encoding'].includes(key));
        keys.forEach((key) => {
            let value = originalResponse.headers[key];
            if (key === 'set-cookie') {
                // remove cookie domain
                value = Array.isArray(value) ? value : [value];
                value = value.map((x) => x.replace(/Domain=[^;]+?/i, ''));
            }
            response.setHeader(key, value);
        });
    }
    else {
        response.headers = originalResponse.headers;
    }
}

var fixRequestBody$1 = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(querystring$1);

Object.defineProperty(fixRequestBody$1, "__esModule", { value: true });
fixRequestBody$1.fixRequestBody = void 0;
const querystring = require$$0;
/**
 * Fix proxied body if bodyParser is involved.
 */
function fixRequestBody(proxyReq, req) {
    const requestBody = req.body;
    if (!requestBody) {
        return;
    }
    const contentType = proxyReq.getHeader('Content-Type');
    const writeBody = (bodyData) => {
        // deepcode ignore ContentLengthInCode: bodyParser fix
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    };
    if (contentType && contentType.includes('application/json')) {
        writeBody(JSON.stringify(requestBody));
    }
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
        writeBody(querystring.stringify(requestBody));
    }
}
fixRequestBody$1.fixRequestBody = fixRequestBody;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fixRequestBody = exports.responseInterceptor = void 0;
	var response_interceptor_1 = responseInterceptor$1;
	Object.defineProperty(exports, "responseInterceptor", { enumerable: true, get: function () { return response_interceptor_1.responseInterceptor; } });
	var fix_request_body_1 = fixRequestBody$1;
	Object.defineProperty(exports, "fixRequestBody", { enumerable: true, get: function () { return fix_request_body_1.fixRequestBody; } });
} (_public$1));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(_public$1, exports);
} (handlers$1));

var legacy = {};

var _public = {};

var createProxyMiddleware = {};

var optionsAdapter = {};

Object.defineProperty(optionsAdapter, "__esModule", { value: true });
optionsAdapter.legacyOptionsAdapter = void 0;
const url = require$$0$3;
const debug_1 = debug$6;
const logger_1 = logger;
const debug = debug_1.Debug.extend('legacy-options-adapter');
// https://github.com/chimurai/http-proxy-middleware/blob/7341704d0aa9d1606dfd37ebfdffddd34c894784/src/_handlers.ts#L20-L27
const proxyEventMap = {
    onError: 'error',
    onProxyReq: 'proxyReq',
    onProxyRes: 'proxyRes',
    onProxyReqWs: 'proxyReqWs',
    onOpen: 'open',
    onClose: 'close',
};
/**
 * Convert {@link LegacyOptions legacy Options} to new {@link Options}
 */
function legacyOptionsAdapter(legacyContext, legacyOptions) {
    let options;
    let logger;
    // https://github.com/chimurai/http-proxy-middleware/pull/716
    if (typeof legacyContext === 'string' && !!url.parse(legacyContext).host) {
        throw new Error(`Shorthand syntax is removed from legacyCreateProxyMiddleware().
      Please use "legacyCreateProxyMiddleware({ target: 'http://www.example.org' })" instead.`);
    }
    // detect old "context" argument and convert to "options.pathFilter"
    // https://github.com/chimurai/http-proxy-middleware/pull/722/files#diff-a2a171449d862fe29692ce031981047d7ab755ae7f84c707aef80701b3ea0c80L4
    if (legacyContext && legacyOptions) {
        debug('map legacy context/filter to options.pathFilter');
        options = { ...legacyOptions, pathFilter: legacyContext };
        logger = getLegacyLogger(options);
        logger.warn(`[http-proxy-middleware] Legacy "context" argument is deprecated. Migrate your "context" to "options.pathFilter":

      const options = {
        pathFilter: '${legacyContext}',
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
      `);
    }
    else if (legacyContext && !legacyOptions) {
        options = { ...legacyContext };
        logger = getLegacyLogger(options);
    }
    // map old event names to new event names
    // https://github.com/chimurai/http-proxy-middleware/pull/745/files#diff-c54113cf61ec99691748a3890bfbeb00e10efb3f0a76f03a0fd9ec49072e410aL48-L53
    Object.entries(proxyEventMap).forEach(([legacyEventName, proxyEventName]) => {
        if (options[legacyEventName]) {
            options.on = { ...options.on };
            options.on[proxyEventName] = options[legacyEventName];
            debug('map legacy event "%s" to "on.%s"', legacyEventName, proxyEventName);
            logger.warn(`[http-proxy-middleware] Legacy "${legacyEventName}" is deprecated. Migrate to "options.on.${proxyEventName}":

        const options = {
          on: {
            ${proxyEventName}: () => {},
          },
        }

        More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
        `);
        }
    });
    // map old logProvider to new logger
    // https://github.com/chimurai/http-proxy-middleware/pull/749
    const logProvider = options.logProvider && options.logProvider();
    const logLevel = options.logLevel;
    debug('legacy logLevel', logLevel);
    debug('legacy logProvider: %O', logProvider);
    if (typeof logLevel === 'string' && logLevel !== 'silent') {
        debug('map "logProvider" to "logger"');
        logger.warn(`[http-proxy-middleware] Legacy "logLevel" and "logProvider" are deprecated. Migrate to "options.logger":

      const options = {
        logger: console,
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
      `);
    }
    return options;
}
optionsAdapter.legacyOptionsAdapter = legacyOptionsAdapter;
function getLegacyLogger(options) {
    const legacyLogger = options.logProvider && options.logProvider();
    if (legacyLogger) {
        options.logger = legacyLogger;
    }
    return (0, logger_1.getLogger)(options);
}

var hasRequiredCreateProxyMiddleware;

function requireCreateProxyMiddleware () {
	if (hasRequiredCreateProxyMiddleware) return createProxyMiddleware;
	hasRequiredCreateProxyMiddleware = 1;
	Object.defineProperty(createProxyMiddleware, "__esModule", { value: true });
	createProxyMiddleware.legacyCreateProxyMiddleware = void 0;
	const __1 = requireDist();
	const debug_1 = debug$6;
	const options_adapter_1 = optionsAdapter;
	const debug = debug_1.Debug.extend('legacy-create-proxy-middleware');
	function legacyCreateProxyMiddleware(legacyContext, legacyOptions) {
	    debug('init');
	    const options = (0, options_adapter_1.legacyOptionsAdapter)(legacyContext, legacyOptions);
	    const proxyMiddleware = (0, __1.createProxyMiddleware)(options);
	    // https://github.com/chimurai/http-proxy-middleware/pull/731/files#diff-07e6ad10bda0df091b737caed42767657cd0bd74a01246a1a0b7ab59c0f6e977L118
	    debug('add marker for patching req.url (old behavior)');
	    proxyMiddleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__ = true;
	    return proxyMiddleware;
	}
	createProxyMiddleware.legacyCreateProxyMiddleware = legacyCreateProxyMiddleware;
	return createProxyMiddleware;
}

var hasRequired_public;

function require_public () {
	if (hasRequired_public) return _public;
	hasRequired_public = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.legacyCreateProxyMiddleware = void 0;
		var create_proxy_middleware_1 = requireCreateProxyMiddleware();
		Object.defineProperty(exports, "legacyCreateProxyMiddleware", { enumerable: true, get: function () { return create_proxy_middleware_1.legacyCreateProxyMiddleware; } });
} (_public));
	return _public;
}

var hasRequiredLegacy;

function requireLegacy () {
	if (hasRequiredLegacy) return legacy;
	hasRequiredLegacy = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(require_public(), exports);
} (legacy));
	return legacy;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createProxyMiddleware = void 0;
		const http_proxy_middleware_1 = httpProxyMiddleware;
		function createProxyMiddleware(options) {
		    const { middleware } = new http_proxy_middleware_1.HttpProxyMiddleware(options);
		    return middleware;
		}
		exports.createProxyMiddleware = createProxyMiddleware;
		__exportStar(handlers$1, exports);
		/**
		 * Default plugins
		 */
		__exportStar(_default, exports);
		/**
		 * Legacy exports
		 */
		__exportStar(requireLegacy(), exports);
} (dist));
	return dist;
}

var distExports = requireDist();

const _TSgtP5 = defineEventHandler(async (event) => {
  await new Promise((resolve, reject) => {
    distExports.createProxyMiddleware({
      target: process.env.SERVER_DOMAIN,
      pathFilter: "/api"
    })(event.node.req, event.node.res, (err) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
});

const _p3QpAm = defineEventHandler(() => useRuntimeConfig().public.pwaManifest);

const _lazy_d3UAPS = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _TSgtP5, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_d3UAPS, lazy: true, middleware: false, method: undefined },
  { route: '/manifest.json', handler: _p3QpAm, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_d3UAPS, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
