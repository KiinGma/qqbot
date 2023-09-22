import { executeAsync } from 'unctx';
import { q as defineNuxtRouteMiddleware, a as useUser, r as fetchUser, n as navigateTo, s as setUser } from './server.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import '@intlify/core-base';
import 'cookie-es';
import 'is-https';
import 'ohash';
import 'vue/server-renderer';
import 'defu';
import './node-server.mjs';
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

const auth = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const user = useUser();
  const signInPath = "/account/signin";
  if (!user.value && to.path !== signInPath) {
    const { error, data } = ([__temp, __restore] = executeAsync(() => fetchUser()), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      return navigateTo({
        path: signInPath,
        query: {
          callback: encodeURIComponent(to.fullPath)
        }
      });
    } else {
      setUser(data.value);
    }
  }
});

export { auth as default };
//# sourceMappingURL=auth-34ee0431.mjs.map
