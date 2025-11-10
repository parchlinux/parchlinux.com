import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 mb-8">
      <div className="container flex xl:h-16 h-32 items-center justify-between px-4 mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={"/logo.svg"} width={19} height={19} alt="logo" />
            <span className=" text-xl">Parch Linux</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center xl:space-x-8 space-x-4">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Forum
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Wiki
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Community
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Team
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button className="rounded-full bg-accent-foreground" asChild>
            <Link href="/download">
              <span className="xl:block hidden ">Donate</span> <Coffee />
            </Link>
          </Button>
          <span className="mb-1 xl:block hidden text-gray-400">&#8226;</span>
          <Button className="rounded-full bg-parch" variant={"default"} asChild>
            <Link href="/download">Downlaod</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
