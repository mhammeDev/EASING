const train_1 = [
    {
        "cases": ["connected-light"],
        "examples":[
            {"role": "user", "content":`{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},
        
          {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "high_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "result" : "bulb_off"}]`},
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-tv"],
        "examples":[
            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": false}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Turn on the television", "result": "tv_on"}, {"action" : "Turn off the television", "result" : "tv_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"name": "connected-tv", "action": "Turn off the television", "result": "tv_off"}]`},      

            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": true}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Turn on the television", "result": "tv_on"}, {"action" : "Turn off the television", "result" : "tv_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}, , {"name": "connected-tv", "action": "Turn on the television", "result": "tv_on"}]`},
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-light"],
        "examples":[
            {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": "high_luminosity"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "result" : "bulb_off"}, {"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},      
        ]

    },
    {
        "cases": ["sensor-water-leak"],
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"sensor-water-leak", "value": true}], "actions": [{"action": "Water leak notification", "result" : "water-leak"}]}`},
      {"role": "assistant", "content": `[{"notification": "Water leak notification", "result" : "water-leak"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-water-leak", "value": false}], "actions": [{"action": "Water leak notification", "result" : "water-leak"}]}`},
      {"role": "assistant", "content": `{}`},
        ]

    },
    {
        "cases": ["security"],
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"security" :true},{"typeId":"sensor-presence", "value": true}], "actions": [{"action": "Intrusion notification", "result" : "intrusion"}]}`},
      {"role": "assistant", "content": `[{"notification": "Intrusion notification", "result" : "intrusion"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"security", "value":true},{"typeId":"sensor-presence", "value": false}], "actions": [{"action": "Intrusion notification", "result" : "intrusion"}]}`},
      {"role": "assistant", "content": `{}`},
        ]

    },
    /*{
        "cases": ["temperatures"], // change temperatures with temperature
        "examples":[                
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": "temp_high", "value": "temp_low"}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature drop notifaction", "action": "temp_down"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": "temp_low", "value": "temp_high"}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `[{"notification": "Temperature increase notifaction", "result" : "temp_up"}]`},
  
      {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "old_value": "temp_high", "value": "temp_high"}], "actions": [{"action" : "Temperature increase notifaction", "result" : "temp_up"}, {"action" : "Temperature drop notifaction", "result": "temp_down"}]}`},
      {"role": "assistant", "content": `{}`},
  
        ]

    },
    */
    {
        "cases": ["heating"],
        "examples":[
            {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "value": "temp_low"}],"actuators": [{"typeId": "heating"}],"actions":[{"action" : "Turn on the heating", "result" : "heating_on"}, {"action" : "Turn off the heating", "result": "heating_off"}]}`},
            {"role": "assistant", "content": `[{"name": "heating", "action": "Turn on the heating", "result" : "heating_on"}]`},

            {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "value": "temp_high"}],"actuators": [{"typeId": "heating"}],"actions":[{"action" : "Turn on the heating", "result" : "heating_on"}, {"action" : "Turn off the heating", "result": "heating_off"}]}`},
            {"role": "assistant", "content": `[{"name": "heating", "action": "Turn off the heating", "result" : "heating_off"}]`},
        ]

    },
    {
        "cases": ["motorized-blind"],
        "examples":[                
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "high_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": [{"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Raise the blind", "result" : "blind_up"}]`},
        
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "actuators": [{"typeId": "motorized-blind"}], "actions": [{"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "motorized-blind", "action": "Lower the blind", "result" : "blind_down"}]`},
        
        ]

    },
    {
        "cases": ["connected-light", "security"],
        "examples":[
            {"role": "user", "content":`{"name": "", "sensors": [{"security":true},{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action": "Intrusion notification", "result" : "intrusion"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"notification": "Intrusion notification", "result":"intrusion"}]`},

           {"role": "user", "content":`{"name": "", "sensors": [{"security":true},{"typeId": "sensor-presence", "value": false}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action": "Intrusion notification", "result" : "intrusion"}]}`},
           {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_off"}]`},
        ]

    }
   /* {
        "cases": ["motorized-blind", "connected-light"],
        "examples":[                
            {"role": "user", "content": `{"name": "", "externals_sensors": [{"external-light-sensor": "low_luminosity"}], "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": 420}], "actuators": [{"typeId": "connected-light"}, {"typeId": "motorized-blind"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Lower the blind", "result" : "blind_down"}, {"action" : "Raise the blind", "result" : "blind_up"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"name": "motorized-blind", "action": "Lower the blind", "result": "blind_dpwn"}]`},      
        ]

    },*/
  ];

