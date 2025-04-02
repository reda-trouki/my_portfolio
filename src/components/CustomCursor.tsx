import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLCanvasElement>(null);
  const frameRequest = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const prevPosition = useRef({ x: 0, y: 0 });
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<Array<{ x: number; y: number; alpha: number }>>([]);

  useEffect(() => {
    if (pathRef.current) {
      pathRef.current.width = window.innerWidth;
      pathRef.current.height = window.innerHeight;
      ctx.current = pathRef.current.getContext('2d');
    }

    const handleResize = () => {
      if (pathRef.current) {
        pathRef.current.width = window.innerWidth;
        pathRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawPath = () => {
    if (!ctx.current) return;

    ctx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Add new point
    points.current.unshift({
      x: mousePosition.current.x,
      y: mousePosition.current.y,
      alpha: 1
    });

    // Limit points array
    if (points.current.length > 50) {
      points.current = points.current.slice(0, 50);
    }

    // Draw curved line
    ctx.current.beginPath();
    ctx.current.moveTo(points.current[0].x, points.current[0].y);

    for (let i = 1; i < points.current.length - 1; i++) {
      const xc = (points.current[i].x + points.current[i + 1].x) / 2;
      const yc = (points.current[i].y + points.current[i + 1].y) / 2;
      ctx.current.quadraticCurveTo(points.current[i].x, points.current[i].y, xc, yc);
      points.current[i].alpha *= 0.95; // Fade out
    }

    // Draw gradient line
    const gradient = ctx.current.createLinearGradient(
      points.current[0].x,
      points.current[0].y,
      points.current[points.current.length - 1].x,
      points.current[points.current.length - 1].y
    );

    gradient.addColorStop(0, 'rgba(230, 0, 115, 0.8)');
    gradient.addColorStop(0.5, 'rgba(80, 230, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(80, 230, 255, 0)');

    ctx.current.strokeStyle = gradient;
    ctx.current.lineWidth = 2;
    ctx.current.lineCap = 'round';
    ctx.current.stroke();

    requestAnimationFrame(drawPath);
  };

  useEffect(() => {
    requestAnimationFrame(drawPath);
  }, []);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    mousePosition.current = { x: clientX, y: clientY };
    
    if (!isVisible) setIsVisible(true);

    // Direct position update for inner cursor
    if (cursorInnerRef.current) {
      gsap.set(cursorInnerRef.current, {
        x: clientX,
        y: clientY,
      });
    }

    // Smooth follow for outer glow
    gsap.to(cursorOuterRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.15,
      ease: "power3.out",
    });

    // Create particles only when moving fast enough
    const speed = Math.hypot(clientX - prevPosition.current.x, clientY - prevPosition.current.y);
    if (speed > 5) {
      createTrailParticle(clientX, clientY, speed);
    }

    prevPosition.current = { x: clientX, y: clientY };
  };

  const createTrailParticle = (x: number, y: number, speed: number) => {
    const particle = document.createElement("div");
    particle.className = "trail-particle";
    trailRef.current?.appendChild(particle);

    const scale = Math.min(1, speed / 50);
    
    gsap.set(particle, {
      x: x,
      y: y,
      scale: scale,
      opacity: 1,
    });

    gsap.to(particle, {
      duration: 0.4,
      x: x - (Math.random() * 30 - 15),
      y: y - (Math.random() * 30 - 15),
      scale: 0,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  };

  const onMouseDown = () => {
    gsap.to(cursorInnerRef.current, {
      scale: 1.5,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(cursorOuterRef.current, {
      scale: 2,
      opacity: 0.8,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onMouseUp = () => {
    gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onMouseEnter = () => setIsVisible(true);
  const onMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    document.body.style.cursor = "none";
    document.addEventListener("mousemove", onMouseMove, { passive: true }); // passive for performance
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    
    // Start animation loop
    frameRequest.current = requestAnimationFrame(drawPath);

    // Add hover effects for interactive elements
    const handleLinkHoverEnter = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 2,
        backgroundColor: "rgba(80, 230, 255, 0.15)",
        border: "none",
        duration: 0.2,
      });
      gsap.to(cursorInnerRef.current, {
        scale: 0.5,
        backgroundColor: "rgba(80, 230, 255, 1)",
        duration: 0.2,
      });
    };

    const handleLinkHoverLeave = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        border: "1.5px solid rgba(255, 255, 255, 0.5)",
        duration: 0.2,
      });
      gsap.to(cursorInnerRef.current, {
        scale: 1,
        backgroundColor: "white",
        duration: 0.2,
      });
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, input[type="button"], input[type="submit"], input[type="reset"], .clickable, .project-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverEnter);
      el.addEventListener("mouseleave", handleLinkHoverLeave);
      el.style.cursor = "none";
    });

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverEnter);
        el.removeEventListener("mouseleave", handleLinkHoverLeave);
        el.style.cursor = "auto";
      });
      
      // Cancel animation frame
      if (frameRequest.current !== null) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, []);

  return (
    <div
      className={`hidden md:block cursor-container z-[9999] ${isVisible ? "visible" : ""}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <canvas
        ref={pathRef}
        className="cursor-path"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9996,
        }}
      />
      <div ref={trailRef} className="cursor-trail" />
      <div
        ref={cursorOuterRef}
        className="cursor-outer"
        style={{
          position: "fixed",
          zIndex: 9998,
          pointerEvents: "none",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.5)",
          transform: "translate(0, 0)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorInnerRef}
        className="cursor-inner"
        style={{
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          transform: "translate(0, 0)",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
};

export default CustomCursor;
