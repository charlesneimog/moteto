// =====================================
// ========== VOICE STRUCTURES =========
// =====================================
const TIME_MULTIPLIER = 2.668;
const POEMA_CHOICE = randomInt(0, 4); //
const TARGETLEN = 69; // Numero de eventos
const deviation = 5; // Numero maximo de repetições de cada frase do poema


function getRandomRepetitionCount(baseCount, deviation) {
    const minCount = baseCount - deviation;
    const maxCount = baseCount + deviation;
    return Math.round(Math.random() * (maxCount - minCount) + minCount);
}

function POEMAS_LEN(poema){
    const result = [];
    while (result.length < TARGETLEN) {
        for (let i = 0; i < poema.length; i++) {
            const phrase = poema[i][0];
            const phonemes = poema[i][1];
            const weights = poema[i][2];

            // Generate a random repetition count for this iteration
            const randomRepetitionCount = getRandomRepetitionCount(TARGETLEN / poema.length, deviation);

            // Make sure the repetition count doesn't exceed the target length
            const remainingLength = TARGETLEN - result.length;
            const repetitionCount = Math.min(randomRepetitionCount, remainingLength);

            for (let j = 0; j < repetitionCount; j++) {
                result.push([phrase, phonemes, weights]);
            }
        }
    }
    return result;
}

// POEMA
const ADAO_NORMAL = [
    ["Ocre caminhar", ['ocre', 'ca', 'mi', 'nhar'], [0.25, 0.25, 0.25, 0.25]],
    ["D'olhos cansados à macieira", ["d'o", 'lhos', 'can', 'sa', 'dos', 'à', 'ma', 'ci', 'ei', 'ra'], [0.1, 0.04, 0.16, 0.13, 0.05, 0.13, 0.04, 0.04, 0.19, 0.12]],
    ['Olhara o corpo de esguio timbre', ['olha', 'ra', 'o', 'cor', 'po', 'de', 'es', 'guio', 'tim', 'bre'], [0.17, 0.22, 0.01, 0.16, 0.01, 0.04, 0.04, 0.23, 0.04, 0.08]],
    ['Tanto daquela', ['tan', 'to', 'da', 'que', 'la'], [0.35, 0.07, 0.24, 0.06, 0.28]],
    ['quanto daquilo.', ['quan', 'to', 'da', 'qui', 'lo'], [0.34, 0.1, 0.03, 0.24, 0.29]],
    ['Semblante cálido ao piche anda', ['sem', 'blan', 'te', 'cá', 'li', 'do', 'ao', 'pi', 'che', 'an', 'da'], [0.13, 0.14, 0.0, 0.13, 0.05, 0.09, 0.16, 0.12, 0.04, 0.08, 0.06]],
    ['Quebrada a regra', ['que', 'bra', 'da', 'a', 're', 'gra'], [0.18, 0.06, 0.25, 0.25, 0.01, 0.25]],
    ['ventos que sopram', ['ven', 'tos', 'que', 'so', 'pram'], [0.06, 0.25, 0.22, 0.21, 0.26]],
    ['Fez a si homem na relva prata.', ['fez', 'a', 'si', 'ho', 'mem', 'na', 'rel', 'va', 'pra', 'ta'], [0.16, 0.09, 0.07, 0.14, 0.01, 0.05, 0.1, 0.15, 0.08, 0.16]],
    ['Dá vida o gosto de terra seca.', ['dá', 'vi', 'da', 'o', 'gos', 'to', 'de', 'ter', 'ra', 'se', 'ca'], [0.08, 0.15, 0.15, 0.06, 0.17, 0.08, 0.01, 0.0, 0.1, 0.16, 0.03]],
    ['Sangrar-se-á.', ['san', 'grar', 'se', 'á'], [0.32, 0.22, 0.04, 0.42]],
];

const ADAO = POEMAS_LEN(ADAO_NORMAL);

