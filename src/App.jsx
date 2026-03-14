import { useState, useMemo } from "react";

const infracciones = [
  // AUTO - ACCIDENTES
  { id: 1, tipo: ["auto"], categoria: "Accidentes", descripcion: "Retirarse del lugar del accidente o no dar aviso a autoridades", articulo: "Art. 104 fracc. I", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 2, tipo: ["auto"], categoria: "Accidentes", descripcion: "No acatar disposiciones para retirar vehículo accidentado de la vía", articulo: "Art. 106", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 3, tipo: ["auto"], categoria: "Accidentes", descripcion: "No colocar señales preventivas después de un accidente", articulo: "Art. 104 fracc. IV", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 4, tipo: ["auto"], categoria: "Accidentes", descripcion: "Participar en accidente que pueda configurar delito", articulo: "Arts. 104, 105 y 118 fracc. VII", min: 16, med: 18, max: 20, correlon: true, placa: false },
  // AUTO - CIRCULACIÓN
  { id: 5, tipo: ["auto"], categoria: "Circulación", descripcion: "Invadir carril confinado para transporte público, masivo o de alta capacidad, o ciclovías", articulo: "Art. 90 fracc. VII y 118 fracc. IV", min: 16, med: 18, max: 20, correlon: true, placa: false },
  { id: 6, tipo: ["auto"], categoria: "Circulación", descripcion: "No sujetarse a los límites físicos señalados para los carriles o derecho de contraflujo", articulo: "Art. 90 fracc. VII", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 7, tipo: ["auto"], categoria: "Circulación", descripcion: "Circular en sentido contrario", articulo: "Art. 63", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 8, tipo: ["auto"], categoria: "Circulación", descripcion: "No extremar precauciones al incorporarse a vía, crucero o al rebasar", articulo: "Art. 90 fracc. XI", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 9, tipo: ["auto"], categoria: "Circulación", descripcion: "No respetar derecho de motociclistas, ciclistas y peatones", articulo: "Art. 78", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 10, tipo: ["auto"], categoria: "Circulación", descripcion: "Conducir sobre isleta o camellón", articulo: "Art. 78", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 11, tipo: ["auto"], categoria: "Circulación", descripcion: "Rebasar por carril opuesto en curva o cima de pendiente", articulo: "Art. 82 fracc. III", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 12, tipo: ["auto"], categoria: "Circulación", descripcion: "Permitir ascenso o descenso de pasajeros sobre el arroyo de la vialidad", articulo: "Art. 90 fracc. X", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 13, tipo: ["auto"], categoria: "Circulación", descripcion: "Transitar en vías primarias con restricción expresa", articulo: "Art. 78", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 14, tipo: ["auto"], categoria: "Circulación", descripcion: "Obstaculizar pasos para peatones y ciclovía", articulo: "Art. 90 fracc. XXIII", min: 3, med: 4, max: 5, correlon: false, placa: false },
  // AUTO - CONDUCCIÓN
  { id: 15, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir sin licencia y/o permiso o sin tarjeta de circulación", articulo: "Art. 90 fracc. III", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 16, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir con licencia de transporte público vencida", articulo: "Arts. 90 fracc. III y 118 fracc. X", min: 8, med: 9, max: 10, correlon: true, placa: true },
  { id: 17, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir en estado de ebriedad", articulo: "Arts. 90 fracc. XVII y 118 fracc. VI", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 18, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir bajo el efecto de drogas o psicotrópicos", articulo: "Arts. 49, 90 fracc. XVI y 118 fracc. VI", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 19, tipo: ["auto"], categoria: "Conducción", descripcion: "Manejar sin precaución", articulo: "Art. 90 fracc. I", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 20, tipo: ["auto"], categoria: "Conducción", descripcion: "Usar objetos que distraigan la conducción (celular, dispositivos)", articulo: "Art. 90 fracc. XXV-XXVI", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 21, tipo: ["auto"], categoria: "Conducción", descripcion: "Efectuar carreras o arrancones en vía pública", articulo: "Art. 90 fracc. XXII", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 22, tipo: ["auto"], categoria: "Conducción", descripcion: "No contar con póliza de seguro de responsabilidad civil vigente", articulo: "Art. 90 Bis", min: 16, med: 18, max: 20, correlon: false, placa: false },
  // AUTO - VELOCIDAD
  { id: 23, tipo: ["auto"], categoria: "Velocidad", descripcion: "Circular a más de 50 km/h dentro de centros de población", articulo: "Art. 64", min: 10, med: 13, max: 15, correlon: false, placa: false },
  { id: 24, tipo: ["auto"], categoria: "Velocidad", descripcion: "Circular a más de 20 km/h en zonas escolares, hospitales o lugares de reunión", articulo: "Arts. 64 y 97 fracc. I", min: 10, med: 13, max: 15, correlon: false, placa: false },
  { id: 25, tipo: ["auto"], categoria: "Velocidad", descripcion: "No respetar los límites de velocidad señalizados", articulo: "Art. 64 segundo párrafo", min: 10, med: 13, max: 15, correlon: false, placa: false },
  // AUTO - ESTACIONAMIENTO
  { id: 26, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en camellones, aceras, andadores, ciclovías o vías peatonales", articulo: "Art. 100 fracc. II", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 27, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en lugares prohibidos", articulo: "Art. 100 fracc. II y XIX", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 28, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Invadir o estacionarse en carril confinado sin conductor presente", articulo: "Arts. 100 y 118 fracc. IV", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 29, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse simulando falla mecánica", articulo: "Art. 101", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 30, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse frente a rampas para grupos vulnerables, hidrantes o salidas de emergencia", articulo: "Art. 100 fracc. XVIII", min: 3, med: 4, max: 5, correlon: false, placa: false },
  // AUTO - PLACAS Y DOCUMENTOS
  { id: 31, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular sin ambas placas", articulo: "Arts. 17, 26 y 118 fracc. II", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 32, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Placas que no coincidan con tarjeta de circulación", articulo: "Arts. 17, 26 y 118 fracc. III", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 33, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular con placas vencidas", articulo: "Art. 118 fracc. I", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 34, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Carecer de licencia o permiso para conducir, o tenerla vencida", articulo: "Arts. 41 y 42", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 35, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular con placas extranjeras sin internamiento legal", articulo: "Art. 32", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 36, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "No contar con holograma de verificación o circular con restricción ambiental", articulo: "Art. 90 fracc. XV y Art. 124", min: 16, med: 18, max: 20, correlon: true, placa: true },
  // MOTO
  { id: 37, tipo: ["moto"], categoria: "Casco y equipo", descripcion: "No usar casco certificado (conductor o acompañante)", articulo: "Art. 89 fraccs. VII y VIII Bis y 118 fracc. XIII", min: 3, med: 4, max: 5, correlon: true, placa: true },
  { id: 38, tipo: ["moto"], categoria: "Casco y equipo", descripcion: "No usar anteojos protectores, chamarra o aditamentos rígidos para extremidades", articulo: "Art. 89 fracc. VIII Bis", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 39, tipo: ["moto"], categoria: "Circulación", descripcion: "Rebasar por el mismo carril o no hacerlo por el lado izquierdo", articulo: "Art. 89 fracc. V Ter", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 40, tipo: ["moto"], categoria: "Circulación", descripcion: "Circular por carriles confinados para transporte público", articulo: "Art. 89 fracc. V y 118 fracc. IV", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 41, tipo: ["moto"], categoria: "Circulación", descripcion: "Realizar maniobras que pongan en peligro vida o integridad de terceros", articulo: "Art. 62 y 89 fracc. V Bis", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 42, tipo: ["moto"], categoria: "Circulación", descripcion: "Transitar sobre aceras o áreas reservadas a peatones", articulo: "Art. 89 fracc. III", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 43, tipo: ["moto"], categoria: "Circulación", descripcion: "Transitar dos o más motos en paralelo en el mismo carril", articulo: "Art. 89 fracc. IV", min: 3, med: 4, max: 5, correlon: false, placa: false },
  { id: 44, tipo: ["moto"], categoria: "Pasajeros", descripcion: "Transportar niños o adolescentes que no puedan sostenerse solos", articulo: "Art. 89 fracc. XIV y 118 fracc. XIV", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 45, tipo: ["moto"], categoria: "Pasajeros", descripcion: "Transportar pasajero entre el conductor y el manubrio", articulo: "Art. 89 fracc. XIII", min: 16, med: 18, max: 20, correlon: false, placa: false },
  { id: 46, tipo: ["moto"], categoria: "Alcohol", descripcion: "Conducir con alcohol mayor al permitido (0.02 g/dL) o bajo influjo de drogas", articulo: "Art. 106 Quater", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 47, tipo: ["moto"], categoria: "Placas y documentos", descripcion: "Circular sin placa o con placa vencida", articulo: "Art. 17, 89 fracc. XIV Bis y 118 fracc. II", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 48, tipo: ["moto"], categoria: "Placas y documentos", descripcion: "Carecer de permiso para circular o tenerlo vencido", articulo: "Arts. 18, 89 fracc. XIV Bis y 118 fracc. II", min: 16, med: 18, max: 20, correlon: true, placa: true },
  { id: 49, tipo: ["moto"], categoria: "Estacionamiento", descripcion: "Estacionarse en aceras, camellones, andadores o vías peatonales", articulo: "Art. 100 fracc. II y 118 fracc. XV", min: 16, med: 18, max: 20, correlon: true, placa: true },
  // CICLISTA
  { id: 50, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No obedecer señales e indicaciones de agentes de tránsito", articulo: "Art. 98 fracc. III", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 51, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No respetar señales de semáforos", articulo: "Art. 59", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 52, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No circular con precaución en ciclovías o extrema derecha de la vía", articulo: "Art. 98 fracc. I", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 53, tipo: ["ciclista"], categoria: "Circulación", descripcion: "Transitar sobre aceras o áreas de peatones, o remolcarse de otro vehículo", articulo: "Art. 98 fracc. II", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 54, tipo: ["ciclista"], categoria: "Señales", descripcion: "No obedecer señales preventivas y restrictivas", articulo: "Art. 53 fracc. I y II", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  // PEATÓN
  { id: 55, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "No obedecer indicaciones de agentes de tránsito", articulo: "Art. 91", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 56, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Invadir intempestivamente la superficie de rodamiento", articulo: "Art. 92 fracc. V", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 57, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Cruzar frente a vehículos de transporte detenidos no controlados por semáforo", articulo: "Art. 92 fracc. VI", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 58, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Circular sobre la superficie de rodamiento de vías primarias", articulo: "Art. 92 fracc. I", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 59, tipo: ["peatón"], categoria: "Señales", descripcion: "No respetar señales de semáforos o fijadas en la vía pública", articulo: "Art. 92 fracc. VI", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 60, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar en avenidas de alta densidad fuera de esquinas o zonas marcadas", articulo: "Art. 92 fracc. II", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 61, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar intersecciones sin semáforo sin asegurarse que es seguro", articulo: "Art. 92 fracc. III", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 62, tipo: ["peatón"], categoria: "Cruce", descripcion: "No usar puentes peatonales donde los haya", articulo: "Art. 92 fracc. VIII", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
  { id: 63, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar diagonalmente por cruceros", articulo: "Art. 92 fracc. IX", min: null, med: null, max: null, correlon: false, placa: false, amonestacion: true },
];

const TIPOS = [
  { id: "todos", label: "Todos", emoji: "🔍" },
  { id: "auto", label: "Auto", emoji: "🚗" },
  { id: "moto", label: "Moto", emoji: "🏍️" },
  { id: "ciclista", label: "Ciclista", emoji: "🚲" },
  { id: "peatón", label: "Peatón", emoji: "🚶" },
];

export default function App() {
  const [tipoActivo, setTipoActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [expandido, setExpandido] = useState(null);

  const resultado = useMemo(() => {
    return infracciones.filter((inf) => {
      const matchTipo = tipoActivo === "todos" || inf.tipo.includes(tipoActivo);
      const matchBusqueda =
        busqueda.trim() === "" ||
        inf.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        inf.categoria.toLowerCase().includes(busqueda.toLowerCase());
      return matchTipo && matchBusqueda;
    });
  }, [tipoActivo, busqueda]);

  const categorias = useMemo(() => {
    const cats = {};
    resultado.forEach((inf) => {
      if (!cats[inf.categoria]) cats[inf.categoria] = [];
      cats[inf.categoria].push(inf);
    });
    return cats;
  }, [resultado]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f6f3",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e8e6e0",
        padding: "20px 20px 0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>🚦</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>
                Reglamento de Tránsito
              </div>
              <div style={{ fontSize: 11, color: "#999", fontWeight: 500 }}>
                Estado de México · Nov 2025
              </div>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#aaa" }}>
            🔎
          </span>
          <input
            type="text"
            placeholder="Buscar infracción..."
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setExpandido(null); }}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "10px 12px 10px 36px",
              borderRadius: 10, border: "1.5px solid #e8e6e0",
              background: "#f7f6f3", fontSize: 14, color: "#1a1a1a",
              outline: "none",
            }}
          />
          {busqueda && (
            <button onClick={() => setBusqueda("")} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa",
            }}>×</button>
          )}
        </div>

        {/* Filtro tipo */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14 }}>
          {TIPOS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTipoActivo(t.id); setExpandido(null); }}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: "1.5px solid",
                borderColor: tipoActivo === t.id ? "#1a1a1a" : "#e0ddd7",
                background: tipoActivo === t.id ? "#1a1a1a" : "#fff",
                color: tipoActivo === t.id ? "#fff" : "#555",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "16px 16px 40px" }}>
        {resultado.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤷</div>
            <div style={{ fontSize: 14 }}>No se encontraron infracciones</div>
          </div>
        ) : (
          Object.entries(categorias).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: 24 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.8px",
                color: "#999", textTransform: "uppercase", marginBottom: 8, paddingLeft: 4,
              }}>
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((inf) => (
                  <InfraccionCard
                    key={inf.id}
                    inf={inf}
                    expandido={expandido === inf.id}
                    onToggle={() => setExpandido(expandido === inf.id ? null : inf.id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Nota UMA */}
        <div style={{
          background: "#fff", border: "1px solid #e8e6e0", borderRadius: 12,
          padding: "14px 16px", marginTop: 8,
        }}>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>💡 Sobre los rangos de multa</strong><br />
            Las multas se expresan en <strong>UMAs</strong> (Unidad de Medida y Actualización).
            El rango que aplica depende de tus infracciones pendientes de pago:
            <br />• <strong>Mínima</strong>: sin adeudos pendientes
            <br />• <strong>Media</strong>: 2–3 adeudos pendientes
            <br />• <strong>Máxima</strong>: 4 o más adeudos pendientes
          </div>
        </div>
      </div>
    </div>
  );
}

function InfraccionCard({ inf, expandido, onToggle }) {
  const tieneMulta = inf.min !== null;
  const badgeBorder = inf.correlon || inf.placa ? "#ffd6d6" : "#e8e6e0";
  const badgeBg = inf.correlon || inf.placa ? "#fff5f5" : "#fff";

  return (
    <div
      onClick={onToggle}
      style={{
        border: `1.5px solid ${expandido ? "#1a1a1a" : badgeBorder}`,
        borderRadius: 12, padding: "14px 14px",
        cursor: "pointer", transition: "all 0.15s",
        background: expandido ? "#fafaf8" : badgeBg,
      }}
    >
      {/* Fila principal */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4, marginBottom: 6 }}>
            {inf.descripcion}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {/* Multa o amonestación */}
            {tieneMulta ? (
              <span style={{
                fontSize: 12, fontWeight: 700, color: "#1a1a1a",
                background: "#f0ede6", padding: "2px 8px", borderRadius: 6,
              }}>
                {inf.min}–{inf.max} UMAs
              </span>
            ) : (
              <span style={{
                fontSize: 12, fontWeight: 700, color: "#6b7c4a",
                background: "#f0f4e8", padding: "2px 8px", borderRadius: 6,
              }}>
                Amonestación
              </span>
            )}
            {/* Badges */}
            {inf.correlon && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#c0392b",
                background: "#ffeaea", padding: "2px 8px", borderRadius: 6,
              }}>
                🔒 Corralón
              </span>
            )}
            {inf.placa && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#8e44ad",
                background: "#f5eafb", padding: "2px 8px", borderRadius: 6,
              }}>
                🪪 Retiro de placa
              </span>
            )}
          </div>
        </div>
        <div style={{
          fontSize: 12, color: "#bbb", transition: "transform 0.15s",
          transform: expandido ? "rotate(180deg)" : "rotate(0deg)",
          marginTop: 2,
        }}>▾</div>
      </div>

      {/* Detalle expandido */}
      {expandido && (
        <div style={{
          marginTop: 12, paddingTop: 12,
          borderTop: "1px solid #e8e6e0",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>
            📋 {inf.articulo}
          </div>
          {tieneMulta && (
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Mínima", val: inf.min, color: "#e8f4ea", text: "#2e7d32" },
                { label: "Media", val: inf.med, color: "#fff8e1", text: "#f57f17" },
                { label: "Máxima", val: inf.max, color: "#fce4ec", text: "#c62828" },
              ].map((r) => (
                <div key={r.label} style={{
                  flex: 1, background: r.color, borderRadius: 8,
                  padding: "8px 6px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: r.text, fontWeight: 600 }}>{r.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: r.text }}>{r.val}</div>
                  <div style={{ fontSize: 10, color: r.text, opacity: 0.8 }}>UMAs</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <MedidaBadge activa={inf.correlon} icono="🔒" label="Corralón" />
            <MedidaBadge activa={inf.placa} icono="🪪" label="Retiro de placa" />
          </div>
        </div>
      )}
    </div>
  );
}

function MedidaBadge({ activa, icono, label }) {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
      padding: "8px", borderRadius: 8, border: "1.5px solid",
      borderColor: activa ? (label === "Corralón" ? "#ffd6d6" : "#e8d5f7") : "#e8e6e0",
      background: activa ? (label === "Corralón" ? "#fff0f0" : "#f9f0ff") : "#f7f6f3",
    }}>
      <span style={{ fontSize: 14, opacity: activa ? 1 : 0.3 }}>{icono}</span>
      <span style={{
        fontSize: 11, fontWeight: 600,
        color: activa ? (label === "Corralón" ? "#c0392b" : "#8e44ad") : "#bbb",
      }}>
        {label}
      </span>
    </div>
  );
}
