import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductDetails({ products, addToCart }: ProductDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => navigate("/")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="gap-2 text-zinc-500 hover:text-zinc-900"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square overflow-hidden rounded-3xl bg-white shadow-sm"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-zinc-100 text-zinc-600">
              New Arrival
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
            <p className="text-3xl font-bold text-zinc-900">${product.price}</p>
            <p className="text-lg leading-relaxed text-zinc-600">{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1 gap-2 bg-zinc-900" onClick={() => addToCart(product)}>
              <ShoppingCart size={20} /> Add to Shopping Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Truck size={20} className="text-zinc-900" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <RotateCcw size={20} className="text-zinc-900" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <ShieldCheck size={20} className="text-zinc-900" />
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
