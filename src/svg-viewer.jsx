import React, { useEffect, useState, useRef } from 'react';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from 'react-svg-pan-zoom';
import { precisionRound } from 'Utils/numbers';

const SvgViewer = ({
  height = 500,
  width = 500,
  bracketWidth,
  bracketHeight,
  children,
  startAt = [0, 0],
  scaleFactor = 1.1,
  customToolbar = null,
  ...rest
}) => {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [scaleFactorMin, setScaleFactorMin] = useState(1);
  const scaleFactorMax = 1.25;

  useEffect(() => {
    Viewer.current.pan(...startAt);
  }, []);

  const lockToBoundaries = v => {
    setValue(v); // Allow free panning and zooming by directly setting the value
  };

  return (
    <ReactSVGPanZoom
      detectAutoPan={false}
      ref={Viewer}
      scaleFactor={scaleFactor}
      scaleFactorMax={scaleFactorMax}
      scaleFactorMin={scaleFactorMin}
      width={Math.min(width, bracketWidth)}
      height={Math.min(height, bracketHeight)}
      tool={tool}
      onChangeTool={setTool}
      value={value}
      onChangeValue={setValue}
      onZoom={lockToBoundaries}
      onPan={lockToBoundaries}
      miniatureProps={{ position: 'right' }}
      customToolbar={customToolbar ?? (() => <></>)}
      {...rest}
    >
      {children}
    </ReactSVGPanZoom>
  );
};
export default SvgViewer;
