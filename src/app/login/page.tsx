"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/User";

// Zod schema for phone number validation
const schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^(\+98|0)?9\d{9}$/, "یک شماره موبایل معتبر وارد کنید"),
});

type LoginFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
 
  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      return res.json();
    },
    onSuccess: (data: User) => {
      login(data);
      router.push("/",);   
    },
  
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    mutation.mutate();
    
  };

  return (
    <div className=" border rounded-xl shadow max-w-md mx-auto p-5">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ورود
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          شماره موبایل خود را وارد کنید
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره موبایل</FormLabel>
                <FormControl>
                  <Input placeholder="09xxxxxxxxx" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
