import {
  createBill,
  getBills,
  getBillById,
  deleteBill,
} from "../Services/billService.js";


// CREATE BILL
export const createNewBill = async (req, res) => {
  try {
    const { customerName, customerType, discount = 0, items } = req.body;

    if (!customerName || !items?.length) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    // ✅ FIX quantity + category
    const fixedItems = items.map((i) => ({
      productName: i.productName,
      category: i.category || "general",
      price: Number(i.price),
      quantity: Number(i.quantity),
      total: Number(i.price) * Number(i.quantity),
    }));

    const subtotal = fixedItems.reduce(
      (sum, i) => sum + i.total,
      0
    );

    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    const bill = await createBill({
      customerName,
      customerType,
      discount,
      items: fixedItems,
      subtotal,
      total,
      createdBy: req.user._id,
    });

    res.status(201).json({
      msg: "Bill Created",
      bill,
    });

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
