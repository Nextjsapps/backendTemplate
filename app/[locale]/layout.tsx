import Navbar from "@/components/Navbar";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
// for locale
import { NextIntlClientProvider } from 'next-intl';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { cookies } from "next/headers"
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { getMessages } from "next-intl/server";
export default async function RootLayout(
  { children, params }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>
  }) {
  const { locale } = await params;

  //messages will be available throughout the application
  const messages = await getMessages();

  //To persist sidebar state in Next.js, 
  // set up your SidebarProvider in app/layout.tsx like this:
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <html lang={locale} className="dark" suppressHydrationWarning>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['dark', 'light', 'orange', 'red', 'rose', 'green', 'yellow', 'violet']}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="mx-auto max-w-4xl h-screen">
              <Navbar locale={locale} />

              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  ); 
}

