import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItems,
  increaseQty,
  decreaseQty,
} from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border-2 border-slate-400 m-1">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} alt="" className="h-30 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-2xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-600"
            onClick={() => dispatch(deleteCartItems(id))}
          >
            <MdDelete />
          </div>
        </div>
        <p className="text-slate-500 font-medium ">{category}</p>
        <p className="font-bold text-base">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              className="bg-slate-300 p-1 my-2 rounded hover:bg-slate-400 "
              onClick={() => dispatch(increaseQty(id))}
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              className="bg-slate-300 p-1 my-2 rounded hover:bg-slate-400 "
              onClick={() => dispatch(decreaseQty(id))}
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center font-bold text-slate-700 gap-2">
            <p>Total :</p>
            <p><span className="text-red-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
