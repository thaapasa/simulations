export function removeChildNodes(node: HTMLDivElement) {
  while (true) {
    const last = node.lastChild;
    if (!last) {
      return;
    }
    node.removeChild(last);
  }
}
