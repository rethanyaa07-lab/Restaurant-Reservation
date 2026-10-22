
function Input({ label, ...props }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-input" {...props} />
    </div>
  );
}

export default Input;