const LAMENTACAO_NORMAL = [
    ['Outrora o templo de Deus habitara', ['ou', 'tro', 'ra', 'o', 'tem', 'plo', 'de', 'deus', 'ha', 'bi', 'ta'], [0.0, 0.16, 0.07, 0.0, 0.08, 0.15, 0.06, 0.18, 0.11, 0.03, 0.16]],
    ['Quente sua língua, ', ['quen', 'te', 'sua', 'lín', 'gua'], [0.43, 0.04, 0.06, 0.4, 0.07]],
    ["s'alimentara", ["s'a", 'li', 'men', 'ta', 'ra'], [0.19, 0.14, 0.23, 0.28, 0.16]] ,
    ["Desta que em riste sorvia n'alma: ", ['des', 'ta', 'que', 'em', 'ris', 'te', 'sor', 'via', "n'al", 'ma:'], [0.09, 0.09, 0.17, 0.08, 0.06, 0.18, 0.19, 0.06, 0.01, 0.07]] ,
    ['Maná; e Ambrosia.', ['ma', 'ná;', 'e', 'am', 'bro', 'sia'], [0.04, 0.09, 0.29, 0.37, 0.03, 0.18]] ,
    ['De deus na boca tínhamos casa,', ['de', 'deus', 'na', 'bo', 'ca', 'tí', 'nha', 'mos', 'sa'], [0.08, 0.16, 0.19, 0.01, 0.1, 0.08, 0.17, 0.18, 0.03]] ,
    ['de nosso o lar, ', ['de', 'nos', 'so', 'o', 'lar'], [0.3, 0.03, 0.24, 0.05, 0.38]] ,
    ['agora ingrato.', ['ago', 'ra', 'in', 'gra', 'to'], [0.47, 0.04, 0.03, 0.12, 0.34]] ,
    ['Desta suas mãos provia afago,', ['des', 'ta', 'su', 'as', 'mãos', 'pro', 'via', 'afa', 'go'], [0.18, 0.08, 0.11, 0.14, 0.09, 0.09, 0.14, 0.1, 0.07]] ,
    ['Dos pés daquele: ', ['dos', 'pés', 'da', 'que', 'le:'], [0.19, 0.29, 0.3, 0.08, 0.14]] ,
    ['a reverência', ['a', 're', 've', 'rên', 'cia'], [0.16, 0.23, 0.26, 0.13, 0.22]] ,
    ['Torna-te agora senhor das armas, ', ['tor', 'na', 'te', 'ago', 'ra', 'se', 'nhor', 'das', 'ar', 'mas'], [0.17, 0.14, 0.06, 0.03, 0.18, 0.13, 0.03, 0.08, 0.01, 0.17]] ,
    ['piedade fora de ti nã’alcança.', ['pi', 'e', 'da', 'de', 'fo', 'ra', 'ti', 'nã’al', 'can', 'ça'], [0.14, 0.14, 0.06, 0.06, 0.04, 0.08, 0.17, 0.19, 0.02, 0.1]] ,
    ['Aqui jaz esperança, ', ['aqui', 'jaz', 'es', 'pe', 'ran', 'ça'], [0.1, 0.13, 0.22, 0.22, 0.3, 0.03]] ,
    ['honra e furor: ', ['hon', 'ra', 'e', 'fu', 'ror:'], [0.17, 0.12, 0.27, 0.23, 0.21]] ,
    ['à porta do paraíso.', ['à', 'por', 'ta', 'do', 'pa', 'ra', 'í', 'so'], [0.21, 0.01, 0.2, 0.14, 0.01, 0.06, 0.2, 0.17]] ,
];

const LAMENTACAO = POEMAS_LEN(LAMENTACAO_NORMAL);

const CAMINHAM_NO_DESERTO_NORMAL = [
    ['Ah, Ah, que este solo que aos pés recua', ['ah', 'que', 'es', 'te', 'so', 'lo', 'aos', 'pés', 're', 'cua'], [0.05, 0.13, 0.13, 0.07, 0.06, 0.17, 0.08, 0.03, 0.1, 0.18]] ,
    ['Que a pele deste tanto é tão fina, ', ['que', 'a', 'pe', 'le', 'des', 'te', 'tan', 'to', 'é', 'tão', 'fi', 'na'], [0.06, 0.1, 0.14, 0.04, 0.02, 0.15, 0.11, 0.14, 0.08, 0.03, 0.06, 0.07]] ,
    ['assim pois não', ['as', 'sim', 'pois', 'não'], [0.37, 0.49, 0.0, 0.14]] ,
    ['costume tinha: ', ['cos', 'tu', 'me', 'ti', 'nha:'], [0.09, 0.25, 0.2, 0.23, 0.23]] ,
    ['o sol, ', ['o', 'sol'], [0.65, 0.35]] ,
    ['perdida a graça, ', ['per', 'di', 'da', 'a', 'gra', 'ça'], [0.22, 0.03, 0.18, 0.17, 0.23, 0.17]] ,
    ['reclama-te!', ['re', 'cla', 'ma', 'te'], [0.23, 0.02, 0.42, 0.33]] ,
    ['Ah, queima, ', ['ah', 'quei', 'ma'], [0.53, 0.47, 0.0]] ,
    ['tão logo ao toque, ', ['tão', 'lo', 'go', 'ao', 'to', 'que'], [0.09, 0.34, 0.06, 0.21, 0.22, 0.08]] ,
    ['fineto o véu: ', ['fi', 'ne', 'to', 'o', 'véu:'], [0.0, 0.27, 0.34, 0.11, 0.28]] ,
    ['à separar-se.', ['à', 'se', 'pa', 'rar'], [0.22, 0.38, 0.07, 0.33]] ,
    ['No que ao firmar, ', ['no', 'que', 'ao', 'fir', 'mar'], [0.03, 0.42, 0.01, 0.32, 0.22]] ,
    ['ao separar-se: ', ['ao', 'se', 'pa', 'rar', 'se:'], [0.26, 0.24, 0.09, 0.18, 0.23]] ,
    ['rubro vermelho sangue,', ['ru', 'bro', 'ver', 'me', 'lho', 'san', 'gue'], [0.25, 0.02, 0.08, 0.14, 0.1, 0.25, 0.16]] ,
    ["Marc'o caminho que rastejar-se.", ["marc'o", 'ca', 'mi', 'nho', 'que', 'ras', 'te', 'jar', 'se'], [0.15, 0.09, 0.12, 0.17, 0.22, 0.04, 0.0, 0.01, 0.2]] ,
    ['Ah! ', ['ah'], [1.0]] ,
    ['Sorve o astro tais qualidades, ', ['sor', 've', 'o', 'as', 'tro', 'tais', 'qua', 'li', 'da', 'des'], [0.03, 0.2, 0.2, 0.01, 0.07, 0.07, 0.15, 0.16, 0.1, 0.01]] ,
    ['do peito homem:', ['do', 'pei', 'to', 'ho', 'mem:'], [0.28, 0.12, 0.23, 0.14, 0.23]] ,
    ['Sais à provocar-lhe, ', ['sais', 'à', 'pro', 'vo', 'car', 'lhe'], [0.21, 0.11, 0.17, 0.13, 0.12, 0.26]] ,
    ['conclama à Deus rependimentos', ['con', 'cla', 'ma', 'à', 'deus', 're', 'pen', 'di', 'men', 'tos'], [0.02, 0.1, 0.05, 0.09, 0.21, 0.13, 0.09, 0.15, 0.14, 0.02]] ,
    ['Ah - diz', ['ah', 'diz'], [0.4, 0.6]] ,
    ['Deixe-me ao útero de mais uma vez: ', ['dei', 'xe', 'me', 'ao', 'úte', 'ro', 'de', 'mais', 'uma', 'vez:'], [0.02, 0.03, 0.07, 0.12, 0.17, 0.12, 0.09, 0.05, 0.16, 0.17]] ,
    ['tornar-te.', ['tor', 'nar', 'te'], [0.31, 0.55, 0.14]] ,
];

