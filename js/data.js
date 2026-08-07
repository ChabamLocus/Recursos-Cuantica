/* ============================================================
   DATA.JS — Fuente única de datos del sitio
   Curso: Quinta Escuela de Cómputo Cuántico (LAPI UNAM)
   ------------------------------------------------------------
   Para actualizar el sitio, solo edita los arrays de este
   archivo. No es necesario tocar HTML ni la lógica en app.js.
   ============================================================ */


/* ------------------------------------------------------------
   0. INFORMACIÓN GENERAL DEL SITIO
   ------------------------------------------------------------ */
const infoSitio = {
  titulo: "Recursos — Quinta Escuela de Cómputo Cuántico",
  mensajeBienvenida:
    "Este espacio reúne no solo los recursos oficiales del curso, sino también " +
    "todo el material compartido por la comunidad, los asesores y los ponentes: " +
    "guías, artículos, herramientas y grabaciones para acompañar tu aprendizaje " +
    "en cómputo cuántico.",
};

// Link independiente, solo visible en el footer (no es una "caja" de navegación)
const iniciativas = {
  nombre: "Iniciativas",
  url: "https://dicu.com.mx",
};


/* ------------------------------------------------------------
   1. MEDIOS OFICIALES
   ------------------------------------------------------------ */
const mediosOficiales = [
  {
    id: "OFI-01",
    nombre: "Página LAPI UNAM",
    descripcion: "Sitio del Laboratorio de Análisis y Procesamiento de Información Cuántica.",
    url: "https://lapi.unam.mx/",
  },
  {
    id: "OFI-02",
    nombre: "Página web Oficial",
    descripcion: "Sitio oficial de la Escuela de Cómputo Cuántico.",
    url: "https://www.cuantico.unam.mx/",
  },
  {
    id: "OFI-03",
    nombre: "Repositorio Oficial",
    descripcion: "Repositorio en GitHub con material de la Quinta Escuela.",
    url: "https://github.com/LAPI-UNAM/quinta_escuela_de_computo_cuantico",
  },
  {
    id: "OFI-04",
    nombre: "Canal de Retransmisiones",
    descripcion: "Canal de YouTube con las transmisiones en vivo y grabaciones del curso.",
    url: "https://www.youtube.com/@canal_lapi",
  },
];


/* ------------------------------------------------------------
   2. SEMANA DE CURSO
   ------------------------------------------------------------
   Estructura pensada para 7 días. Los días 5, 6 y 7 se dejan
   como "próximamente" hasta tener archivos reales.
   tipo: "notebook" | "pdf"
   Placeholder de ruta: reemplazar cuando subas los archivos a
   /assets/dia{N}/
   ------------------------------------------------------------ */
