import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.globEager('./modules/*.ts');
const externalModules = import.meta.globEager('./externalModules/*.ts');

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
);

// Avoid circular references, put here

export const DEFAULT_ROUTE_NAME = 'Application';

export const DEFAULT_ROUTE = {
  title: 'menu.dashboard.application',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/application',
};