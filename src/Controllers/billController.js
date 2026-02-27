import {
  createBill,
  getBills,
  getBillById,
  deleteBill,
  getLastInvoice,
  updateBill, // ✅ added
} from "../Services/billService.js";

// CREATE BILL
export const createNewBill = async (req, res) => {
  try {
    const {
      customerName,
      customerType = "normal",
      items = [],
      invoiceNo,
      mobile,
      date,
      hamali = 0,
      roundedOff = 0,
      paidAmount = 0,
    } = req.body;

    if (!customerName || !items.length)
      return res.status(400).json({ msg: "Missing fields" });

    let finalInvoiceNo = invoiceNo;
    let invoiceNumber = 0;

    if (!invoiceNo || invoiceNo.trim() === "") {
      const lastBill = await getLastInvoice();
      invoiceNumber = lastBill ? lastBill.invoiceNumber + 1 : 1;
      finalInvoiceNo = `INV-${String(invoiceNumber).padStart(4, "0")}`;
    } else {
      const lastBill = await getLastInvoice();
      invoiceNumber = lastBill ? lastBill.invoiceNumber + 1 : 1;
    }

    const fixedItems = items.map((i) => ({
      productName: i.productName,
      category: i.category || "general",
      price: Number(i.price),
      quantity: Number(i.quantity),
      total: Number(i.total),

      grossWeightKg: Number(i.grossWeightKg) || 0,
      grossWeightGm: Number(i.grossWeightGm) || 0,
      lessWeightKg: Number(i.lessWeightKg) || 0,
      lessWeightGm: Number(i.lessWeightGm) || 0,
      unit: i.unit || "Kgs",
      netWeight: Number(i.netWeight) || 0,
    }));

    const subtotal = fixedItems.reduce((sum, i) => sum + i.total, 0);
    const total = subtotal + Number(hamali) + Number(roundedOff);

    const balance = total - Number(paidAmount);
    const status = balance > 0 ? "PENDING" : "PAID";

    const bill = await createBill({
      customerName,
      customerType,
      invoiceNo: finalInvoiceNo,
      invoiceNumber,
      mobile,
      date,
      hamali,
      roundedOff,
      subtotal,
      total,
      paidAmount,
      balance,
      status,
      items: fixedItems,
      createdBy: req.user?._id,
    });

    res.status(201).json({ msg: "Bill Created", bill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const fetchBills = async (req, res) => {
  const bills = await getBills();
  res.json(bills);
};

// GET ONE
export const fetchBill = async (req, res) => {
  const bill = await getBillById(req.params.id);
  res.json(bill);
};

// DELETE
export const removeBill = async (req, res) => {
  await deleteBill(req.params.id);
  res.json({ msg: "Bill deleted" });
};



// ✅ ADD THIS NEW UPDATE CONTROLLER
export const editBill = async (req, res) => {
  try {
    const updatedBill = await updateBill(req.params.id, req.body);

    if (!updatedBill)
      return res.status(404).json({ msg: "Bill not found" });

    res.json({ msg: "Bill Updated", bill: updatedBill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};