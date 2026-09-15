import { useEffect } from "react";

// Pengganti generateMetadata (Modul 6): judul per-halaman di sisi klien.
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