const CAMINHAM_NO_DESERTO = POEMAS_LEN(CAMINHAM_NO_DESERTO_NORMAL);


const SOBRE_A_AREIA_NORMAL = [
    ['Percebendo-se de carne armadura, ', ['per', 'ce', 'ben', 'do', 'se', 'de', 'car', 'ne', 'ar', 'ma', 'du', 'ra'], [0.03, 0.13, 0.14, 0.02, 0.1, 0.1, 0.11, 0.11, 0.08, 0.05, 0.02, 0.11]] ,
    ['mais uma vez tocaram-se', ['mais', 'uma', 'vez', 'to', 'ca', 'ram', 'se'], [0.0, 0.09, 0.1, 0.08, 0.27, 0.23, 0.23]] ,
    ['Pois assim quis o altíssimo e era imperioso que o fizessem.', ['pois', 'as', 'sim', 'quis', 'o', 'al', 'tís', 'si', 'mo', 'e', 'era', 'im', 'pe', 'ri', 'so', 'que', 'fi', 'zes', 'sem'], [0.01, 0.06, 0.03, 0.02, 0.07, 0.04, 0.05, 0.03, 0.06, 0.06, 0.06, 0.09, 0.09, 0.02, 0.12, 0.01, 0.02, 0.04, 0.12]] ,
    ['Pois assim, ', ['pois', 'as', 'sim'], [0.42, 0.14, 0.44]] ,
    ['ao lento sangue: ', ['ao', 'len', 'to', 'san', 'gue:'], [0.12, 0.41, 0.14, 0.16, 0.17]] ,
    ['pulsar-te-ei, ', ['pul', 'sar', 'te', 'ei'], [0.0, 0.44, 0.26, 0.3]] ,
    ['que ao primeiro toque permuta.', ['que', 'ao', 'pri', 'mei', 'ro', 'to', 'per', 'mu', 'ta'], [0.18, 0.16, 0.16, 0.08, 0.09, 0.1, 0.05, 0.01, 0.17]] ,
    ["Permuta o tempo todas su'horas, ", ['per', 'mu', 'ta', 'o', 'tem', 'po', 'to', 'das', "su'ho", 'ras'], [0.1, 0.12, 0.1, 0.2, 0.03, 0.15, 0.1, 0.04, 0.09, 0.07]] ,
    ['gritando pare que aqui, ', ['gri', 'tan', 'do', 'pa', 're', 'que', 'aqui'], [0.15, 0.12, 0.15, 0.23, 0.15, 0.2, 0.0]] ,
    ['aqui o deixe.', ['aqui', 'o', 'dei', 'xe'], [0.21, 0.51, 0.24, 0.04]] ,
    ['Assim, ', ['as', 'sim'], [0.91, 0.09]] ,
    ['dizem os amantes, ', ['di', 'zem', 'os', 'aman', 'tes'], [0.36, 0.12, 0.07, 0.44, 0.01]] ,
    ['no pulular do tempo, ', ['no', 'pu', 'lu', 'lar', 'do', 'tem', 'po'], [0.2, 0.11, 0.06, 0.03, 0.05, 0.3, 0.25]] ,
    ['das estrelas e da desesperança:', ['das', 'es', 'tre', 'las', 'e', 'da', 'de', 'ses', 'pe', 'ran', 'ça:'], [0.07, 0.13, 0.0, 0.01, 0.18, 0.12, 0.05, 0.04, 0.09, 0.15, 0.16]] ,
    ['Adão... Adão... Eu te amo. ', ['adão', 'eu', 'te', 'amo'], [0.34, 0.02, 0.36, 0.28]] ,
    ['Como era imperioso que o fizesse.', ['co', 'mo', 'era', 'im', 'pe', 'ri', 'o', 'so', 'que', 'fi', 'zes', 'se'], [0.08, 0.03, 0.03, 0.13, 0.05, 0.07, 0.1, 0.02, 0.1, 0.14, 0.17, 0.08]] ,
    ['Eva... Eva... Eu te amo. ', ['eva', 'eu', 'te', 'amo'], [0.34, 0.18, 0.34, 0.14]] ,
    ['Como era imperioso que o fizesse.', ['co', 'mo', 'era', 'im', 'pe', 'ri', 'o', 'so', 'que', 'fi', 'zes', 'se'], [0.12, 0.09, 0.18, 0.11, 0.08, 0.15, 0.02, 0.06, 0.02, 0.04, 0.11, 0.02]] ,
];

const SOBRE_A_AREIA = POEMAS_LEN(SOBRE_A_AREIA_NORMAL);