const semanaCurso = [
  {
    dia: 1,
    disponible: true,
    archivos: [
      { nombre: "CC_UNAM_01_Introducción.ipynb", tipo: "notebook", tema: "Introducción", ruta: "assets/dia1/CC_UNAM_01_Introduccion.ipynb" },
      { nombre: "CC_UNAM_01_Aplicaciones.ipynb", tipo: "notebook", tema: "Aplicaciones", ruta: "assets/dia1/CC_UNAM_01_Aplicaciones.ipynb" },
      { nombre: "T11 - Tecnologías cuánticas.pdf", tipo: "pdf", tema: "Tecnologías cuánticas", ruta: "assets/dia1/T11-Tecnologias-cuanticas.pdf" },
      { nombre: "T1213 - Sistemas cuánticos para computación.pdf", tipo: "pdf", tema: "Sistemas cuánticos", ruta: "assets/dia1/T1213-Sistemas-cuanticos-para-computacion.pdf" },
      { nombre: "T2 - Día 1.pdf", tipo: "pdf", tema: "General", ruta: "assets/dia1/T2-Dia1.pdf" },
    ],
  },
  {
    dia: 2,
    disponible: true,
    archivos: [
      { nombre: "CC_UNAM_02_Pilares_Cuántica.ipynb", tipo: "notebook", tema: "Pilares de la cuántica", ruta: "assets/dia2/CC_UNAM_02_Pilares_Cuantica.ipynb" },
      { nombre: "CC_UNAM_02_Sistemas_Multi_Qubits.ipynb", tipo: "notebook", tema: "Sistemas multi-qubit", ruta: "assets/dia2/CC_UNAM_02_Sistemas_Multi_Qubits.ipynb" },
      { nombre: "T2 - Día 2.pdf", tipo: "pdf", tema: "General", ruta: "assets/dia2/T2-Dia2.pdf" },
    ],
  },
  {
    dia: 3,
    disponible: true,
    archivos: [
      { nombre: "CC_UNAM_03_Algoritmos_Cuánticos_I.ipynb", tipo: "notebook", tema: "Algoritmos cuánticos I", ruta: "assets/dia3/CC_UNAM_03_Algoritmos_Cuanticos_I.ipynb" },
      { nombre: "CC_UNAM_03_Aritmética_Comunicación.ipynb", tipo: "notebook", tema: "Aritmética y comunicación", ruta: "assets/dia3/CC_UNAM_03_Aritmetica_Comunicacion.ipynb" },
      { nombre: "T3-Dia3(ImplementacionDeFunciones).pdf", tipo: "pdf", tema: "Implementación de funciones", ruta: "assets/dia3/T3-Dia3-ImplementacionDeFunciones.pdf" },
      { nombre: "T31 - Implementaciones físicas.pdf", tipo: "pdf", tema: "Implementaciones físicas", ruta: "assets/dia3/T31-Implementaciones-fisicas.pdf" },
      { nombre: "T32 - Día 3.pdf", tipo: "pdf", tema: "General", ruta: "assets/dia3/T32-Dia3.pdf" },
    ],
  },
  {
    dia: 4,
    disponible: true,
    archivos: [
      { nombre: "CC_UNAM_04_Algoritmos_Cuánticos_II.ipynb", tipo: "notebook", tema: "Algoritmos cuánticos II", ruta: "assets/dia4/CC_UNAM_04_Algoritmos_Cuanticos_II.ipynb" },
      { nombre: "CC_UNAM_04_Optimización_Cuántica.ipynb", tipo: "notebook", tema: "Optimización cuántica", ruta: "assets/dia4/CC_UNAM_04_Optimizacion_Cuantica.ipynb" },
    ],
  },
  { dia: 5, disponible: false, archivos: [] },
  { dia: 6, disponible: false, archivos: [] },
  { dia: 7, disponible: false, archivos: [] },
];


/* ------------------------------------------------------------
   3. PONENTES
   ------------------------------------------------------------
   Solo guardan identidad + referencias (recursosRef) a los IDs
   reales que viven en el array `recursos` más abajo. Así el
   recurso nunca se duplica.
   ------------------------------------------------------------ */
const ponentes = [
  {
    id: "MARTA",
    nombre: "Marta Isabel Moreno Babuglia",
    correo: null, // no proporcionado en el documento fuente
    recursosRef: ["PON-MARTA-01", "PON-MARTA-02", "PON-MARTA-03"],
  },
  {
    id: "BALDE",
    nombre: "Bambordé Baldé",
    correo: "bbalde@zaikugroup.com",
    recursosRef: ["PON-BALDE-01"],
  },
  {
    id: "ALEJANDRO",
    nombre: "Alejandro Kunold Bellos",
    correo: "akb@azc.uam.mx",
    recursosRef: ["PON-ALEJANDRO-01", "PON-ALEJANDRO-02", "PON-ALEJANDRO-03"],
  },
  {
    id: "ISABEL",
    nombre: "Isabel Pedraza Morales",
    correo: "isabel.pedraza@correo.buap.mx",
    recursosRef: ["PON-ISABEL-01"],
  },
];


