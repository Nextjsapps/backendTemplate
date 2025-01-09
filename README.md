This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


1. File
   Preferences->Profile-Settings->
    ->css-Lint->Unknown At Rules
Answer: set to "ignore" so global.css for showing underline for the following 

@tailwind base;
@tailwind components;
@tailwind utilities;

will be removed

2. To add theme
    Youtube video link
    https://www.youtube.com/watch?v=l93uukpAoxE

    https://ui.shadcn.com/docs/dark-mode/next
    # npx shadcn@latest init -d
      force

    # npx shadcn@latest add 
    (list of components will appear, you need to select, with spacebar)

     (button, card, input, dropdown-menu, label, select)
     Created 6 files:
    - components\ui\button.tsx
    - components\ui\card.tsx
    - components\ui\input.tsx
    - components\ui\dropdown-menu.tsx
    - components\ui\label.tsx
    - components\ui\select.tsx

    - 3. To apply dark theme, you need to add "dark"
    - class inside layout.tsx file in html className
    - as below, run the app, to check the effect
    
    - <html lang="en" className="dark">
    - https://ui.shadcn.com/themes
3.   npm install next-themes

4.   to support multi-language support
     # npm install next-intl --force

   #update next.config.mjs
   import type { NextConfig } from "next";
   
   # locale
   import createNextIntlPlugin from 'next-intl/plugin'; //local
   const withNextIntl = createNextIntlPlugin();

    const nextConfig: NextConfig = {
    /* config options here */
    };

    # locale withNextIntl
    export  default withNextIntl(nextConfig);

    # create tow files at root level "i18n.ts" and "middleware.ts"
    # 1 -- "i18n.ts"
    import { notFound  } from "next/navigation";
    import { getRequestConfig } from 'next-intl/server';

    const locales = ["en", "fr"];

    export default getRequestConfig( async ({locale}) =>{
        if(!locales.includes(locale as any)) notFound();

        return {
            messages: (await import(`./messages/${locale}.json`)).default,
        };
    });


    # 2 -- "middleware.ts"
    import { notFound  } from "next/navigation";
    import { getRequestConfig } from 'next-intl/server';

    const locales = ["en", "fr"];

    export default getRequestConfig( async ({locale}) =>{
        if(!locales.includes(locale as any)) notFound();

        return {
            messages: (await import(`./messages/${locale}.json`)).default,
        };
    });

    # 3 -- create "messages" folder at root level
    #       inside create "en.json" and "fr.json" with below content for each file
    {
        "NavbarLinks": {
            "home": "home",
            "about": "about",
            "profile": "profile"
        },
        "HomePage": {
            "title": "Landing page fr",
            "subtitle": "subtitle fr"
        },
        "ProfilePage": {
            "title": "Profile page fr"
        }
    }

    # 4-- create app/[locale] folder and 
    #     move "app.tsx" and "layout.tsx" file inside
          import "../globals.css";
    

    # NextJS Essential Extension Pack

    #  current language
    #  for client side we can also use Params 
    import { useParams } from "next/navigation";
    const { locale } = useParams<{ locale: string }>();

    # Enduser menu shortcut keyword "b"
      const SIDEBAR_KEYBOARD_SHORTCUT = "b"

    # npm install axios js-cookie cookie --legacy-peer-deps
    #           OR
    # npm install axios js-cookie cookie

    # npm i --save-dev @types/js-cookie --legacy-peer-deps

    