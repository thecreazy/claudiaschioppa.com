export default ({ status, color }) => (
  <div
    className={`transition ${status}`}
    style={{
      backgroundColor: color
    }}
  >
    <style jsx>
      {`
        .transition {
          width: 1500px;
          height: 1500px;
          position: absolute;
          top: 0%;
          left: 15%;
          border-radius: 50%;
          transform-origin: center center;
          will-change: transform;
          transform: scale(0.1) translateZ(0) translateY(-50%) translateX(50%);
          opacity: 0;
        }
        .transition.open {
          transform: scale(1.5) translateZ(0) translateY(-10%) translateX(-10%);
          transition: transform 0.3s, width 0.3s, height 0.3s linear;
          z-index: 99;
          opacity: 1;
        }
        .transition.close {
          height: 0;
        }
      `}
    </style>
  </div>
);
