import React from "react";

import { CompanyHeader } from "./_components/CompanyHeader";
import { NewsFeed } from "./_components/NewsFeed";

type Props = {};

export default function Newsfeed({}: Props) {
  return (
    <div>
      <CompanyHeader />
      <NewsFeed />
    </div>
  );
}
