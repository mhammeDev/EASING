<template>
<!--  <input type="button"  v-if="captorActioneurToAdd.length > 0" variant="tonal" @click="pushCaptorActionneur" color="primary">-->

          <v-stage :config="{ width: 1430 * scaleFactor, height: 970 * scaleFactor }" ref="stage"
                   @mousedown="setDragStart($event)"
                   @mouseup="setDragEnd()"
                   @mousemove="zoomFunction($event)">
           <v-layer  >
<!--             <v-rect :config="getGrasseConfig()"></v-rect> -->

             <v-group  v-for="piece in tabPiece" :key="piece.id"
           >
             <v-shape :skipTransform="false"  :config="getShapeConfig(piece)" @click="setCurrentRoom(piece)"/>
                <v-text
                    :config="getTextConfig(piece)" />

              </v-group>
             <template v-for="piece in tabPiece" :key="piece._id">
               <template v-for="(pieces, index) in [...piece.captors, ...piece.actuators]" :key="index">
                <!-- <v-circle v-if="getHomeItemSquareConfig(index, pieces, pieces.points).shape === 'circle'"
                           :config="getHomeItemSquareConfig(index, pieces, pieces.points)">
                 </v-circle>

                 <v-rect v-else-if="getHomeItemSquareConfig(index, pieces, pieces.points).shape === 'rect'"
                         :config="getHomeItemSquareConfig(index, pieces, pieces.points)">

                 </v-rect>

                 <v-regular-polygon v-else-if="getHomeItemSquareConfig(index, pieces, pieces.points).shape === 'regularPolygon'"
                                    :config="getHomeItemSquareConfig(index, pieces, pieces.points)"
                                    @mouseover="BeforecaptorEvent($event,pieces)"
                                    @mouseout="AfterCaptorEvent($event, pieces)"
                                    @click="captorEvent($event,pieces)">
                   >
                 </v-regular-polygon>
                 -->
                 <v-image
                     :config="getHomeIcons(pieces,pieces.points)"
                     @click="IconsAction(piece.name,pieces)"
                     @mouseover="buttonCheck(pieces)"
                     @mouseout="buttonUnCheck()"></v-image>




               </template>
             </template>
            </v-layer>
            <v-layer>
              <v-group :draggable="isDown === false"
                       @dragstart="dragStart"
                       @dragmove="dragMove"
                      @dragend="dragEnd"
                      ref="bonhGroup">

                <v-circle :config="headConfig()"></v-circle>
                <v-rect :config="bodyConfig()"></v-rect>

                <v-rect :config="armConfig(-12, 45)"></v-rect>
                <v-rect :config="armConfig(12, -45)"></v-rect>



                <v-rect :config="legConfig(-5, 0)"></v-rect>
                <v-rect :config="legConfig(10, 0)"></v-rect>

              </v-group>
            </v-layer>


         <!--   <v-layer>
              <v-rect :config="menuConfig">
              </v-rect>
              <v-text  v-for="(item, index) in captorActionneur.filter(e => e.show === true)" :key="item._id" :config="getMenuItemConfig(item,index)"></v-text>
              <template v-for="(item, index) in captorActionneur.filter(e => e.show === true)" :key="index">
                <v-circle v-if="getMenuItemSquareConfig(index, item).shape === 'circle'"
                          :config="getMenuItemSquareConfig(index, item)"
                          :draggable="mode === 2"
                          @dragstart="startMenu($event, index, item)"
                          @dragend="endMenu($event, item)">
                </v-circle>

                <v-rect v-else-if="getMenuItemSquareConfig(index, item).shape === 'rect'"
                        :config="getMenuItemSquareConfig(index, item)"
                        :draggable="mode === 2"
                        @dragstart="startMenu($event, index, item)"
                        @dragend="endMenu($event, item)">

                </v-rect>

                <v-regular-polygon v-else-if="getMenuItemSquareConfig(index, item).shape === 'regularPolygon'"
                                   :config="getMenuItemSquareConfig(index, item)"
                                   :draggable="mode === 2"
                                   @dragstart="startMenu($event, index, item)"
                                   @dragend="endMenu($event, item)">
                </v-regular-polygon>
              </template>

              <template v-if="mode === 2">
                <template v-for="(item, index) in captAdd" :key="index">

                  <v-circle v-if="getMenuItemSquareConfig(index, item, item.points, 'red').shape === 'circle'"
                            :config="getMenuItemSquareConfig(index, item,  item.points, 'red')">
                  </v-circle>

                  <v-rect v-else-if="getMenuItemSquareConfig(index, item,  item.points, 'red').shape === 'rect'"
                          :config="getMenuItemSquareConfig(index, item,  item.points, 'red')">

                  </v-rect>

                  <v-regular-polygon v-else-if="getMenuItemSquareConfig(index, item, item.points, 'red').shape === 'regularPolygon'"
                                     :config="getMenuItemSquareConfig(index, item,  item.points, 'red')">
                  </v-regular-polygon>
                </template>
              </template>
            </v-layer>
            -->
          </v-stage>