const VEEM_ADAO_EVA_NORMAL = [
    ['No colorido do tempo saber-se-ia dos desígnios de Cronos', ['no', 'co', 'lo', 'ri', 'do', 'tem', 'po', 'sa', 'ber', 'se', 'ia', 'dos', 'de', 'síg', 'nios', 'cro', 'nos'], [0.08, 0.07, 0.02, 0.05, 0.08, 0.02, 0.1, 0.05, 0.05, 0.04, 0.09, 0.03, 0.05, 0.12, 0.1, 0.05, 0.0]] ,
    ['e sua ilícita atividade', ['e', 'sua', 'ilí', 'ci', 'ta', 'ati', 'vi', 'da', 'de'], [0.15, 0.04, 0.12, 0.06, 0.12, 0.16, 0.1, 0.16, 0.09]] ,
    ['Pois que ambos um só viram do farfalhar das asas parar o movimento.', ['pois', 'que', 'am', 'bos', 'um', 'só', 'vi', 'ram', 'do', 'far', 'fa', 'lhar', 'das', 'asas', 'pa', 'rar', 'o', 'mo', 'men', 'to'], [0.07, 0.0, 0.1, 0.1, 0.03, 0.07, 0.03, 0.05, 0.06, 0.0, 0.08, 0.09, 0.08, 0.1, 0.0, 0.02, 0.04, 0.01, 0.07, 0.0]] ,
    ['Caía do céu pássaro que outrora voa,', ['ca', 'ía', 'do', 'céu', 'pás', 'sa', 'ro', 'que', 'ou', 'tro', 'ra', 'voa'], [0.06, 0.14, 0.15, 0.03, 0.03, 0.08, 0.13, 0.11, 0.07, 0.1, 0.05, 0.05]] ,
    ['canta,', ['can', 'ta'], [0.24, 0.76]] ,
    ['e dos verdejantes vivos espalha sêmem e bem aventurança.', ['e', 'dos', 'ver', 'de', 'jan', 'tes', 'vi', 'vos', 'es', 'pa', 'lha', 'sê', 'mem', 'bem', 'aven', 'tu', 'ran', 'ça'], [0.1, 0.0, 0.07, 0.09, 0.1, 0.04, 0.0, 0.01, 0.08, 0.02, 0.06, 0.04, 0.1, 0.09, 0.1, 0.05, 0.02, 0.03]] ,
    ['Sangra a escuridão das horas,', ['san', 'gra', 'a', 'es', 'cu', 'ri', 'dão', 'das', 'ho', 'ras'], [0.05, 0.12, 0.12, 0.03, 0.11, 0.12, 0.12, 0.15, 0.13, 0.05]] ,
    ['do mundo e sua impaciência,', ['do', 'mun', 'e', 'sua', 'im', 'pa', 'ciên', 'cia'], [0.23, 0.09, 0.13, 0.05, 0.05, 0.15, 0.15, 0.15]] ,
    ['Que nas inadequações da vida o homem encontra resistência e pranto seu próprio.', ['que', 'nas', 'ina', 'de', 'qua', 'ções', 'da', 'vi', 'o', 'ho', 'mem', 'en', 'con', 'tra', 're', 'sis', 'tên', 'cia', 'e', 'pran', 'to', 'seu', 'pró', 'prio'], [0.03, 0.0, 0.03, 0.09, 0.06, 0.05, 0.0, 0.0, 0.03, 0.08, 0.1, 0.0, 0.08, 0.0, 0.02, 0.08, 0.06, 0.05, 0.1, 0.06, 0.01, 0.01, 0.04, 0.02]] ,
    ['Assim quis o senhor:', ['as', 'sim', 'quis', 'o', 'se', 'nhor:'], [0.03, 0.19, 0.09, 0.27, 0.17, 0.25]] ,
    ['Fome, males, a dor do mundo.', ['fo', 'me', 'ma', 'les', 'a', 'dor', 'do', 'mun'], [0.08, 0.11, 0.18, 0.15, 0.1, 0.13, 0.17, 0.08]] ,
    ['Conquanto tente não se resolve,', ['con', 'quan', 'to', 'ten', 'te', 'não', 'se', 're', 'sol', 've'], [0.19, 0.13, 0.04, 0.0, 0.15, 0.02, 0.21, 0.15, 0.04, 0.07]] ,
    ['e o sentido, qual é?', ['e', 'o', 'sen', 'ti', 'do', 'qual', 'é'], [0.06, 0.26, 0.01, 0.07, 0.22, 0.25, 0.13]] ,
    ['O corpo:', ['o', 'cor', 'po:'], [0.74, 0.16, 0.1]] ,
    ['Aquilo que eres máquina de se existires trará-te-a dores extremas', ['aqui', 'lo', 'que', 'eres', 'má', 'qui', 'na', 'de', 'se', 'exis', 'ti', 'res', 'tra', 'rá', 'te', 'a', 'do', 'ex', 'tre', 'mas'], [0.0, 0.05, 0.02, 0.04, 0.01, 0.09, 0.0, 0.1, 0.01, 0.1, 0.06, 0.01, 0.01, 0.09, 0.04, 0.1, 0.05, 0.03, 0.08, 0.11]] ,
    ['De criaturas,', ['de', 'cri', 'a', 'tu', 'ras'], [0.24, 0.16, 0.11, 0.45, 0.04]] ,
    ['também que existem,', ['tam', 'bém', 'que', 'exis', 'tem'], [0.15, 0.18, 0.53, 0.05, 0.09]] ,
    ['sois invisivéis,', ['sois', 'in', 'vi', 'si', 'véis'], [0.39, 0.23, 0.21, 0.13, 0.04]] ,
    ['males.', ['ma', 'les'], [0.07, 0.93]] ,
    ['Não só do externo sofr’este o homem,', ['não', 'só', 'do', 'ex', 'ter', 'no', 'so', 'fr’es', 'te', 'o', 'ho', 'mem'], [0.09, 0.04, 0.12, 0.09, 0.11, 0.06, 0.12, 0.01, 0.11, 0.11, 0.03, 0.11]] ,
    ['tal qual doença grita o corpo:', ['tal', 'qual', 'do', 'en', 'ça', 'gri', 'ta', 'o', 'cor', 'po:'], [0.2, 0.04, 0.01, 0.09, 0.05, 0.16, 0.05, 0.21, 0.16, 0.03]] ,
    ['Náuseas, cansaço, dores e acabamento. ', ['náu', 'seas', 'can', 'sa', 'ço', 'do', 'res', 'e', 'aca', 'ba', 'men', 'to'], [0.05, 0.02, 0.08, 0.19, 0.02, 0.06, 0.05, 0.18, 0.07, 0.04, 0.18, 0.06]] ,
    ['Grita.', ['gri', 'ta'], [0.62, 0.38]] ,
    ['A alma:', ['a', 'al', 'ma:'], [0.11, 0.76, 0.13]] ,
    ["D'alma cansada sofreste o espírito, ", ["d'al", 'ma', 'can', 'sa', 'da', 'so', 'fres', 'te', 'o', 'es', 'pí', 'ri', 'to'], [0.02, 0.09, 0.05, 0.08, 0.11, 0.1, 0.06, 0.07, 0.1, 0.1, 0.11, 0.04, 0.07]] ,
    ['no amanhã,', ['no', 'ama', 'nhã'], [0.58, 0.19, 0.23]] ,
    ['outro amanhã.', ['ou', 'tro', 'ama', 'nhã'], [0.62, 0.0, 0.2, 0.18]] ,
    ['Como este em piche perde as vontades, ', ['co', 'mo', 'es', 'te', 'em', 'pi', 'che', 'per', 'de', 'as', 'von', 'ta', 'des'], [0.16, 0.1, 0.08, 0.12, 0.13, 0.08, 0.01, 0.11, 0.14, 0.02, 0.0, 0.03, 0.02]] ,
    ['caminha abaixo sê sim naufrágio.', ['ca', 'mi', 'nha', 'abai', 'xo', 'sê', 'sim', 'nau', 'frá', 'gio'], [0.19, 0.2, 0.1, 0.08, 0.16, 0.04, 0.14, 0.01, 0.07, 0.01]] ,
    ['Perpétua languidez:', ['per', 'pé', 'tua', 'lan', 'gui', 'dez:'], [0.23, 0.13, 0.26, 0.16, 0.02, 0.2]] ,
    ['tão logo falta,', ['tão', 'lo', 'go', 'fal', 'ta'], [0.19, 0.23, 0.21, 0.34, 0.03]] ,
    ['em vida: significado.', ['em', 'vi', 'da:', 'sig', 'ni', 'fi', 'ca', 'do'], [0.11, 0.11, 0.01, 0.05, 0.04, 0.21, 0.3, 0.17]] ,
];

