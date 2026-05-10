// Menu data for Ember & Salt
window.MENU_CATEGORIES = [
  { id: "starters", label: "Starters", blurb: "Small plates to begin the evening." },
  { id: "wood-fired", label: "Wood-Fired", blurb: "From the open hearth, charred and rested." },
  { id: "pasta", label: "Pasta & Grains", blurb: "Hand-rolled, slow-simmered." },
  { id: "mains", label: "Mains", blurb: "Plates of substance, plated with restraint." },
  { id: "sides", label: "Sides", blurb: "Vegetables given equal billing." },
  { id: "desserts", label: "Desserts", blurb: "A quieter ending." },
  { id: "drinks", label: "Drinks", blurb: "Wine, low-ABV pours, zero-proof." },
];

window.MENU_ITEMS = [
  // Starters
  { id: "s1", cat: "starters", name: "Charred Sourdough",     desc: "Cultured butter, smoked maldon, burnt honey.",                price: 7,  tags: ["v"] },
  { id: "s2", cat: "starters", name: "Burrata, Fig & Pepita", desc: "Black mission fig, toasted pepita, aged balsamico.",          price: 14, tags: ["v","gf"] },
  { id: "s3", cat: "starters", name: "Steak Tartare",         desc: "Hand-cut chuck, smoked egg yolk, capers, rye crisps.",        price: 18 },
  { id: "s4", cat: "starters", name: "Beet & Whipped Feta",   desc: "Roasted beets, dukkah, citrus, dill oil.",                    price: 13, tags: ["v","gf"] },
  { id: "s5", cat: "starters", name: "Crispy Artichokes",     desc: "Lemon aioli, fried sage, parmesan.",                          price: 12, tags: ["v"] },

  // Wood-fired
  { id: "w1", cat: "wood-fired", name: "Half Chicken",       desc: "48-hour brine, charred lemon, herb jus.",                     price: 26 },
  { id: "w2", cat: "wood-fired", name: "Whole Branzino",     desc: "Fennel, salsa verde, charred lemon.",                         price: 34, tags: ["gf"] },
  { id: "w3", cat: "wood-fired", name: "Lamb Shoulder",      desc: "Eight-hour roast, harissa yoghurt, mint.",  price: 38 },
  { id: "w4", cat: "wood-fired", name: "Cauliflower Steak",  desc: "Tahini, pomegranate, almond crumble, brown butter.",          price: 22, tags: ["v","gf"] },
  { id: "w5", cat: "wood-fired", name: "Pork Collar",        desc: "Stone-fruit mostarda, mustard greens.",                       price: 28 },

  // Pasta
  { id: "p1", cat: "pasta", name: "Cacio e Pepe",            desc: "Tonnarelli, pecorino, black pepper, brown butter.",           price: 19, tags: ["v"] },
  { id: "p2", cat: "pasta", name: "Pici al Ragù",            desc: "Hand-rolled pici, Sunday ragù, parmesan.",                    price: 24 },
  { id: "p3", cat: "pasta", name: "Squid Ink Tagliolini",    desc: "Crab, chili, garlic, lemon zest.",                            price: 28 },
  { id: "p4", cat: "pasta", name: "Mushroom Tortelli",       desc: "Trumpet royale, taleggio, sage brown butter.",                price: 24, tags: ["v"] },
  { id: "p5", cat: "pasta", name: "Saffron Risotto",         desc: "Carnaroli, bone marrow, chive.",                              price: 26, tags: ["gf"] },

  // Mains (steaks etc.)
  { id: "m1", cat: "mains", name: "Bavette Steak",           desc: "8oz, chimichurri, charred shallot.",                          price: 32, tags: ["gf"] },
  { id: "m2", cat: "mains", name: "Duck Breast",             desc: "Cherry gastrique, parsnip, frisée.",                          price: 36, tags: ["gf"] },
  { id: "m3", cat: "mains", name: "Black Cod",               desc: "Miso glaze, dashi, charred scallion.",                        price: 38, tags: ["gf"] },
  { id: "m4", cat: "mains", name: "Mushroom Bourguignon",    desc: "Pearl onion, lardons of celeriac, polenta.",                  price: 24, tags: ["v"] },

  // Sides
  { id: "sd1", cat: "sides", name: "Hearth Potatoes",        desc: "Triple-cooked, rosemary salt.",                               price: 9,  tags: ["v","gf"] },
  { id: "sd2", cat: "sides", name: "Charred Broccolini",     desc: "Anchovy, chili, lemon.",                                      price: 10, tags: ["gf"] },
  { id: "sd3", cat: "sides", name: "Heirloom Carrots",       desc: "Honey, cumin, pistachio, yoghurt.",                           price: 9,  tags: ["v","gf"] },
  { id: "sd4", cat: "sides", name: "Little Gem",             desc: "Buttermilk, herbs, parmesan, sourdough crumbs.",              price: 11, tags: ["v"] },

  // Desserts
  { id: "d1", cat: "desserts", name: "Olive Oil Cake",       desc: "Citrus, mascarpone, candied fennel.",                         price: 11, tags: ["v"] },
  { id: "d2", cat: "desserts", name: "Burnt Basque",         desc: "Sea salt, brown butter caramel.",                             price: 12, tags: ["v"] },
  { id: "d3", cat: "desserts", name: "Affogato",             desc: "Espresso, vanilla bean gelato, amaretti.",                    price: 10, tags: ["v"] },
  { id: "d4", cat: "desserts", name: "Dark Chocolate Tart",  desc: "Hazelnut praline, smoked salt, crème fraîche.",               price: 12, tags: ["v"] },

  // Drinks
  { id: "dr1", cat: "drinks", name: "House Red",             desc: "Tempranillo blend, glass.",                                   price: 12 },
  { id: "dr2", cat: "drinks", name: "House White",           desc: "Vermentino, glass.",                                          price: 12 },
  { id: "dr3", cat: "drinks", name: "Negroni",               desc: "Gin, Campari, sweet vermouth, orange.",                       price: 15 },
  { id: "dr4", cat: "drinks", name: "Smoked Old Fashioned",  desc: "Bourbon, demerara, cherrywood smoke.",                        price: 17 },
  { id: "dr5", cat: "drinks", name: "Garden Spritz",         desc: "Zero-proof: rosemary, grapefruit, tonic.",                    price: 9 },
  { id: "dr6", cat: "drinks", name: "Sparkling Water",       desc: "750ml, Italian.",                                             price: 6 },
];
