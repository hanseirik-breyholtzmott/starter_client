import React from "react";

import GoogleTagManager from "./googleTagManager";
import Hotjar from "./hotjar";

type Props = {};

const StarterAnalytics = (props: Props) => {
  const googleTagManager = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  const hotjar = process.env.NEXT_PUBLIC_HOTJAR;
  return <>{hotjar ? <Hotjar /> : null}</>;
};

export default StarterAnalytics;
