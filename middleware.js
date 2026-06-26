// Edge Middleware — protege TODO el sitio detrás de un código de acceso.
// Corre en el servidor (Edge), antes de servir cualquier archivo (HTML, .jsx, assets),
// así que no se puede saltear pidiendo /app-inversor.jsx directamente.
//
// El código se configura con la variable de entorno ACCESS_CODE en Vercel.
// Si no está seteada, usa el valor por defecto de abajo.

export const config = {
  // Intercepta todas las rutas.
  matcher: '/(.*)',
};

const COOKIE_NAME = 'umbral_access';

function getPass() {
  return (typeof process !== 'undefined' && process.env && process.env.ACCESS_CODE) || 'UMBRAL2026';
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function loginPage(error) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>UMBRAL · Acceso</title>
<style>
  :root { --green:#395714; --cream:#fafaf8; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: var(--green); color: var(--cream);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    padding: 24px;
  }
  .card {
    width: 100%; max-width: 360px; text-align: center;
  }
  .logo { display: flex; gap: 9px; justify-content: center; margin-bottom: 14px; }
  .logo span { width: 9px; height: 9px; border-radius: 50%; background: var(--cream); display: inline-block; }
  h1 { font-family: Georgia, "Times New Roman", serif; letter-spacing: 6px; font-weight: 400; font-size: 26px; margin: 0 0 4px; }
  p.sub { opacity: .7; font-size: 13px; margin: 0 0 28px; letter-spacing: .5px; }
  form { display: flex; flex-direction: column; gap: 12px; }
  input {
    width: 100%; padding: 14px 16px; border-radius: 10px; border: 1px solid rgba(250,250,248,.25);
    background: rgba(250,250,248,.08); color: var(--cream); font-size: 16px; text-align: center; letter-spacing: 2px;
    outline: none;
  }
  input::placeholder { color: rgba(250,250,248,.4); letter-spacing: 1px; }
  input:focus { border-color: rgba(250,250,248,.6); }
  button {
    width: 100%; padding: 14px 16px; border-radius: 10px; border: none; cursor: pointer;
    background: var(--cream); color: var(--green); font-size: 15px; font-weight: 600; letter-spacing: .5px;
  }
  button:hover { opacity: .9; }
  .err { color: #ffd3d3; font-size: 13px; margin: 4px 0 0; min-height: 16px; }
</style>
</head>
<body>
  <div class="card">
    <div class="logo"><span></span><span></span><span></span></div>
    <h1>UMBRAL</h1>
    <p class="sub">Ingresá el código de acceso</p>
    <form method="POST" action="/__auth">
      <input type="password" name="code" placeholder="Código" autofocus autocomplete="off" />
      <button type="submit">Entrar</button>
      <p class="err">${error ? 'Código incorrecto' : ''}</p>
    </form>
  </div>
</body>
</html>`;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const PASS = getPass();

  // 1) Envío del formulario de login
  if (request.method === 'POST' && url.pathname === '/__auth') {
    const form = await request.formData();
    const code = (form.get('code') || '').toString();
    if (code === PASS) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
          // Cookie de sesión, httpOnly, 30 días
          'Set-Cookie': `${COOKIE_NAME}=${encodeURIComponent(PASS)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      });
    }
    return new Response(loginPage(true), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // 2) ¿Ya tiene la cookie válida?
  const cookies = parseCookies(request.headers.get('cookie'));
  if (cookies[COOKIE_NAME] === PASS) {
    return; // continúa: sirve el sitio normal
  }

  // 3) Sin acceso → mostrar pantalla de código
  return new Response(loginPage(false), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
