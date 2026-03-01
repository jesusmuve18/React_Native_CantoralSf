import Acorde from '../components/Acorde'
import Estribillo from '../components/Estribillo';
import { Text } from 'react-native';

import notes from "./notation.json"

/***************************************************************************************************************************************************************
// Definiciones de Expresiones Regulares:

    Acorde: https://regex-vis.com/?r=%28Nota%29%28Variacion%7C%5C%28Variacion%5C%29%29*%28%2F%28Nota%29%29%3F
    Línea de Acordes: https://regex-vis.com/?r=%5E%28+%7C%5Ct%29*%28%28PRD%29%3F%28Acorde%7CPRI%29%28PRD%29%3F%29%28%28+%7C%5Ct%29%2B%28%28PRD%29%3F%28Acorde%7CPRI%29%28PRD%29%3F%29%29*%28+%7C%5Ct%29*%24

    Acorde: (Nota)(Variacion)*(/(Nota))?
    Línea de Acordes: ^( |\t)*((PRD)?(Acorde|PRI)(PRD)?)(( |\t)+((PRD)?(Acorde|PRI)(PRD)?))*( |\t)*$

***************************************************************************************************************************************************************/
// Definición de partes

const Notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "Db", "Eb", "Gb", "Ab", "Bb",
    "Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si", "Reb", "Mib", "Solb", "Lab", "Sib",
    "do", "do#", "re", "re#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si", "reb", "mib", "solb", "lab", "sib"]
    .sort((a, b) => b.length - a.length);

const Variaciones = ["M", "m", "7", "6", "5", "4", "9", "11", "13", "2", "aug", "dim", "sus", "add", "+", "-", "maj"]
    .sort((a, b) => b.length - a.length);

// Palabras que tienen que ir separadas por un espacio en blanco de los acordes
const PalabrasReservadasIndependientes = ["Intro:", "Final:", "**", "***", "****", "2ª", "2ª:", "1ª", "1ª:", "2º:", "1º:", "vez:", "-", "x2", "x3", "x4"]
    .sort((a, b) => b.length - a.length);

// Palabras que pueden ir pegadas a los acordes
const PalabrasReservadasDependientes = ["(", ")", "-"].sort((a, b) => b.length - a.length);

/***************************************************************************************************************************************************************/
// Definición de Regex de las partes

