import pyphen

dic = pyphen.Pyphen(lang='pt_BR')


Adao = '''
Ocre caminhar
D'olhos cansados à macieira
Olhara o corpo de esguio timbre
Tanto daquela, quanto daquilo.
Semblante cálido ao piche anda
Quebrada a regra, ventos que sopram.
Fez a si homem na relva prata.
Dá vida o gosto de terra seca. Sangrar-se-á.
'''


Lamentacao = '''
Outrora o templo de Deus habitara
Quente sua língua, s'alimentara
Desta que em riste sorvia n'alma: Maná; e Ambrosia.
De deus na boca tínhamos casa,
de nosso o lar, agora ingrato.
Desta suas mãos provia afago,
Dos pés daquele: a reverência
Torna-te agora senhor das armas, piedade fora de ti nã’alcança.
Aqui jaz esperança, honra e furor: à porta do paraíso.
'''


Caminham_no_deserto = '''
Ah, Ah, que este solo que aos pés recua
Que a pele deste tanto é tão fina, assim pois não
costume tinha: o sol, perdida a graça, reclama-te!
Ah, queima, tão logo ao toque, fineto o véu: à separar-se.
No que ao firmar, ao separar-se: rubro vermelho sangue,
Marc'o caminho que rastejar-se.
Ah! Sorve o astro tais qualidades, do peito homem:
Sais à provocar-lhe, conclama à Deus rependimentos
Ah - diz - Deixe-me ao útero de mais uma vez: tornar-te.
'''

Sobre_a_areia = '''
Percebendo-se de carne armadura, mais uma vez tocaram-se
Pois assim quis o altíssimo e era imperioso que o fizessem.
Pois assim, ao lento sangue: pulsar-te-ei, que ao primeiro toque permuta.
Permuta o tempo todas su'horas, gritando pare que aqui, aqui o deixe.
Assim, dizem os amantes, no pulular do tempo, das estrelas e da desesperança:
Adão... Adão... Eu te amo. Como era imperioso que o fizesse.
Eva... Eva... Eu te amo. Como era imperioso que o fizesse.
'''

VeemAdao_Eva = '''
No colorido do tempo saber-se-ia dos desígnios de Cronos e sua ilícita atividade
Pois que ambos um só viram do farfalhar das asas parar o movimento.
Caía do céu pássaro que outrora voa, canta, e dos verdejantes vivos espalha sêmem e bem aventurança.
Sangra a escuridão das horas, do mundo e sua impaciência,
Que nas inadequações da vida o homem encontra resistência e pranto seu próprio.
Assim quis o senhor:
Fome, males, a dor do mundo. Conquanto tente não se resolve, e o sentido, qual é?
O corpo:
Aquilo que eres máquina de se existires trará-te-a dores extremas
De criaturas, também que existem, sois invisivéis, males.
Não só do externo sofr’este o homem, tal qual doença grita o corpo:
Náuseas, cansaço, dores e acabamento. Grita. 
A alma: 
D'alma cansada sofreste o espírito, no amanhã, outro amanhã.
Como este em piche perde as vontades, caminha abaixo sê sim naufrágio. 
Perpétua languidez: tão logo falta, em vida: significado. 
'''

TODAS_SILABAS = []

def processTexto(texto):
    finalsilabas = []
    texto = texto.lower()
    texto = texto.replace(',', '')
    texto = texto.replace('.', '')
    texto = texto.replace('!', '')
    texto = texto.replace('?', '')
    texto = texto.replace('-', ' ')
    texto = texto.split('\n')
    for palavra in texto.split(' '):
        silabas = dic.inserted(palavra).split('-')
        finalsilabas.append(silabas)
    return finalsilabas



for texto in [Adao, Lamentacao, Caminham_no_deserto, Sobre_a_areia, VeemAdao_Eva]:
    print("\n\n" + ("-" * 80) + "\n\n")
    texto = texto.lower()
    texto = texto.replace(',', '')
    texto = texto.replace('.', '')
    texto = texto.replace('!', '')
    texto = texto.replace('?', '')
    texto = texto.replace('-', ' ')
    texto = texto.split('\n')
    for linha in texto:
        for palavra in linha.split(' '):
            if palavra != '':
                silabas = dic.inserted(palavra).split('-')
                for silaba in silabas:
                    if silaba not in TODAS_SILABAS:
                        TODAS_SILABAS.append(silaba)
