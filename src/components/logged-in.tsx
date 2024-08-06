import { useAppwrite } from "@/context/use-appwrite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Spinner } from "./spinner";

const LoggedIn = () => {
  const { user, logout, loading } = useAppwrite();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">You are logged in</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1">
        <p>Logged in as {user?.email}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          onClick={logout}
          disabled={loading}
          variant="ghost"
          className="w-full"
        >
          {loading ? (
            <>
              <Spinner className="text-purple-400 mr-2" /> Logging out
            </>
          ) : (
            "Logout"
          )}
        </Button>
        <Link href="/" className={buttonVariants()}>
          Home
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoggedIn;
