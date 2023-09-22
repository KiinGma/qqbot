import { resolveComponent, mergeProps, withCtx, createVNode, renderSlot, useSSRContext, computed, ref, unref, isRef, createSlots, createTextVNode, toDisplayString, withDirectives, vShow, openBlock, createBlock, Fragment, renderList, createCommentVNode, withKeys, withModifiers, defineComponent, createElementBlock } from 'vue';
import { _ as _export_sfc, u as useRoute, e as useNuxtApp, w as useDisplay, a as useUser, f as useI18n, x as useConversations, o as useDrawer, v as useState, h as useAuthFetch, n as navigateTo, y as getConversations, b as useFetch, l as logout, j as useApiKey, t as setApiKey } from './server.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_2 } from './Languages-f34943de.mjs';
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

const _sfc_main$2 = {
  __name: "ApiKeyDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const dialog = ref(false);
    const apiKey = useApiKey();
    ref("");
    const editable = ref(false);
    const warningText = ref(null);
    const save = async () => {
      setApiKey(apiKey.value);
      editable.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card_actions = resolveComponent("v-card-actions");
      const _component_v_alert = resolveComponent("v-alert");
      const _component_v_spacer = resolveComponent("v-spacer");
      _push(ssrRenderComponent(_component_v_dialog, mergeProps({
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        persistent: ""
      }, _attrs), {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_list_item, mergeProps({ rounded: "xl" }, props, {
              "prepend-icon": "vpn_key",
              color: "primary"
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("setApiKey"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("setApiKey")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_list_item, mergeProps({ rounded: "xl" }, props, {
                "prepend-icon": "vpn_key",
                color: "primary"
              }), {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("setApiKey")), 1)
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-h5"${_scopeId3}>${ssrInterpolate(_ctx.$t("openAIApiKey"))}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("openAIApiKey")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_card_text, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>${ssrInterpolate(_ctx.$t("getAKey"))}: <a target="_blank" href="https://platform.openai.com/account/api-keys"${_scopeId3}>https://platform.openai.com/account/api-keys</a></div><div class="mt-5 d-flex align-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_v_text_field, {
                          modelValue: unref(apiKey),
                          "onUpdate:modelValue": ($event) => isRef(apiKey) ? apiKey.value = $event : null,
                          label: "Api Key",
                          "hide-details": "",
                          clearable: "",
                          disabled: !unref(editable)
                        }, null, _parent4, _scopeId3));
                        if (unref(editable)) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            class: "ml-3",
                            icon: "done",
                            onClick: save
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            class: "ml-3",
                            icon: "edit",
                            onClick: ($event) => editable.value = true
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createTextVNode(toDisplayString(_ctx.$t("getAKey")) + ": ", 1),
                            createVNode("a", {
                              target: "_blank",
                              href: "https://platform.openai.com/account/api-keys"
                            }, "https://platform.openai.com/account/api-keys")
                          ]),
                          createVNode("div", { class: "mt-5 d-flex align-center" }, [
                            createVNode(_component_v_text_field, {
                              modelValue: unref(apiKey),
                              "onUpdate:modelValue": ($event) => isRef(apiKey) ? apiKey.value = $event : null,
                              label: "Api Key",
                              "hide-details": "",
                              clearable: "",
                              disabled: !unref(editable)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                            unref(editable) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_component_v_btn, {
                                class: "ml-3",
                                icon: "done",
                                onClick: save
                              })
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode(_component_v_btn, {
                                class: "ml-3",
                                icon: "edit",
                                onClick: ($event) => editable.value = true
                              }, null, 8, ["onClick"])
                            ]))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_card_actions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(warningText)) {
                          _push4(ssrRenderComponent(_component_v_alert, {
                            density: "compact",
                            type: "warning",
                            text: unref(warningText)
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_v_spacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_btn, {
                          color: "primary",
                          onClick: ($event) => dialog.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Close `);
                            } else {
                              return [
                                createTextVNode(" Close ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          unref(warningText) ? (openBlock(), createBlock(_component_v_alert, {
                            key: 0,
                            density: "compact",
                            type: "warning",
                            text: unref(warningText)
                          }, null, 8, ["text"])) : createCommentVNode("", true),
                          createVNode(_component_v_spacer),
                          createVNode(_component_v_btn, {
                            color: "primary",
                            onClick: ($event) => dialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Close ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_card_title, null, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("openAIApiKey")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_divider),
                    createVNode(_component_v_card_text, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createTextVNode(toDisplayString(_ctx.$t("getAKey")) + ": ", 1),
                          createVNode("a", {
                            target: "_blank",
                            href: "https://platform.openai.com/account/api-keys"
                          }, "https://platform.openai.com/account/api-keys")
                        ]),
                        createVNode("div", { class: "mt-5 d-flex align-center" }, [
                          createVNode(_component_v_text_field, {
                            modelValue: unref(apiKey),
                            "onUpdate:modelValue": ($event) => isRef(apiKey) ? apiKey.value = $event : null,
                            label: "Api Key",
                            "hide-details": "",
                            clearable: "",
                            disabled: !unref(editable)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                          unref(editable) ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(_component_v_btn, {
                              class: "ml-3",
                              icon: "done",
                              onClick: save
                            })
                          ])) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode(_component_v_btn, {
                              class: "ml-3",
                              icon: "edit",
                              onClick: ($event) => editable.value = true
                            }, null, 8, ["onClick"])
                          ]))
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_divider),
                    createVNode(_component_v_card_actions, null, {
                      default: withCtx(() => [
                        unref(warningText) ? (openBlock(), createBlock(_component_v_alert, {
                          key: 0,
                          density: "compact",
                          type: "warning",
                          text: unref(warningText)
                        }, null, 8, ["text"])) : createCommentVNode("", true),
                        createVNode(_component_v_spacer),
                        createVNode(_component_v_btn, {
                          color: "primary",
                          onClick: ($event) => dialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Close ")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_card, null, {
                default: withCtx(() => [
                  createVNode(_component_v_card_title, null, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-h5" }, toDisplayString(_ctx.$t("openAIApiKey")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_divider),
                  createVNode(_component_v_card_text, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createTextVNode(toDisplayString(_ctx.$t("getAKey")) + ": ", 1),
                        createVNode("a", {
                          target: "_blank",
                          href: "https://platform.openai.com/account/api-keys"
                        }, "https://platform.openai.com/account/api-keys")
                      ]),
                      createVNode("div", { class: "mt-5 d-flex align-center" }, [
                        createVNode(_component_v_text_field, {
                          modelValue: unref(apiKey),
                          "onUpdate:modelValue": ($event) => isRef(apiKey) ? apiKey.value = $event : null,
                          label: "Api Key",
                          "hide-details": "",
                          clearable: "",
                          disabled: !unref(editable)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        unref(editable) ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_v_btn, {
                            class: "ml-3",
                            icon: "done",
                            onClick: save
                          })
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_v_btn, {
                            class: "ml-3",
                            icon: "edit",
                            onClick: ($event) => editable.value = true
                          }, null, 8, ["onClick"])
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_divider),
                  createVNode(_component_v_card_actions, null, {
                    default: withCtx(() => [
                      unref(warningText) ? (openBlock(), createBlock(_component_v_alert, {
                        key: 0,
                        density: "compact",
                        type: "warning",
                        text: unref(warningText)
                      }, null, 8, ["text"])) : createCommentVNode("", true),
                      createVNode(_component_v_spacer),
                      createVNode(_component_v_btn, {
                        color: "primary",
                        onClick: ($event) => dialog.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Close ")
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
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ApiKeyDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$2;
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = {
  __name: "NavigationDrawer",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { $i18n, $settings } = useNuxtApp();
    const colorMode = useColorMode();
    const { mdAndUp } = useDisplay();
    const drawerPermanent = computed(() => {
      return mdAndUp.value;
    });
    const user = useUser();
    const themes = ref([
      { title: $i18n.t("lightMode"), value: "light" },
      { title: $i18n.t("darkMode"), value: "dark" },
      { title: $i18n.t("followSystem"), value: "system" }
    ]);
    const setTheme = (theme) => {
      colorMode.preference = theme;
    };
    const feedback = () => {
      window.open("https://github.com/WongSaang/chatgpt-ui/issues", "_blank");
    };
    useI18n();
    const conversations = useConversations();
    const editingConversation = ref(false);
    const deletingConversationIndex = ref(false);
    const editConversation = (index) => {
      editingConversation.value = conversations.value[index];
    };
    const updateConversation = async (index) => {
      editingConversation.value.updating = true;
      const { data, error } = await useAuthFetch(`/api/chat/conversations/${editingConversation.value.id}/`, {
        method: "PUT",
        body: JSON.stringify({
          topic: editingConversation.value.topic
        })
      });
      if (!error.value) {
        editingConversation.value.updating = false;
        conversations.value[index] = editingConversation.value;
      }
      conversations.value[index].updating = false;
      editingConversation.value = false;
    };
    const deleteConversation = async (index) => {
      deletingConversationIndex.value = index;
      const { data, error } = await useAuthFetch(`/api/chat/conversations/${conversations.value[index].id}/`, {
        method: "DELETE"
      });
      deletingConversationIndex.value = null;
      if (!error.value) {
        const deletingConversation = conversations.value[index];
        conversations.value.splice(index, 1);
        if (route.params.id && parseInt(route.params.id) === deletingConversation.id) {
          await navigateTo("/");
        }
      }
    };
    const snackbar = ref(false);
    const snackbarText = ref("");
    const loadMessage = async (conversation_id) => {
      const { data, error } = await useAuthFetch(`/api/chat/messages/?conversationId=${conversation_id}`);
      if (!error.value) {
        return data.value;
      }
      return error.value;
    };
    const exportConversation = async (index) => {
      let conversation = conversations.value[index];
      let data = {};
      data.conversation_topic = conversation.topic;
      data.messages = [];
      let messages = await loadMessage(conversation.id);
      for (let message of messages) {
        let msg = {};
        msg.role = message.is_bot ? "assistant" : "user";
        msg.content = message.message;
        data.messages.push(msg);
      }
      let file_content = JSON.stringify(data);
      let file_name = `${conversation.topic}_${ new Date()}`.replace(/[\/\\:*?"<>]/g, "_");
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(file_content)
      );
      element.setAttribute("download", file_name);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };
    const openImportFileChooser = async () => {
      let input_element = document.getElementById("import_conversation_input");
      input_element.click();
    };
    const clearConversations = async () => {
      deletingConversations.value = true;
      const { data, error } = await useAuthFetch(`/api/chat/conversations/delete_all`, {
        method: "DELETE"
      });
      if (!error.value) {
        loadConversations();
        clearConfirmDialog.value = false;
      }
      deletingConversations.value = false;
    };
    const clearConfirmDialog = ref(false);
    const deletingConversations = ref(false);
    const loadingConversations = ref(false);
    const loadConversations = async () => {
      loadingConversations.value = true;
      conversations.value = await getConversations();
      loadingConversations.value = false;
    };
    const signOut = async () => {
      const { data, error } = await useFetch("/api/account/logout/", {
        method: "POST"
      }, "$6Ayz9qdghn");
      if (!error.value) {
        await logout();
      }
    };
    const drawer = useDrawer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_hover = resolveComponent("v-hover");
      const _component_v_expansion_panels = resolveComponent("v-expansion-panels");
      const _component_v_expansion_panel = resolveComponent("v-expansion-panel");
      const _component_v_expansion_panel_title = resolveComponent("v-expansion-panel-title");
      const _component_v_expansion_panel_text = resolveComponent("v-expansion-panel-text");
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_card_actions = resolveComponent("v-card-actions");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_ApiKeyDialog = __nuxt_component_0$1;
      const _component_ModelParameters = __nuxt_component_1;
      const _component_SettingsLanguages = __nuxt_component_2;
      const _component_v_snackbar = resolveComponent("v-snackbar");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_v_navigation_drawer, {
        modelValue: unref(drawer),
        "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
        permanent: unref(drawerPermanent),
        width: "300"
      }, createSlots({
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_divider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_expansion_panels, { style: { "flex-direction": "column" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_expansion_panel, { rounded: "rounded-pill" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_expansion_panel_title, {
                          "expand-icon": "add",
                          "collapse-icon": "close"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_icon, {
                                icon: "settings",
                                class: "mr-4"
                              }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(_ctx.$t("settingDraw"))}`);
                            } else {
                              return [
                                createVNode(_component_v_icon, {
                                  icon: "settings",
                                  class: "mr-4"
                                }),
                                createTextVNode(" " + toDisplayString(_ctx.$t("settingDraw")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_expansion_panel_text, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="px-1"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_list, { density: "compact" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_dialog, {
                                      modelValue: unref(clearConfirmDialog),
                                      "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                      persistent: ""
                                    }, {
                                      activator: withCtx(({ props }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            "prepend-icon": "delete_forever",
                                            title: _ctx.$t("clearConversations")
                                          }), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_list_item, mergeProps(props, {
                                              rounded: "xl",
                                              "prepend-icon": "delete_forever",
                                              title: _ctx.$t("clearConversations")
                                            }), null, 16, ["title"])
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_card, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_card_title, { class: "text-h5" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Are you sure you want to delete all conversations? `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Are you sure you want to delete all conversations? ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_card_text, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.`);
                                                    } else {
                                                      return [
                                                        createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_card_actions, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_v_spacer, null, null, _parent9, _scopeId8));
                                                      _push9(ssrRenderComponent(_component_v_btn, {
                                                        color: "green-darken-1",
                                                        variant: "text",
                                                        onClick: ($event) => clearConfirmDialog.value = false,
                                                        class: "text-none"
                                                      }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(` Cancel deletion `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Cancel deletion ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                      _push9(ssrRenderComponent(_component_v_btn, {
                                                        color: "green-darken-1",
                                                        variant: "text",
                                                        onClick: clearConversations,
                                                        class: "text-none",
                                                        loading: unref(deletingConversations)
                                                      }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(` Confirm deletion `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Confirm deletion ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_v_spacer),
                                                        createVNode(_component_v_btn, {
                                                          color: "green-darken-1",
                                                          variant: "text",
                                                          onClick: ($event) => clearConfirmDialog.value = false,
                                                          class: "text-none"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" Cancel deletion ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"]),
                                                        createVNode(_component_v_btn, {
                                                          color: "green-darken-1",
                                                          variant: "text",
                                                          onClick: clearConversations,
                                                          class: "text-none",
                                                          loading: unref(deletingConversations)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" Confirm deletion ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["loading"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_card_title, { class: "text-h5" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Are you sure you want to delete all conversations? ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_card_text, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_card_actions, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_spacer),
                                                      createVNode(_component_v_btn, {
                                                        color: "green-darken-1",
                                                        variant: "text",
                                                        onClick: ($event) => clearConfirmDialog.value = false,
                                                        class: "text-none"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Cancel deletion ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(_component_v_btn, {
                                                        color: "green-darken-1",
                                                        variant: "text",
                                                        onClick: clearConversations,
                                                        class: "text-none",
                                                        loading: unref(deletingConversations)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Confirm deletion ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["loading"])
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_card, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_card_title, { class: "text-h5" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Are you sure you want to delete all conversations? ")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_card_text, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_card_actions, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_spacer),
                                                    createVNode(_component_v_btn, {
                                                      color: "green-darken-1",
                                                      variant: "text",
                                                      onClick: ($event) => clearConfirmDialog.value = false,
                                                      class: "text-none"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Cancel deletion ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(_component_v_btn, {
                                                      color: "green-darken-1",
                                                      variant: "text",
                                                      onClick: clearConversations,
                                                      class: "text-none",
                                                      loading: unref(deletingConversations)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Confirm deletion ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["loading"])
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_list_item, {
                                      rounded: "xl",
                                      "prepend-icon": "input",
                                      title: _ctx.$t("importConversation"),
                                      onClick: ($event) => openImportFileChooser()
                                    }, null, _parent6, _scopeId5));
                                    if (unref($settings).open_api_key_setting === "True") {
                                      _push6(ssrRenderComponent(_component_ApiKeyDialog, null, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(_component_ModelParameters, null, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_menu, null, {
                                      activator: withCtx(({ props }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            title: _ctx.$t("themeMode")
                                          }), {
                                            prepend: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_icon, {
                                                  style: _ctx.$colorMode.value === "light" ? null : { display: "none" },
                                                  icon: "light_mode"
                                                }, null, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_icon, {
                                                  style: _ctx.$colorMode.value !== "light" ? null : { display: "none" },
                                                  icon: "dark_mode"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                                    [vShow, _ctx.$colorMode.value === "light"]
                                                  ]),
                                                  withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                                    [vShow, _ctx.$colorMode.value !== "light"]
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_list_item, mergeProps(props, {
                                              rounded: "xl",
                                              title: _ctx.$t("themeMode")
                                            }), {
                                              prepend: withCtx(() => [
                                                withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                                  [vShow, _ctx.$colorMode.value === "light"]
                                                ]),
                                                withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                                  [vShow, _ctx.$colorMode.value !== "light"]
                                                ])
                                              ]),
                                              _: 2
                                            }, 1040, ["title"])
                                          ];
                                        }
                                      }),
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_list, { "bg-color": "white" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(unref(themes), (theme, idx) => {
                                                  _push8(ssrRenderComponent(_component_v_list_item, {
                                                    key: idx,
                                                    onClick: ($event) => setTheme(theme.value)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(_component_v_list_item_title, null, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`${ssrInterpolate(theme.title)}`);
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(theme.title), 1)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(_component_v_list_item_title, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(theme.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                                    return openBlock(), createBlock(_component_v_list_item, {
                                                      key: idx,
                                                      onClick: ($event) => setTheme(theme.value)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_list_item_title, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(theme.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_list, { "bg-color": "white" }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                                  return openBlock(), createBlock(_component_v_list_item, {
                                                    key: idx,
                                                    onClick: ($event) => setTheme(theme.value)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_list_item_title, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(theme.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"]);
                                                }), 128))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_SettingsLanguages, null, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_list_item, {
                                      rounded: "xl",
                                      "prepend-icon": "help_outline",
                                      title: _ctx.$t("feedback"),
                                      onClick: feedback
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_dialog, {
                                        modelValue: unref(clearConfirmDialog),
                                        "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                        persistent: ""
                                      }, {
                                        activator: withCtx(({ props }) => [
                                          createVNode(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            "prepend-icon": "delete_forever",
                                            title: _ctx.$t("clearConversations")
                                          }), null, 16, ["title"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_v_card, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_card_title, { class: "text-h5" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Are you sure you want to delete all conversations? ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_card_text, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_card_actions, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_v_spacer),
                                                  createVNode(_component_v_btn, {
                                                    color: "green-darken-1",
                                                    variant: "text",
                                                    onClick: ($event) => clearConfirmDialog.value = false,
                                                    class: "text-none"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Cancel deletion ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(_component_v_btn, {
                                                    color: "green-darken-1",
                                                    variant: "text",
                                                    onClick: clearConversations,
                                                    class: "text-none",
                                                    loading: unref(deletingConversations)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Confirm deletion ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["loading"])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_v_list_item, {
                                        rounded: "xl",
                                        "prepend-icon": "input",
                                        title: _ctx.$t("importConversation"),
                                        onClick: ($event) => openImportFileChooser()
                                      }, null, 8, ["title", "onClick"]),
                                      unref($settings).open_api_key_setting === "True" ? (openBlock(), createBlock(_component_ApiKeyDialog, { key: 0 })) : createCommentVNode("", true),
                                      createVNode(_component_ModelParameters),
                                      createVNode(_component_v_menu, null, {
                                        activator: withCtx(({ props }) => [
                                          createVNode(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            title: _ctx.$t("themeMode")
                                          }), {
                                            prepend: withCtx(() => [
                                              withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                                [vShow, _ctx.$colorMode.value === "light"]
                                              ]),
                                              withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                                [vShow, _ctx.$colorMode.value !== "light"]
                                              ])
                                            ]),
                                            _: 2
                                          }, 1040, ["title"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_v_list, { "bg-color": "white" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                                return openBlock(), createBlock(_component_v_list_item, {
                                                  key: idx,
                                                  onClick: ($event) => setTheme(theme.value)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_list_item_title, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(theme.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SettingsLanguages),
                                      createVNode(_component_v_list_item, {
                                        rounded: "xl",
                                        "prepend-icon": "help_outline",
                                        title: _ctx.$t("feedback"),
                                        onClick: feedback
                                      }, null, 8, ["title"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "px-1" }, [
                                  createVNode(_component_v_list, { density: "compact" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_dialog, {
                                        modelValue: unref(clearConfirmDialog),
                                        "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                        persistent: ""
                                      }, {
                                        activator: withCtx(({ props }) => [
                                          createVNode(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            "prepend-icon": "delete_forever",
                                            title: _ctx.$t("clearConversations")
                                          }), null, 16, ["title"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_v_card, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_card_title, { class: "text-h5" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Are you sure you want to delete all conversations? ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_card_text, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_card_actions, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_v_spacer),
                                                  createVNode(_component_v_btn, {
                                                    color: "green-darken-1",
                                                    variant: "text",
                                                    onClick: ($event) => clearConfirmDialog.value = false,
                                                    class: "text-none"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Cancel deletion ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(_component_v_btn, {
                                                    color: "green-darken-1",
                                                    variant: "text",
                                                    onClick: clearConversations,
                                                    class: "text-none",
                                                    loading: unref(deletingConversations)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Confirm deletion ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["loading"])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_v_list_item, {
                                        rounded: "xl",
                                        "prepend-icon": "input",
                                        title: _ctx.$t("importConversation"),
                                        onClick: ($event) => openImportFileChooser()
                                      }, null, 8, ["title", "onClick"]),
                                      unref($settings).open_api_key_setting === "True" ? (openBlock(), createBlock(_component_ApiKeyDialog, { key: 0 })) : createCommentVNode("", true),
                                      createVNode(_component_ModelParameters),
                                      createVNode(_component_v_menu, null, {
                                        activator: withCtx(({ props }) => [
                                          createVNode(_component_v_list_item, mergeProps(props, {
                                            rounded: "xl",
                                            title: _ctx.$t("themeMode")
                                          }), {
                                            prepend: withCtx(() => [
                                              withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                                [vShow, _ctx.$colorMode.value === "light"]
                                              ]),
                                              withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                                [vShow, _ctx.$colorMode.value !== "light"]
                                              ])
                                            ]),
                                            _: 2
                                          }, 1040, ["title"])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_v_list, { "bg-color": "white" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                                return openBlock(), createBlock(_component_v_list_item, {
                                                  key: idx,
                                                  onClick: ($event) => setTheme(theme.value)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_list_item_title, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(theme.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SettingsLanguages),
                                      createVNode(_component_v_list_item, {
                                        rounded: "xl",
                                        "prepend-icon": "help_outline",
                                        title: _ctx.$t("feedback"),
                                        onClick: feedback
                                      }, null, 8, ["title"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_expansion_panel_title, {
                            "expand-icon": "add",
                            "collapse-icon": "close"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_icon, {
                                icon: "settings",
                                class: "mr-4"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("settingDraw")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_expansion_panel_text, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "px-1" }, [
                                createVNode(_component_v_list, { density: "compact" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_dialog, {
                                      modelValue: unref(clearConfirmDialog),
                                      "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                      persistent: ""
                                    }, {
                                      activator: withCtx(({ props }) => [
                                        createVNode(_component_v_list_item, mergeProps(props, {
                                          rounded: "xl",
                                          "prepend-icon": "delete_forever",
                                          title: _ctx.$t("clearConversations")
                                        }), null, 16, ["title"])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_v_card, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_card_title, { class: "text-h5" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Are you sure you want to delete all conversations? ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_card_text, null, {
                                              default: withCtx(() => [
                                                createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_card_actions, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_spacer),
                                                createVNode(_component_v_btn, {
                                                  color: "green-darken-1",
                                                  variant: "text",
                                                  onClick: ($event) => clearConfirmDialog.value = false,
                                                  class: "text-none"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Cancel deletion ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(_component_v_btn, {
                                                  color: "green-darken-1",
                                                  variant: "text",
                                                  onClick: clearConversations,
                                                  class: "text-none",
                                                  loading: unref(deletingConversations)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Confirm deletion ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["loading"])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(_component_v_list_item, {
                                      rounded: "xl",
                                      "prepend-icon": "input",
                                      title: _ctx.$t("importConversation"),
                                      onClick: ($event) => openImportFileChooser()
                                    }, null, 8, ["title", "onClick"]),
                                    unref($settings).open_api_key_setting === "True" ? (openBlock(), createBlock(_component_ApiKeyDialog, { key: 0 })) : createCommentVNode("", true),
                                    createVNode(_component_ModelParameters),
                                    createVNode(_component_v_menu, null, {
                                      activator: withCtx(({ props }) => [
                                        createVNode(_component_v_list_item, mergeProps(props, {
                                          rounded: "xl",
                                          title: _ctx.$t("themeMode")
                                        }), {
                                          prepend: withCtx(() => [
                                            withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                              [vShow, _ctx.$colorMode.value === "light"]
                                            ]),
                                            withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                              [vShow, _ctx.$colorMode.value !== "light"]
                                            ])
                                          ]),
                                          _: 2
                                        }, 1040, ["title"])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_v_list, { "bg-color": "white" }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                              return openBlock(), createBlock(_component_v_list_item, {
                                                key: idx,
                                                onClick: ($event) => setTheme(theme.value)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_v_list_item_title, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(theme.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SettingsLanguages),
                                    createVNode(_component_v_list_item, {
                                      rounded: "xl",
                                      "prepend-icon": "help_outline",
                                      title: _ctx.$t("feedback"),
                                      onClick: feedback
                                    }, null, 8, ["title"])
                                  ]),
                                  _: 1
                                })
                              ])
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
                    createVNode(_component_v_expansion_panel, { rounded: "rounded-pill" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_expansion_panel_title, {
                          "expand-icon": "add",
                          "collapse-icon": "close"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_icon, {
                              icon: "settings",
                              class: "mr-4"
                            }),
                            createTextVNode(" " + toDisplayString(_ctx.$t("settingDraw")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_expansion_panel_text, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "px-1" }, [
                              createVNode(_component_v_list, { density: "compact" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_dialog, {
                                    modelValue: unref(clearConfirmDialog),
                                    "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                    persistent: ""
                                  }, {
                                    activator: withCtx(({ props }) => [
                                      createVNode(_component_v_list_item, mergeProps(props, {
                                        rounded: "xl",
                                        "prepend-icon": "delete_forever",
                                        title: _ctx.$t("clearConversations")
                                      }), null, 16, ["title"])
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_v_card, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_card_title, { class: "text-h5" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Are you sure you want to delete all conversations? ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_card_text, null, {
                                            default: withCtx(() => [
                                              createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_card_actions, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_spacer),
                                              createVNode(_component_v_btn, {
                                                color: "green-darken-1",
                                                variant: "text",
                                                onClick: ($event) => clearConfirmDialog.value = false,
                                                class: "text-none"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Cancel deletion ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(_component_v_btn, {
                                                color: "green-darken-1",
                                                variant: "text",
                                                onClick: clearConversations,
                                                class: "text-none",
                                                loading: unref(deletingConversations)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Confirm deletion ")
                                                ]),
                                                _: 1
                                              }, 8, ["loading"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_v_list_item, {
                                    rounded: "xl",
                                    "prepend-icon": "input",
                                    title: _ctx.$t("importConversation"),
                                    onClick: ($event) => openImportFileChooser()
                                  }, null, 8, ["title", "onClick"]),
                                  unref($settings).open_api_key_setting === "True" ? (openBlock(), createBlock(_component_ApiKeyDialog, { key: 0 })) : createCommentVNode("", true),
                                  createVNode(_component_ModelParameters),
                                  createVNode(_component_v_menu, null, {
                                    activator: withCtx(({ props }) => [
                                      createVNode(_component_v_list_item, mergeProps(props, {
                                        rounded: "xl",
                                        title: _ctx.$t("themeMode")
                                      }), {
                                        prepend: withCtx(() => [
                                          withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                            [vShow, _ctx.$colorMode.value === "light"]
                                          ]),
                                          withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                            [vShow, _ctx.$colorMode.value !== "light"]
                                          ])
                                        ]),
                                        _: 2
                                      }, 1040, ["title"])
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_v_list, { "bg-color": "white" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                            return openBlock(), createBlock(_component_v_list_item, {
                                              key: idx,
                                              onClick: ($event) => setTheme(theme.value)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_list_item_title, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(theme.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SettingsLanguages),
                                  createVNode(_component_v_list_item, {
                                    rounded: "xl",
                                    "prepend-icon": "help_outline",
                                    title: _ctx.$t("feedback"),
                                    onClick: feedback
                                  }, null, 8, ["title"])
                                ]),
                                _: 1
                              })
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_divider),
              createVNode(_component_v_expansion_panels, { style: { "flex-direction": "column" } }, {
                default: withCtx(() => [
                  createVNode(_component_v_expansion_panel, { rounded: "rounded-pill" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_expansion_panel_title, {
                        "expand-icon": "add",
                        "collapse-icon": "close"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_icon, {
                            icon: "settings",
                            class: "mr-4"
                          }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("settingDraw")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_expansion_panel_text, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "px-1" }, [
                            createVNode(_component_v_list, { density: "compact" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_dialog, {
                                  modelValue: unref(clearConfirmDialog),
                                  "onUpdate:modelValue": ($event) => isRef(clearConfirmDialog) ? clearConfirmDialog.value = $event : null,
                                  persistent: ""
                                }, {
                                  activator: withCtx(({ props }) => [
                                    createVNode(_component_v_list_item, mergeProps(props, {
                                      rounded: "xl",
                                      "prepend-icon": "delete_forever",
                                      title: _ctx.$t("clearConversations")
                                    }), null, 16, ["title"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_v_card, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_card_title, { class: "text-h5" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Are you sure you want to delete all conversations? ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_card_text, null, {
                                          default: withCtx(() => [
                                            createTextVNode("This will be a permanent deletion and cannot be retrieved once deleted. Please proceed with caution.")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_card_actions, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_spacer),
                                            createVNode(_component_v_btn, {
                                              color: "green-darken-1",
                                              variant: "text",
                                              onClick: ($event) => clearConfirmDialog.value = false,
                                              class: "text-none"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Cancel deletion ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(_component_v_btn, {
                                              color: "green-darken-1",
                                              variant: "text",
                                              onClick: clearConversations,
                                              class: "text-none",
                                              loading: unref(deletingConversations)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Confirm deletion ")
                                              ]),
                                              _: 1
                                            }, 8, ["loading"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_v_list_item, {
                                  rounded: "xl",
                                  "prepend-icon": "input",
                                  title: _ctx.$t("importConversation"),
                                  onClick: ($event) => openImportFileChooser()
                                }, null, 8, ["title", "onClick"]),
                                unref($settings).open_api_key_setting === "True" ? (openBlock(), createBlock(_component_ApiKeyDialog, { key: 0 })) : createCommentVNode("", true),
                                createVNode(_component_ModelParameters),
                                createVNode(_component_v_menu, null, {
                                  activator: withCtx(({ props }) => [
                                    createVNode(_component_v_list_item, mergeProps(props, {
                                      rounded: "xl",
                                      title: _ctx.$t("themeMode")
                                    }), {
                                      prepend: withCtx(() => [
                                        withDirectives(createVNode(_component_v_icon, { icon: "light_mode" }, null, 512), [
                                          [vShow, _ctx.$colorMode.value === "light"]
                                        ]),
                                        withDirectives(createVNode(_component_v_icon, { icon: "dark_mode" }, null, 512), [
                                          [vShow, _ctx.$colorMode.value !== "light"]
                                        ])
                                      ]),
                                      _: 2
                                    }, 1040, ["title"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_component_v_list, { "bg-color": "white" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (theme, idx) => {
                                          return openBlock(), createBlock(_component_v_list_item, {
                                            key: idx,
                                            onClick: ($event) => setTheme(theme.value)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_list_item_title, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(theme.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_SettingsLanguages),
                                createVNode(_component_v_list_item, {
                                  rounded: "xl",
                                  "prepend-icon": "help_outline",
                                  title: _ctx.$t("feedback"),
                                  onClick: feedback
                                }, null, 8, ["title"])
                              ]),
                              _: 1
                            })
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_list, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_list_item, {
                    style: unref(loadingConversations) ? null : { display: "none" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_list_item_title, { class: "d-flex justify-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_progress_circular, { indeterminate: "" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_progress_circular, { indeterminate: "" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
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
                      [vShow, unref(loadingConversations)]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_list, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(conversations), (conversation, cIdx) => {
                    _push3(`<!--[-->`);
                    if (unref(editingConversation) && unref(editingConversation).id === conversation.id) {
                      _push3(ssrRenderComponent(_component_v_list_item, {
                        "active-color": "primary",
                        rounded: "xl"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_v_text_field, {
                              modelValue: unref(editingConversation).topic,
                              "onUpdate:modelValue": ($event) => unref(editingConversation).topic = $event,
                              loading: unref(editingConversation).updating,
                              variant: "underlined",
                              "append-icon": "done",
                              "hide-details": "",
                              density: "compact",
                              autofocus: "",
                              onKeyup: ($event) => updateConversation(cIdx),
                              "onClick:append": ($event) => updateConversation(cIdx)
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_v_text_field, {
                                modelValue: unref(editingConversation).topic,
                                "onUpdate:modelValue": ($event) => unref(editingConversation).topic = $event,
                                loading: unref(editingConversation).updating,
                                variant: "underlined",
                                "append-icon": "done",
                                "hide-details": "",
                                density: "compact",
                                autofocus: "",
                                onKeyup: withKeys(($event) => updateConversation(cIdx), ["enter"]),
                                "onClick:append": ($event) => updateConversation(cIdx)
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onKeyup", "onClick:append"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!unref(editingConversation) || unref(editingConversation).id !== conversation.id) {
                      _push3(ssrRenderComponent(_component_v_hover, null, {
                        default: withCtx(({ isHovering, props }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_v_list_item, mergeProps({
                              rounded: "xl",
                              "active-color": "primary",
                              to: conversation.id ? `/${conversation.id}` : "/"
                            }, props), {
                              append: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div style="${ssrRenderStyle(isHovering && conversation.id ? null : { display: "none" })}"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    icon: "edit",
                                    size: "small",
                                    variant: "text",
                                    onClick: ($event) => editConversation(cIdx)
                                  }, null, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    icon: "delete",
                                    size: "small",
                                    variant: "text",
                                    loading: unref(deletingConversationIndex) === cIdx,
                                    onClick: ($event) => deleteConversation(cIdx)
                                  }, null, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    icon: "download",
                                    size: "small",
                                    variant: "text",
                                    onClick: ($event) => exportConversation(cIdx)
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    withDirectives(createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        icon: "edit",
                                        size: "small",
                                        variant: "text",
                                        onClick: withModifiers(($event) => editConversation(cIdx), ["prevent"])
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_v_btn, {
                                        icon: "delete",
                                        size: "small",
                                        variant: "text",
                                        loading: unref(deletingConversationIndex) === cIdx,
                                        onClick: withModifiers(($event) => deleteConversation(cIdx), ["prevent"])
                                      }, null, 8, ["loading", "onClick"]),
                                      createVNode(_component_v_btn, {
                                        icon: "download",
                                        size: "small",
                                        variant: "text",
                                        onClick: withModifiers(($event) => exportConversation(cIdx), ["prevent"])
                                      }, null, 8, ["onClick"])
                                    ], 512), [
                                      [vShow, isHovering && conversation.id]
                                    ])
                                  ];
                                }
                              }),
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_v_list_item_title, null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle")), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_v_list_item_title, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle")), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_v_list_item, mergeProps({
                                rounded: "xl",
                                "active-color": "primary",
                                to: conversation.id ? `/${conversation.id}` : "/"
                              }, props), {
                                append: withCtx(() => [
                                  withDirectives(createVNode("div", null, [
                                    createVNode(_component_v_btn, {
                                      icon: "edit",
                                      size: "small",
                                      variant: "text",
                                      onClick: withModifiers(($event) => editConversation(cIdx), ["prevent"])
                                    }, null, 8, ["onClick"]),
                                    createVNode(_component_v_btn, {
                                      icon: "delete",
                                      size: "small",
                                      variant: "text",
                                      loading: unref(deletingConversationIndex) === cIdx,
                                      onClick: withModifiers(($event) => deleteConversation(cIdx), ["prevent"])
                                    }, null, 8, ["loading", "onClick"]),
                                    createVNode(_component_v_btn, {
                                      icon: "download",
                                      size: "small",
                                      variant: "text",
                                      onClick: withModifiers(($event) => exportConversation(cIdx), ["prevent"])
                                    }, null, 8, ["onClick"])
                                  ], 512), [
                                    [vShow, isHovering && conversation.id]
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item_title, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle")), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1040, ["to"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(conversations), (conversation, cIdx) => {
                      return openBlock(), createBlock(Fragment, {
                        key: conversation.id
                      }, [
                        unref(editingConversation) && unref(editingConversation).id === conversation.id ? (openBlock(), createBlock(_component_v_list_item, {
                          key: 0,
                          "active-color": "primary",
                          rounded: "xl"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_text_field, {
                              modelValue: unref(editingConversation).topic,
                              "onUpdate:modelValue": ($event) => unref(editingConversation).topic = $event,
                              loading: unref(editingConversation).updating,
                              variant: "underlined",
                              "append-icon": "done",
                              "hide-details": "",
                              density: "compact",
                              autofocus: "",
                              onKeyup: withKeys(($event) => updateConversation(cIdx), ["enter"]),
                              "onClick:append": ($event) => updateConversation(cIdx)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onKeyup", "onClick:append"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        !unref(editingConversation) || unref(editingConversation).id !== conversation.id ? (openBlock(), createBlock(_component_v_hover, { key: 1 }, {
                          default: withCtx(({ isHovering, props }) => [
                            createVNode(_component_v_list_item, mergeProps({
                              rounded: "xl",
                              "active-color": "primary",
                              to: conversation.id ? `/${conversation.id}` : "/"
                            }, props), {
                              append: withCtx(() => [
                                withDirectives(createVNode("div", null, [
                                  createVNode(_component_v_btn, {
                                    icon: "edit",
                                    size: "small",
                                    variant: "text",
                                    onClick: withModifiers(($event) => editConversation(cIdx), ["prevent"])
                                  }, null, 8, ["onClick"]),
                                  createVNode(_component_v_btn, {
                                    icon: "delete",
                                    size: "small",
                                    variant: "text",
                                    loading: unref(deletingConversationIndex) === cIdx,
                                    onClick: withModifiers(($event) => deleteConversation(cIdx), ["prevent"])
                                  }, null, 8, ["loading", "onClick"]),
                                  createVNode(_component_v_btn, {
                                    icon: "download",
                                    size: "small",
                                    variant: "text",
                                    onClick: withModifiers(($event) => exportConversation(cIdx), ["prevent"])
                                  }, null, 8, ["onClick"])
                                ], 512), [
                                  [vShow, isHovering && conversation.id]
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_v_list_item_title, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1040, ["to"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-2" }, [
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
                      [vShow, unref(loadingConversations)]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_list, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(conversations), (conversation, cIdx) => {
                      return openBlock(), createBlock(Fragment, {
                        key: conversation.id
                      }, [
                        unref(editingConversation) && unref(editingConversation).id === conversation.id ? (openBlock(), createBlock(_component_v_list_item, {
                          key: 0,
                          "active-color": "primary",
                          rounded: "xl"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_text_field, {
                              modelValue: unref(editingConversation).topic,
                              "onUpdate:modelValue": ($event) => unref(editingConversation).topic = $event,
                              loading: unref(editingConversation).updating,
                              variant: "underlined",
                              "append-icon": "done",
                              "hide-details": "",
                              density: "compact",
                              autofocus: "",
                              onKeyup: withKeys(($event) => updateConversation(cIdx), ["enter"]),
                              "onClick:append": ($event) => updateConversation(cIdx)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onKeyup", "onClick:append"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        !unref(editingConversation) || unref(editingConversation).id !== conversation.id ? (openBlock(), createBlock(_component_v_hover, { key: 1 }, {
                          default: withCtx(({ isHovering, props }) => [
                            createVNode(_component_v_list_item, mergeProps({
                              rounded: "xl",
                              "active-color": "primary",
                              to: conversation.id ? `/${conversation.id}` : "/"
                            }, props), {
                              append: withCtx(() => [
                                withDirectives(createVNode("div", null, [
                                  createVNode(_component_v_btn, {
                                    icon: "edit",
                                    size: "small",
                                    variant: "text",
                                    onClick: withModifiers(($event) => editConversation(cIdx), ["prevent"])
                                  }, null, 8, ["onClick"]),
                                  createVNode(_component_v_btn, {
                                    icon: "delete",
                                    size: "small",
                                    variant: "text",
                                    loading: unref(deletingConversationIndex) === cIdx,
                                    onClick: withModifiers(($event) => deleteConversation(cIdx), ["prevent"])
                                  }, null, 8, ["loading", "onClick"]),
                                  createVNode(_component_v_btn, {
                                    icon: "download",
                                    size: "small",
                                    variant: "text",
                                    onClick: withModifiers(($event) => exportConversation(cIdx), ["prevent"])
                                  }, null, 8, ["onClick"])
                                ], 512), [
                                  [vShow, isHovering && conversation.id]
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_v_list_item_title, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(conversation.topic && conversation.topic !== "" ? conversation.topic : _ctx.$t("defaultConversationTitle")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1040, ["to"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 2
      }, [
        unref(user) ? {
          name: "prepend",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_v_list, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_list_item, {
                      title: unref(user).username,
                      subtitle: unref(user).email
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_icon, {
                            icon: "face",
                            size: "x-large"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_icon, {
                              icon: "face",
                              size: "x-large"
                            })
                          ];
                        }
                      }),
                      append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_menu, null, {
                            activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_btn, mergeProps(props, {
                                  size: "small",
                                  variant: "text",
                                  icon: "expand_more"
                                }), null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_btn, mergeProps(props, {
                                    size: "small",
                                    variant: "text",
                                    icon: "expand_more"
                                  }), null, 16)
                                ];
                              }
                            }),
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_list, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_v_list_item, {
                                        title: _ctx.$t("resetPassword"),
                                        to: "/account/resetPassword"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_v_list_item, {
                                        title: _ctx.$t("signOut"),
                                        onClick: signOut
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_v_list_item, {
                                          title: _ctx.$t("resetPassword"),
                                          to: "/account/resetPassword"
                                        }, null, 8, ["title"]),
                                        createVNode(_component_v_list_item, {
                                          title: _ctx.$t("signOut"),
                                          onClick: signOut
                                        }, null, 8, ["title"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_list, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_list_item, {
                                        title: _ctx.$t("resetPassword"),
                                        to: "/account/resetPassword"
                                      }, null, 8, ["title"]),
                                      createVNode(_component_v_list_item, {
                                        title: _ctx.$t("signOut"),
                                        onClick: signOut
                                      }, null, 8, ["title"])
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
                            createVNode(_component_v_menu, null, {
                              activator: withCtx(({ props }) => [
                                createVNode(_component_v_btn, mergeProps(props, {
                                  size: "small",
                                  variant: "text",
                                  icon: "expand_more"
                                }), null, 16)
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_v_list, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_list_item, {
                                      title: _ctx.$t("resetPassword"),
                                      to: "/account/resetPassword"
                                    }, null, 8, ["title"]),
                                    createVNode(_component_v_list_item, {
                                      title: _ctx.$t("signOut"),
                                      onClick: signOut
                                    }, null, 8, ["title"])
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
                      createVNode(_component_v_list_item, {
                        title: unref(user).username,
                        subtitle: unref(user).email
                      }, {
                        prepend: withCtx(() => [
                          createVNode(_component_v_icon, {
                            icon: "face",
                            size: "x-large"
                          })
                        ]),
                        append: withCtx(() => [
                          createVNode(_component_v_menu, null, {
                            activator: withCtx(({ props }) => [
                              createVNode(_component_v_btn, mergeProps(props, {
                                size: "small",
                                variant: "text",
                                icon: "expand_more"
                              }), null, 16)
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_v_list, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item, {
                                    title: _ctx.$t("resetPassword"),
                                    to: "/account/resetPassword"
                                  }, null, 8, ["title"]),
                                  createVNode(_component_v_list_item, {
                                    title: _ctx.$t("signOut"),
                                    onClick: signOut
                                  }, null, 8, ["title"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "subtitle"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_v_divider, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_v_list, null, {
                  default: withCtx(() => [
                    createVNode(_component_v_list_item, {
                      title: unref(user).username,
                      subtitle: unref(user).email
                    }, {
                      prepend: withCtx(() => [
                        createVNode(_component_v_icon, {
                          icon: "face",
                          size: "x-large"
                        })
                      ]),
                      append: withCtx(() => [
                        createVNode(_component_v_menu, null, {
                          activator: withCtx(({ props }) => [
                            createVNode(_component_v_btn, mergeProps(props, {
                              size: "small",
                              variant: "text",
                              icon: "expand_more"
                            }), null, 16)
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_v_list, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_list_item, {
                                  title: _ctx.$t("resetPassword"),
                                  to: "/account/resetPassword"
                                }, null, 8, ["title"]),
                                createVNode(_component_v_list_item, {
                                  title: _ctx.$t("signOut"),
                                  onClick: signOut
                                }, null, 8, ["title"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "subtitle"])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_divider)
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
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
      _push(`<input type="file" id="import_conversation_input" style="${ssrRenderStyle({ "display": "none" })}" accept="text/plain, text/json" multiple><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavigationDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_v_app = resolveComponent("v-app");
  const _component_NavigationDrawer = __nuxt_component_0;
  _push(ssrRenderComponent(_component_v_app, mergeProps({
    theme: _ctx.$colorMode.value
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NavigationDrawer, null, null, _parent2, _scopeId));
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          createVNode(_component_NavigationDrawer),
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-9104ea19.mjs.map
