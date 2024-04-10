<template>
  <v-btn  class="" variant="tonal" @click="pushCaptorActionneur" color="primary">
    Push the captor/actionneur floor
  </v-btn>
          <v-stage :config="{ width: stageWidth, height: stageHeight }">
           <v-layer>
           <v-group  v-for="piece in tabPiece" :key="piece.id"
           >
                <v-shape @mouseover="handleMouseOver"
                         @mouseout="handleMouseOut"
                         :config="getShapeConfig(piece)"/>
                <v-text
                    :config="getTextConfig(piece)" />

          <v-regular-polygon
                :config="getPolygonConfig()"
                ></v-regular-polygon>

              </v-group>
            </v-layer>
            <v-layer>
              <v-group :draggable="true"
                       @dragstart="dragStart"
                       @dragmove="dragMove"
                      @dragend="dragEnd">

                <v-circle :config="headConfig()"></v-circle>
              </v-group>
            </v-layer>


            <v-layer>
              <v-rect :config="menuConfig">
              </v-rect>
              <v-text  v-for="(item, index) in captorActionneur" :key="item._id" :config="getMenuItemConfig(item,index)"></v-text>
              <template v-for="(item, index) in captorActionneur" :key="index">
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

                  <v-circle v-if="getMenuItemSquareConfig(index, item, item.points).shape === 'circle'"
                            :config="getMenuItemSquareConfig(index, item,  item.points)">
                  </v-circle>

                  <v-rect v-else-if="getMenuItemSquareConfig(index, item,  item.points).shape === 'rect'"
                          :config="getMenuItemSquareConfig(index, item,  item.points)">

                  </v-rect>

                  <v-regular-polygon v-else-if="getMenuItemSquareConfig(index, item, item.points).shape === 'regularPolygon'"
                                     :config="getMenuItemSquareConfig(index, item,  item.points)">
                  </v-regular-polygon>
                </template>
              </template>
            </v-layer>
          </v-stage>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
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
    const {getPieces, getCaptorandSensor, addCaptorActionneur, pushCaptorActionneur } = store;

    const menuX = ref(1250 );
    const menuY =ref(0);

    const mode = ref(2);

    const menuConfig = computed(() => ({
      x: menuX.value,
      y: menuY.value,
      width: 400,
      height: captorActionneur.value.length * 100 *scaleFactor.value,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1
    }));

    const getMenuItemConfig = (item, index) => ({
      text: item.type,
      fontSize: 25 * scaleFactor.value,
      x: menuX.value + 80 * scaleFactor.value,
      y: menuY.value + 55 + (index * 60) *  scaleFactor.value,
      fill: 'black'
    });

    const getMenuItemSquareConfig = (index, item, coord) => {
      let shapeConfig;
      let x =menuX.value + 30 * scaleFactor.value;
      let y =menuY.value + 60 + (index * 60) *  scaleFactor.value;

      if(coord !== undefined){
        x = coord.x;
        y = coord.y;
      }

      switch (item._id) {
        case 'sensor-light':
          shapeConfig = {
            shape: 'circle',
            fill: 'yellow'
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
            rotate:90,
            fill: 'blue'
          };
          break;
        default:
          shapeConfig = null;
      }

      return {
        x: x,
        y: y,
        stroke: 'black',
        strokeWidth: 1,
        width: 30 * scaleFactor.value,
        height: 30 * scaleFactor.value,
        ...shapeConfig
      };
    };


    const setMenusSizeAndPos = () =>{
      menuConfig.value.x = menuX.value;
      menuConfig.value.y = menuY.value;
      menuConfig.value.width *= scaleFactor.value;
      menuConfig.value.height = captorActionneur.value.length * 100 *scaleFactor.value;

    }

    const setSize = () =>{
      if(window.innerWidth < 501){
        scaleFactor.value = 0.30
        setMenusSizeAndPos();
      } else if(window.innerWidth < 800){
        scaleFactor.value = 0.40;
        menuX.value = 0;
        menuY.value = 400;
        setMenusSizeAndPos();
      } else if(window.innerWidth < 1200){
        scaleFactor.value = 0.55;
        menuX.value = 800;
        menuY.value = 0;
        setMenusSizeAndPos()
      } else if(window.innerWidth < 1600){
        scaleFactor.value = 0.75;
        menuX.value = 1050;
        menuY.value = 0;
        setMenusSizeAndPos()
      } else {
        scaleFactor.value = 0.85;
        menuX.value = 1250;
        menuY.value =0;
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

    const dragStart = (event) =>{
      console.log(event)
      document.body.style.cursor = "grab";
    }

    const dragMove = (event) => {
      const node = event.target;
      const box = node.getClientRect();
      const stage = node.getStage();

      // Limitez le déplacement à l'intérieur de la zone du stage
      let x = event.target.x();
      let y = event.target.y();

      if (box.x < 0 || box.x + box.width > stage.width()) {
        x = node.startX;
      }

      if (box.y < 0 || box.y + box.height > stage.height()) {
        y = node.startY;
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

    const dragEnd = (event) => {
      document.body.style.cursor = 'default';
      const stage = event.target.getStage();
      const pointerPosition = stage.getPointerPosition();

      const droppedOnPiece = tabPiece.value.find(piece => {
        return pointInPolygon(pointerPosition, piece.position.points);
      });

      const droppedOnPieceIndex = tabPiece.value.findIndex(piece =>
          pointInPolygon(pointerPosition, piece.position.points)
      );

      if (droppedOnPiece) {

        const updatedPiece = { ...tabPiece.value[droppedOnPieceIndex] };

        updatedPiece.capteurs.forEach(capteur => {
          if (capteur.typeId === "sensor-presence") {
            capteur.etat = true;
          }
        });

        tabPiece.value.splice(droppedOnPieceIndex, 1, updatedPiece);
        console.log(tabPiece.value)


        console.log('Dropped on piece:', droppedOnPiece.nom);
      } else {
        console.log('Dropped outside of the pieces');
      }
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
        fill: getSensorCaptorState(piece) === true ? 'red' :'lightgray',
        stroke: 'black',
        strokeWidth: 2
      };
    };

    const getPolygonConfig = () => {
      return {
        x: 300 * scaleFactor.value,
        y: 300 * scaleFactor.value,
        sides: 6,
        radius: 15  * scaleFactor.value,
        fill:'purple',
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
        x: 200,
        y: 200,
        radius: 8,
        fill: '#ED7F10'
      }
    }


    const handleMouseOver = (event) => {
      event.target.fill('red');
      event.target.getLayer().draw();
    }

    const handleMouseOut = (event) => {
      event.target.fill('lightgray');
      event.target.getLayer().draw();
    };

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
        endMenu(e, item);
      })

      const { x, y } = getMenuItemSquareConfig(index, item);

      clone.position({ x, y });

      layer.add(clone);
      layer.draw();
    };

    const endMenu = async (event, item) => {

      const droppedOnPiece = tabPiece.value.find( p => {
        return pointInPolygon({x: event.target.getStage().getPointerPosition().x, y:event.target.getStage().getPointerPosition().y} ,p.position.points)
      });

      if(droppedOnPiece) {
        console.log(item)
        await addCaptorActionneur({"nom": droppedOnPiece.nom,
          "_id": item._id, "etage": droppedOnPiece.etage,
          "points":{"x":event.target.getStage().getPointerPosition().x,
            'y':event.target.getStage().getPointerPosition().y
        }})
        console.log(captorActioneurToAdd.value)
        event.target.destroy()
      } else{
        event.target.destroy()
      }
    }


    return {
      getShapeConfig,
      stageWidth,
      stageHeight,
      currentFloor,
      tabPiece,
      getTextConfig,
      getPolygonConfig,
      headConfig,
      dragStart,
      dragEnd,
      handleMouseOver,
      handleMouseOut,
      dragMove,
      mode,
      menuConfig,
      getMenuItemConfig,
      getMenuItemSquareConfig,
      captorActionneur,
      startMenu,
      endMenu,
      captAdd,
      pushCaptorActionneur
    };
  }
});
</script>
