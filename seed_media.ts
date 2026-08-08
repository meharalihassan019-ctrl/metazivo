import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const rawDb = fs.readFileSync('data/db.json', 'utf8');
const db = JSON.parse(rawDb);

async function seed() {
  console.log("Seeding media...");
  for (const m of db.media) {
    if (!m.id) {
       m.id = 'media-' + Date.now();
    }
    await setDoc(doc(firestoreDb, "media", String(m.id)), m);
    console.log("Seeded", m.id);
  }
  console.log("Done");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
