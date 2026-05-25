/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string; // 'retractable' | 'public'
  name: string;
  slogan: string;
  description: string;
  series: string[];
  features: string[];
  specs: { [key: string]: string };
  image: string;
  advantages: { title: string; desc: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  location: string;
  date: string;
  config: string;
  highlights: string[];
  description: string;
  image: string;
  images: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string; // 'brand' | 'industry' | 'tech'
  summary: string;
  content: string;
  image: string;
}

export interface TechItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  details: string[];
  bgImage: string;
}

export interface ConfigState {
  productType: 'retractable' | 'public';
  style: string;  // Wellgo | Concepto | Orden
  color: string;  // beige | darkgray | black | gold | custom
  pedals: string; // wood | standard
  fences: string; // side | acrylic | glass
  size: string;   // 4m-5w | 5m-6w | 6m-6w | custom
  customSize: { length: string; width: string; height: string };
  mode: string;   // manual | electric | entire
  charging: boolean;
  radar: boolean;
  contactName: string;
  contactPhone: string;
  companyName: string;
  projectAddress: string;
}
