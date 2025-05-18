import PlanOption from "@/components/content/plan-option";
import { Button } from "@/components/ui/button";
import {
  Check,
  Info,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const PricingPage = () => {
  return (
    <div className="mt-24 sm:p-10 p-5">
      <div className="flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="text-6xl font-semibold">Unlock Limitlessness</h1>
        <h3 className="font-normal tracking-wide text-foreground/50 text-xl">
          Get full feature rich experience and unlimited collection.
        </h3>
      </div>
      <PlanOption />
      <div className="flex justify-center mt-44">
        <table className="table-fixed w-full max-w-7xl border-collapse">
          <colgroup>
            <col className="w-1/3" />
            <col className="w-1/3" />
            <col className="w-1/3 bg-neutral-100" />
          </colgroup>

          <thead className="sticky z-50 top-20">
            <tr>
              <th className="text-left px-4 py-6 text-2xl font-bold align-top">
                Compare plans & features
              </th>
              <th className="text-left px-4 py-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold">Free</span>
                  <span className="text-xl font-bold">$0 <span className="text-sm font-normal">per month</span></span>
                  <Button
                    asChild
                    variant={"blank"}
                    className="mt-5 border-[1px] hover:bg-foreground/5 font-semibold tracking-wide px-3 py-1 rounded-full text-sm"
                  >
                    <Link href={"/sign-in"}>Get started</Link>
                  </Button>
                </div>
              </th>
              <th className="text-left px-4 py-2 rounded-t-2xl">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold">Pro</span>
                  <span className="text-xl font-bold">
                    $3 <span className="text-sm font-normal">per month</span>
                  </span>
                  <Button
                    variant={"blank"}
                    asChild
                    className="mt-5 bg-foreground text-white font-semibold tracking-wide hover:bg-foreground/90 px-3 py-1 rounded-full text-sm"
                  >
                    <Link href={"/sign-in"}>Get started</Link>
                  </Button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {/* Section: Content */}
            <tr>
              <td className="px-4 pt-10 pb-2 text-xl font-semibold text-left">
                Content
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Unlimited books <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4 font-semibold">50 book limit</td>
              <td className="px-4 py-4 font-semibold">
                <Check />
              </td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Notes <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4 font-semibold">500 characters/book</td>
              <td className="px-4 py-4 font-semibold">Unlimited</td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                History <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4 font-semibold">
                6 month history (100MB)
              </td>
              <td className="px-4 py-4 font-semibold">Unlimited</td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Upload own images <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <X />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
            </tr>

            {/* Section: Features */}
            <tr>
              <td className="px-4 pt-10 pb-2 text-xl font-semibold text-left">
                Features
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Progress tracker <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Digital bookmark <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Sharing books <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <X />
              </td>
              <td className="px-4 py-4">
                <Check />
              </td>
            </tr>
            <tr className="border-t">
              <td className="inline-flex items-center gap-2 px-4 py-4 font-semibold">
                Collaborative notes{" "}
                <Info size={16} className="cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <X />
              </td>
              <td className="px-4 py-4 rounded-b-2xl">
                <Check />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingPage;
