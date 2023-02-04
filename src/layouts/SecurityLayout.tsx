import React from 'react';
import type { ConnectProps } from 'umi';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

type SecurityLayoutProps = {
  loading?: boolean;
} & ConnectProps;

const firebaseConfig = {
  apiKey: "AIzaSyD3-CqqONrszKKhAiqGPP_CoXGnn2RJSx8",
  authDomain: "devdeva-app.firebaseapp.com",
  projectId: "devdeva-app",
  storageBucket: "devdeva-app.appspot.com",
  messagingSenderId: "980372708198",
  appId: "1:980372708198:web:785b9171c2f0e0f02086a7",
  measurementId: "G-2C9LJRB2T7"
};

class SecurityLayout extends React.Component<SecurityLayoutProps> {

  componentDidMount() {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app)

  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default SecurityLayout;
