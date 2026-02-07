import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../serviceAccountKey.json"), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const db = admin.firestore();

async function fix() {
  const hospitalsSnap = await db.collection("hospitals").get();
  const bedsSnap = await db.collection("beds").get();

  const hospitals = hospitalsSnap.docs.map(d => d.id);

  let i = 0;

  for (const bedDoc of bedsSnap.docs) {
    const hospitalId = hospitals[i % hospitals.length];

    await bedDoc.ref.update({
      hospitalId,
    });

    console.log(`Updated ${bedDoc.id} → ${hospitalId}`);
    i++;
  }

  console.log("✅ All beds fixed");
  process.exit();
}

fix();
