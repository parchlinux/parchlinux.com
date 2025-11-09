import React from "react";
import Image from "next/image";

// کامپوننت کارت دانلود - مشابه تصویر
function DownloadCard({ title, desktop, description, hash_x64, hash_arm64, image, color }) {
  return (
    <div className={`${color} rounded-lg p-6 text-white relative overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <Image
            src={image}
            width={48}
            height={48}
            alt={desktop}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">
            Parch with <span className="text-white">{desktop}</span> desktop
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/80 mb-4 min-h-[60px]">
        {description}
      </p>

      {/* Hash Section */}
      <div className="mb-4">
        <h4 className="text-sm font-bold mb-2">Hash</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-[#1abc9c6b] p-2 rounded border-[#1abc9ca4] border">
            <div className="bg-[#1ABC9C] text-black px-2 py-1 rounded font-bold text-xs">
              x64
            </div>
            <div className="text-xs font-mono truncate">{hash_x64}</div>
          </div>
          <div className="flex items-center gap-2 bg-[#1abc9c6b] p-2 rounded border-[#1abc9ca4] border">
            <div className="bg-[#1ABC9C] text-black px-2 py-1 rounded font-bold text-xs text-center leading-3">
              ARM
              <br />
              <span className="text-[10px]">64</span>
            </div>
            <div className="text-xs font-mono truncate">{hash_arm64}</div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="mb-4">
        <h4 className="text-sm font-bold mb-2">Download</h4>
        <div className="space-y-2">
          {/* x64 Button */}
          <button className="w-full bg-[#148AF7] rounded-lg p-3 flex items-center gap-3 transition-all hover:opacity-90">
            <div className="bg-white p-2 w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-black">
              x64
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-xs">Download for x64</div>
              <div className="text-[10px] text-blue-100">
                Size: 2.9 GiB • 7/23/2025
              </div>
            </div>
            <div className="text-xl">↓</div>
          </button>

          {/* ARM64 Button */}
          <button className="w-full bg-[#9500FF] rounded-lg p-3 flex items-center gap-3 transition-all hover:opacity-90">
            <div className="bg-white w-8 h-8 rounded flex flex-col items-center justify-center font-bold text-black leading-3">
              <span className="text-[10px]">ARM</span>
              <span className="text-[8px]">64</span>
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-xs">Download for ARM64</div>
              <div className="text-[10px] text-purple-100">
                Size: 2.9 GiB • 7/23/2025
              </div>
            </div>
            <div className="text-xl">↓</div>
          </button>
        </div>
      </div>

      {/* Screenshot Preview */}
      <div className="rounded-lg overflow-hidden">
        <Image
          src={`/images/download/${desktop.toLowerCase()}-desktop.png`}
          width={300}
          height={200}
          alt={`${desktop} desktop`}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

// کامپوننت اصلی
export default function Download() {
  const downloads = [
    {
      title: "KDE",
      desktop: "KDE",
      description: "KDE is an international team co-operating on development and distribution of Free, Open Source Software for desktop and portable computing.",
      hash_x64: "2efbca52c90306c9bef3a1c544db3112",
      hash_arm64: "2efbca52c90306c9bef3a1c544db",
      image: "/images/download/kde.png",
      color: "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
    },
    {
      title: "GNOME",
      desktop: "Gnome",
      description: "GNOME is developed in collaboration with the wider free software community to create the best level software with GNOME depends.",
      hash_x64: "2efbca52c90306c9bef3a1c544db3112",
      hash_arm64: "2efbca52c90306c9bef3a1c544db",
      image: "/images/download/gnome.png",
      color: "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
    },
    {
      title: "Raspberry Pi",
      desktop: "Raspberry Pi",
      description: "Raspberry Pi is a series of small single-board computers with the best level software with GNOME depends.",
      hash_x64: "2efbca52c90306c9bef3a1c544db3112",
      hash_arm64: "2efbca52c90306c9bef3a1c544db",
      image: "/images/download/raspberry.png",
      color: "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
    }
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center w-full justify-between border rounded-md px-10 py-5 mb-8">
        <div className="flex items-center gap-6">
          <Image
            src={"/images/download/kde-package.png"}
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <span>Pull Request</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">#17508</span>
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2">
            <span>Commit</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">335ed8d9</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
            <span>Submitted by</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">Sohrab Behdani</span>
          </button>
        </div>
      </div>

      {/* Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((download, index) => (
          <DownloadCard key={index} {...download} />
        ))}
      </div>
    </div>
  );
}