<template>
  <v-btn  v-if="captorActioneurToAdd.length > 0" variant="tonal" @click="pushCaptorActionneur" color="primary">
    Push the captor/actionneur floor
  </v-btn>
          <v-stage :config="{ width: stageWidth, height: stageHeight }">
           <v-layer>
           <v-group  v-for="piece in tabPiece" :key="piece.id"
           >
                <v-shape :config="getShapeConfig(piece)"/>
                <v-text
                    :config="getTextConfig(piece)" />

              </v-group>
             <template v-for="piece in tabPiece" :key="piece._id">
               <template v-for="(pieces,index) in piece.capteurs" :key="index">
                 <v-circle v-if="getMenuItemSquareConfig(index, pieces, pieces.points).shape === 'circle'"
                           :config="getMenuItemSquareConfig(index, pieces, pieces.points)">
                 </v-circle>

                 <v-rect v-else-if="getMenuItemSquareConfig(index, pieces, pieces.points).shape === 'rect'"
                         :config="getMenuItemSquareConfig(index, pieces, pieces.points)">

                 </v-rect>

                 <v-regular-polygon v-else-if="getMenuItemSquareConfig(index, pieces, pieces.points).shape === 'regularPolygon'"
                                    :config="getMenuItemSquareConfig(index, pieces, pieces.points)"
                                    @mouseover="BeforecaptorEvent($event,pieces)"
                                    @mouseout="AfterCaptorEvent($event, pieces)"
                                    @click="captorEvent($event,pieces)">
                   >
                 </v-regular-polygon>

               </template>
             </template>
            </v-layer>
            <v-layer>
              <v-group :draggable="true"
                       @dragstart="dragStart"
                       @dragmove="dragMove"
                      @dragend="dragEnd">

                <v-circle :config="headConfig()"></v-circle>
                <v-rect :config="bodyConfig()"></v-rect>

                <v-rect :config="armConfig(-12, 45)"></v-rect>
                <v-rect :config="armConfig(12, -45)"></v-rect>



                <v-rect :config="legConfig(-5, 0)"></v-rect>
                <v-rect :config="legConfig(10, 0)"></v-rect>

              </v-group>
            </v-layer>


            <v-layer>
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
          </v-stage>
</template>

<script>
import { defineComponent, onMounted, ref, computed, reactive } from 'vue';
import { VStage, VLayer, VShape,VText, VGroup, VRegularPolygon,VCircle, VRect  } from 'vue-konva';
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";