const Nota = Notas.map(nota => nota.replace(/[#]/, '\\$&')).join("|");
const Variacion = Variaciones.map(variacion => variacion.replace(/[+()]/g, '\\$&')).join("|");
const PRI = PalabrasReservadasIndependientes.map(p => p.replace(/[*]/g, '\\$&')).join("|");
const PRD = PalabrasReservadasDependientes.map(p => p.replace(/[()]/g, '\\$&')).join("|");

const AcordeStringParts = `(${Nota})((?:(?:${Variacion})|\\((?:${Variacion})\\))*)(?:\\/(${Nota}))?`;
const AcordeString = `(?:${Nota})(?:(?:${Variacion})|\\((?:${Variacion})\\))*(?:\\/(?:${Nota}))?`;

// Grupo 1: Nota
// Grupo 2: Variaciones
// Grupo 3: Bajo
const AcordeRegex = new RegExp(`^${AcordeString}$`);
const AcordeRegexParts = new RegExp(AcordeStringParts);

// Grupos de Acordes solo
const LineaAcordesRegex = new RegExp(
    `^(?: |\\t)*(?:(?:${PRD})?(?:(${AcordeString})|(?:${PRI}))(?:${PRD})?)(?:(?: |\\t)+(?:(?:${PRD})?(?:(${AcordeString})|(?:${PRI}))(?:${PRD})?))*(?: |\\t)*$`,
    'd' // flag de índices
);

// Representa una palabra de una línea de acordes
const regexToken = new RegExp(
    `(?:${PRD})?` +                                 // 1: PRD antes
    `((?:${PRI})|(?:${AcordeString}))` +          // 2: Acorde completo o palabra reservada independiente
    `(?:${PRD})?`,                                  // 3: PRD después
    'dg'
);

/***************************************************************************************************************************************************************/
// Funciones

/** Comprueba si una línea es de acordes
 *  
 * @param {string} linea 
 * @returns True si la línea es de acordes
 *          False en otro caso
 */
function esLineaDeAcordes(linea) {
    return LineaAcordesRegex.test(linea);
}

/** Comprueba si una palabra es un acorde
 *  
 * @param {string} palabra 
 * @returns True si la palabra es un acorde
 *          False en otro caso
 */
function esAcorde(palabra) {
    return AcordeRegex.test(palabra);
}

/** Procesa un acorde devolviendo su componente
 * 
 * @param {string} acorde 
 * @param {string} notacion 
 * @param {int} transpuesta 
 * @param {int} cejilla 
 * @param {int} id_acorde 
 * 
 * @returns Componente Acorde correctamente configurado
 */
function procesarAcorde(acorde, notacion, transpuesta, cejilla, id_acorde) {

    const match = acorde.match(AcordeRegexParts);

    if (!match) return acorde;

    return (
        <Acorde
            key={id_acorde}
            acorde={acorde}
            nota={match[1]}
            variaciones={match[2] || ""}
            bajo={match[3] || ""}
            notation={notacion}
            transpuesta={transpuesta - cejilla}
        />
    );
}

/** Procesa una línea de acordes
 * 
 * @param {string} linea 
 * @param {string} notacion 
 * @param {int} transpuesta 
 * @param {int} cejilla 
 * @param {int} id_linea 
 * 
 * @returns Línea de acordes procesada con los componentes Acordes
 */
function procesarLineaAcordes(linea, notacion, transpuesta, cejilla, id_linea) {

    const match = LineaAcordesRegex.exec(linea);

    if (!match || !match.indices) return linea;

    const resultado = [];
    let cursor = 0;
    let key = 0;

    for (const match of linea.matchAll(regexToken)) {

        if (esAcorde(match[1])) {

            if (!match.indices[1]) continue;

            const [start, end] = match.indices[1];
            const textoAntes = linea.slice(cursor, start);
            const textoAcorde = linea.slice(start, end);

            if (textoAntes) resultado.push(textoAntes);
            resultado.push(procesarAcorde(textoAcorde, notacion, transpuesta, cejilla, `la-${id_linea}-${++key}`));

            cursor = end;
        }
    }

    // Añadir cualquier texto restante después del último acorde
    const resto = linea.slice(cursor);
    if (resto) resultado.push(resto);

    return resultado;
}

/** Formatea la letra de una canción 
 * 
 * @param {string} content letra de la canción
 * @param {string} notation notación 
 * @param {int} transpose transposición total
 * @param {int} capo traste de la cejilla
 * @param {Boolean} showChords True para mostrar acordes
 * 
 * @returns Canción completa procesada con los componentes Acordes
 */
export function Formatear(content, notation, transpose, capo, showChords) {
    if (!content || content.length === 0) return null;

    // Separa la líneas líneas (acaban en retornos de carro o salto de línea)
    const lineas = content.split(/\r?\n/);

    const lineasProcesadas = []; // Cadena a devolver

    let enEstribillo = false;
    let bloqueEstribillo = [];
    let bloqueIndice = 0; // Para las keys del estribillo

    for (let i = 0; i < lineas.length; i++) {

        // Le quito los espacios en blanco del final
        const linea = lineas[i].trimEnd();

        // Si la línea  es "[Estribillo]" (quitándole los espacios del principio y del final)
        if (linea.trim() === '[Estribillo]') {
            enEstribillo = true;
            bloqueEstribillo = [];
            continue;
        }
        // Si la línea es "[/Estribillo]" (quitándole los espacios del principio y del final) 
        else if (linea.trim() === '[/Estribillo]') {

            // Renderizar el bloque de estribillo
            lineasProcesadas.push(
                <Estribillo key={`estribillo-${bloqueIndice}`}>
                    {bloqueEstribillo}
                </Estribillo>
            );

            bloqueIndice++;
            enEstribillo = false;
            continue;
        }

        const lineaFormateada = (() => {
            // Si la línea está en blanco devuelvo el salto de línea (creo que no hace falta)
            if (linea === '') {
                return <Text key={`br-${i}`}>{'\n'}</Text>;

            }

            // Si la línea es de acordes la proceso
            else if (esLineaDeAcordes(linea)) {
                return (showChords &&
                    <Text key={`acorde-${i}`}>
                        {procesarLineaAcordes(linea, notation, transpose, capo, i)}
                        {'\n'}
                    </Text> 
                );
            }

            // Si la línea no es de acordes la añado tal cual
            else {
                return (
                    <Text key={`texto-${i}`}>
                        {linea}
                        {'\n'}
                    </Text>
                );
            }
        })();

        // La añado al tramo que corresponda
        if (enEstribillo) {
            bloqueEstribillo.push(lineaFormateada);
        } else {
            lineasProcesadas.push(lineaFormateada);
        }
    }

    return lineasProcesadas;
}

/**  Índice de una nota
 * 
 * @param {string} nota Nota de la que se quiere saber el índice
 * 
 * @returns Índice de una nota (número del 0 al 11)
*/
function Indice(nota) {
    const notaMinuscula = nota.toLowerCase();

    for (const region in notes) {
        for (const tipo in notes[region]) {
            const arr = notes[region][tipo];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase() === notaMinuscula) {
                    return i;
                }
            }
        }
    }

    return -1;
}

/** Devuelve la nota dado un índice (según la notación seleccionada)
 * 
 * @param {int} indice 
 * @param {string} notacion 
 * 
 * @returns Nota según la notación
 */
function NotaIndice(indice, notacion) {
    const acordes = notes[notacion["language"]][notacion["mode"]];

    while (indice < 0) {
        indice += acordes.length;
    }

    return acordes[indice % acordes.length];
}

/** Formatea un acorde
 * 
 * @param {string} nota 
 * @param {string} variacion
 * @param {string} bajo
 * @param {int} transpuesta
 * @param {string} notacion 
 * 
 * @returns Nota ajustada con el formato NotaVariacion/Bajo y según el tono y la variación
*/
export function formatearAcorde(nota, variacion, bajo, transpuesta, notacion) {

    let nota_procesada = (nota && nota.length > 0) ? NotaIndice(Indice(nota) + transpuesta, notacion) : "";
    let variacion_procesada = (variacion && variacion.length > 0) ? variacion : "";
    let bajo_procesado = (bajo && bajo.length > 0) ? "/" + NotaIndice(Indice(bajo) + transpuesta, notacion) : "";

    // Pongo en minúscula la nota si la variación es menor
    if (nota_procesada && notacion["language"] == "europe" && variacion_procesada.length !== 0 && variacion_procesada.at(0) === 'm'
        && (variacion_procesada.length === 1 || !isNaN(parseInt(variacion_procesada.at(1))))) {
        nota_procesada = nota_procesada.toLowerCase();
    }

    // console.log(`Desde Acorde: Nota: |${nota_procesada}| Variación: |${variacion_procesada}| Bajo: |${bajo_procesado}|`)

    return (nota_procesada + variacion_procesada + bajo_procesado)
}