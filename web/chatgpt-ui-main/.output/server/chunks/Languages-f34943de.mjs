import { useSSRContext, ref, resolveComponent, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { f as useI18n, e as useNuxtApp } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Languages",
  __ssrInlineRender: true,
  setup(__props) {
    const dialog = ref(false);
    const { locale, locales, setLocale } = useI18n();
    useNuxtApp();
    const updateLocale = (lang) => {
      setLocale(lang);
    };
    const radioIcon = (code) => {
      return code === locale.value ? "radio_button_checked" : "radio_button_unchecked";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_toolbar_items = resolveComponent("v-toolbar-items");
      const _component_v_list = resolveComponent("v-list");
      _push(ssrRenderComponent(_component_v_dialog, mergeProps({
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        fullscreen: "",
        scrim: false,
        transition: "dialog-bottom-transition"
      }, _attrs), {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_list_item, mergeProps(props, {
              rounded: "xl",
              "prepend-icon": "language",
              title: _ctx.$t("language")
            }), null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_list_item, mergeProps(props, {
                rounded: "xl",
                "prepend-icon": "language",
                title: _ctx.$t("language")
              }), null, 16, ["title"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_toolbar, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_btn, {
                          icon: "",
                          onClick: ($event) => dialog.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_icon, { icon: "close" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_icon, { icon: "close" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_toolbar_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("language"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("language")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_spacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_toolbar_items, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_btn, {
                                variant: "text",
                                onClick: ($event) => dialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Save `);
                                  } else {
                                    return [
                                      createTextVNode(" Save ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_btn, {
                                  variant: "text",
                                  onClick: ($event) => dialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Save ")
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
                          createVNode(_component_v_btn, {
                            icon: "",
                            onClick: ($event) => dialog.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_icon, { icon: "close" })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_v_toolbar_title, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("language")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_spacer),
                          createVNode(_component_v_toolbar_items, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_btn, {
                                variant: "text",
                                onClick: ($event) => dialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Save ")
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
                  _push3(ssrRenderComponent(_component_v_list, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(locales), (l) => {
                          _push4(ssrRenderComponent(_component_v_list_item, {
                            key: l.code,
                            title: l.name,
                            "append-icon": radioIcon(l.code),
                            onClick: ($event) => updateLocale(l.code)
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(locales), (l) => {
                            return openBlock(), createBlock(_component_v_list_item, {
                              key: l.code,
                              title: l.name,
                              "append-icon": radioIcon(l.code),
                              onClick: ($event) => updateLocale(l.code)
                            }, null, 8, ["title", "append-icon", "onClick"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_toolbar, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          icon: "",
                          onClick: ($event) => dialog.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_icon, { icon: "close" })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_v_toolbar_title, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("language")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_spacer),
                        createVNode(_component_v_toolbar_items, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_btn, {
                              variant: "text",
                              onClick: ($event) => dialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Save ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_list, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(locales), (l) => {
                          return openBlock(), createBlock(_component_v_list_item, {
                            key: l.code,
                            title: l.name,
                            "append-icon": radioIcon(l.code),
                            onClick: ($event) => updateLocale(l.code)
                          }, null, 8, ["title", "append-icon", "onClick"]);
                        }), 128))
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
                  createVNode(_component_v_toolbar, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_btn, {
                        icon: "",
                        onClick: ($event) => dialog.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_icon, { icon: "close" })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_v_toolbar_title, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("language")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_spacer),
                      createVNode(_component_v_toolbar_items, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_btn, {
                            variant: "text",
                            onClick: ($event) => dialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Save ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_list, null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(locales), (l) => {
                        return openBlock(), createBlock(_component_v_list_item, {
                          key: l.code,
                          title: l.name,
                          "append-icon": radioIcon(l.code),
                          onClick: ($event) => updateLocale(l.code)
                        }, null, 8, ["title", "append-icon", "onClick"]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/Languages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main;

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Languages-f34943de.mjs.map
