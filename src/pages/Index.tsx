import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Беспроводные наушники",
      price: 12990,
      category: "electronics",
      image: "/img/b5f6b03a-5201-4f94-9d29-9235a1c22a9c.jpg",
      description: "Премиальные наушники с активным шумоподавлением",
    },
    {
      id: 2,
      name: "Смарт-часы",
      price: 24990,
      category: "electronics",
      image: "/img/b5f6b03a-5201-4f94-9d29-9235a1c22a9c.jpg",
      description: "Умные часы с мониторингом здоровья",
    },
    {
      id: 3,
      name: "Стильная куртка",
      price: 8990,
      category: "fashion",
      image: "/img/1916ebcc-6ca6-4e5e-8ac4-cd7acb5344ba.jpg",
      description: "Модная куртка из экологичных материалов",
    },
    {
      id: 4,
      name: "Кроссовки",
      price: 15990,
      category: "fashion",
      image: "/img/1916ebcc-6ca6-4e5e-8ac4-cd7acb5344ba.jpg",
      description: "Комфортные кроссовки для активного образа жизни",
    },
    {
      id: 5,
      name: "Настольная лампа",
      price: 6990,
      category: "home",
      image: "/img/3090ea90-21b0-4c26-be10-884b4526821f.jpg",
      description: "Минималистичная лампа в скандинавском стиле",
    },
    {
      id: 6,
      name: "Декоративная ваза",
      price: 3990,
      category: "home",
      image: "/img/3090ea90-21b0-4c26-be10-884b4526821f.jpg",
      description: "Элегантная ваза из керамики",
    },
  ];

  const categories = [
    { id: "all", name: "Все товары", icon: "Grid3x3" },
    { id: "electronics", name: "Электроника", icon: "Smartphone" },
    { id: "fashion", name: "Мода", icon: "Shirt" },
    { id: "home", name: "Дом и интерьер", icon: "Home" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Store" size={24} className="text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Магазин</h1>
            </div>
            <Button variant="outline" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-blue-600">
                  {getTotalItems()}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">
                {getTotalPrice().toLocaleString()} ₽
              </span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Минималистичный каталог
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Тщательно отобранные товары для современного образа жизни
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
            >
              <Icon name={category.icon as any} size={16} />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/70 backdrop-blur-sm border-0 shadow-md"
            >
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {
                      categories.find((cat) => cat.id === product.category)
                        ?.name
                    }
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 mb-4">
                  {product.description}
                </CardDescription>
                <div className="text-2xl font-bold text-blue-600">
                  {product.price.toLocaleString()} ₽
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Icon name="Plus" size={16} className="mr-2" />В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl p-4 border max-w-sm">
            <h3 className="font-semibold mb-2 flex items-center">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
            </h3>
            <div className="space-y-2">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                </div>
              ))}
              {cart.length > 3 && (
                <div className="text-xs text-gray-500">
                  и ещё {cart.length - 3} товаров...
                </div>
              )}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Итого:</span>
                <span>{getTotalPrice().toLocaleString()} ₽</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
