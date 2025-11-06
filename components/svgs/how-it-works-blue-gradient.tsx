export const HowItWorksBlueGradient = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="691"
      viewBox="0 0 1440 691"
      fill="none"
      className={className}
      style={{
        filter: "blur(517.56201171875px)",
        willChange: "filter",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <g filter="url(#filter0_f_210_97007)">
        <circle cx="469.564" cy="1004.56" r="487" fill="#2B91CC" />
      </g>
      <defs>
        <filter
          id="filter0_f_210_97007"
          x="-534.998"
          y="0"
          width="2009.12"
          height="2009.12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="258.781"
            result="effect1_foregroundBlur_210_97007"
          />
        </filter>
      </defs>
    </svg>
  );
};
