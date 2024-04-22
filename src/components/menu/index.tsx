import { ACTIONS } from '@/modules/constants';
import {
  Undo,
  Redo,
  Move,
  ImageUp,
  MousePointer2,
  BoxSelect,
  Download,
} from 'lucide-react';
import { MenuButton } from './menu-button';
import { ValueOf } from 'next/dist/shared/lib/constants';

type Props = {
  action: ValueOf<typeof ACTIONS>;
  setAction: (action: ValueOf<typeof ACTIONS>) => void;
  stageRef: any;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
};

export const Menu = ({
  action,
  setAction,
  stageRef,
  strokeColor,
  setStrokeColor,
}: Props) => {
  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement('a');
    link.download = 'image.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="absolute top-0 z-10 bg-white flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
      <MenuButton
        isSelected={action === ACTIONS.SELECT}
        onClick={() => setAction(ACTIONS.SELECT)}
        icon={MousePointer2}
      />
      <MenuButton
        isSelected={action === ACTIONS.RECTANGLE}
        onClick={() => setAction(ACTIONS.RECTANGLE)}
        icon={BoxSelect}
      />
      <MenuButton>
        <input
          className="w-6 h-6"
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
        />
      </MenuButton>

      <MenuButton onClick={handleExport} icon={Download} />

      <div className="flex">
        <Undo />
        <Redo />
        {/* <MousePointer2 />
          <BoxSelect /> */}
        <Move />
        <ImageUp />
        {/* <Download /> */}
      </div>
    </div>
  );
};
