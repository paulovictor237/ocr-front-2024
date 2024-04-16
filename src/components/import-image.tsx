'use client';

import { useCallback, useRef } from 'react';
import { Stage } from 'react-konva';
type Props = {};

const downloadURI = (uri: string | undefined, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri || '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const ImportImage = (props: Props) => {
  const stageRef = useRef<any>(null);

  const onExportClick = useCallback(() => {
    const dataURL = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, 'image.png');
  }, []);

  return (
    <Stage
      height={SIZE}
      width={SIZE}
      ref={stageRef}
      onMouseUp={onStageMouseUp}
      onMouseDown={onStageMouseDown}
      onMouseMove={onStageMouseMove}
    >
      <button
        // leftIcon={<Download />}
        // colorScheme="whatsapp"
        // variant="solid"
        onClick={onExportClick}
        // size="sm"
      >
        Export
      </button>
    </Stage>
  );
};
