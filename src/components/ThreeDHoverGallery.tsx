import React, { useRef, useEffect, useState } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export interface ThreeDHoverGalleryProps {
  images?: string[];
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  perspective?: number;
  hoverScale?: number;
  transitionDuration?: number;
  backgroundColor?: string;
  grayscaleStrength?: number;
  brightnessLevel?: number;
  activeWidth?: number;
  rotationAngle?: number;
  zDepth?: number;
  enableKeyboardNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  onImageClick?: (index: number, image: string) => void;
  onImageHover?: (index: number, image: string) => void;
  onImageFocus?: (index: number, image: string) => void;
}

const ThreeDHoverGallery: React.FC<ThreeDHoverGalleryProps> = ({
  images = [
    "https://images.pexels.com/photos/26797335/pexels-photo-26797335/free-photo-of-scenic-view-of-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/12194487/pexels-photo-12194487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32423809/pexels-photo-32423809/free-photo-of-aerial-view-of-kayaking-at-robberg-south-africa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32296519/pexels-photo-32296519/free-photo-of-rocky-coastline-of-cape-point-with-turquoise-waters.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32396739/pexels-photo-32396739/free-photo-of-serene-motorcycle-ride-through-bamboo-grove.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32304900/pexels-photo-32304900/free-photo-of-scenic-view-of-cape-town-s-twelve-apostles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32437034/pexels-photo-32437034/free-photo-of-fisherman-holding-freshly-caught-red-drum-fish.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/32469847/pexels-photo-32469847/free-photo-of-deer-drinking-from-natural-water-source-in-wilderness.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  itemWidth = 12,
  itemHeight = 20,
  gap = 1.2,
  perspective = 50,
  hoverScale = 1.15,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 45,
  rotationAngle = 35,
  zDepth = 10,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  style,
  onImageClick,
  onImageHover,
  onImageFocus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay && images.length > 0) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : (prev + 1) % images.length;
          return nextIndex;
        });
      }, autoPlayDelay);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
    if (!autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [autoPlay, autoPlayDelay, images.length]);

  const handleImageClick = (index: number, image: string) => {
    setActiveIndex(activeIndex === index ? null : index);
    onImageClick?.(index, image);
  };

  const handleImageHover = (index: number, image: string) => {
    if (!autoPlay) {
      setActiveIndex(index);
    }
    onImageHover?.(index, image);
  };

  const handleImageLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null);
    }
  };

  const handleImageFocus = (index: number, image: string) => {
    setFocusedIndex(index);
    onImageFocus?.(index, image);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!enableKeyboardNavigation) return;
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleImageClick(index, images[index]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : images.length - 1;
        (containerRef.current?.children[prevIndex] as HTMLElement)?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < images.length - 1 ? index + 1 : 0;
        (containerRef.current?.children[nextIndex] as HTMLElement)?.focus();
        break;
    }
  };

  const getItemStyle = (index: number): React.CSSProperties => {
    const isActive = activeIndex === index;
    const isFocused = focusedIndex === index;
    const baseWidthPx = 10;
    return {
      width: isActive ? `${activeWidth}vw` : `calc(${itemWidth}vw + ${baseWidthPx}px)` ,
      height: `${itemHeight}vw`,
      margin: `0 ${gap}vw`,
      transform: `
        perspective(${perspective}vw)
        rotateY(${isActive ? 0 : (index - (activeIndex ?? 0)) * rotationAngle}deg)
        translateZ(${isActive ? zDepth : 0}px)
        scale(${isActive ? hoverScale : 1})
      `,
      transition: `all ${transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1)` ,
      filter: `grayscale(${isActive ? 0 : grayscaleStrength}) brightness(${isActive ? 1 : brightnessLevel})`,
      zIndex: isActive ? 2 : 1,
      outline: isFocused ? "2px solid #007bff" : "none",
      background: backgroundColor || "#222",
      borderRadius: "1.5vw",
      boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.10)",
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn("threed-hover-gallery flex justify-center items-center w-full py-12", className)}
      style={{ gap: `${gap}vw`, ...style }}
      tabIndex={-1}
    >
      {images.map((img, idx) => (
        <div
          key={img + idx}
          tabIndex={0}
          className={cn("gallery-item", activeIndex === idx && "active", focusedIndex === idx && "focused")}
          style={getItemStyle(idx)}
          onClick={() => handleImageClick(idx, img)}
          onMouseEnter={() => handleImageHover(idx, img)}
          onMouseLeave={handleImageLeave}
          onFocus={() => handleImageFocus(idx, img)}
          onBlur={() => setFocusedIndex(null)}
          onKeyDown={e => handleKeyDown(e, idx)}
          aria-label={`Gallery image ${idx + 1}`}
        >
          <img
            src={img}
            alt={`Gallery ${idx + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1.5vw",
              pointerEvents: "none",
              userSelect: "none",
              transition: `filter ${transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1)`
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default ThreeDHoverGallery;