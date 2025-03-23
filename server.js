const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // ändrade port så det ska fungera både lokalt och på render

app.use(cors());

// Middleware för att hantera JSON-data
app.use(express.json());

// Route för startsidan
app.get("/", (req, res) => {
   res.send("Välkommen till Egg Tips API! Besök /tips för att se tips.");
  });

// Exempeldata: Äggkokningstips
const eggTips = [
  { id: 1, tip: "Använd äldre ägg, de är lättare att skala." },
  { id: 2, tip: "Lägg äggen i isvatten direkt efter kokning för att separera skalet." },
  { id: 3, tip: "Tillsätt lite bakpulver eller vinäger i vattnet för att göra skalet lättare att ta bort." },
  { id: 4, tip: "Knäck skalet lite innan du lägger ägget i kallt vatten." },
  { id: 5, tip: "Koka äggen försiktigt och undvik att de spricker genom att lägga dem i redan kokande vatten." }
];

// 📌 GET: Hämta alla tips
app.get('/tips', (req, res) => {
  res.json(eggTips);
});

// 📌 GET: Hämta ett specifikt tips med ID
app.get('/tips/:id', (req, res) => {
  const tip = eggTips.find(t => t.id === parseInt(req.params.id));
  if (!tip) return res.status(404).json({ message: "Tip not found" });
  res.json(tip);
});

// 📌 POST: Lägg till ett nytt tips
app.post('/tips', (req, res) => {
  const newTip = { id: eggTips.length + 1, tip: req.body.tip };
  eggTips.push(newTip);
  res.status(201).json(newTip);
});

// 📌 DELETE: Ta bort ett tips
app.delete('/tips/:id', (req, res) => {
  const tipIndex = eggTips.findIndex(t => t.id === parseInt(req.params.id));
  if (tipIndex === -1) return res.status(404).json({ message: "Tip not found" });
  
  eggTips.splice(tipIndex, 1);
  res.json({ message: "Tip deleted" });
});

// Starta servern
app.listen(port, () => {
  console.log(`Egg Tips API is running at http://localhost:${port}`);
});
