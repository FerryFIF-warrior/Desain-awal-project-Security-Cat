import { type FormEvent, useState } from "react";

// Asli dari Modul 5: src/components/TaskForm.jsx
interface TaskFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => boolean;
}

export default function TaskForm({ value, onChange, onSubmit }: TaskFormProps): React.JSX.Element {
  const [error, setError] = useState<string>("");

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!value.trim()) {
      setError("Judul tugas wajib diisi."); // validasi input kosong + feedback visual
      return;
    }
    setError("");
    onSubmit(value);
  }

  return (
    <form onSubmit={submit} noValidate className="form-row">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (error) setError("");
        }}
        placeholder="Tambah tugas modul…"
        aria-invalid={!!error}
        aria-describedby={error ? "form-err" : undefined}
        className={error ? "input err" : "input"}
      />
      <button className="btn primary" type="submit">
        Tambah
      </button>
      {error && (
        <p id="form-err" className="err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
