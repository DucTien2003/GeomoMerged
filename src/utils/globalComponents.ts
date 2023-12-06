import { defineAsyncComponent } from 'vue';
import { App } from 'vue';

export function registerGlobalComponent(app: App<Element>) {
  app.component(
    'DefaultLayout',
    defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
  );
  app.component(
    'AuthLayout',
    defineAsyncComponent(() => import('../layouts/AuthLayout.vue')),
  );
}
