import React from "react";

//Icons
import { Wrench } from "lucide-react";

type Props = {};

const Maintenance = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Wrench className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Site Under Maintenance
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          We&apos;re currently performing some maintenance on our site.
          We&apos;ll be back shortly!
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
