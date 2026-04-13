import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface HomeProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function Home({ products, addToCart }: HomeProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-20 text-white md:px-16 md:py-32">
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tight md:text-7xl"
          >
            Elevate Your <br /> Everyday Style.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 md:text-xl"
          >
            Discover our curated collection of premium essentials designed for the modern lifestyle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200">
              Shop Collection <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 md:opacity-50">
           <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
            alt="Hero" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Product Grid */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-zinc-500">Our latest arrivals and best sellers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-zinc-900 hover:underline">{product.name}</h3>
                  </Link>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
