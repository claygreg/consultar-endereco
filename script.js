var submitButton = document.querySelector('#consulta form button')
var zipCodeField = document.querySelector('#consulta form input')
var content = document.querySelector('#consulta main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault();

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function(response) {
            if (response.data.erro) {
                throw new Error('CEP inválido')
            }
            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine(response.data.bairro)
            createLine(response.data.localidade + ' - ' + response.data.uf)
            createLine(response.data.ddd)
        })
        .catch(function(error) {
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}