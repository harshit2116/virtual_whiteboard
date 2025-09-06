"use client";

import { useState } from "react";
import { 
  Circle, 
  MousePointer2, 
  Pencil, 
  Redo2, 
  Square, 
  StickyNote, 
  Type,
  Undo2,
  Menu,
  X,
  Home
} from "lucide-react";

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import Link from "next/link";

interface MobileToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const MobileToolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: MobileToolbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tools = [
    {
      label: "Select",
      icon: MousePointer2,
      onClick: () => setCanvasState({ mode: CanvasMode.None }),
      isActive: [
        CanvasMode.None,
        CanvasMode.Translating,
        CanvasMode.SelectionNet,
        CanvasMode.Pressing,
        CanvasMode.Resizing
      ].includes(canvasState.mode)
    },
    {
      label: "Text",
      icon: Type,
      onClick: () => setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Text,
      }),
      isActive: canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text
    },
    {
      label: "Note",
      icon: StickyNote,
      onClick: () => setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Note,
      }),
      isActive: canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note
    },
    {
      label: "Rectangle",
      icon: Square,
      onClick: () => setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Rectangle,
      }),
      isActive: canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle
    },
    {
      label: "Ellipse",
      icon: Circle,
      onClick: () => setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.Ellipse,
      }),
      isActive: canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse
    },
    {
      label: "Pen",
      icon: Pencil,
      onClick: () => setCanvasState({
        mode: CanvasMode.Pencil,
      }),
      isActive: canvasState.mode === CanvasMode.Pencil
    }
  ];  return (
    <>
      {/* Mobile Toolbar - Always show on small screens */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 block md:hidden">
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-xl border border-slate-600/30">
          {/* Home button */}
          <Link href="/">
            <ToolButton
              label="Home"
              icon={Home}
              onClick={() => {}}
              className="w-10 h-10"
            />
          </Link>
          
          {/* Undo/Redo buttons always visible */}
          <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isDisabled={!canUndo}
            className="w-10 h-10"
          />
          
          {/* Expandable tools */}
          {isExpanded && (
            <>
              {tools.map((tool) => (
                <ToolButton
                  key={tool.label}
                  label={tool.label}
                  icon={tool.icon}
                  onClick={() => {
                    tool.onClick();
                    setIsExpanded(false);
                  }}
                  isActive={tool.isActive}
                  className="w-10 h-10"
                />
              ))}
            </>
          )}
          
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/80 hover:bg-slate-600/80 transition-colors border border-slate-500/30"
            aria-label={isExpanded ? "Close tools" : "Open tools"}
          >
            {isExpanded ? (
              <X size={18} className="text-white" />
            ) : (
              <Menu size={18} className="text-white" />
            )}
          </button>

          <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isDisabled={!canRedo}
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40 block md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};