const VEEM_ADAO_EVA = POEMAS_LEN(VEEM_ADAO_EVA_NORMAL);

// ===================================================
const POEMAS = [ADAO, LAMENTACAO, CAMINHAM_NO_DESERTO, SOBRE_A_AREIA, VEEM_ADAO_EVA];
const POEMA = POEMAS[POEMA_CHOICE];
var PHRASE = 0

class Baixo {
    constructor() {
        this.higherNote = 6000;
        this.lowerNote = 4300;
    }
}

// =====================================
class Tenor {
    constructor() {
        this.higherNote = 6200;
        this.lowerNote = 4800;
    }
}

// =====================================
class Contralto {
    constructor() {
        this.higherNote = 6900;
        this.lowerNote = 5600;
    }
}

// =====================================
class Soprano {
    constructor() {
        this.higherNote = 7400;
        this.lowerNote = 6000;
    }
}

// =====================================
// ========== TIME STRUCTURES ==========
// =====================================

class MicroEvent {
    constructor(eventNumber) {
        this.eventNumber = eventNumber;
        this.notes = [];
        this.notesProbabilities = [];
        this.notesMidicent = [];
        this.syllables = [];
        this.syllablesProbabilities = [];
        this.completePhrase = "";
        this.breathTime = 800;
        this.microEventString = "";
        this.possibleDurations = [];
        this.mkPartialTracking = false;
        this.clearPartialTracking = false;
        this.replaceNotes = false;
        this.notes2replace = [];
        // respire
        this.breath = false;
        this.breathProbability = 0;
    }
    
    getDuration(){
        // console.log("microevent dur: " + this.possibleDurations[0]);
        return this.possibleDurations[0];
    }
}

// =====================================
class MediumEvent {
    constructor(eventNumber) {
        this.MicroEvents = [];
        this.eventNumber = eventNumber;
        this.lastEvent = false;
        this.totalDuration = 0;
    }

    getDuration(){
        return this.totalDuration;
    }

    add(microEvent){
        this.MicroEvents.push(microEvent);
        this.totalDuration += microEvent.getDuration();
        // console.log("Total duration: " + this.totalDuration);
    }

}

// =====================================
class MacroEvent {
    constructor(eventNumber){
        this.MediumEvents = [];
        this.eventNumber = eventNumber;
        this.totalDuration = 0;
        this.thisEventNumber = 0;
    }
    getDuration(){
        return this.totalDuration;
    }

