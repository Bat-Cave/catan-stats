"use client";

import { useAppwrite } from "@/context/use-appwrite";

const AccountPage = () => {
  const { user } = useAppwrite();

  console.log(user);
  return (
    <main className="w-full grow max-w-5xl mx-auto flex flex-col pt-16">
      <h1>Account</h1>
    </main>
  );
};

export default AccountPage;
