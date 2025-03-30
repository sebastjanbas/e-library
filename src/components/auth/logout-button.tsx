"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/login";

const LogoutButton = () => {
  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
  };
  return <Button onClick={handleLogout}>Log out</Button>;
};

export default LogoutButton;