export default defineComponent({
  components: {
    VStage,
    VLayer,
    VShape,
    VText,
    VGroup,
    VRegularPolygon,
    VCircle,
    VRect
  },
  setup() {
    const stageWidth = ref(window.innerWidth);
    const stageHeight = ref(window.innerHeight);
    const scaleFactor = ref(0);
    const store = useRoomsStore();
    const{pieces, currentFloor, captorActionneur, captorActioneurToAdd} = storeToRefs(store)
    const {getPieces, getCaptorandSensor, addCaptorActionneur, pushCaptorActionneur, updateCaptor } = store;

    const menuX = ref(1250 );
    const menuY =ref(0);

    const mode = ref(2);

    const XHead = ref(600);
    const YHead = ref(700);

    const nom = ref(null);

    const bonhmXPos = ref(0);
    const bonhmYPos = ref(0);


    const menuConfig = computed(() => ({
      x: menuX.value,
      y: menuY.value,
      width: 600,
      height: captorActionneur.value.filter(e => e.show === true).length * 100 *scaleFactor.value,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1
    }));

    const getMenuItemConfig = (item, index) => ({
      text: item.type,
      fontSize: 25 * scaleFactor.value,
      x: menuX.value + 50 * scaleFactor.value,
      y: menuY.value + 25 *scaleFactor.value + (index * 60) *  scaleFactor.value,
      fill: 'black'
    });

    const getMenuItemSquareConfig = (index, item, coord, color) => {
      let shapeConfig;
      let x =menuX.value + 25 * scaleFactor.value;
      let y =menuY.value + 35 *scaleFactor.value + (index * 60) *  scaleFactor.value;
      let c = 'black'
      let strockWidth = 1;

      if(color !== undefined){
        c = color
        strockWidth = 2;
      }

      if(coord !== undefined){
        x = coord.x * scaleFactor.value;
        y = coord.y * scaleFactor.value;
      }

      const itemId = item._id || item.typeId;


      switch (itemId) {
        case 'sensor-light':
          shapeConfig = {
            shape: 'circle',
            fill: 'yellow'
          };
          break;
        case "sensor-light-socket":
          shapeConfig = {
            shape: 'circle',
            fill: 'orange'
          };
          break;
        case 'sensor-smart-plug':
          shapeConfig = {
            shape: 'circle',
            fill: 'lightblue'
          };
          break;
        case 'sensor-motorized-blind':
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


    const setMenusSizeAndPos = () =>{
      menuConfig.value.x = menuX.value;
      menuConfig.value.y = menuY.value;
      menuConfig.value.width *= scaleFactor.value;
      menuConfig.value.height = captorActionneur.value.filter(e => !e.show=== true).length * 100 *scaleFactor.value + 40 * scaleFactor.value;

    }

    const setSize = () =>{
      if(window.innerWidth < 501){
        scaleFactor.value = 0.25
        setMenusSizeAndPos();
      } else if(window.innerWidth < 800){
        scaleFactor.value = 0.30;
        menuX.value = 0;
        menuY.value = 300;
        setMenusSizeAndPos();
      } else if(window.innerWidth < 1200){
        scaleFactor.value = 0.45;
        menuX.value = 630;
        menuY.value = 25;
        setMenusSizeAndPos()
      } else if(window.innerWidth < 1600){
        scaleFactor.value = 0.70;
        menuX.value = 980;
        menuY.value = 25;
        setMenusSizeAndPos()
      } else {
        scaleFactor.value = 0.80;
        menuX.value = 1140;
        menuY.value =25;
        setMenusSizeAndPos()


      }
    }

    window.addEventListener('resize', () => {
      setSize();

        //  scaleFactor.value = window.innerWidth / stageWidth.value;
      //  stageWidth.value = stageWidth.value * (window.innerWidth/100);
      // stageHeight.value = stageHeight.value * (window.innerHeight/100);
    });



    onMounted(async () => {
      await getPieces()
      await getCaptorandSensor()
      setSize();
      // stageWidth.value = window.innerWidth;
      // stageHeight.value = window.innerHeight;
    });

    const dragStart = async () =>{
      document.body.style.cursor = 'grabbing';


      limbsState.armRotation = 80;
      limbsState.legRotation = -20;


      if (nom.value !== null) {
        await updateCaptor(nom.value, false)
      }
    }

    const dragMove = (event) => {
      const node = event.target;
      const box = node.getClientRect();
      const stage = node.getStage();

      let x = event.target.x();
      let y = event.target.y();

      //console.log(box.x + box.width)
      console.log(stage.children[0].children[0].parent)
      console.log( box.x + box.width)

      if (box.x < 0 || box.x + box.width > stage.width()) {
        x = bonhmXPos.value;
      } else {
        bonhmXPos.value = event.target.x();
      }

      if(box.y < 0 || box.y + box.height > stage.height()){
        y = bonhmYPos.value;
      }else{
        bonhmYPos.value = event.target.y();
      }

      node.position({ x, y });
    };

    const pointInPolygon = (point, polygon) => {
      let isInside = false;
      const x = point.x, y = point.y;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x *scaleFactor.value , yi = polygon[i].y *scaleFactor.value;
        const xj = polygon[j].x * scaleFactor.value, yj = polygon[j].y * scaleFactor.value;
        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
      }

      return isInside;
    };

    const dragEnd =async (event) => {
      document.body.style.cursor = 'default';
      const stage = event.target.getStage();
      const pointerPosition = stage.getPointerPosition();

      limbsState.armRotation = 0;
      limbsState.legRotation = 0;

      const droppedOnPiece = tabPiece.value.find(piece => {
        return pointInPolygon(pointerPosition, piece.position.points);
      });


      if (droppedOnPiece) {
        nom.value = droppedOnPiece.nom;
        await updateCaptor(nom.value, true)

        console.log('Dropped on piece:', droppedOnPiece.nom);
      } else {
        nom.value = null;
        console.log('Dropped outside of the pieces');
      }

      console.log()
    };

    const tabPiece = computed(() => {
      return currentFloor.value === 'first'
          ? pieces.value.filter(piece => piece.etage === 0)
          : pieces.value.filter(piece => piece.etage !== 0);
    });

    const captAdd = computed(() => {
      return currentFloor.value === 'first'
          ? captorActioneurToAdd.value.filter(piece => piece.etage === 0)
          : captorActioneurToAdd.value.filter(piece => piece.etage !== 0);
    });

    const getSensorCaptorState = (piece) => {
      return piece.capteurs.some(e => e.typeId === "sensor-presence" && e.etat === true);
    };


    const getShapeConfig = (piece) => {
      return {
        sceneFunc: (context, shape) => {
          context.beginPath();
          piece.position.points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x * scaleFactor.value, point.y * scaleFactor.value);
            } else {
              context.lineTo(point.x * scaleFactor.value, point.y * scaleFactor.value);
            }
          });
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: getSensorCaptorState(piece) ? 'lightgreen' :'#D3D3D3',
        stroke: 'black',
        strokeWidth: 2
      };
    };

    const getCenterPoint = (points) => {
      let sumX = 0;
      let sumY = 0;
      points.forEach(point => {
        sumX += point.x * scaleFactor.value;
        sumY += point.y * scaleFactor.value;
      });
      return { x: sumX / points.length  , y: sumY / points.length };
    };

    const getTextConfig = (piece) => {
      const center = getCenterPoint(piece.position.points);
      return {
        text: piece.nom,
        fontSize: 30 * scaleFactor.value,
        fontFamily: 'Mono',
        x: center.x - piece.nom.length - (40 * scaleFactor.value) ,
        y: center.y,
        align: 'center',
        verticalAlign: 'middle',
        fill: 'black'
      };
    };

    const headConfig = () => {
      return{
        x: XHead.value * scaleFactor.value,
        y: YHead.value *  scaleFactor.value,
        radius: 8 * scaleFactor.value,
        fill: '#ED7F10'
      }
    }

    const bodyConfig = () => {
      return{
        x: XHead.value *  scaleFactor.value - 10 * scaleFactor.value,
        y: YHead.value *  scaleFactor.value + 6  * scaleFactor.value,
        width: 20 * scaleFactor.value,
        height: 30 * scaleFactor.value,
        cornerRadius: [15, 15, 10, 10],
        fill: '#ED7F10'

      }
    }

    const limbsState = reactive({
      armRotation: 0,
      legRotation: 0
    });

    const armConfig = (dec,rot) => {
      return {
        x: XHead.value *  scaleFactor.value + dec  * scaleFactor.value,
        y: YHead.value *  scaleFactor.value + 17  * scaleFactor.value,
        width: 6 * scaleFactor.value,
        height: 20 * scaleFactor.value,
        cornerRadius: [15, 15, 10, 10],
        rotation: rot + limbsState.armRotation,
        offsetX: 2.5 * scaleFactor.value,
        offsetY: 10 * scaleFactor.value,
        fill: '#ED7F10'
      };
    };

    const legConfig = (dec,rot) => {
      return {
        x: XHead.value *  scaleFactor.value - dec  * scaleFactor.value,
        y: YHead.value *  scaleFactor.value  + 25  * scaleFactor.value,
        width: 5 * scaleFactor.value,
        height: 20 * scaleFactor.value,
        cornerRadius: 20,
        fill: '#ED7F10',
        rotation: rot + limbsState.legRotation,
      };
    };


/*  const handleMouseOver = (event) => {
      event.target.fill('red');
      event.target.getLayer().draw();
    }

    const handleMouseOut = (event) => {
      event.target.fill('lightgray');
      event.target.getLayer().draw();
    }; */

    const startMenu = (event, index, item) => {
      const node = event.target;
      const layer = node.getLayer();

      const clone = node.clone({
        draggable: true
      });

      clone.on('dragstart', (e) => {
        startMenu(e, index, item);
      });

      clone.on('dragend', (e) => {
        console.log(e)
        endMenu(e, item);
      })

      const { x, y } = getMenuItemSquareConfig(index, item);


      clone.position({ x : x , y: y });

      layer.add(clone);
      layer.draw();
    };

    const endMenu = async (event, item) => {
      console.log(event.currentTarget)

      try{
        console.log(event.target.getStage())
        const droppedOnPiece = tabPiece.value.find( p => {
          return pointInPolygon({x: event.target.getStage().getPointerPosition().x, y:event.target.getStage().getPointerPosition().y} ,p.position.points)
        });

        if(droppedOnPiece) {
          await addCaptorActionneur({"nom": droppedOnPiece.nom,
            "_id": item._id, "etage": droppedOnPiece.etage,
            "points":{"x": event.target.getStage().getPointerPosition().x / scaleFactor.value,
              'y':event.target.getStage().getPointerPosition().y / scaleFactor.value
            }})
          event.target.destroy()
        } else{
          event.target.destroy()
        }
      }catch(er){
        console.log(event.target)
      }
    }

    const BeforecaptorEvent = (event, piece) => {
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


    }

    return {
      getShapeConfig,
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
      captorActionneur,
      startMenu,
      endMenu,
      captAdd,
      pushCaptorActionneur,
      captorActioneurToAdd,
      bodyConfig,
      armConfig,
      legConfig,
      captorEvent,
      BeforecaptorEvent,
      AfterCaptorEvent
    };
  }
});
</script>
