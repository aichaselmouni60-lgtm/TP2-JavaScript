const produits = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 }
];

// Vérification des données
function estValide(produit) {
  return (
    Number.isFinite(produit.prix) && produit.prix >= 0 &&
    Number.isFinite(produit.stock) && produit.stock >= 0
  );
}

// 1. Afficher les produits
function afficherProduits(liste) {
  console.log("1) Catalogue :");

  liste.forEach((p) => {
    console.log(`${p.nom} : ${p.prix} MAD`);
  });
}

// 2. Produits disponibles
function getDisponibles(liste) {
  return liste.filter((p) => estValide(p) && p.stock > 0);
}

// 3. Valeur totale du stock
function valeurStock(liste) {
  return liste
    .filter(estValide)
    .reduce((total, p) => total + p.prix * p.stock, 0);
}

// 4. Produit disponible le moins cher
function moinsCher(liste) {
  const disponibles = getDisponibles(liste);

  if (disponibles.length === 0) {
    return null;
  }

  return disponibles.reduce((min, p) =>
    p.prix < min.prix ? p : min
  );
}

// 5. Résumé des produits
function resume(liste) {
  return liste.map((p) =>
    `${p.nom} - ${p.prix} MAD - ${p.stock} unités`
  );
}

// Affichage des résultats
afficherProduits(produits);

const disponibles = getDisponibles(produits);
console.log("\n2) Produits disponibles :", disponibles.length);
console.log(disponibles.map((p) => p.nom));

console.log("\n3) Valeur du stock :", valeurStock(produits), "MAD");

const produitMoinsCher = moinsCher(produits);

if (produitMoinsCher !== null) {
  const { nom, prix } = produitMoinsCher;
  console.log("\n4) Produit le moins cher :", nom, prix, "MAD");
} else {
  console.log("\n4) Aucun produit disponible");
}

console.log("\n5) Résumé :");
resume(produits).forEach((ligne) => console.log(ligne));

// Tests imposés
console.log("\n--- Tests ---");

// Test 1 : Écran n'est pas disponible
console.log("Écran disponible :", getDisponibles(produits).some(p => p.nom === "Écran"));

// Test 2 : Aucun produit disponible
const produitsVides = produits.map(p => ({ ...p, stock: 0 }));
console.log("Aucun disponible :", moinsCher(produitsVides) === null);

// Test 3 : Catalogue vide
console.log("Stock catalogue vide :", valeurStock([]), "MAD");

// Test 4 : Données invalides
console.log("Prix invalide :", estValide({ prix: -10, stock: 2 }));