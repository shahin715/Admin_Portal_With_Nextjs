"use client";
import DashboardLayout from "./DashboardLayout";
// import SalesReport from "./components/salesReport/SalesReport";
// import SalesSummary from "./components/salesSummary/salesSummary";
import ProductTable from "./components/productTable/ProductTable"

import SummaryCards from "./components/summaryCards/SummaryCards";
export default function HomePage() {
  return (
    <div className="bg-red-800">
      <DashboardLayout>
      <div className="">
<SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <SummaryCards/>
     <ProductTable/>
      </div>
     
  
       
    </DashboardLayout>
    </div>
  );
}


