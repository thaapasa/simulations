import { observer } from 'mobx-react';
import { Application } from 'pixi.js';
import React, { useEffect, useRef } from 'react';
import { Size } from '../../game/common/Size';
import { SizeAware } from '../SizeAware';
import { Model } from './Model';
import { ModelMover } from './ModelMover';
import { ModelRenderer } from './ModelRenderer';
import { stylizeSimulationView } from './SimulationView';

const PlainPixiSimulationView = observer(
  ({
    size,
    model,
    createRenderer,
    useDragPoint,
    dragEnabled,
  }: {
    size: Size;
    model: Model;
    createRenderer: (
      containerRef: React.RefObject<HTMLDivElement | null>
    ) => ModelRenderer<Application>;
    useDragPoint: boolean;
    dragEnabled?: boolean;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<ModelRenderer<Application> | null>(null);

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
      <ModelMover model={model} useDragPoint={useDragPoint} dragEnabled={dragEnabled}>
        <div ref={containerRef} />
      </ModelMover>
    );
  }
);

const SizedPixiSimulationView = SizeAware(PlainPixiSimulationView);
const PixiSimulationView = stylizeSimulationView(SizedPixiSimulationView);

export default PixiSimulationView;
