import { useState } from 'react';

export default function TaskForm({ value, onChange, onSubmit }) {
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!value.trim()) {
      setError('Judul tugas wajib diisi.'); // validasi input kosong + feedback visual
      return;
    }
    setError('');
    onSubmit(value);
  }

  return (
    <form onSubmit={submit} noValidate className="form">
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); if (error) setError(''); }}
        placeholder="Tambah tugas modul…"
        aria-invalid={!!error}
        aria-describedby={error ? 'form-err' : undefined}
        className={error ? 'input err' : 'input'}
      />
      <button className="btn primary" type="submit">Tambah</button>
      {error && <p id="form-err" className="err-text" role="alert">{error}</p>}
    </form>
  );
}
