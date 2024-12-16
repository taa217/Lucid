import React from 'react';

const GlowingQSVG = ({width,height}) => {
  return (
    <div style={{ position: 'relative', width: width, height: height, alignItems: 'center' }}>
      {/* SVG Container */}
      <svg
        viewBox="0 0 80 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '90%', height: '100%' }}
      >
        {/* Gradient Definition */}
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4fcaff" />
            <stop offset="50%" stopColor="#7b65ff" />
            <stop offset="100%" stopColor="#f57cff" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* "Q" Shape */}
        <text
        // fontFamily='sans-serif'
        fontFamily="Arial, sans-serif"
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="80"
          fontWeight="bold"
          fill="url(#gradient1)"
          filter="url(#glow)"
        >
           Q
        </text>
      </svg>

      {/* Glowing Background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
        //   background: 'radial-gradient(circle, rgba(79,202,255,0.3), rgba(123,101,255,0.2), rgba(245,124,255,0.1))',
          filter: 'blur(80px)',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default GlowingQSVG;
