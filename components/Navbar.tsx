"use client"
import { useTranslations } from 'next-intl'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = ({ locale } : { locale: string}) => {
    const t = useTranslations("NavbarLinks");
    const pathname = usePathname();
    const router = useRouter();
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const path =   pathname.split("/").slice(2).join("/");
        router.push(`/${newLocale}/${path}`);

    };

   return (
     <div className='w-full flex justify-between border-b py-4'>
        <div className='flex gap-4 items-center text-lg'>
            <Link href={`/${locale}/`}>{t("home")}</Link>
            <Link href={`/${locale}/about`}>{t("about")}</Link>
            <Link href={`/${locale}/profile`}>{t("profile")}</Link>
            <Link href={`/${locale}/quran`}>{t("quran")}</Link>
        </div>
    <select value={locale} onChange={handleLanguageChange}
    className="rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none">
        <option value="en">EN</option>
        <option value="fr">FR</option>
    </select>
     </div>
     
   );
 };
 
 export default Navbar