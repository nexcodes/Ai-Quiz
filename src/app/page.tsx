import SignInButton from "@/components/Design/Navbar/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to AI Quiz Generator</CardTitle>
          <CardDescription>
            This is a quiz generator application that uses AI to generate
            questions from a given text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In With Google" />
        </CardContent>
      </Card>
    </div>
  );
}
