import { useState } from "react";

// ============================================================
// DATA
// ============================================================
const kpis = [
  { label: "Ventas hoy", value: "$12,480", delta: "+18%", up: true },
  { label: "Visitas tienda", value: "3,241", delta: "+7%", up: true },
  { label: "Conversión", value: "3.8%", delta: "-0.2%", up: false },
  { label: "ROI Campañas", value: "4.2x", delta: "+0.6x", up: true },
];

const influencers = [
  { name: "Valeria M.", followers: "280K", status: "Publicó hoy", post: "✅", red: "Instagram", alcance: "48K", eng: "6.2%" },
  { name: "Sofía R.", followers: "115K", status: "Pendiente brief", post: "⏳", red: "TikTok", alcance: "—", eng: "—" },
  { name: "Camila T.", followers: "540K", status: "En negociación", post: "🔄", red: "Instagram", alcance: "—", eng: "—" },
  { name: "Daniela V.", followers: "89K", status: "Publicó ayer", post: "✅", red: "TikTok", alcance: "31K", eng: "8.1%" },
];

const tareas = [
  { texto: "Aprobar contenido Valeria para semana 2", urgente: true },
  { texto: "Brief influencer Sofía R.", urgente: true },
  { texto: "Actualizar banners tienda — colección nueva", urgente: false },
  { texto: "Reporte semanal RRSS", urgente: false },
  { texto: "Revisar métricas campaña primavera", urgente: false },
];

const tiendaStats = [
  { label: "Carros abandonados", value: "47", color: "#fca5a5", action: "Enviar email" },
  { label: "Pedidos hoy", value: "89", color: "#86efac", action: "Ver pedidos" },
  { label: "Stock crítico", value: "3 items", color: "#fde68a", action: "Revisar" },
  { label: "Ticket promedio", value: "$84", color: "#c4b5fd", action: "Analizar" },
];

const productosTop = [
  { nombre: "Vestido lino beige", visitas: 312, stock: "✅ 48 uds" },
  { nombre: "Blazer oversize negro", visitas: 278, stock: "⚠️ 6 uds" },
  { nombre: "Falda midi estampada", visitas: 201, stock: "✅ 30 uds" },
  { nombre: "Top seda marfil", visitas: 189, stock: "❌ Agotado" },
];

const wooUp = {
  clientesTotal: "8,420",
  nuevos: "+134",
  recurrentes: "38%",
  puntosCanje: "1,240",
  segmentos: [
    { nombre: "VIP", cant: 312, color: "#c9a96e" },
    { nombre: "Recurrentes", cant: 1840, color: "#86efac" },
    { nombre: "Nuevos", cant: 980, color: "#a5f3fc" },
    { nombre: "Inactivos", cant: 2100, color: "#fca5a5" },
  ],
  campanas: [
    { nombre: "Reactivación inactivos", tipo: "Email", apertura: "28%", conversion: "4.1%" },
    { nombre: "Bienvenida nuevos", tipo: "Email", apertura: "61%", conversion: "12.3%" },
    { nombre: "Promo VIP exclusiva", tipo: "SMS", apertura: "84%", conversion: "18.7%" },
  ],
};

const redesResumen = [
  { id: "instagram", nombre: "Instagram", icon: "📸", color: "#f9a8d4", seguidores: "48.2K", crecimiento: "+340", alcance: "62K", engagement: "5.6%" },
  { id: "tiktok", nombre: "TikTok", icon: "🎵", color: "#a5f3fc", seguidores: "92K", crecimiento: "+1,240", alcance: "170K", engagement: "10.2%" },
  { id: "pinterest", nombre: "Pinterest", icon: "📌", color: "#fca5a5", seguidores: "21K", crecimiento: "+89", alcance: "26K", engagement: "3.8%" },
  { id: "facebook", nombre: "Facebook", icon: "📘", color: "#93c5fd", seguidores: "15.4K", crecimiento: "+42", alcance: "15K", engagement: "2.7%" },
];

const postsDestacados = [
  { red: "tiktok", icon: "🎵", color: "#a5f3fc", titulo: "3 looks con 1 falda", alcance: "67K", eng: "14.8%", fecha: "28 Feb" },
  { red: "tiktok", icon: "🎵", color: "#a5f3fc", titulo: "POV: primer día con blazer", alcance: "54K", eng: "11.3%", fecha: "08 Mar" },
  { red: "instagram", icon: "📸", color: "#f9a8d4", titulo: "Trend: outfit check", alcance: "24K", eng: "9.4%", fecha: "01 Mar" },
  { red: "pinterest", icon: "📌", color: "#fca5a5", titulo: "Outfit inspo oficina", alcance: "12K", eng: "4.7%", fecha: "01 Mar" },
];

