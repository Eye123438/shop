import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2,
  Package,
  Utensils,
  Star,
  ImageIcon,
  DollarSign,
  Boxes
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, FoodItem } from '../../types';

const MarketplaceManagement: React.FC = () => {
  const { productList, foodList, addProduct, updateProduct, addFoodItem, updateFoodItem } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'food'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    available: true,
    featured: false
  });

  const productCategories = ['Phones', 'Computers', 'Fridges', 'Accessories'];
  const foodCategories = ['Fast Food', 'Drinks', 'Snacks'];

  const currentItems = activeTab === 'products' ? productList : foodList;
  const currentCategories = activeTab === 'products' ? productCategories : foodCategories;

  const filteredItems = currentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image
    };

    if (editingItem) {
      if (activeTab === 'products') {
        updateProduct(editingItem.id, {
          ...itemData,
          stock: parseInt(formData.stock) || 0,
          featured: formData.featured
        });
      } else {
        updateFoodItem(editingItem.id, {
          ...itemData,
          available: formData.available
        });
      }
      alert(`${activeTab === 'products' ? 'Product' : 'Food item'} updated successfully!`);
    } else {
      if (activeTab === 'products') {
        addProduct({
          ...itemData,
          stock: parseInt(formData.stock) || 0,
          featured: formData.featured
        });
      } else {
        addFoodItem({
          ...itemData,
          available: formData.available
        });
      }
      alert(`${activeTab === 'products' ? 'Product' : 'Food item'} added successfully!`);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      image: '',
      stock: '',
      available: true,
      featured: false
    });
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleEdit = (item: Product | FoodItem) => {
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      stock: 'stock' in item ? item.stock.toString() : '',
      available: 'available' in item ? item.available : true,
      featured: 'featured' in item ? item.featured || false : false
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const toggleFeatured = (productId: string) => {
    const product = productList.find(p => p.id === productId);
    if (product) {
      updateProduct(productId, { featured: !product.featured });
    }
  };

  const toggleAvailable = (foodId: string) => {
    const food = foodList.find(f => f.id === foodId);
    if (food) {
      updateFoodItem(foodId, { available: !food.available });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace Management</h1>
            <p className="text-gray-600">Manage products, food items, and marketplace settings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add {activeTab === 'products' ? 'Product' : 'Food Item'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-red-800 text-red-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package size={16} />
                <span>Products ({productList.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'food'
                  ? 'border-red-800 text-red-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Utensils size={16} />
                <span>Food Items ({foodList.length})</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Categories</option>
            {currentCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {activeTab === 'products' ? productList.length : foodList.length}
              </div>
              <div className="text-sm text-gray-600">Total {activeTab === 'products' ? 'Products' : 'Food Items'}</div>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              {activeTab === 'products' ? <Package className="text-white" size={24} /> : <Utensils className="text-white" size={24} />}
            </div>
          </div>
        </div>
        
        {activeTab === 'products' ? (
          <>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {productList.filter(p => p.stock > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">In Stock</div>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Boxes className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {productList.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-gray-600">Featured</div>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Star className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    KES {productList.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {foodList.filter(f => f.available).length}
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Utensils className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {foodList.filter(f => !f.available).length}
                  </div>
                  <div className="text-sm text-gray-600">Unavailable</div>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <XCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    KES {Math.round(foodList.reduce((sum, f) => sum + f.price, 0) / foodList.length)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Price</div>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square overflow-hidden bg-gray-100">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                {activeTab === 'products' && 'featured' in item && (
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    className={`p-1 rounded ${item.featured ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{item.category}</span>
                <span className="text-lg font-bold text-red-800">
                  KES {item.price.toLocaleString()}
                </span>
              </div>

              {activeTab === 'products' && 'stock' in item && (
                <div className="text-sm text-gray-600 mb-3">
                  Stock: <span className={item.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.stock} units
                  </span>
                </div>
              )}

              {activeTab === 'food' && 'available' in item && (
                <div className="mb-3">
                  <button
                    onClick={() => toggleAvailable(item.id)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center space-x-1">
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No {activeTab === 'products' ? 'products' : 'food items'} found
          </div>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingItem 
                  ? `Edit ${activeTab === 'products' ? 'Product' : 'Food Item'}` 
                  : `Add New ${activeTab === 'products' ? 'Product' : 'Food Item'}`}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={`Enter ${activeTab === 'products' ? 'product' : 'food item'} name`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (KES) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {currentCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label className="text-sm text-gray-700">
                        Mark as featured product
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'food' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label className="text-sm text-gray-700">
                      Available for order
                    </label>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                  >
                    {editingItem 
                      ? `Update ${activeTab === 'products' ? 'Product' : 'Food Item'}` 
                      : `Add ${activeTab === 'products' ? 'Product' : 'Food Item'}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceManagement;