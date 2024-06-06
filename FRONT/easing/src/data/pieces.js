export const pieces = [
  {
    "name": "Bedroom 1",
    "floor": 1,
    "position": {
      "points": [
        {
          "x": 30,
          "y": 30
        },
        {
          "x": 380,
          "y": 30
        },
        {
          "x": 380,
          "y": 380
        },
        {
          "x": 30,
          "y": 380
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "Parental bathroom",
    "position": {
      "points": [
        {
          "x": 30,
          "y": 380
        },
        {
          "x": 380,
          "y": 380
        },
        {
          "x": 380,
          "y": 630
        },
        {
          "x": 30,
          "y": 630
        }
      ]
    },
    "floor": 1,
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      },
      {
        "typeId": "sensor-water-leak",
        "points": {
          "x": 115.29411764705883,
          "y": 397.4117682961857
        },
        "value": false
      }
    ],
    "actuators": []
  },
  {
    "name": "Bedroom 2",
    "floor": 1,
    "position": {
      "points": [
        {
          "x": 30,
          "y": 630
        },
        {
          "x": 530,
          "y": 630
        },
        {
          "x": 530,
          "y": 930
        },
        {
          "x": 30,
          "y": 930
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": [
      {
        "typeId": "smart-connected-light",
        "points": {
          "x": 123.52941176470588,
          "y": 857.4117682961856
        },
        "value": "bulb_on"
      },
      {
        "typeId": "motorized-blind",
        "points": {
          "x": 249.41176470588235,
          "y": 889.1764741785386
        },
        "value": "blind_up"
      }
    ]
  },
  {
    "name": " ",
    "position": {
      "points": [
        {
          "x": 380,
          "y": 630
        },
        {
          "x": 530,
          "y": 630
        },
        {
          "x": 530,
          "y": 330
        },
        {
          "x": 630,
          "y": 330
        },
        {
          "x": 630,
          "y": 230
        },
        {
          "x": 1080,
          "y": 230
        },
        {
          "x": 1080,
          "y": 30
        },
        {
          "x": 530,
          "y": 30
        },
        {
          "x": 530,
          "y": 180
        },
        {
          "x": 380,
          "y": 180
        },
        {
          "x": 380,
          "y": 630
        }
      ]
    },
    "floor": 1,
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": [
      {
        "typeId": "connected-light",
        "points": {
          "x": 448.8235294117647,
          "y": 183.29412123736216
        },
        "value": "bulb_off"
      },
      {
        "typeId": "smart-connected-light",
        "points": {
          "x": 911.1764705882354,
          "y": 152.11765064912683
        },
        "value": "bulb_on"
      }
    ]
  },
  {
    "name": "Bathroom",
    "floor": 1,
    "position": {
      "points": [
        {
          "x": 1080,
          "y": 230
        },
        {
          "x": 1380,
          "y": 230
        },
        {
          "x": 1380,
          "y": 30
        },
        {
          "x": 1080,
          "y": 30
        },
        {
          "x": 1080,
          "y": 230
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "WC",
    "position": {
      "points": [
        {
          "x": 380,
          "y": 30
        },
        {
          "x": 530,
          "y": 30
        },
        {
          "x": 530,
          "y": 180
        },
        {
          "x": 380,
          "y": 180
        }
      ]
    },
    "floor": 1,
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "Room 1",
    "floor": 1,
    "position": {
      "points": [
        {
          "x": 530,
          "y": 630
        },
        {
          "x": 980,
          "y": 630
        },
        {
          "x": 980,
          "y": 230
        },
        {
          "x": 630,
          "y": 230
        },
        {
          "x": 630,
          "y": 330
        },
        {
          "x": 530,
          "y": 330
        },
        {
          "x": 530,
          "y": 630
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "Room 2",
    "floor": 1,
    "position": {
      "points": [
        {
          "x": 980,
          "y": 630
        },
        {
          "x": 1380,
          "y": 630
        },
        {
          "x": 1380,
          "y": 230
        },
        {
          "x": 980,
          "y": 230
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "Dining room",
    "floor": 0,
    "position": {
      "points": [
        {
          "x": 30,
          "y": 30
        },
        {
          "x": 530,
          "y": 30
        },
        {
          "x": 530,
          "y": 880
        },
        {
          "x": 30,
          "y": 880
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": [
      {
        "typeId": "connected-light",
        "points": {
          "x": 269.99999999999997,
          "y": 371.8181818181818
        },
        "value": "bulb_on"
      },
      {
        "typeId": "connected-tv",
        "points": {
          "x": 42.727272727272727,
          "y": 369.99999999999994
        },
        "value": "tv_on"
      },
      {
        "typeId": "motorized-blind",
        "points": {
          "x": 264.54545454545453,
          "y": 817.5294135598575
        },
        "value": "blind_up"
      },
      {
        "typeId": "motorized-blind",
        "points": {
          "x": 32.941176470588236,
          "y": 684.3529375861673
        },
        "value": "blind_up"
      },
      {
        "typeId": "motorized-blind",
        "points": {
          "x": 42.941176470588236,
          "y": 126.1999969482422
        },
        "value": "blind_up"
      }
    ]
  },
  {
    "name": "Room 3",
    "floor": 0,
    "position": {
      "points": [
        {
          "x": 530,
          "y": 30
        },
        {
          "x": 980,
          "y": 30
        },
        {
          "x": 980,
          "y": 230
        },
        {
          "x": 530,
          "y": 230
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": []
  },
  {
    "name": "Entrance hall",
    "floor": 0,
    "position": {
      "points": [
        {
          "x": 530,
          "y": 230
        },
        {
          "x": 980,
          "y": 230
        },
        {
          "x": 980,
          "y": 580
        },
        {
          "x": 530,
          "y": 580
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      }
    ],
    "actuators": [
      {
        "typeId": "smart-connected-light",
        "points": {
          "x": 635.8823529411765,
          "y": 177.2941176330342
        },
        "value": "bulb_on"
      }
    ]
  },
  {
    "name": "Kitchen",
    "floor": 0,
    "position": {
      "points": [
        {
          "x": 980,
          "y": 580
        },
        {
          "x": 1380,
          "y": 580
        },
        {
          "x": 1380,
          "y": 30
        },
        {
          "x": 980,
          "y": 30
        }
      ]
    },
    "captors": [
      {
        "typeId": "sensor-presence",
        "points": [],
        "value": false
      },
      {
        "typeId": "internal-light-sensor",
        "points": [],
        "value": "low_luminosity"
      },
      {
        "typeId": "sensor-water-leak",
        "points": {
          "x": 1296.3636363636363,
          "y": 49.090909090909086
        },
        "value": false
      }
    ],
    "actuators": [
      {
        "typeId": "connected-light",
        "points": {
          "x": 1173.6363636363635,
          "y": 222.72727272727272
        },
        "value": "bulb_off"
      }
    ]
  }
]

export const type_actionneur = [
  {
    "_id": "connected-light",
    "name": "Lumière connectée",
    "dependecies": ["sensor-presence", "internal-light-sensor"],
    "description": "Contrôle l'éclairage de la pièce",
    "show": true,
    "img":"connected-light_off.png"
  },
  {
    "_id": "smart-connected-light",
    "name": "Ampoule connecté prise intelligente",
    "dependecies": ["smart-socket"],
    "description": "Contrôle l'éclairage de la pièce",
    "show": true,
    "img":"smart-light_off.png"

  },
  {
    "_id": "connected-tv",
    "name": "TV connectée",
    "dependecies": ["smart-socket"],
    "description": "Permet de contrôler les appareils électriques",
    "show": true,
    "img":"tv_off.png"
  },
  {
    "_id": "motorized-blind",
    "name": "Store motorisé",
    "dependecies": ["external-light-sensor"],
    "description": "Contrôle l'ouverture et la fermeture des stores",
    "show": true,
    "img":"blind_down.png"
  }
]

export const type_capteur = [
  {
    "_id": "sensor-presence",
    "name": "Détecteur de présence",
    "type_value": "boolean",
    "description": "Détecte la présence dans la pièce",
    "show": false
  },
  {
    "_id": "sensor-water-leak",
    "name": "Détecteur de fuite d'eau",
    "type_value": "boolean",
    "description": "Détecte les fuites d'eau",
    "show": true,
    "img":"water-leak.png"

  },
  {
    "_id": "external-light-sensor",
    "name": "Détecteur de luminosité externe",
    "type_value": "numeric",
    "description": "Détecle la luminosité",
    "show": false
  },
  {
    "_id": "temperature-sensor",
    "name": "Détecteur de temperature",
    "type_value": "numeric",
    "description": "Détecte les variations de température",
    "show": false
  },
  {
    "_id": "internal-light-sensor",
    "name": "Détecteur de luminosité interne",
    "type_value": "numeric",
    "description": "Détecte la luminosité dans la pièce",
    "show": false
  },
  {
    "_id": "smart-socket",
    "name": "Prise intelligente",
    "type_value": "boolean",
    "description": "Etat de la prise",
    "show": false
  }
]