const calendario = [
  { dia: "Lun 10", red: "instagram", icon: "📸", color: "#f9a8d4", tema: "Look de lunes", estado: "programado" },
  { dia: "Mar 11", red: "tiktok", icon: "🎵", color: "#a5f3fc", tema: "Trend semana", estado: "borrador" },
  { dia: "Mié 12", red: "pinterest", icon: "📌", color: "#fca5a5", tema: "Moodboard otoño", estado: "programado" },
  { dia: "Jue 13", red: "instagram", icon: "📸", color: "#f9a8d4", tema: "5 outfits viernes", estado: "sin planear" },
  { dia: "Vie 14", red: "tiktok", icon: "🎵", color: "#a5f3fc", tema: "GRWM fin de semana", estado: "programado" },
  { dia: "Sáb 15", red: "facebook", icon: "📘", color: "#93c5fd", tema: "Weekend inspo", estado: "borrador" },
  { dia: "Dom 16", red: "instagram", icon: "📸", color: "#f9a8d4", tema: "Poll próxima colección", estado: "sin planear" },
];

const estadoColor = { programado: "#86efac", borrador: "#fde68a", "sin planear": "#444" };

const nav = [
  { id: "resumen", label: "Resumen", icon: "⚡" },
  { id: "tienda", label: "Tienda", icon: "🛍️" },
  { id: "crm", label: "CRM / WooUp", icon: "💜" },
  { id: "influencers", label: "Influencers", icon: "✨" },
  { id: "organico", label: "Contenido Orgánico", icon: "📱" },
  { id: "calendario", label: "Calendario", icon: "📅" },
];

// ============================================================
// COMPONENTS
// ============================================================
function KPICard({ label, value, delta, up }) {
  return (
    <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, background: up ? "rgba(134,239,172,0.06)" : "rgba(252,165,165,0.06)", borderRadius: "0 16px 0 50px" }} />
      <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#f0ece4", marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11, color: up ? "#86efac" : "#fca5a5", fontWeight: 600 }}>{up ? "▲" : "▼"} {delta} vs ayer</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>{children}</div>;
}

