export type BlogCategoryId = 'all' | 'science' | 'ingredients' | 'rituals' | 'sustainability' | 'seasonal';

export interface BlogCategory {
  id: BlogCategoryId;
  label: string;
  description?: string;
  count?: number;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogSection {
  heading: string;
  body: string;
  highlight?: string;
  subsections?: {
    title: string;
    text: string;
  }[];
}

export interface RecommendedProduct {
  id: number;
  name: string;
  price: string;
  rating?: number;
  reviewsCount?: number;
  img: string;
  link: string;
  tagline?: string;
}

export interface BlogComment {
  id: string;
  authorName: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
  verified?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: Exclude<BlogCategoryId, 'all'>;
  categoryLabel: string;
  readTime: string;
  listenTime?: string;
  publishDate: string;
  author: BlogAuthor;
  image: string;
  imageCaption?: string;
  excerpt: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  views?: number;
  claps?: number;
  content: {
    introduction: string;
    takeaways: string[];
    sections: BlogSection[];
    clinicalSummary: string;
    recommendedProducts: RecommendedProduct[];
    citations?: string[];
  };
  comments?: BlogComment[];
}
