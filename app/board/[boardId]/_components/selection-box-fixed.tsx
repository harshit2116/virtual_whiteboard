"use client";

import { memo } from "react";

import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({
  onResizeHandlePointerDown,
}: SelectionBoxProps) => {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const isShowingHandles = useStorage((root) => 
    soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
  );

  const bounds = useSelectionBounds();

  if (!bounds) {
    return null;
  }

  // Type assertion to work around TypeScript inference issues
  const typedBounds = bounds as any;

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${typedBounds.x}px, ${typedBounds.y}px)`,
        }}
        x={0}
        y={0}
        width={typedBounds.width}
        height={typedBounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2}px,
                  ${typedBounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x + typedBounds.width / 2 - HANDLE_WIDTH / 2}px, 
                  ${typedBounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2 + typedBounds.width}px,
                  ${typedBounds.y - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2 + typedBounds.width}px, 
                  ${typedBounds.y + typedBounds.height / 2 - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2 + typedBounds.width}px, 
                  ${typedBounds.y - HANDLE_WIDTH / 2 + typedBounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x + typedBounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${typedBounds.y - HANDLE_WIDTH / 2 + typedBounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2}px,
                  ${typedBounds.y - HANDLE_WIDTH / 2 + typedBounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, typedBounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${typedBounds.x - HANDLE_WIDTH / 2}px,
                  ${typedBounds.y - HANDLE_WIDTH / 2 + typedBounds.height / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, typedBounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";
