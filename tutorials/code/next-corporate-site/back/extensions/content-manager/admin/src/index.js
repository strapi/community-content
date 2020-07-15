// NOTE TO PLUGINS DEVELOPERS:
// If you modify this file by adding new options to the plugin entry point
// Here's the file: strapi/docs/3.0.0-beta.x/plugin-development/frontend-field-api.md
// Here's the file: strapi/docs/3.0.0-beta.x/guides/registering-a-field-in-admin.md
// Also the strapi-generate-plugins/files/admin/src/index.js needs to be updated
// IF THE DOC IS NOT UPDATED THE PULL REQUEST WILL NOT BE MERGED

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import pluginLogo from './assets/images/logo.svg';
import App from './containers/Main';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import reducers from './reducers';
import trads from './translations';
import PreviewURL from './components/PreviewURL';

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [
      {
        plugin: "content-manager.editView",
        area: "right.links",
        component: PreviewURL,
        key: "content-manager.preview-url",
        props: {},
      },
    ],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    leftMenuLinks: [],
    leftMenuSections: [],
    mainComponent: App,
    name: pluginPkg.strapi.name,
    pluginLogo,
    preventComponentRendering: false,
    reducers,
    suffixUrl: () => '/ctm-configurations/models',
    suffixUrlToReplaceForLeftMenuHighlight: '/models',
    trads,
  };

  return strapi.registerPlugin(plugin);
};
