import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export default function KarangosForm() {

  const [karango, setKarango] = useState({
    id: null,
    marca: '',
    modelo: '',
    cor: '',
    ano_fabricacao: (new Date()).getFullYear(), // Ano corrente
    importado: false,
    placa: '',
    preco: 0
  })

  function handleInputChange(event) {
    // Quando o nome de uma propriedade de um objeto aparece entre [],
    // isso se chama "propriedade calculada". O nome da propriedade vai
    // corresponder à avaliação da expressão entre os colchetes
    setKarango({...karango, [event.target.id]: event.target.value})
  }

  function handleCorChange(event) {
    setKarango({...karango, cor: event.target.value})
  }

  function handleAnoChange(event) {
    setKarango({...karango, ano_fabricacao: event.target.value})
  }

  function years() {
    let result = []
    for(let i = (new Date()).getFullYear(); i >= 1900; i--) result.push(i)
    return result
  }

  return (
    <>
      <h1>Cadastrar Novo Karango</h1>
      <form>
        
        <TextField id="marca" label="Marca" variant="filled" value={karango.marca} onChange={handleInputChange} />
        
        <TextField id="modelo" label="Modelo" variant="filled" value={karango.modelo} onChange={handleInputChange} />

        <TextField id="cor" label="Cor" variant="filled" value={karango.cor} onChange={handleCorChange} select>
          <MenuItem value="Amarelo">Amarelo</MenuItem>
          <MenuItem value="Azul">Azul</MenuItem>
          <MenuItem value="Bege">Bege</MenuItem>
          <MenuItem value="Branco">Branco</MenuItem>
          <MenuItem value="Cinza">Cinza</MenuItem>
          <MenuItem value="Dourado">Dourado</MenuItem>
          <MenuItem value="Laranja">Laranja</MenuItem>
          <MenuItem value="Marrom">Marrom</MenuItem>
          <MenuItem value="Prata">Prata</MenuItem>
          <MenuItem value="Preto">Preto</MenuItem>
          <MenuItem value="Roxo">Roxo</MenuItem>
          <MenuItem value="Verde">Verde</MenuItem>
          <MenuItem value="Vermelho">Vermelho</MenuItem>        
        </TextField>

        <TextField id="ano_fabricacao" label="Ano de Fabricacao" variant="filled" value={karango.ano_fabricacao} onChange={handleAnoChange} select>
          {
            years().map(year => <MenuItem value={year}>{year}</MenuItem>)
          }
        </TextField>
            
        <div>{JSON.stringify(karango)}</div>
      </form>
    </>
  )
}