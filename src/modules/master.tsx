import { useRef, useState } from 'react';
import { GiArrowCursor } from 'react-icons/gi';
import { IoMdDownload } from 'react-icons/io';
import { TbRectangle } from 'react-icons/tb';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import { ACTIONS } from './constants';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { KonvaEventObject } from 'konva/lib/Node';

// TODO: fazer o id ser o a chave do objeto

const SIZE = 500;

export const Master = () => {
  const stageRef = useRef<any>();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState('#ff0000');
  const [rectangles, setRectangles] = useState<RectConfig[]>([]);

  const strokeColor = '#000';
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
      { id, x, y, height: 20, width: 20, fillColor },
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

  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement('a');
    link.download = 'image.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e: KonvaEventObject<MouseEvent>) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  return (
    <div className="relative justify-center flex w-full h-screen overflow-hidden bg-[#09090B]">
      {/* Controls */}
      <div className="absolute top-0 z-10 py-2 bg-white flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
        <button
          className={
            action === ACTIONS.SELECT
              ? 'bg-violet-300 p-1 rounded'
              : 'p-1 hover:bg-violet-100 rounded'
          }
          onClick={() => setAction(ACTIONS.SELECT)}
        >
          <GiArrowCursor size={'2rem'} />
        </button>
        <button
          className={
            action === ACTIONS.RECTANGLE
              ? 'bg-violet-300 p-1 rounded'
              : 'p-1 hover:bg-violet-100 rounded'
          }
          onClick={() => setAction(ACTIONS.RECTANGLE)}
        >
          <TbRectangle size={'2rem'} />
        </button>

        <button>
          <input
            className="w-6 h-6"
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </button>

        <button onClick={handleExport}>
          <IoMdDownload size={'1.5rem'} />
        </button>
      </div>
      {/* Canvas */}
      <Stage
        ref={stageRef}
        // width={window.innerWidth}
        // height={window.innerHeight}
        height={SIZE}
        width={SIZE}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        // style={{ backgroundColor: 'black' }}
        className="border self-center"
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill="#ffffff"
            id="bg"
            onClick={() => {
              transformerRef.current.nodes([]);
            }}
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

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};
