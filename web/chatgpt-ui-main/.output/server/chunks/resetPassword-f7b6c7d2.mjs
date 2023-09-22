import { ref, resolveComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, isRef, useSSRContext } from 'vue';
import { u as useRoute, b as useFetch, l as logout } from './server.mjs';
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
  __name: "resetPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      old_password: "",
      new_password1: "",
      new_password2: ""
    });
    const formRules = ref({
      old_password: [
        (v) => !!v || "Current password is required"
      ],
      new_password1: [
        (v) => !!v || "New password is required"
      ],
      new_password2: [
        (v) => !!v || "Confirm password is required",
        (v) => v === formData.value.new_password1 || "Passwords do not match"
      ]
    });
    const fieldErrors = ref({
      old_password: "",
      new_password1: "",
      new_password2: ""
    });
    const errorMsg = ref(null);
    const resetForm = ref(null);
    ref(true);
    const submitting = ref(false);
    useRoute();
    ref("password");
    const signOut = async () => {
      const { data, error } = await useFetch("/api/account/logout/", {
        method: "POST"
      }, "$jlgr8oKniG");
      if (!error.value) {
        await logout();
      }
    };
    const submit = async () => {
      errorMsg.value = null;
      const { valid } = await resetForm.value.validate();
      if (valid) {
        submitting.value = true;
        const { data, error } = await useFetch("/api/account/password/change/", {
          method: "POST",
          body: JSON.stringify(formData.value)
        }, "$tpPe0jmrOO");
        submitting.value = false;
        if (error.value) {
          if (error.value.status === 400) {
            for (const key in formData.value) {
              if (error.value.data[key]) {
                fieldErrors.value[key] = error.value.data[key][0];
              }
            }
            if (error.value.data.non_field_errors) {
              errorMsg.value = error.value.data.non_field_errors[0];
            }
          } else {
            if (error.value.data.detail) {
              errorMsg.value = error.value.data.detail;
            } else {
              errorMsg.value = "Something went wrong. Please try again.";
            }
          }
        } else {
          successDialog.value = true;
        }
      }
    };
    const handleFieldUpdate = (field) => {
      fieldErrors.value[field] = "";
    };
    const successDialog = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_form = resolveComponent("v-form");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_card_actions = resolveComponent("v-card-actions");
      const _component_v_spacer = resolveComponent("v-spacer");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_v_card, { style: { "height": "100vh" } }, {
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
                                    _push6(`<div class="text-center text-h4"${_scopeId5}>${ssrInterpolate(_ctx.$t("resetPassword"))}</div>`);
                                    _push6(ssrRenderComponent(_component_v_card_text, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_form, {
                                            ref_key: "resetForm",
                                            ref: resetForm
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: unref(formData).old_password,
                                                  "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                                  rules: unref(formRules).old_password,
                                                  "error-messages": unref(fieldErrors).old_password,
                                                  label: _ctx.$t("currentPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: unref(formData).new_password1,
                                                  "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                                  rules: unref(formRules).new_password1,
                                                  "error-messages": unref(fieldErrors).new_password1,
                                                  label: _ctx.$t("newPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: unref(formData).new_password2,
                                                  "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                                  rules: unref(formRules).new_password2,
                                                  "error-messages": unref(fieldErrors).new_password2,
                                                  label: _ctx.$t("confirmPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: unref(formData).old_password,
                                                    "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                                    rules: unref(formRules).old_password,
                                                    "error-messages": unref(fieldErrors).old_password,
                                                    label: _ctx.$t("currentPassword"),
                                                    variant: "underlined",
                                                    clearable: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: unref(formData).new_password1,
                                                    "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                                    rules: unref(formRules).new_password1,
                                                    "error-messages": unref(fieldErrors).new_password1,
                                                    label: _ctx.$t("newPassword"),
                                                    variant: "underlined",
                                                    clearable: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: unref(formData).new_password2,
                                                    "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                                    rules: unref(formRules).new_password2,
                                                    "error-messages": unref(fieldErrors).new_password2,
                                                    label: _ctx.$t("confirmPassword"),
                                                    variant: "underlined",
                                                    clearable: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
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
                                            block: "",
                                            color: "primary",
                                            loading: unref(submitting),
                                            onClick: submit,
                                            size: "large"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(_ctx.$t("submit"))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode(_component_v_form, {
                                              ref_key: "resetForm",
                                              ref: resetForm
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_text_field, {
                                                  modelValue: unref(formData).old_password,
                                                  "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                                  rules: unref(formRules).old_password,
                                                  "error-messages": unref(fieldErrors).old_password,
                                                  label: _ctx.$t("currentPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: unref(formData).new_password1,
                                                  "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                                  rules: unref(formRules).new_password1,
                                                  "error-messages": unref(fieldErrors).new_password1,
                                                  label: _ctx.$t("newPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: unref(formData).new_password2,
                                                  "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                                  rules: unref(formRules).new_password2,
                                                  "error-messages": unref(fieldErrors).new_password2,
                                                  label: _ctx.$t("confirmPassword"),
                                                  variant: "underlined",
                                                  clearable: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                              ]),
                                              _: 1
                                            }, 512),
                                            unref(errorMsg) ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "text-red"
                                            }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                            createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                              createVNode(_component_v_btn, {
                                                block: "",
                                                color: "primary",
                                                loading: unref(submitting),
                                                onClick: submit,
                                                size: "large"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
                                      createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("resetPassword")), 1),
                                      createVNode(_component_v_card_text, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_form, {
                                            ref_key: "resetForm",
                                            ref: resetForm
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(formData).old_password,
                                                "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                                rules: unref(formRules).old_password,
                                                "error-messages": unref(fieldErrors).old_password,
                                                label: _ctx.$t("currentPassword"),
                                                variant: "underlined",
                                                clearable: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(formData).new_password1,
                                                "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                                rules: unref(formRules).new_password1,
                                                "error-messages": unref(fieldErrors).new_password1,
                                                label: _ctx.$t("newPassword"),
                                                variant: "underlined",
                                                clearable: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                              createVNode(_component_v_text_field, {
                                                modelValue: unref(formData).new_password2,
                                                "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                                rules: unref(formRules).new_password2,
                                                "error-messages": unref(fieldErrors).new_password2,
                                                label: _ctx.$t("confirmPassword"),
                                                variant: "underlined",
                                                clearable: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                            ]),
                                            _: 1
                                          }, 512),
                                          unref(errorMsg) ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "text-red"
                                          }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                          createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                            createVNode(_component_v_btn, {
                                              block: "",
                                              color: "primary",
                                              loading: unref(submitting),
                                              onClick: submit,
                                              size: "large"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
                                    createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("resetPassword")), 1),
                                    createVNode(_component_v_card_text, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_form, {
                                          ref_key: "resetForm",
                                          ref: resetForm
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(formData).old_password,
                                              "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                              rules: unref(formRules).old_password,
                                              "error-messages": unref(fieldErrors).old_password,
                                              label: _ctx.$t("currentPassword"),
                                              variant: "underlined",
                                              clearable: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(formData).new_password1,
                                              "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                              rules: unref(formRules).new_password1,
                                              "error-messages": unref(fieldErrors).new_password1,
                                              label: _ctx.$t("newPassword"),
                                              variant: "underlined",
                                              clearable: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                            createVNode(_component_v_text_field, {
                                              modelValue: unref(formData).new_password2,
                                              "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                              rules: unref(formRules).new_password2,
                                              "error-messages": unref(fieldErrors).new_password2,
                                              label: _ctx.$t("confirmPassword"),
                                              variant: "underlined",
                                              clearable: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                          ]),
                                          _: 1
                                        }, 512),
                                        unref(errorMsg) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-red"
                                        }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                        createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                          createVNode(_component_v_btn, {
                                            block: "",
                                            color: "primary",
                                            loading: unref(submitting),
                                            onClick: submit,
                                            size: "large"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
                                  createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("resetPassword")), 1),
                                  createVNode(_component_v_card_text, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_form, {
                                        ref_key: "resetForm",
                                        ref: resetForm
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(formData).old_password,
                                            "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                            rules: unref(formRules).old_password,
                                            "error-messages": unref(fieldErrors).old_password,
                                            label: _ctx.$t("currentPassword"),
                                            variant: "underlined",
                                            clearable: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(formData).new_password1,
                                            "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                            rules: unref(formRules).new_password1,
                                            "error-messages": unref(fieldErrors).new_password1,
                                            label: _ctx.$t("newPassword"),
                                            variant: "underlined",
                                            clearable: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                          createVNode(_component_v_text_field, {
                                            modelValue: unref(formData).new_password2,
                                            "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                            rules: unref(formRules).new_password2,
                                            "error-messages": unref(fieldErrors).new_password2,
                                            label: _ctx.$t("confirmPassword"),
                                            variant: "underlined",
                                            clearable: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                        ]),
                                        _: 1
                                      }, 512),
                                      unref(errorMsg) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-red"
                                      }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                      createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                        createVNode(_component_v_btn, {
                                          block: "",
                                          color: "primary",
                                          loading: unref(submitting),
                                          onClick: submit,
                                          size: "large"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
                                createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("resetPassword")), 1),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_form, {
                                      ref_key: "resetForm",
                                      ref: resetForm
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(formData).old_password,
                                          "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                          rules: unref(formRules).old_password,
                                          "error-messages": unref(fieldErrors).old_password,
                                          label: _ctx.$t("currentPassword"),
                                          variant: "underlined",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(formData).new_password1,
                                          "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                          rules: unref(formRules).new_password1,
                                          "error-messages": unref(fieldErrors).new_password1,
                                          label: _ctx.$t("newPassword"),
                                          variant: "underlined",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(formData).new_password2,
                                          "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                          rules: unref(formRules).new_password2,
                                          "error-messages": unref(fieldErrors).new_password2,
                                          label: _ctx.$t("confirmPassword"),
                                          variant: "underlined",
                                          clearable: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                      ]),
                                      _: 1
                                    }, 512),
                                    unref(errorMsg) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-red"
                                    }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                      createVNode(_component_v_btn, {
                                        block: "",
                                        color: "primary",
                                        loading: unref(submitting),
                                        onClick: submit,
                                        size: "large"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
                              createVNode("div", { class: "text-center text-h4" }, toDisplayString(_ctx.$t("resetPassword")), 1),
                              createVNode(_component_v_card_text, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_form, {
                                    ref_key: "resetForm",
                                    ref: resetForm
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(formData).old_password,
                                        "onUpdate:modelValue": [($event) => unref(formData).old_password = $event, ($event) => handleFieldUpdate("old_password")],
                                        rules: unref(formRules).old_password,
                                        "error-messages": unref(fieldErrors).old_password,
                                        label: _ctx.$t("currentPassword"),
                                        variant: "underlined",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(formData).new_password1,
                                        "onUpdate:modelValue": [($event) => unref(formData).new_password1 = $event, ($event) => handleFieldUpdate("new_password1")],
                                        rules: unref(formRules).new_password1,
                                        "error-messages": unref(fieldErrors).new_password1,
                                        label: _ctx.$t("newPassword"),
                                        variant: "underlined",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"]),
                                      createVNode(_component_v_text_field, {
                                        modelValue: unref(formData).new_password2,
                                        "onUpdate:modelValue": [($event) => unref(formData).new_password2 = $event, ($event) => handleFieldUpdate("new_password2")],
                                        rules: unref(formRules).new_password2,
                                        "error-messages": unref(fieldErrors).new_password2,
                                        label: _ctx.$t("confirmPassword"),
                                        variant: "underlined",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "error-messages", "label"])
                                    ]),
                                    _: 1
                                  }, 512),
                                  unref(errorMsg) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-red"
                                  }, toDisplayString(unref(errorMsg)), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-5 d-flex justify-space-between" }, [
                                    createVNode(_component_v_btn, {
                                      block: "",
                                      color: "primary",
                                      loading: unref(submitting),
                                      onClick: submit,
                                      size: "large"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t("submit")), 1)
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
      _push(ssrRenderComponent(_component_v_dialog, {
        modelValue: unref(successDialog),
        "onUpdate:modelValue": ($event) => isRef(successDialog) ? successDialog.value = $event : null,
        persistent: "",
        width: "auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_title, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("yourPasswordHasBeenReset"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("yourPasswordHasBeenReset")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_card_text, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("nowYouNeedToSignInAgain"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("nowYouNeedToSignInAgain")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_card_actions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_spacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_btn, {
                          color: "green-darken-1",
                          variant: "text",
                          onClick: signOut
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("agree"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("agree")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_spacer),
                          createVNode(_component_v_btn, {
                            color: "green-darken-1",
                            variant: "text",
                            onClick: signOut
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("agree")), 1)
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
                    createVNode(_component_v_card_title, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("yourPasswordHasBeenReset")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_card_text, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("nowYouNeedToSignInAgain")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_card_actions, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_spacer),
                        createVNode(_component_v_btn, {
                          color: "green-darken-1",
                          variant: "text",
                          onClick: signOut
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("agree")), 1)
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
              createVNode(_component_v_card, null, {
                default: withCtx(() => [
                  createVNode(_component_v_card_title, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("yourPasswordHasBeenReset")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_card_text, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("nowYouNeedToSignInAgain")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_card_actions, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_spacer),
                      createVNode(_component_v_btn, {
                        color: "green-darken-1",
                        variant: "text",
                        onClick: signOut
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("agree")), 1)
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/resetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resetPassword-f7b6c7d2.mjs.map
