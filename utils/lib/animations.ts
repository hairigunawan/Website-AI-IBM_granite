export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const cardHover = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
    },
  },
};

export const timelineItem = (align: 'left' | 'right') => ({
  initial: { 
    opacity: 0, 
    x: align === 'left' ? -50 : 50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7 
    } 
  },
});