import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "vuetify-app"
declare module "E:/work/KiimGma/web/chatgpt-ui-main/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}