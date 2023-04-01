export const animStat = {
    hidden: {
       opacity: 0,
       x: -100 
    },
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
      x: 0
    }),
  }
export const animStat2 = {
    hidden: {
       opacity: 0,
       y: -100 
    },
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
      y: 0
    }),
  }
export const animStat3 = {
    hidden: {
       opacity: 0,
       x: 100 
    },
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
      x: 0
    }),
  }
export const animH1 = {
    hidden: {
       opacity: 0,
       transform: "scale(0)" 
    },
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
      transform: "scale(1)" 
    }),
  }