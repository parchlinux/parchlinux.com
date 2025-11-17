import Image from "next/image";

const HeadSection = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 mb-8 gap-8">
        <div className="lg:col-span-4 flex justify-center lg:justify-end order-first lg:order-last">
          <Image
            className="w-full max-w-md"
            src={"/images/parch-macos.png"}
            width={700}
            height={600}
            alt="macos"
          />
        </div>

        <div className="lg:col-span-8 flex items-center order-last lg:order-first">
          <div className="flex flex-col xl:gap-7 lg:gap-5 gap-3 text-center lg:text-left">
            <h1 className="xl:text-[3.1rem] lg:text-4xl text-2xl font-bold">
              We have a <span className="text-parch">ready-to-go</span> OS!
            </h1>

            <p className="w-full sm:w-5/6 text-[0.99rem] mx-auto lg:mx-0">
              ParchLinux, which stands for Persian Arch, is a Linux distribution based on the popular and versatile
              <span className="text-parch"> Arch Linux</span>. It aims to provide a streamlined,
              <span className="text-parch"> user-friendly</span> experience while maintaining the customizability and
              <span className="text-parch"> performance</span> that Arch Linux is known for.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3 w-full">
                <Image src={"/images/install.png"} width={30} height={30} alt="install" />
                <h3 className="text-xs">Easy installation</h3>
              </div>

              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3 w-full">
                <Image src={"/images/rocket.png"} width={30} height={30} alt="rocket" />
                <h3 className="text-xs">High-performance</h3>
              </div>

              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3 w-full">
                <Image src={"/images/user.png"} width={30} height={30} alt="user" />
                <h3 className="text-xs">User-friendly UI</h3>
              </div>

              <div className="flex flex-col items-center bg-secondary rounded-lg py-4 gap-3 w-full">
                <Image src={"/images/arch.png"} width={30} height={30} alt="arch" />
                <h3 className="text-xs">Powered by Arch</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;