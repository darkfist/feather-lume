if (import.meta.env.DEV) {
  import("@ionic/core/loader/index.es2017").then(({ defineCustomElements }) => defineCustomElements());
} else {
  import("@ionic/core/components").then(({ initialize }) => initialize());
  import("../utils/ionic.imports").then(({ registerIonicComponents }) => registerIonicComponents());
}
