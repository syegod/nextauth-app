import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"
import { FaLock } from "react-icons/fa";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps {
    label: string;
}

const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold inline-flex gap-x-2", poppins.className)}>
                <FaLock /> Auth
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}

export default Header