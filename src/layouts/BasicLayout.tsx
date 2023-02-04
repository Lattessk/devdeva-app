/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  getMenuData,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button, Input } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/cdslogo3.png';
import theme from './BasicLayout.less';
import { HomeOutlined } from '@ant-design/icons';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/** Use Authorized check all menu item */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const menuDataRef = useRef<MenuDataItem[]>([]);
  useEffect(() => {

  }, []);
  /** Init variables */

  const handleMenuCollapse = (payload: boolean): void => {

  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  return (
    <>
      <ProLayout
        title="โรงพยาบาลตัวอย่าง"
        logo={<HomeOutlined style={{ fontSize: 25, color: '#FFF' }} />}
        className={theme.sidebar}
        formatMessage={formatMessage}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        siderWidth={props.collapsed ? 48 : 250}
        onMenuHeaderClick={() =>
          history.push('/welcome')
        }
        // headerContentRender={() => {
        //   return <div style={{ color: '#000', paddingLeft: 30, width: '25%' }}>
        //     <Input placeholder='ID ใบเบิกจ่ายครุภัณฑ์' />
        //   </div>
        // }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        // footerRender={() => {
        //   if (settings.footerRender || settings.footerRender === undefined) {
        //     return defaultFooterDom;
        //   }

        //   return null;
        // }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default BasicLayout;
