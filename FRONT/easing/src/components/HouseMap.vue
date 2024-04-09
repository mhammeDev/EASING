<template>
<!--        <v-btn @click="toggleFloor" color="primary">Basculer entre les étages, étage actuelle : {{currentFloor}}</v-btn>-->
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
                      @dragend="dragEnd">

                <v-circle :config="headConfig()"></v-circle>

              </v-group>
            </v-layer>

          </v-stage>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
import { VStage, VLayer, VShape,VText, VGroup, VRegularPolygon,VCircle  } from 'vue-konva';
import { pieces } from "@/data/pieces";

export default defineComponent({
  components: {
    VStage,
    VLayer,
    VShape,
    VText,
    VGroup,
    VRegularPolygon,
    VCircle,
  },
  setup() {
    const stageWidth = ref(window.innerWidth);
    const stageHeight = ref(window.innerHeight);
    const currentFloor = ref('first');
    const scaleFactor = ref(0.9);

    // let coeff = ref(1)

    window.addEventListener('resize', () => {

      scaleFactor.value = window.innerWidth / stageWidth.value

      //  stageWidth.value = stageWidth.value * (window.innerWidth/100);
      // stageHeight.value = stageHeight.value * (window.innerHeight/100);
    });



    onMounted(() => {
      stageWidth.value = window.innerWidth;
      stageHeight.value = window.innerHeight;
    });

    const dragStart = (event) =>{
      console.log(event)
      document.body.style.cursor = "grab";
    }

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

    const toggleFloor = () => {
      currentFloor.value = currentFloor.value === 'first' ? 'second' : 'first';
    };

    const tabPiece = computed(() => {
      if(currentFloor.value === 'first') return pieces.filter(piece => piece.etage === 0);
      else return pieces.filter(piece => piece.etage !== 0);
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
        fill: getSensorCaptorState(piece) === true ? 'red' :'gray',
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
        fontSize: 24 * scaleFactor.value,
        fontFamily: 'Mono',
        x: center.x,
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
      event.target.fill('gray');
      event.target.getLayer().draw();
    };


    return {
      getShapeConfig,
      stageWidth,
      stageHeight,
      toggleFloor,
      currentFloor,
      tabPiece,
      getTextConfig,
      getPolygonConfig,
      headConfig,
      dragStart,
      dragEnd,
      handleMouseOver,
      handleMouseOut
    };
  }
});
</script>
