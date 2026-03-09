import { observable, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Size } from '../game/common/Size';

export function SizeAware<T extends { size: Size }>(
  WrappedComponent: React.ComponentType<T>
) {
  const Wrapper = observer(
    (props: Omit<T, 'size'> & { className?: string }) => {
      const ref = useRef<HTMLDivElement>(null);
      const [size, setSize] = useState<Size | undefined>(undefined);

      const updateSize = useCallback(() => {
        if (ref.current) {
          setSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
          });
        }
      }, []);

      useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        setTimeout(updateSize, 0);
        return () => window.removeEventListener('resize', updateSize);
      }, [updateSize]);

      return (
        <div ref={ref} className={props.className}>
          {size ? (
            <WrappedComponent {...(props as any)} size={size} />
          ) : null}
        </div>
      );
    }
  );

  return Wrapper;
}
