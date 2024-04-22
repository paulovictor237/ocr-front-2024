import { useRef, useState } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import { ACTIONS } from './constants';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { KonvaEventObject } from 'konva/lib/Node';
import { Menu } from '@/components/menu';
import colors from 'tailwindcss/colors';

// TODO: fazer o id ser o a chave do objeto

const SIZE = 500;

export const Master = () => {
  const stageRef = useRef<any>();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [rectangles, setRectangles] = useState<RectConfig[]>([]);
  const [strokeColor, setStrokeColor] = useState<string>(colors.green[500]);

  const isPaining = useRef<any>();
  const currentShapeId = useRef<any>();
  const transformerRef = useRef<any>();

  const isDraggable = action === ACTIONS.SELECT;

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    setRectangles((rectangles) => [
      ...rectangles,
      // { id, x, y, height: 20, width: 20, fillColor },
      { id, x, y, height: 20, width: 20 },
    ]);
  }
  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    setRectangles((rectangles) =>
      rectangles.map((rec) => {
        if (rec.id !== currentShapeId.current) return rec;
        return { ...rec, width: x - (rec.x ?? 0), height: y - (rec?.y ?? 0) };
      })
    );
  }

  function onPointerUp() {
    isPaining.current = false;
  }

  function onClick(e: KonvaEventObject<MouseEvent>) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  return (
    <div className="relative justify-center flex w-screen h-screen overflow-hidden bg-[#09090B]">
      <Menu
        action={action}
        setAction={setAction}
        stageRef={stageRef}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
      />
      <Stage
        ref={stageRef}
        width={SIZE} // {window.innerWidth}
        height={SIZE} //{window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="border self-center"
      >
        <Layer>
          <Rect
            id="bg"
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            onClick={() => transformerRef.current.nodes([])}
          />

          {rectangles.map((rectangle) => (
            <Rect
              key={rectangle.id}
              x={rectangle.x}
              y={rectangle.y}
              stroke={strokeColor}
              strokeWidth={2}
              fill={rectangle.fillColor}
              height={rectangle.height}
              width={rectangle.width}
              draggable={isDraggable}
              onClick={onClick}
            />
          ))}

          <Transformer
            ref={transformerRef}
            flipEnabled={false}
            rotateEnabled={false}
          />
        </Layer>
      </Stage>
    </div>
  );
};
