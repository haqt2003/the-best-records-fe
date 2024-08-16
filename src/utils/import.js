import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "none-layout",
    defineAsyncComponent(() => import("@/layouts/none"))
  );

  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/default"))
  );
}
