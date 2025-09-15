"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  

    return (
      <header
        className={cn(
          "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "sticky top-0 z-50"
        )}
        dir="rtl"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-semibold text-foreground">
                داشبورد
              </Link>
            </div>
  
            <div className="flex items-center">
              {isAuthenticated && (
                <Button
                  onClick={logout}
                  variant="default"
                  size="lg"
                  className="font-medium"
                >
                  خروج
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  variant="default"
                  size="lg"
                  className="font-medium"
                  asChild
                >
                  <Link href="/login">ورود</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  
 
};

export default Header;
