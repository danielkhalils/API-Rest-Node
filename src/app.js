//Criando instancia do express e definindo uma porta
import express from 'express'
const app = express()

//Indicar para o Express ler o body de um JSON, evitando null
app.use(express.json())

//Estrutura básica de dados mockados (MOCK)
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suiça', grupo: 'G'},
    {id: 3, selecao: 'Sérvia', grupo: 'G'}, 
    {id: 4, selecao: 'Camarões', grupo: 'G'}
]

//Função findById
function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id == id)
}

//Função pegar posição do index do elemento no array por id
function buscarIdSelecao(id){
    return selecoes.findIndex( selecao => selecao.id == id)
}

//Criar rota padrão ou raiz
app.get('/', (req, res) => {
    res.send('Curso de Node Js')
})

//Get arraylist com statuscode
app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})

//Get id de um item da lista
app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorId(req.params.id))
})

//Post de um objeto na lista de array
app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})

//Delete de um objeto da lista
app.delete('/selecoes/:id', (req, res) =>{
    let index = buscarIdSelecao(req.params.id)
    //Remover item do array
    selecoes.splice(index, 1)
    res.send('Seleção excluída com sucesso!')
})

//Update de um objeto da lista
app.put('/selecoes/:id', (req, res) =>{
    let index = buscarIdSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})

export default app