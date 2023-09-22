import { _ as __nuxt_component_0 } from './nuxt-link-28d4e889.mjs';
import { ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { _ as _export_sfc, u as useRoute, a as useUser, b as useFetch } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
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
  __name: "onboarding",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const sending = ref(false);
    const resent = ref(false);
    const errorMsg = ref(null);
    const user = useUser();
    const resendEmail = async () => {
      errorMsg.value = null;
      sending.value = true;
      const { data, error } = await useFetch("/api/account/registration/resend-email/", {
        method: "POST"
      }, "$s9fCF8Cjo7");
      if (error.value) {
        errorMsg.value = "Something went wrong. Please try again later.";
      } else {
        resent.value = true;
      }
      sending.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_component_v_card, mergeProps({ class: "h-100vh" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_row, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_col, {
                          sm: "9",
                          "offset-sm": "1",
                          md: "8",
                          "offset-md": "2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                class: "mt-20vh",
                                elevation: "0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="text-center" data-v-43bea33f${_scopeId5}>`);
                                    if (unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none") {
                                      _push6(`<div data-v-43bea33f${_scopeId5}><h2 class="text-h4" data-v-43bea33f${_scopeId5}>${ssrInterpolate(_ctx.$t("Your registration is successful"))}</h2><p class="mt-5" data-v-43bea33f${_scopeId5}>${ssrInterpolate(_ctx.$t("You can now"))} `);
                                      _push6(ssrRenderComponent(_component_NuxtLink, { to: "/account/signin" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(_ctx.$t("signIn"))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(` ${ssrInterpolate(_ctx.$t("to your account."))}</p></div>`);
                                    } else {
                                      _push6(`<div data-v-43bea33f${_scopeId5}><h2 class="text-h4" data-v-43bea33f${_scopeId5}>Verify your email</h2><p class="mt-5" data-v-43bea33f${_scopeId5}> We&#39;ve sent a verification email to <strong data-v-43bea33f${_scopeId5}>${ssrInterpolate(unref(user).email)}</strong>. <br data-v-43bea33f${_scopeId5}> Please check your inbox and click the link to verify your email address. </p>`);
                                      if (unref(errorMsg)) {
                                        _push6(`<p class="text-red" data-v-43bea33f${_scopeId5}>${ssrInterpolate(unref(errorMsg))}</p>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        variant: "text",
                                        class: "mt-5",
                                        color: "primary",
                                        loading: unref(sending),
                                        onClick: resendEmail,
                                        disabled: unref(resent)
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(resent) ? "Resent" : "Resend email")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "text-center" }, [
                                        unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none" ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode("h2", { class: "text-h4" }, toDisplayString(_ctx.$t("Your registration is successful")), 1),
                                          createVNode("p", { class: "mt-5" }, [
                                            createTextVNode(toDisplayString(_ctx.$t("You can now")) + " ", 1),
                                            createVNode(_component_NuxtLink, { to: "/account/signin" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(_ctx.$t("to your account.")), 1)
                                          ])
                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                          createVNode("h2", { class: "text-h4" }, "Verify your email"),
                                          createVNode("p", { class: "mt-5" }, [
                                            createTextVNode(" We've sent a verification email to "),
                                            createVNode("strong", null, toDisplayString(unref(user).email), 1),
                                            createTextVNode(". "),
                                            createVNode("br"),
                                            createTextVNode(" Please check your inbox and click the link to verify your email address. ")
                                          ]),
                                          unref(errorMsg) ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "text-red"
                                          }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                          createVNode(_component_v_btn, {
                                            variant: "text",
                                            class: "mt-5",
                                            color: "primary",
                                            loading: unref(sending),
                                            onClick: resendEmail,
                                            disabled: unref(resent)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["loading", "disabled"])
                                        ]))
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  class: "mt-20vh",
                                  elevation: "0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center" }, [
                                      unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none" ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode("h2", { class: "text-h4" }, toDisplayString(_ctx.$t("Your registration is successful")), 1),
                                        createVNode("p", { class: "mt-5" }, [
                                          createTextVNode(toDisplayString(_ctx.$t("You can now")) + " ", 1),
                                          createVNode(_component_NuxtLink, { to: "/account/signin" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(_ctx.$t("to your account.")), 1)
                                        ])
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode("h2", { class: "text-h4" }, "Verify your email"),
                                        createVNode("p", { class: "mt-5" }, [
                                          createTextVNode(" We've sent a verification email to "),
                                          createVNode("strong", null, toDisplayString(unref(user).email), 1),
                                          createTextVNode(". "),
                                          createVNode("br"),
                                          createTextVNode(" Please check your inbox and click the link to verify your email address. ")
                                        ]),
                                        unref(errorMsg) ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-red"
                                        }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                        createVNode(_component_v_btn, {
                                          variant: "text",
                                          class: "mt-5",
                                          color: "primary",
                                          loading: unref(sending),
                                          onClick: resendEmail,
                                          disabled: unref(resent)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["loading", "disabled"])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_col, {
                            sm: "9",
                            "offset-sm": "1",
                            md: "8",
                            "offset-md": "2"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                class: "mt-20vh",
                                elevation: "0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none" ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode("h2", { class: "text-h4" }, toDisplayString(_ctx.$t("Your registration is successful")), 1),
                                      createVNode("p", { class: "mt-5" }, [
                                        createTextVNode(toDisplayString(_ctx.$t("You can now")) + " ", 1),
                                        createVNode(_component_NuxtLink, { to: "/account/signin" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("to your account.")), 1)
                                      ])
                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode("h2", { class: "text-h4" }, "Verify your email"),
                                      createVNode("p", { class: "mt-5" }, [
                                        createTextVNode(" We've sent a verification email to "),
                                        createVNode("strong", null, toDisplayString(unref(user).email), 1),
                                        createTextVNode(". "),
                                        createVNode("br"),
                                        createTextVNode(" Please check your inbox and click the link to verify your email address. ")
                                      ]),
                                      unref(errorMsg) ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-red"
                                      }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                      createVNode(_component_v_btn, {
                                        variant: "text",
                                        class: "mt-5",
                                        color: "primary",
                                        loading: unref(sending),
                                        onClick: resendEmail,
                                        disabled: unref(resent)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "disabled"])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_row, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, {
                          sm: "9",
                          "offset-sm": "1",
                          md: "8",
                          "offset-md": "2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "mt-20vh",
                              elevation: "0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none" ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("h2", { class: "text-h4" }, toDisplayString(_ctx.$t("Your registration is successful")), 1),
                                    createVNode("p", { class: "mt-5" }, [
                                      createTextVNode(toDisplayString(_ctx.$t("You can now")) + " ", 1),
                                      createVNode(_component_NuxtLink, { to: "/account/signin" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("to your account.")), 1)
                                    ])
                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("h2", { class: "text-h4" }, "Verify your email"),
                                    createVNode("p", { class: "mt-5" }, [
                                      createTextVNode(" We've sent a verification email to "),
                                      createVNode("strong", null, toDisplayString(unref(user).email), 1),
                                      createTextVNode(". "),
                                      createVNode("br"),
                                      createTextVNode(" Please check your inbox and click the link to verify your email address. ")
                                    ]),
                                    unref(errorMsg) ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-red"
                                    }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                    createVNode(_component_v_btn, {
                                      variant: "text",
                                      class: "mt-5",
                                      color: "primary",
                                      loading: unref(sending),
                                      onClick: resendEmail,
                                      disabled: unref(resent)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled"])
                                  ]))
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_container, null, {
                default: withCtx(() => [
                  createVNode(_component_v_row, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_col, {
                        sm: "9",
                        "offset-sm": "1",
                        md: "8",
                        "offset-md": "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            class: "mt-20vh",
                            elevation: "0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                unref(route).query.email_verification_required && unref(route).query.email_verification_required === "none" ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("h2", { class: "text-h4" }, toDisplayString(_ctx.$t("Your registration is successful")), 1),
                                  createVNode("p", { class: "mt-5" }, [
                                    createTextVNode(toDisplayString(_ctx.$t("You can now")) + " ", 1),
                                    createVNode(_component_NuxtLink, { to: "/account/signin" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("to your account.")), 1)
                                  ])
                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("h2", { class: "text-h4" }, "Verify your email"),
                                  createVNode("p", { class: "mt-5" }, [
                                    createTextVNode(" We've sent a verification email to "),
                                    createVNode("strong", null, toDisplayString(unref(user).email), 1),
                                    createTextVNode(". "),
                                    createVNode("br"),
                                    createTextVNode(" Please check your inbox and click the link to verify your email address. ")
                                  ]),
                                  unref(errorMsg) ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-red"
                                  }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                  createVNode(_component_v_btn, {
                                    variant: "text",
                                    class: "mt-5",
                                    color: "primary",
                                    loading: unref(sending),
                                    onClick: resendEmail,
                                    disabled: unref(resent)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(resent) ? "Resent" : "Resend email"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "disabled"])
                                ]))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/onboarding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onboarding = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43bea33f"]]);

export { onboarding as default };
//# sourceMappingURL=onboarding-3a88469e.mjs.map
