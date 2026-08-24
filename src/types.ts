/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'women' | 'men' | 'boys' | 'girls';

export interface Product {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  tags: string[];
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Category | 'lifestyle';
  image: string;
}

export interface NavigationItem {
  name: string;
  path: string;
}

export interface ContactInfo {
  brand: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}
