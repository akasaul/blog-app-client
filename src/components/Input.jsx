function Input({onChange, styles, name, value, type, label, placeholder, onBlur, err}) {
  return (
    <div className="flex flex-col gap-1">
        <label className="text-gray-500">{label}</label>
        <input type={type} className={styles} value={value} style={{
          border: err && "1px solid red"
        }} onBlur={onBlur} placeholder={placeholder} name={name} onChange={onChange} />
        {
          err &&
         <p className="text-red-800 text-sm">{err}</p>
        }
    </div>
  )
}

export default Input