    add(mediumEvent){
        this.MediumEvents.push(mediumEvent);
        this.totalDuration += mediumEvent.getDuration();
    }
}

// =====================================
class PieceEvent {
    constructor(){
        this.allMacroEvents = [];
        this.totalDuration = 0;
    }

    // make function to get the total duration the the piece event
    getDuration(){
        // console.log("Duration: " + this.totalDuration);
        return this.totalDuration;
    }

    add(macroEvent){
        this.allMacroEvents.push(macroEvent);
        this.totalDuration += macroEvent.getDuration();
        // console.log("Total duration: " + this.totalDuration * TIME_MULTIPLIER);
    }

}

// ========
// CREATORS
// ========

function createMicroEvent(eventNumber) {
    return new MicroEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function createMediumEvent(eventNumber) {
    return new MediumEvent(eventNumber);
}

// ++++++++++++++++++++++++++++++++
function createMacroEvent(eventNumber) {
    return new MacroEvent(eventNumber);    
}

// ++++++++++++++++++++++++++++++++
function createPieceEvents(eventNumber) {
    return new PieceEvent(eventNumber);    
}

// =========================================================== //
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// ++++++++++ ALL EVENTS ++++++++++++++++ ALL EVENTS +++++++++ //
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// =========================================================== //

let pieceEvents;
let macroEvent;
let mediumEvent;
let microEvent;


pieceEvents = createPieceEvents();

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 1 +++++++
// ++++++++++++++++++++++++++++++++

// /*
macroEvent = createMacroEvent(1);
let microEventTuplet= randomInt(1, 3);
// console.log("Tuplet variation of Macro event 1: " + microEventTuplet);

if (microEventTuplet == 1) {
    var totalDuration = 0;
    mediumEvent = createMediumEvent(1);
    var times1 = [3333, 4000, 3000];
    var times2 = [3333, 4000, 3000];
    var times3 = [4334, 3000, 5000];
    
    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);

    // ==== add macro event to piece event ====
    macroEvent.add(mediumEvent); 
    // ========================================


    mediumEvent = createMediumEvent(2);
    times1 = [7000, 7000, 8000];
    times2 = [6500, 6500, 5000];
    times3 = [5500, 5500, 6000];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent); 

    mediumEvent = createMediumEvent(3);
    // times1 10
    times1 = [3333, 4000, 3000];
    times2 = [3333, 4000, 3000];
    times3 = [3334, 2000, 4000];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);


    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1"; 
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);

    // ==== add macro event to piece event ====
    macroEvent.add(mediumEvent); 
    // ========================================
}

else if (microEventTuplet == 2) {
    mediumEvent = createMediumEvent(1);
    var times1 = [5000, 7000, 3000];
    var times2 = [5000, 6000, 4000];
    var times3 = [5000, 2000, 8000];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);


    mediumEvent = createMediumEvent(2);
    times1 = [5000, 7000, 3000];
    times2 = [5000, 6000, 4000];
    times3 = [5000, 2000, 8000];
    
    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.40, 0.30, 0.20];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.40, 0.20, 0.30, 0.10];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent); 

    mediumEvent = createMediumEvent(3);
    times1 = [3333, 4000, 3000];
    times2 = [3333, 4000, 3000];
    times3 = [3334, 2000, 4000];
    
    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);
    
    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);
    
    // MACRO EVENT
    macroEvent.add(mediumEvent);

}

else if (microEventTuplet == 3) {
    // duracao total deve ser 13.4, 13.3, 13.3

    mediumEvent = createMediumEvent(1);
    var times1 = [5000, 6000, 7000];
    var times2 = [4500, 4500, 3500];
    var times3 = [3900, 2900, 2900];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.1.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.1.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c4", 6000]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.1.3";
    mediumEvent.add(microEvent);
    
    // MACRO EVENT
    macroEvent.add(mediumEvent);

    mediumEvent = createMediumEvent(2);
    times1 = [5000, 6000, 7000];
    times2 = [5000, 4000, 3300];
    times3 = [3300, 3300, 3000];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.2.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.2.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088], ["f4", 6493], ["g+3", 5547], ["c4", 6000]];
    microEvent.notesProbabilities = [0.10, 0.10, 0.10, 0.70];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.2.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);

    mediumEvent = createMediumEvent(3);
    times1 = [5000, 6000, 7000];
    times2 = [5000, 4000, 3300];
    times3 = [3300, 3300, 3000];

    times1 = times1.map(element => element * TIME_MULTIPLIER);
    times2 = times2.map(element => element * TIME_MULTIPLIER);
    times3 = times3.map(element => element * TIME_MULTIPLIER);

    var microvariacao = randomInt(1, 3);

    microEvent = createMicroEvent(1);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times1[microvariacao - 1]];
    microEvent.microEventString = "1.3.1";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(2);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times2[microvariacao - 1]];
    microEvent.microEventString = "1.3.2";
    mediumEvent.add(microEvent);

    microEvent = createMicroEvent(3);
    microEvent.notes = [["c#4", 6088]];
    microEvent.notesProbabilities = [1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;
    microEvent.possibleDurations = [times3[microvariacao - 1]];
    microEvent.microEventString = "1.3.3";
    mediumEvent.add(microEvent);

    // MACRO EVENT
    macroEvent.add(mediumEvent);
}

pieceEvents.add(macroEvent);

if (pieceEvents.getDuration() != (40000 * TIME_MULTIPLIER)) {
    alert("Algum erro aconteceu, recarregue a página");
}

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 2 +++++++
// ++++++++++++++++++++++++++++++++

