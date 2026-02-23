// services/dashboardService.js
import Product from "../Model/productModel.js";
import Bill from "../Model/billModel.js";
import userModel from "../Model/userModel.js";

export const getDashboardData = async () => {
  const products = await Product.find();
  const bills = await Bill.find();
  const customers = await userModel.find();

  const totalProducts = products.length;

  const totalStock = products.reduce((s, p) => s + p.stock, 0);

  const lowStockItems = products.filter(p => p.stock <= 10).length;

  const totalCustomers = customers.length;

  const today = new Date().toISOString().split("T")[0];

  const todayBillsData = bills.filter(b => b.date === today);

  const todayBills = todayBillsData.length;

  const todayRevenue = todayBillsData.reduce((s, b) => s + b.total, 0);

  // 🔥 Revenue split
  const normalCustomerRevenue = bills
    .filter(b => b.customerType === "normal")
    .reduce((s, b) => s + b.total, 0);

  const retailerCustomerRevenue = bills
    .filter(b => b.customerType === "retailer")
    .reduce((s, b) => s + b.total, 0);

  const totalRevenue = normalCustomerRevenue + retailerCustomerRevenue;

  const recentBills = bills
    .slice(-5)
    .reverse()
    .map(b => ({
      billNo: b.billNo,
      customerName: b.customerName,
      customerType: b.customerType,
      date: b.date,
      total: b.total
    }));

  return {
    totalProducts,
    totalStock,
    lowStockItems,
    totalCustomers,
    todayBills,
    totalRevenue,
    normalCustomerRevenue,
    retailerCustomerRevenue,
    todayRevenue,
    todayBillsGenerated: todayBills,
    recentBills
  };
};