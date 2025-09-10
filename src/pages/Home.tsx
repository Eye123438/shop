import React, { useState } from 'react';
import { ShoppingCart, Utensils, Phone, CheckCircle, Star, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { services } from '../data/mockData';
import ServiceModal from '../components/ServiceModal';
import { Service } from '../types';

const Home: React.FC = () => {
  const { productList, foodList, addToCart } = useApp();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProducts = productList.filter(product => product.featured);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleProductOrder = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      type: 'product'
    });
    alert(`${product.name} added to cart!`);
  };

  const handleFoodOrder = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      type: 'food'
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 via-red-700 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            QUICKLINK SERVICES
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-red-100">
            "Your Time, Our Priority"
          </p>
          <p className="text-lg mb-8 text-red-200">
            Alternative Brand: Errand Runners
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-white text-red-800 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              Book a Service
            </button>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Shop Products
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors">
              Order Food
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors">
              View Services
            </button>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-yellow-400" />
              <span>Fast & Reliable</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-yellow-400" />
              <span>Affordable</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-yellow-400" />
              <span>Trusted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-yellow-400" />
              <span>Personalized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional errand and delivery services to make your life easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-800 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <button className="mt-4 text-red-800 font-medium hover:text-red-600 transition-colors">
                  Book Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <ShoppingCart className="text-red-800" />
              <span>Shop Products</span>
            </h2>
            <p className="text-gray-600">Electronics, appliances, and more delivered to your door</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-800">
                      KES {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleProductOrder(product)}
                      className="bg-red-800 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Stock: {product.stock} units</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Food Delivery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <Utensils className="text-red-800" />
              <span>Order Food</span>
            </h2>
            <p className="text-gray-600">Fast food delivery with instant ordering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodList.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {item.available ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-800">
                      KES {item.price}
                    </span>
                    <button
                      onClick={() => handleFoodOrder(item)}
                      disabled={!item.available}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        item.available
                          ? 'bg-red-800 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {item.available ? 'Order Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600 text-sm">Quick turnaround times with reliable service delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Rated</h3>
              <p className="text-gray-600 text-sm">Highly rated by thousands of satisfied customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer support and assistance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Offers</h3>
              <p className="text-gray-600 text-sm">Regular discounts and promotional packages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Corporate Packages</h3>
              <p className="text-gray-600 text-sm mb-4">Bulk service discounts for businesses</p>
              <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Household Plans</h3>
              <p className="text-gray-600 text-sm mb-4">Monthly family service subscriptions</p>
              <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Discounts</h3>
              <p className="text-gray-600 text-sm mb-4">Up to 20% off on electronics</p>
              <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Food Combos</h3>
              <p className="text-gray-600 text-sm mb-4">Save on meal combo deals</p>
              <button className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            "Let Us Run the Errands, While You Run the World!"
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to save time and get things done efficiently?
          </p>
          <button className="bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;