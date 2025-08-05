"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SalesReport({ cardHeight = "h-auto md:h-[350px]" }) {
  const [period, setPeriod] = useState("daily");
  const [reportData, setReportData] = useState({
    daily: [],
    monthly: [],
    yearly: [],
  });

  const isCompact = cardHeight === "h-[150px]";
  const hideMenu = isCompact;

  useEffect(() => {
    axios
      .get("http://localhost:5001/salesReport")
      .then((res) => setReportData(res.data))
      .catch((err) => console.error("SalesReport fetch error", err));
  }, []);

  const data = reportData[period] || [];
  const maxVal = Math.max(0, ...data.flatMap((d) => [d.value1, d.value2]));

  return (
    <div className={`w-full py-2 ${cardHeight}`}>
      <Card
        className={`bg-zinc-900 text-white border-zinc-700 shadow-sm w-full overflow-hidden ${cardHeight}`}
      >
        <CardHeader
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-5 py-3`}
        >
          {/* Title + Dropdown */}
          <div className="flex items-center gap-2">
            <CardTitle
              className={`${isCompact ? "text-base" : "text-xl"} font-bold`}
            >
              Sales Report
            </CardTitle>
            {!hideMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${
                      isCompact ? "h-6 w-6" : "h-10 w-10"
                    } text-gray-400 hover:text-white`}
                  >
                    <MoreHorizontal
                      className={`${isCompact ? "h-4 w-4" : "h-6 w-6"}`}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  <DropdownMenuItem className="hover:bg-gray-700">
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700">
                    Download Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Toggle buttons */}
          <ToggleGroup
            type="single"
            className="grid grid-cols-3 gap-2 rounded-md bg-gray-800 p-1 sm:w-auto w-full"
          >
            {["daily", "monthly", "yearly"].map((v) => (
              <button
                key={v}
                onClick={() => setPeriod(v)}
                className={`px-4 py-2 rounded-md transition-all ${
                  period === v
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </span>
              </button>
            ))}
          </ToggleGroup>
        </CardHeader>

        <CardContent className="pt-4 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div
              className={`flex items-end gap-3 w-full min-w-0 ${
                isCompact ? "h-[80px]" : "h-[180px]"
              } px-4`}
            >
              {data.map((d, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 min-w-[40px]"
                >
                  <div className="flex items-end w-full justify-center gap-2 h-full">
                    <motion.div
                      className={`${
                        isCompact ? "w-2" : "w-3 sm:w-4"
                      } rounded-t-sm bg-blue-500`}
                      initial={{ height: 0 }}
                      animate={{
                        height:
                          (d.value1 / maxVal) * (isCompact ? 80 : 180) || 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    />
                    <motion.div
                      className={`${
                        isCompact ? "w-2" : "w-3 sm:w-4"
                      } rounded-t-sm bg-cyan-500`}
                      initial={{ height: 0 }}
                      animate={{
                        height:
                          (d.value2 / maxVal) * (isCompact ? 80 : 180) || 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.1,
                      }}
                    />
                  </div>
                  <span
                    className={`${
                      isCompact ? "text-[10px]" : "text-sm"
                    } text-gray-400 mt-2`}
                  >
                    {d.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