const train_2 = [
        {"role": "user", "content": `[{"request":"Turn on the light in the d"}, {"rooms": [{"room":[{"name":"Kitchen","actuators":[{"typeId":"connected-light"}]}]}]},{"actions":{"actions":[{"action":"Turn on the light","type_action":"action","actuators":["connected-light","smart-connected-light"],"result":"bulb_on"}]}}]`},
        {"role":"asssistant", "content":`{"response" : "I turned on the light in the kitchen", "content" : [{"name" : "Kitchen", "actuators" : [{"name" : "connected-light", "action" : "Turn on the light", "result" : "bulb_on"}] }]}`}    ,

        {"role": "user", "content": `[{"request":"Turn on the tv in the corridor"}, {"rooms": [{"room":[{"name":"Corridor","actuators":[{"typeId":"connected-light"},{"typeId":"smart-connected-light"}  ]}]}]},{"actions":{"actions":[{"action":"Turn on the tv","type_action":"action","actuators":["connected-tv"],"result":"tv_on"}]}}]`},
        {"role":"asssistant", "content":`{"response" : "I can't there isn't a tv in the corridor"}`} 
        
        ,{"role": "user", "content": `[{"request":"Turn off the light and turn on the tv in the Dining room"}, {"rooms": [{"room":[{"name":"Dining room","actuators":[{"typeId":"connected-light"},{"typeId":"connected-tv"}, {"typeId":"motorized-blind"}, {"typeId":"motorized-blind"}, {"typeId":"motorized-blind"} ]}]}]},{"actions":{"actions":[{"action":"Turn on the light","type_action":"action","actuators":["connected-light","smart-connected-light"],"result":"bulb_on"}, {"action":"Turn on the tv","type_action":"action","actuators":["connected-tv"],"result":"tv_on"} ]}}]`},
        {"role":"asssistant", "content":`{"response" : "I turned on the tv and I turned off the connected light in the dining room", "content" : [{"name" : "Dining room", "actuators" : [{"name" : "connected-light", "action" : "Turn off the light", "result" : "bulb_off"}, {"name" : "connected-tv", "action" : "Turn on the tv", "result" : "tv_on"} ] }]}`},


        ,{"role": "user", "content": `[{"request":"Turn on the connected light in all room"}, {"rooms": [{"room":[{"name":"Dining room","actuators":[{"typeId":"connected-light"},{"typeId":"connected-tv"}, {"typeId":"motorized-blind"}, {"typeId":"motorized-blind"}, {"typeId":"motorized-blind"} ]}]}, {"room":[{"name":"Kitchen","actuators":[{"typeId":"connected-light"}]}]}, {"room":[{"name":"Corridor","actuators":[{"typeId":"connected-light"},{"typeId":"smart-connected-light"}  ]}]} ]},{"actions":{"actions":[{"action":"Turn on the light","type_action":"action","actuators":["connected-light","smart-connected-light"],"result":"bulb_on"} ]}}]`},
        {"role":"asssistant", "content":`{"response" : "I turned on the connected light in each room who has it, so in the Dining room, the kitchen, and the Corridor", "content" : [{"name" : "Dining room", "actuators" : [{"name" : "connected-light", "action" : "Turn on the light", "result" : "bulb_on"}]} , {"name" : "Kitchen", "actuators" : [{"name" : "connected-light", "action" : "Turn on the light", "result" : "bulb_on"}]}, {"name" : "Corridor", "actuators" : [{"name" : "connected-light", "action" : "Turn on the light", "result" : "bulb_on"}]}  ] }`},

];
  module.exports = {
    train_1,
    train_2
  }