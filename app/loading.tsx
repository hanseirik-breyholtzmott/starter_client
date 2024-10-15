import React from "react";

//Nextjs
import Image from "next/image";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center h-screen bg-[#00263D]/80">
      <div className="flex flex-col items-center justify-center relative">
        <Image
          src="https://utfs.io/f/1c66qeb7SCm5B6NEFUiAuFhnbz7TiOEyxrl5CQRqS1p9HoZK"
          alt="logo"
          width={70}
          height={70}
          className="animate-growShrink"
        />
        <div className=" absolute w-[280px] h-[280px] border-4 border-t-transparent border-[#57C7B7] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
