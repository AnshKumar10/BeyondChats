
export const bubbleVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.3,
      type: "spring",
      stiffness: 100
    } 
  },
  hover: {
    scale: 1.01,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};
