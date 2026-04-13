import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, Send, ShoppingBag } from "lucide-react";
import { CartItem, OrderDetails } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

export default function Checkout({ cart, clearCart, removeFromCart, updateQuantity }: CheckoutProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    name: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const productsList = cart
      .map((item) => `- ${item.name} (x${item.quantity}) - $${item.price * item.quantity}`)
      .join("\n");

    const message = `New Order:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Products:
${productsList}
Total: $${total}`;

    const whatsappUrl = `https://wa.me/212631464969?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    toast.success("Order sent to WhatsApp!");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="rounded-full bg-zinc-100 p-8">
          <ShoppingBag size={64} className="text-zinc-400" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-zinc-500">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Button asChild>
          <a href="/">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Cart Items */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Your Cart</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-zinc-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6 text-white">
          <div className="flex items-center justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-zinc-400 text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 border-t border-zinc-800 pt-4 flex items-center justify-between text-2xl font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Checkout Details</h2>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOrder} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+212 6XX XXX XXX"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Street, City, Country"
                  required
                  className="min-h-[100px]"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full gap-2 bg-zinc-900 py-6 text-lg">
                <Send size={20} /> Confirm Order via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
