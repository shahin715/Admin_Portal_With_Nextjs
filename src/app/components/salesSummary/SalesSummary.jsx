"use client";

import SalesReport from "../salesReport/SalesReport";
import EarningStats from "../earning/EarningStats";
import Order from "../order/Order";

export default function SalesSummary() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-stretch px-4">
      {/* Left: Sales Report (stacked on mobile, 70% on md+) */}
      <div className="w-full md:w-[70%]">
        <SalesReport cardHeight="h-[350px]" />
      </div>

      {/* Right: EarningStats + Order (stacked on mobile, side by side on md+) */}
      <div className="w-full md:w-[30%] flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <EarningStats
              closedOrderCardHeight="h-[85px]"
              earningCardHeight="h-[250px]"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Order
              ratingCardHeight="h-[85px]"
              ordersCardHeight="h-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

