(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const catalogUrl = new URL("./data/concepts.json", document.baseURI);
  const gallery = $("#gallery-grid");
  const filters = $("#filters");
  const search = $("#search");
  const dialog = $("#lightbox");
  let collection = [];
  let visible = [];
  let activeTag = "All";
  let activeIndex = 0;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const conceptById = (id) => collection.find((item) => item.id === id);

  const filteredConcepts = () => {
    const term = search.value.trim().toLocaleLowerCase();
    return collection.filter((item) => {
      if (activeTag !== "All" && !item.tags.includes(activeTag)) return false;
      const haystack = [item.title, item.project, item.description, ...item.tags].join(" ").toLocaleLowerCase();
      return haystack.includes(term);
    });
  };

  function renderFilters() {
    const counts = new Map([["All",collection.length]]);
    for (const c of collection) for (const tag of c.tags) counts.set(tag,(counts.get(tag)||0)+1);
    if (activeTag!=="All" && !counts.has(activeTag)) activeTag="All";
    filters.replaceChildren();
    for (const [name,count] of counts) {
      const button=document.createElement("button");
      button.type="button";
      button.textContent=name+" "+String(count).padStart(2,"0");
      button.setAttribute("aria-pressed",String(activeTag===name));
      button.onclick=()=>{activeTag=name;renderFilters();renderGallery()};
      filters.append(button);
    }
  }
  function renderGallery(){
    visible=filteredConcepts();
    gallery.innerHTML=visible.map((item,index)=>`
      <article class="gallery-card">
        <button type="button" class="card-art" data-open="${esc(item.id)}" aria-label="View ${esc(item.title)}">
          <img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy">
          <span class="card-view">VIEW CONCEPT ↗</span>
        </button>
        <div class="card-meta"><div class="card-topline"><span>${esc(item.project.toUpperCase())} / ${String(index+1).padStart(2,"0")}</span><span>${esc(item.kind.toUpperCase())}</span></div>
          <h3>${esc(item.title)}</h3><p>${esc(item.description)}</p>
          <div class="tags">${item.tags.map((tag)=>`<span>${esc(tag)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
    $("#empty").hidden=visible.length!==0;
  }
  function openConcept(id) {
    const foundIndex=visible.findIndex(item=>item.id===id);
    if(foundIndex===-1) return;
    activeIndex=foundIndex;updateViewer();if(!dialog.open) dialog.showModal();
  }
  function updateViewer(){
    const item=visible[activeIndex]; if(!item) return;
    $("#viewer-counter").textContent=`${activeIndex+1} OF ${visible.length}`;
    $("#viewer-title").textContent=item.title;
    $("#viewer-image").src=item.image;
    $("#viewer-image").alt=item.alt;
    $("#viewer-description").textContent=item.description+" · AI-generated concept, illustrative data only.";
    $("#full-link").href=item.image;
    $("#full-link").download=item.id+".webp";
    $("#source-link").href=item.source;
    $("#prev").disabled=visible.length<2;
    $("#next").disabled=visible.length<2;
  }
  function step(direction){if(visible.length===0)return;activeIndex=(activeIndex+direction+visible.length)%visible.length;updateViewer()}
  gallery.addEventListener("click",event=>{
    const button=event.target.closest("[data-open]");
    if(button)openConcept(button.dataset.open);
  });
  $("#feature-open").addEventListener("click",()=>{
    if(collection.length){ if(!visible.some(item=>item.id===collection[0].id)){activeTag="All";search.value="";renderFilters();renderGallery()} openConcept(collection[0].id); }
  });
  $("#close").onclick=()=>dialog.close();
  $("#prev").onclick=()=>step(-1);
  $("#next").onclick=()=>step(1);
  dialog.addEventListener("click",(event)=>{if(event.target===dialog)dialog.close()});
  search.addEventListener("input",renderGallery);
  $("#reset-filters").onclick=()=>{activeTag="All";search.value="";renderFilters();renderGallery()};
  document.addEventListener("keydown",(event)=>{
    if(dialog.open){if(event.key==="ArrowRight")step(1);if(event.key==="ArrowLeft")step(-1);return}
    if(event.key==="/" && !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)){event.preventDefault();search.focus()}
  });

  async function load(){
    try{
      const response=await fetch(catalogUrl);
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const items=await response.json();
      if(!Array.isArray(items))throw new Error("Catalog must be an array");
      collection=items.filter(item=>item.published!==false && item.id && item.image && item.title);
      collection.sort((a,b)=>(a.order??99)-(b.order??99));
      $("#concept-total").textContent=String(collection.length).padStart(2,"0")+" CONCEPT"+(collection.length===1?"":"S");
      if(collection[0]){$("#feature-image").src=collection[0].image;$("#feature-image").alt=collection[0].alt}
      renderFilters();renderGallery();
    }catch(error){
      console.error("Designarium catalog:",error);
      gallery.innerHTML='<p class="empty">Could not load the gallery catalog. The static site must be served over HTTP.</p>';
    }
  }
  load();
})();