<template>
        <v-btn @click="toggleFloor" color="primary">Basculer entre les étages, étage actuelle : {{currentFloor}}</v-btn>
          <v-stage :config="{ width: stageWidth, height: stageHeight }">
           <v-layer>
           <v-group  v-for="piece in tabPiece" :key="piece.id">
                <v-shape
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
    // let coeff = ref(1)

    window.addEventListener('resize', () => {
      // coeff.value = 100 * window.innerWidth / stageWidth


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
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        console.log(xi, ' ', xj)
        console.log(x, ' ', y)


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

      if (droppedOnPiece) {
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


    const getShapeConfig = (piece) => {
      return {
        sceneFunc: (context, shape) => {
          context.beginPath();
          piece.position.points.forEach((point, index) => {
            if (index === 0) {
              context.moveTo(point.x * 0.900, point.y* 0.900);
            } else {
              context.lineTo(point.x * 0.900, point.y * 0.900);
            }
          });
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: 'gray',
        stroke: 'black',
        strokeWidth: 2
      };
    };

    const getPolygonConfig = () => {
      return {
        x: 300,
        y: 300,
        sides: 6,
        radius: 15,
        fill: 'purple',
        stroke: 'black',
        strokeWidth: 2
      };
    };

    const getCenterPoint = (points) => {
      let sumX = 0;
      let sumY = 0;
      points.forEach(point => {
        sumX += point.x ;
        sumY += point.y;
      });
      return { x: sumX / points.length  , y: sumY / points.length };
    };

    const getTextConfig = (piece) => {
      const center = getCenterPoint(piece.position.points);
      return {
        text: piece.nom,
        fontSize: 18,
        fontFamily: 'Mono',
        x: center.x * 0.900,
        y: center.y * 0.900 ,
        align: 'center',
        verticalAlign: 'middle',
        fill: 'black'
      };
    };

    const headConfig = () => {
      return{
        x: 1000,
        y: 800,
        radius: 8,
        fill: '#ED7F10'
      }

    }


/*    const handleMouseOver = (event) => {
      //event.target.fill('red');
      //event.target.getLayer().draw();
    };

    const handleMouseOut = (event) => {
      //event.target.fill('gray');
      //event.target.getLayer().draw();
    };*/


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
    };
  }
});
</script>
