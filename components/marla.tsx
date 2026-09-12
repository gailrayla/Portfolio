/*
 * Marla, drawn from a photo of Gail's labrador: cream coat, darker gold on
 * the back and ears, white muzzle and blaze, and the round barrel that makes
 * her recognisably herself.
 *
 * Flat vector rather than anything painterly. The site's other illustrations
 * are line-and-fill SVG, and a sprite that has to animate needs geometry it
 * can rotate, not texture.
 *
 * Art units are 225 x 165 with the ground at y = 148.
 */

const FUR = "#e8d4ae";
const FUR_DARK = "#d6bb8d";
const CREAM = "#faf3e6";
const INK = "#2c2320";

export const MARLA_ART_WIDTH = 225;
export const MARLA_ART_HEIGHT = 165;

type LegProps = {
  /** Degrees, positive swings the paw forward. */
  angle: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

function Leg({ angle, x, y, width, height, fill }: LegProps) {
  const radius = width / 2;
  return (
    <path
      d={`M${x} ${y} h${width} v${height} a${radius} ${radius} 0 0 1 ${-width} 0 Z`}
      fill={fill}
      transform={`rotate(${angle} ${x + radius} ${y})`}
    />
  );
}

type MarlaProps = {
  /** Run cycle position in radians. Ignored while airborne. */
  phase: number;
  airborne?: boolean;
  /** Degrees of tilt after bumping something. */
  tilt?: number;
  /** Drawn without the pack when false. */
  pack?: boolean;
};

export default function Marla({ phase, airborne = false, tilt = 0, pack = true }: MarlaProps) {
  /* Legs tuck under while jumping; otherwise front and back pairs alternate. */
  const swing = airborne ? 0 : Math.sin(phase) * 22;
  const counterSwing = airborne ? 0 : Math.sin(phase + Math.PI) * 22;
  const tuckBack = airborne ? -28 : 0;
  const tuckFront = airborne ? 26 : 0;

  return (
    <g transform={`rotate(${tilt} 110 100)`}>
      {/* tail */}
      <path d="M44 80 C 20 78, 8 60, 13 44 C 24 52, 34 62, 52 70 Z" fill={FUR_DARK} />

      {/* far legs sit behind the body */}
      <Leg angle={counterSwing + tuckBack} x={60} y={104} width={16} height={38} fill={FUR_DARK} />
      <Leg angle={swing + tuckFront} x={128} y={104} width={16} height={38} fill={FUR_DARK} />

      <ellipse cx="99" cy="88" rx="60" ry="45" fill={FUR} />
      {/* pale belly */}
      <path
        d="M50 104 C 66 128, 132 130, 150 100 C 154 120, 130 133, 99 133 C 70 133, 48 122, 50 104 Z"
        fill={CREAM}
      />

      {pack ? (
        <>
          <path
            d="M126 62 C 141 72, 147 88, 143 104"
            stroke="var(--color-accent-deep)"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M74 54 C 74 45, 80 40, 90 40 h22 c10 0 16 5 16 14 v20 c0 9 -6 14 -16 14 h-22 c-10 0 -16 -5 -16 -14 Z"
            fill="var(--color-accent)"
          />
          <path
            d="M74 54 C 74 45, 80 40, 90 40 h22 c10 0 16 5 16 14 v3 h-54 Z"
            fill="var(--color-accent-deep)"
          />
          <rect x="92" y="69" width="18" height="9" rx="4.5" fill="var(--color-accent-deep)" />
        </>
      ) : null}

      {/* near legs sit in front of the body */}
      <Leg angle={swing + tuckBack} x={72} y={106} width={17} height={40} fill={FUR} />
      <Leg angle={counterSwing + tuckFront} x={140} y={106} width={17} height={40} fill={FUR} />

      <circle cx="160" cy="56" r="31" fill={FUR} />
      {/* muzzle */}
      <path
        d="M173 58 C 192 53, 209 58, 211 67 C 213 78, 198 84, 179 81 C 170 79, 168 67, 173 58 Z"
        fill={CREAM}
      />
      {/* blaze */}
      <path d="M159 34 C 167 36, 171 45, 168 53 C 163 50, 159 43, 159 34 Z" fill={CREAM} />
      <ellipse cx="207" cy="65" rx="7.5" ry="6" fill={INK} />
      <path
        d="M200 76 C 194 81, 186 81, 182 77"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="169" cy="46" r="4.8" fill={INK} />
      <circle cx="170.6" cy="44.4" r="1.5" fill="#ffffff" />
      {/* floppy ear, drawn last so it sits over the head */}
      <path
        d="M147 30 C 133 33, 127 49, 132 68 C 136 81, 149 81, 151 68 C 154 52, 154 39, 147 30 Z"
        fill={FUR_DARK}
      />
    </g>
  );
}
