const train_1 = [
    {
        "cases": ["connected-light"],
        "examples":[
            {"role": "user", "content":`{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}],"actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},
        
          {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "high_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
          {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn off the light", "result" : "bulb_off"}]`},
      
 //         {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "sensor-presence", "value": true}, {"typeId": "internal-light-sensor", "value": "low_luminosity"}], "actuators": [{"typeId": "connected-light"}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
   //       {"role": "assistant", "content": `[{"name": "connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},   
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-tv"],
        "examples":[
            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}, {"typeId": "connected-tv", "dependencies": [{"typeId": "smart-socket", "value": false}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}, {"action" : "Turn on the television", "result": "tv_on"}, {"action" : "Turn off the television", "result" : "tv_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}, {"name": "connected-tv", "action": "Turn off the television", "result": "tv_off"}]`},      

            {"role": "user", "content": `{"name": "", "actuators": [{"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], actions: [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
            {"role": "assistant", "content": `[{"name": "smart-connected-light", "action": "Turn on the light", "result" : "bulb_on"}]`},
        ]

    },
    {
        "cases": ["smart-connected-light", "connected-light"],
        "examples":[
            {"role": "user", "content": `{"name": "", "sensors": [{"typeId": "internal-light-sensor", "value": "low_luminosity"}, {"typeId": "sensor-presence", "value": false}], "actuators": [{"typeId": "connected-light"}, {"typeId": "smart-connected-light", "dependencies": [{"typeId": "smart-socket", "value": true}]}], "actions": [{"action" : "Turn on the light", "result": "bulb_on"}, {"action" : "Turn off the light", "result" : "bulb_off"}]}`},
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

            {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "value": temp_low}], "actions": [{"action" : "Turn on the heating", "result" : "heating_on"}, {"action" : "Turn off the heating", "result": "heating_off"}]}`},
            {"role": "assistant", "content": `[{"name": "heating", "action": "Turn on the heating", "result" : "heating_on"}]`},


            {"role": "user", "content": `{"name": "", "sensors": [{"typeId":"temperature", "value": temp_high}],  "actuators": [{"typeId": "heating"}], "actions": [{"action" : "Turn on the heating", "result" : "heating_on"}, {"action" : "Turn off the heating", "result": "heating_off"}]}`},
            {"role": "assistant", "content": `[{"name": "heating", "action": "Turn off the heating",  "actuators": [{"typeId": "heating"}],"result" : "heating_off"`},

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

  module.exports = {
    train_1
  }