</template>

<script>
import {defineComponent, onMounted, ref, computed, reactive, watch} from 'vue';
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";

export default defineComponent({
  setup() {

    //const stage = ref(null);
    const draggingStart = ref(false)

    const stageWidth = ref(window.innerWidth);
    const stageHeight = ref(window.innerHeight);

    const bonhGroup = ref(null)


    const scaleFactor = ref(0); // we need this variable for responsive, and because we need to keep the same space between point that why we need it
    const store = useRoomsStore();
    const{pieces, currentFloor, captorActionneur, zoom,isDown} = storeToRefs(store)
    const {getPieces, getCaptorandSensor, SensorEvent/* addCaptorActionneur, pushCaptorActionneur*/, UpdatePresenceSensor, UpdateSocketSensor, setCurrentRoom } = store;

    const menuX = ref(1250 ); // right menu
    const menuY =ref(0);

    const mode = ref(2); // mode 1 is view mode and 2 edit mode

    const XHead = ref(600); //
    const YHead = ref(700); // xhead and yhead is the start point of the stickman to keep always the same shape

    const name = ref(null);

    const bonhmXPos = ref(0);// the start position of the stickman but we initialize it behind
    const bonhmYPos = ref(0);

    let cornerRect = ref([20, 0 , 0, 20])

    let dragStartPosition = ref({});

    let prevCoord = ref({x:0, y:0})



    /*
    * This is the configuration of the right menu, but the size and position is intiialise in 'setSize'
     */
    const menuConfig = computed(() => ({
      x: menuX.value,
      y: menuY.value,
      width: 600,
      height: captorActionneur.value.filter(e => e.show === true).length * 100 *scaleFactor.value,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1,
    }));


    /*
    * This is the legends of differents devices, the text is linked to a shape
    * THe first parameter is the item, the current room
    * and the index is usefull for the space between each eleme,ts
     */
    const getMenuItemConfig = (item, index) => ({
      text: item.name,
      fontSize: 25 * scaleFactor.value,
      x: menuX.value + 50 * scaleFactor.value,
      y: menuY.value + 25 *scaleFactor.value + (index * 60) *  scaleFactor.value,
      fill: 'black'
    });

    const getGrasseConfig= () =>{
      return  {
        id:'Grass',
        x:0,
        y:0,
        width: 1430 * scaleFactor.value * zoom.value,
        height: 970 * scaleFactor.value * zoom.value,
        fill: '#12AE0F',
        cornerRadius:cornerRect.value,
      }
    }
    /*
    * Same than the methode under but this time this is for the shape
    * The first parameter allow to us for the space between each elements
    * The second is the room
    * The thirst parameter allow us to use the same method even if we have parameter or no, for the menu or the map
    * And the last parameter allow us tu put a color if we want
     */
    const getMenuItemSquareConfig = (index, item, coord, color) => {
      let shapeConfig;
      let x =menuX.value + 25 * scaleFactor.value; // like we can see for the menu the position is calculated at the beginning
      let y =menuY.value + 35 *scaleFactor.value + (index * 60) *  scaleFactor.value;
      let c = 'black'
      let strockWidth = 1

      if(color !== undefined){
        c = color
        strockWidth = 2;
      }

      if(coord !== undefined){
        x = coord.x * scaleFactor.value; // And if we have position we take it
        y = coord.y * scaleFactor.value;
      }

      const itemId = item._id || item.typeId; // For the rooms the devices id are like foreign key, so the name is different

      // and the form depend of the type of devices so each devices had different form
      switch (itemId) {
        case 'connected-light':
          shapeConfig = {
            shape: 'circle',
            fill: 'yellow',
            strokeWidth: 1,
            stroke: c,
            shadowColor: item.value ? 'orange' : 'transparent',
            shadowBlur: item.value ? 20 : 0,
            shadowOffset: { x: 0, y: 0 },
            shadowOpacity: item.value ? 0.8 : 0
          };
          break;
        case "smart-connected-light":
          shapeConfig = {
            shape: 'circle',
            fill: 'orange',
            strokeWidth: 1,
            stroke: c,
            shadowColor: item.value ? 'orange' : 'transparent',
            shadowBlur: item.value ? 20 : 0,
            shadowOffset: { x: 0, y: 0 },
            shadowOpacity: item.value ? 0.8 : 0
          };
          break;
        case 'connected-tv':
          shapeConfig = {
            shape: 'circle',
            fill: 'lightblue'
          };
          break;
        case 'motorized-blind':
          shapeConfig = {
            shape: 'regularPolygon',
            sides: 6,
            fill: 'pink'
          };
          break;
        case 'sensor-water-leak':
          shapeConfig = {
            shape: 'regularPolygon',
            sides: 4,
            rotation:45,
            fill: 'blue'
          };
          break;
        default:
          shapeConfig = null;
          break;
      }

      return {
        x: x,
        y: y,
        stroke: c,
        strokeWidth: strockWidth,
        width: 33 * scaleFactor.value,
        height: 33 * scaleFactor.value,
        ...shapeConfig
      };
    };

    /**
     * This methods allowed you to place icons in the map
     * @param p The current room
     * @param points the points of the sensors to place it
     * @returns {{image: HTMLImageElement, x: number, width: number, y: number, height: number}}
     */

    const getHomeIcons = (p,points) => {
      let path = getRightIcons(p.value,p.typeId)
      if(path === '') return // if an image hasn't icons we don't display it

      const image = new Image();
      //console.log(`@/assets/icons/${path.toString()}`)
      image.src = require('@/assets/icons/' + path)


      return {
        x: points.x * scaleFactor.value * zoom.value,
        y: points.y * scaleFactor.value * zoom.value,
        width: 60 * scaleFactor.value * zoom.value,
        height: 60 * scaleFactor.value * zoom.value,
        image: image,
      };
    };


    /**
     * If they have a new icons you have to edit this methods, because this in this method which we attribute icon for sensors and actuators
     * @param pieceValue
     * @param pieceId
     * @returns {string}
     */

    const getRightIcons = (pieceValue, pieceId) => {
      let result = '';

        switch (pieceId) {
        case 'connected-light':
          result = pieceValue === "bulb_on" ? "connected-light_on.png" : "connected-light_off.png"
          break;
        case "smart-connected-light":
          result = pieceValue === "bulb_on" ? "smart-light_on.png" : "smart-light_off.png"
          break;
        case 'connected-tv':
          result = pieceValue === "tv_on" ? "tv_on.png" : "tv_off.png"
          break;
        case 'motorized-blind':
          result = pieceValue === "blind_up" ? "blind_up.png" : "blind_down.png"
          break;
        case 'sensor-water-leak':
          result = "water-leak.png"
          break;
        case "heating":
          result = pieceValue === "heating_on" ? "heating_on.png" : "heating_off.png";
          break;
        default:
          break;
      }
      return result;

    }

    const getHomeItemSquareConfig = (index, item, coord) => {
      let shapeConfig;
      let x =menuX.value + 25 * scaleFactor.value; // like we can see for the menu the position is calculated at the beginning
      let y =menuY.value + 35 *scaleFactor.value + (index * 60) *  scaleFactor.value;
      let c = 'black'
      let strockWidth = 1


      if(coord !== undefined){
        x = coord.x * scaleFactor.value; // And if we have position we take it
        y = coord.y * scaleFactor.value;
      }

      const itemId = item._id || item.typeId; // For the rooms the devices id are like foreign key, so the name is different

      // and the form depend of the type of devices so each devices had different form
      switch (itemId) {
        case 'connected-light':
          shapeConfig = {
            shape: 'circle',
            fill: 'yellow',
            strokeWidth: 1,
            stroke: c,
            shadowColor: item.value ? 'orange' : 'transparent',
            shadowBlur: item.value ? 20 : 0,
            shadowOffset: { x: 0, y: 0 },
            shadowOpacity: item.value ? 0.8 : 0
          };
          break;
        case "smart-connected-light":
          shapeConfig = {
            shape: 'circle',
            fill: 'orange',
            strokeWidth: 1,
            stroke: c,
            shadowColor: item.value ? 'orange' : 'transparent',
            shadowBlur: item.value ? 20 : 0,
            shadowOffset: { x: 0, y: 0 },
            shadowOpacity: item.value ? 0.8 : 0
          };
          break;
        case 'connected-tv':
          shapeConfig = {
            shape: 'circle',
            fill: 'lightblue'
          };
          break;
        case 'motorized-blind':
          shapeConfig = {
            shape: 'regularPolygon',
            sides: 6,
            fill: 'pink'
          };
          break;
        case 'sensor-water-leak':
          shapeConfig = {
            shape: 'regularPolygon',
            sides: 4,
            rotation:45,
            fill: 'blue'
          };
          break;
        default:
          shapeConfig = null;
          break;
      }

      return {
        x: x,
        y: y,
        stroke: c,
        strokeWidth: strockWidth,
        width: 33 * scaleFactor.value,
        height: 33 * scaleFactor.value,
        ...shapeConfig
      };
    };


    /*
    * This function is to always update the size of the righht menu for the responsivity
     */
    const setMenusSizeAndPos = () =>{
      menuConfig.value.x = menuX.value;
      menuConfig.value.y = menuY.value;
      menuConfig.value.width *= scaleFactor.value;
      menuConfig.value.height = captorActionneur.value
          .filter(e => !e.show=== true).length * 100 *scaleFactor.value + 40 * scaleFactor.value; // the height depend of the number of elements but all elements are not necessarly visible
    }

    /*
    * We fix some different size of screen and for each the size differ
    * So we always update the scale factor to resize and replace elements, and we update too the right menu
     */
    const setSize = () =>{
      if(window.innerWidth < 501){
        scaleFactor.value = 0.25
        cornerRect.value = [0,0,0,0]

        setMenusSizeAndPos();
      } else if(window.innerWidth < 700){
        scaleFactor.value = 0.30;
        menuX.value = 0;
        menuY.value = 300;
        cornerRect.value = [0,0,0,0]
        setMenusSizeAndPos();
      } else if(window.innerWidth < 1200){
        scaleFactor.value = 0.45;
        menuX.value = 630;
        menuY.value = 25;
        cornerRect.value = [0,0,0,0]

        setMenusSizeAndPos()
      } else if(window.innerWidth < 1600){
        scaleFactor.value = 0.70;
        menuX.value = 980;
        menuY.value = 25;
        cornerRect.value = [20,0,0,20]

        setMenusSizeAndPos()
      } else if(window.innerWidth < 1920) {
        scaleFactor.value = 0.75;
        menuX.value = 1050;
        menuY.value =25;
        cornerRect.value = [20,0,0,20]

        setMenusSizeAndPos()
      } else{
        scaleFactor.value = 0.95;
        menuX.value = 1050;
        cornerRect.value = [20,0,0,20]

        menuY.value =25;

      }
    }

    window.addEventListener('resize', () => {
      setSize();
    });



    onMounted(async () => {
      await getPieces()
      await getCaptorandSensor()
      setSize();
    });

    /*
    * When we took the stickman
     */
    const dragStart = async () =>{
      document.body.style.cursor = 'grabbing';


      if(isDown.value === false) {


        limbsState.armRotation = 80; // little animation
        limbsState.legRotation = -20;


        if (name.value !== null) { // when we drop a stickman in a room the room's name is save, but we see the pointer position and not
          // the stickman so sometimes when we drop the stickman and take with the cursor but the cursor is in the limit with an other room the sensor-presence of the room stiil in true
          await UpdatePresenceSensor(name.value, false)
        }
      }
    }

    /*
    * When we move the stickman
     */

    const dragMove = (event) => {
      const node = event.target;
      const box = node.getClientRect();
      const stage = node.getStage();

      if(isDown.value === false){
        let x = event.target.x() ; // we already take every last position of the stickman
        let y = event.target.y()

        // Here we see if it's trying to go beyond the limit of the drawing, if this the case the last position become
        // the stickman's position here for the X and under for the Y
        if (box.x < 0 || box.x + box.width > stage.width() || box.x + box.width > stage.children[0].hitCanvas.width) {
          x = bonhmXPos.value;
        } else {
          bonhmXPos.value = event.target.x();
        }

        if(box.y < 0 || box.y + box.height > stage.height()){
          y = bonhmYPos.value;
        }else{
          bonhmYPos.value = event.target.y();
        }

        // We fix the position of the stickman
        node.position({ x, y });
      }
    };

    /*
    *This function allow us to now if a point is in a polygon
    * So the first paramaeter is the point
    * the second is the room
     */

    const pointInPolygon = (point, polygon) => {
      let isInside = false;
      const x = point.x, y = point.y;

      // For each point of polygon we see if there is an intersection (the algorithm was found in Internet)
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x *scaleFactor.value , yi = polygon[i].y *scaleFactor.value;
        const xj = polygon[j].x * scaleFactor.value, yj = polygon[j].y * scaleFactor.value;
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
      }

      return isInside;
    };

    /*
    * This function is when we drop the stickman
    * We took the event of dropping
     */

    const dragEnd = async (event) => {
      document.body.style.cursor = 'default';
      const stage = event.target.getStage();
      const pointerPosition = stage.getPointerPosition();

      //We reinitialize our cool animation
      limbsState.armRotation = 0;
      limbsState.legRotation = 0;

      // And with the precedent function we see if the stickman was dropped in a room
      const droppedOnPiece = tabPiece.value.find(piece => {
        return pointInPolygon({x: pointerPosition.x, y: pointerPosition.y}, piece.position.points);
      });

      //if this is the case we update the captor for the room
      if (droppedOnPiece) {
        console.log(droppedOnPiece);
        name.value = droppedOnPiece.name;
        await UpdatePresenceSensor(name.value, true)
        console.log('Dropped on piece:', droppedOnPiece.name);
      } else {
        name.value = null;
        console.log('Dropped outside of the pieces');
      }

      console.log()
    };

    // We filter the room with the floor
    const tabPiece = computed(() => {
      return currentFloor.value === 'first'
          ? pieces.value.filter(piece => piece.floor === 0)
          : pieces.value.filter(piece => piece.floor !== 0);
    });

    /*
    * CaptAdd allow us to put in a table all devices that we wanted to add captor or light
    * And we filter to with the floor to see the devices to add in terms of floor

    const captAdd = computed(() => {
      return currentFloor.value === 'first'
          ? captorActioneurToAdd.value.filter(piece => piece.floor === 0)
          : captorActioneurToAdd.value.filter(piece => piece.floor !== 0);
    });
    */


    /*
    * This function return if there is a presence in a room
    * piece is the room that we wanted to check
     */
    const getSensorCaptorState = (piece) => {
      return piece.captors.some(e => e.typeId === "sensor-presence" && e.value === true);
    };

    /*
    *getShapeConfig is the function who draw our room
    * piece is the room that we wanted to draw
     */

    const getShapeConfig = (piece) => {
      return {
        sceneFunc: (context, shape) => {
          context.beginPath();
          piece.position.points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x * scaleFactor.value * zoom.value, point.y * scaleFactor.value * zoom.value);
            } else {
              context.lineTo(point.x * scaleFactor.value * zoom.value, point.y * scaleFactor.value * zoom.value);
            }
          });
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: getSensorCaptorState(piece) ? '#eeeaea' :'#D3D3D3',
        stroke: 'black',
        strokeWidth: 2,
      };
    };

    /*
    * This function to get the center point of a room and allow us to center the text with all points
     */

    const getCenterPoint = (points) => {
      let sumX = 0;
      let sumY = 0;
      points.forEach(point => {
        sumX += point.x * scaleFactor.value * zoom.value;
        sumY += point.y * scaleFactor.value * zoom.value;
      });
      return { x: sumX / points.length  , y: sumY / points.length };
    };

    /*
    * We put the name of the room in the center of the room
     */

    const getTextConfig = (piece) => {
      const center = getCenterPoint(piece.position.points);
      return {
        text: piece.name !== "Corridor" ? piece.name : "" ,
        fontSize: 30 * scaleFactor.value * zoom.value,
        fontFamily: 'Syne',
        x: center.x - 7 * piece.name.length * scaleFactor.value ,
        y: center.y,
        align: 'center',
        verticalAlign: 'middle',
        fill: 'black'
      };
    };

    /*
    * This is the start point of the stickman, the draw of his head, and all his body will depend on his head
     */
    const headConfig = () => {
      return{
        x: (XHead.value * scaleFactor.value) * zoom.value,
        y: (YHead.value *  scaleFactor.value) * zoom.value,
        radius: 8 * scaleFactor.value * zoom.value,
        fill: '#ED7F10'
      }
    }

    /*
    * THe body of his head with some factor to place it
     */

    const bodyConfig = () => {
      return{
        x: (XHead.value *  scaleFactor.value - 10 * scaleFactor.value) * zoom.value,
        y: (YHead.value *  scaleFactor.value + 6  * scaleFactor.value) *zoom.value,
        width: 20 * scaleFactor.value * zoom.value,
        height: 30 * scaleFactor.value * zoom.value,
        rotation: limbsState.bodyRotation,
        cornerRadius: [15, 15, 10, 10],
        fill: '#ED7F10'

      }
    }

    /*
    this is the rotation of leg and arm of the stickman and this will allow us the animate the stickman
     */
    const limbsState = reactive({

      armRotation: 0,
      bodyRotation : 0,
      legRotation: 0
    });

    /*
      * THe left and right arm
      * dec is the decalaga depend on the right or left
      * and rot is the rotation it's the same
     */
    const armConfig = (dec,rot) => {
      return {
        x: (XHead.value *  scaleFactor.value + dec  * scaleFactor.value) * zoom.value,
        y: (YHead.value *  scaleFactor.value + 17  * scaleFactor.value) * zoom.value,
        width: 6 * scaleFactor.value * zoom.value,
        height: 20 * scaleFactor.value * zoom.value,
        cornerRadius: [15, 15, 10, 10],
        rotation: rot + limbsState.armRotation,
        offsetX: 2.5 * scaleFactor.value,
        offsetY: 10 * scaleFactor.value,
        fill: '#ED7F10'
      };
    };

    /*
     * THe left and right leg
     * dec is the decalaga depend on the right or left
     * and rot is the rotation it's the same
    */
    const legConfig = (dec,rot) => {
      return {
        x: (XHead.value *  scaleFactor.value - dec  * scaleFactor.value) * zoom.value,
        y: (YHead.value *  scaleFactor.value  + 25  * scaleFactor.value) * zoom.value,
        width: 5 * scaleFactor.value * zoom.value,
        height: 20 * scaleFactor.value * zoom.value,
        cornerRadius: 20,
        fill: '#ED7F10',
        rotation: rot + limbsState.legRotation,
      };
    };


    /*
    * This is for the event when we start drag an element and place it (mode 2)
    * event is the event
    * index is to place back with a clone the current element because we drag it
    * and item is the current room
    const startMenu = (event, index, item) => {
      const node = event.target;
      const layer = node.getLayer();

      const clone = node.clone({
        draggable: true
      }); // we clone the current element that we drag

      clone.on('dragstart', (e) => {
        startMenu(e, index, item);
      }); // we affect it on dragstart this method to repeat the process

      clone.on('dragend', (e) => {
        console.log(e)
        endMenu(e, item);
      }) // same for the end

      const { x, y } = getMenuItemSquareConfig(index, item); // we get his position again thanks to the index and item


      clone.position({ x : x , y: y }); // and we plave it

      layer.add(clone);
      layer.draw(); // and draw in the layer
    };
         */



    /*
    * When we end dragging an eleement
    * event is the event of end dragging
    * and item the current room
    const endMenu = async (event, item) => {
      console.log(event.currentTarget)

      try{
        console.log(event.target.getStage())

        // we try to see if the element is dropped in a room thanks to pointInpolygon
        const droppedOnPiece = tabPiece.value.find( p => {
          return pointInPolygon({x: event.target.getStage().getPointerPosition().x,
            y:event.target.getStage().getPointerPosition().y} ,p.position.points) // x and y are the pointer position
        });

        if(droppedOnPiece) {
          // if an element is dropped in a room we add the
          await addCaptorActionneur({"name": droppedOnPiece.name,
            "_id": item._id, "type" : droppedOnPiece.type,"floor": droppedOnPiece.floor,
            "points":{"x": event.target.getStage().getPointerPosition().x / scaleFactor.value,
              'y':event.target.getStage().getPointerPosition().y / scaleFactor.value
            }}) // we add the drag's device in our state table
          event.target.destroy()
        } else{
          event.target.destroy()
          // and we destroy it to display only these who in the store
        }
      }catch(er){
        console.log(event.target)
      }
    }
         */



    /*const BeforecaptorEvent = (event, piece) => {
      if(piece.typeId === "sensor-water-leak"){
        document.body.style.cursor = 'pointer';
        console.log(event.target)

      }

    }

    const captorEvent = (event, pieces) =>{
      console.log(event + pieces)
    }

    const AfterCaptorEvent = (event, pieces) =>{
      console.log(event, pieces)
      document.body.style.cursor = 'default';
    }*/

    const buttonCheck = (piece) => {
      if(piece.typeId === "sensor-water-leak" || piece.typeId === "smart-connected-light" || piece.typeId === "connected-tv" )
        document.body.style.cursor = 'pointer';
    }

    const buttonUnCheck = () =>{
      document.body.style.cursor = 'default';

    }

    const IconsAction = (roomName,piece) => {
      console.log(roomName)
      switch (piece.typeId){
        case "sensor-water-leak":
          SensorEvent(
              {sensors :[{typeId: piece.typeId, value: true}]}
        )
          break;
        case "connected-tv":
          UpdateSocketSensor(roomName, piece)
          break;
        case "smart-connected-light":
          UpdateSocketSensor(roomName, piece)
          break;
        default:
          break;

      }

    }

    const setDragStart = (event)=> {

      const stage = event.target.getStage();
      const pointerPosition = stage.getPointerPosition();

      if(zoom.value > 1){
        document.body.style.cursor = 'grabbing';

        draggingStart.value = true

        dragStartPosition.value = {
          pointerX: pointerPosition.x ,
          pointerY: pointerPosition.y ,
          x: stage.x(),
          y: stage.y()
        };
      } else{
          prevCoord.value.x = 0
          prevCoord.value.y = 0

        //bonhmXPos.value =  0;
        //bonhmYPos.value =  0;
        //stage.children[1].children[0].position({x:0,y:0})
        stage.position({ x: prevCoord.value.x, y: prevCoord.value.y });
          stage.batchDraw();
      }

    }

    const setDragEnd = () => {
      if(zoom.value > 1){
        draggingStart.value = false;
        document.body.style.cursor = 'default';
      }

    }

    const zoomFunction = (event) => {
      if (draggingStart.value === true && zoom.value > 1) {
        /*const node = event.target;
        const box = node.getClientRect();
        const stage = node.getStage();
        const pointerPosition = stage.getPointerPosition();


        const grassConfig = getGrasseConfig();


        let x = pointerPosition.x + (dragStartPosition.value.x - dragStartPosition.value.pointerX);
        let y = pointerPosition.y + (dragStartPosition.value.y - dragStartPosition.value.pointerY);

        x *= zoom.value * 2;
        y *= zoom.value * 3;

        // Calculer les limites
        const minX = grassConfig.x;
        const minY = grassConfig.y;
        const maxX = (grassConfig.x + grassConfig.width - box.width) * scaleFactor.value;
        const maxY = (grassConfig.y + grassConfig.height - box.height) * scaleFactor.value;


        console.log(x)
        console.log(maxX)

        // Vérifier et ajuster la position si elle dépasse les limites
        if (!(x * zoom.value > minX || -x > 350 * zoom.value)) {
          prevCoord.value.x = x

        }

        if (!(y * zoom.value > minY || -y > maxY)) {
          prevCoord.value.y = y

        }

        prevCoord.value.x = x
        prevCoord.value.y = y



        // Mettre à jour la position
        stage.position({ x: prevCoord.value.x, y: prevCoord.value.y });
        stage.batchDraw();*/

        const node = event.target;
        const stage = node.getStage();
        const pointerPosition = stage.getPointerPosition();

        let x = pointerPosition.x * scaleFactor.value * zoom.value + (dragStartPosition.value.x - dragStartPosition.value.pointerX) * scaleFactor.value * zoom.value;
        let y = pointerPosition.y + (dragStartPosition.value.y - dragStartPosition.value.pointerY);

        /*


        const grassConfig = getGrasseConfig();




        const grass = stage.find('#Grass')[0];


        // Calculer les limites
        const minX = grassConfig.x;
        const minY = grassConfig.y;
        const maxX = (grassConfig.x + grassConfig.width) * scaleFactor.value;
        const maxY = (grassConfig.y + grassConfig.height) * scaleFactor.value;

        console.log(grass.attrs.x)

        if(grass.attrs.x < maxX * zoom.value){
          console.log("ntm")
        }


        // Vérifier et ajuster la position si elle dépasse les limites
       if (x < minX * zoom.value && -x < maxX * scaleFactor.value) {
          prevCoord.value.x = x
        }

        if (!(y * zoom.value > minY || -y > maxY)) {
          prevCoord.value.y = y

        }*/

        prevCoord.value.x = x
        prevCoord.value.y = y




        //prevCoord.value.x = x
        //prevCoord.value.y = y



        // Mettre à jour la position
        stage.position({ x: prevCoord.value.x, y: prevCoord.value.y });
        stage.batchDraw();


      }
    };


    /*watch(
        () => zoom.value,
        async (prev_value, new_value) => {
          console.log(prev_value)
          if(prev_value < new_value){
            const stage = document.getElementById("stage")
            console.log(stage)
          }
        }
    )*/

    watch(
        () => isDown.value,
        async (new_value) => {
          console.log(new_value)
          if(new_value=== true){
      //      limbsState.armRotation = 45;
        //    limbsState.legRotation = 90;
          //  limbsState.bodyRotation= 90;

           // console.log(bonhGroup.value)
           // let x =             bonhGroup.value.getNode().x
           // let y = bonhGroup.value.getNode().y

            console.log(bonhGroup.value.getNode())
            limbsState.armRotation = 120;
            limbsState.legRotation = -30;

            //bonhGroup.value.getNode().rotation(12.5)
          } else {
            bonhGroup.value.getNode().rotation(0)
            limbsState.armRotation = 0;
            limbsState.legRotation = 0;



          }
        }
    )



    return {
      draggingStart,
      getShapeConfig,
      getGrasseConfig,
      stageWidth,
      stageHeight,
      currentFloor,
      tabPiece,
      getTextConfig,
      headConfig,
      dragStart,
      dragEnd,
      dragMove,
      mode,
      menuConfig,
      getMenuItemConfig,
      getMenuItemSquareConfig,
      getHomeItemSquareConfig,
      captorActionneur,
    //  startMenu,
    //  endMenu,
     // captAdd,
     // pushCaptorActionneur,
     // captorActioneurToAdd,
      bodyConfig,
      armConfig,
      legConfig,
     // captorEvent,
     // BeforecaptorEvent,
      //AfterCaptorEvent,
      scaleFactor,
      getHomeIcons,
      buttonCheck,
      buttonUnCheck,
      IconsAction,
      setCurrentRoom,
      setDragStart,
      setDragEnd,
      zoomFunction,
      bonhGroup,
      isDown
    };
  }
});
</script>
