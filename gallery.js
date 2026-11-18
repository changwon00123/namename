// 판소리대학교 갤러리 — 정적 JSON 데이터로 운영되는 GitHub Pages 호환 예시
// 새로운 사진 추가: assets에 이미지 업로드 후 GALLERY_ITEMS에 항목을 추가하세요.
const GALLERY_ITEMS = [
  {
    id:'2020-pansori-01', image:'assets/gallery-2020-1.jpg', title:'충무공을 회상하는 판소리 공연',
    category:'공연 현장', date:'2020.10', subtitle:'2020 다시 생각해보는 임진왜란',
    description:'2020년 「충무공을 회상하는」 공연 무대 기록. 전통 의상을 입은 출연진들이 소리와 연희를 선보이는 장면입니다.',
    alt:'2020 다시 생각해보는 임진왜란, 충무공을 회상하는 공연 무대. 보라색 한복과 노란색·붉은색 한복 차림의 출연진이 마이크 앞에서 공연하는 모습'
  },
  {
    id:'2020-pansori-02', image:'assets/gallery-2020-2.jpg', title:'충무공을 회상하는 무대의 순간',
    category:'공연 현장', date:'2020.10', subtitle:'전통 판소리와 연희의 어울림',
    description:'「충무공을 회상하는」 공연의 또 다른 장면. 여러 출연진이 함께 무대에 올라 공연하는 모습을 담았습니다.',
    alt:'충무공을 회상하는 공연 중 네 명의 전통 의상 차림 출연진이 야외 무대에서 함께 공연하는 모습'
  }
];
let galleryIndex=0;
let galleryLightboxIndex=0;
let galleryAutoplay;
const $gallery = (s) => document.querySelector(s);
const galleryCard = (item, i, detail=false) => `<article class="${detail?'gallery-grid-card':'gallery-slide'}"><button type="button" class="gallery-photo-button" data-gallery-open="${i}" aria-label="${item.title} 사진 크게 보기"><span class="gallery-photo-wrap"><img src="${item.image}" alt="${item.alt}" loading="${i<2?'eager':'lazy'}" width="1200" height="675"><span class="gallery-photo-hover">사진 크게 보기 ↗</span></span><span class="gallery-card-content"><span class="gallery-card-category">${item.category} <time>${item.date}</time></span><strong>${item.title}</strong><span class="gallery-card-subtitle">${item.subtitle}</span></span></button></article>`;
function galleryPage(){return `<div class="gallery-page-intro"><p class="lead">사진으로 남긴 우리 소리의 감동</p><p>판소리 공연의 생생한 순간을 기록한 사진 갤러리입니다. 사진을 선택하면 크게 보고 넘길 수 있습니다.</p><div class="gallery-page-note">공연명: 2020 다시 생각해보는 임진왜란 · 충무공을 회상하는 공연<br>※ 제공된 사진을 바탕으로 구성된 시연 게시판입니다. 인물 식별 및 출연자 성명은 확인되지 않았습니다.</div></div><div class="gallery-grid">${GALLERY_ITEMS.map((item,i)=>galleryCard(item,i,true)).join('')}</div>`}
function updateGalleryCarousel(){
 const viewport=$gallery('#home-gallery-viewport');const items=[...document.querySelectorAll('.gallery-slide')];if(!viewport||!items.length)return;
 galleryIndex=(galleryIndex+items.length)%items.length;
 const target=items[galleryIndex];viewport.scrollTo({left:target.offsetLeft-items[0].offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 $gallery('#gallery-counter').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
 document.querySelectorAll('#gallery-dots button').forEach((b,i)=>{b.classList.toggle('active',i===galleryIndex);b.setAttribute('aria-current',i===galleryIndex?'true':'false')});
}
function moveGallery(by){galleryIndex+=by;updateGalleryCarousel()}
function openGalleryLightbox(index){galleryLightboxIndex=(index+GALLERY_ITEMS.length)%GALLERY_ITEMS.length;renderGalleryLightbox();const dlg=$gallery('#gallery-lightbox');if(dlg&&!dlg.open)dlg.showModal()}
function renderGalleryLightbox(){const item=GALLERY_ITEMS[galleryLightboxIndex];$gallery('#gallery-lightbox-image').src=item.image;$gallery('#gallery-lightbox-image').alt=item.alt;$gallery('#gallery-lightbox-title').textContent=item.title;$gallery('#gallery-lightbox-caption').textContent=item.description;$gallery('#gallery-lightbox-count').textContent=`${galleryLightboxIndex+1} / ${GALLERY_ITEMS.length}`}
function initGallery(){
 const track=$gallery('#home-gallery-track');if(!track)return;
 track.innerHTML=GALLERY_ITEMS.map((item,i)=>galleryCard(item,i)).join('');
 $gallery('#gallery-dots').innerHTML=GALLERY_ITEMS.map((_,i)=>`<button type="button" aria-label="${i+1}번째 사진으로 이동" data-gallery-dot="${i}" ${i===0?'class="active" aria-current="true"':''}></button>`).join('');
 $gallery('#gallery-prev').addEventListener('click',()=>moveGallery(-1));$gallery('#gallery-next').addEventListener('click',()=>moveGallery(1));
 document.addEventListener('click',e=>{const open=e.target.closest('[data-gallery-open]');if(open)openGalleryLightbox(Number(open.dataset.galleryOpen));const dot=e.target.closest('[data-gallery-dot]');if(dot){galleryIndex=Number(dot.dataset.galleryDot);updateGalleryCarousel()}});
 $gallery('#gallery-lightbox-close').addEventListener('click',()=>$gallery('#gallery-lightbox').close());
 $gallery('#gallery-lightbox-prev').addEventListener('click',()=>{galleryLightboxIndex=(galleryLightboxIndex+GALLERY_ITEMS.length-1)%GALLERY_ITEMS.length;renderGalleryLightbox()});
 $gallery('#gallery-lightbox-next').addEventListener('click',()=>{galleryLightboxIndex=(galleryLightboxIndex+1)%GALLERY_ITEMS.length;renderGalleryLightbox()});
 $gallery('#gallery-lightbox').addEventListener('click',e=>{if(e.target.id==='gallery-lightbox')e.target.close()});
 document.addEventListener('keydown',e=>{if(!$gallery('#gallery-lightbox').open)return;if(e.key==='ArrowLeft')$gallery('#gallery-lightbox-prev').click();if(e.key==='ArrowRight')$gallery('#gallery-lightbox-next').click()});
 const view=$gallery('#home-gallery-viewport');let scrollTimeout;
 view.addEventListener('scroll',()=>{clearTimeout(scrollTimeout);scrollTimeout=setTimeout(()=>{const cards=[...document.querySelectorAll('.gallery-slide')];if(!cards.length)return;const offset=view.scrollLeft;galleryIndex=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-cards[0].offsetLeft-offset)<Math.abs(cards[best].offsetLeft-cards[0].offsetLeft-offset)?i:best,0);$gallery('#gallery-counter').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;document.querySelectorAll('#gallery-dots button').forEach((b,i)=>b.classList.toggle('active',i===galleryIndex))},130)},{passive:true});
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const start=()=>{clearInterval(galleryAutoplay);galleryAutoplay=setInterval(()=>{if(!document.hidden&&(!location.hash||location.hash==='#home')&&!$gallery('#gallery-lightbox').open)moveGallery(1)},5500)};start();view.addEventListener('mouseenter',()=>clearInterval(galleryAutoplay));view.addEventListener('mouseleave',start);view.addEventListener('focusin',()=>clearInterval(galleryAutoplay));view.addEventListener('focusout',start)}
}
document.addEventListener('DOMContentLoaded',initGallery);
