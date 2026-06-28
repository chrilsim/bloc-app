import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // ---------------- ADD TO CART ----------------
    const addToCart = (vendor, item, quantity = 1) => {
        setCartItems((prev) => {
            const vendorIndex = prev.findIndex(
                (v) => v.vendorId === vendor.id
            );

            // NEW VENDOR
            if (vendorIndex === -1) {
                return [
                    ...prev,
                    {
                        vendorId: vendor.id,
                        username: vendor.username,
                        profileImage: vendor.profileImage,
                        items: [
                            {
                                ...item,
                                quantity,
                            },
                        ],
                    },
                ];
            }

            // EXISTING VENDOR
            return prev.map((v) => {
                if (v.vendorId !== vendor.id) return v;

                const itemExist = v.items.find(
                    (i) => i.id === item.id
                );

                // EXISTING ITEM
                if (itemExist) {
                    return {
                        ...v,
                        items: v.items.map((i) =>
                            i.id === item.id
                                ? {
                                      ...i,
                                      quantity: i.quantity + quantity,
                                  }
                                : i
                        ),
                    };
                }

                // NEW ITEM
                return {
                    ...v,
                    items: [
                        ...v.items,
                        {
                            ...item,
                            quantity,
                        },
                    ],
                };
            });
        });
    };

    // ---------------- INCREASE ----------------
    const increaseQuantity = (vendorId, itemId) => {
        setCartItems((prev) =>
            prev.map((vendor) => {
                if (vendor.vendorId !== vendorId) return vendor;

                return {
                    ...vendor,
                    items: vendor.items.map((item) =>
                        item.id === itemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            })
        );
    };

    // ---------------- DECREASE ----------------
    const decreaseQuantity = (vendorId, itemId) => {
        setCartItems((prev) =>
            prev
                .map((vendor) => {
                    if (vendor.vendorId !== vendorId) return vendor;

                    const updatedItems = vendor.items
                        .map((item) =>
                            item.id === itemId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0);

                    return {
                        ...vendor,
                        items: updatedItems,
                    };
                })
                .filter((vendor) => vendor.items.length > 0)
        );
    };

    // ---------------- REMOVE ITEM ----------------
    const removeItem = (vendorId, itemId) => {
        setCartItems((prev) =>
            prev
                .map((vendor) => {
                    if (vendor.vendorId !== vendorId) return vendor;

                    return {
                        ...vendor,
                        items: vendor.items.filter(
                            (item) => item.id !== itemId
                        ),
                    };
                })
                .filter((vendor) => vendor.items.length > 0)
        );
    };

    // ---------------- REMOVE VENDOR ----------------
    const removeVendor = (vendorId) => {
        setCartItems((prev) =>
            prev.filter((v) => v.vendorId !== vendorId)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeItem,
                removeVendor,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};