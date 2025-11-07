import Link from "next/link";
import { Logo, BigLogo } from "../svgs";
import { footerData } from "@/lib/data";
import { playfairDisplay } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="container-md pt-20">
      <div className="flex justify-between">
        <div>
          <Logo width={110} height={40} />
          <p className="font-medium text-lg leading-[1.33] text-(--text-surface) mt-5 mb-4.5">
            Higher quality. Lower cost. Maximum recovery.
          </p>
          <p className="leading-[1.62] text-(--text-surface)">
            © {new Date().getFullYear()} Injuro. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {footerData.map((section) => (
            <div key={section.title} className="space-y-5">
              <p
                className={cn(
                  playfairDisplay.className,
                  "font-medium text-[20px] leading-[1.2] text-(--text-strong)"
                )}
              >
                {section.title}
              </p>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="block font-medium leading-tight text-(--text-soft) hover:text-(--text-surface) hover:underline"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 w-full">
        <BigLogo className="w-full h-auto" />
      </div>
    </footer>
  );
};
