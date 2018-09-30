export default ({ status, color, inner }) => (
  <div
    className={`transition ${status} ${inner ? '--inner': ''}`}
    style={{
      backgroundColor: color
    }}
  >
  </div>
);
