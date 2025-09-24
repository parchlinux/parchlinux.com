import Image from "next/image";
import React from "react";

const HeadSection = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">We have a ready-to-go OS!</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-primary/10 rounded-lg py-3 gap-3">
              <Image src={"/images/install.png"} width={35} height={35} />
              <h3 className="text-sm">Easy installation</h3>
            </div>
            <div className="flex flex-col items-center bg-primary/10 rounded-lg py-3 gap-3">
              <Image src={"/images/rocket.png"} width={35} height={35} />
              <h3 className="text-sm">High-performance</h3>
            </div>
            <div className="flex flex-col items-center bg-primary/10 rounded-lg py-3 gap-3">
              <Image src={"/images/user.png"} width={35} height={35} />
              <h3 className="text-sm">User-friendly UI</h3>
            </div>
            <div className="flex flex-col items-center bg-primary/10 rounded-lg py-3 gap-3">
              <Image src={"/images/arch.png"} width={35} height={35} />
              <h3 className="text-sm">Powered by Arch</h3>
            </div>
          </div>
          <p>
            ParchLinux, which stands for Persian Arch, is a Linux distribution
            based on the popular and versatile Arch Linux. It aims to provide a
            streamlined, user-friendly experience while maintaining the
            customizability and performance that Arch Linux is known for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
