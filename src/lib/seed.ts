import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const SEED_LISTINGS = [
  {
    name: "DSA Textbook (Cormen - CLRS 3rd Ed)",
    category: "Books",
    price: 650,
    condition: "Like New",
    description: "Essential for AU Computer Science & Engineering courses. Barely used, no pen marks inside, includes quick reference cheat sheet.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    imagePath: "",
    sellerId: "seed_seller_1",
    sellerName: "Aarav Sharma",
    sellerPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    isSold: false
  },
  {
    name: "Hero Sprint City Bicycle (21-Speed)",
    category: "Cycles",
    price: 3800,
    condition: "Good",
    description: "Perfect for commuting around AU campus and Navrangpura. Recently serviced with new brake pads, includes heavy-duty cable lock & bell.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    imagePath: "",
    sellerId: "seed_seller_2",
    sellerName: "Ananya Patel",
    sellerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    isSold: false
  },
  {
    name: "Casio FX-991EX ClassWiz Scientific Calculator",
    category: "Electronics",
    price: 850,
    condition: "Like New",
    description: "Allowed in all AU engineering, physics, and calculus exams. Works perfectly with solar power + battery, crisp display with protective hard slide-on case.",
    imageUrl: "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?auto=format&fit=crop&w=800&q=80",
    imagePath: "",
    sellerId: "seed_seller_3",
    sellerName: "Rohan Mehta",
    sellerPhoto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    isSold: false
  },
  {
    name: "AU Chemistry Lab Coat & Safety Goggles",
    category: "Other",
    price: 350,
    condition: "Good",
    description: "Standard white cotton lab coat (Size M) required for AU lab courses. Comes with anti-scratch impact safety goggles.",
    imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    imagePath: "",
    sellerId: "seed_seller_4",
    sellerName: "Pooja Trivedi",
    sellerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    isSold: true
  }
];

export async function seedInitialListingsIfEmpty() {
  try {
    const querySnapshot = await getDocs(collection(db, 'listings'));
    if (querySnapshot.empty) {
      console.log("Seeding initial AU campus listings...");
      for (const item of SEED_LISTINGS) {
        await addDoc(collection(db, 'listings'), {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.warn("Could not seed listings (might be offline or Firestore rules):", error);
  }
}
