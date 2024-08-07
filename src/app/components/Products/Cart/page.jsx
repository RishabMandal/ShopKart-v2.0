"use client";

import { GlobalContext } from "@/context";
import Link from "next/link";
import React, { useContext, useEffect, useState, useRef } from "react";
import { checkout } from "../Payment/stripe";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  // console.log(Cart);
  const [totalPriceDay, settotalPriceDay] = useState(0);
  useEffect(() => {
    const total = Cart?.reduce(
      (sum, product) => sum + (product?.price || 0),
      0
    );
    settotalPriceDay(total);
  }, [Cart]);

  // useEffect(() => {
  //   console.log(totalPriceDay);
  // }, [totalPriceDay]);

  function removeProduct(id) {
    const updatedItems = Cart.filter((item) => item.id !== id);
    settotalPriceDay(0);
    setCart(updatedItems);
    try {
      if (Cart && Cart.length > 0) {
        axios
          .post("/api/Cart", {
            id: id,
            operation: "post",
            operation2: "delete",
          })
          .then((response) => console.log("Product successfully deleted"))
          .catch((error) => alert(error));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Coupon functionality
  const couponVal = useRef();
  const { Coupons, setCoupons } = useContext(GlobalContext);
  const [couponApplied, SetcouponApplied] = useState(false);
  const couponCodeFunction = () => {
    if (Coupons?.includes(couponVal.current.value) && !couponApplied) {
      settotalPriceDay((50 * totalPriceDay) / 100);
      SetcouponApplied(true);
    } else alert("Coupon Code Invalid");
  };
  // print yay! you saved 50% on your order!

  // const makePayment = async () => {
  //   const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
  //   const body = {
  //     products: Cart,
  //   };
  //   const headers = { "Content-Type": "application/json" };
  //   const response = await fetch();
  // };

  return (
    <div>
      <div className="p-5 bg-gray-100 min-h-[70vh]">
        <div className="text-3xl text-center mb-10 mt-5 font-bold">
          YOUR SHOPPING CART
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-evenly gap-5">
          <div className="border shadow-xl bg-white p-5 rounded-2xl w-full">
            {Cart?.length <= 0 ? (
              <div className="text-xl text-center font-bold py-5">
                Cart items
              </div>
            ) : (
              <div className="text-xl text-center font-bold py-5">
                {Cart?.length} item(s) in cart
              </div>
            )}
            <div className="flex flex-wrap gap-5 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <Link
                      href={`/components/Products/ViewProductDetail/${product?.id}`}
                      key={product?.id}
                      className="border flex flex-col justify-between rounded-xl shadow-xl p-5 cursor-pointer hover:scale-105 duration-200 bg-white lg:w-1/4 md:w-1/2 w-full"
                    >
                      <div className="text-xl font-bold">{product?.title}</div>
                      <div>{product?.category}</div>
                      <img
                        src={product?.image}
                        alt=""
                        className="max-h-[50vh] w-full object-contain mt-5"
                      />
                      <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                        <div className="text-lg font-bold">
                          ₹{product?.price}.00
                        </div>
                        <div
                          onClick={() => removeProduct(product?.id)}
                          className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 py-2 font-bold text-base"
                        >
                          Remove
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex flex-col justify-center">
                  <div className="py-10 text-center text-base font-semibold text-gray-800">
                    Your Cart is empty
                  </div>
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
          <div className="bg-white p-5 px-10 shadow-xl border rounded-2xl">
            <div className="text-xl font-bold py-5">Order Details</div>
            <div className="text-base py-1">
              Order Total: ₹{totalPriceDay || 0}.00
            </div>
            <div className="text-base py-1">
              CGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-base py-1">
              SGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-base py-1">Other taxes: ₹0.00</div>
            <div className="text-base py-1">
              Discount: -₹{Math.ceil(totalPriceDay * 0.18) || 0}.00
            </div>
            <div className="text-base py-1">
              Coupon discount: -₹{Math.ceil(totalPriceDay * 0.18) || 0}.00
            </div>
            <div className="text-lg py-2 font-semibold">
              Total Payable: ₹{totalPriceDay || 0}.00
            </div>
            <div className="flex flex-row gap-1 mx-auto">
              <input
                type="text"
                ref={couponVal}
                className="text-sm border-2 border-red-600 rounded-lg p-2"
                placeholder="Apply Coupon code"
              />
              <button
                onClick={couponCodeFunction}
                disabled={couponApplied}
                className={`block ${
                  couponVal.current?.value?.length > 0
                    ? "bg-red-600"
                    : "bg-gray-400"
                } hover:bg-red-700 text-sm duration-200 font-semibold text-white text-center rounded-lg px-2 mx-auto`}
              >
                Apply
              </button>
            </div>
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
                totalPriceDay > 0
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400"
              } duration-200 font-semibold text-white text-center rounded-lg p-3 my-5 mx-auto`}
            >
              Proceed to Pay
            </button>
            <div className="flex flex-row justify-center items-center">
              <div className="text-sm">or</div>
              <Link
                href="/components/Products/MainPage"
                className="ml-1 mt-[1px] block text-sm text-red-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
