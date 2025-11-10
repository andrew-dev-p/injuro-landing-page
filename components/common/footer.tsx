import Link from "next/link";
import { Logo, BigLogo } from "../svgs";
import { footerData } from "@/lib/data";
import { playfairDisplay } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const companySection = footerData.find(
    (section) => section.title === "Company"
  );
  const legalSection = footerData.find((section) => section.title === "Legal");
  const followUsSection = footerData.find(
    (section) => section.title === "Follow Us"
  );

  return (
    <footer className="container-md px-5 md:px-0 pt-10 md:pt-20">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
        <div>
          <Logo width={110} height={40} />
          <p className="font-medium text-base leading-[1.25] text-(--text-surface) mt-5 mb-4.5">
            Higher quality. Lower cost. Maximum recovery.
          </p>
          <p className="text-sm leading-[1.57] text-(--text-surface)">
            © {new Date().getFullYear()} Injuro. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-5">
          <div className="flex flex-row gap-8 md:contents">
            {companySection && (
              <div className="space-y-5">
                <p
                  className={cn(
                    playfairDisplay.className,
                    "font-medium text-[20px] leading-[1.2] text-(--text-strong)"
                  )}
                >
                  {companySection.title}
                </p>
                <div className="space-y-3">
                  {companySection.links.map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="block font-medium text-base leading-[1.25] text-(--text-soft) hover:text-(--text-surface) hover:underline"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {legalSection && (
              <div className="space-y-5">
                <p
                  className={cn(
                    playfairDisplay.className,
                    "font-medium text-[20px] leading-[1.2] text-(--text-strong)"
                  )}
                >
                  {legalSection.title}
                </p>
                <div className="space-y-3">
                  {legalSection.links.map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="block font-medium text-base leading-[1.25] text-(--text-soft) hover:text-(--text-surface) hover:underline"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {followUsSection && (
            <div className="space-y-5 md:col-start-3">
              <p
                className={cn(
                  playfairDisplay.className,
                  "font-medium text-[20px] leading-[1.2] text-(--text-strong)"
                )}
              >
                {followUsSection.title}
              </p>
              <div className="flex flex-row gap-4 md:flex-col md:gap-3">
                {followUsSection.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="block font-medium text-base leading-[1.25] text-(--text-soft) hover:text-(--text-surface) hover:underline"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 md:mt-20 w-full">
        <BigLogo className="w-full h-auto" />
      </div>
    </footer>
  );
};
