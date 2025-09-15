"use client";

import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <h1 className="flex items-center justify-center text-4xl font-semibold">
      خوش آمدی , {user?.results[0].name.first}!
    </h1>
  );
};

export default Welcome;
