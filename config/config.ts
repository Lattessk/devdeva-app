// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          // authority: ['admin'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              name: 'home',
              icon: 'form',
              path: '/welcome',
              component: './welcome',
            },
            {
              path: '/property-management',
              name: 'property_management',
              icon: 'user',
              routes: [
                {
                  name: 'Dashboard',
                  icon: 'form',
                  path: '/property-management/dashboard',
                },
                {
                  name: 'durable_articles_information',
                  icon: 'form',
                  path: '/property-management/information',
                },
                {
                  name: 'set_durable_articles_information',
                  icon: 'form',
                  path: '/property-management/set-information',
                },
                {
                  name: 'pick_durable_articles',
                  icon: 'form',
                  path: '/property-management/pick-durable-articles',
                  routes: [
                    {
                      name: 'list',
                      icon: 'form',
                      path: '/property-management/pick-durable-articles/list',
                    },
                    {
                      name: 'save',
                      icon: 'form',
                      path: '/property-management/pick-durable-articles/save',
                    },
                    {
                      name: 'approve',
                      icon: 'form',
                      path: '/property-management/pick-durable-articles/approve',
                      component: './pick-up'
                    },
                  ]
                },
                {
                  name: 'borrow_durable_articles',
                  icon: 'form',
                  path: '/property-management/borrow-return',
                  routes: [
                    {
                      name: 'list',
                      icon: 'form',
                      path: '/property-management/borrow-return/list',
                    },
                    {
                      name: 'save_borrow',
                      icon: 'form',
                      path: '/property-management/borrow-return/save-borrow',
                    },
                    {
                      name: 'approve',
                      icon: 'form',
                      path: '/property-management/borrow-return/approve',
                    },
                    {
                      name: 'save_return',
                      icon: 'form',
                      path: '/property-management/borrow-return/save-return',
                    },
                  ]
                },
                {
                  name: 'transfer_durable_articles',
                  icon: 'form',
                  path: '/property-management/transfer',
                  routes: [
                    {
                      name: 'list',
                      icon: 'form',
                      path: '/property-management/transfer/list',
                    },
                    {
                      name: 'save',
                      icon: 'form',
                      path: '/property-management/transfer/save',
                    },
                    {
                      name: 'approve',
                      icon: 'form',
                      path: '/property-management/transfer/approve',
                    },
                  ]
                },
                {
                  name: 'repair_work',
                  icon: 'form',
                  path: '/property-management/repair-work',
                  routes: [
                    {
                      name: 'dashboard',
                      icon: 'form',
                      path: '/property-management/repair-work/dashboard',
                    },
                    {
                      name: 'add',
                      icon: 'form',
                      path: '/property-management/repair-work/add',
                    },
                    {
                      name: 'save_detail',
                      icon: 'form',
                      path: '/property-management/repair-work/save-detail',
                    },
                    {
                      name: 'save',
                      icon: 'form',
                      path: '/property-management/repair-work/save',
                    },
                    {
                      name: 'check',
                      icon: 'form',
                      path: '/property-management/repair-work/check',
                    },
                    {
                      name: 'history',
                      icon: 'form',
                      path: '/property-management/repair-work/history',
                    },
                  ]
                },
              ]
            },
          ],
        },
      ],
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
