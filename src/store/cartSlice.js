import { createSlice } from '@reduxjs/toolkit' 

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartState(),
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: parseFloat(String(newItem.price).replace(/[^0-9.]/g, '')),
                    quantity: newItem.quantity || 1,
                    totalPrice: parseFloat(String(newItem.price).replace(/[^0-9.]/g, '')) * (newItem.quantity || 1),
                    productName: newItem.productName,
                    img: newItem.img
                });
            } else {
                existingItem.quantity += (newItem.quantity || 1);
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            }
            saveCartState(state);
        },
        removeItem(state, action) {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            saveCartState(state);
        },
        incrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            }
            saveCartState(state);
        },
        decrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                }
            }
            saveCartState(state);
        },
        clearCart(state) {
            state.items = [];
            saveCartState(state);
        }
    }
})

export default cartSlice.reducer;
export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;