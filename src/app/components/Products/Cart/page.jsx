"use client";

import { GlobalContext } from "@/context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { checkout } from "../Payment/stripe";
import axios from "axios";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  // console.log(Cart);
  const [totalPriceDay, settotalPriceDay] = useState(0);
  useEffect(() => {
    Cart.forEach((product) => {
      settotalPriceDay((prev) => prev + product.price);
    });
  }, [Cart]);

  function removeProduct(id) {
    const updatedItems = Cart.filter((item) => item.id !== id);
    settotalPriceDay(0);
    setCart(updatedItems);
  }
  return (
    <div>
      <div className="p-5 bg-gray-100 min-h-[70vh]">
        <div className="text-5xl text-center mb-16 mt-8 font-bold">
          YOUR SHOPPING CART
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-evenly gap-10">
          <div className="border shadow-xl bg-white p-10 rounded-2xl w-full">
            <div className="text-3xl text-center font-bold py-5">Cart items</div>
            <div className="flex flex-wrap gap-5 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <div
                      key={product?.id}
                      className="border flex flex-col justify-between rounded-xl shadow-xl p-5 cursor-pointer hover:scale-105 duration-200 bg-white lg:w-1/4 md:w-1/2 w-full"
                    >
                      <div className="text-3xl font-bold">{product?.title}</div>
                      <div>{product?.category}</div>
                      <img
                        src={product?.image}
                        alt=""
                        className="max-h-[50vh] w-full object-contain mt-5"
                      />
                      <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                        <div className="text-2xl font-bold">
                          ₹{product?.price}.00
                        </div>
                        <div
                          onClick={() => removeProduct(product?.id)}
                          className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-xl"
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col justify-center">
                  <div className="py-10 text-center text-xl font-semibold text-gray-800">Your Cart is empty</div>
                  <Link
                    href="/components/Products/MainPage"
                    className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-center text-white rounded-lg p-3"
                  >
                    Move to Products
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* {Cart && Cart.length > 0 && ( */}
          <div className="bg-white p-10 shadow-xl border rounded-2xl">
            <div className="text-3xl font-bold py-5">Order Details</div>
            <div className="text-xl py-1">
              Order Total: ₹{totalPriceDay || 0}.00
            </div>
            <div className="text-xl py-1">
              CGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-xl py-1">
              SGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-xl py-1">Other taxes: ₹0.00</div>
            <div className="text-xl py-1">
              Discount: -₹{Math.ceil(totalPriceDay * 0.18) || 0}.00
            </div>
            <div className="text-2xl py-2 font-semibold">
              Total Payable: ₹{totalPriceDay || 0}.00
            </div>
            {/* <Link
              href="/components/Products/MainPage"
              className="block bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 mx-auto"
            >
              Proceed to Pay
            </Link> */}
            <button
              onClick={() => {
                if (totalPriceDay === 0) alert("Cart is empty");
                else {
                  checkout({
                    lineItems: [
                      { price: "price_1Np80oSHBnKtF1MbmfiUoPRE", quantity: 1 },
                    ],
                  });
                }
              }}
              className={`block ${
                totalPriceDay > 0 ? "bg-red-600" : "bg-gray-400"
              } hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 my-5 mx-auto`}
            >
              Proceed to Pay
            </button>
            <div className="flex flex-row justify-center">
              or
              <Link
                href="/components/Products/MainPage"
                className="ml-1 text-red-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
