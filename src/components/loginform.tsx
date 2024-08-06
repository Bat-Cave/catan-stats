"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppwrite } from "@/context/use-appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import LoggedIn from "./logged-in";
import { Spinner } from "./spinner";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { user, loading, login } = useAppwrite();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const { email, password } = values;
    await login(email, password);
    router.push("/");
  };

  if (user) {
    return <LoggedIn />;
  }

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="text-purple-400 mr-2" /> Signing in
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
