from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

origins = ['http://localhost:63342']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Animal(BaseModel):
    id:Optional[str]
    nome:str
    idade:int
    sexo:str
    cor:str


banco: List[Animal] = []

@app.post('/animais')
def cadastro(animal: Animal):
    animal.id = str(uuid4())
    banco.append(animal)
    return {'msg':'Animal Cadastrado com sucesso!'}


@app.get('/animais')
def retornarAnimais():
    return banco


@app.get('/animais/{animal_id}')
def obter_animal(animal_id:str):
    for animal in banco:
        if animal.id == animal_id:
            return animal
    return {'erro':'animal não localizado'}


@app.delete('/animais/{animal_id}')
def remover_animal(animal_id:str):
    posicao = -1
    nome = None
    for index, animal in enumerate(banco):
        if animal.id == animal_id:
            posicao = index
            nome = animal.nome
            break
    if posicao != -1:
        banco.pop(posicao)
        return {'mensagem': f'{nome} removido com sucesso'}

    else:
        return {'erro': 'animal não localizado'}


@app.delete('/animais')
def apagar_animais():
    banco.clear()
    return {'msg':'animais deletados com sucesso'}



