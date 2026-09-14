// Security Cat local auth (tanpa database). User di localStorage, sesi di sessionStorage.
(function () {
  var USERS_KEY = "sc_users_v1";
  var SESSION_KEY = "sc_session_v1";

  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

  function sha256(text) {
    if (crypto.subtle) {
      return crypto.subtle.digest("SHA-256", new TextEncoder().encode("sc$" + text))
        .then(function (buf) {
          return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
        });
    }
    var h = 5381; // ponytail: fallback djb2 bila SubtleCrypto absen (file:// non-secure); upgrade: selalu serve via http/localhost
    for (var i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
    return Promise.resolve("djb2$" + h.toString(16));
  }

  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  window.SCAuth = {
    register: function (callsign, email, pass) {
      callsign = (callsign || "").trim(); email = (email || "").trim(); pass = pass || "";
      if (callsign.length < 3) return { ok: false, error: "Callsign minimal 3 karakter." };
      if (!validEmail(email)) return { ok: false, error: "Email kampus tidak valid." };
      if (pass.length < 8) return { ok: false, error: "Kata sandi minimal 8 karakter." };
      var users = loadUsers();
      var dup = users.some(function (u) {
        return u.callsign.toLowerCase() === callsign.toLowerCase() || u.email.toLowerCase() === email.toLowerCase();
      });
      if (dup) return { ok: false, error: "Callsign atau email sudah terdaftar. Masuk saja." };
      return sha256(pass).then(function (hash) {
        users.push({ callsign: callsign, email: email, hash: hash, createdAt: new Date().toISOString() });
        saveUsers(users);
        sessionStorage.setItem(SESSION_KEY, callsign);
        return { ok: true };
      });
    },
    login: function (id, pass) {
      id = (id || "").trim(); pass = pass || "";
      if (!id || !pass) return { ok: false, error: "Isi callsign/email dan passkey." };
      var users = loadUsers();
      var user = null;
      users.forEach(function (u) {
        if (u.callsign.toLowerCase() === id.toLowerCase() || u.email.toLowerCase() === id.toLowerCase()) user = u;
      });
      if (!user) return { ok: false, error: "Akun tidak ditemukan. Daftar dulu." };
      return sha256(pass).then(function (hash) {
        if (hash !== user.hash) return { ok: false, error: "Passkey salah." };
        sessionStorage.setItem(SESSION_KEY, user.callsign);
        return { ok: true, callsign: user.callsign };
      });
    },
    current: function () {
      var cs = sessionStorage.getItem(SESSION_KEY);
      if (!cs) return null;
      var found = null;
      loadUsers().forEach(function (u) { if (u.callsign === cs) found = u; });
      return found ? { callsign: found.callsign, email: found.email } : null;
    },
    logout: function () { sessionStorage.removeItem(SESSION_KEY); }
  };
})();
