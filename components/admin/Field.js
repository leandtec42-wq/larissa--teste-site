export function Field({ label, hint, children }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-[.85rem] font-medium text-cocoa-soft">{label}</label>
      {children}
      {hint ? <p className="text-[.78rem] text-cocoa-soft/80">{hint}</p> : null}
    </div>
  );
}

const inputClass = "rounded-xl border border-cream-deep bg-cream px-4 py-3 outline-none focus:border-rose-deep";

export function TextInput(props) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props) {
  return <textarea rows={4} {...props} className={inputClass} />;
}

export function CheckboxField({ name, label, defaultChecked }) {
  return (
    <label className="flex items-center gap-2.5 text-[.92rem] font-medium">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-5 w-5 accent-rose-deep" />
      {label}
    </label>
  );
}

export function SubmitButton({ children, secondary = false }) {
  return (
    <button
      type="submit"
      className={
        secondary
          ? "rounded-full border border-cocoa/20 px-6 py-3.5 font-semibold text-cocoa transition-colors hover:bg-cream"
          : "rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-6 py-3.5 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
      }
    >
      {children}
    </button>
  );
}
