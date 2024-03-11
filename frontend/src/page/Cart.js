import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import gif from "../assest/200w.webp";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600 ">
          Your Cart Item
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total card item */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">
                Order Summary
              </h2>
              <div className="flex w-full py-3 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-3 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  {" "}
                  <span className="text-red-500">₹</span>
                  {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg p-2 rounded font-bold text-white">
                Pay
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex w-full justify-center items-center flex-col gap-2 p-2">
              <img
                src={gif}
                alt=""
                className="w-full max-w-sm border-black shadow-md drop-shadow-md rounded-full"
              />
              <p className="text-3xl font-bold text-slate-500 m-3">
                Empty Cart
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
