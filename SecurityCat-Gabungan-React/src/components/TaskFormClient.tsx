import { type FormEvent, useState } from "react";
import { z } from "zod";

// Asli dari Modul 6: components/TaskFormClient.tsx (disesuaikan gaya global).
const TaskSchema = z.object({
  title: z.string().min(4, "Judul minimal 4 karakter"),
  difficulty: z.enum(["mudah", "sedang", "sulit"], {
    message: "Pilih difficulty: mudah/sedang/sulit (FR-14)",
  }),
});

export default function TaskFormClient(): React.JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [ok, setOk] = useState<string>("");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const res = TaskSchema.safeParse({ title, difficulty });
    if (!res.success) {
      setOk("");
      setErrors(res.error.issues.map((i) => i.message));
      return;
    }
    setErrors([]);
    setOk(`Tugas dummy tersimpan: ${res.data.title} (${res.data.difficulty})`);
  }

  return (
    <form onSubmit={onSubmit} className="form-col">
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul tugas dummy"
      />
      <select className="input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">— difficulty (FR-14) —</option>
        <option value="mudah">mudah</option>
        <option value="sedang">sedang</option>
        <option value="sulit">sulit</option>
      </select>
      <button className="btn primary" type="submit">
        Simpan (dummy)
      </button>
      {errors.map((m) => (
        <p key={m} className="err">
          {m}
        </p>
      ))}
      {ok && <p className="ok">{ok}</p>}
    </form>
  );
}
