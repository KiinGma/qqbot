import { ref, computed, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, Fragment, renderList, isRef, mergeProps, withDirectives, vShow, watchEffect, nextTick, toRefs } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';
import { e as useNuxtApp, o as useDrawer, u as useRoute, p as getDefaultConversationData, g as useRuntimeConfig, n as navigateTo, i as useCurrentModel, j as useApiKey, _ as _export_sfc, k as addConversation, m as genTitle, h as useAuthFetch } from './server.mjs';
import copy from 'copy-to-clipboard';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import mathjax3 from 'markdown-it-mathjax3';
import { isMobile } from 'is-mobile';
import { fetchEventSource, EventStreamContentType } from '@microsoft/fetch-event-source';
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

const _sfc_main$8 = {
  __name: "WelcomeCard",
  __ssrInlineRender: true,
  props: ["content"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_hover = resolveComponent("v-hover");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_text = resolveComponent("v-card-text");
      _push(ssrRenderComponent(_component_v_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_col, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_hover, { "open-delay": "100" }, {
                    default: withCtx(({ isHovering, props }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card, mergeProps({
                          elevation: isHovering ? 3 : 0
                        }, props, { variant: "tonal" }), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card_text, { class: "text-center" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.content)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.content), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card_text, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.content), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card, mergeProps({
                            elevation: isHovering ? 3 : 0
                          }, props, { variant: "tonal" }), {
                            default: withCtx(() => [
                              createVNode(_component_v_card_text, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.content), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1040, ["elevation"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_hover, { "open-delay": "100" }, {
                      default: withCtx(({ isHovering, props }) => [
                        createVNode(_component_v_card, mergeProps({
                          elevation: isHovering ? 3 : 0
                        }, props, { variant: "tonal" }), {
                          default: withCtx(() => [
                            createVNode(_component_v_card_text, { class: "text-center" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.content), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1040, ["elevation"])
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
              createVNode(_component_v_col, null, {
                default: withCtx(() => [
                  createVNode(_component_v_hover, { "open-delay": "100" }, {
                    default: withCtx(({ isHovering, props }) => [
                      createVNode(_component_v_card, mergeProps({
                        elevation: isHovering ? 3 : 0
                      }, props, { variant: "tonal" }), {
                        default: withCtx(() => [
                          createVNode(_component_v_card_text, { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.content), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1040, ["elevation"])
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WelcomeCard.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$3 = _sfc_main$8;
const _sfc_main$7 = {
  __name: "Welcome",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
    const { $i18n } = useNuxtApp();
    const examples = ref([
      $i18n.t("welcomeScreen.examples.item1"),
      $i18n.t("welcomeScreen.examples.item2"),
      $i18n.t("welcomeScreen.examples.item3")
    ]);
    const capabilities = ref([
      $i18n.t("welcomeScreen.capabilities.item1"),
      $i18n.t("welcomeScreen.capabilities.item2"),
      $i18n.t("welcomeScreen.capabilities.item3")
    ]);
    const limitations = ref([
      $i18n.t("welcomeScreen.limitations.item1"),
      $i18n.t("welcomeScreen.limitations.item2"),
      $i18n.t("welcomeScreen.limitations.item3")
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_WelcomeCard = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_v_container, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_row, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-center"${_scopeId3}><h2 class="text-h2"${_scopeId3}>${ssrInterpolate(_ctx.$t("welcomeTo"))} <span class="text-primary"${_scopeId3}>${ssrInterpolate(unref(runtimeConfig).public.appName)}</span></h2><p class="text-caption my-5"${_scopeId3}>${ssrInterpolate(unref(runtimeConfig).public.appName)} ${ssrInterpolate(_ctx.$t("welcomeScreen.introduction1"))} <br${_scopeId3}></p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("h2", { class: "text-h2" }, [
                              createTextVNode(toDisplayString(_ctx.$t("welcomeTo")) + " ", 1),
                              createVNode("span", { class: "text-primary" }, toDisplayString(unref(runtimeConfig).public.appName), 1)
                            ]),
                            createVNode("p", { class: "text-caption my-5" }, [
                              createTextVNode(toDisplayString(unref(runtimeConfig).public.appName) + " " + toDisplayString(_ctx.$t("welcomeScreen.introduction1")) + " ", 1),
                              createVNode("br")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_col, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h2", { class: "text-h2" }, [
                            createTextVNode(toDisplayString(_ctx.$t("welcomeTo")) + " ", 1),
                            createVNode("span", { class: "text-primary" }, toDisplayString(unref(runtimeConfig).public.appName), 1)
                          ]),
                          createVNode("p", { class: "text-caption my-5" }, [
                            createTextVNode(toDisplayString(unref(runtimeConfig).public.appName) + " " + toDisplayString(_ctx.$t("welcomeScreen.introduction1")) + " ", 1),
                            createVNode("br")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_row, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_col, {
                    cols: "12",
                    md: "10",
                    "offset-md": "1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_row, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_row, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_col, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex flex-column align-center"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_component_v_icon, { icon: "sunny" }, null, _parent8, _scopeId7));
                                                _push8(`<h3 class="text-h6"${_scopeId7}>${ssrInterpolate(_ctx.$t("welcomeScreen.examples.title"))}</h3></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                    createVNode(_component_v_icon, { icon: "sunny" }),
                                                    createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_col, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                  createVNode(_component_v_icon, { icon: "sunny" }),
                                                  createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(examples), (example) => {
                                      _push6(ssrRenderComponent(_component_WelcomeCard, { content: example }, null, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(_component_v_row, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_col, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                createVNode(_component_v_icon, { icon: "sunny" }),
                                                createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(examples), (example) => {
                                        return openBlock(), createBlock(_component_WelcomeCard, { content: example }, null, 8, ["content"]);
                                      }), 256))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_row, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_col, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex flex-column align-center"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_component_v_icon, { icon: "bolt" }, null, _parent8, _scopeId7));
                                                _push8(`<h3 class="text-h6"${_scopeId7}>${ssrInterpolate(_ctx.$t("welcomeScreen.capabilities.title"))}</h3></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                    createVNode(_component_v_icon, { icon: "bolt" }),
                                                    createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_col, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                  createVNode(_component_v_icon, { icon: "bolt" }),
                                                  createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(capabilities), (capabilitie) => {
                                      _push6(ssrRenderComponent(_component_WelcomeCard, { content: capabilitie }, null, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(_component_v_row, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_col, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                createVNode(_component_v_icon, { icon: "bolt" }),
                                                createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(capabilities), (capabilitie) => {
                                        return openBlock(), createBlock(_component_WelcomeCard, { content: capabilitie }, null, 8, ["content"]);
                                      }), 256))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_row, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_col, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex flex-column align-center"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_component_v_icon, { icon: "warning_amber" }, null, _parent8, _scopeId7));
                                                _push8(`<h3 class="text-h6"${_scopeId7}>${ssrInterpolate(_ctx.$t("welcomeScreen.limitations.title"))}</h3></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                    createVNode(_component_v_icon, { icon: "warning_amber" }),
                                                    createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_col, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                  createVNode(_component_v_icon, { icon: "warning_amber" }),
                                                  createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(limitations), (limitation) => {
                                      _push6(ssrRenderComponent(_component_WelcomeCard, { content: limitation }, null, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(_component_v_row, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_col, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex flex-column align-center" }, [
                                                createVNode(_component_v_icon, { icon: "warning_amber" }),
                                                createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(limitations), (limitation) => {
                                        return openBlock(), createBlock(_component_WelcomeCard, { content: limitation }, null, 8, ["content"]);
                                      }), 256))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_col, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_row, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_col, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex flex-column align-center" }, [
                                              createVNode(_component_v_icon, { icon: "sunny" }),
                                              createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(examples), (example) => {
                                      return openBlock(), createBlock(_component_WelcomeCard, { content: example }, null, 8, ["content"]);
                                    }), 256))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_col, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_row, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_col, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex flex-column align-center" }, [
                                              createVNode(_component_v_icon, { icon: "bolt" }),
                                              createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(capabilities), (capabilitie) => {
                                      return openBlock(), createBlock(_component_WelcomeCard, { content: capabilitie }, null, 8, ["content"]);
                                    }), 256))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_col, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_row, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_col, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex flex-column align-center" }, [
                                              createVNode(_component_v_icon, { icon: "warning_amber" }),
                                              createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(limitations), (limitation) => {
                                      return openBlock(), createBlock(_component_WelcomeCard, { content: limitation }, null, 8, ["content"]);
                                    }), 256))
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
                          createVNode(_component_v_row, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_row, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_col, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex flex-column align-center" }, [
                                            createVNode(_component_v_icon, { icon: "sunny" }),
                                            createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(examples), (example) => {
                                    return openBlock(), createBlock(_component_WelcomeCard, { content: example }, null, 8, ["content"]);
                                  }), 256))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_row, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_col, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex flex-column align-center" }, [
                                            createVNode(_component_v_icon, { icon: "bolt" }),
                                            createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(capabilities), (capabilitie) => {
                                    return openBlock(), createBlock(_component_WelcomeCard, { content: capabilitie }, null, 8, ["content"]);
                                  }), 256))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_col, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_row, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_col, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex flex-column align-center" }, [
                                            createVNode(_component_v_icon, { icon: "warning_amber" }),
                                            createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(limitations), (limitation) => {
                                    return openBlock(), createBlock(_component_WelcomeCard, { content: limitation }, null, 8, ["content"]);
                                  }), 256))
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
                    createVNode(_component_v_col, {
                      cols: "12",
                      md: "10",
                      "offset-md": "1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_row, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              md: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_row, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column align-center" }, [
                                          createVNode(_component_v_icon, { icon: "sunny" }),
                                          createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(examples), (example) => {
                                  return openBlock(), createBlock(_component_WelcomeCard, { content: example }, null, 8, ["content"]);
                                }), 256))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_col, {
                              cols: "12",
                              md: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_row, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column align-center" }, [
                                          createVNode(_component_v_icon, { icon: "bolt" }),
                                          createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(capabilities), (capabilitie) => {
                                  return openBlock(), createBlock(_component_WelcomeCard, { content: capabilitie }, null, 8, ["content"]);
                                }), 256))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_col, {
                              cols: "12",
                              md: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_row, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column align-center" }, [
                                          createVNode(_component_v_icon, { icon: "warning_amber" }),
                                          createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(limitations), (limitation) => {
                                  return openBlock(), createBlock(_component_WelcomeCard, { content: limitation }, null, 8, ["content"]);
                                }), 256))
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
              createVNode(_component_v_row, null, {
                default: withCtx(() => [
                  createVNode(_component_v_col, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h2", { class: "text-h2" }, [
                          createTextVNode(toDisplayString(_ctx.$t("welcomeTo")) + " ", 1),
                          createVNode("span", { class: "text-primary" }, toDisplayString(unref(runtimeConfig).public.appName), 1)
                        ]),
                        createVNode("p", { class: "text-caption my-5" }, [
                          createTextVNode(toDisplayString(unref(runtimeConfig).public.appName) + " " + toDisplayString(_ctx.$t("welcomeScreen.introduction1")) + " ", 1),
                          createVNode("br")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_row, null, {
                default: withCtx(() => [
                  createVNode(_component_v_col, {
                    cols: "12",
                    md: "10",
                    "offset-md": "1"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_row, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_col, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_row, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_col, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column align-center" }, [
                                        createVNode(_component_v_icon, { icon: "sunny" }),
                                        createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.examples.title")), 1)
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(examples), (example) => {
                                return openBlock(), createBlock(_component_WelcomeCard, { content: example }, null, 8, ["content"]);
                              }), 256))
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_col, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_row, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_col, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column align-center" }, [
                                        createVNode(_component_v_icon, { icon: "bolt" }),
                                        createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.capabilities.title")), 1)
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(capabilities), (capabilitie) => {
                                return openBlock(), createBlock(_component_WelcomeCard, { content: capabilitie }, null, 8, ["content"]);
                              }), 256))
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_col, {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_row, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_col, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column align-center" }, [
                                        createVNode(_component_v_icon, { icon: "warning_amber" }),
                                        createVNode("h3", { class: "text-h6" }, toDisplayString(_ctx.$t("welcomeScreen.limitations.title")), 1)
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(limitations), (limitation) => {
                                return openBlock(), createBlock(_component_WelcomeCard, { content: limitation }, null, 8, ["content"]);
                              }), 256))
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Welcome.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$2 = _sfc_main$7;
const _sfc_main$6 = {
  __name: "MessageActions",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      required: true
    },
    messageIndex: {
      type: Number,
      required: true
    },
    usePrompt: {
      type: Function,
      required: true
    },
    deleteMessage: {
      type: Function,
      required: true
    },
    toggleMessage: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const snackbar = ref(false);
    const snackbarText = ref("");
    const showSnackbar = (text) => {
      snackbarText.value = text;
      snackbar.value = true;
    };
    const copyMessage = () => {
      copy(props.message.message);
      showSnackbar("Copied!");
    };
    const editMessage = () => {
      props.usePrompt(props.message.message);
    };
    const deleteMessage = async () => {
      const { data, error } = await useAuthFetch(`/api/chat/messages/${props.message.id}/`, {
        method: "DELETE"
      });
      if (!error.value) {
        props.deleteMessage(props.messageIndex);
        showSnackbar("Deleted!");
      }
      showSnackbar("Delete failed");
    };
    const toggle_message = async () => {
      const msg = Object.assign({}, props.message);
      msg.is_disabled = !msg.is_disabled;
      const { data, error } = await useAuthFetch(`/api/chat/messages/${props.message.id}/`, {
        method: "PUT",
        body: JSON.stringify(msg)
      });
      if (!error.value) {
        props.toggleMessage(props.messageIndex);
      }
    };
    function selectMessageIcon(message) {
      if (message.is_bot)
        return "";
      if (message.message_type == 100) {
        return "travel_explore";
      } else if (message.message_type == 110) {
        return "local_library";
      } else if (message.message_type == 120) {
        return "article";
      }
      return "";
    }
    const message_icon = selectMessageIcon(props.message);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_snackbar = resolveComponent("v-snackbar");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_v_menu, null, {
        activator: withCtx(({ props: props2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(message_icon)) {
              _push2(ssrRenderComponent(_component_v_btn, mergeProps(props2, {
                variant: "text",
                class: "ma-2"
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_icon, { icon: unref(message_icon) }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_icon, { icon: unref(message_icon) }, null, 8, ["icon"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(message_icon) ? (openBlock(), createBlock(_component_v_btn, mergeProps({ key: 0 }, props2, {
                variant: "text",
                class: "ma-2"
              }), {
                default: withCtx(() => [
                  createVNode(_component_v_icon, { icon: unref(message_icon) }, null, 8, ["icon"])
                ]),
                _: 2
              }, 1040)) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_list, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    onClick: ($event) => toggle_message(),
                    title: "toggle",
                    "prepend-icon": __props.message.is_disabled ? "toggle_off" : "toggle_on"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_list_item, {
                      onClick: ($event) => toggle_message(),
                      title: "toggle",
                      "prepend-icon": __props.message.is_disabled ? "toggle_off" : "toggle_on"
                    }, null, 8, ["onClick", "prepend-icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_list, null, {
                default: withCtx(() => [
                  createVNode(_component_v_list_item, {
                    onClick: ($event) => toggle_message(),
                    title: "toggle",
                    "prepend-icon": __props.message.is_disabled ? "toggle_off" : "toggle_on"
                  }, null, 8, ["onClick", "prepend-icon"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_menu, null, {
        activator: withCtx(({ props: props2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_btn, mergeProps(props2, {
              icon: "",
              variant: "text",
              class: "mx-1 ma-2"
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_icon, { icon: "more_horiz" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_icon, { icon: "more_horiz" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_btn, mergeProps(props2, {
                icon: "",
                variant: "text",
                class: "mx-1 ma-2"
              }), {
                default: withCtx(() => [
                  createVNode(_component_v_icon, { icon: "more_horiz" })
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_list, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    onClick: ($event) => copyMessage(),
                    title: _ctx.$t("copy"),
                    "prepend-icon": "content_copy"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    onClick: ($event) => editMessage(),
                    title: _ctx.$t("edit"),
                    "prepend-icon": "edit"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    onClick: ($event) => deleteMessage(),
                    title: _ctx.$t("delete"),
                    "prepend-icon": "delete"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_list_item, {
                      onClick: ($event) => copyMessage(),
                      title: _ctx.$t("copy"),
                      "prepend-icon": "content_copy"
                    }, null, 8, ["onClick", "title"]),
                    createVNode(_component_v_list_item, {
                      onClick: ($event) => editMessage(),
                      title: _ctx.$t("edit"),
                      "prepend-icon": "edit"
                    }, null, 8, ["onClick", "title"]),
                    createVNode(_component_v_list_item, {
                      onClick: ($event) => deleteMessage(),
                      title: _ctx.$t("delete"),
                      "prepend-icon": "delete"
                    }, null, 8, ["onClick", "title"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_list, null, {
                default: withCtx(() => [
                  createVNode(_component_v_list_item, {
                    onClick: ($event) => copyMessage(),
                    title: _ctx.$t("copy"),
                    "prepend-icon": "content_copy"
                  }, null, 8, ["onClick", "title"]),
                  createVNode(_component_v_list_item, {
                    onClick: ($event) => editMessage(),
                    title: _ctx.$t("edit"),
                    "prepend-icon": "edit"
                  }, null, 8, ["onClick", "title"]),
                  createVNode(_component_v_list_item, {
                    onClick: ($event) => deleteMessage(),
                    title: _ctx.$t("delete"),
                    "prepend-icon": "delete"
                  }, null, 8, ["onClick", "title"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_snackbar, {
        modelValue: unref(snackbar),
        "onUpdate:modelValue": ($event) => isRef(snackbar) ? snackbar.value = $event : null,
        location: "top",
        timeout: "2000"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(snackbarText))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(snackbarText)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MessageActions.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$6;
const _sfc_main$5 = {
  __name: "MsgContent",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    usePrompt: {
      type: Function,
      required: true
    },
    deleteMessage: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const md = new MarkdownIt({
      linkify: true,
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return `<pre class="hljs-code-container my-3"><div class="hljs-code-header d-flex align-center justify-space-between bg-grey-darken-3 pa-1"><span class="pl-2 text-caption">${language}</span><button class="hljs-copy-button" data-copied="false">Copy</button></div><code class="hljs language-${language}">${hljs.highlight(code, { language, ignoreIllegals: true }).value}</code></pre>`;
      }
    });
    md.use(mathjax3);
    const contentHtml = ref("");
    const contentElm = ref(null);
    watchEffect(async () => {
      contentHtml.value = props.message.message ? md.render(props.message.message) : "";
      await nextTick();
      bindCopyCodeToButtons();
    });
    const bindCopyCodeToButtons = () => {
      if (!contentElm.value) {
        return;
      }
      contentElm.value.querySelectorAll(".hljs-code-container").forEach((codeContainer) => {
        const copyButton = codeContainer.querySelector(".hljs-copy-button");
        const codeBody = codeContainer.querySelector("code");
        copyButton.onclick = function() {
          var _a;
          copy((_a = codeBody.textContent) != null ? _a : "");
          copyButton.innerHTML = "Copied!";
          copyButton.dataset.copied = "true";
          setTimeout(() => {
            copyButton.innerHTML = "Copy";
            copyButton.dataset.copied = "false";
          }, 2e3);
        };
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_divider = resolveComponent("v-divider");
      _push(ssrRenderComponent(_component_v_card, mergeProps({
        color: __props.message.is_bot ? "" : "primary",
        rounded: "lg",
        elevation: "2",
        class: { card_disabled: __props.message.is_disabled }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="chat-msg-content pa-3"${_scopeId}>${unref(contentHtml)}</div>`);
            _push2(ssrRenderComponent(_component_v_divider, {
              color: __props.message.is_bot ? "rgb(var(--v-theme-on-background))" : "rgb(var(--v-theme-on-primary))"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", {
                ref_key: "contentElm",
                ref: contentElm,
                innerHTML: unref(contentHtml),
                class: "chat-msg-content pa-3"
              }, null, 8, ["innerHTML"]),
              createVNode(_component_v_divider, {
                color: __props.message.is_bot ? "rgb(var(--v-theme-on-background))" : "rgb(var(--v-theme-on-primary))"
              }, null, 8, ["color"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MsgContent.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1$1 = _sfc_main$5;
const _sfc_main$4 = {
  __name: "DocumentsManage",
  __ssrInlineRender: true,
  props: {
    sendMessage: {
      type: Function,
      required: false
    },
    control: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    useNuxtApp();
    const ps = toRefs(props);
    const loadingDoc = ref(false);
    const deletingDocIndex = ref(null);
    const embeddingDocs = ref([]);
    const selectedEmbeddingDocs = ref([]);
    const fileInputMessage = ref("");
    const uploadDocObject = ref({
      title: "",
      file: null
    });
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    const snackbar = ref(false);
    const snackbarText = ref("");
    const showSnackbar = (text) => {
      snackbarText.value = text;
      snackbar.value = true;
    };
    function fileUploadRules(value) {
      let fileSizeLimit = 8;
      return !value || !value.length || value[0].size < fileSizeLimit * 1024 * 1024 || `size no more than ${fileSizeLimit} MB`;
    }
    function onFileChange() {
      let newfile = document.getElementById("file_upload_input").files[0];
      if (fileUploadRules([newfile])) {
        uploadDocObject.value.file = newfile;
      }
    }
    async function uploadFile() {
      const file = uploadDocObject.value.file;
      if (!file)
        return;
      loadingDoc.value = true;
      const base64Data = await fileToBase64(file);
      try {
        const { data, error } = await useAuthFetch("/api/chat/embedding_document/", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: file.name,
            file: base64Data
          })
        });
        if (!error.value) {
          embeddingDocs.value.splice(0, 0, data.value);
        } else {
          console.log(error.value);
          showSnackbar(error.value);
        }
      } catch (err) {
        console.log(err);
        showSnackbar(err.message);
      }
      uploadDocObject.value.file = null;
      loadingDoc.value = false;
    }
    async function loadDocs() {
      loadingDoc.value = true;
      const { data, error } = await useAuthFetch("/api/chat/embedding_document/");
      if (!error.value) {
        embeddingDocs.value = data.value;
      }
      loadingDoc.value = false;
    }
    async function deleteDocs(index_list) {
      let survival = [];
      for (let i = 0; i < index_list.length; i++) {
        let index = index_list[i];
        deletingDocIndex.value = index;
        const { data, error } = await useAuthFetch(`/api/chat/embedding_document/${embeddingDocs.value[index].id}/`, {
          method: "DELETE"
        });
        deletingDocIndex.value = null;
        if (!error.value) {
          embeddingDocs.value[index] = 0;
        } else {
          console.log(`${index}: ${error.value}`);
        }
      }
      let l = embeddingDocs.value.length;
      for (let i = 0; i < l; i++) {
        if (embeddingDocs.value[i] != 0) {
          survival.push(embeddingDocs.value[i]);
        }
      }
      embeddingDocs.value.splice(0, l);
      embeddingDocs.value.push(...survival);
    }
    async function insertSelectedDocs() {
      ps.control.value.dialog = false;
      let messages = selectedEmbeddingDocs.value.map((i) => {
        let doc = embeddingDocs.value[i];
        return {
          content: `${doc.title}
${doc.created_at}`,
          message_type: 120,
          embedding_message_doc: doc.id
        };
      });
      props.sendMessage(messages);
      let l = selectedEmbeddingDocs.value.length;
      selectedEmbeddingDocs.value.splice(0, l);
    }
    async function deleteSelectedDocs() {
      await deleteDocs(selectedEmbeddingDocs.value);
      let l = selectedEmbeddingDocs.value.length;
      selectedEmbeddingDocs.value.splice(0, l);
    }
    expose({
      loadDocs
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_file_input = resolveComponent("v-file-input");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_item_group = resolveComponent("v-item-group");
      const _component_v_item = resolveComponent("v-item");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_list_item_subtitle = resolveComponent("v-list-item-subtitle");
      const _component_v_card_actions = resolveComponent("v-card-actions");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_snackbar = resolveComponent("v-snackbar");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_v_dialog, {
        modelValue: __props.control.dialog,
        "onUpdate:modelValue": ($event) => __props.control.dialog = $event,
        scrollable: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, { class: "pa-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Add Documents `);
                      } else {
                        return [
                          createTextVNode(" Add Documents ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_row, {
                    align: "center",
                    justify: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_col, { cols: "10" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_file_input, {
                                id: "file_upload_input",
                                label: "New Documents",
                                disabled: unref(loadingDoc),
                                loading: unref(loadingDoc),
                                messages: unref(fileInputMessage),
                                density: "compact",
                                variant: "solo",
                                "show-size": "",
                                rules: [fileUploadRules],
                                accept: "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                class: "ma-2 pa-2",
                                onChange: ($event) => onFileChange(),
                                "append-icon": "upload",
                                "onClick:append": ($event) => uploadFile()
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_file_input, {
                                  id: "file_upload_input",
                                  label: "New Documents",
                                  disabled: unref(loadingDoc),
                                  loading: unref(loadingDoc),
                                  messages: unref(fileInputMessage),
                                  density: "compact",
                                  variant: "solo",
                                  "show-size": "",
                                  rules: [fileUploadRules],
                                  accept: "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                  class: "ma-2 pa-2",
                                  onChange: ($event) => onFileChange(),
                                  "append-icon": "upload",
                                  "onClick:append": ($event) => uploadFile()
                                }, null, 8, ["disabled", "loading", "messages", "rules", "onChange", "onClick:append"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_col, { cols: "10" }, {
                            default: withCtx(() => [
                              createVNode(_component_v_file_input, {
                                id: "file_upload_input",
                                label: "New Documents",
                                disabled: unref(loadingDoc),
                                loading: unref(loadingDoc),
                                messages: unref(fileInputMessage),
                                density: "compact",
                                variant: "solo",
                                "show-size": "",
                                rules: [fileUploadRules],
                                accept: "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                class: "ma-2 pa-2",
                                onChange: ($event) => onFileChange(),
                                "append-icon": "upload",
                                "onClick:append": ($event) => uploadFile()
                              }, null, 8, ["disabled", "loading", "messages", "rules", "onChange", "onClick:append"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_card_text, { style: { "height": "480px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_item_group, {
                          modelValue: unref(selectedEmbeddingDocs),
                          "onUpdate:modelValue": ($event) => isRef(selectedEmbeddingDocs) ? selectedEmbeddingDocs.value = $event : null,
                          multiple: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(embeddingDocs), (item, i) => {
                                _push5(ssrRenderComponent(_component_v_row, {
                                  key: i,
                                  justify: "center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_v_col, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_v_item, null, {
                                              default: withCtx(({ isSelected, toggle }, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_v_list_item, {
                                                    onClick: toggle,
                                                    "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                                  }, {
                                                    default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_v_list_item_title, null, {
                                                          default: withCtx((_8, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`${ssrInterpolate(item.title)}`);
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(item.title), 1)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_v_list_item_subtitle, null, {
                                                          default: withCtx((_8, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`${ssrInterpolate(item.created_at)}`);
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(item.created_at), 1)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_v_list_item_title, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode(_component_v_list_item_subtitle, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.created_at), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_v_list_item, {
                                                      onClick: toggle,
                                                      "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_list_item_title, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(_component_v_list_item_subtitle, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.created_at), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick", "prepend-icon"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_v_item, null, {
                                                default: withCtx(({ isSelected, toggle }) => [
                                                  createVNode(_component_v_list_item, {
                                                    onClick: toggle,
                                                    "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_list_item_title, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_v_list_item_subtitle, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.created_at), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick", "prepend-icon"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_v_col, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_item, null, {
                                              default: withCtx(({ isSelected, toggle }) => [
                                                createVNode(_component_v_list_item, {
                                                  onClick: toggle,
                                                  "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_list_item_title, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_v_list_item_subtitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.created_at), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick", "prepend-icon"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(embeddingDocs), (item, i) => {
                                  return openBlock(), createBlock(_component_v_row, {
                                    key: i,
                                    justify: "center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_col, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_item, null, {
                                            default: withCtx(({ isSelected, toggle }) => [
                                              createVNode(_component_v_list_item, {
                                                onClick: toggle,
                                                "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_v_list_item_title, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_v_list_item_subtitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.created_at), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick", "prepend-icon"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_item_group, {
                            modelValue: unref(selectedEmbeddingDocs),
                            "onUpdate:modelValue": ($event) => isRef(selectedEmbeddingDocs) ? selectedEmbeddingDocs.value = $event : null,
                            multiple: ""
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(embeddingDocs), (item, i) => {
                                return openBlock(), createBlock(_component_v_row, {
                                  key: i,
                                  justify: "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_item, null, {
                                          default: withCtx(({ isSelected, toggle }) => [
                                            createVNode(_component_v_list_item, {
                                              onClick: toggle,
                                              "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_list_item_title, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_v_list_item_subtitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.created_at), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "prepend-icon"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_row, {
                    justify: "center",
                    class: "pa-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card_actions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => insertSelectedDocs()
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Insert`);
                                  } else {
                                    return [
                                      createTextVNode("Insert")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => deleteSelectedDocs()
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Delete`);
                                  } else {
                                    return [
                                      createTextVNode("Delete")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => __props.control.dialog = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Close`);
                                  } else {
                                    return [
                                      createTextVNode("Close")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_btn, {
                                  elevation: "2",
                                  class: "ma-2",
                                  onClick: ($event) => insertSelectedDocs()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Insert")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_v_btn, {
                                  elevation: "2",
                                  class: "ma-2",
                                  onClick: ($event) => deleteSelectedDocs()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Delete")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_v_btn, {
                                  elevation: "2",
                                  class: "ma-2",
                                  onClick: ($event) => __props.control.dialog = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Close")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card_actions, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => insertSelectedDocs()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Insert")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => deleteSelectedDocs()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Delete")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_v_btn, {
                                elevation: "2",
                                class: "ma-2",
                                onClick: ($event) => __props.control.dialog = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Close")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
                    createVNode(_component_v_card_title, null, {
                      default: withCtx(() => [
                        createTextVNode(" Add Documents ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_row, {
                      align: "center",
                      justify: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, { cols: "10" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_file_input, {
                              id: "file_upload_input",
                              label: "New Documents",
                              disabled: unref(loadingDoc),
                              loading: unref(loadingDoc),
                              messages: unref(fileInputMessage),
                              density: "compact",
                              variant: "solo",
                              "show-size": "",
                              rules: [fileUploadRules],
                              accept: "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                              class: "ma-2 pa-2",
                              onChange: ($event) => onFileChange(),
                              "append-icon": "upload",
                              "onClick:append": ($event) => uploadFile()
                            }, null, 8, ["disabled", "loading", "messages", "rules", "onChange", "onClick:append"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_divider),
                    createVNode(_component_v_card_text, { style: { "height": "480px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_v_item_group, {
                          modelValue: unref(selectedEmbeddingDocs),
                          "onUpdate:modelValue": ($event) => isRef(selectedEmbeddingDocs) ? selectedEmbeddingDocs.value = $event : null,
                          multiple: ""
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(embeddingDocs), (item, i) => {
                              return openBlock(), createBlock(_component_v_row, {
                                key: i,
                                justify: "center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_col, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_item, null, {
                                        default: withCtx(({ isSelected, toggle }) => [
                                          createVNode(_component_v_list_item, {
                                            onClick: toggle,
                                            "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_list_item_title, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_v_list_item_subtitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.created_at), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "prepend-icon"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_divider),
                    createVNode(_component_v_row, {
                      justify: "center",
                      class: "pa-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_actions, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_btn, {
                              elevation: "2",
                              class: "ma-2",
                              onClick: ($event) => insertSelectedDocs()
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Insert")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_v_btn, {
                              elevation: "2",
                              class: "ma-2",
                              onClick: ($event) => deleteSelectedDocs()
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Delete")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_v_btn, {
                              elevation: "2",
                              class: "ma-2",
                              onClick: ($event) => __props.control.dialog = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Close")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
              createVNode(_component_v_card, { class: "pa-3" }, {
                default: withCtx(() => [
                  createVNode(_component_v_card_title, null, {
                    default: withCtx(() => [
                      createTextVNode(" Add Documents ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_row, {
                    align: "center",
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_col, { cols: "10" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_file_input, {
                            id: "file_upload_input",
                            label: "New Documents",
                            disabled: unref(loadingDoc),
                            loading: unref(loadingDoc),
                            messages: unref(fileInputMessage),
                            density: "compact",
                            variant: "solo",
                            "show-size": "",
                            rules: [fileUploadRules],
                            accept: "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            class: "ma-2 pa-2",
                            onChange: ($event) => onFileChange(),
                            "append-icon": "upload",
                            "onClick:append": ($event) => uploadFile()
                          }, null, 8, ["disabled", "loading", "messages", "rules", "onChange", "onClick:append"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_divider),
                  createVNode(_component_v_card_text, { style: { "height": "480px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_v_item_group, {
                        modelValue: unref(selectedEmbeddingDocs),
                        "onUpdate:modelValue": ($event) => isRef(selectedEmbeddingDocs) ? selectedEmbeddingDocs.value = $event : null,
                        multiple: ""
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(embeddingDocs), (item, i) => {
                            return openBlock(), createBlock(_component_v_row, {
                              key: i,
                              justify: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_col, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_item, null, {
                                      default: withCtx(({ isSelected, toggle }) => [
                                        createVNode(_component_v_list_item, {
                                          onClick: toggle,
                                          "prepend-icon": isSelected ? "check_box" : "check_box_outline_blank"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_list_item_title, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_v_list_item_subtitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.created_at), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "prepend-icon"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_divider),
                  createVNode(_component_v_row, {
                    justify: "center",
                    class: "pa-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_actions, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_btn, {
                            elevation: "2",
                            class: "ma-2",
                            onClick: ($event) => insertSelectedDocs()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Insert")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_v_btn, {
                            elevation: "2",
                            class: "ma-2",
                            onClick: ($event) => deleteSelectedDocs()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Delete")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_v_btn, {
                            elevation: "2",
                            class: "ma-2",
                            onClick: ($event) => __props.control.dialog = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Close")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
      _push(ssrRenderComponent(_component_v_snackbar, {
        modelValue: unref(snackbar),
        "onUpdate:modelValue": ($event) => isRef(snackbar) ? snackbar.value = $event : null,
        "multi-line": "",
        location: "top"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_btn, {
              color: "red",
              variant: "text",
              onClick: ($event) => snackbar.value = false,
              density: "compact",
              size: "default"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_btn, {
                color: "red",
                variant: "text",
                onClick: ($event) => snackbar.value = false,
                density: "compact",
                size: "default"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(snackbarText))} `);
          } else {
            return [
              createTextVNode(toDisplayString(unref(snackbarText)) + " ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DocumentsManage.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "MsgEditor",
  __ssrInlineRender: true,
  props: {
    sendMessage: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const { $i18n } = useNuxtApp();
    const message = ref("");
    const rows = ref(1);
    const autoGrow = ref(true);
    const hint = computed(() => {
      return isMobile() ? "" : $i18n.t("pressEnterToSendYourMessageOrShiftEnterToAddANewLine");
    });
    watchEffect(() => {
      const lines = message.value.split(/\r\n|\r|\n/).length;
      if (lines > 8) {
        rows.value = 8;
        autoGrow.value = false;
      } else {
        rows.value = 1;
        autoGrow.value = true;
      }
    });
    const send = () => {
      let msg = message.value;
      if (msg[msg.length - 1] === "\n") {
        msg = msg.slice(0, -1);
      }
      if (msg.length > 0) {
        let item = toolSelector.value.list[toolSelector.value.selected];
        props.sendMessage({ content: msg, tool: item.name, message_type: item.type });
      }
      message.value = "";
      toolSelector.value.selected = 0;
    };
    const textArea = ref();
    const documentMan = ref(null);
    const usePrompt = (prompt) => {
      message.value = prompt;
      textArea.value.focus();
    };
    const refreshDocList = () => {
      documentMan.value.loadDocs();
    };
    const clickSendBtn = () => {
      send();
    };
    const enterOnly = (event) => {
      event.preventDefault();
      if (!isMobile()) {
        send();
      }
    };
    expose({
      usePrompt,
      refreshDocList
    });
    const toolSelector = ref({
      list: [
        { title: "Chat", icon: "add", name: "chat", type: 0 },
        { title: "Web Search", icon: "travel_explore", name: "web_search", type: 100 },
        { title: "ArXiv", icon: "local_library", name: "arxiv", type: 110 }
      ],
      selected: 0
    });
    function getToolIcon() {
      let v = toolSelector.value;
      let icon = v.list[v.selected].icon;
      return icon;
    }
    function getLabel() {
      let v = toolSelector.value;
      let name = v.list[v.selected].name;
      return "messageLabel." + name;
    }
    function selectTool(idx) {
      let v = toolSelector.value;
      v.selected = idx;
      v.list[idx].name;
    }
    const docDialogCtl = ref({
      dialog: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_DocumentsManage = __nuxt_component_0;
      _push(`<!--[--><div class="flex-grow-1 d-flex align-center justify-space-between">`);
      _push(ssrRenderComponent(_component_v_btn, {
        title: "Tools",
        icon: getToolIcon(),
        density: "compact",
        size: "default",
        class: "mr-3",
        id: "tools_btn"
      }, null, _parent));
      _push(ssrRenderComponent(_component_v_menu, {
        activator: "#tools_btn",
        "open-on-hover": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_list, { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(toolSelector).list, (item, index) => {
                    _push3(ssrRenderComponent(_component_v_list_item, {
                      key: index,
                      "prepend-icon": item.icon,
                      onClick: ($event) => selectTool(index)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_list_item_title, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_list_item_title, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    "prepend-icon": "article",
                    onClick: ($event) => unref(docDialogCtl).dialog = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Documents `);
                      } else {
                        return [
                          createTextVNode(" Documents ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(toolSelector).list, (item, index) => {
                      return openBlock(), createBlock(_component_v_list_item, {
                        key: index,
                        "prepend-icon": item.icon,
                        onClick: ($event) => selectTool(index)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_list_item_title, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["prepend-icon", "onClick"]);
                    }), 128)),
                    createVNode(_component_v_list_item, {
                      "prepend-icon": "article",
                      onClick: ($event) => unref(docDialogCtl).dialog = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Documents ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_list, { density: "compact" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(toolSelector).list, (item, index) => {
                    return openBlock(), createBlock(_component_v_list_item, {
                      key: index,
                      "prepend-icon": item.icon,
                      onClick: ($event) => selectTool(index)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_list_item_title, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.title), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["prepend-icon", "onClick"]);
                  }), 128)),
                  createVNode(_component_v_list_item, {
                    "prepend-icon": "article",
                    onClick: ($event) => unref(docDialogCtl).dialog = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Documents ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_textarea, {
        ref_key: "textArea",
        ref: textArea,
        modelValue: unref(message),
        "onUpdate:modelValue": ($event) => isRef(message) ? message.value = $event : null,
        label: _ctx.$t(getLabel()),
        placeholder: unref(hint),
        rows: unref(rows),
        "max-rows": "8",
        "auto-grow": unref(autoGrow),
        disabled: __props.disabled,
        loading: __props.loading,
        "hide-details": true,
        clearable: "",
        variant: "outlined",
        class: "userinputmsg",
        onKeydown: enterOnly
      }, null, _parent));
      _push(ssrRenderComponent(_component_v_btn, {
        disabled: __props.loading,
        icon: "send",
        title: "Send",
        class: "ml-3",
        onClick: clickSendBtn
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_DocumentsManage, {
        "send-message": __props.sendMessage,
        control: unref(docDialogCtl),
        ref_key: "documentMan",
        ref: documentMan
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MsgEditor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "Prompt",
  __ssrInlineRender: true,
  props: {
    usePrompt: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const menu = ref(false);
    const prompts = ref([]);
    const editingPrompt = ref(null);
    const newTitlePrompt = ref(null);
    const newPrompt = ref("");
    const submittingNewPrompt = ref(false);
    const promptInputErrorMessage = ref("");
    const loadingPrompts = ref(false);
    const deletingPromptIndex = ref(null);
    const addPrompt = async () => {
      if (!newPrompt.value) {
        promptInputErrorMessage.value = "Please enter a prompt";
        return;
      }
      submittingNewPrompt.value = true;
      const { data, error } = await useAuthFetch("/api/chat/prompts/", {
        method: "POST",
        body: JSON.stringify({
          title: newTitlePrompt.value,
          prompt: newPrompt.value
        })
      });
      if (!error.value) {
        prompts.value.push(data.value);
        newTitlePrompt.value = null;
        newPrompt.value = "";
      }
      submittingNewPrompt.value = false;
    };
    const editPrompt = (index) => {
      editingPrompt.value = Object.assign({}, prompts.value[index]);
    };
    const updatePrompt = async (index) => {
      editingPrompt.value.updating = true;
      const { data, error } = await useAuthFetch(`/api/chat/prompts/${editingPrompt.value.id}/`, {
        method: "PUT",
        body: JSON.stringify({
          title: editingPrompt.value.title,
          prompt: editingPrompt.value.prompt
        })
      });
      if (!error.value) {
        prompts.value[index] = editingPrompt.value;
      }
      editingPrompt.value.updating = false;
      editingPrompt.value = null;
    };
    const cancelEditPrompt = () => {
      editingPrompt.value = null;
    };
    const deletePrompt = async (index) => {
      deletingPromptIndex.value = index;
      const { data, error } = await useAuthFetch(`/api/chat/prompts/${prompts.value[index].id}/`, {
        method: "DELETE"
      });
      deletingPromptIndex.value = null;
      if (!error.value) {
        prompts.value.splice(index, 1);
      }
    };
    const selectPrompt = (prompt) => {
      props.usePrompt(prompt.prompt);
      menu.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_textarea = resolveComponent("v-textarea");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_v_menu, {
        modelValue: unref(menu),
        "onUpdate:modelValue": ($event) => isRef(menu) ? menu.value = $event : null,
        "close-on-content-click": false
      }, {
        activator: withCtx(({ props: props2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_btn, mergeProps(props2, { icon: "" }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_icon, { icon: "speaker_notes" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_icon, { icon: "speaker_notes" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_btn, mergeProps(props2, { icon: "" }), {
                default: withCtx(() => [
                  createVNode(_component_v_icon, { icon: "speaker_notes" })
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card, {
                    "min-width": "300",
                    "max-width": "500"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="headline"${_scopeId4}>${ssrInterpolate(_ctx.$t("frequentlyPrompts"))}</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "headline" }, toDisplayString(_ctx.$t("frequentlyPrompts")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_divider, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_list, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_list_item, {
                                style: unref(loadingPrompts) ? null : { display: "none" }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_progress_circular, { indeterminate: "" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_progress_circular, { indeterminate: "" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_progress_circular, { indeterminate: "" })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(prompts), (prompt, idx) => {
                                _push5(`<!--[-->`);
                                if (unref(editingPrompt) && unref(editingPrompt).id === prompt.id) {
                                  _push5(ssrRenderComponent(_component_v_list_item, { "active-color": "primary" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="d-flex flex-row" style="${ssrRenderStyle({ marginTop: "5px" })}"${_scopeId5}><div class="flex-grow-1"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_text_field, {
                                          modelValue: unref(editingPrompt).title,
                                          "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                          loading: unref(editingPrompt).updating,
                                          label: _ctx.$t("titlePrompt"),
                                          variant: "underlined",
                                          density: "compact",
                                          "hide-details": ""
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_v_textarea, {
                                          rows: "2",
                                          modelValue: unref(editingPrompt).prompt,
                                          "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                          loading: unref(editingPrompt).updating,
                                          variant: "underlined",
                                          density: "compact",
                                          "hide-details": ""
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div><div${_scopeId5}><div class="d-flex flex-column"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          icon: "done",
                                          variant: "text",
                                          loading: unref(editingPrompt).updating,
                                          onClick: ($event) => updatePrompt(idx)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          icon: "close",
                                          variant: "text",
                                          onClick: ($event) => cancelEditPrompt()
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div></div></div>`);
                                      } else {
                                        return [
                                          createVNode("div", {
                                            class: "d-flex flex-row",
                                            style: { marginTop: "5px" }
                                          }, [
                                            createVNode("div", { class: "flex-grow-1" }, [
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(editingPrompt).title,
                                                "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                                loading: unref(editingPrompt).updating,
                                                label: _ctx.$t("titlePrompt"),
                                                variant: "underlined",
                                                density: "compact",
                                                "hide-details": ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "label"]),
                                              createVNode(_component_v_textarea, {
                                                rows: "2",
                                                modelValue: unref(editingPrompt).prompt,
                                                "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                                loading: unref(editingPrompt).updating,
                                                variant: "underlined",
                                                density: "compact",
                                                "hide-details": ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("div", { class: "d-flex flex-column" }, [
                                                createVNode(_component_v_btn, {
                                                  icon: "done",
                                                  variant: "text",
                                                  loading: unref(editingPrompt).updating,
                                                  onClick: ($event) => updatePrompt(idx)
                                                }, null, 8, ["loading", "onClick"]),
                                                createVNode(_component_v_btn, {
                                                  icon: "close",
                                                  variant: "text",
                                                  onClick: ($event) => cancelEditPrompt()
                                                }, null, 8, ["onClick"])
                                              ])
                                            ])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (!unref(editingPrompt) || unref(editingPrompt).id !== prompt.id) {
                                  _push5(ssrRenderComponent(_component_v_list_item, {
                                    rounded: "xl",
                                    "active-color": "primary",
                                    onClick: ($event) => selectPrompt(prompt)
                                  }, {
                                    append: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          icon: "edit",
                                          size: "small",
                                          variant: "text",
                                          onClick: ($event) => editPrompt(idx)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          icon: "delete",
                                          size: "small",
                                          variant: "text",
                                          loading: unref(deletingPromptIndex) === idx,
                                          onClick: ($event) => deletePrompt(idx)
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_v_btn, {
                                            icon: "edit",
                                            size: "small",
                                            variant: "text",
                                            onClick: ($event) => editPrompt(idx)
                                          }, null, 8, ["onClick"]),
                                          createVNode(_component_v_btn, {
                                            icon: "delete",
                                            size: "small",
                                            variant: "text",
                                            loading: unref(deletingPromptIndex) === idx,
                                            onClick: ($event) => deletePrompt(idx)
                                          }, null, 8, ["loading", "onClick"])
                                        ];
                                      }
                                    }),
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_v_list_item_title, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(prompt.title ? prompt.title : prompt.prompt)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_v_list_item_title, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              });
                              _push5(`<!--]-->`);
                              _push5(ssrRenderComponent(_component_v_list_item, { "active-color": "primary" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="pt-3"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_text_field, {
                                      rows: "1",
                                      modelValue: unref(newTitlePrompt),
                                      "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                      label: _ctx.$t("titlePrompt"),
                                      variant: "outlined",
                                      density: "compact",
                                      "hide-details": "",
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "pt-3" }, [
                                        createVNode(_component_v_text_field, {
                                          rows: "1",
                                          modelValue: unref(newTitlePrompt),
                                          "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                          label: _ctx.$t("titlePrompt"),
                                          variant: "outlined",
                                          density: "compact",
                                          "hide-details": "",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_list_item, { "active-color": "primary" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="pt-3"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_textarea, {
                                      rows: "2",
                                      modelValue: unref(newPrompt),
                                      "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                      label: _ctx.$t("addNewPrompt"),
                                      variant: "outlined",
                                      density: "compact",
                                      "error-messages": unref(promptInputErrorMessage),
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "pt-3" }, [
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          modelValue: unref(newPrompt),
                                          "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                          label: _ctx.$t("addNewPrompt"),
                                          variant: "outlined",
                                          density: "compact",
                                          "error-messages": unref(promptInputErrorMessage),
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_list_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_btn, {
                                      variant: "text",
                                      block: "",
                                      loading: unref(submittingNewPrompt),
                                      onClick: ($event) => addPrompt()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_icon, { icon: "add" }, null, _parent7, _scopeId6));
                                          _push7(` ${ssrInterpolate(_ctx.$t("addPrompt"))}`);
                                        } else {
                                          return [
                                            createVNode(_component_v_icon, { icon: "add" }),
                                            createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_btn, {
                                        variant: "text",
                                        block: "",
                                        loading: unref(submittingNewPrompt),
                                        onClick: ($event) => addPrompt()
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_icon, { icon: "add" }),
                                          createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                withDirectives(createVNode(_component_v_list_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_progress_circular, { indeterminate: "" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 512), [
                                  [vShow, unref(loadingPrompts)]
                                ]),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(prompts), (prompt, idx) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: prompt.id
                                  }, [
                                    unref(editingPrompt) && unref(editingPrompt).id === prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                      key: 0,
                                      "active-color": "primary"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "d-flex flex-row",
                                          style: { marginTop: "5px" }
                                        }, [
                                          createVNode("div", { class: "flex-grow-1" }, [
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(editingPrompt).title,
                                              "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                              loading: unref(editingPrompt).updating,
                                              label: _ctx.$t("titlePrompt"),
                                              variant: "underlined",
                                              density: "compact",
                                              "hide-details": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "label"]),
                                            createVNode(_component_v_textarea, {
                                              rows: "2",
                                              modelValue: unref(editingPrompt).prompt,
                                              "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                              loading: unref(editingPrompt).updating,
                                              variant: "underlined",
                                              density: "compact",
                                              "hide-details": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("div", { class: "d-flex flex-column" }, [
                                              createVNode(_component_v_btn, {
                                                icon: "done",
                                                variant: "text",
                                                loading: unref(editingPrompt).updating,
                                                onClick: ($event) => updatePrompt(idx)
                                              }, null, 8, ["loading", "onClick"]),
                                              createVNode(_component_v_btn, {
                                                icon: "close",
                                                variant: "text",
                                                onClick: ($event) => cancelEditPrompt()
                                              }, null, 8, ["onClick"])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    !unref(editingPrompt) || unref(editingPrompt).id !== prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                      key: 1,
                                      rounded: "xl",
                                      "active-color": "primary",
                                      onClick: ($event) => selectPrompt(prompt)
                                    }, {
                                      append: withCtx(() => [
                                        createVNode(_component_v_btn, {
                                          icon: "edit",
                                          size: "small",
                                          variant: "text",
                                          onClick: ($event) => editPrompt(idx)
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_v_btn, {
                                          icon: "delete",
                                          size: "small",
                                          variant: "text",
                                          loading: unref(deletingPromptIndex) === idx,
                                          onClick: ($event) => deletePrompt(idx)
                                        }, null, 8, ["loading", "onClick"])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_v_list_item_title, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])) : createCommentVNode("", true)
                                  ], 64);
                                }), 128)),
                                createVNode(_component_v_list_item, { "active-color": "primary" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "pt-3" }, [
                                      createVNode(_component_v_text_field, {
                                        rows: "1",
                                        modelValue: unref(newTitlePrompt),
                                        "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                        label: _ctx.$t("titlePrompt"),
                                        variant: "outlined",
                                        density: "compact",
                                        "hide-details": "",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_list_item, { "active-color": "primary" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "pt-3" }, [
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        modelValue: unref(newPrompt),
                                        "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                        label: _ctx.$t("addNewPrompt"),
                                        variant: "outlined",
                                        density: "compact",
                                        "error-messages": unref(promptInputErrorMessage),
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_list_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_btn, {
                                      variant: "text",
                                      block: "",
                                      loading: unref(submittingNewPrompt),
                                      onClick: ($event) => addPrompt()
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_icon, { icon: "add" }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "onClick"])
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
                          createVNode(_component_v_card_title, null, {
                            default: withCtx(() => [
                              createVNode("span", { class: "headline" }, toDisplayString(_ctx.$t("frequentlyPrompts")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_divider),
                          createVNode(_component_v_list, null, {
                            default: withCtx(() => [
                              withDirectives(createVNode(_component_v_list_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_progress_circular, { indeterminate: "" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 512), [
                                [vShow, unref(loadingPrompts)]
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(prompts), (prompt, idx) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: prompt.id
                                }, [
                                  unref(editingPrompt) && unref(editingPrompt).id === prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                    key: 0,
                                    "active-color": "primary"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "d-flex flex-row",
                                        style: { marginTop: "5px" }
                                      }, [
                                        createVNode("div", { class: "flex-grow-1" }, [
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(editingPrompt).title,
                                            "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                            loading: unref(editingPrompt).updating,
                                            label: _ctx.$t("titlePrompt"),
                                            variant: "underlined",
                                            density: "compact",
                                            "hide-details": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "label"]),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            modelValue: unref(editingPrompt).prompt,
                                            "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                            loading: unref(editingPrompt).updating,
                                            variant: "underlined",
                                            density: "compact",
                                            "hide-details": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", { class: "d-flex flex-column" }, [
                                            createVNode(_component_v_btn, {
                                              icon: "done",
                                              variant: "text",
                                              loading: unref(editingPrompt).updating,
                                              onClick: ($event) => updatePrompt(idx)
                                            }, null, 8, ["loading", "onClick"]),
                                            createVNode(_component_v_btn, {
                                              icon: "close",
                                              variant: "text",
                                              onClick: ($event) => cancelEditPrompt()
                                            }, null, 8, ["onClick"])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true),
                                  !unref(editingPrompt) || unref(editingPrompt).id !== prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                    key: 1,
                                    rounded: "xl",
                                    "active-color": "primary",
                                    onClick: ($event) => selectPrompt(prompt)
                                  }, {
                                    append: withCtx(() => [
                                      createVNode(_component_v_btn, {
                                        icon: "edit",
                                        size: "small",
                                        variant: "text",
                                        onClick: ($event) => editPrompt(idx)
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_v_btn, {
                                        icon: "delete",
                                        size: "small",
                                        variant: "text",
                                        loading: unref(deletingPromptIndex) === idx,
                                        onClick: ($event) => deletePrompt(idx)
                                      }, null, 8, ["loading", "onClick"])
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_v_list_item_title, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                                ], 64);
                              }), 128)),
                              createVNode(_component_v_list_item, { "active-color": "primary" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "pt-3" }, [
                                    createVNode(_component_v_text_field, {
                                      rows: "1",
                                      modelValue: unref(newTitlePrompt),
                                      "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                      label: _ctx.$t("titlePrompt"),
                                      variant: "outlined",
                                      density: "compact",
                                      "hide-details": "",
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_list_item, { "active-color": "primary" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "pt-3" }, [
                                    createVNode(_component_v_textarea, {
                                      rows: "2",
                                      modelValue: unref(newPrompt),
                                      "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                      label: _ctx.$t("addNewPrompt"),
                                      variant: "outlined",
                                      density: "compact",
                                      "error-messages": unref(promptInputErrorMessage),
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_list_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_btn, {
                                    variant: "text",
                                    block: "",
                                    loading: unref(submittingNewPrompt),
                                    onClick: ($event) => addPrompt()
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_icon, { icon: "add" }),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"])
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
                    createVNode(_component_v_card, {
                      "min-width": "300",
                      "max-width": "500"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_title, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "headline" }, toDisplayString(_ctx.$t("frequentlyPrompts")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_divider),
                        createVNode(_component_v_list, null, {
                          default: withCtx(() => [
                            withDirectives(createVNode(_component_v_list_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_progress_circular, { indeterminate: "" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 512), [
                              [vShow, unref(loadingPrompts)]
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(prompts), (prompt, idx) => {
                              return openBlock(), createBlock(Fragment, {
                                key: prompt.id
                              }, [
                                unref(editingPrompt) && unref(editingPrompt).id === prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                  key: 0,
                                  "active-color": "primary"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "d-flex flex-row",
                                      style: { marginTop: "5px" }
                                    }, [
                                      createVNode("div", { class: "flex-grow-1" }, [
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(editingPrompt).title,
                                          "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                          loading: unref(editingPrompt).updating,
                                          label: _ctx.$t("titlePrompt"),
                                          variant: "underlined",
                                          density: "compact",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "label"]),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          modelValue: unref(editingPrompt).prompt,
                                          "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                          loading: unref(editingPrompt).updating,
                                          variant: "underlined",
                                          density: "compact",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "d-flex flex-column" }, [
                                          createVNode(_component_v_btn, {
                                            icon: "done",
                                            variant: "text",
                                            loading: unref(editingPrompt).updating,
                                            onClick: ($event) => updatePrompt(idx)
                                          }, null, 8, ["loading", "onClick"]),
                                          createVNode(_component_v_btn, {
                                            icon: "close",
                                            variant: "text",
                                            onClick: ($event) => cancelEditPrompt()
                                          }, null, 8, ["onClick"])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true),
                                !unref(editingPrompt) || unref(editingPrompt).id !== prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                  key: 1,
                                  rounded: "xl",
                                  "active-color": "primary",
                                  onClick: ($event) => selectPrompt(prompt)
                                }, {
                                  append: withCtx(() => [
                                    createVNode(_component_v_btn, {
                                      icon: "edit",
                                      size: "small",
                                      variant: "text",
                                      onClick: ($event) => editPrompt(idx)
                                    }, null, 8, ["onClick"]),
                                    createVNode(_component_v_btn, {
                                      icon: "delete",
                                      size: "small",
                                      variant: "text",
                                      loading: unref(deletingPromptIndex) === idx,
                                      onClick: ($event) => deletePrompt(idx)
                                    }, null, 8, ["loading", "onClick"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_v_list_item_title, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])) : createCommentVNode("", true)
                              ], 64);
                            }), 128)),
                            createVNode(_component_v_list_item, { "active-color": "primary" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "pt-3" }, [
                                  createVNode(_component_v_text_field, {
                                    rows: "1",
                                    modelValue: unref(newTitlePrompt),
                                    "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                    label: _ctx.$t("titlePrompt"),
                                    variant: "outlined",
                                    density: "compact",
                                    "hide-details": "",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_list_item, { "active-color": "primary" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "pt-3" }, [
                                  createVNode(_component_v_textarea, {
                                    rows: "2",
                                    modelValue: unref(newPrompt),
                                    "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                    label: _ctx.$t("addNewPrompt"),
                                    variant: "outlined",
                                    density: "compact",
                                    "error-messages": unref(promptInputErrorMessage),
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_list_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_btn, {
                                  variant: "text",
                                  block: "",
                                  loading: unref(submittingNewPrompt),
                                  onClick: ($event) => addPrompt()
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_icon, { icon: "add" }),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["loading", "onClick"])
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
                  createVNode(_component_v_card, {
                    "min-width": "300",
                    "max-width": "500"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_title, null, {
                        default: withCtx(() => [
                          createVNode("span", { class: "headline" }, toDisplayString(_ctx.$t("frequentlyPrompts")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_divider),
                      createVNode(_component_v_list, null, {
                        default: withCtx(() => [
                          withDirectives(createVNode(_component_v_list_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_progress_circular, { indeterminate: "" })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 512), [
                            [vShow, unref(loadingPrompts)]
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(prompts), (prompt, idx) => {
                            return openBlock(), createBlock(Fragment, {
                              key: prompt.id
                            }, [
                              unref(editingPrompt) && unref(editingPrompt).id === prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                key: 0,
                                "active-color": "primary"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "d-flex flex-row",
                                    style: { marginTop: "5px" }
                                  }, [
                                    createVNode("div", { class: "flex-grow-1" }, [
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(editingPrompt).title,
                                        "onUpdate:modelValue": ($event) => unref(editingPrompt).title = $event,
                                        loading: unref(editingPrompt).updating,
                                        label: _ctx.$t("titlePrompt"),
                                        variant: "underlined",
                                        density: "compact",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "label"]),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        modelValue: unref(editingPrompt).prompt,
                                        "onUpdate:modelValue": ($event) => unref(editingPrompt).prompt = $event,
                                        loading: unref(editingPrompt).updating,
                                        variant: "underlined",
                                        density: "compact",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "d-flex flex-column" }, [
                                        createVNode(_component_v_btn, {
                                          icon: "done",
                                          variant: "text",
                                          loading: unref(editingPrompt).updating,
                                          onClick: ($event) => updatePrompt(idx)
                                        }, null, 8, ["loading", "onClick"]),
                                        createVNode(_component_v_btn, {
                                          icon: "close",
                                          variant: "text",
                                          onClick: ($event) => cancelEditPrompt()
                                        }, null, 8, ["onClick"])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true),
                              !unref(editingPrompt) || unref(editingPrompt).id !== prompt.id ? (openBlock(), createBlock(_component_v_list_item, {
                                key: 1,
                                rounded: "xl",
                                "active-color": "primary",
                                onClick: ($event) => selectPrompt(prompt)
                              }, {
                                append: withCtx(() => [
                                  createVNode(_component_v_btn, {
                                    icon: "edit",
                                    size: "small",
                                    variant: "text",
                                    onClick: ($event) => editPrompt(idx)
                                  }, null, 8, ["onClick"]),
                                  createVNode(_component_v_btn, {
                                    icon: "delete",
                                    size: "small",
                                    variant: "text",
                                    loading: unref(deletingPromptIndex) === idx,
                                    onClick: ($event) => deletePrompt(idx)
                                  }, null, 8, ["loading", "onClick"])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item_title, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(prompt.title ? prompt.title : prompt.prompt), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : createCommentVNode("", true)
                            ], 64);
                          }), 128)),
                          createVNode(_component_v_list_item, { "active-color": "primary" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "pt-3" }, [
                                createVNode(_component_v_text_field, {
                                  rows: "1",
                                  modelValue: unref(newTitlePrompt),
                                  "onUpdate:modelValue": ($event) => isRef(newTitlePrompt) ? newTitlePrompt.value = $event : null,
                                  label: _ctx.$t("titlePrompt"),
                                  variant: "outlined",
                                  density: "compact",
                                  "hide-details": "",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_list_item, { "active-color": "primary" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "pt-3" }, [
                                createVNode(_component_v_textarea, {
                                  rows: "2",
                                  modelValue: unref(newPrompt),
                                  "onUpdate:modelValue": [($event) => isRef(newPrompt) ? newPrompt.value = $event : null, ($event) => promptInputErrorMessage.value = ""],
                                  label: _ctx.$t("addNewPrompt"),
                                  variant: "outlined",
                                  density: "compact",
                                  "error-messages": unref(promptInputErrorMessage),
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error-messages"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_list_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_btn, {
                                variant: "text",
                                block: "",
                                loading: unref(submittingNewPrompt),
                                onClick: ($event) => addPrompt()
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_icon, { icon: "add" }),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("addPrompt")), 1)
                                ]),
                                _: 1
                              }, 8, ["loading", "onClick"])
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Prompt.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "Conversation",
  __ssrInlineRender: true,
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { $i18n, $settings } = useNuxtApp();
    const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
    const currentModel = useCurrentModel();
    const openaiApiKey = useApiKey();
    const fetchingResponse = ref(false);
    const messageQueue = [];
    const frugalMode = ref(true);
    let isProcessingQueue = false;
    const processMessageQueue = () => {
      if (isProcessingQueue || messageQueue.length === 0) {
        return;
      }
      if (!props.conversation.messages[props.conversation.messages.length - 1].is_bot) {
        props.conversation.messages.push({ id: null, is_bot: true, message: "" });
      }
      isProcessingQueue = true;
      const nextMessage = messageQueue.shift();
      if (runtimeConfig.public.typewriter) {
        let wordIndex = 0;
        const intervalId = setInterval(() => {
          props.conversation.messages[props.conversation.messages.length - 1].message += nextMessage[wordIndex];
          wordIndex++;
          if (wordIndex === nextMessage.length) {
            clearInterval(intervalId);
            isProcessingQueue = false;
            processMessageQueue();
          }
        }, runtimeConfig.public.typewriterDelay);
      } else {
        props.conversation.messages[props.conversation.messages.length - 1].message += nextMessage;
        isProcessingQueue = false;
        processMessageQueue();
      }
    };
    let ctrl;
    const abortFetch = () => {
      if (ctrl) {
        ctrl.abort();
      }
      fetchingResponse.value = false;
    };
    const fetchReply = async (message) => {
      ctrl = new AbortController();
      let msg = message;
      if (Array.isArray(message)) {
        msg = message[message.length - 1];
      } else {
        message = [message];
      }
      let webSearchParams = {};
      if (enableWebSearch.value || msg.tool == "web_search") {
        webSearchParams["web_search"] = {
          ua: navigator.userAgent,
          default_prompt: $i18n.t("webSearchDefaultPrompt")
        };
      }
      if (msg.tool == "web_search") {
        msg.tool_args = webSearchParams["web_search"];
        msg.type = 100;
      } else if (msg.tool == "arxiv") {
        msg.tool_args = null;
        msg.type = 110;
      }
      const data = Object.assign({}, currentModel.value, {
        openaiApiKey: $settings.open_api_key_setting === "True" ? openaiApiKey.value : null,
        message,
        conversationId: props.conversation.id,
        frugalMode: frugalMode.value
      }, webSearchParams);
      try {
        await fetchEventSource("/api/conversation/", {
          signal: ctrl.signal,
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
          openWhenHidden: true,
          onopen(response) {
            if (response.ok && response.headers.get("content-type") === EventStreamContentType) {
              return;
            }
            throw new Error(`Failed to send message. HTTP ${response.status} - ${response.statusText}`);
          },
          onclose() {
            if (ctrl.signal.aborted === true) {
              return;
            }
            throw new Error(`Failed to send message. Server closed the connection unexpectedly.`);
          },
          onerror(err) {
            throw err;
          },
          async onmessage(message2) {
            const event = message2.event;
            const data2 = JSON.parse(message2.data);
            if (event === "error") {
              abortFetch();
              showSnackbar(data2.error);
              return;
            }
            if (event === "userMessageId") {
              props.conversation.messages[props.conversation.messages.length - 1].id = data2.userMessageId;
              return;
            }
            if (event === "done") {
              abortFetch();
              props.conversation.messages[props.conversation.messages.length - 1].id = data2.messageId;
              if (!props.conversation.id) {
                props.conversation.id = data2.conversationId;
                genTitle(props.conversation.id);
              }
              if (data2.newDocId) {
                editor.value.refreshDocList();
              }
              return;
            }
            messageQueue.push(data2.content);
            processMessageQueue();
            scrollChatWindow();
          }
        });
      } catch (err) {
        console.log(err);
        abortFetch();
        showSnackbar(err.message);
      }
    };
    const grab = ref(null);
    const scrollChatWindow = () => {
      if (grab.value === null) {
        return;
      }
      grab.value.scrollIntoView({ behavior: "smooth" });
    };
    const send = (message) => {
      fetchingResponse.value = true;
      if (props.conversation.messages.length === 0) {
        addConversation(props.conversation);
      }
      if (Array.isArray(message)) {
        props.conversation.messages.push(...message.map((i) => ({ message: i.content, message_type: i.message_type })));
      } else {
        props.conversation.messages.push({ message: message.content, message_type: message.message_type });
      }
      fetchReply(message);
      scrollChatWindow();
    };
    const stop = () => {
      abortFetch();
    };
    const snackbar = ref(false);
    const snackbarText = ref("");
    const showSnackbar = (text) => {
      snackbarText.value = text;
      snackbar.value = true;
    };
    const editor = ref(null);
    const usePrompt = (prompt) => {
      editor.value.usePrompt(prompt);
    };
    const deleteMessage = (index) => {
      props.conversation.messages.splice(index, 1);
    };
    const toggleMessage = (index) => {
      props.conversation.messages[index].is_disabled = !props.conversation.messages[index].is_disabled;
    };
    const enableWebSearch = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_MessageActions = __nuxt_component_0$1;
      const _component_MsgContent = __nuxt_component_1$1;
      const _component_v_footer = resolveComponent("v-footer");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_MsgEditor = __nuxt_component_2;
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_Prompt = __nuxt_component_3;
      const _component_v_switch = resolveComponent("v-switch");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_snackbar = resolveComponent("v-snackbar");
      _push(`<!--[-->`);
      if (__props.conversation) {
        _push(`<div data-v-13578bb4>`);
        if (__props.conversation.loadingMessages) {
          _push(`<div class="text-center" data-v-13578bb4>`);
          _push(ssrRenderComponent(_component_v_progress_circular, {
            indeterminate: "",
            color: "primary"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div data-v-13578bb4>`);
          if (__props.conversation.messages) {
            _push(`<div data-v-13578bb4>`);
            _push(ssrRenderComponent(_component_v_container, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_v_row, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<!--[-->`);
                        ssrRenderList(__props.conversation.messages, (message, index) => {
                          _push3(ssrRenderComponent(_component_v_col, {
                            key: index,
                            cols: "12"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`<div class="${ssrRenderClass([message.is_bot ? "justify-start" : "justify-end", "d-flex align-center"])}" data-v-13578bb4${_scopeId3}>`);
                                if (!message.is_bot) {
                                  _push4(ssrRenderComponent(_component_MessageActions, {
                                    message,
                                    "message-index": index,
                                    "use-prompt": usePrompt,
                                    "delete-message": deleteMessage,
                                    "toggle-message": toggleMessage
                                  }, null, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(ssrRenderComponent(_component_MsgContent, {
                                  message,
                                  index,
                                  "use-prompt": usePrompt,
                                  "delete-message": deleteMessage
                                }, null, _parent4, _scopeId3));
                                if (message.is_bot) {
                                  _push4(ssrRenderComponent(_component_MessageActions, {
                                    message,
                                    "message-index": index,
                                    "use-prompt": usePrompt,
                                    "delete-message": deleteMessage
                                  }, null, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`</div>`);
                              } else {
                                return [
                                  createVNode("div", {
                                    class: ["d-flex align-center", message.is_bot ? "justify-start" : "justify-end"]
                                  }, [
                                    !message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                      key: 0,
                                      message,
                                      "message-index": index,
                                      "use-prompt": usePrompt,
                                      "delete-message": deleteMessage,
                                      "toggle-message": toggleMessage
                                    }, null, 8, ["message", "message-index"])) : createCommentVNode("", true),
                                    createVNode(_component_MsgContent, {
                                      message,
                                      index,
                                      "use-prompt": usePrompt,
                                      "delete-message": deleteMessage
                                    }, null, 8, ["message", "index"]),
                                    message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                      key: 1,
                                      message,
                                      "message-index": index,
                                      "use-prompt": usePrompt,
                                      "delete-message": deleteMessage
                                    }, null, 8, ["message", "message-index"])) : createCommentVNode("", true)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        });
                        _push3(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.conversation.messages, (message, index) => {
                            return openBlock(), createBlock(_component_v_col, {
                              key: index,
                              cols: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: ["d-flex align-center", message.is_bot ? "justify-start" : "justify-end"]
                                }, [
                                  !message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                    key: 0,
                                    message,
                                    "message-index": index,
                                    "use-prompt": usePrompt,
                                    "delete-message": deleteMessage,
                                    "toggle-message": toggleMessage
                                  }, null, 8, ["message", "message-index"])) : createCommentVNode("", true),
                                  createVNode(_component_MsgContent, {
                                    message,
                                    index,
                                    "use-prompt": usePrompt,
                                    "delete-message": deleteMessage
                                  }, null, 8, ["message", "index"]),
                                  message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                    key: 1,
                                    message,
                                    "message-index": index,
                                    "use-prompt": usePrompt,
                                    "delete-message": deleteMessage
                                  }, null, 8, ["message", "message-index"])) : createCommentVNode("", true)
                                ], 2)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_v_row, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.conversation.messages, (message, index) => {
                          return openBlock(), createBlock(_component_v_col, {
                            key: index,
                            cols: "12"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["d-flex align-center", message.is_bot ? "justify-start" : "justify-end"]
                              }, [
                                !message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                  key: 0,
                                  message,
                                  "message-index": index,
                                  "use-prompt": usePrompt,
                                  "delete-message": deleteMessage,
                                  "toggle-message": toggleMessage
                                }, null, 8, ["message", "message-index"])) : createCommentVNode("", true),
                                createVNode(_component_MsgContent, {
                                  message,
                                  index,
                                  "use-prompt": usePrompt,
                                  "delete-message": deleteMessage
                                }, null, 8, ["message", "index"]),
                                message.is_bot ? (openBlock(), createBlock(_component_MessageActions, {
                                  key: 1,
                                  message,
                                  "message-index": index,
                                  "use-prompt": usePrompt,
                                  "delete-message": deleteMessage
                                }, null, 8, ["message", "message-index"])) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`<div class="w-100" style="${ssrRenderStyle({ "height": "200px" })}" data-v-13578bb4></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_v_footer, {
        app: "",
        class: "footer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-md-16 w-100 d-flex flex-column" data-v-13578bb4${_scopeId}><div class="d-flex align-center" data-v-13578bb4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              style: unref(fetchingResponse) ? null : { display: "none" },
              icon: "close",
              title: "stop",
              class: "mr-3",
              onClick: stop
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MsgEditor, {
              ref_key: "editor",
              ref: editor,
              "send-message": send,
              disabled: unref(fetchingResponse),
              loading: unref(fetchingResponse)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_v_toolbar, {
              density: "comfortable",
              color: "transparent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Prompt, {
                    style: !unref(fetchingResponse) ? null : { display: "none" },
                    "use-prompt": usePrompt
                  }, null, _parent3, _scopeId2));
                  if (unref($settings).open_web_search === "True") {
                    _push3(ssrRenderComponent(_component_v_switch, {
                      modelValue: unref(enableWebSearch),
                      "onUpdate:modelValue": ($event) => isRef(enableWebSearch) ? enableWebSearch.value = $event : null,
                      inline: "",
                      "hide-details": "",
                      color: "primary",
                      label: _ctx.$t("webSearch")
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_v_spacer, null, null, _parent3, _scopeId2));
                  if (unref($settings).open_frugal_mode_control === "True") {
                    _push3(`<div class="d-flex align-center" data-v-13578bb4${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_switch, {
                      modelValue: unref(frugalMode),
                      "onUpdate:modelValue": ($event) => isRef(frugalMode) ? frugalMode.value = $event : null,
                      inline: "",
                      "hide-details": "",
                      color: "primary",
                      label: _ctx.$t("frugalMode")
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_v_dialog, {
                      transition: "dialog-bottom-transition",
                      width: "auto"
                    }, {
                      activator: withCtx(({ props: props2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_icon, mergeProps({ color: "grey" }, props2, {
                            icon: "help_outline",
                            class: "ml-3"
                          }), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_icon, mergeProps({ color: "grey" }, props2, {
                              icon: "help_outline",
                              class: "ml-3"
                            }), null, 16)
                          ];
                        }
                      }),
                      default: withCtx(({ isActive }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_card, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_toolbar, {
                                  color: "primary",
                                  title: _ctx.$t("frugalMode")
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_v_card_text, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(_ctx.$t("frugalModeTip"))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(_ctx.$t("frugalModeTip")), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_toolbar, {
                                    color: "primary",
                                    title: _ctx.$t("frugalMode")
                                  }, null, 8, ["title"]),
                                  createVNode(_component_v_card_text, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.$t("frugalModeTip")), 1)
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_card, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_toolbar, {
                                  color: "primary",
                                  title: _ctx.$t("frugalMode")
                                }, null, 8, ["title"]),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("frugalModeTip")), 1)
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
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    withDirectives(createVNode(_component_Prompt, { "use-prompt": usePrompt }, null, 512), [
                      [vShow, !unref(fetchingResponse)]
                    ]),
                    unref($settings).open_web_search === "True" ? (openBlock(), createBlock(_component_v_switch, {
                      key: 0,
                      modelValue: unref(enableWebSearch),
                      "onUpdate:modelValue": ($event) => isRef(enableWebSearch) ? enableWebSearch.value = $event : null,
                      inline: "",
                      "hide-details": "",
                      color: "primary",
                      label: _ctx.$t("webSearch")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : createCommentVNode("", true),
                    createVNode(_component_v_spacer),
                    unref($settings).open_frugal_mode_control === "True" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "d-flex align-center"
                    }, [
                      createVNode(_component_v_switch, {
                        modelValue: unref(frugalMode),
                        "onUpdate:modelValue": ($event) => isRef(frugalMode) ? frugalMode.value = $event : null,
                        inline: "",
                        "hide-details": "",
                        color: "primary",
                        label: _ctx.$t("frugalMode")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                      createVNode(_component_v_dialog, {
                        transition: "dialog-bottom-transition",
                        width: "auto"
                      }, {
                        activator: withCtx(({ props: props2 }) => [
                          createVNode(_component_v_icon, mergeProps({ color: "grey" }, props2, {
                            icon: "help_outline",
                            class: "ml-3"
                          }), null, 16)
                        ]),
                        default: withCtx(({ isActive }) => [
                          createVNode(_component_v_card, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_toolbar, {
                                color: "primary",
                                title: _ctx.$t("frugalMode")
                              }, null, 8, ["title"]),
                              createVNode(_component_v_card_text, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("frugalModeTip")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-md-16 w-100 d-flex flex-column" }, [
                createVNode("div", { class: "d-flex align-center" }, [
                  withDirectives(createVNode(_component_v_btn, {
                    icon: "close",
                    title: "stop",
                    class: "mr-3",
                    onClick: stop
                  }, null, 512), [
                    [vShow, unref(fetchingResponse)]
                  ]),
                  createVNode(_component_MsgEditor, {
                    ref_key: "editor",
                    ref: editor,
                    "send-message": send,
                    disabled: unref(fetchingResponse),
                    loading: unref(fetchingResponse)
                  }, null, 8, ["disabled", "loading"])
                ]),
                createVNode(_component_v_toolbar, {
                  density: "comfortable",
                  color: "transparent"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(_component_Prompt, { "use-prompt": usePrompt }, null, 512), [
                      [vShow, !unref(fetchingResponse)]
                    ]),
                    unref($settings).open_web_search === "True" ? (openBlock(), createBlock(_component_v_switch, {
                      key: 0,
                      modelValue: unref(enableWebSearch),
                      "onUpdate:modelValue": ($event) => isRef(enableWebSearch) ? enableWebSearch.value = $event : null,
                      inline: "",
                      "hide-details": "",
                      color: "primary",
                      label: _ctx.$t("webSearch")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : createCommentVNode("", true),
                    createVNode(_component_v_spacer),
                    unref($settings).open_frugal_mode_control === "True" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "d-flex align-center"
                    }, [
                      createVNode(_component_v_switch, {
                        modelValue: unref(frugalMode),
                        "onUpdate:modelValue": ($event) => isRef(frugalMode) ? frugalMode.value = $event : null,
                        inline: "",
                        "hide-details": "",
                        color: "primary",
                        label: _ctx.$t("frugalMode")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                      createVNode(_component_v_dialog, {
                        transition: "dialog-bottom-transition",
                        width: "auto"
                      }, {
                        activator: withCtx(({ props: props2 }) => [
                          createVNode(_component_v_icon, mergeProps({ color: "grey" }, props2, {
                            icon: "help_outline",
                            class: "ml-3"
                          }), null, 16)
                        ]),
                        default: withCtx(({ isActive }) => [
                          createVNode(_component_v_card, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_toolbar, {
                                color: "primary",
                                title: _ctx.$t("frugalMode")
                              }, null, 8, ["title"]),
                              createVNode(_component_v_card_text, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("frugalModeTip")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_snackbar, {
        modelValue: unref(snackbar),
        "onUpdate:modelValue": ($event) => isRef(snackbar) ? snackbar.value = $event : null,
        "multi-line": "",
        location: "top"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_btn, {
              color: "red",
              variant: "text",
              onClick: ($event) => snackbar.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_btn, {
                color: "red",
                variant: "text",
                onClick: ($event) => snackbar.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(snackbarText))} `);
          } else {
            return [
              createTextVNode(toDisplayString(unref(snackbarText)) + " ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Conversation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-13578bb4"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
    const drawer = useDrawer();
    const route = useRoute();
    const conversation = ref(getDefaultConversationData());
    const createNewConversation = () => {
      if (route.path !== "/") {
        return navigateTo("/?new");
      }
      conversation.value = Object.assign(getDefaultConversationData(), {
        topic: $i18n.t("newConversation")
      });
    };
    const navTitle = computed(() => {
      if (conversation.value && conversation.value.topic !== null) {
        return conversation.value.topic === "" ? $i18n.t("defaultConversationTitle") : conversation.value.topic;
      }
      return runtimeConfig.public.appName;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_app_bar = resolveComponent("v-app-bar");
      const _component_v_app_bar_nav_icon = resolveComponent("v-app-bar-nav-icon");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_main = resolveComponent("v-main");
      const _component_Welcome = __nuxt_component_0$2;
      const _component_Conversation = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_v_app_bar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_app_bar_nav_icon, {
              onClick: ($event) => drawer.value = !unref(drawer)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_toolbar_title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(navTitle))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(navTitle)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_spacer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              title: _ctx.$t("newConversation"),
              icon: "add",
              onClick: createNewConversation,
              class: "d-md-none ma-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              variant: "outlined",
              class: "text-none d-none d-md-block",
              onClick: createNewConversation
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("newConversation"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("newConversation")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_app_bar_nav_icon, {
                onClick: ($event) => drawer.value = !unref(drawer)
              }, null, 8, ["onClick"]),
              createVNode(_component_v_toolbar_title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(navTitle)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_v_spacer),
              createVNode(_component_v_btn, {
                title: _ctx.$t("newConversation"),
                icon: "add",
                onClick: createNewConversation,
                class: "d-md-none ma-3"
              }, null, 8, ["title"]),
              createVNode(_component_v_btn, {
                variant: "outlined",
                class: "text-none d-none d-md-block",
                onClick: createNewConversation
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("newConversation")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_main, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(route).params.id && unref(conversation).messages.length === 0) {
              _push2(ssrRenderComponent(_component_Welcome, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Conversation, { conversation: unref(conversation) }, null, _parent2, _scopeId));
          } else {
            return [
              !unref(route).params.id && unref(conversation).messages.length === 0 ? (openBlock(), createBlock(_component_Welcome, { key: 0 })) : createCommentVNode("", true),
              createVNode(_component_Conversation, { conversation: unref(conversation) }, null, 8, ["conversation"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8d2819f2.mjs.map
