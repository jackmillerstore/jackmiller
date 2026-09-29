# JackMiller

JackMiller es un catálogo web en español para publicar artículos misceláneos disponibles para la venta.

## Tecnologías

- HTML
- CSS
- JavaScript puro

## Estructura

- `index.html` — página principal
- `css/styles.css` — estilos
- `js/products.js` — catálogo editable
- `js/app.js` — búsqueda, filtros y vista de detalles
- `images/products/` — imágenes de productos

## Agregar un artículo

Edita `js/products.js` y agrega un nuevo objeto dentro del arreglo `products`.

Ejemplo:

```js
{
  id: 7,
  nombre: "Lámpara de mesa",
  precio: 250,
  moneda: "Q",
  categoria: "Hogar",
  estado: "disponible",
  condicion: "Buen estado",
  descripcion: "Lámpara de mesa en buen estado.",
  imagenes: ["images/products/placeholder.svg"]
}
```

Estados disponibles:

- `disponible`
- `reservado`
- `vendido`

## Probar localmente

Puedes abrir `index.html` directamente en el navegador o iniciar un servidor local.

Por ejemplo:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Publicación

El proyecto está preparado para publicarse como sitio estático desde GitHub.
