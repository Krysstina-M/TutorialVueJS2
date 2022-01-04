Vue.filter('mayusculas', (value) => value.toUpperCase());

Vue.component('frutas', {
    props: ['objeto'],
    mounted() {
        console.log(this.objeto);
    }
});

Vue.component('padre', {
    template: `
        <div>
            <h3>Componente padre</h3>
            <div>
                <hijo></hijo>
            </div>
	    </div>`
});

Vue.component('hijo', {
    template: `<p class="hijo">Soy un parrafo en el componente hijo</p>`
});

Vue.component('quitarPadre', {
    template: `<div></div>`
});

Vue.component('cargarArticulos', {
    template: `
        <div>
            <h1>Componente {{titulo}}</h1>

            <!--AJAX y HTTP-->
            <h3>Listado por AJAX:</h3>
            <ol v-if='posts'>
                <li v-for='post in posts'>{{post.title}}</li>
            </ol>
            <p v-else>Cargando listado...</p>
        </div>
	`,
    mounted() { /*Se ejecuta nada más se recarga la página*/
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((respuesta) => {
                this.posts = respuesta.data;
            });
    },
    data() {
        return {
            titulo: 'artículos',
            posts: '',
        }
    }
});

Vue.component('quitarArticulos', {
    template: '<div></div>'
});

const vue1 = new Vue({
    el: '#divGeneral',
    data: {
        titulo: 'Primera instancia Vue',
        nombre: 'Anónimo',
        nota: '',
        peliculas: [
            'Los Vengadores',
            'Capitán Aamérica: Civil War',
            'Ant-Man',
            'Black Widow'
        ],
        frutas: [
            { nombre: 'Manzana', temporada: 'Invierno', precio: 1.1 },
            { nombre: 'Naranja', temporada: 'Otoño', precio: 2.1 },
            { nombre: 'Cereza', temporada: 'Primavera', precio: 3.99 },
            { nombre: 'Sandía', temporada: 'Verano', precio: 2.5 }
        ],
        mandarina: { nombre: 'Mandarina', temporada: 'Verano', precio: 2.2 },
        peliculaNueva: '',
        buscar: '',
        like: null,
        elegidoPH: '',
        elegidoA: ''
    },
    methods: { /*Son para métodos que no devuelven nada*/
        crearPelicula() {
            this.peliculas.push(this.peliculaNueva);
            this.peliculaNueva = '';
        },
        borrarPelicula(index) {
            this.peliculas.splice(index, 1);
        },
        marcar(index) {
            this.like = index;
        }
    },
    computed: { /*Son para métodos que devuelven algo. No hace falta llamarlos*/
        mostrarNombreNotaFecha() {
            var fecha = new Date();
            var mes = fecha.getMonth() + 1;

            return this.nombre + ' - Nota: ' + this.nota + ' - ' + fecha.getDate() + '/' + mes + '/' + fecha.getFullYear();
        },
        mostrarPeliculasOrdenadas() {
            return this.peliculas.sort();
        },
        buscarFruta() {
            return this.frutas.filter((fruta) => fruta.nombre.includes(this.buscar));
        }
    }
});