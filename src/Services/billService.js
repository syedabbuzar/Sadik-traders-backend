import Bill from "../Model/billModel.js";

export const createBill = (data) => Bill.create(data);
export const getBills = () => Bill.find().sort({ createdAt: -1 });
export const getBillById = (id) => Bill.findById(id);
export const deleteBill = (id) => Bill.findByIdAndDelete(id);
export const getLastInvoice = () => Bill.findOne().sort({ invoiceNumber: -1 });