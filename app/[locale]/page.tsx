import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTranslations } from "next-intl"
import {  getTranslations } from "next-intl/server"
//import { Metadata } from 'next'; 
 
//import { Metadata, ResolvingMetadata } from "next"
// Define the Params type
// interface Params {
//   locale: string;
// } { locale }: Params : Promise<Metadata>

// Define the generateMetadata function
export async function generateMetadata() {
  try {
    // Fetch translations
    const data = await getTranslations('HomePage');

    // Return metadata
    return {
      title: data('title'), // Assuming `data` is a function that returns a string
    };
  } catch (error) {
    console.error('Error fetching translations:', error);

    // Fallback metadata in case of an error
    return {
      title: 'Default Title', // Provide a default title
    };
  }
}

export default function Home() {
  const t = useTranslations("HomePage");
  
  return (
    <>
    <Button  >Click me</Button>
    <ThemeToggle/>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{t("title")}</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </>
  );
}
