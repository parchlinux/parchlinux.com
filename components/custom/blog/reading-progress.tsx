"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / height) * 100)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-parch transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
