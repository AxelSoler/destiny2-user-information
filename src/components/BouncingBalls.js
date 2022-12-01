import { motion } from 'framer-motion';

const ballStyle = {
  display: 'block',
  width: '1rem',
  height: '1rem',
  backgroundColor: 'white',
  borderRadius: '0.5rem',
};

const bounceTransition = {
  y: {
    duration: 0.4,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeOut',
  },
  backgroundColor: {
    duration: 1.2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeOut',
    repeatDelay: 1.2,
  },
};

const BouncingBalls = () => (
  <div className="flex w-16 items-end justify-center">
    <motion.span
      style={ballStyle}
      transition={bounceTransition}
      animate={{
        y: ['100%', '-100%'],
        backgroundColor: ['#ec4899', '#6666ff'],
      }}
    />
  </div>
);

export default BouncingBalls;
