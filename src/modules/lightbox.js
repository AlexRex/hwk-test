const lightbox = document.querySelector('#lightbox'),
  img = document.querySelector('#lightbox-img'),
  content = document.querySelector('#lightbox-content');

let toggled = false,
  activeImage = 0,
  activeCard;


export default class Lightbox {
  constructor() {
    this.handleEvents();
  }
  
  /**
   * Abrimos la lightbox
   * @param {any} card - tarjeta
   */
  openLightBox(card) {
    this.toggleLightBox();
    activeImage = 0;
    activeCard = card;
    img.src = card.images[activeImage].src;
  }
  
  /**
   * Escuchamos eventos click
   */
  handleEvents() {
    lightbox.addEventListener('click', (event) => {
      this.toggleLightBox();
    });

    content.addEventListener('click', (event) => {
      if (activeCard.images[activeImage + 1]) {
        activeImage++;
      } else if (activeImage > 0) {
        activeImage = 0;
      }
      
      img.src = activeCard.images[activeImage].src;
      
      event.stopPropagation();
    });
  }
  
  /**
   * Cambiamos el estado de la lightbox
   */
  toggleLightBox() {
    if (toggled) {
      this.removeClass(lightbox, 'active');
    } else {
      this.addClass(lightbox, 'active');
    }

    toggled = !toggled;
  }
  
  /**
   * Comprobar si el elemento tiene la clase
   * @param {element} el elemento
   * @param {string} className - nombre de la clase
   * @return {Boolean} 
   */
  hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }
  
  /**
   * Anyade clase al elemento
   * @param {element} el elemento
   * @param {string} className - nombre de la clase
   */
  addClass(el, className) {
    if (el.classList) {
      el.classList.add(className); 
    }
    else if (!hasClass(el, className)) {
      el.className += ' ' + className;
    } 
  }
  
  /**
   * Elimina clase al elemento
   * @param {element} el elemento
   * @param {string} className - nombre de la clase
   */
  removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }
}