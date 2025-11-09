import React from "react";
import Image from "next/image";
import downloads from "@/data/download";

function DownloadCard({ logo, title, description, image, hashs, links }) {
  return (
    <div className="parch-blue rounded-lg p-6 text-black relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <Image src={logo} width={48} height={48} alt={title} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-900 mb-4 min-h-[60px]">{description}</p>

      {/* Hash Section */}
      <div className="mb-4">
        <h4 className="text-sm font-bold mb-2">Hash</h4>
        <div className="space-y-2">
          {hashs.map((hashItem, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#1abc9c6b] p-2 rounded border-[#1abc9ca4] border"
            >
              <div
                className={`bg-[#1ABC9C] text-black px-2 py-1 rounded font-bold text-xs ${
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
              <div className="text-xs font-mono truncate">{hashItem.hash}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="mb-4 w-60">
        <h4 className="text-sm font-bold mb-2">Download</h4>
        <div className="space-y-2">
          {links.map((link, index) => (
            <button
              key={index}
              className={`w-full bg-${link.color} rounded-lg p-3 flex items-center gap-3 transition-all hover:opacity-90`}
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
                <div className="font-bold text-white text-xs">{link.title}</div>
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
                <img src="/images/software-download.svg" alt="download icon" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Screenshot Preview */}
      <div className="relative h-10">
        <Image
          src={image}
          width={150}
          height={60}
          alt={title}
          className="absolute -bottom-8 -right-6 w-44 h-56 z-10"
        />
      </div>
    </div>
  );
}

// کامپوننت اصلی
export default function Download() {
  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center w-full justify-between border rounded-md px-10 py-5 mb-8">
        <div className="flex items-center gap-6">
          <Image
            src={"/images/download/parch-box.png"}
            width={150}
            height={150}
            alt="parch-box"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-bold">Latest Releases</h1>
            <h2 className="text-xl">This build was released on 2025-09-14</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green text-white rounded-lg flex items-center gap-2">
            <span>Pull Request</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
              #17508
            </span>
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
            <span>Commit</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
              335ed8d9
            </span>
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2">
            <span>Submitted by</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
              Sohrab Behdani
            </span>
          </button>
        </div>
      </div>

      {/* Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((download, index) => (
          <DownloadCard
            key={index}
            logo={download.logo}
            title={download.title}
            description={download.description}
            image={download.image}
            hashs={download.hashs}
            links={download.links}
          />
        ))}
      </div>
    </div>
  );
}
