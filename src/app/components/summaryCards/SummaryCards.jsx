import { useEffect, useState } from "react";
import { ArrowUp, Presentation, Users, Package, DollarSign } from "lucide-react";
import axios from "axios";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    sales: 0,
    customers: 0,
    products: 0,
    revenue: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5001/summary")
      .then(res => {
        setSummary(res.data[0]); // Because db.json returns an array
      })
      .catch(err => console.error("API fetch error", err));
  }, []);

  return (
<div className="flex-1 px-4 overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Sales"
          value={`${summary.sales}k`}
          growth="4.3%"
          icon={<Presentation className="w-5 h-5 text-blue-400" />}
          iconBg="bg-blue-900/20"
          valueColor="text-blue-400"
        />
        <Card
          title="Customers"
          value={`${summary.customers}k`}
          growth="7.2%"
          icon={<Users className="w-5 h-5 text-yellow-400" />}
          iconBg="bg-yellow-900/20"
          valueColor="text-yellow-400"
        />
        <Card
          title="Products"
          value={`${summary.products}k`}
          growth="8%"
          icon={<Package className="w-5 h-5 text-green-400" />}
          iconBg="bg-green-900/20"
          valueColor="text-green-400"
        />
        <Card
          title="Revenue"
          value={`$${summary.revenue}k`}
          growth="3.69%"
          icon={<DollarSign className="w-5 h-5 text-pink-400" />}
          iconBg="bg-pink-900/20"
          valueColor="text-pink-400"
        />
      </div>
    </div>
  );
}
function Card({ title, value, growth, icon, iconBg, valueColor }) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col justify-between shadow-sm border border-zinc-700 h-32">
      <div className="flex justify-between items-center  mb-1">
     <h3 className="text-gray-400 text-lg font-medium">{title}</h3>
        <div className={`${iconBg} p-1.5 rounded-md`}>
          {icon}
        </div>
      </div>
      <div className={`${valueColor} text-2xl font-semibold mb-1`}>{value}</div>
      <div className="flex items-center text-green-500 text-xs">
        <ArrowUp className="w-3 h-3 mr-1" />
        <span>{growth}</span>
      </div>
    </div>
  );
}
