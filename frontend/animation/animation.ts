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

  export const modal = {
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

export  const animErrors = {
    hidden: { opacity: 0, x: 20 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
        duration: 0.5,
        ease: 'easeInOut'
        }
    }
}