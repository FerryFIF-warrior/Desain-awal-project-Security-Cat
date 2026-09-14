import { fetchTasksApi, createTaskApi } from "./services/apiService";
import type { FetchTasksState } from "./schemas/taskSchema";
import { renderBadge } from "./components/badge";

class TaskAppController {
  private state: FetchTasksState = { status: "idle" };

  constructor() {
    this.initEventListeners();
    void this.loadTasks();
  }

  private initEventListeners(): void {
    const form = document.getElementById("taskForm34") as HTMLFormElement | null;
    form?.addEventListener("submit", (e) => void this.handleFormSubmit(e));
    // Event delegation untuk tombol hapus/toggle di list
    document.getElementById("taskList34")?.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest("[data-info]");
      if (btn) alert(btn.getAttribute("data-info") ?? "Info tugas");
    });
  }

  private async loadTasks(): Promise<void> {
    this.state = { status: "loading" };
    this.renderUI();
    try {
      const data = await fetchTasksApi();
      this.state = { status: "success", data };
    } catch (err) {
      this.state = { status: "error", message: err instanceof Error ? err.message : "Gagal memuat tugas" };
    }
    this.renderUI();
  }

  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const rawInput = {
      title: formData.get("title")?.toString() ?? "",
      courseName: formData.get("courseName")?.toString() ?? "",
      priority: formData.get("priority")?.toString() ?? "LOW",
      dueDate: formData.get("dueDate")?.toString() ?? "",
    };
    try {
      await createTaskApi(rawInput);
      alert("Tugas berhasil ditambahkan secara Type-Safe!");
      form.reset();
      await this.loadTasks();
    } catch (err) {
      alert(`Validasi Gagal: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  private renderUI(): void {
    const container = document.getElementById("taskList34");
    if (!container) return;
    switch (this.state.status) {
      case "idle":
        container.innerHTML = `<p class="text-gray-500">Menunggu aksi...</p>`;
        break;
      case "loading":
        container.innerHTML = `<p class="text-gray-500 italic">Memuat daftar tugas...</p>`;
        break;
      case "error":
        container.innerHTML = `<p class="text-red-500">Error: ${this.state.message}</p>`;
        break;
      case "success": {
        if (this.state.data.length === 0) {
          container.innerHTML = `<p class="text-gray-500">Belum ada tugas.</p>`;
          return;
        }
        container.innerHTML = this.state.data
          .map(
            (task) => `
          <div class="border rounded-lg p-4 mb-3 shadow-sm flex justify-between items-center bg-white text-slate-800">
            <div>
              <h3 class="font-bold text-lg">${task.title}</h3>
              <p class="text-sm text-gray-600">Matkul: ${task.courseName} | Tenggat: ${task.dueDate}</p>
            </div>
            <div>${renderBadge(task.priority)}</div>
          </div>`
          )
          .join("");
        break;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new TaskAppController());
