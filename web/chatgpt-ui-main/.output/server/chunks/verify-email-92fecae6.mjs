import { ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { _ as _export_sfc, u as useRoute, n as navigateTo } from './server.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
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

const _sfc_main = {
  __name: "verify-email",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const verifying = ref(false);
    const status = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_progress_linear = resolveComponent("v-progress-linear");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_component_v_container, mergeProps({ class: "h-100vh" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_row, {
              class: "fill-height",
              "align-content": "center",
              justify: "center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(verifying)) {
                    _push3(ssrRenderComponent(_component_v_col, {
                      class: "text-subtitle-1 text-center",
                      cols: "12"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Verifying your email `);
                        } else {
                          return [
                            createTextVNode(" Verifying your email ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(verifying)) {
                    _push3(ssrRenderComponent(_component_v_col, { cols: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_progress_linear, {
                            color: "deep-purple-accent-4",
                            indeterminate: "",
                            rounded: "",
                            height: "6"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_progress_linear, {
                              color: "deep-purple-accent-4",
                              indeterminate: "",
                              rounded: "",
                              height: "6"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(status) === "success") {
                    _push3(ssrRenderComponent(_component_v_col, {
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h2 class="text-h4" data-v-202cec39${_scopeId3}> Your email has been verified. </h2><p class="text-subtitle-1" data-v-202cec39${_scopeId3}> You can now sign in to your account. </p>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            color: "primary",
                            variant: "text",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/login")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Sign in `);
                              } else {
                                return [
                                  createTextVNode(" Sign in ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("h2", { class: "text-h4" }, " Your email has been verified. "),
                            createVNode("p", { class: "text-subtitle-1" }, " You can now sign in to your account. "),
                            createVNode(_component_v_btn, {
                              color: "primary",
                              variant: "text",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/login")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Sign in ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(status) === "error") {
                    _push3(ssrRenderComponent(_component_v_col, {
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h2 class="text-h4" data-v-202cec39${_scopeId3}> There was an error verifying your email. </h2>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            color: "primary",
                            variant: "text",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/onboarding?resend=1")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Resend email `);
                              } else {
                                return [
                                  createTextVNode(" Resend email ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("h2", { class: "text-h4" }, " There was an error verifying your email. "),
                            createVNode(_component_v_btn, {
                              color: "primary",
                              variant: "text",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/onboarding?resend=1")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Resend email ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(verifying) ? (openBlock(), createBlock(_component_v_col, {
                      key: 0,
                      class: "text-subtitle-1 text-center",
                      cols: "12"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Verifying your email ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(verifying) ? (openBlock(), createBlock(_component_v_col, {
                      key: 1,
                      cols: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_progress_linear, {
                          color: "deep-purple-accent-4",
                          indeterminate: "",
                          rounded: "",
                          height: "6"
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(status) === "success" ? (openBlock(), createBlock(_component_v_col, {
                      key: 2,
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-h4" }, " Your email has been verified. "),
                        createVNode("p", { class: "text-subtitle-1" }, " You can now sign in to your account. "),
                        createVNode(_component_v_btn, {
                          color: "primary",
                          variant: "text",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/login")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Sign in ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(status) === "error" ? (openBlock(), createBlock(_component_v_col, {
                      key: 3,
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-h4" }, " There was an error verifying your email. "),
                        createVNode(_component_v_btn, {
                          color: "primary",
                          variant: "text",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/onboarding?resend=1")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Resend email ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_row, {
                class: "fill-height",
                "align-content": "center",
                justify: "center"
              }, {
                default: withCtx(() => [
                  unref(verifying) ? (openBlock(), createBlock(_component_v_col, {
                    key: 0,
                    class: "text-subtitle-1 text-center",
                    cols: "12"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Verifying your email ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(verifying) ? (openBlock(), createBlock(_component_v_col, {
                    key: 1,
                    cols: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_progress_linear, {
                        color: "deep-purple-accent-4",
                        indeterminate: "",
                        rounded: "",
                        height: "6"
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(status) === "success" ? (openBlock(), createBlock(_component_v_col, {
                    key: 2,
                    cols: "12",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-h4" }, " Your email has been verified. "),
                      createVNode("p", { class: "text-subtitle-1" }, " You can now sign in to your account. "),
                      createVNode(_component_v_btn, {
                        color: "primary",
                        variant: "text",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/login")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Sign in ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(status) === "error" ? (openBlock(), createBlock(_component_v_col, {
                    key: 3,
                    cols: "12",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-h4" }, " There was an error verifying your email. "),
                      createVNode(_component_v_btn, {
                        color: "primary",
                        variant: "text",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/onboarding?resend=1")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Resend email ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const verifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-202cec39"]]);

export { verifyEmail as default };
//# sourceMappingURL=verify-email-92fecae6.mjs.map
