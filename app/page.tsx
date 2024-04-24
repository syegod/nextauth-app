import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"]
})

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", poppins.className)}>
          Auth
        </h1>
        <p className={cn("text-white text-lg drop-shadow-md", poppins.className)}>
          A simple auth service
        </p>
        <div>
          <LoginButton>
            <Button variant={'secondary'} size={'lg'}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
