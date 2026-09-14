'use client';

import { useState } from 'react';
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(4, 'Judul minimal 4 karakter'),
  difficulty: z.enum(['mudah', 'sedang', 'sulit'], { message: 'Pilih difficulty: mudah/sedang/sulit (FR-14)' }),
});

export default function TaskFormClient() {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [ok, setOk] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = TaskSchema.safeParse({ title, difficulty });
    if (!res.success) {
      setOk('');
      setErrors(res.error.issues.map((i) => i.message));
      return;
    }
    setErrors([]);
    setOk(`Tugas dummy tersimpan: ${res.data.title} (${res.data.difficulty})`);
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul tugas dummy"
        style={{ padding: 10, borderRadius: 8, border: '1px solid #262a35', background: '#0f131d', color: '#e8ecf4' }}
      />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{ padding: 10, borderRadius: 8, border: '1px solid #262a35', background: '#0f131d', color: '#e8ecf4' }}
      >
        <option value="">— difficulty (FR-14) —</option>
        <option value="mudah">mudah</option>
        <option value="sedang">sedang</option>
        <option value="sulit">sulit</option>
      </select>
      <button type="submit" style={{ background: '#00f0ff', color: '#0f131d', padding: 10, borderRadius: 8, fontWeight: 700, border: 0 }}>
        Simpan (dummy)
      </button>
      {errors.map((m) => (
        <p key={m} style={{ color: '#ff7b93', margin: 0 }}>{m}</p>
      ))}
      {ok && <p style={{ color: '#6ffbbe', margin: 0 }}>{ok}</p>}
    </form>
  );
}
