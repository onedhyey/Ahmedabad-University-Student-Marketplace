export type ListingCategory = 'Books' | 'Cycles' | 'Electronics' | 'Other';
export type ListingCondition = 'Like New' | 'Good' | 'Fair';

export interface Listing {
  id: string;
  name: string;
  category: ListingCategory;
  price: number;
  condition: ListingCondition;
  description: string;
  imageUrl?: string;
  imagePath?: string;
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any;
  sellerId: string;
  sellerName: string;
  sellerPhoto?: string;
  isSold: boolean;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
