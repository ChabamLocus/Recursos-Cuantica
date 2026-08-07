/* ============================================================
   APP.JS — Routing por hash, render de vistas, filtros y modal
   Depende de las variables globales definidas en data.js
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Utilidades ---------------- */

  const $page = document.getElementById("page");
  const $breadcrumb = document.getElementById("breadcrumb");
  const $searchInput = document.getElementById("searchInput");
  const $modalOverlay = document.getElementById("modalOverlay");
  const $modalContent = document.getElementById("modalContent");

  const catEntries = Object.entries(CAT); // [ [KEY, "Nombre"], ... ]
  const slugByName = {};
  const nameBySlug = {};
  catEntries.forEach(([key, name]) => {
    const slug = key.toLowerCase();
    slugByName[name] = slug;
    nameBySlug[slug] = name;
  });
  const catOrderSlugs = catEntries.map(([key]) => key.toLowerCase());

  const tipoDefs = {
    pdf: { label: "PDF", icon: "file-text" },
    link: { label: "Enlace", icon: "link" },
    video: { label: "Video", icon: "play-circle" },
    paper: { label: "Paper", icon: "file-text" },
    libro: { label: "Libro", icon: "book-open" },
    playlist: { label: "Playlist", icon: "list-video" },
    notebook: { label: "Notebook", icon: "code" },
  };

  function esc(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isLocalFile(url) {
    return url && url.indexOf("assets/") === 0;
  }

  function icons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function ponenteById(id) {
    return ponentes.find((p) => p.id === id) || null;
  }

  function recursoById(id) {
    return recursos.find((r) => r.id === id) || null;
  }

  /* ---------------- Breadcrumb ---------------- */

  function setBreadcrumb(items) {
    // items: [{label, href}] — el último sin href se muestra como actual
    const html = items
      .map((item, i) => {
        const isLast = i === items.length - 1;
        const sep = i > 0 ? '<i data-lucide="chevron-right" class="sep" style="width:13px;height:13px;"></i>' : "";
        if (isLast || !item.href) {
          return `${sep}<span class="current">${esc(item.label)}</span>`;
        }
        return `${sep}<a href="${item.href}">${esc(item.label)}</a>`;
      })
      .join("");
    $breadcrumb.innerHTML = html;
  }

  /* ---------------- Componentes reutilizables ---------------- */

  function backButtonHTML(href, label) {
    return `<button class="back-btn" data-goto="${href}">
      <i data-lucide="arrow-left"></i>${esc(label || "Regresar")}
    </button>`;
  }

  function stepperHTML({ prevHref, nextHref, prevDisabled, nextDisabled, label }) {
    return `
      <div class="stepper">
        <button ${prevDisabled ? "disabled" : ""} data-goto="${prevHref || ""}" aria-label="Anterior">
          <i data-lucide="chevron-left"></i>
        </button>
        <span class="label">${esc(label)}</span>
        <button ${nextDisabled ? "disabled" : ""} data-goto="${nextHref || ""}" aria-label="Siguiente">
          <i data-lucide="chevron-right"></i>
        </button>
      </div>`;
  }

  function tipoBadgeHTML(tipo) {
    const def = tipoDefs[tipo] || { label: tipo, icon: "file" };
    return `<span class="type-badge tipo-${esc(tipo)}"><i data-lucide="${def.icon}"></i>${esc(def.label)}</span>`;
  }

  function resourceCardHTML(r) {
    const def = tipoDefs[r.tipo] || { label: r.tipo, icon: "file" };
    return `
      <button class="resource-card" data-open-resource="${esc(r.id)}">
        <div class="top-row">
          ${tipoBadgeHTML(r.tipo)}
        </div>
        <h4>${esc(r.titulo)}</h4>
        ${r.autor ? `<div class="autor">${esc(r.autor)}${r.anio ? " · " + r.anio : ""}</div>` : ""}
        ${r.descripcion ? `<p class="desc">${esc(r.descripcion)}</p>` : ""}
        <div class="foot">
          <span>Ver detalle</span>
          <i data-lucide="arrow-up-right"></i>
        </div>
      </button>`;
  }

  function emptyStateHTML(msg) {
    return `
      <div class="empty-state">
        <i data-lucide="search-x"></i>
        <p>${esc(msg)}</p>
      </div>`;
  }

  /* ---------------- Vistas ---------------- */

  function renderHome() {
    setBreadcrumb([{ label: "Inicio" }]);
    $page.innerHTML = `
      <section class="hero">
        <span class="eyebrow">Quinta Escuela de Cómputo Cuántico</span>
        <h1>${esc(infoSitio.titulo.replace("Recursos — ", ""))}</h1>
        <p>${esc(infoSitio.mensajeBienvenida)}</p>
      </section>
      <div class="category-grid">
        <a class="cat-card c-oficiales" href="#/oficiales">
          <span class="icon-wrap"><i data-lucide="landmark"></i></span>
          <div>
            <h3>Medios Oficiales</h3>
            <p>Los canales y sitios que el curso proporciona directamente.</p>
          </div>
          <span class="count">${mediosOficiales.length} enlaces</span>
        </a>
        <a class="cat-card c-semana" href="#/semana">
          <span class="icon-wrap"><i data-lucide="calendar-days"></i></span>
          <div>
            <h3>Semana de Curso</h3>
            <p>Material por día: notebooks, presentaciones y lecturas.</p>
          </div>
          <span class="count">${semanaCurso.filter((d) => d.disponible).length} días disponibles</span>
        </a>
        <a class="cat-card c-ponentes" href="#/ponentes">
          <span class="icon-wrap"><i data-lucide="users"></i></span>
          <div>
            <h3>Ponentes</h3>
            <p>Quiénes compartieron el material y cómo contactarles.</p>
          </div>
          <span class="count">${ponentes.length} ponentes</span>
        </a>
        <a class="cat-card c-recursos" href="#/recursos">
          <span class="icon-wrap"><i data-lucide="library"></i></span>
          <div>
            <h3>Recursos</h3>
            <p>Todo el material de la comunidad, organizado por tema.</p>
          </div>
          <span class="count">${recursos.length} recursos · ${catOrderSlugs.length} temas</span>
        </a>
      </div>`;
  }

  function renderOficiales() {
    setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: "Medios Oficiales" }]);
    $page.innerHTML = `
      ${backButtonHTML("#/", "Inicio")}
      <div class="section-head">
        <div>
          <h2>Medios Oficiales</h2>
          <div class="sub">Los canales que el curso proporciona directamente.</div>
        </div>
      </div>
      <div class="simple-grid">
        ${mediosOficiales
          .map(
            (m) => `
          <a class="tile" href="${esc(m.url)}" target="_self">
            <h4>${esc(m.nombre)}</h4>
            <p>${esc(m.descripcion)}</p>
            <span class="go">Abrir <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span>
          </a>`
          )
          .join("")}
      </div>`;
  }

  function renderSemanaLista() {
    setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: "Semana de Curso" }]);
    $page.innerHTML = `
      ${backButtonHTML("#/", "Inicio")}
      <div class="section-head">
        <div>
          <h2>Semana de Curso</h2>
          <div class="sub">Selecciona un día para ver su material.</div>
        </div>
      </div>
      <div class="simple-grid">
        ${semanaCurso
          .map((d) => {
            if (!d.disponible) {
              return `<div class="tile disabled">
                <span class="badge-soon">Próximamente</span>
                <h4>Día ${d.dia}</h4>
                <p>Material aún no disponible.</p>
              </div>`;
            }
            return `<a class="tile" href="#/semana/${d.dia}">
              <h4>Día ${d.dia}</h4>
              <p>${d.archivos.length} archivo${d.archivos.length === 1 ? "" : "s"}</p>
              <span class="go">Ver material <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span>
            </a>`;
          })
          .join("")}
      </div>`;
  }

  function renderSemanaDia(diaNum) {
    const idx = semanaCurso.findIndex((d) => d.dia === diaNum);
    const dia = semanaCurso[idx];
    if (!dia || !dia.disponible) {
      location.hash = "#/semana";
      return;
    }
    const prev = semanaCurso.slice(0, idx).reverse().find((d) => d.disponible);
    const next = semanaCurso.slice(idx + 1).find((d) => d.disponible);

    setBreadcrumb([
      { label: "Inicio", href: "#/" },
      { label: "Semana de Curso", href: "#/semana" },
      { label: `Día ${dia.dia}` },
    ]);

    const porTema = {};
    dia.archivos.forEach((a) => {
      const t = a.tema || "General";
      (porTema[t] = porTema[t] || []).push(a);
    });

    const stepperConfig = {
      prevHref: prev ? `#/semana/${prev.dia}` : "",
      nextHref: next ? `#/semana/${next.dia}` : "",
      prevDisabled: !prev,
      nextDisabled: !next,
      label: `Día ${dia.dia} de ${semanaCurso.length}`,
    };

    $page.innerHTML = `
      ${backButtonHTML("#/semana", "Semana de Curso")}
      <div class="section-head">
        <div>
          <h2>Día ${dia.dia}</h2>
          <div class="sub">${dia.archivos.length} archivo${dia.archivos.length === 1 ? "" : "s"} para descargar</div>
        </div>
        ${stepperHTML(stepperConfig)}
      </div>
      ${Object.entries(porTema)
        .map(
          ([tema, archivos]) => `
        <div style="margin-bottom:28px;">
          <h4 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-soft);margin-bottom:12px;">${esc(tema)}</h4>
          <div class="simple-grid">
            ${archivos
              .map(
                (a) => `
              <a class="tile" href="${esc(a.ruta)}" download target="_self">
                <div class="icon-wrap" style="width:34px;height:34px;border-radius:9px;background:${a.tipo === "notebook" ? "#EDEBFA" : "var(--coral-tint)"};color:${a.tipo === "notebook" ? "#6455A8" : "#B96A43"};display:flex;align-items:center;justify-content:center;">
                  <i data-lucide="${a.tipo === "notebook" ? "code" : "file-text"}" style="width:16px;height:16px;"></i>
                </div>
                <h4 style="font-size:14px;">${esc(a.nombre)}</h4>
                <span class="go"><i data-lucide="download" style="width:13px;height:13px;"></i> Descargar</span>
              </a>`
              )
              .join("")}
          </div>
        </div>`
        )
        .join("")}
      <div class="bottom-stepper">${stepperHTML(stepperConfig)}</div>`;
  }

  function renderPonentesLista() {
    setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: "Ponentes" }]);
    $page.innerHTML = `
      ${backButtonHTML("#/", "Inicio")}
      <div class="section-head">
        <div>
          <h2>Ponentes</h2>
          <div class="sub">Quiénes compartieron material con el curso.</div>
        </div>
      </div>
      <div class="simple-grid">
        ${ponentes
          .map(
            (p) => `
          <a class="tile" href="#/ponentes/${esc(p.id)}">
            <div class="icon-wrap" style="width:38px;height:38px;border-radius:50%;background:var(--sage-tint);color:var(--sage-deep);display:flex;align-items:center;justify-content:center;font-weight:800;">
              ${esc(p.nombre.charAt(0))}
            </div>
            <h4>${esc(p.nombre)}</h4>
            <p>${p.recursosRef.length} recurso${p.recursosRef.length === 1 ? "" : "s"} compartido${p.recursosRef.length === 1 ? "" : "s"}</p>
            <span class="go">Ver ficha <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span>
          </a>`
          )
          .join("")}
      </div>`;
  }

  function renderPonenteDetail(id) {
    const idx = ponentes.findIndex((p) => p.id === id);
    const p = ponentes[idx];
    if (!p) {
      location.hash = "#/ponentes";
      return;
    }
    const prev = ponentes[idx - 1];
    const next = ponentes[idx + 1];
    const misRecursos = p.recursosRef.map(recursoById).filter(Boolean);

    setBreadcrumb([
      { label: "Inicio", href: "#/" },
      { label: "Ponentes", href: "#/ponentes" },
      { label: p.nombre },
    ]);

    const stepperConfig = {
      prevHref: prev ? `#/ponentes/${prev.id}` : "",
      nextHref: next ? `#/ponentes/${next.id}` : "",
      prevDisabled: !prev,
      nextDisabled: !next,
      label: `${idx + 1} de ${ponentes.length}`,
    };

    $page.innerHTML = `
      ${backButtonHTML("#/ponentes", "Ponentes")}
      <div class="section-head">
        <div>
          <h2>${esc(p.nombre)}</h2>
          <div class="sub">${p.correo ? `<a href="mailto:${esc(p.correo)}" style="color:var(--sage-deep);font-weight:600;">${esc(p.correo)}</a>` : "Correo no proporcionado"}</div>
        </div>
        ${stepperHTML(stepperConfig)}
      </div>
      <h4 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-soft);margin-bottom:14px;">Recursos compartidos</h4>
      <div class="resource-grid">
        ${misRecursos.map(resourceCardHTML).join("") || emptyStateHTML("Este ponente aún no tiene recursos registrados.")}
      </div>
      <div class="bottom-stepper">${stepperHTML(stepperConfig)}</div>`;
  }

  function renderRecursosCategorias() {
    setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: "Recursos" }]);
    $page.innerHTML = `
      ${backButtonHTML("#/", "Inicio")}
      <div class="section-head">
        <div>
          <h2>Recursos</h2>
          <div class="sub">Elige un tema para explorar el material relacionado.</div>
        </div>
      </div>
      <div class="simple-grid">
        ${catOrderSlugs
          .map((slug) => {
            const name = nameBySlug[slug];
            const count = recursos.filter((r) => r.categorias.includes(name)).length;
            return `<a class="tile" href="#/recursos/${slug}">
              <h4>${esc(name)}</h4>
              <p>${count} recurso${count === 1 ? "" : "s"}</p>
              <span class="go">Explorar <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span>
            </a>`;
          })
          .join("")}
      </div>`;
  }

  function renderRecursosCategoria(slug, activeTipo) {
    const idx = catOrderSlugs.indexOf(slug);
    const name = nameBySlug[slug];
    if (!name) {
      location.hash = "#/recursos";
      return;
    }
    const prevSlug = catOrderSlugs[idx - 1];
    const nextSlug = catOrderSlugs[idx + 1];

    setBreadcrumb([
      { label: "Inicio", href: "#/" },
      { label: "Recursos", href: "#/recursos" },
      { label: name },
    ]);

    const items = recursos.filter((r) => r.categorias.includes(name));
    const tiposPresentes = [...new Set(items.map((r) => r.tipo))];
    const filtered = activeTipo ? items.filter((r) => r.tipo === activeTipo) : items;

    const stepperConfig = {
      prevHref: prevSlug ? `#/recursos/${prevSlug}` : "",
      nextHref: nextSlug ? `#/recursos/${nextSlug}` : "",
      prevDisabled: !prevSlug,
      nextDisabled: !nextSlug,
      label: `${idx + 1} de ${catOrderSlugs.length}`,
    };

    $page.innerHTML = `
      ${backButtonHTML("#/recursos", "Recursos")}
      <div class="section-head">
        <div>
          <h2>${esc(name)}</h2>
          <div class="sub">${items.length} recurso${items.length === 1 ? "" : "s"}</div>
        </div>
        ${stepperHTML(stepperConfig)}
      </div>
      ${
        tiposPresentes.length > 1
          ? `<div class="type-filters">
              <button class="type-chip ${!activeTipo ? "active" : ""}" data-filter-tipo="">Todos</button>
              ${tiposPresentes
                .map((t) => {
                  const def = tipoDefs[t] || { label: t, icon: "file" };
                  return `<button class="type-chip ${activeTipo === t ? "active" : ""}" data-filter-tipo="${esc(t)}">
                    <i data-lucide="${def.icon}"></i>${esc(def.label)}
                  </button>`;
                })
                .join("")}
            </div>`
          : ""
      }
      <div class="resource-grid" id="resourceGrid">
        ${filtered.map(resourceCardHTML).join("") || emptyStateHTML("No hay recursos con este filtro todavía.")}
      </div>
      <div class="bottom-stepper">${stepperHTML(stepperConfig)}</div>`;

    $page.querySelectorAll("[data-filter-tipo]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCatFilter = btn.getAttribute("data-filter-tipo") || null;
        renderRecursosCategoria(slug, currentCatFilter);
        icons();
      });
    });
  }

  let currentCatFilter = null;

  function renderBusqueda(query) {
    setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: `Búsqueda: “${query}”` }]);
    const q = query.toLowerCase();

    const matchRecursos = recursos.filter((r) =>
      [r.titulo, r.autor, r.descripcion, ...r.categorias].join(" ").toLowerCase().includes(q)
    );
    const matchPonentes = ponentes.filter((p) => p.nombre.toLowerCase().includes(q));
    const matchOficiales = mediosOficiales.filter((m) =>
      (m.nombre + " " + m.descripcion).toLowerCase().includes(q)
    );

    const totalCount = matchRecursos.length + matchPonentes.length + matchOficiales.length;

    $page.innerHTML = `
      ${backButtonHTML("#/", "Inicio")}
      <div class="section-head">
        <div>
          <h2>Resultados para “${esc(query)}”</h2>
          <div class="sub">${totalCount} coincidencia${totalCount === 1 ? "" : "s"}</div>
        </div>
      </div>
      ${
        matchPonentes.length
          ? `<h4 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-soft);margin-bottom:12px;">Ponentes</h4>
             <div class="simple-grid" style="margin-bottom:32px;">
               ${matchPonentes
                 .map(
                   (p) => `<a class="tile" href="#/ponentes/${esc(p.id)}"><h4>${esc(p.nombre)}</h4><span class="go">Ver ficha <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span></a>`
                 )
                 .join("")}
             </div>`
          : ""
      }
      ${
        matchOficiales.length
          ? `<h4 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-soft);margin-bottom:12px;">Medios Oficiales</h4>
             <div class="simple-grid" style="margin-bottom:32px;">
               ${matchOficiales
                 .map(
                   (m) => `<a class="tile" href="${esc(m.url)}" target="_self"><h4>${esc(m.nombre)}</h4><p>${esc(m.descripcion)}</p></a>`
                 )
                 .join("")}
             </div>`
          : ""
      }
      ${
        matchRecursos.length
          ? `<h4 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-soft);margin-bottom:12px;">Recursos</h4>
             <div class="resource-grid">${matchRecursos.map(resourceCardHTML).join("")}</div>`
          : ""
      }
      ${totalCount === 0 ? emptyStateHTML("No encontramos nada con ese término. Prueba con otra palabra.") : ""}
    `;
  }

  /* ---------------- Modal ---------------- */

  function openModal(id) {
    const r = recursoById(id);
    if (!r) return;
    const ponente = r.ponenteRef ? ponenteById(r.ponenteRef) : null;

    $modalContent.innerHTML = `
      ${tipoBadgeHTML(r.tipo)}
      <h3 id="modalTitle">${esc(r.titulo)}</h3>
      ${r.autor ? `<div class="autor">${esc(r.autor)}${r.anio ? " · " + r.anio : ""}</div>` : ""}
      <div class="meta-row">
        ${r.categorias.map((c) => `<span class="tag">${esc(c)}</span>`).join("")}
      </div>
      ${r.descripcion ? `<p class="desc">${esc(r.descripcion)}</p>` : ""}
      ${
        ponente
          ? `<div class="shared-by">
              <span class="avatar">${esc(ponente.nombre.charAt(0))}</span>
              <span>Compartido por <a href="#/ponentes/${esc(ponente.id)}" id="modalPonenteLink">${esc(ponente.nombre)}</a></span>
            </div>`
          : ""
      }
      <div class="modal-actions">
        ${r.enlaces
          .map(
            (e, i) => `
          <a class="${i === 0 ? "btn-primary" : "btn-secondary"}" href="${esc(e.url)}" target="_self" ${isLocalFile(e.url) ? "download" : ""}>
            <i data-lucide="${isLocalFile(e.url) ? "download" : "external-link"}"></i>
            ${esc(e.etiqueta)}
          </a>`
          )
          .join("")}
      </div>`;

    $modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    icons();

    const ponenteLink = document.getElementById("modalPonenteLink");
    if (ponenteLink) {
      ponenteLink.addEventListener("click", closeModal);
    }
  }

  function closeModal() {
    $modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("modalClose").addEventListener("click", closeModal);
  $modalOverlay.addEventListener("click", (e) => {
    if (e.target === $modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------------- Router ---------------- */

  function router() {
    if ($searchInput.value.trim().length >= 2) return; // búsqueda activa, no navegar

    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean);

    updateActiveNav(parts[0] ? "/" + parts[0] : "/");
    currentCatFilter = null;

    if (parts.length === 0) {
      renderHome();
    } else if (parts[0] === "oficiales") {
      renderOficiales();
    } else if (parts[0] === "semana" && parts.length === 1) {
      renderSemanaLista();
    } else if (parts[0] === "semana" && parts.length === 2) {
      renderSemanaDia(parseInt(parts[1], 10));
    } else if (parts[0] === "ponentes" && parts.length === 1) {
      renderPonentesLista();
    } else if (parts[0] === "ponentes" && parts.length === 2) {
      renderPonenteDetail(parts[1]);
    } else if (parts[0] === "recursos" && parts.length === 1) {
      renderRecursosCategorias();
    } else if (parts[0] === "recursos" && parts.length === 2) {
      renderRecursosCategoria(parts[1], null);
    } else {
      renderHome();
    }

    icons();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function updateActiveNav(path) {
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-nav") === path);
    });
  }

  /* ---------------- Event delegation ---------------- */

  document.body.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-resource]");
    if (openBtn) {
      openModal(openBtn.getAttribute("data-open-resource"));
      return;
    }
    const stepBtn = e.target.closest("[data-goto]");
    if (stepBtn && stepBtn.getAttribute("data-goto")) {
      const target = stepBtn.getAttribute("data-goto");
      const hadSearch = $searchInput.value.trim().length >= 2;
      $searchInput.value = "";
      if (hadSearch && location.hash === target) {
        router(); // el hash no cambia, forzar re-render manualmente
      } else {
        location.hash = target;
      }
      return;
    }
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      location.hash = "#" + navBtn.getAttribute("data-nav");
      $searchInput.value = "";
    }
  });

  window.addEventListener("hashchange", router);

  /* ---------------- Búsqueda ---------------- */

  let searchTimer = null;
  $searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const q = $searchInput.value.trim();
      if (q.length >= 2) {
        setBreadcrumb([{ label: "Inicio", href: "#/" }, { label: "Búsqueda" }]);
        renderBusqueda(q);
        icons();
      } else {
        router();
      }
    }, 220);
  });

  /* ---------------- Iniciativas y Eventos (footer) ---------------- */

  document.getElementById("iniciativasLink").href = iniciativas.url;

  document.getElementById("footEvents").innerHTML =
    `<span class="foot-events-label">Próximos eventos</span>` +
    eventosProximos
      .map((ev) => `<a href="${esc(ev.url)}" target="_self">${esc(ev.nombre)}</a>`)
      .join('<span style="opacity:.4;">·</span>');

  /* ---------------- Init ---------------- */

  router();
  icons();
})();