// NOTE: here sync all the events

macroEvent = createMacroEvent(2);
microEventTuplet= randomInt(1, 3);
// console.log("Tuplet variation of Macro event 2: " + microEventTuplet);
 
if (microEventTuplet == 1) {
    // -------- microEvent 2.1 --------
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 / tupletValue) * TIME_MULTIPLIER;
        if (i == 0){
            var breathTimeValue = 1400 * TIME_MULTIPLIER;
        }
        else{
            var breathTimeValue = 500 * TIME_MULTIPLIER;
        }
        totalDuration += tupletValueMs;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    
    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(3, 6);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = ((20000 * TIME_MULTIPLIER) / tupletValue);
        var breathTimeValue = 1500 * TIME_MULTIPLIER;
        totalDuration += tupletValueMs;
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.3 --------
    mediumEvent = createMediumEvent(5);
    microEvent = createMicroEvent(1);
    microEvent.notes = [["e3", 5200], ["c#4", 6084], ["e4", 6400], ["g4", 6666]]; 
    microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    PHRASE += 1;

    microEvent.breathTime = 1000;
    microEvent.possibleDurations = [5000 * TIME_MULTIPLIER];
    microEvent.microEventString = "2.3.1";
    mediumEvent.add(microEvent);
    macroEvent.add(mediumEvent);

     // -------- microEvent 2.4 --------
    mediumEvent = createMediumEvent(6);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        microEvent = createMicroEvent(i + 1);
        var tupletValueMs = (15000 * TIME_MULTIPLIER) / tupletValue;
        totalDuration += tupletValueMs;
        microEvent.notes = [["e3", 5200], ["f#3", 5400], ["e4", 6400], ["f#4", 6600], ["d4", 6169]];
        microEvent.notesProbabilities = [0.2, 0.2, 0.2, 0.2, 0.2];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = 1000;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
}

else if (microEventTuplet == 2) {
    // VARIAÇÃO 2
    // -------- microEvent 2.1 --------
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(2, 3);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER)
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    
    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.3 --------
    mediumEvent = createMediumEvent(6);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.4 --------
    mediumEvent = createMediumEvent(7);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.5 --------
    mediumEvent = createMediumEvent(8);
    var tupletValue = randomInt(2, 5);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
}

else if (microEventTuplet == 3) {
        // VARIAÇÃO 2
    mediumEvent = createMediumEvent(4);
    var tupletValue = randomInt(3, 7);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (23000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["c#4", 6088], ["b+3", 5949]];
        microEvent.notesProbabilities = [0.9, 0.1];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.2 --------
    mediumEvent = createMediumEvent(5);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER);
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 2.5 --------
    mediumEvent = createMediumEvent(8);
    var tupletValue = randomInt(2, 4);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (17000 * TIME_MULTIPLIER) / tupletValue;
        var breathTimeValue = (500 * TIME_MULTIPLIER)
        microEvent = createMicroEvent(i + 1);
        microEvent.notes = [["b+3", 5949], ["c#4", 6084], ["g3", 5466], ["e4", 6400]];
        microEvent.notesProbabilities = [0.25, 0.25, 0.25, 0.25];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "2.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
}

pieceEvents.add(macroEvent);


if (pieceEvents.getDuration() != (100000 * TIME_MULTIPLIER)) {
    alert("Algum erro aconteceu, recarregue a página");
}


// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 3 +++++++
// ++++++++++++++++++++++++++++++++

macroEvent = createMacroEvent(3);
microEventTuplet = randomInt(1, 3);
// console.log("Tuplet variation of Macro event 3: " + microEventTuplet);

