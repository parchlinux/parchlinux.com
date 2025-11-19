import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const DownloadCard = ({ logo, title, description, image, hashs, links }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-3 mb-4">
          <Image src={logo} width={50} height={50} alt={title} />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm min-h-[60px]">{description}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Hash</h3>
          <div className="space-y-2">
            {hashs.map((hashItem, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-primary/15 p-2 rounded border-primary border"
              >
                <div
                  className={`bg-primary text-black px-2 py-1 rounded font-bold text-xs ${
                    hashItem.version === "ARM64" ? "text-center leading-3" : ""
                  }`}
                >
                  {hashItem.version === "ARM64" ? (
                    <>
                      ARM
                      <br />
                      <span className="text-[10px]">64</span>
                    </>
                  ) : (
                    hashItem.version
                  )}
                </div>
                <div className="text-xs font-mono truncate">
                  {hashItem.hash}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 w-60">
          <h4 className="text-sm font-bold mb-2">Download</h4>
          <div className="space-y-2">
            {links.map((link, index) => (
              <button
                key={index}
                className={`w-full bg-primary rounded-lg p-3 flex items-center gap-3 transition-all hover:opacity-90`}
              >
                <div className="bg-white p-2 w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-black">
                  {link.version === "ARM64" ? (
                    <div className="flex flex-col items-center justify-center leading-3">
                      <span className="text-[10px]">ARM</span>
                      <span className="text-[8px]">64</span>
                    </div>
                  ) : (
                    link.version
                  )}
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-white text-xs">
                    {link.title}
                  </div>
                  <div
                    className={`text-[10px] ${
                      link.color === "primary"
                        ? "text-blue-100"
                        : "text-purple-100"
                    }`}
                  >
                    Size: {link.size} • {link.date}
                  </div>
                </div>
                <div className="text-xl">
                  <img
                    src="/images/software-download.svg"
                    alt="download icon"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-10">
          <Image
            src={image}
            width={150}
            height={60}
            alt={title}
            className="absolute -bottom-8 -right-6 w-44 h-56 z-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
