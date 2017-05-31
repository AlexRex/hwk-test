import Http from './http';
import Lightbox from './lightbox';

import {
  times,
  find
} from 'lodash';

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
        this.handleEnd();
      });
  }

  iterateProducts() {
    if (iteration < products.length) {
      let cardGridElement = document.querySelector('#cards-grid');
      let productsToPush = [], 
        html, image, imageHover, div;

      loading = true;

      times(10, () => {
        image = find(products[iteration].images, (image) => {
          return image.position === 1;
        });
        
        if (image && image.src) {
          div = document.createElement('div');
          html =
            `<div class="card" id="card-${iteration}">
                <div class="img-header" onclick="products.openImage(${iteration})">
                  <img src="${image.src}">
                </div>
                <div class="content">
                  <h3 class="glass-title">${products[iteration].title}</h3>
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
      
    } else {
      loaderElement.style.visibility = 'hidden';
      loading = false;
    }
  }

  handleEnd() {
    let end = (event) => {
      if (document.body.scrollTop + window.innerHeight >= document.body.scrollHeight && !loading) {
        loaderElement.style.visibility = 'visible';
        this.iterateProducts();
      }
    }

    document.addEventListener('scroll', end);
  }

  openImage(id) {
    lightbox.openLightBox(products[id]);
  }
}