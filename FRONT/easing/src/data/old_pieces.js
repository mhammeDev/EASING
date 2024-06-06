export const pieces = [
  {
    id:1,
    "nom": "Chambre 1",
    "etage":1,
    "superficie": "9.71 m²",
    "position": {
      "points": [
        {"x": 30, "y": 30},
        {"x": 380, "y": 30},
        {"x": 380, "y": 380},
        {"x": 30, "y": 380}
      ]
    },
    "capteurs": [
      { "typeId": "sensor-presence",
        "points": [],
        "valeur" : false
      }
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
        {"x": 30, "y": 380},
        {"x": 380, "y": 380},
        {"x": 380, "y": 630},
        {"x": 30, "y": 630}
      ]
    },"etage":1,
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      },

      {
        "typeId": "sensor-water-leak",
        "points": {
          "x": 115.29411764705883,
          "y": 397.4117682961857
        },
        "valeur": false
      },
    ],
    "actionneurs": [
    ]
  },
  {
    id:3,
    "nom": "Chambre 2",
    "etage":1,
    "superficie": "14.09 m²",
    "position":
        {"points": [
            {"x": 30, "y": 630},
            {"x": 530, "y": 630},
            {"x": 530, "y": 930},
            {"x": 30, "y": 930},
          ]},
    "capteurs": [
      { "typeId": "sensor-presence",
        "points":[],
        "valeur" : false
      }
    ],
    "actionneurs": [
      {
        "typeId": "sensor-light-socket",
        "points": {
          "x": 123.52941176470588,
          "y": 857.4117682961856
        },
        "valeur": true
      },
      {
        "typeId": "sensor-motorized-blind",
        "points": {
          "x": 249.41176470588235,
          "y": 889.1764741785386
        },
        "valeur": false
      }
    ]
  },  {
    id:4,
    "nom": "",
    "superficie": "10.0 m²",
    "position": {
      "points": [
        {"x": 380, "y": 630},
        {"x": 530, "y": 630},
        {"x": 530, "y": 330},
        {"x": 630, "y": 330},
        {"x": 630, "y": 230},
        {"x": 1080, "y": 230},
        {"x": 1080, "y": 30},
        {"x": 530, "y": 30},
        {"x": 530, "y": 180},
        {"x": 380, "y": 180},
        {"x": 380, "y": 630},
      ]
    },
    "etage": 1,
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      },


    ],
    "actionneurs": [
      {
        "typeId": "sensor-light",
        "points": {
          "x": 418.8235294117647,
          "y": 403.29412123736216
        },
        "valeur": true
      },{
        "typeId": "sensor-light-socket",
        "points": {
          "x": 881.1764705882354,
          "y": 182.11765064912683
        },
        "valeur": false
      }
    ]
  },
  {
    id:5,
    "nom": "Salle de bain",
    "superficie": "5.49 m²",
    "etage":1,
    "position": {
      "points": [
        {"x": 1080, "y": 230},
        {"x": 1380, "y": 230},
        {"x": 1380, "y": 30},
        {"x": 1080, "y": 30},
        {"x": 1080, "y": 230},

      ]
    },    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }
    ],
    "actionneurs": [
    ]
  },
  {
    id:6,
    "nom": "WC",
    "superficie": "1.9 m²",
    "position": {
      "points": [
        {"x": 380, "y": 30},
        {"x": 530, "y": 30},
        {"x": 530, "y": 180},
        {"x": 380, "y": 180}

      ]
    },"etage":1,
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }    ],
    "actionneurs": []
  },  {
    id:7,
    "nom": "Pièce 1",
    "etage":1,
    "superficie": "12.93 m²",
    "position": {
      "points": [
        {"x": 530, "y": 630},
        {"x": 980, "y": 630},
        {"x": 980, "y": 230},
        {"x": 630, "y": 230},
        {"x": 630, "y": 330},
        {"x": 530, "y": 330},
        {"x": 530, "y": 630},
      ]
    },
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }    ],
    "actionneurs": []
  },{
    id:8,
    "nom": "Pièce 2",
    "etage":1,
    "superficie": "12.93 m²",
    "position": {
      "points": [
        {"x": 980, "y": 630},
        {"x": 1380, "y": 630},
        {"x": 1380, "y": 230},
        {"x": 980, "y": 230},
      ]
    },
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }    ],
    "actionneurs": []
  },
  {
    id:9,
    "nom": "Salle à manger",
    "superficie": "40.0 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 30, "y": 30},
        {"x": 530, "y": 30},
        {"x": 530, "y": 880},
        {"x": 30, "y": 880},
      ]
    },    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      },
    ],
    "actionneurs": [
      {
        "typeId": "sensor-light",
        "points": {
          "x": 239.99999999999997,
          "y": 401.8181818181818
        },
        "valeur": false
      },
      {
        "typeId": "sensor-smart-plug",
        "points": {
          "x": 12.727272727272727,
          "y": 399.99999999999994
        },
        "valeur": false
      },{
        "typeId": "sensor-motorized-blind",
        "points": {
          "x": 234.54545454545453,
          "y": 847.5294135598575
        },
        "valeur": false
      },{
        "typeId": "sensor-motorized-blind",
        "points": {
          "x": 12.941176470588236,
          "y": 714.3529375861673
        },
        "valeur": false
      },{
        "typeId": "sensor-motorized-blind",
        "points": {
          "x": 12.941176470588236,
          "y": 156.1999969482422
        },
        "valeur": false
      }
    ]
  },
  {
    id:10,
    "nom": "Pièce 3",
    "superficie": "4.21 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 530, "y": 30},
        {"x": 980, "y": 30},
        {"x": 980, "y": 230},
        {"x": 530, "y": 230},


      ]
    },    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }    ],
    "actionneurs": []
  },
  {
    id:11,
    "nom": "Hall d'entrée",
    "superficie": "14.29 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 530, "y": 230},
        {"x": 980, "y": 230},
        {"x": 980, "y": 580},
        {"x": 530, "y": 580},
      ]
    },
    "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }
    ],
    "actionneurs": [
      {
        "typeId": "sensor-light-socket",
        "points":
            {"x": 605.8823529411765, "y": 207.2941176330342},
        "valeur": false
      }
    ]
  },
  {
    id:12,
    "nom": "Cuisine",
    "superficie": "18.0 m²",
    "etage":0,
    "position": {
      "points": [
        {"x": 980, "y": 580},
        {"x": 1380, "y": 580},
        {"x": 1380, "y": 30},
        {"x": 980, "y": 30},
      ]
    }, "capteurs": [
      {
        "typeId": "sensor-presence",
        "points":[],
        "valeur" : false,
      }  ,      {
        "typeId": "sensor-water-leak",
        "points": {
          "x": 1296.3636363636363,
          "y": 49.090909090909086,
        }, "valeur":false
      }

    ],
    "actionneurs": [
      {
        "typeId": "sensor-light",
        "points": {
          "x": 1143.6363636363635,
          "y": 252.72727272727272,
        },
        "valeur" : false
      }
      ]
  },

]

