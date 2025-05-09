import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

import axios from "axios";
axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider =({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])

    const [cartItems,setCartItems] = useState({})

    const [searchQuery,setSearchQuery] = useState({})

    // Fetch All products
    const fetchProduct = async ()=>{
        setProducts(dummyProducts)
    }

    //Fetch User Auth status, User Data And Cart Items

    const fetchUser = async ()=>{

        try { 
            const {data} = await axios.get('api/user/is-auth');
            if(data.success){
                setUser(data.user)
            
                setCartItems(data.user.cartItems)}
            
        } catch (error) {

            setUser(null)
            
        }
    }


    // Add Product to Cart
    const addToCart=(itemId)=>{
        let cartData =structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]+=1;
        }else{
            cartData[itemId]=1;
        }

        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update Cart Item Quantity

    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData)
        toast.success("cart Updated")
    }

    //Remove Product from Cart

    const removeFromCart= (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -=1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed From Cart")
        setCartItems(cartData)
    }


    //Get Cart Item Count

    const getCartCount=()=>{
        let totalCount= 0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    }


    //Get cart total Amount

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=itemInfo.offerPrice * cartItems[items]
            }

            
        }
        return Math.floor(totalAmount*100) /100;
    }

    useEffect(()=>{
        fetchProduct()
        fetchUser()

    },[])


    const value={navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,
        products,currency,addToCart,updateCartItem,removeFromCart,cartItems,
        searchQuery,setSearchQuery,getCartAmount,getCartCount,axios}

    return <AppContext.Provider value={value}>
        {children}

    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}