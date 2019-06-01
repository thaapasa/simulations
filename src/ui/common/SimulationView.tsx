import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';

export function stylizeSimulationView<T>(comp: React.ComponentType<T>) {
  return styled(comp)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 2px solid ${Colors.black};
    border-radius: 8px;
    background-color: ${Colors.darkBlue};
    overflow: hidden;
    height: 100%;
  `;
}
