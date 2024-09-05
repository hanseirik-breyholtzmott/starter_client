import React from "react";
import "ldrs/helix";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <div className="container">
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
      </div>
    </div>
  );
};

export default loading;
