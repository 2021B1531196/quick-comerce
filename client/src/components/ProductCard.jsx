import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ products }) => {
    const [count, setCount] = React.useState(0);
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return products && (
        <div
            onClick={() => {
                navigate(`/products/${products.category.toLowerCase()}/${products._id}`);
                scrollTo(0, 0);
            }}
            className="border border-gray-300 rounded-md p-3 bg-white w-full max-w-[15rem] sm:max-w-[16rem] cursor-pointer"
        >
            {/* Product Image */}
            <div className="group flex items-center justify-center">
                <img
                    className="group-hover:scale-105 transition-transform duration-200 ease-in-out max-w-[6.5rem] sm:max-w-[9rem]"
                    src={products.image[0]}
                    alt={products.name}
                />
            </div>

            {/* Product Details */}
            <div className="mt-2 text-sm text-gray-600">
                <p className="capitalize">{products.category}</p>
                <p className="text-gray-800 font-medium text-base truncate">{products.name}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    {Array(5).fill('').map((_, i) => (
                        <img
                            key={i}
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt="star"
                            className="w-4 h-4"
                        />
                    ))}
                    <span className="text-xs text-gray-500">(4)</span>
                </div>

                {/* Price and Cart Button */}
                <div className="flex items-end justify-between mt-3">
                    <p className="text-primary font-semibold text-sm sm:text-base">
                        {currency} RS-{products.offerPrice}
                        <span className="line-through text-gray-400 text-xs ml-1">
                            {currency} RS-{products.price}
                        </span>
                    </p>

                    <div onClick={(e) => e.stopPropagation()} className="text-primary">
                        {!cartItems[products._id] ? (
                            <button
                                className="flex items-center gap-1 bg-primary/10 border border-primary/20 text-xs sm:text-sm px-2 py-1 rounded"
                                onClick={() => addToCart(products._id)}
                            >
                                <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 bg-primary/20 rounded px-2 py-1 text-xs sm:text-sm">
                                <button onClick={() => removeFromCart(products._id)} className="px-2">-</button>
                                <span className="w-5 text-center">{cartItems[products._id]}</span>
                                <button onClick={() => addToCart(products._id)} className="px-2">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;