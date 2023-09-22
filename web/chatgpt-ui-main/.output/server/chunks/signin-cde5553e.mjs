import { _ as __nuxt_component_2 } from './Languages-f34943de.mjs';
import { e as useNuxtApp, u as useRoute, n as navigateTo, b as useFetch, s as setUser } from './server.mjs';
import { ref, resolveComponent, mergeProps, withCtx, unref, createVNode, withKeys, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "signin",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const formData = ref({
      username: "",
      password: ""
    });
    const formRules = ref({
      username: [
        (v) => !!v || $i18n.t("Username is required")
      ],
      password: [
        (v) => !!v || $i18n.t("Password is required")
      ]
    });
    const errorMsg = ref(null);
    const signInForm = ref(null);
    const submitting = ref(false);
    const route = useRoute();
    const passwordInputType = ref("password");
    const submit = async () => {
      errorMsg.value = null;
      const { valid } = await signInForm.value.validate();
      if (valid) {
        submitting.value = true;
        const { data, error } = await useFetch("/api/account/login/", {
          method: "POST",
          body: JSON.stringify(formData.value)
        }, "$PHazAG3ZV3");
        submitting.value = false;
        if (error.value) {
          if (error.value.status === 400) {
            if (error.value.data.non_field_errors) {
              errorMsg.value = error.value.data.non_field_errors[0];
            }
          } else {
            errorMsg.value = "Something went wrong. Please try again.";
          }
        } else {
          setUser(data.value.user);
          const callback = route.query.callback ? decodeURIComponent(route.query.callback) : "/";
          await navigateTo(callback);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_SettingsLanguages = __nuxt_component_2;
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_form = resolveComponent("v-form");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_component_v_card, mergeProps({ style: { "height": "100vh" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SettingsLanguages, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_row, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_col, {
                          sm: "9",
                          "offset-sm": "1",
                          md: "6",
                          "offset-md": "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                class: "mt-15",
                                elevation: "0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="text-center text-h4"${_scopeId5}>${ssrInterpolate(_ctx.$t("signIn"))}</div>`);
                                    _push6(ssrRenderComponent(_component_v_card_text, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_form, {
                                            ref_key: "signInForm",
                                            ref: signInForm
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: unref(formData).username,
                                                  "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                                  rules: unref(formRules).username,
                                                  label: _ctx.$t("username"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: unref(formData).password,
                                                  "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                                  rules: unref(formRules).password,
                                                  label: _ctx.$t("password"),
                                                  variant: "underlined",
                                                  onKeyup: submit,
                                                  clearable: "",
                                                  type: unref(passwordInputType),
                                                  "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                                  "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: unref(formData).username,
                                                    "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                                    rules: unref(formRules).username,
                                                    label: _ctx.$t("username"),
                                                    variant: "underlined",
                                                    clearable: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: unref(formData).password,
                                                    "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                                    rules: unref(formRules).password,
                                                    label: _ctx.$t("password"),
                                                    variant: "underlined",
                                                    onKeyup: withKeys(submit, ["enter"]),
                                                    clearable: "",
                                                    type: unref(passwordInputType),
                                                    "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                                    "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          if (unref(errorMsg)) {
                                            _push7(`<div class="text-red"${_scopeId6}>${ssrInterpolate(unref(errorMsg))}</div>`);
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                          _push7(`<div class="mt-5 d-flex justify-space-between"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_v_btn, {
                                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                            variant: "text",
                                            color: "primary"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(_ctx.$t("createAccount"))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_btn, {
                                            color: "primary",
                                            loading: unref(submitting),
                                            onClick: submit,
                                            size: "large"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(_ctx.$t("signIn"))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode(_component_v_form, {
                                              ref_key: "signInForm",
                                              ref: signInForm
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_text_field, {
                                                  modelValue: unref(formData).username,
                                                  "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                                  rules: unref(formRules).username,
                                                  label: _ctx.$t("username"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: unref(formData).password,
                                                  "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                                  rules: unref(formRules).password,
                                                  label: _ctx.$t("password"),
                                                  variant: "underlined",
                                                  onKeyup: withKeys(submit, ["enter"]),
                                                  clearable: "",
                                                  type: unref(passwordInputType),
                                                  "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                                  "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                              ]),
                                              _: 1
                                            }, 512),
                                            unref(errorMsg) ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "text-red"
                                            }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                            createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                              createVNode(_component_v_btn, {
                                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                                variant: "text",
                                                color: "primary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(_component_v_btn, {
                                                color: "primary",
                                                loading: unref(submitting),
                                                onClick: submit,
                                                size: "large"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["loading"])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("signIn")), 1),
                                      createVNode(_component_v_card_text, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_form, {
                                            ref_key: "signInForm",
                                            ref: signInForm
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(formData).username,
                                                "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                                rules: unref(formRules).username,
                                                label: _ctx.$t("username"),
                                                variant: "underlined",
                                                clearable: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(formData).password,
                                                "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                                rules: unref(formRules).password,
                                                label: _ctx.$t("password"),
                                                variant: "underlined",
                                                onKeyup: withKeys(submit, ["enter"]),
                                                clearable: "",
                                                type: unref(passwordInputType),
                                                "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                                "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                            ]),
                                            _: 1
                                          }, 512),
                                          unref(errorMsg) ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "text-red"
                                          }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                          createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                            createVNode(_component_v_btn, {
                                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                              variant: "text",
                                              color: "primary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(_component_v_btn, {
                                              color: "primary",
                                              loading: unref(submitting),
                                              onClick: submit,
                                              size: "large"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["loading"])
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  class: "mt-15",
                                  elevation: "0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("signIn")), 1),
                                    createVNode(_component_v_card_text, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_form, {
                                          ref_key: "signInForm",
                                          ref: signInForm
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(formData).username,
                                              "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                              rules: unref(formRules).username,
                                              label: _ctx.$t("username"),
                                              variant: "underlined",
                                              clearable: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(formData).password,
                                              "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                              rules: unref(formRules).password,
                                              label: _ctx.$t("password"),
                                              variant: "underlined",
                                              onKeyup: withKeys(submit, ["enter"]),
                                              clearable: "",
                                              type: unref(passwordInputType),
                                              "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                              "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                          ]),
                                          _: 1
                                        }, 512),
                                        unref(errorMsg) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-red"
                                        }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                        createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                            variant: "text",
                                            color: "primary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(_component_v_btn, {
                                            color: "primary",
                                            loading: unref(submitting),
                                            onClick: submit,
                                            size: "large"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["loading"])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_col, {
                            sm: "9",
                            "offset-sm": "1",
                            md: "6",
                            "offset-md": "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                class: "mt-15",
                                elevation: "0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("signIn")), 1),
                                  createVNode(_component_v_card_text, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_form, {
                                        ref_key: "signInForm",
                                        ref: signInForm
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(formData).username,
                                            "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                            rules: unref(formRules).username,
                                            label: _ctx.$t("username"),
                                            variant: "underlined",
                                            clearable: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(formData).password,
                                            "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                            rules: unref(formRules).password,
                                            label: _ctx.$t("password"),
                                            variant: "underlined",
                                            onKeyup: withKeys(submit, ["enter"]),
                                            clearable: "",
                                            type: unref(passwordInputType),
                                            "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                            "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                        ]),
                                        _: 1
                                      }, 512),
                                      unref(errorMsg) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-red"
                                      }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                      createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                          variant: "text",
                                          color: "primary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(_component_v_btn, {
                                          color: "primary",
                                          loading: unref(submitting),
                                          onClick: submit,
                                          size: "large"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["loading"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SettingsLanguages),
                    createVNode(_component_v_row, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, {
                          sm: "9",
                          "offset-sm": "1",
                          md: "6",
                          "offset-md": "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "mt-15",
                              elevation: "0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("signIn")), 1),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_form, {
                                      ref_key: "signInForm",
                                      ref: signInForm
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(formData).username,
                                          "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                          rules: unref(formRules).username,
                                          label: _ctx.$t("username"),
                                          variant: "underlined",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(formData).password,
                                          "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                          rules: unref(formRules).password,
                                          label: _ctx.$t("password"),
                                          variant: "underlined",
                                          onKeyup: withKeys(submit, ["enter"]),
                                          clearable: "",
                                          type: unref(passwordInputType),
                                          "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                          "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                      ]),
                                      _: 1
                                    }, 512),
                                    unref(errorMsg) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-red"
                                    }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                        variant: "text",
                                        color: "primary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(_component_v_btn, {
                                        color: "primary",
                                        loading: unref(submitting),
                                        onClick: submit,
                                        size: "large"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_container, null, {
                default: withCtx(() => [
                  createVNode(_component_SettingsLanguages),
                  createVNode(_component_v_row, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_col, {
                        sm: "9",
                        "offset-sm": "1",
                        md: "6",
                        "offset-md": "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            class: "mt-15",
                            elevation: "0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("signIn")), 1),
                              createVNode(_component_v_card_text, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_form, {
                                    ref_key: "signInForm",
                                    ref: signInForm
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(formData).username,
                                        "onUpdate:modelValue": ($event) => unref(formData).username = $event,
                                        rules: unref(formRules).username,
                                        label: _ctx.$t("username"),
                                        variant: "underlined",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label"]),
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(formData).password,
                                        "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                                        rules: unref(formRules).password,
                                        label: _ctx.$t("password"),
                                        variant: "underlined",
                                        onKeyup: withKeys(submit, ["enter"]),
                                        clearable: "",
                                        type: unref(passwordInputType),
                                        "append-inner-icon": unref(passwordInputType) === "password" ? "visibility" : "visibility_off",
                                        "onClick:appendInner": ($event) => passwordInputType.value = unref(passwordInputType) === "password" ? "text" : "password"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "label", "onKeyup", "type", "append-inner-icon", "onClick:appendInner"])
                                    ]),
                                    _: 1
                                  }, 512),
                                  unref(errorMsg) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-red"
                                  }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/account/signup"),
                                      variant: "text",
                                      color: "primary"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("createAccount")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(_component_v_btn, {
                                      color: "primary",
                                      loading: unref(submitting),
                                      onClick: submit,
                                      size: "large"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("signIn")), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/signin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signin-cde5553e.mjs.map