export const type_capteur = [
  { "_id": "sensor-presence", "name":"Détecteur de présence", "type_value": "boolean", "description": "Détecte la présence dans la pièce", "show":false  },
  { "_id": "sensor-water-leak","name":"Détecteur de fuite d'eau" ,"type_value": "boolean", "description": "Détecte les fuites d'eau", "show":true  },
  {"_id": "sensor-luminosity","name":"Détecteur de luminosité" ,"type_value" : "numeric", "description":"Détecle la luminosité", "show":false },
  { "_id": "sensor-temperature", "name":"Détecteur de temperatire","type_value": "numeric", "description": "Détecte les variations de température", "show":false  },

]

export const type_actionneur = [
  { "_id": "sensor-light", "name": "Lumière connectée", "description": "Contrôle l'éclairage de la pièce", "show":true },
  { "_id": "sensor-light-socket", "name": "Ampoule connecté prise intelligente", "description": "Contrôle l'éclairage de la pièce", "show":true  },
  { "_id": "sensor-smart-plug", "name": "Prise connectée", "description": "Permet de contrôler les appareils électriques", "show":true  },
  { "_id": "sensor-motorized-blind", "name": "Store motorisé", "description": "Contrôle l'ouverture et la fermeture des stores", "show":true  }
]

export const  test = [
  {
    "nom": "Salon",
    "superficie": "16.94 m²",
    "position": {"x": 10, "y": 100, "largeur": 480, "hauteur": 240},
    "etage":0,
    "capteurs": [
      { "typeId": "sensor-presence" }
    ],
    "actionneurs": [
      { "type": "sensor-light"},
      { "type": "sensor-smart-plug pour TV"}
    ]
  }
]

