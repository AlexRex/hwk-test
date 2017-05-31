## Hwk

### Features

- Lightbox: Al pinchar dentro de la imagen cargamos la siguiente imagen.

- Carga dinámica: Al llegar al final de la página cargamos más anuncios. Se simula una llamada a backend con un timeout de 600ms. (Si se quita el timeout cada carga es instantánea).

- Uso de mediaqueries (responsive), flexbox, animaciones y SASS.

### Posibles Mejoras

- He llegado a implementar el sistema de tarjetas que hay en https://www.hawkersco.com/ pero como no todas las imágenes proporcionadas tenían la misma serie de imágenes he decidido quitarlo porque no quedaba bien.

- Como me comentasteis que no usabais ningún framework he decidido hacerlo con Vanillajs. Uno de los inconvenientes es que me ha tocado meter el código HTML de las tarjetas dentro del javascript, y ya sabemos lo bonito que es esto... 

### Preguntas

> ¿Qué significa OOCSS, SMACSS, BEM y DRY? ¿cuál usas o prefieres frente al resto?

Pues sinceramente, de los nombrados solo conocía OOCSS y DRY. Pero no los he probado lo suficiente en proyectos relativamente grandes. Tras leer un poco de los otros dos por internet me quedaría con DRY. OOCSS me gusta también por ser simplista. BEM me parece que si no se trabaja bien puede quedar muy lioso dentro de un proyecto grande. 

> Imagina que tienes un elemento de imagen, el cual tiene que tener una versión diferente de imagen para móvil, otra diferente para tablet y otra para desktop. ¿Cómo lo implementarías?

Usaría media queries para cada imagen. Digamos tenemos tres clases CSS: `display-sm`, `display-md` y `display-lg`, pues usando media queries, por ejemplo para `display-lg`:

```
.display-lg {
  display: none;
  
  @media only screen and (min-width: 960px) {
    display: inherit;
  }
}
```

Igual para el resto de clases, controlando los máximos y mínimos.

Y ahora a cada imagen: 

```
<img class="display-lg" src="big.png">
<img class="display-md" src="medium.png">
<img class="display-xs" src="small.png">
```

Esto en el caso de que tuvieramos 3 imágenes distintas, que es lo que he entendido yo en la pregunta.

> Muestra un ejemplo claro pero sencillo de uso útil de  display:flex .

Para centrar un elemento en la pantalla horizontal y verticalmente, por ejemplo:

```
.padre {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hijo {
  max-width: 50%;
}
```

O para hacer listas, como he implementado yo en el grid de tarjetas. 

> De repente notas que una de las webs que has realizado va lentísima, carga mucho más lento que de costumbre. ¿Qué haces y revisas para ver qué está ocurriendo?

Primero abriría la consola para ver si hay algún error de código. Segundo miraría en la pestaña `Network` de la consola para ver si hay algún fichero o llamada tardando más de lo esperado. Si hay algún fichero miraría si es javascript y haría una depuración para encontrar el posible fallo. 


> Imagina que estás en el equipo de Hwk. y perteneces al Frontend Team, ¡por fin! :) De repente te avisan un martes a las 21 de la noche de que el e-commerce online (principal canal de venta actual de la marca) se ha caído. ¿Qué harías?

Pues primero, mosquearme bastante si esa situación se da un martes a las 21 de la noche... ;( Segundo trataría de contactar con el resto de compañeros para ver si saben de qué problema se trata, y a continuación intentaría volver a levantar la página. 
