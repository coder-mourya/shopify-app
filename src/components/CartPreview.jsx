import React from 'react';
import { Card, Badge, Progress } from 'antd';
import { ShoppingCart, X } from 'lucide-react';

const CartPreview = ({ stickyCart, cartDrawer }) => {
  const currentTotal = 89.97;
  const shippingProgress = (currentTotal / cartDrawer.freeShippingThreshold) * 100;

  return (
    <Card title="Cart Preview" className="h-full">
      <div className="space-y-6">
        {/* Sticky Cart Preview */}
        {stickyCart.enabled && (
          <div className="preview-container">
            <div className="relative w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
              <div
                className={`absolute flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                  stickyCart.position === 'top-left' ? 'top-4 left-4' :
                  stickyCart.position === 'top-right' ? 'top-4 right-4' :
                  stickyCart.position === 'bottom-left' ? 'bottom-4 left-4' :
                  'bottom-4 right-4'
                } ${
                  stickyCart.style === 'floating' ? 'shadow-lg' :
                  stickyCart.style === 'fixed' ? 'shadow-md' :
                  'shadow-sm'
                }`}
                style={{
                  backgroundColor: stickyCart.backgroundColor,
                  color: stickyCart.textColor,
                  borderRadius: `${stickyCart.borderRadius}px`,
                }}
              >
                <ShoppingCart size={18} />
                <div className="flex flex-col">
                  {stickyCart.showProductCount && (
                    <span className="text-xs font-medium">3 items</span>
                  )}
                  {stickyCart.showTotal && (
                    <span className="text-sm font-bold">$89.97</span>
                  )}
                </div>
                <Badge count={3} size="small" style={{ backgroundColor: '#ff4d4f' }} />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-sm">
                Store Preview
              </div>
            </div>
          </div>
        )}

        {/* Cart Drawer Preview */}
        {cartDrawer.enabled && (
          <div className="preview-container">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Cart</h3>
                <X size={18} className="text-gray-400 cursor-pointer" />
              </div>
              
              {cartDrawer.showShippingBar && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-700">
                      {shippingProgress >= 100 
                        ? 'You get FREE shipping!' 
                        : `$${(cartDrawer.freeShippingThreshold - currentTotal).toFixed(2)} away from FREE shipping`
                      }
                    </span>
                  </div>
                  <Progress
                    percent={Math.min(shippingProgress, 100)}
                    strokeColor="#00B167"
                    size="small"
                    showInfo={false}
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Product 1</p>
                    <p className="text-xs text-gray-600">$29.99</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Product 2</p>
                    <p className="text-xs text-gray-600">$39.99</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total: $89.97</span>
                </div>
                <button className="w-full bg-shopify-500 text-white py-2 rounded-lg font-medium">
                  Checkout
                </button>
              </div>

              {cartDrawer.showRecommendations && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">You might also like</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <div className="w-full h-16 bg-gray-200 rounded mb-1"></div>
                      <p className="text-xs">Product</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <div className="w-full h-16 bg-gray-200 rounded mb-1"></div>
                      <p className="text-xs">Product</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CartPreview;