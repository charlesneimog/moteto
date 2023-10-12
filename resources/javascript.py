import pyphen
import sys
import random

dic = pyphen.Pyphen(lang='pt_BR')

textoInicial = '''
No colorido do tempo saber-se-ia dos desígnios de Cronos
e sua ilícita atividade
Pois que ambos um só viram do farfalhar das asas parar o movimento.
Caía do céu pássaro que outrora voa,
canta,
e dos verdejantes vivos espalha sêmem e bem aventurança.
Sangra a escuridão das horas,
do mundo e sua impaciência,
Que nas inadequações da vida o homem encontra resistência e pranto seu próprio.
Assim quis o senhor:
Fome, males, a dor do mundo.
Conquanto tente não se resolve,
e o sentido, qual é?
O corpo:
Aquilo que eres máquina de se existires trará-te-a dores extremas
De criaturas,
também que existem,
sois invisivéis,
males.
Não só do externo sofr’este o homem,
tal qual doença grita o corpo:
Náuseas, cansaço, dores e acabamento. 
Grita.
A alma:
D'alma cansada sofreste o espírito, 
no amanhã,
outro amanhã.
Como este em piche perde as vontades, 
caminha abaixo sê sim naufrágio.
Perpétua languidez:
tão logo falta,
em vida: significado.
'''

textoInicial = textoInicial.split('\n')
for texto in textoInicial:
    MYTEXT = texto
    todas_silabas = []
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
                    if silaba not in todas_silabas:
                        todas_silabas.append(silaba)

    len_silabas = len(todas_silabas)
    randomValues = []
    fixedValues = None
    iterations = 0
    while True:
        iterations += 1
        fixedValues = None
        randomValues = []
        if iterations > 10000:
            sys.exit(0)
        if len_silabas == 0:
            break
        try:
            for i in range(len_silabas):
                randomValues.append(random.randint(0, 100))
            totalsum = sum(randomValues)
            fixedValues = [round(x / totalsum, 2) for x in randomValues]
            totalStr = str(sum(fixedValues))[0:4]
            if totalStr == '1.0':
                break

        except:
            pass


    if fixedValues is not None:
        print([MYTEXT, todas_silabas, fixedValues], ",")

    else:
        print("=========== ERROR ===========")

