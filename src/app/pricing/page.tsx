import {
  CalendarCheck,
  Check,
  Database,
  Focus,
  Info,
  MonitorSmartphone,
  NotebookPen,
  Users,
  X,
} from "lucide-react";
import React from "react";

const PricingPage = () => {
  return (
    <div className="mt-40 p-5">
      <div className="flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="text-5xl font-semibold">Unlock Limitlessness</h1>
        <h3 className="font-semibold text-sm">
          Get full feature rich experience and unlimited collection
        </h3>
        <div className="flex flex-row gap-1 bg-neutral-100 w-fit p-1 rounded-full cursor-pointer">
          <span className="text-foreground bg-background rounded-full px-5 py-2 text-xs font-semibold">
            Yearly
          </span>
          <span className="text-foreground/50 bg-transparent rounded-full px-5 py-2 text-xs font-semibold">
            Monthly
          </span>
        </div>
        <p className="text-xs font-medium tracking-wide">
          <strong className="text-blue-400 font-medium">Save 40%</strong> on
          yearly subscription
        </p>
        <div className="flex flex-row justify-center items-stretch gap-5 w-full max-w-3xl mt-7">
          <div className="flex flex-1/2 text-start flex-col border-gray-200 rounded-2xl border-[1px] bg-background p-5 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-md font-semibold">Free</h4>
              <div className="inline-flex items-end gap-2">
                <h1 className="text-5xl font-black">$0</h1>
                <p className="text-xs text-foreground/60 tracking-wider -translate-y-2 leading-3">
                  Per month
                  <br /> billed yearly
                </p>
              </div>
            </div>
            <span className="self-center w-full text-sm font-semibold py-2 text-center border-gray-200 border-[1px] rounded-full cursor-pointer">
              Get started
            </span>
            <div>
              <ul className="flex flex-col gap-2 text-sm font-semibold tracking-tight">
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <Database size={20} /> 50 book limit
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <CalendarCheck size={20} /> Track reading progress
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <NotebookPen size={20} /> Unlimited notes
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <Focus size={20} /> Effortless book capture
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <MonitorSmartphone size={20} /> Sync data multiple devices
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1/2 text-start flex-col rounded-2xl bg-neutral-100 p-5 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-md font-semibold">Pro</h4>
              <div className="inline-flex items-end gap-2">
                <h1 className="text-5xl font-black">$3</h1>
                <p className="text-xs text-foreground/60 tracking-wider -translate-y-2 leading-3">
                  Per month
                  <br /> billed yearly
                </p>
              </div>
            </div>
            <span className="self-center w-full text-sm font-semibold py-2 text-center bg-foreground text-white rounded-full cursor-pointer">
              Get started
            </span>
            <div>
              <ul className="flex flex-col gap-2 text-sm font-semibold tracking-tight">
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <Database size={20} /> Unlimited books
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <CalendarCheck size={20} /> Track reading progress
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <NotebookPen size={20} /> Unlimited notes
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <Focus size={20} /> Effortless book capture
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <MonitorSmartphone size={20} /> Sync data multiple devices
                </li>
                <li className="text-foreground/50 inline-flex items-center gap-2">
                  <Users size={20} /> Share progress and books with friends
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
                  <span className="text-xl font-bold">$0</span>
                  <button className="mt-2 border px-3 py-1 rounded-full text-sm">
                    Get started
                  </button>
                </div>
              </th>
              <th className="text-left px-4 py-2 rounded-t-2xl">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold">Pro</span>
                  <span className="text-xl font-bold">
                    $3 <span className="text-sm font-normal">per month</span>
                  </span>
                  <button className="mt-2 bg-black text-white px-3 py-1 rounded-full text-sm">
                    Get started
                  </button>
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
