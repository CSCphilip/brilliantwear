import { db } from "./mongodb";
import { Order as OrderType } from "_types";

const Order = db.Order;

export const ordersRepo = {
  create,
  update,
  getAll,
  getById,
};

async function create(params: OrderType) {
  const order = new Order(params);
  await order.save();
  console.log("Order saved successfully. ID:", params.id);
}

async function update(id: string, params: any) {
  const order = await Order.findOne({ id: id });

  if (!order) {
    console.log("Order not found. ID:", id);
  }

  // copy params properties to order
  Object.assign(order, params);
  await order.save();
  console.log("Order updated successfully. ID:", id);
}

async function getAll() {
  return await Order.find(
    {},
    {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  ).lean();
}

async function getById(id: string) {
  try {
    return await Order.findOne(
      { id: id },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    ).lean();
  } catch {
    throw "Order Not Found";
  }
}
