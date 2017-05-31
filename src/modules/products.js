import Http from './http';
import Lightbox from './lightbox';

import { times, find } from 'lodash';

const http = new Http();
const lightbox = new Lightbox();

const loaderElement = document.querySelector('#loader');

let products = [];
let iteration = 0;
let loading = false;

export default class Products {
  loadProducts() {
    http.request('GET', 'src/assets/products.json')
      .then((response) => {
        products = response.data.products;
        this.iterateProducts();
        this.handleScrollEnd();
      });
  }
  
  /**
   * Cargamos nuevos anuncios. La carga es "falsa" ya que al no disponer de una API cargamos todos los anuncios
   * de golpe al iniciar la app y vamos mostrando de 10 en 10. Hay un timeout simulando un tiempo de carga de 600ms. 
   */
  iterateProducts() {
    if (iteration < products.length) {
      let cardGridElement = document.querySelector('#cards-grid');
      let productsToPush = [], 
        html, image, imageHover, div;

      loading = true;
      setTimeout(() => {
        times(10, () => {
          image = find(products[iteration].images, (image) => {
            return image.position === 1;
          });
          
          if (image && image.src) {
            div = document.createElement('div');
            html =
              `<div class="card" id="card-${iteration}">
                  <div class="img-header" onclick="products.openImage(${iteration})">
                    <img class="card-img" src="${image.src}">
                  </div>
                  <div class="content">
                    <h3 class="card-title">${products[iteration].title}</h3>
                    <div class="price-container">
                      <span class="price">25€</span>
                    </div>
                  </div>
                </div>`;

            div.innerHTML = html;
            cardGridElement.appendChild(div.childNodes[0]);
          }

          iteration++;
        });

        loaderElement.style.visibility = 'hidden';
        loading = false;
      }, 600);
    } else {
      loaderElement.style.visibility = 'hidden';
      loading = false;
    }
  }
  
  /**
   * Escuchamoes el evento del scroll en el final de la pagina y cargamos nuevos anuncios
   */
  handleScrollEnd() {
    let end = (event) => {
      if (document.body.scrollTop + window.innerHeight >= document.body.scrollHeight && !loading) {
        loaderElement.style.visibility = 'visible';
        this.iterateProducts();
      }
    }

    document.addEventListener('scroll', end);
  }
  
  /**
   * Abrimos el lightbox
   * @param {number} id id de la imagen
   */
  openImage(id) {
    lightbox.openLightBox(products[id]);
  }
}