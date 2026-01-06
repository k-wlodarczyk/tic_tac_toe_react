export default function CurrentTurnIcon({ d, fill }) {
  return (
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.4)">
        <path d={d} fill={fill} fill-rule="evenodd" />
      </g>
    </svg>
  );
}
