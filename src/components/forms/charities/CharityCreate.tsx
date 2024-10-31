"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CharityCategory } from "@/types/charityCategory";
import { getCharityCategories } from '@/services/charityCategory';
import { createCharity } from '@/services/charity';
import { Tooltip } from '@nextui-org/react';
import { IconInfoCircle } from '@tabler/icons-react';

export interface CharityFormData {
  name: string;
  description: string;
  impact_metric: string;
  impact_ratio: string;
  website_url: string;
  category: number;
  image: string | null;
}

const CharityForm = () => {
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
    const loadCategories = async () => {
      try {
        const response = await getCharityCategories();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

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
      const response = await createCharity(formData);

      if (response.data) {
        router.push('/charities');
      } else {
        window.alert('Failed to create charity');
      }
    } catch (error) {
      console.error('Create charity error:', error);
      alert('Error creating charity');
    } finally {
      setLoading(false);
    }
  };

  const primaryButtonClasses = `w-full primaryButtonClasses
    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className="container mx-auto mt-10 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="labelClasses">
            Name
          </label>
          <input 
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="inputClasses"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="labelClasses">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="inputClasses"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="labelClasses">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className="inputClasses"
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
          <label htmlFor="impact_metric" className="labelClasses">
            Impact Metric
            <Tooltip content="Describe what donation wills go towards (e.g., 'meals provided', 'trees planted', etc). Keep it concise and measurable.">
            <span className="text-sm text-gray-500 cursor-help"><IconInfoCircle/></span>
            </Tooltip>
          </label>
          <input
            type="text"
            id="impact_metric"
            name="impact_metric"
            value={formData.impact_metric}
            onChange={handleInputChange}
            className="inputClasses"
            required
          />
        </div>

        <div>
          <label htmlFor="impact_ratio" className="labelClasses">
            Impact Ratio
            <Tooltip content="Enter how many people can be helped per $1. Example: If $20 provides water for 1 person, then 1÷20 = 0.05 people helped per $1. Enter 0.05 as your impact ratio.">
            <span className="text-sm text-gray-500 cursor-help"><IconInfoCircle/></span>
            </Tooltip>
          </label>
          <input
            type="number"
            id="impact_ratio"
            name="impact_ratio"
            value={formData.impact_ratio}
            onChange={handleInputChange}
            step="0.01"
            className="inputClasses"
            required
          />
        </div>

        <div>
          <label htmlFor="website_url" className="labelClasses">
            Website URL
          </label>
          <input
            type="url"
            id="website_url"
            name="website_url"
            value={formData.website_url}
            onChange={handleInputChange}
            className="inputClasses"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="labelClasses">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="inputClasses"
          />
        </div>

        <div className="text-center">
          <button 
            type="submit" 
            className={primaryButtonClasses}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Charity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharityForm;