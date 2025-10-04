import Image from "next/image";
import React from "react";

const HeadSection = () => {
  return (
    <div className="grid grid-cols-12 mb-8">
      <div className="col-span-8 flex items-center">
        <div className="flex flex-col gap-7 px-48">
          <h1 className="text-[3.1rem] font-bold">
            We have a <span className="text-parch">ready-to-go</span> OS!
          </h1>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col items-center bg-blue-100 rounded-lg py-4 gap-3">
              <Image
                src={"/images/install.png"}
                width={30}
                height={30}
                alt="install"
              />
              <h3 className="text-xs">Easy installation</h3>
            </div>
            <div className="flex flex-col items-center bg-blue-100 rounded-lg py-4 gap-3">
              <Image
                src={"/images/rocket.png"}
                width={30}
                height={30}
                alt="rocket"
              />
              <h3 className="text-xs">High-performance</h3>
            </div>
            <div className="flex flex-col items-center bg-blue-100 rounded-lg py-4 gap-3">
              <Image
                src={"/images/user.png"}
                width={30}
                height={30}
                alt="user"
              />
              <h3 className="text-xs">User-friendly UI</h3>
            </div>
            <div className="flex flex-col items-center bg-blue-100 rounded-lg py-4 gap-3">
              <Image
                src={"/images/arch.png"}
                width={30}
                height={30}
                alt="arch"
              />
              <h3 className="text-xs">Powered by Arch</h3>
            </div>
          </div>
          <p
            className="text-justify text-[0.99rem] line-clamp-3"
            style={{ textAlignLast: "justify" }}
          >
            ParchLinux, which stands for Persian Arch, is a Linux distribution
            based on the popular and versatile{" "}
            <span className="text-parch">Arch Linux</span>. It aims to provide a
            streamlined, <span className="text-parch">user-friendly</span>{" "}
            experience while maintaining the customizability and{" "}
            <span className="text-parch">performance</span> that Arch Linux is
            known for.
          </p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex justify-end">
          <Image
            src={"/images/parch-macos.png"}
            width={700}
            height={600}
            alt="macos"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
