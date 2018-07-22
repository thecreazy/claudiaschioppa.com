export default ({ status, color }) => (
  <div
    className={`transition ${status}`}
    style={{
      backgroundColor: color
    }}
  >
  </div>
);