/* ------------------------------------------------------------
   4. RECURSOS — fuente única de verdad, por tema
   ------------------------------------------------------------
   tipo: "pdf" | "link" | "video" | "paper" | "libro" | "playlist"
   categorias: array (un recurso puede vivir en 2 subcategorías
               sin duplicarse, ej. papers de VQE)
   ponenteRef: id del ponente si aplica, si no null
   enlaces: array de { etiqueta, url } — normalmente 1, pero
            algunos recursos tienen más de una opción (ej. libro
            con versión gratuita + lugar de compra)
   ------------------------------------------------------------ */

const CAT = {
  FUNDAMENTOS: "Fundamentos de Computación Cuántica",
  ALGORITMOS: "Algoritmos Cuánticos",
  QUIMICA: "Química y Simulación Cuántica",
  HARDWARE: "Hardware y Qubits",
  FRAMEWORKS: "Frameworks y Herramientas",
  SEGURIDAD: "Comunicación y Seguridad",
  COMUNIDAD: "Recursos Complementarios y Comunidad",
};

const recursos = [

  /* ---- FUNDAMENTOS DE COMPUTACIÓN CUÁNTICA ---- */
  {
    id: "REC-IBM-LEARN-01",
    titulo: "Learn Quantum Computing",
    autor: "IBM Quantum",
    tipo: "link",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Plataforma educativa oficial de IBM para aprender cómputo cuántico desde cero.",
    enlaces: [{ etiqueta: "Abrir curso", url: "https://quantum.cloud.ibm.com/learning/en" }],
  },
  {
    id: "REC-QUDIT-01",
    titulo: "Qudit",
    autor: "QuEra / arXiv",
    tipo: "link",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Definición de qudit y su generalización del concepto de qubit, con artículo técnico de referencia.",
    enlaces: [
      { etiqueta: "Glosario QuEra", url: "https://www.quera.com/glossary/qudit" },
      { etiqueta: "Artículo (arXiv)", url: "https://arxiv.org/pdf/2008.00959" },
    ],
  },
  {
    id: "REC-LOREDO-01",
    titulo: "Learn Quantum Computing with Python and IBM Quantum Experience",
    autor: "Robert Loredo",
    tipo: "libro",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Libro sugerido por la comunidad para aprender cómputo cuántico de forma práctica con Python.",
    enlaces: [{ etiqueta: "Descargar PDF", url: "https://dl.icdst.org/pdfs/files4/ba8b54c48a2bfc9a29a6edba17044779.pdf" }],
  },
  {
    id: "REC-BERNHARDT-01",
    titulo: "Quantum Computing for Everyone",
    autor: "Chris Bernhardt",
    tipo: "libro",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Libro introductorio sugerido por la comunidad, orientado a un público amplio.",
    enlaces: [{
      etiqueta: "Descargar PDF",
      url: "https://github.com/shyamsantoki/Qubit_Quantuam-Computing_Notes/blob/main/Quantum%20computing%20for%20everyone%20by%20Bernhardt%2C%20Chris%20(z-lib.org).pdf",
    }],
  },
  {
    id: "REC-KASIRAJAN-01",
    titulo: "Fundamentals of Quantum Computing",
    autor: "Venkateswaran Kasirajan",
    tipo: "libro",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Libro sugerido por la comunidad. Springer, 2021.",
    anio: 2021,
    // Placeholder: reemplazar cuando subas el archivo a /assets/recursos/
    enlaces: [{ etiqueta: "Descargar PDF", url: "assets/recursos/Fundamentals_of_Quantum_Computing_Theory.pdf" }],
  },
  {
    id: "REC-NIELSEN-CHUANG-01",
    titulo: "Quantum Computation and Quantum Information",
    autor: "M. A. Nielsen, I. L. Chuang",
    tipo: "libro",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Edición de aniversario (10th anniversary edition), Cambridge University Press, 2010. Referencia clásica del área.",
    anio: 2010,
    enlaces: [{
      etiqueta: "Descargar PDF",
      url: "https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf",
    }],
  },
  {
    id: "REC-MEDICION-01",
    titulo: "Matriz de Medición",
    autor: null,
    tipo: "pdf",
    categorias: [CAT.FUNDAMENTOS],
    ponenteRef: null,
    descripcion: "Material sobre matrices de medición en sistemas cuánticos.",
    // Coloca el archivo "Medición.pdf" (tal cual, con acento) dentro de /assets/recursos/
    enlaces: [{ etiqueta: "Descargar PDF", url: "assets/recursos/Medición.pdf" }],
  },

  /* ---- ALGORITMOS CUÁNTICOS ---- */
  {
    id: "REC-ALGOZOO-01",
    titulo: "Quantum Algorithm Zoo",
    autor: null,
    tipo: "link",
    categorias: [CAT.ALGORITMOS],
    ponenteRef: null,
    descripcion: "Catálogo exhaustivo de algoritmos cuánticos conocidos, mantenido por la comunidad académica.",
    enlaces: [{ etiqueta: "Explorar catálogo", url: "https://quantumalgorithmzoo.org/" }],
  },
  {
    id: "REC-GROVER-01",
    titulo: "Grover Quantum Algorithm: Applications and Limits",
    autor: null,
    tipo: "paper",
    categorias: [CAT.ALGORITMOS],
    ponenteRef: null,
    descripcion: "Artículo sobre las aplicaciones y límites del algoritmo de Grover.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://www.mdpi.com/2673-8392/6/4/89" }],
  },
  {
    id: "REC-VQE-SCF-01",
    titulo: "El método de campo autoconsistente del solucionador cuántico variacional dentro de un marco integrado polarizable",
    autor: null,
    tipo: "paper",
    categorias: [CAT.ALGORITMOS, CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo técnico sobre el método SCF del VQE en un marco integrado polarizable.",
    enlaces: [{
      etiqueta: "Leer artículo",
      url: "https://pubs.aip.org/aip/jcp/article-abstract/160/12/124114/3279486/The-variational-quantum-eigensolver-self?redirectedFrom=fulltext",
    }],
  },
  {
    id: "REC-LI-BAND-01",
    titulo: "A Quantum Algorithm to Calculate Band Structure at the EOM-ADAPT-VQE Level",
    autor: "Li, Y. et al.",
    tipo: "paper",
    categorias: [CAT.ALGORITMOS, CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Algoritmo cuántico para el cálculo de estructura de bandas al nivel EOM-ADAPT-VQE.",
    anio: 2022,
    enlaces: [{ etiqueta: "Leer artículo (arXiv)", url: "https://arxiv.org/abs/2109.01318" }],
  },
  {
    id: "REC-PERUZZO-VQE-01",
    titulo: "A variational eigenvalue solver on a photonic quantum processor",
    autor: "Peruzzo, A. et al.",
    tipo: "paper",
    categorias: [CAT.ALGORITMOS, CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo fundacional sobre el solucionador de autovalores variacional (VQE) implementado en un procesador cuántico fotónico. Nature Communications.",
    anio: 2014,
    enlaces: [{ etiqueta: "Leer artículo", url: "https://www.nature.com/articles/ncomms5213" }],
  },

  /* ---- QUÍMICA Y SIMULACIÓN CUÁNTICA ---- */
  {
    id: "REC-MATTERLAB-01",
    titulo: "The Matter Lab: Propiedades Moleculares con Computación Cuántica",
    autor: null,
    tipo: "link",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Laboratorio de investigación enfocado en propiedades moleculares mediante cómputo cuántico.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://www.matter.toronto.edu/" }],
  },
  {
    id: "REC-QUIMCOMP-01",
    titulo: "Introducción a la química computacional",
    autor: "Dr. Gabriel Cuevas y Dr. Fernando Cortés",
    tipo: "libro",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Libro recomendado por la comunidad. La versión gratuita disponible es de calidad reducida; también se incluye el link de compra de la edición impresa.",
    enlaces: [
      { etiqueta: "Versión gratuita (calidad reducida)", url: "https://es.scribd.com/document/458788698/Introduccion-a-La-Quimica-Computacional-Cuevas-Cortes" },
      { etiqueta: "Comprar libro", url: "https://www.buscalibre.com.mx/libro-introduccion-a-la-quimica-computacional/9789681671051/p/1036987" },
    ],
  },
  {
    id: "REC-SIMQUIM-IBM-01",
    titulo: "Simulación Química",
    autor: "IBM Quantum",
    tipo: "link",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Guía de IBM sobre el flujo de trabajo (workflow) para simulación química usando templates de funciones.",
    enlaces: [{ etiqueta: "Ver guía", url: "https://quantum.cloud.ibm.com/docs/en/guides/function-template-chemistry-workflow" }],
  },
  {
    id: "REC-TAUTOMERO-01",
    titulo: "Simulación cuántica de predicción del estado tautomérico preferido",
    autor: null,
    tipo: "paper",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo publicado en npj Quantum Information sobre predicción de estados tautoméricos mediante simulación cuántica.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://www.nature.com/articles/s41534-023-00767-9" }],
  },
  {
    id: "REC-FERMIONIC-01",
    titulo: "Fermionic quantum computation",
    autor: "Bravyi, S. B. & Kitaev, A. Y.",
    tipo: "paper",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo clásico sobre cómputo cuántico fermiónico. Publicado en Annals of Physics.",
    anio: 2002,
    enlaces: [{ etiqueta: "Leer artículo (arXiv)", url: "https://arxiv.org/abs/quant-ph/0003137" }],
  },
  {
    id: "REC-BASF-QUTAC-01",
    titulo: "How quantum computing can help develop chemical catalysts",
    autor: "BASF / QUTAC",
    tipo: "link",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo mencionado en la sección de preguntas sobre aplicaciones del cómputo cuántico en catálisis química.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://www.qutac.de/en/basf-how-quantum-computing-can-help-develop-chemical-catalysts/" }],
  },
  {
    id: "REC-BASF-RND-01",
    titulo: "How We Innovate — Quantum Computing en R&D",
    autor: "BASF",
    tipo: "link",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Página oficial de BASF sobre digitalización e innovación con cómputo cuántico en investigación y desarrollo.",
    enlaces: [{
      etiqueta: "Visitar sitio",
      url: "https://www.basf.com/global/en/who-we-are/innovation/how-we-innovate/our-RnD/Digitalization_in_R-D/quantum_computing",
    }],
  },
  {
    id: "REC-ACS-CATALYSIS-01",
    titulo: "Modeling Heterogeneous Catalysis Using Quantum Computing",
    autor: null,
    tipo: "paper",
    categorias: [CAT.QUIMICA],
    ponenteRef: null,
    descripcion: "Artículo mencionado en la sección de preguntas sobre modelado de catálisis heterogénea con cómputo cuántico.",
    enlaces: [{
      etiqueta: "Leer artículo",
      url: "https://pubs.acs.org/jcisd8/article/65/2/472/3686393/Modeling-Heterogeneous-Catalysis-Using-Quantum",
    }],
  },

  /* ---- HARDWARE Y QUBITS ---- */
  {
    id: "REC-SUPERCOND-01",
    titulo: "Superconducting Qubits",
    autor: "PennyLane",
    tipo: "link",
    categorias: [CAT.HARDWARE],
    ponenteRef: null,
    descripcion: "Tutorial de PennyLane sobre qubits superconductores.",
    enlaces: [{ etiqueta: "Ver tutorial", url: "https://pennylane.ai/demos/tutorial_sc_qubits" }],
  },
  {
    id: "REC-SPINQUBITS-01",
    titulo: "Spin Qubits",
    autor: "IBM Quantum",
    tipo: "link",
    categorias: [CAT.HARDWARE],
    ponenteRef: null,
    descripcion: "Artículo del blog de IBM sobre qubits de espín.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://www.ibm.com/quantum/blog/spin-qubits" }],
  },
  {
    id: "REC-MAGQUBITS-01",
    titulo: "Making Qubits from Magnetic Molecules",
    autor: null,
    tipo: "link",
    categorias: [CAT.HARDWARE],
    ponenteRef: null,
    descripcion: "Artículo de Physics Today sobre la creación de qubits a partir de moléculas magnéticas.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://physicstoday.aip.org/features/making-qubits-from-magnetic-molecules" }],
  },
  {
    id: "REC-MAGQUBITS-02",
    titulo: "Artículo relacionado con qubits magnéticos",
    autor: null,
    tipo: "paper",
    categorias: [CAT.HARDWARE],
    ponenteRef: null,
    descripcion: "Artículo académico complementario sobre qubits magnéticos, indexado en el Astrophysics Data System.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://ui.adsabs.harvard.edu/abs/2001Nanot..12..181T/abstract" }],
  },

  /* ---- FRAMEWORKS Y HERRAMIENTAS ---- */
  {
    id: "REC-QISKIT-01",
    titulo: "Qiskit",
    autor: "IBM Quantum",
    tipo: "link",
    categorias: [CAT.FRAMEWORKS],
    ponenteRef: null,
    descripcion: "Framework open-source de IBM para programar computadoras cuánticas.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://www.ibm.com/quantum/qiskit" }],
  },
  {
    id: "REC-PENNYLANE-01",
    titulo: "PennyLane",
    autor: null,
    tipo: "link",
    categorias: [CAT.FRAMEWORKS],
    ponenteRef: null,
    descripcion: "Framework para computación cuántica diferenciable y machine learning cuántico.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://pennylane.ai/" }],
  },
  {
    id: "REC-CIRQ-01",
    titulo: "Cirq",
    autor: "Google Quantum AI",
    tipo: "link",
    categorias: [CAT.FRAMEWORKS],
    ponenteRef: null,
    descripcion: "Framework de Google para escribir, manipular y ejecutar circuitos cuánticos.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://quantumai.google/cirq" }],
  },
  {
    id: "REC-CUDAQ-01",
    titulo: "CUDA-Q",
    autor: "NVIDIA",
    tipo: "link",
    categorias: [CAT.FRAMEWORKS],
    ponenteRef: null,
    descripcion: "Plataforma de NVIDIA para computación cuántica híbrida (GPU + QPU).",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://developer.nvidia.com/cuda-q?size=n_6_n&sort-field=featured&sort-direction=desc" }],
  },

  /* ---- COMUNICACIÓN Y SEGURIDAD ---- */
  {
    id: "PON-BALDE-01",
    titulo: "Zero-Knowledge Proof",
    autor: null,
    tipo: "link",
    categorias: [CAT.SEGURIDAD],
    ponenteRef: "BALDE",
    descripcion: "Introducción a las pruebas de conocimiento cero (Zero-Knowledge Proofs) y sus aplicaciones.",
    enlaces: [{ etiqueta: "Leer artículo", url: "https://blogs.uoc.edu/informatica/es/zero-knowledge-proofs/" }],
  },

  /* ---- RECURSOS COMPLEMENTARIOS Y COMUNIDAD ---- */
  {
    id: "PON-ISABEL-01",
    titulo: "Recomendación para Proyectos — Google Summer of Code",
    autor: null,
    tipo: "link",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "ISABEL",
    descripcion: "Recomendación de Isabel Pedraza Morales para quienes buscan proyectos de código abierto en los que participar.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://summerofcode.withgoogle.com/" }],
  },
  {
    id: "PON-ALEJANDRO-01",
    titulo: "Quantum Computing since Democritus",
    autor: "Scott Aaronson",
    tipo: "libro",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "ALEJANDRO",
    descripcion: "Libro recomendado por Alejandro Kunold Bellos.",
    enlaces: [{
      etiqueta: "Descargar PDF",
      url: "https://s3.amazonaws.com/arena-attachments/958521/7c581f75f258e9c36788c60cf45f3961.pdf?1491247031",
    }],
  },
  {
    id: "PON-ALEJANDRO-02",
    titulo: "Canal de YouTube",
    autor: "Alejandro Kunold Bellos",
    tipo: "video",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "ALEJANDRO",
    descripcion: "Canal personal de YouTube de Alejandro Kunold Bellos.",
    enlaces: [{ etiqueta: "Ver canal", url: "https://www.youtube.com/@alejandrokunoldbello2231" }],
  },
  {
    id: "PON-ALEJANDRO-03",
    titulo: "Cómputo Cuántico — Playlist",
    autor: "Alejandro Kunold Bellos",
    tipo: "playlist",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "ALEJANDRO",
    descripcion: "Serie de videos sobre cómputo cuántico compartida por Alejandro Kunold Bellos.",
    enlaces: [{
      etiqueta: "Ver playlist",
      url: "https://www.youtube.com/watch?v=W2GNfktJJoU&list=PLjxJ-S12oTd5jTTAsQUoWqNT60uXOAtRW",
    }],
  },
  {
    id: "PON-MARTA-01",
    titulo: "Video introductorio 1",
    autor: null,
    tipo: "video",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "MARTA",
    descripcion: "Video introductorio compartido por Marta Isabel Moreno Babuglia.",
    enlaces: [{ etiqueta: "Ver video", url: "https://www.youtube.com/watch?v=Z_HMdviOYzc" }],
  },
  {
    id: "PON-MARTA-02",
    titulo: "Video introductorio 2",
    autor: null,
    tipo: "video",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "MARTA",
    descripcion: "Video introductorio compartido por Marta Isabel Moreno Babuglia.",
    enlaces: [{ etiqueta: "Ver video", url: "https://www.youtube.com/watch?v=8wl8d9vCjco" }],
  },
  {
    id: "PON-MARTA-03",
    titulo: "¿Por qué se usa PSI?",
    autor: null,
    tipo: "link",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: "MARTA",
    descripcion: "Discusión sobre el origen del uso de la letra griega Psi (Ψ) para representar la función de onda.",
    enlaces: [{
      etiqueta: "Ver discusión",
      url: "https://hsm.stackexchange.com/questions/15822/why-was-the-greek-letter-psi-%CE%A8-chosen-to-represent-the-wave-function",
    }],
  },
  {
    id: "REC-MEXICO-QC-01",
    titulo: "México y la computación cuántica",
    autor: null,
    tipo: "pdf",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: null,
    descripcion: "Documento sobre el panorama de la computación cuántica en México.",
    enlaces: [{ etiqueta: "Ver documento", url: "https://drive.google.com/file/d/1HbdKvTa_y7GWRc967F6qmQmCbjJ586lj/view" }],
  },
  {
    id: "REC-HACKATON-BUAP-01",
    titulo: "Hackathon BUAP",
    autor: null,
    tipo: "link",
    categorias: [CAT.COMUNIDAD],
    ponenteRef: null,
    descripcion: "Página del Hackathon de cómputo cuántico organizado por la BUAP.",
    enlaces: [{ etiqueta: "Visitar sitio", url: "https://oqi-hackaton.buap.mx/" }],
  },
];


/* ------------------------------------------------------------
   EXPORTS (si en Fase 3 se usa como módulo ES6; si se usa como
   script clásico, estas variables ya quedan disponibles de
   forma global y esta sección puede eliminarse)
   ------------------------------------------------------------ */
// export { infoSitio, iniciativas, mediosOficiales, semanaCurso, ponentes, recursos, CAT };
