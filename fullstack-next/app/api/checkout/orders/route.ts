import joi from "joi";
import { apiHandler } from "_helpers/server/api";
import {
  generateAccessToken,
  paypalBase,
  handleResponse,
} from "_helpers/server/api/orders";
import { productsRepo, ordersRepo } from "_helpers/server";
import { CartItem } from "_types";

module.exports = apiHandler({
  POST: create,
});

async function create(req: Request) {
  try {
    // use the cart information passed from the front-end to calculate the order amount details
    const body = await req.json();
    const cart = body.cart;

    const sanitizedCart: CartItem[] = await Promise.all(
      cart.map(async (item: CartItem) => {
        const product = await productsRepo.getById(item.product.id);

        if (!product) {
          throw new Error("Product not found in the database based on ID");
        }
        // Ensure that the price is correct and not manipulated by the user.
        // Also, ensure that the quantity is positive to avoid negative total price.
        return {
          quantity: Math.abs(item.quantity),
          product: { ...item.product, price: product.price },
        };
      })
    );

    const jsonResponse = await createOrder(sanitizedCart);

    console.log("Response for create order:", jsonResponse);

    if (
      jsonResponse.httpStatusCode === 201 &&
      jsonResponse.status === "CREATED"
    ) {
      await saveToDatabase(body, sanitizedCart, jsonResponse);
    }

    return jsonResponse;
  } catch (error) {
    throw new Error("Failed to create order: " + error);
  }
}

create.schema = joi.object({
  user: joi.object().required(),
  shippingAddress: joi.object().required(),
  servicePoint: joi.object().required(),
  cart: joi.array().required(),
});

/**
 * The code for this function is based on: https://developer.paypal.com/docs/checkout/standard/integrate/#link-integratebackend
 *
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart: CartItem[]) => {
  // use the cart information passed from the front-end to calculate the purchase unit details

  console.log(
    "shopping cart information passed from the frontend createOrder() callback after sanitized:",
    cart
  );

  const accessToken = await generateAccessToken();

  const url = `${paypalBase}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",

    purchase_units: [
      {
        items: cart.map((item: CartItem) => {
          return {
            name:
              item.product.brand +
              " " +
              item.product.category +
              " " +
              item.product.type,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: "SEK",
              value: item.product.price.toString(),
            },
          };
        }),
        amount: {
          currency_code: "SEK",

          value: cart
            .reduce((totalPrice: number, item: CartItem) => {
              return totalPrice + item.quantity * item.product.price;
            }, 0)
            .toString(),

          breakdown: {
            item_total: {
              currency_code: "SEK",
              value: cart
                .reduce((totalPrice: number, item: CartItem) => {
                  return totalPrice + item.quantity * item.product.price;
                }, 0)
                .toString(),
            },
          },
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

async function saveToDatabase(body: any, cart: CartItem[], paypalOrder: any) {
  const { user, shippingAddress, servicePoint } = body;
  await ordersRepo.create({
    id: paypalOrder.id,
    status: paypalOrder.status,
    isPaid: false,
    user,
    shippingAddress,
    servicePoint,
    cart,
    totalPrice: {
      value: cart.reduce((totalPrice: number, item: CartItem) => {
        return totalPrice + item.quantity * item.product.price;
      }, 0),
      currency: "SEK",
    },
    paypalOrder,
    paypalCapture: {},
  });
}
