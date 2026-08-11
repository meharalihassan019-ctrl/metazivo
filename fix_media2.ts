import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function fix() {
  const docRef = doc(firestoreDb, "media", "media-2");
  const d = await getDoc(docRef);
  if (d.exists()) {
     const data = d.data();
     if (!data.url) {
        console.log("Fixing media-2 URL");
        await setDoc(docRef, { ...data, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" });
     }
  }
  process.exit(0);
}
fix().catch(e => { console.error(e); process.exit(1); });
