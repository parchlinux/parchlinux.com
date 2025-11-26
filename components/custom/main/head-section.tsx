import Image from "next/image";
import { useTranslations } from "next-intl";

const HeadSection = () => {

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12 mb-8">
        <div className="col-span-8 flex items-center">
          <div className="flex flex-col xl:gap-7 lg:gap-5 gap-3 2xl:pe-44">
            <h1 className="xl:text-[3.1rem] lg:text-4xl text-[1.8rem] font-bold xl:order-first">
              We have a <span className="text-parch">ready-to-go</span> OS!
            </h1>
            <div className="grid grid-cols-4 xl:gap-4 gap-2 mb-4 xl:order-2 order-last 2xl:pr-48 xl:pr-32 pr-16">
              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/install.png"}
                  width={30}
                  height={30}
                  alt="install"
                />
                <h3 className="lg:text-xs text-[10px]">Easy installation</h3>
              </div>
              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/rocket.png"}
                  width={30}
                  height={30}
                  alt="rocket"
                />
                <h3 className="lg:text-xs text-[10px] xl:block hidden">
                  High-performance
                </h3>
                <h3 className="lg:text-xs text-[10px] xl:hidden block">
                  High-speed
                </h3>
              </div>
              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/user.png"}
                  width={30}
                  height={30}
                  alt="user"
                />
                <h3 className="lg:text-xs text-[10px]">User-friendly UI</h3>
              </div>
              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/arch.png"}
                  width={30}
                  height={30}
                  alt="arch"
                />
                <h3 className="lg:text-xs text-[10px]">Powered by Arch</h3>
              </div>
            </div>
            <p
              className="text-justify w-5/6 text-[0.99rem] line-clamp-3 xl:order-last"
              style={{}}
            >
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile{" "}
              <span className="text-parch">Arch Linux</span>. It aims to provide
              a streamlined, <span className="text-parch">user-friendly</span>{" "}
              experience while maintaining the customizability and{" "}
              <span className="text-parch">performance</span> that Arch Linux is
              known for.
            </p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex justify-end">
            <Image
              className="lg:px-0 px-1 "
              src={"/images/preview.png"}
              width={700}
              height={600}
              alt="Parch Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
