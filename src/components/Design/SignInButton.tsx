"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

type Props = {
  text: string;
};

const handleSignIn = () => {
  signIn("google").catch(console.error);
};

const SignInButton = ({ text }: Props) => {
  return <Button onClick={handleSignIn}>{text}</Button>;
};

export default SignInButton;
