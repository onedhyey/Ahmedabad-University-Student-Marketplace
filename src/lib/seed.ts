import { collection, getDocs, setDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import habitsImg from '../assets/7_habits_book.png';

export const SEED_LISTINGS = [
  {
    id: "seed_7_habits_covey",
    name: "The 7 Habits Of Highly Effective People by Stephen Covey",
    category: "Books",
    price: 350,
    condition: "Good",
    description: "The book is in good condition with only minor signs of use. All pages are intact, with no missing pages or major damage. Perfect for anyone interested in productivity, leadership, or personal growth.\n\nFeel free to reach out through AUSM if you have any questions before placing your order.",
    imageUrl: habitsImg,
    imagePath: "",
    sellerId: "seed_seller_covey",
    sellerName: "Kavya Patel",
    sellerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    isSold: false
  },
  {
    id: "seed_dsa_clrs",
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
    id: "seed_hero_cycle",
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
    id: "seed_casio_calc",
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
    id: "seed_chem_coat",
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

const VALID_SEED_IDS = new Set(SEED_LISTINGS.map(item => item.id));
let isSeedingRunning = false;

export async function seedInitialListingsIfEmpty() {
  if (isSeedingRunning) return;
  isSeedingRunning = true;

  try {
    const querySnapshot = await getDocs(collection(db, 'listings'));

    if (querySnapshot.empty) {
      console.log("Seeding initial AU campus listings with deterministic IDs...");
      for (const item of SEED_LISTINGS) {
        const { id, ...data } = item;
        await setDoc(doc(db, 'listings', id), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } else {
      // Clean up any legacy duplicate seed items from previous addDoc runs
      const deletePromises: Promise<void>[] = [];
      querySnapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const docId = docSnap.id;
        const sellerId = data.sellerId || '';
        const isSeedSeller = sellerId.startsWith('seed_seller_');

        // If it was created as a seed item but doesn't match our deterministic seed IDs, it's a legacy duplicate
        if (isSeedSeller && !VALID_SEED_IDS.has(docId)) {
          console.log(`Cleaning up legacy duplicate seed document ${docId}...`);
          deletePromises.push(deleteDoc(doc(db, 'listings', docId)));
        }
      });

      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }
    }
  } catch (error) {
    console.warn("Could not seed listings (might be offline or Firestore rules):", error);
  } finally {
    isSeedingRunning = false;
  }
}

