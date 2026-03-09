import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Size } from '../../game/common/Size';
import { SizeAware } from '../SizeAware';
import { Model } from './Model';
import { ModelMover } from './ModelMover';
import { ModelRenderer } from './ModelRenderer';
import { stylizeSimulationView } from './SimulationView';

const PlainCanvasSimulationView = observer(
  ({
    size,
    model,
    createRenderer,
    useDragPoint,
  }: {
    size: Size;
    model: Model;
    createRenderer: (
      containerRef: React.RefObject<HTMLCanvasElement | null>
    ) => ModelRenderer<void>;
    useDragPoint: boolean;
  }) => {
    const containerRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<ModelRenderer<void> | null>(null);

    if (!rendererRef.current) {
      rendererRef.current = createRenderer(containerRef);
    }
    const renderer = rendererRef.current;

    useEffect(() => {
      model.renderCallback = renderer.render;
      renderer.updateSize(size);
      renderer.render();
      return () => renderer.destroy?.();
    }, []);

    useEffect(() => {
      renderer.updateSize(size);
    }, [size.width, size.height]);

    return (
      <ModelMover model={model} useDragPoint={useDragPoint}>
        <canvas ref={containerRef} width={size.width} height={size.height} />
      </ModelMover>
    );
  }
);

const SizedCanvasSimulationView = SizeAware(PlainCanvasSimulationView);
const CanvasSimulationView = stylizeSimulationView(SizedCanvasSimulationView);

export default CanvasSimulationView;
