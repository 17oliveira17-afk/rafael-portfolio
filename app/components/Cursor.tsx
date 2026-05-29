"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;
    const follower = document.querySelector(".cursor-follower") as HTMLElement;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        follower.style.left = e.clientX + "px";
        follower.style.top = e.clientY + "px";
      }, 80);
    };

    const handleHoverIn = () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      follower.style.opacity = "0";
    };
    const handleHoverOut = () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      follower.style.opacity = "1";
    };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div className="cursor" />
      <div className="cursor-follower" />
    </>
  );
}
