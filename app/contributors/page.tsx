import contributors from "@/data/contributors";
import Image from "next/image";

export default function Contributors() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-[40px] font-bold mb-24 mt-24">Contributors</h1>
      <div className="grid grid-cols-4 gap-8">
        {contributors.map((contributor, index) => (
          <div
            className="flex items-center gap-4 p-3 bg-[#D2E5F4] rounded-lg lg:col-span-1 sm:col-span-2 col-span-4"
            key={index}
          >
            <Image
              src={contributor.image || "https://picsum.photos/60"}
              width={60}
              height={60}
              className="rounded-sm"
              alt={contributor.name}
            />
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">{contributor.name}</h3>
              <span>{contributor.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}