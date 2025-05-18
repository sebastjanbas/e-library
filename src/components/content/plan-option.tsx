/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  CalendarCheck,
  Database,
  Focus,
  MonitorSmartphone,
  NotebookPen,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const PlanOption = () => {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <div className="flex flex-row gap-1 bg-neutral-100 w-fit p-1 rounded-full cursor-pointer">
        <span
          onClick={() => setPlan("yearly")}
          className={`${plan === "yearly" ? "text-foreground bg-background" : "text-foreground/50 bg-transparent"} rounded-full px-5 py-2 text-base font-medium tracking-wide`}
        >
          Yearly
        </span>
        <span
          onClick={() => setPlan("monthly")}
          className={`${plan === "monthly" ? "text-foreground bg-background" : "text-foreground/50 bg-transparent"} rounded-full px-5 py-2 text-base font-medium tracking-wide`}
        >
          Monthly
        </span>
      </div>

      <p className="text-base font-normal tracking-wide my-6 text-foreground/60">
        <strong className="text-blue-500 font-semibold tracking-wide">
          Save 40%
        </strong>{" "}
        on yearly subscription
      </p>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 w-full max-w-3xl mt-7">
        <Plan
          name="Free"
          price={{ month: 0, year: 0 }}
          plan={plan}
          features={[
            { icon: <Database size={20} />, description: "50 book limit" },
            {
              icon: <CalendarCheck size={20} />,
              description: "Track reading progress",
            },
            { icon: <NotebookPen size={20} />, description: "Unlimited notes" },
            {
              icon: <Focus size={20} />,
              description: "Effortless book capture",
            },
            { icon: <MonitorSmartphone size={20} />, description: "Sync data" },
          ]}
        />
        <Plan
          name="Pro"
          price={{ month: 5, year: 3 }}
          plan={plan}
          features={[
            { icon: <Database size={20} />, description: "50 book limit" },
            {
              icon: <CalendarCheck size={20} />,
              description: "Track reading progress",
            },
            { icon: <NotebookPen size={20} />, description: "Unlimited notes" },
            {
              icon: <Focus size={20} />,
              description: "Effortless book capture",
            },
            { icon: <MonitorSmartphone size={20} />, description: "Sync data" },
            {
              icon: <Users size={20} />,
              description: "Share progress and books with friends",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PlanOption;

type PlanProps = {
  name: string;
  price: {
    month: number;
    year: number;
  };
  features: {
    icon: any;
    description: string;
  }[];
  plan: "yearly" | "monthly";
};
const Plan = ({ name, price, features, plan }: PlanProps) => {
  return (
    <div
      className={`${name.toLowerCase() === "pro" ? "bg-neutral-100" : "border-gray-200  border-[1px] bg-background"} flex flex-1/2 text-start flex-col  p-5 gap-8 rounded-2xl`}
    >
      <div className="flex flex-col gap-3">
        <h4 className="text-md font-semibold">{name}</h4>
        <div className="inline-flex items-end gap-2">
          <h1 className="text-5xl font-black">
            ${plan === "yearly" ? price.year : price.month}
          </h1>
          <p className="text-xs text-foreground/60 tracking-wider -translate-y-2 leading-3">
            Per month
            <br /> billed {plan === "yearly" ? "yearly" : "monthly"}
          </p>
        </div>
      </div>
      <Button asChild variant={"blank"}>
        <Link href={"/sign-in"}>
          <span
            className={`${name.toLowerCase() === "pro" ? "bg-foreground text-white hover:bg-foreground/90" : "border-gray-200 border-[1px] hover:bg-foreground/5"} self-center w-full text-sm font-semibold py-2 text-center !rounded-full cursor-pointer`}
          >
            Get started
          </span>
        </Link>
      </Button>

      <div>
        <ul className="flex flex-col gap-2 text-sm font-semibold tracking-tight">
          {features.map((f: { icon: any; description: string }, i: number) => (
            <li
              key={i}
              className="text-foreground/50 inline-flex items-center gap-2"
            >
              {f.icon} {f.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