// ============================================================
// SECTIONS
// ============================================================
function Resumen({ tareasState, toggleTarea }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {kpis.map((k, i) => <KPICard key={i} {...k} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Tienda rápida */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 20 }}>
          <SectionTitle>Tienda hoy</SectionTitle>
          {tiendaStats.map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < tiendaStats.length - 1 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ fontSize: 12, color: "#777" }}>{t.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.value}</span>
            </div>
          ))}
        </div>
        {/* Redes rápido */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 20 }}>
          <SectionTitle>Redes sociales</SectionTitle>
          {redesResumen.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < redesResumen.length - 1 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ fontSize: 13 }}>{r.icon} {r.nombre}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: r.color, fontWeight: 700 }}>{r.engagement}</div>
                <div style={{ fontSize: 10, color: "#444" }}>{r.seguidores}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Tareas */}
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 20 }}>
          <SectionTitle>Tareas pendientes</SectionTitle>
          {tareasState.map((t, i) => (
            <div key={i} onClick={() => toggleTarea(i)} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < tareasState.length - 1 ? "1px solid #1a1a1a" : "none", cursor: "pointer" }}>
              <div style={{ width: 15, height: 15, borderRadius: 4, marginTop: 1, flexShrink: 0, border: t.done ? "none" : "1.5px solid #333", background: t.done ? "#c9a96e" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#0d0d0d", fontWeight: 800 }}>{t.done ? "✓" : ""}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: t.done ? "#333" : "#bbb", textDecoration: t.done ? "line-through" : "none" }}>{t.texto}</span>
                {t.urgente && !t.done && <span style={{ marginLeft: 6, fontSize: 9, background: "#3d1f1f", color: "#fca5a5", padding: "1px 6px", borderRadius: 20, fontWeight: 700 }}>urgente</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Top posts */}
      <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 20 }}>
        <SectionTitle>Posts con mejor rendimiento</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {postsDestacados.map((p, i) => (
            <div key={i} style={{ background: "#1a1a1a", borderRadius: 12, padding: 14, borderLeft: `3px solid ${p.color}` }}>
              <div style={{ fontSize: 14, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#d0ccc4", marginBottom: 8, lineHeight: 1.4 }}>{p.titulo}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ color: "#555" }}>{p.fecha}</span>
                <span style={{ color: p.color, fontWeight: 700 }}>{p.eng}</span>
              </div>
              <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{p.alcance} alcance</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tienda() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {tiendaStats.map((t, i) => (
          <div key={i} style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{t.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: t.color, marginBottom: 14 }}>{t.value}</div>
            <button style={{ width: "100%", background: "#1e1e1e", border: `1px solid ${t.color}44`, color: t.color, borderRadius: 10, padding: "8px 0", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{t.action}</button>
          </div>
        ))}
      </div>
      <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22, marginBottom: 16 }}>
        <SectionTitle>Productos más vistos hoy</SectionTitle>
        {productosTop.map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < productosTop.length - 1 ? "1px solid #1a1a1a" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👗</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{p.nombre}</span>
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 12 }}>
              <span style={{ color: "#c9a96e" }}>{p.visitas} visitas</span>
              <span style={{ color: "#555" }}>{p.stock}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#161616", border: "1px dashed #2a2a2a", borderRadius: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🔗 Shopify conectado</div>
          <div style={{ fontSize: 12, color: "#555" }}>Sincronización en tiempo real · Última actualización: hace 3 min</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#86efac", boxShadow: "0 0 8px #86efac" }} />
      </div>
    </div>
  );
}

function CRM() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Clientes totales", value: wooUp.clientesTotal, color: "#c4b5fd" },
          { label: "Nuevos este mes", value: wooUp.nuevos, color: "#86efac" },
          { label: "Tasa recurrencia", value: wooUp.recurrentes, color: "#c9a96e" },
          { label: "Canjes de puntos", value: wooUp.puntosCanje, color: "#a5f3fc" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22 }}>
          <SectionTitle>Segmentos de clientes</SectionTitle>
          {wooUp.segmentos.map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13 }}>{s.nombre}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.cant.toLocaleString()}</span>
              </div>
              <div style={{ background: "#1e1e1e", borderRadius: 4, height: 5 }}>
                <div style={{ width: `${(s.cant / 2100) * 100}%`, background: s.color, height: 5, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22 }}>
          <SectionTitle>Campañas CRM activas</SectionTitle>
          {wooUp.campanas.map((c, i) => (
            <div key={i} style={{ background: "#1a1a1a", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{c.nombre}</span>
                <span style={{ fontSize: 10, background: "#252525", color: "#888", padding: "2px 8px", borderRadius: 20 }}>{c.tipo}</span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <span>📬 Apertura: <strong style={{ color: "#86efac" }}>{c.apertura}</strong></span>
                <span>🛍️ Conversión: <strong style={{ color: "#c9a96e" }}>{c.conversion}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Influencers() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {influencers.map((inf, i) => (
          <div key={i} style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{inf.name}</div>
                <div style={{ fontSize: 12, color: "#555" }}>{inf.followers} · {inf.red}</div>
              </div>
              <div style={{ fontSize: 22, background: "#1e1e1e", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{inf.post}</div>
            </div>
            <div style={{ background: "#1a1a1a", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#888", marginBottom: 14, borderLeft: `3px solid ${inf.post === "✅" ? "#86efac" : inf.post === "⏳" ? "#fde68a" : "#fca5a5"}` }}>
              {inf.status}
            </div>
            {inf.alcance !== "—" && (
              <div style={{ display: "flex", gap: 16, fontSize: 12, marginBottom: 14 }}>
                <span style={{ color: "#555" }}>Alcance: <strong style={{ color: "#f0ece4" }}>{inf.alcance}</strong></span>
                <span style={{ color: "#555" }}>Engagement: <strong style={{ color: "#c9a96e" }}>{inf.eng}</strong></span>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              {["Ver brief", "Métricas", "Mensaje"].map((btn, j) => (
                <button key={j} style={{ background: j === 0 ? "#c9a96e" : "#1e1e1e", color: j === 0 ? "#0d0d0d" : "#666", border: "1px solid #2a2a2a", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{btn}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Organico() {
  const [redActiva, setRedActiva] = useState("tiktok");
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {redesResumen.map((r, i) => (
          <div key={i} onClick={() => setRedActiva(r.id)} style={{ background: redActiva === r.id ? "#1a1a1a" : "#161616", border: `1px solid ${redActiva === r.id ? r.color + "66" : "#252525"}`, borderRadius: 16, padding: 18, cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{r.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{r.nombre}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: r.color, marginBottom: 4 }}>{r.engagement}</div>
            <div style={{ fontSize: 11, color: "#555" }}>engagement prom.</div>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: "#555" }}>{r.seguidores}</span>
              <span style={{ color: "#86efac" }}>{r.crecimiento} nuevos</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 16, padding: 22, marginBottom: 16 }}>
        <SectionTitle>Top posts · {redesResumen.find(r => r.id === redActiva)?.nombre}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
          {postsDestacados.filter(p => p.red === redActiva).concat(postsDestacados.filter(p => p.red !== redActiva)).slice(0, 4).map((p, i) => (
            <div key={i} style={{ background: "#1a1a1a", borderRadius: 12, padding: 14, borderLeft: `3px solid ${p.color}`, opacity: p.red === redActiva ? 1 : 0.4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#d0ccc4" }}>{p.titulo}</span>
                <span style={{ fontSize: 12, color: p.color, fontWeight: 700 }}>{p.eng}</span>
              </div>
              <div style={{ fontSize: 11, color: "#444" }}>{p.alcance} alcance · {p.fecha}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#161616", border: "1px solid #c9a96e33", borderRadius: 16, padding: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 22 }}>💡</span>
        <div>
          <div style={{ fontWeight: 700, color: "#c9a96e", marginBottom: 4 }}>Insight</div>
          <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>TikTok genera <strong style={{ color: "#f0ece4" }}>2.7x más alcance</strong> que Instagram. Pinterest tiene el mejor ratio de guardados — ideal para tráfico a la tienda. Reels y videos cortos son tu formato estrella en todas las redes.</div>
        </div>
      </div>
    </div>
  );
}

function Calendario() {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#444", marginBottom: 20 }}>Semana del 10 al 16 de marzo · Todas las redes</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10, marginBottom: 20 }}>
        {calendario.map((c, i) => (
          <div key={i} style={{ background: "#161616", border: `1px solid ${c.color}33`, borderRadius: 14, padding: 14, minHeight: 130 }}>
            <div style={{ fontSize: 10, color: "#444", marginBottom: 8 }}>{c.dia}</div>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
            <div style={{ fontSize: 10, color: c.color, fontWeight: 600, marginBottom: 6 }}>{c.red}</div>
            <div style={{ fontSize: 11, color: "#bbb", marginBottom: 10, lineHeight: 1.4 }}>{c.tema}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: estadoColor[c.estado], background: estadoColor[c.estado] + "18", padding: "2px 7px", borderRadius: 20, display: "inline-block" }}>{c.estado}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {Object.entries(estadoColor).map(([e, color]) => (
          <div key={e} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} /> {e}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function Dashboard() {
  const [seccion, setSeccion] = useState("resumen");
  const [tareasState, setTareasState] = useState(tareas.map(t => ({ ...t, done: false })));

  const toggleTarea = (i) => setTareasState(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));

  const seccionActual = nav.find(n => n.id === seccion);

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "#0d0d0d", minHeight: "100vh", color: "#f0ece4", display: "flex" }}>
      {/* Sidebar nav */}
      <div style={{ width: 220, background: "#0f0f0f", borderRight: "1px solid #1a1a1a", padding: "28px 16px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ marginBottom: 32, paddingLeft: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "#333", textTransform: "uppercase", marginBottom: 4 }}>Panel</div>
          <div style={{ fontSize: 16, fontWeight: 800, background: "linear-gradient(90deg,#f0ece4,#c9a96e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fashion HQ</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setSeccion(n.id)} style={{ background: seccion === n.id ? "#1a1a1a" : "transparent", border: seccion === n.id ? "1px solid #2a2a2a" : "1px solid transparent", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span style={{ fontSize: 13, fontWeight: seccion === n.id ? 700 : 400, color: seccion === n.id ? "#f0ece4" : "#555" }}>{n.label}</span>
              {seccion === n.id && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#c9a96e" }} />}
            </button>
          ))}
        </div>
        {/* Estado conexiones */}
        <div style={{ marginTop: "auto", background: "#161616", border: "1px solid #1f1f1f", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#333", textTransform: "uppercase", marginBottom: 10 }}>Conexiones</div>
          {[
            { nombre: "Shopify", color: "#86efac" },
            { nombre: "WooUp", color: "#86efac" },
            { nombre: "Meta", color: "#fde68a" },
            { nombre: "TikTok", color: "#fde68a" },
            { nombre: "GA4", color: "#86efac" },
            { nombre: "Sheets", color: "#86efac" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#444" }}>{c.nombre}</span>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, boxShadow: `0 0 5px ${c.color}` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{seccionActual?.icon} {seccionActual?.label}</div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
              {seccion === "resumen" && "Buenas, directora 👋"}
              {seccion === "tienda" && "Tienda Online"}
              {seccion === "crm" && "CRM · WooUp"}
              {seccion === "influencers" && "Campañas de Influencers"}
              {seccion === "organico" && "Contenido Orgánico"}
              {seccion === "calendario" && "Calendario Editorial"}
            </h2>
          </div>
          <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 12, padding: "10px 16px", fontSize: 12, color: "#555", textAlign: "right" }}>
            <div style={{ color: "#c9a96e", fontWeight: 700 }}>Lunes</div>
            <div>9 Mar 2026</div>
          </div>
        </div>

        {seccion === "resumen" && <Resumen tareasState={tareasState} toggleTarea={toggleTarea} />}
        {seccion === "tienda" && <Tienda />}
        {seccion === "crm" && <CRM />}
        {seccion === "influencers" && <Influencers />}
        {seccion === "organico" && <Organico />}
        {seccion === "calendario" && <Calendario />}
      </div>
    </div>
  );
}
