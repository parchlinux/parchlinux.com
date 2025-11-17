import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      fa: "/pfadnamen",
    },
  },
});
