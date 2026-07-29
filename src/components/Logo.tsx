import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "w-8 h-8",
  color = "#800020"
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Outer Chevron */}
      <path
        d="M 4,46 L 50,4 L 96,46 L 86,46 L 50,13 L 14,46 Z"
        fill={color}
      />
      {/* Top Middle Chevron */}
      <path
        d="M 18,46 L 50,18 L 82,46 L 72,46 L 50,27 L 28,46 Z"
        fill={color}
      />
      {/* Top Inner Chevron */}
      <path
        d="M 32,46 L 50,32 L 68,46 L 58,46 L 50,40 L 42,46 Z"
        fill={color}
      />

      {/* Bottom Inner Chevron */}
      <path
        d="M 32,54 L 50,68 L 68,54 L 58,54 L 50,60 L 42,54 Z"
        fill={color}
      />
      {/* Bottom Middle Chevron */}
      <path
        d="M 18,54 L 50,82 L 82,54 L 72,54 L 50,73 L 28,54 Z"
        fill={color}
      />
      {/* Bottom Outer Chevron */}
      <path
        d="M 4,54 L 50,96 L 96,54 L 86,54 L 50,87 L 14,54 Z"
        fill={color}
      />
    </svg>
  );
};

export default Logo;
