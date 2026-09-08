"use client";

import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";

export function MiniShape3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas, true, { antialias: true });
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 4,
      Math.PI / 2.5,
      4,
      Vector3.Zero(),
      scene,
    );
    scene.activeCamera = camera;

    const shape = MeshBuilder.CreatePolyhedron(
      "shape",
      { type: 1, size: 1.2 },
      scene,
    );

    const material = new StandardMaterial("mat", scene);
    material.emissiveColor = new Color3(0.35, 0.28, 0.85);
    material.alpha = 0.85;
    material.wireframe = true;
    shape.material = material;

    let angle = 0;
    const observer = scene.onBeforeRenderObservable.add(() => {
      angle += 0.008;
      shape.rotation.y = angle;
      shape.rotation.x = Math.sin(angle * 0.7) * 0.35;
    });

    engine.runRenderLoop(() => scene.render());

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      scene.onBeforeRenderObservable.remove(observer);
      shape.dispose();
      material.dispose();
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