if (microEventTuplet == 1) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (27500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        // "Chão, pensou que a terra nasceu."
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 2) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (22500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
        for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (25000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 3) {
    // -------- microEvent 3.1 --------
    mediumEvent = createMediumEvent(9);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (37500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        if (i == (tupletValue - 1)) {
            microEvent.clearPartialTracking = true;
        }
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#3", 5765], ["c#4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
        microEvent.notes2replace = [6413, 7115, 6800, 6182, 6617, 6965, 6054, 6301];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.2 --------
    mediumEvent = createMediumEvent(10);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (15000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        if (i == (tupletValue - 1)) {
            microEvent.clearPartialTracking = true;
        }
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6413], ["b3", 5915], ["g#4", 6800], ["d3", 4982], ["f#3", 5417], ["a#+3", 5765], ["c+4", 6054], ["d#4", 6301]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 3.3 --------
    mediumEvent = createMediumEvent(11);
    var tupletValue = randomInt(6, 10);
    totalDuration = 0;
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (15000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        if (i == (tupletValue - 1)) {
            microEvent.clearPartialTracking = true;
        }
        microEvent.mkPartialTracking = true;
        microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
        microEvent.notesProbabilities = [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]; 
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6386, 7087, 6772, 6154, 6589, 6937, 6026, 6274, 6490, 6683, 6856, 7014, 7158];
        microEvent.breathTime = breathTimeValue;
        microEvent.replaceNotes = true;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "3.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

// if (pieceEvents.getDuration() != 167500){
//     alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration() * TIME_MULTIPLIER);
// }
//
// 

// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 4 +++++++
// ++++++++++++++++++++++++++++++++

macroEvent = createMacroEvent(4);
// -------- microEvent 4.1 --------
mediumEvent = createMediumEvent(12);
var tupletValue = randomInt(5, 10);
var breathTimeValue = 300;
for (var i = 0; i < tupletValue; i++) {
    var tupletValueMs = (30000 * TIME_MULTIPLIER) / tupletValue;
    microEvent = createMicroEvent(i + 1);
    microEvent.mkPartialTracking = true;
    microEvent.replaceNotes = false;
    microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
    microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    microEvent.breathTime = breathTimeValue;
    microEvent.possibleDurations = [tupletValueMs];
    microEvent.microEventString = "4.1." + (i + 1);
    mediumEvent.add(microEvent);
}
PHRASE += 1;
macroEvent.add(mediumEvent);

// -------- microEvent 4.2 --------
mediumEvent = createMediumEvent(13);
var tupletValue = randomInt(5, 10);
var breathTimeValue = 300;
for (var i = 0; i < tupletValue; i++) {
    var tupletValueMs = (30000 * TIME_MULTIPLIER) / tupletValue;
    microEvent = createMicroEvent(i + 1);
    microEvent.mkPartialTracking = true;
    microEvent.replaceNotes = false;
    microEvent.notes = [["e4", 6386], ["b4", 7087.96], ["g#4", 6772.31], ["c#+4", 6154.83], ["f#+4", 6589.91], ["a4", 6937.32], ["c+4", 6026.53], ["d#4", 6274.27]];
    microEvent.notesProbabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.15, 0.1];
    microEvent.syllables = POEMA[PHRASE][1];
    microEvent.syllablesProbabilities = POEMA[PHRASE][2];
    microEvent.completePhrase = POEMA[PHRASE][0];
    microEvent.breathTime = breathTimeValue;
    microEvent.possibleDurations = [tupletValueMs];
    microEvent.microEventString = "4.2." + (i + 1);
    mediumEvent.add(microEvent);
}
PHRASE += 1;
macroEvent.add(mediumEvent);
pieceEvents.add(macroEvent);

if (Math.round(pieceEvents.getDuration()) != ((167500 + 60000) * TIME_MULTIPLIER)){
    alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration() * TIME_MULTIPLIER);
}


// ++++++++++++++++++++++++++++++++
// ++++++++++ MACRO Event 5 +++++++
// ++++++++++++++++++++++++++++++++
microEventTuplet = randomInt(1, 4);
// console.log("Tuplet variation of Macro event 5: " + microEventTuplet);
macroEvent = createMacroEvent(5);

if (microEventTuplet == 1) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (30000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.1;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (27500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.1;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (22500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.1;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.2;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(5, 8);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (10000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.2;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 2) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (25000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(10, 15);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (45000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.3;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (15000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 400;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (17500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.7;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(1, 2);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (7500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.1;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 3) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(7, 9);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (35000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.mkPartialTracking = true;
        microEvent.breath = true;
        microEvent.breathProbability = 0.25;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 300;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.35;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.45;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (22500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.4;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(1, 2);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.45;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

else if (microEventTuplet == 4) {
    // -------- microEvent 5.1 --------
    mediumEvent = createMediumEvent(13);
    var tupletValue = randomInt(7, 9);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (37500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        microEvent.breath = true;
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breathProbability = 0.75;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.1." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.2 --------
    mediumEvent = createMediumEvent(14);
    var tupletValue = randomInt(4, 6);
    var breathTimeValue = 300;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (22500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.3) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.70;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.2." + (i + 1);
        mediumEvent.add(microEvent);
    }
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.3 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (20000 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.75) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947, 6853, 6431, 7194, 6449, 6378];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.75;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.3." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

    // -------- microEvent 5.4 --------
    mediumEvent = createMediumEvent(15);
    var tupletValue = randomInt(2, 4);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (12500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        var replaceNotesProb = Math.random();
        if (replaceNotesProb < 0.9) {
            microEvent.replaceNotes = true;
            microEvent.notes2replace = [6600, 6182, 6947];
        }
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.breath = true;
        microEvent.breathProbability = 0.8;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.4." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);

        // -------- microEvent 5.5 --------
    mediumEvent = createMediumEvent(16);
    var tupletValue = randomInt(3, 5);
    var breathTimeValue = 500;
    for (var i = 0; i < tupletValue; i++) {
        var tupletValueMs = (17500 * TIME_MULTIPLIER) / tupletValue;
        microEvent = createMicroEvent(i + 1);
        microEvent.mkPartialTracking = true;
        // prob to replace notes
        microEvent.replaceNotes = true;
        microEvent.syllables = POEMA[PHRASE][1];
        microEvent.syllablesProbabilities = POEMA[PHRASE][2];
        microEvent.completePhrase = POEMA[PHRASE][0];
        microEvent.notes2replace = [6600, 6182, 6947];
        microEvent.breath = true;
        microEvent.breathProbability = 0.9;
        microEvent.breathTime = breathTimeValue;
        microEvent.possibleDurations = [tupletValueMs];
        microEvent.microEventString = "5.5." + (i + 1);
        mediumEvent.add(microEvent);
    }
    PHRASE += 1;
    macroEvent.add(mediumEvent);
    pieceEvents.add(macroEvent);
}

if (Math.round(pieceEvents.getDuration()) != ((110000 + 167500 + 60000) * TIME_MULTIPLIER)) {
    alert("Algum erro aconteceu, duração total: " + pieceEvents.getDuration() * TIME_MULTIPLIER);
}


const duracaoTotal = pieceEvents.getDuration();

// print the total duration of the piece in mm:ss
console.log("The duration is: " + Math.floor(duracaoTotal / 60000) + ":" + Math.floor((duracaoTotal % 60000) / 1000));
