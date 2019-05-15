import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Size } from '../game/common/Size';
import { Omit } from '../util/Types';

export function SizeAware<T extends { size: Size }>(
  WrappedComponent: React.ComponentType<T>
) {
  @observer
  class Wrapper extends React.Component<
    Omit<T, 'size'> & { className?: string }
  > {
    private ref = React.createRef<HTMLDivElement>();

    @observable
    private size: Size | undefined;

    componentDidMount() {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
      setImmediate(this.updateSize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateSize);
    }

    render() {
      return (
        <div ref={this.ref} className={this.props.className}>
          {this.size ? (
            <WrappedComponent {...this.props as any} size={this.size} />
          ) : null}
        </div>
      );
    }

    @action
    private updateSize = () => {
      this.size = this.ref.current
        ? {
            width: this.ref.current.clientWidth,
            height: this.ref.current.clientHeight,
          }
        : undefined;
    };
  }

  return Wrapper;
}
