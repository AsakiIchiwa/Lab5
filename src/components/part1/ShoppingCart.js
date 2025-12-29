import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addItem, 
  removeItem, 
  deleteItem, 
  clearCart,
  selectCartCount,
  selectCartTax,
  selectGrandTotal
} from '../../store/cartSlice';
import './ShoppingCart.css';

// ============================================
// Exercise 1.2: The Global Store (Redux Toolkit)
// Shopping Cart with RTK and createSelector
// ============================================

// Mock RPG items for the shop
const shopItems = [
  { id: 1, name: 'Enchanted Sword', price: 150, icon: '⚔️', rarity: 'epic', description: '+50 Attack Power' },
  { id: 2, name: 'Dragon Shield', price: 120, icon: '🛡️', rarity: 'rare', description: '+40 Defense' },
  { id: 3, name: 'Health Potion', price: 25, icon: '🧪', rarity: 'common', description: 'Restore 100 HP' },
  { id: 4, name: 'Mana Crystal', price: 35, icon: '💎', rarity: 'uncommon', description: 'Restore 50 MP' },
  { id: 5, name: 'Phoenix Feather', price: 200, icon: '🪶', rarity: 'legendary', description: 'Auto-revive once' },
  { id: 6, name: 'Shadow Cloak', price: 180, icon: '🧥', rarity: 'epic', description: '+30% Stealth' },
  { id: 7, name: 'Ancient Tome', price: 90, icon: '📖', rarity: 'rare', description: '+25 Magic Power' },
  { id: 8, name: 'Lucky Charm', price: 45, icon: '🍀', rarity: 'uncommon', description: '+10% Critical Hit' },
];

const ShoppingCart = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartCount = useSelector(selectCartCount);
  const cartTax = useSelector(selectCartTax);
  const grandTotal = useSelector(selectGrandTotal);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="page-container shopping-cart-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🛒</span>
          The Global Store
        </h1>
        <p className="page-subtitle">
          Exercise 1.2: Redux Toolkit with createSlice and createSelector
        </p>
      </header>

      <div className="shopping-cart-content">
        {/* Shop Section */}
        <section className="shop-section rpg-panel">
          <h2 className="section-title">Adventurer's Shop</h2>
          <p className="shop-description">Browse legendary items and add them to your cart!</p>
          
          <div className="shop-items-grid">
            {shopItems.map(item => (
              <div key={item.id} className={`shop-item rarity-${item.rarity}`}>
                <div className="item-icon">{item.icon}</div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <span className={`item-rarity ${item.rarity}`}>{item.rarity}</span>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="item-price">
                      <span className="gold-icon">💰</span>
                      {item.price} Gold
                    </span>
                    <button 
                      className="rpg-button add-button"
                      onClick={() => handleAddItem(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Section */}
        <section className="cart-section rpg-panel">
          <div className="cart-header">
            <h2 className="section-title">
              Your Cart
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </h2>
            {cartItems.length > 0 && (
              <button 
                className="rpg-button rpg-button-danger clear-button"
                onClick={handleClearCart}
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">🎒</span>
              <p>Your cart is empty, brave adventurer!</p>
              <p className="empty-hint">Visit the shop to acquire legendary items.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-icon">{item.icon}</div>
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-price">💰 {item.price} each</span>
                    </div>
                    <div className="cart-item-quantity">
                      <button 
                        className="qty-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-button"
                        onClick={() => handleAddItem(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      💰 {item.totalPrice}
                    </div>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>💰 {totalAmount.toFixed(0)} Gold</span>
                </div>
                <div className="summary-row tax-row">
                  <span>Kingdom Tax (10%):</span>
                  <span className="tax-amount">💰 {cartTax.toFixed(0)} Gold</span>
                </div>
                <div className="summary-row total-row">
                  <span>Grand Total:</span>
                  <span className="grand-total">💰 {grandTotal.toFixed(0)} Gold</span>
                </div>
                <button className="rpg-button rpg-button-magic checkout-button">
                  🛒 Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// cartSlice.js with createSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = existing.price * existing.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
      state.totalAmount = state.items.reduce((t, i) => t + i.totalPrice, 0);
    },
    removeItem: (state, action) => { /* decrement or remove */ },
    clearCart: (state) => { state.items = []; state.totalAmount = 0; },
  },
});

// Memoized selector with createSelector
export const selectCartTax = createSelector(
  [selectTotalAmount],
  (totalAmount) => totalAmount * 0.10 // Only recalculates when totalAmount changes!
);`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;
