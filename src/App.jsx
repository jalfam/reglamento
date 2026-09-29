import { useState, useMemo } from "react";

const infracciones = [
  // ─── AUTO · ACCIDENTES ───────────────────────────────────────────
  { id: 1, tipo: ["auto"], categoria: "Accidentes", descripcion: "Retirarse del lugar del accidente o no dar aviso a autoridades", articulo: "Art. 104 fracc. I", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 2, tipo: ["auto"], categoria: "Accidentes", descripcion: "No acatar disposiciones para retirar vehículo accidentado de la vía", articulo: "Art. 106", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 3, tipo: ["auto"], categoria: "Accidentes", descripcion: "No colocar señales preventivas después de un accidente", articulo: "Art. 104 fracc. IV", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 4, tipo: ["auto"], categoria: "Accidentes", descripcion: "Participar en accidente que pueda configurar delito", articulo: "Arts. 104, 105 y 118 fracc. VII", min: 16, med: 18, max: 20, corralon: true, placa: false },

  // ─── AUTO · REBASES ──────────────────────────────────────────────
  { id: 5, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril de tránsito opuesto en curva o cima de pendiente", articulo: "Art. 82 fracc. III", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 6, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril opuesto cuando es posible hacerlo en el mismo sentido", articulo: "Art. 82 fracc. I", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 7, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril opuesto sin clara visibilidad o sin espacio suficiente", articulo: "Art. 82 fracc. II", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 8, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar a menos de 30 metros de un crucero o paso de ferrocarril", articulo: "Art. 82 fracc. IV", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 9, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril opuesto para adelantar hileras de vehículos", articulo: "Art. 82 fracc. V", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 10, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril opuesto cuando la raya del pavimento sea continua", articulo: "Art. 82 fracc. VI", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 11, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar por el carril opuesto cuando el vehículo que precede ya inició un rebase", articulo: "Art. 82 fracc. VII", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 12, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar vehículos por el acotamiento", articulo: "Art. 80", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 13, tipo: ["auto"], categoria: "Rebases", descripcion: "No conservar su derecha o aumentar la velocidad cuando otro vehículo intenta rebasarlo", articulo: "Art. 79", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 14, tipo: ["auto"], categoria: "Rebases", descripcion: "Rebasar sin cerciorarse de que nadie más haya iniciado la misma maniobra", articulo: "Art. 79 fracc. I", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── AUTO · CIRCULACIÓN ──────────────────────────────────────────
  { id: 15, tipo: ["auto"], categoria: "Circulación", descripcion: "Invadir carril confinado para transporte público, masivo o de alta capacidad (Mexibús, Trolebús), o ciclovías", articulo: "Art. 90 fracc. VII y 118 fracc. IV", min: 16, med: 18, max: 20, corralon: true, placa: false },
  { id: 16, tipo: ["auto"], categoria: "Circulación", descripcion: "No sujetarse a los límites físicos de carriles o derecho de contraflujo", articulo: "Art. 90 fracc. VII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 17, tipo: ["auto"], categoria: "Circulación", descripcion: "Circular en sentido contrario", articulo: "Art. 63", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 18, tipo: ["auto"], categoria: "Circulación", descripcion: "Conducir sobre isleta o camellón", articulo: "Art. 78", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 19, tipo: ["auto"], categoria: "Circulación", descripcion: "No extremar precauciones al incorporarse a vía, cruzar crucero o al rebasar", articulo: "Art. 90 fracc. XI", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 20, tipo: ["auto"], categoria: "Circulación", descripcion: "No extremar precauciones al cambiar de carril o dar vuelta a la izquierda, derecha o en U", articulo: "Art. 90 fracc. XI", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 21, tipo: ["auto"], categoria: "Circulación", descripcion: "No respetar derecho de motociclistas, ciclistas y peatones", articulo: "Art. 78", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 22, tipo: ["auto"], categoria: "Circulación", descripcion: "Transitar en vías primarias con restricción expresa", articulo: "Art. 78", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 23, tipo: ["auto"], categoria: "Circulación", descripcion: "Obstaculizar pasos para peatones y ciclovía", articulo: "Art. 90 fracc. XXIII", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 24, tipo: ["auto"], categoria: "Circulación", descripcion: "Continuar circulando cuando no hay espacio en la cuadra siguiente, obstruyendo intersección", articulo: "Art. 73", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 25, tipo: ["auto"], categoria: "Circulación", descripcion: "No ceder el paso a vehículos que ya se encuentran dentro de un crucero", articulo: "Art. 75 fracc. II", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 26, tipo: ["auto"], categoria: "Circulación", descripcion: "No ceder el paso al incorporarse a una vía primaria", articulo: "Art. 76", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 27, tipo: ["auto"], categoria: "Circulación", descripcion: "No hacer alto total a 5 metros del riel más cercano en crucero de ferrocarril", articulo: "Arts. 77 y 90 fracc. XII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 28, tipo: ["auto"], categoria: "Circulación", descripcion: "No ceder el paso a vehículos en glorieta", articulo: "Art. 74", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 29, tipo: ["auto"], categoria: "Circulación", descripcion: "Dar vuelta en crucero sin ceder el paso a peatones en el arroyo", articulo: "Art. 85", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 30, tipo: ["auto"], categoria: "Circulación", descripcion: "Dar vuelta continua a la izquierda o derecha sin señalamiento que lo permita expresamente", articulo: "Art. 86", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 31, tipo: ["auto"], categoria: "Circulación", descripcion: "Retroceder más de 20 metros sin precaución o interfiriendo el tránsito", articulo: "Art. 87", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 32, tipo: ["auto"], categoria: "Circulación", descripcion: "Retroceder en vías de circulación continua o intersecciones", articulo: "Arts. 87 y 90 fracc. XIX", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── AUTO · SEÑALES ──────────────────────────────────────────────
  { id: 33, tipo: ["auto"], categoria: "Señales", descripcion: "No obedecer señales preventivas (advertencias de peligro o cambio de situación)", articulo: "Art. 53 fracc. I", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 34, tipo: ["auto"], categoria: "Señales", descripcion: "No obedecer señales restrictivas (limitaciones o prohibiciones)", articulo: "Art. 53 fracc. II", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 35, tipo: ["auto"], categoria: "Señales", descripcion: "No obedecer la señal de alto, siga o preventiva del semáforo o agente de tránsito", articulo: "Arts. 57 y 59", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 36, tipo: ["auto"], categoria: "Señales", descripcion: "Pasarse las señales rojas o ámbar de los semáforos", articulo: "Art. 90 fracc. XXIV", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 37, tipo: ["auto"], categoria: "Señales", descripcion: "No encender luces direccionales al cambiar de carril o indicar cambio de dirección", articulo: "Art. 83", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 38, tipo: ["auto"], categoria: "Señales", descripcion: "No disminuir velocidad y extremar precauciones al aproximarse a vibradores", articulo: "Art. 55", min: 16, med: 18, max: 20, corralon: false, placa: false },

  // ─── AUTO · ZONAS ESCOLARES Y DISCAPACIDAD ───────────────────────
  { id: 39, tipo: ["auto"], categoria: "Zonas escolares y discapacidad", descripcion: "Circular a más de 20 km/h cerca de escuelas, hospitales, parques o lugares de reunión con concurrencia", articulo: "Arts. 64 y 97 fracc. I", min: 10, med: 13, max: 15, corralon: false, placa: false },
  { id: 40, tipo: ["auto"], categoria: "Zonas escolares y discapacidad", descripcion: "No hacer alto total y ceder el paso a escolares y peatones en museos, hospitales, parques o edificios públicos", articulo: "Art. 97 fracc. II", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 41, tipo: ["auto"], categoria: "Zonas escolares y discapacidad", descripcion: "No ceder el paso a personas adultas mayores, con discapacidad, escolares y niños en intersecciones marcadas, o no mantenerse detenido hasta que terminen de cruzar", articulo: "Art. 94", min: 8, med: 9, max: 10, corralon: false, placa: false },
  { id: 42, tipo: ["auto"], categoria: "Zonas escolares y discapacidad", descripcion: "No disminuir velocidad ni tomar precauciones al encontrar transporte escolar detenido realizando ascenso/descenso", articulo: "Art. 95 fracc. II", min: 10, med: 13, max: 15, corralon: false, placa: false },
  { id: 43, tipo: ["auto"], categoria: "Zonas escolares y discapacidad", descripcion: "No hacer alto total antes de la línea de paso en museos, centros deportivos, hospitales o edificios públicos, obstruyendo el cruce de peatones", articulo: "Art. 97 fracc. II", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── AUTO · CONDUCCIÓN ───────────────────────────────────────────
  { id: 44, tipo: ["auto"], categoria: "Conducción", descripcion: "Levantar o bajar pasaje en lugares no autorizados", articulo: "Art. 90 fracc. IX", min: 50, med: 75, max: 100, corralon: false, placa: false },
  { id: 45, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir sin licencia y/o permiso o sin tarjeta de circulación", articulo: "Art. 90 fracc. III", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 46, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir en estado de ebriedad", articulo: "Arts. 90 fracc. XVII y 118 fracc. VI", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 47, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducir bajo el efecto de drogas o psicotrópicos", articulo: "Arts. 49, 90 fracc. XVI y 118 fracc. VI", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 48, tipo: ["auto"], categoria: "Conducción", descripcion: "Manejar sin precaución o conducir abrazando a una persona u objeto", articulo: "Art. 90 fracc. I", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 49, tipo: ["auto"], categoria: "Conducción", descripcion: "Usar celular o dispositivos de comunicación mientras el vehículo está en movimiento", articulo: "Art. 90 fracc. XXVI", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 50, tipo: ["auto"], categoria: "Conducción", descripcion: "Usar objetos distractores de la conducción (distinto a manos libres o GPS)", articulo: "Art. 90 fracc. XXV", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 51, tipo: ["auto"], categoria: "Conducción", descripcion: "Efectuar carreras o arrancones en vía pública", articulo: "Art. 90 fracc. XXII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 52, tipo: ["auto"], categoria: "Conducción", descripcion: "No contar con póliza de seguro de responsabilidad civil vigente", articulo: "Art. 90 Bis", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 53, tipo: ["auto"], categoria: "Conducción", descripcion: "Insultar, denigrar, golpear o intimidar a agentes de tránsito o a otros usuarios de la vía", articulo: "Art. 60 Bis", min: 30, med: 35, max: 40, corralon: false, placa: false },
  { id: 54, tipo: ["auto"], categoria: "Conducción", descripcion: "Interferir u obstaculizar deliberadamente la circulación de vehículos", articulo: "Art. 62 Bis", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 55, tipo: ["auto"], categoria: "Conducción", descripcion: "Transportar personas en la parte exterior de la carrocería", articulo: "Art. 90 fracc. XXVII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 56, tipo: ["auto"], categoria: "Conducción", descripcion: "Instalar o usar pantallas de video o entretenimiento en parte delantera del vehículo", articulo: "Art. 90 fracc. XXVIII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 57, tipo: ["auto"], categoria: "Conducción", descripcion: "No pagar peaje en casetas de infraestructura vial de cuota", articulo: "Art. 90 fracc. XXIX", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 58, tipo: ["auto"], categoria: "Conducción", descripcion: "Conducción con alcohol ≥ 0.8 g/L en sangre o ≥ 0.4 mg/L en aire espirado", articulo: "Art. 106 Bis", min: null, med: null, max: null, corralon: true, placa: false, arresto: true },

  // ─── AUTO · VELOCIDAD ────────────────────────────────────────────
  { id: 59, tipo: ["auto"], categoria: "Velocidad", descripcion: "Circular a más de 50 km/h dentro de centros de población", articulo: "Art. 64", min: 10, med: 13, max: 15, corralon: false, placa: false },
  { id: 60, tipo: ["auto"], categoria: "Velocidad", descripcion: "No respetar los límites de velocidad señalizados", articulo: "Art. 64 segundo párrafo", min: 10, med: 13, max: 15, corralon: false, placa: false },
  { id: 61, tipo: ["auto"], categoria: "Velocidad", descripcion: "Instalar y usar sistemas antirradar o detector de radares de velocidad", articulo: "Art. 37 Bis", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 62, tipo: ["auto"], categoria: "Velocidad", descripcion: "Remolcar o empujar vehículos automotores sin grúa", articulo: "Art. 38 Bis", min: 8, med: 9, max: 10, corralon: false, placa: false },

  // ─── AUTO · ESTACIONAMIENTO ──────────────────────────────────────
  { id: 63, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en camellones, aceras, andadores, ciclovías o vías peatonales", articulo: "Art. 100 fracc. II", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 64, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en lugares prohibidos", articulo: "Art. 100 fracc. II y XIX", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 65, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Invadir o estacionarse en carril confinado sin conductor presente", articulo: "Arts. 100 y 118 fracc. IV", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 66, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse simulando falla mecánica", articulo: "Art. 101", min: 16, med: 18, max: 20, corralon: false, placa: true },
  { id: 67, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse frente a rampas para grupos vulnerables, hidrantes o salidas de emergencia", articulo: "Art. 100 fracc. XVIII", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 68, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en doble fila o frente a paraderos o bases autorizadas", articulo: "Art. 100 fracc. III", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 69, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse frente a entrada de vehículo ajena al domicilio propio", articulo: "Art. 100 fracc. IV", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 70, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en carreteras, vías de tránsito continuo o carril confinado/contraflujo", articulo: "Art. 100 fracc. XVI", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 71, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en accesos de bomberos, hospitales, instalaciones militares o terminales de transporte", articulo: "Art. 100 fracc. I", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 72, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse en zona de ascenso/descenso de transporte público o frente a escuelas", articulo: "Art. 100 fracc. V", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 73, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse a menos de 100 metros de una curva o cima sin visibilidad", articulo: "Art. 100 fracc. XI", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 74, tipo: ["auto"], categoria: "Estacionamiento", descripcion: "Estacionarse a menos de 5 metros del riel más cercano de un cruce ferroviario", articulo: "Art. 100 fracc. IX", min: 16, med: 18, max: 20, corralon: false, placa: false },

  // ─── AUTO · PLACAS Y DOCUMENTOS ─────────────────────────────────
  { id: 75, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular sin ambas placas", articulo: "Arts. 17, 26 y 118 fracc. II", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 76, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Placas que no coincidan con tarjeta de circulación o calcomanía", articulo: "Arts. 17, 26 y 118 fracc. III", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 77, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular con placas de matriculación vencidas", articulo: "Art. 118 fracc. I", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 78, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Carecer de licencia o permiso para conducir, o tenerla vencida", articulo: "Arts. 41 y 42", min: 16, med: 18, max: 20, corralon: false, placa: true },
  { id: 79, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "Circular con placas extranjeras sin internamiento legal al país", articulo: "Art. 32", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 80, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "No contar con holograma de verificación vigente o circular con restricción ambiental", articulo: "Art. 90 fracc. XV y Art. 124", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 81, tipo: ["auto"], categoria: "Placas y documentos", descripcion: "No portar tarjeta de circulación correspondiente", articulo: "Art. 17 fracc. II", min: 16, med: 18, max: 20, corralon: false, placa: false },

  // ─── AUTO · EQUIPO ───────────────────────────────────────────────
  { id: 82, tipo: ["auto"], categoria: "Equipo", descripcion: "No contar con equipo, sistemas, dispositivos y accesorios de seguridad reglamentarios", articulo: "Art. 34", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 83, tipo: ["auto"], categoria: "Equipo", descripcion: "No usar cinturones de seguridad", articulo: "Art. 90 fracc. IV", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 84, tipo: ["auto"], categoria: "Equipo", descripcion: "Circular con llantas lisas, con roturas o ruedas metálicas o de madera", articulo: "Art. 38", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 85, tipo: ["auto"], categoria: "Equipo", descripcion: "Tener instaladas torretas, faros rojos o sirenas de uso exclusivo policial o de emergencia", articulo: "Art. 37", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 86, tipo: ["auto"], categoria: "Equipo", descripcion: "Cristales obscurecidos que impidan la visibilidad al interior del vehículo", articulo: "Art. 36", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 87, tipo: ["auto"], categoria: "Equipo", descripcion: "No contar con llanta de refacción en condiciones de uso", articulo: "Art. 38", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── MOTO · CASCO Y EQUIPO ───────────────────────────────────────
  { id: 88, tipo: ["moto"], categoria: "Casco y equipo", descripcion: "No usar casco certificado (conductor o acompañante)", articulo: "Art. 89 fraccs. VII y VIII Bis y 118 fracc. XIII", min: 3, med: 4, max: 5, corralon: true, placa: false },
  { id: 89, tipo: ["moto"], categoria: "Casco y equipo", descripcion: "No usar anteojos protectores, chamarra o aditamentos rígidos para extremidades", articulo: "Art. 89 fracc. VIII Bis", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── MOTO · CIRCULACIÓN ──────────────────────────────────────────
  { id: 90, tipo: ["moto"], categoria: "Circulación", descripcion: "Rebasar por el mismo carril o no hacerlo por el lado izquierdo", articulo: "Art. 89 fracc. V Ter", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 91, tipo: ["moto"], categoria: "Circulación", descripcion: "Circular por carriles confinados para transporte público o ciclovías", articulo: "Art. 89 fracc. V y 118 fracc. IV", min: 16, med: 18, max: 20, corralon: true, placa: true },
  { id: 92, tipo: ["moto"], categoria: "Circulación", descripcion: "Realizar maniobras que pongan en peligro vida, integridad o patrimonio de terceros", articulo: "Art. 62 y 89 fracc. V Bis", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 93, tipo: ["moto"], categoria: "Circulación", descripcion: "Transitar sobre aceras o áreas reservadas a peatones", articulo: "Art. 89 fracc. III", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 94, tipo: ["moto"], categoria: "Circulación", descripcion: "Transitar dos o más motos en paralelo en el mismo carril", articulo: "Art. 89 fracc. IV", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 95, tipo: ["moto"], categoria: "Circulación", descripcion: "No usar sistema de alumbrado en la noche o cuando no haya suficiente visibilidad", articulo: "Art. 89 fracc. VI", min: 3, med: 4, max: 5, corralon: false, placa: false },
  { id: 96, tipo: ["moto"], categoria: "Circulación", descripcion: "Asirse o sujetar la moto a otro vehículo en circulación", articulo: "Art. 89 fracc. VIII", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── MOTO · PASAJEROS ────────────────────────────────────────────
  { id: 97, tipo: ["moto"], categoria: "Pasajeros", descripcion: "Transportar niños o adolescentes que no puedan sostenerse solos o apoyar pies en posapiés", articulo: "Art. 89 fracc. XIV y 118 fracc. XIV", min: 16, med: 18, max: 20, corralon: true, placa: false },
  { id: 98, tipo: ["moto"], categoria: "Pasajeros", descripcion: "Transportar pasajero entre el conductor y el manubrio", articulo: "Art. 89 fracc. XIII", min: 16, med: 18, max: 20, corralon: false, placa: false },
  { id: 99, tipo: ["moto"], categoria: "Pasajeros", descripcion: "Viajar más personas de las autorizadas en la tarjeta de circulación", articulo: "Art. 89 fracc. I", min: 3, med: 4, max: 5, corralon: false, placa: false },

  // ─── MOTO · ALCOHOL ──────────────────────────────────────────────
  { id: 100, tipo: ["moto"], categoria: "Alcohol", descripcion: "Conducir moto con alcohol > 0.02 g/dL en sangre o bajo influjo de drogas", articulo: "Art. 106 Quater", min: 16, med: 18, max: 20, corralon: true, placa: true },

  // ─── MOTO · PLACAS Y DOCUMENTOS ─────────────────────────────────
  { id: 101, tipo: ["moto"], categoria: "Placas y documentos", descripcion: "Circular sin placa o con placa vencida", articulo: "Art. 17, 89 fracc. XIV Bis y 118 fracc. II", min: 16, med: 18, max: 20, corralon: true, placa: false },
  { id: 102, tipo: ["moto"], categoria: "Placas y documentos", descripcion: "Carecer de permiso para circular o tenerlo vencido", articulo: "Arts. 18, 89 fracc. XIV Bis y 118 fracc. II", min: 16, med: 18, max: 20, corralon: true, placa: false },

  // ─── MOTO · ESTACIONAMIENTO ──────────────────────────────────────
  { id: 103, tipo: ["moto"], categoria: "Estacionamiento", descripcion: "Estacionarse en aceras, camellones, andadores o vías peatonales", articulo: "Art. 100 fracc. II y 118 fracc. XV", min: 16, med: 18, max: 20, corralon: true, placa: false },

  // ─── CICLISTA ────────────────────────────────────────────────────
  { id: 104, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No obedecer señales e indicaciones de agentes de tránsito", articulo: "Art. 98 fracc. III", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 105, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No respetar señales de semáforos", articulo: "Art. 59", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 106, tipo: ["ciclista"], categoria: "Circulación", descripcion: "No circular con precaución en ciclovías o extrema derecha de la vía", articulo: "Art. 98 fracc. I", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 107, tipo: ["ciclista"], categoria: "Circulación", descripcion: "Transitar sobre aceras o áreas de peatones, o remolcarse de otro vehículo", articulo: "Art. 98 fracc. II", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 108, tipo: ["ciclista"], categoria: "Señales", descripcion: "No obedecer señales preventivas y restrictivas", articulo: "Art. 53 fracc. I y II", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },

  // ─── PEATÓN ──────────────────────────────────────────────────────
  { id: 109, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "No obedecer indicaciones de agentes de tránsito", articulo: "Art. 91", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 110, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Invadir intempestivamente la superficie de rodamiento", articulo: "Art. 92 fracc. V", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 111, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Cruzar frente a vehículos de transporte detenidos no controlados por semáforo", articulo: "Art. 92 fracc. VI", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 112, tipo: ["peatón"], categoria: "Comportamiento", descripcion: "Circular sobre la superficie de rodamiento de vías primarias", articulo: "Art. 92 fracc. I", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 113, tipo: ["peatón"], categoria: "Señales", descripcion: "No respetar señales de semáforos o fijadas en la vía pública", articulo: "Art. 92 fracc. VI", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 114, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar en avenidas de alta densidad fuera de esquinas o zonas marcadas", articulo: "Art. 92 fracc. II", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 115, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar intersecciones sin semáforo sin asegurarse que es seguro", articulo: "Art. 92 fracc. III", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 116, tipo: ["peatón"], categoria: "Cruce", descripcion: "No usar puentes peatonales donde los haya", articulo: "Art. 92 fracc. VIII", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
  { id: 117, tipo: ["peatón"], categoria: "Cruce", descripcion: "Cruzar diagonalmente por cruceros", articulo: "Art. 92 fracc. IX", min: null, med: null, max: null, corralon: false, placa: false, amonestacion: true },
];

// Valor diario de la UMA publicado por INEGI (DOF 09/01/2026), vigente desde el 1 de febrero de 2026.
// Actualizar cada año: https://www.inegi.org.mx/temas/uma/
const UMA = { valor: 117.31, anio: 2026 };

const TIPOS = [
  { id: "todos", label: "Todos", emoji: "🔍" },
  { id: "auto", label: "Auto", emoji: "🚗" },
  { id: "moto", label: "Moto", emoji: "🏍️" },
  { id: "ciclista", label: "Ciclista", emoji: "🚲" },
  { id: "peatón", label: "Peatón", emoji: "🚶" },
];

const pesos = (umas) =>
  (umas * UMA.valor).toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

// Minúsculas y sin acentos, para que "camellon" encuentre "camellón"
const normalizar = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function App() {
  const [tipoActivo, setTipoActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [expandido, setExpandido] = useState(null);

  const resultado = useMemo(() => {
    const terminos = normalizar(busqueda).split(/\s+/).filter(Boolean);
    return infracciones.filter((inf) => {
      const matchTipo = tipoActivo === "todos" || inf.tipo.includes(tipoActivo);
      const texto = normalizar(`${inf.descripcion} ${inf.categoria} ${inf.articulo}`);
      return matchTipo && terminos.every((t) => texto.includes(t));
    });
  }, [tipoActivo, busqueda]);

  // En "Todos" se agrupa también por tipo; si no, "Circulación" mezclaría auto, moto y ciclista
  const categorias = useMemo(() => {
    const cats = {};
    resultado.forEach((inf) => {
      const tipo = TIPOS.find((t) => t.id === inf.tipo[0]);
      const clave = tipoActivo === "todos" ? `${tipo.emoji} ${tipo.label} · ${inf.categoria}` : inf.categoria;
      if (!cats[clave]) cats[clave] = [];
      cats[clave].push(inf);
    });
    return cats;
  }, [resultado, tipoActivo]);

  const cambiarBusqueda = (valor) => { setBusqueda(valor); setExpandido(null); };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e0", padding: "20px 20px 0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🚦</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>Reglamento de Tránsito</h1>
              <div style={{ fontSize: 11, color: "#999", fontWeight: 500 }}>Estado de México · Reforma Nov 2025 · UMA {UMA.anio}: ${UMA.valor}</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#f0f9f0", border: "1px solid #c8e6c9", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>💸</span>
          <span style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>50% de descuento pagando en los primeros 15 días hábiles</span>
        </div>

        <div style={{ position: "relative", marginBottom: 14 }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#aaa" }}>🔎</span>
          <input
            type="search"
            aria-label="Buscar infracción"
            placeholder="Buscar infracción o artículo..."
            value={busqueda}
            onChange={(e) => cambiarBusqueda(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 36px 10px 36px", borderRadius: 10, border: "1.5px solid #e8e6e0", background: "#f7f6f3", fontSize: 16, color: "#1a1a1a", outline: "none", WebkitAppearance: "none" }}
          />
          {busqueda && (
            <button aria-label="Limpiar búsqueda" onClick={() => cambiarBusqueda("")} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#aaa", padding: "4px 8px" }}>×</button>
          )}
        </div>

        <div role="group" aria-label="Tipo de usuario" style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14 }}>
          {TIPOS.map((t) => (
            <button
              key={t.id}
              aria-pressed={tipoActivo === t.id}
              onClick={() => { setTipoActivo(t.id); setExpandido(null); }}
              style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "1.5px solid", borderColor: tipoActivo === t.id ? "#1a1a1a" : "#e0ddd7", background: tipoActivo === t.id ? "#1a1a1a" : "#fff", color: tipoActivo === t.id ? "#fff" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {resultado.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤷</div>
            <div style={{ fontSize: 14 }}>No se encontraron infracciones</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, color: "#999", marginBottom: 16, paddingLeft: 4 }}>
              {resultado.length} {resultado.length === 1 ? "infracción" : "infracciones"}
            </div>
            {Object.entries(categorias).map(([cat, items]) => (
              <section key={cat} style={{ marginBottom: 24 }}>
                <h2 style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", color: "#999", textTransform: "uppercase", paddingLeft: 4 }}>
                  {cat} · {items.length}
                </h2>
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
              </section>
            ))}
          </>
        )}

        <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>💡 Sobre los rangos de multa</strong><br />
            Las multas se expresan en <strong>UMAs</strong> (1 UMA {UMA.anio} = ${UMA.valor}, vigente desde el 1 de febrero). El nivel depende de las infracciones pendientes de pago al momento de la nueva infracción:
            <br />• <strong>Mínima</strong>: sin adeudos pendientes
            <br />• <strong>Media</strong>: 2–3 adeudos pendientes
            <br />• <strong>Máxima</strong>: 4 o más adeudos pendientes
            <br />• <strong>Descuento del 50%</strong> pagando en los primeros 15 días hábiles
            <br /><br />
            Los montos en pesos son aproximados. Consulta informativa; la referencia legal es el Reglamento publicado en la Gaceta del Gobierno del Estado de México.
          </div>
        </div>
      </div>
    </div>
  );
}

function InfraccionCard({ inf, expandido, onToggle }) {
  const tieneMulta = inf.min !== null && !inf.arresto;
  const esArresto = inf.arresto;
  const esAlta = inf.min >= 30;

  const borderColor = expandido ? "#1a1a1a" : esArresto ? "#ffe0b2" : (inf.corralon || inf.placa) ? "#ffd6d6" : "#e8e6e0";
  const bgColor = expandido ? "#fafaf8" : esArresto ? "#fff8f0" : (inf.corralon || inf.placa) ? "#fff5f5" : "#fff";

  return (
    <div style={{ background: bgColor, border: `1.5px solid ${borderColor}`, borderRadius: 12, transition: "all 0.15s" }}>
      <button
        onClick={onToggle}
        aria-expanded={expandido}
        style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%", padding: 14, background: "none", border: "none", textAlign: "left", font: "inherit", cursor: "pointer", borderRadius: 12 }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4, marginBottom: 6 }}>{inf.descripcion}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {tieneMulta && (
              <span style={{ fontSize: 12, fontWeight: 700, color: esAlta ? "#b71c1c" : "#1a1a1a", background: esAlta ? "#ffebee" : "#f0ede6", padding: "2px 8px", borderRadius: 6 }}>
                {inf.min}–{inf.max} UMAs · {pesos(inf.min)}–{pesos(inf.max)}
              </span>
            )}
            {esArresto && (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e65100", background: "#fff3e0", padding: "2px 8px", borderRadius: 6 }}>
                🚔 12–36 hrs arresto
              </span>
            )}
            {inf.amonestacion && (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#6b7c4a", background: "#f0f4e8", padding: "2px 8px", borderRadius: 6 }}>
                Amonestación
              </span>
            )}
            {inf.corralon && (
              <span style={{ fontSize: 11, fontWeight: 600, color: "#c0392b", background: "#ffeaea", padding: "2px 8px", borderRadius: 6 }}>
                🔒 Corralón
              </span>
            )}
            {inf.placa && (
              <span style={{ fontSize: 11, fontWeight: 600, color: "#8e44ad", background: "#f5eafb", padding: "2px 8px", borderRadius: 6 }}>
                🪪 Retiro de placa
              </span>
            )}
          </div>
        </div>
        <div aria-hidden="true" style={{ fontSize: 12, color: "#bbb", transition: "transform 0.15s", transform: expandido ? "rotate(180deg)" : "rotate(0deg)", marginTop: 2 }}>▾</div>
      </button>

      {expandido && (
        <div style={{ margin: "0 14px 14px", paddingTop: 12, borderTop: "1px solid #e8e6e0", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>📋 {inf.articulo}</div>
          {tieneMulta && (
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Mínima", val: inf.min, color: "#e8f4ea", text: "#2e7d32" },
                { label: "Media", val: inf.med, color: "#fff8e1", text: "#b45309" },
                { label: "Máxima", val: inf.max, color: "#fce4ec", text: "#c62828" },
              ].map((r) => (
                <div key={r.label} style={{ flex: 1, background: r.color, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: r.text, fontWeight: 600 }}>{r.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: r.text }}>{r.val}</div>
                  <div style={{ fontSize: 10, color: r.text, opacity: 0.8 }}>UMAs</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: r.text, marginTop: 4 }}>{pesos(r.val)}</div>
                  <div style={{ fontSize: 10, color: r.text, opacity: 0.8 }}>{pesos(r.val / 2)} con 50%</div>
                </div>
              ))}
            </div>
          )}
          {esArresto && (
            <div style={{ background: "#fff3e0", border: "1px solid #ffe0b2", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, color: "#e65100", fontWeight: 600, marginBottom: 4 }}>🚔 Sanción especial: arresto inconmutable</div>
              <div style={{ fontSize: 11, color: "#bf360c" }}>De 12 a 36 horas según concentración de alcohol reportada. Procede retención del vehículo. En caso de reincidencia, inscripción obligatoria en programa de rehabilitación.</div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <MedidaBadge activa={inf.corralon} icono="🔒" label="Corralón" colores={{ borde: "#ffd6d6", fondo: "#fff0f0", texto: "#c0392b" }} />
            <MedidaBadge activa={inf.placa} icono="🪪" label="Retiro de placa" colores={{ borde: "#e8d5f7", fondo: "#f9f0ff", texto: "#8e44ad" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function MedidaBadge({ activa, icono, label, colores }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px", borderRadius: 8, border: "1.5px solid", borderColor: activa ? colores.borde : "#e8e6e0", background: activa ? colores.fondo : "#f7f6f3" }}>
      <span style={{ fontSize: 14, opacity: activa ? 1 : 0.3 }}>{icono}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: activa ? colores.texto : "#bbb", textDecoration: activa ? "none" : "line-through" }}>{label}</span>
    </div>
  );
}
