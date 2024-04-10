export const pieces = [
  {
    id:1,
    "nom": "Chambre 1",
    "etage":1,
    "superficie": "9.71 m²",
    "position": {
      "points": [
        {"x": 0, "y": 0},
        {"x": 350, "y": 0},
        {"x": 350, "y": 350},
        {"x": 0, "y": 350}
      ]
    },
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false }
    ],
    "actionneurs": [
    ]
  },
  {
    id:2,
    "nom": "Salle parentale",
    "superficie": "7.27 m²",
    "position": {
      "points": [
        {"x": 0, "y": 350},
        {"x": 350, "y": 350},
        {"x": 350, "y": 600},
        {"x": 0, "y": 600}
      ]
    },"etage":1,
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" :false },
      {"typeId": "sensor-water-leak", "quantite" : 1, "etat" : false}
    ],
    "actionneurs": [
    //  { "type": "sensor-light", "quantite": 1 },
      //{ "type": "Assistant vocal", "quantite": 1 }
    ]
  },
  {
    id:3,
    "nom": "Chambre 2",
    "etage":1,
    "superficie": "14.09 m²",
    "position":
        {"points": [
            {"x": 0, "y": 600},
            {"x": 500, "y": 600},
            {"x": 500, "y": 900},
            {"x": 0, "y": 900},
          ]},
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false }
    ],
    "actionneurs": [
      { "typeId": "sensor-smart-plug", "quantite": 1 },
      { "typeId": "sensor-motorized-blind", "quantite": 1 }
    ]
  },  {
    id:4,
    "nom": "",
    "superficie": "10.0 m²",
    "position": {
      "points": [
        {"x": 350, "y": 600},
        {"x": 500, "y": 600},
        {"x": 500, "y": 300},
        {"x": 600, "y": 300},
        {"x": 600, "y": 200},
        {"x": 1050, "y": 200},
        {"x": 1050, "y": 0},
        {"x": 500, "y": 0},
        {"x": 500, "y": 150},
        {"x": 350, "y": 150},
        {"x": 350, "y": 600},
      ]
    },
    "etage": 1,
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false }
    ],
    "actionneurs": [
      {"typeId": "sensor-light", "quantite": 1},
      {"typeId": "sensor-light prise intelligente", "quantite": 1}
    ]
  },
  {
    id:5,
    "nom": "Salle de bain",
    "superficie": "5.49 m²",
    "etage":1,
    "position": {
      "points": [
        {"x": 1050, "y": 200},
        {"x": 1350, "y": 200},
        {"x": 1350, "y": 0},
        {"x": 1050, "y": 0},
        {"x": 1050, "y": 200},

      ]
    },    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
      //{ "type": "Détecteur de fuite d'eau", "quantite": 1 }
    ],
    "actionneurs": [
     // { "type": "sensor-light", "quantite": 1 }
    ]
  },
  {
    id:6,
    "nom": "WC",
    "superficie": "1.9 m²",
    "position": {
      "points": [
        {"x": 350, "y": 0},
        {"x": 500, "y": 0},
        {"x": 500, "y": 150},
        {"x": 350, "y": 150}

      ]
    },"etage":1,
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
    //  { "type": "sensor-light", "quantite": 1 },
     // { "type": "Assistant vocal", "quantite": 1 }
    ]
  },  {
    id:7,
    "nom": "Pièce 1",
    "etage":1,
    "superficie": "12.93 m²",
    "position": {
      "points": [
        {"x": 500, "y": 600},
        {"x": 950, "y": 600},
        {"x": 950, "y": 200},
        {"x": 600, "y": 200},
        {"x": 600, "y": 300},
        {"x": 500, "y": 300},
        {"x": 500, "y": 600},
      ]
    },
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
    ]
  },{
    id:8,
    "nom": "Pièce 2",
    "etage":1,
    "superficie": "12.93 m²",
    "position": {
      "points": [
        {"x": 950, "y": 600},
        {"x": 1350, "y": 600},
        {"x": 1350, "y": 200},
        {"x": 950, "y": 200},
      ]
    },
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
    ]
  },
  {
    id:9,
    "nom": "Salle à manger",
    "superficie": "40.0 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 0, "y": 0},
        {"x": 500, "y": 0},
        {"x": 500, "y": 850},
        {"x": 0, "y": 850},


      ]
    },    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
      { "typeId": "sensor-light", "quantite": 1 },
      { "typeId": "sensor-smart-plug pour TV", "quantite": 1 },
      { "typeId": "sensor-motorized-blind", "quantite": 3 }
    ]
  },
  {
    id:10,
    "nom": "Pièce 3",
    "superficie": "4.21 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 500, "y": 0},
        {"x": 950, "y": 0},
        {"x": 950, "y": 200},
        {"x": 500, "y": 200},


      ]
    },    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": []
  },
  {
    id:11,
    "nom": "Hall d'entrée",
    "superficie": "14.29 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 500, "y": 200},
        {"x": 950, "y": 200},
        {"x": 950, "y": 550},
        {"x": 500, "y": 550},
      ]
    },
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
      { "typeId": "sensor-smart-plug pour TV", "quantite": 1 },
      { "typeId": "Thermostat connecté", "quantite": 1 }
    ]
  },
  {
    id:12,
    "nom": "Cuisine",
    "superficie": "18.0 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 950, "y": 550},
        {"x": 1350, "y": 550},
        {"x": 1350, "y": 0},
        {"x": 950, "y": 0},
      ]
    }, "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1, "etat" : false },
    ],
    "actionneurs": [
      { "typeId": "sensor-light", "quantite": 1 },
    ]
  },

]

export const type_capteur = [
  { "_id": "sensor-presence", "type": "Capteur de présence", "description": "Détecte la présence dans la pièce" },
  { "_id": "sensor-water-leak", "type": "Détecteur de fuite d'eau", "description": "Détecte les fuites d'eau" },
  {"_id": "sensor-luminosity", "type" : "Détecteur de luminsosité", "description":"Détecle la luminosité"},
  { "_id": "sensor-temperature", "type": "Détecteur de température", "description": "Détecte les variations de température" },

]

export const type_actionneur = [
  { "_id": "sensor-light", "type": "Lumière connectée", "description": "Contrôle l'éclairage de la pièce" },
  { "_id": "sensor-smart-plug", "type": "Prise connectée", "description": "Permet de contrôler les appareils électriques" },
  { "_id": "sensor-motorized-blind", "type": "Store motorisé", "description": "Contrôle l'ouverture et la fermeture des stores" },
  { "_id": "sensor-presence", "type": "Capteur de présence", "description": "Détecte la présence dans la pièce" },
  { "_id": "sensor-water-leak", "type": "Détecteur de fuite d'eau", "description": "Détecte les fuites d'eau" },
  {"_id": "sensor-luminosity", "type" : "Détecteur de luminsosité", "description":"Détecle la luminosité"},
  { "_id": "sensor-temperature", "type": "Détecteur de température", "description": "Détecte les variations de température" },
]

export const  test = [
  {
    "nom": "Salon",
    "superficie": "16.94 m²",
    "position": {"x": 10, "y": 100, "largeur": 480, "hauteur": 240},
    "etage":0,
    "capteurs": [
      { "typeId": "sensor-presence", "quantite": 1 }
    ],
    "actionneurs": [
      { "type": "sensor-light", "quantite": 1 },
      { "type": "sensor-smart-plug pour TV", "quantite": 1 }
    ]
  }
]

