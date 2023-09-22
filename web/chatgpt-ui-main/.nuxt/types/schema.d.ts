import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pwa"]?: typeof import("@kevinmarrec/nuxt-pwa").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@kevinmarrec/nuxt-pwa", Exclude<NuxtConfig["pwa"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/i18n", Exclude<NuxtConfig["i18n"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {
   appName: string,

   typewriter: boolean,

   typewriterDelay: number,

   customApiKey: boolean,

   pwaManifest: {
      name: string,

      short_name: string,

      description: string,

      lang: string,

      start_url: string,

      display: string,

      background_color: string,

      theme_color: string,

      icons: Array<{

      }>,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }
declare module '@vue/runtime-dom' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }