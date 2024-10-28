'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CharityCategory } from "@/types/charityCategory";
import { getCharityCategories } from '@/services/charityCategory';
import { getCharityById, updateCharity } from '@/services/charity';
import { CharityFormData } from './CharityCreate';

interface Props {
  charityId: number;
}

const CharityEditForm = ({ charityId }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CharityCategory[]>([]);
  const [formData, setFormData] = useState<CharityFormData>({
    name: '',
    description: '',
    impact_metric: '',
    impact_ratio: '',
    website_url: '',
    category: 0,
    image: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesResponse = await getCharityCategories();
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        const charityResponse = await getCharityById(charityId);
        if (charityResponse.data) {
          const charity = charityResponse.data;
          setFormData({
            name: charity.name,
            description: charity.description,
            impact_metric: charity.impact_metric,
            impact_ratio: charity.impact_ratio.toString(),
            website_url: charity.website_url,
            category: charity.category.id,
            image: charity.image
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading charity data');
      }
    };

    loadData();
  }, [charityId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category' ? parseInt(value) : value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateCharity(charityId, formData);
      router.push(`/charities/${charityId}`);
    } catch (error) {
      console.error('Update charity error:', error);
      alert('Error updating charity');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full border rounded p-2
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    focus:border-blue-500 dark:focus:border-blue-400
    placeholder-gray-400 dark:placeholder-gray-500`;

  const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`;

  const primaryButtonClasses = `w-full bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
    text-blue-600 dark:text-blue-400 
    px-4 py-2 rounded
    border border-blue-600 dark:border-blue-400
    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className="container mx-auto mt-10 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input 
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClasses}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={inputClasses}
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className={inputClasses}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="impact_metric" className={labelClasses}>
            Impact Metric
          </label>
          <input
            type="text"
            id="impact_metric"
            name="impact_metric"
            value={formData.impact_metric}
            onChange={handleInputChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="impact_ratio" className={labelClasses}>
            Impact Ratio
          </label>
          <input
            type="number"
            id="impact_ratio"
            name="impact_ratio"
            value={formData.impact_ratio}
            onChange={handleInputChange}
            step="0.01"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="website_url" className={labelClasses}>
            Website URL
          </label>
          <input
            type="url"
            id="website_url"
            name="website_url"
            value={formData.website_url}
            onChange={handleInputChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="image" className={labelClasses}>
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={inputClasses}
          />
          {formData.image && (
            <div className="mt-2">
              <img 
                src={formData.image} 
                alt="Current charity image" 
                className="max-w-xs h-auto"
              />
            </div>
          )}
        </div>

        <div className="text-center">
          <button 
            type="submit" 
            className={primaryButtonClasses}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Charity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharityEditForm;