async function carregarAnimais() {
    const response = await axios.get('http://localhost:8000/animais')
    const animais = response.data
    const lista = document.getElementById('lista-animais')

    animais.forEach(animal=> {
        const item = document.createElement('li')
        const descricao_animal = `${animal.nome} - Idade : ${animal.idade} - Cor : ${animal.cor}`
        item.innerText = descricao_animal
        lista.appendChild(item)
    })
}

function manipularFormulario(){
    const form_animal = document.getElementById('form-animal')
    const input_nome = document.getElementById('nome')
    const input_idade = document.getElementById('idade')
    const input_cor = document.getElementById('cor')
    const input_sexo = document.getElementById('sexo')
    const lista = document.getElementById('lista-animais')

    form_animal.onsubmit = async (event) => {
        event.preventDefault()
        const nome_animal = input_nome.value
        const idade_animal = input_idade.value
        const cor_animal = input_cor.value
        const sexo_animal = input_sexo.value
        await axios.post('http://localhost:8000/animais', {
            nome: nome_animal,
            idade: idade_animal,
            sexo: sexo_animal,
            cor: cor_animal
        })
        const item = document.createElement('li')
        const descricao_animal = `${nome_animal} - Idade : ${idade_animal} - Cor : ${cor_animal} - Sexo : ${sexo_animal}`
        item.innerText = descricao_animal
        lista.appendChild(item)
    }
}
function apagarLista(){
    const btl_deletar = document.getElementById('deletar')
    btl_deletar.onclick = async (event)=>{
        event.preventDefault()
        await axios.delete('http://localhost:8000/animais')
        console.log('Lista deletada com sucesso')
            carregarAnimais()

    }
    carregarAnimais()

}

function app(){
    console.log('App Iniciado!')
    carregarAnimais()
    manipularFormulario()
    apagarLista()
}
app()