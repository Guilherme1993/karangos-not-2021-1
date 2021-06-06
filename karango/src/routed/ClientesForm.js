import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, useParams } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'

const useStyles = makeStyles(() => ({
    form: {
        maxWidth: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            margin: '0 24px 24px 0'
        }
    },
    toolbar: {
        marginTop: '36px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    checkbox: {
        alignItems: 'center'
    }
}))

const formatNumber = {
    '0': '[0-9]'
}

const cpfMask = '000.000.000-00';
const rgMask = '00.000.000-0';
const phoneMask = '(00)00000-0000';

export default function ClientesForm() {
    const classes = useStyles()

    const [cliente, setCliente] = useState({
        id: null,
        nome: '',
        cpf: '',
        rg: '',
        logradouro: '',
        num_imovel: '',
        complemento: '',
        bairro: '',
        municipio: '',
        uf: '',
        telefone: '',
        email: ''
    })

    const [snackState, setSnackState] = useState({
        open: false,
        severity: 'success',
        message: 'Cliente salvo com sucesso'
    })

    const [btnSendState, setBtnSendState] = useState({
        disabled: false,
        label: 'Enviar'
    })

    const [error, setError] = useState({
        nome: '',
        cpf: '',
        rg: '',
        logradouro: '',
        num_imovel: '',
        bairro: '',
        municipio: '',
        uf: '',
        telefone: '',
        email: ''
    })

    const [isModified, setIsModified] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)

    const [title, setTitle] = useState('Cadastrar Novo Cliente')

    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            setTitle('Editando Cliente')
            getData(params.id)
        }
    }, [])

    async function getData(id) {
        try {

            let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
            setCliente(response.data)

        } catch (error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'Não foi possível carregar os dados para edição.'
            })
        }
    }

    function handleInputChange(event, property) {

        const clienteTemp = { ...cliente }

        if (event.target.id) property = event.target.id

        clienteTemp[property] = event.target.value

        setCliente(clienteTemp)
        setIsModified(true)
        validate(clienteTemp)
    }

    function validate(data) {
        const errorTemp = {
            nome: '',
            cpf: '',
            rg: '',
            logradouro: '',
            num_imovel: '',
            bairro: '',
            municipio: '',
            uf: '',
            telefone: '',
            email: ''
        }
        let isValid = true

        if (data.nome.trim() === '') {
            errorTemp.nome = 'O nome deve ser preenchido'
            isValid = false
        }

        if (data.cpf.trim() === '' || data.cpf.includes('_')) {
            errorTemp.cpf = 'O CPF deve ser corretamente preenchido'
            isValid = false
        }

        if (data.rg.trim() === '' || data.rg.includes('_')) {
            errorTemp.rg = 'O RG deve ser corretamente preenchido'
            isValid = false
        }

        if (data.logradouro.trim() === '') {
            errorTemp.logradouro = 'O logradouro deve ser preenchido'
            isValid = false
        }

        if (data.num_imovel.trim() === '') {
            errorTemp.num_imovel = 'O número do imóvel deve ser preenchido'
            isValid = false
        }
        if (data.bairro.trim() === '') {
            errorTemp.bairro = 'O bairro deve ser preenchido'
            isValid = false
        }

        if (data.municipio.trim() === '') {
            errorTemp.municipio = 'O município deve ser preenchido'
            isValid = false
        }

        if (data.uf.trim() === '') {
            errorTemp.uf = 'Escolha uma uf'
            isValid = false
        }

        if (data.telefone.trim() === '' || data.telefone.includes('_')) {
            errorTemp.telefone = 'O telefone deve ser corretamente preenchido'
            isValid = false
        }

        if (data.email.trim() === '') {
            errorTemp.email = 'O e-mail deve ser preenchido'
            isValid = false
        }

        setError(errorTemp)
        return isValid
    }

    async function saveData() {
        try {

            setBtnSendState({ disabled: true, label: 'Enviando...' })

            if (params.id) await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, cliente)
            else await axios.post('https://api.faustocintra.com.br/clientes', cliente)

            setSnackState({
                open: true,
                severity: 'success',
                message: 'Cliente salvo com  sucesso'
            })
        }
        catch (error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'ERRO: ' + error.message
            })
        }
        setBtnSendState({ disabled: false, label: 'Enviar' })
    }

    function handleSubmit(event) {

        event.preventDefault()

        if (validate(cliente)) saveData()

    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleSnackClose(event, reason) {
        if (reason === 'clickaway') return
        setSnackState({ ...snackState, open: false })

        history.push('/list-client')
    }

    function handleDialogClose(result) {
        setDialogOpen(false)

        if (result) history.push('/list-client')
    }

    function handleGoBack() {

        if (isModified) setDialogOpen(true)
        else history.push('/list-client')
    }

    return (
        <>

            <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Há dados não salvos. Deseja realmente voltar?
      </ConfirmDialog>

            <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackState.severity}>
                    {snackState.message}
                </Alert>
            </Snackbar>

            <h1>{title}</h1>
            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField
                    id="nome"
                    label="Nome"
                    variant="filled"
                    value={cliente.nome}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.nome !== ''}
                    helperText={error.nome}
                />

                <InputMask
                    formatChars={formatNumber}
                    mask={cpfMask}
                    id="cpf"
                    onChange={event => handleInputChange(event, 'cpf')}
                    value={cliente.cpf}
                >
                    {() => <TextField
                        label="CPF"
                        variant="filled"
                        fullWidth
                        required
                        error={error.cpf !== ''}
                        helperText={error.cpf}
                    />}
                </InputMask>

                <InputMask
                    formatChars={formatNumber}
                    mask={rgMask}
                    id="rg"
                    onChange={event => handleInputChange(event, 'rg')}
                    value={cliente.rg}
                >
                    {() => <TextField
                        label="RG"
                        variant="filled"
                        fullWidth
                        required
                        error={error.rg !== ''}
                        helperText={error.rg}
                    />}
                </InputMask>

                <TextField
                    id="logradouro"
                    label="Logradouro"
                    variant="filled"
                    value={cliente.logradouro}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.logradouro !== ''}
                    helperText={error.logradouro}
                />

                <TextField
                    id="num_imovel"
                    label="Nº Imóvel"
                    variant="filled"
                    value={cliente.num_imovel}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.num_imovel !== ''}
                    helperText={error.num_imovel}
                />

                <TextField
                    id="complemento"
                    label="Complemento"
                    variant="filled"
                    value={cliente.complemento}
                    onChange={handleInputChange}
                    fullWidth
                    helperText={error.complemento}
                />

                <TextField
                    id="bairro"
                    label="Bairro"
                    variant="filled"
                    value={cliente.bairro}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.bairro !== ''}
                    helperText={error.bairro}
                />

                <TextField
                    id="municipio"
                    label="Município"
                    variant="filled"
                    value={cliente.municipio}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.municipio !== ''}
                    helperText={error.municipio}
                />

                <TextField
                    id="uf"
                    label="uf"
                    variant="filled"
                    value={cliente.uf}
                    onChange={event => handleInputChange(event, 'uf')}
                    select
                    fullWidth
                    required
                    error={error.uf !== ''}
                    helperText={error.uf}
                >
                    <MenuItem value="AC">Acre</MenuItem>
                    <MenuItem value="AL">Alagoas</MenuItem>
                    <MenuItem value="AM">Amazonas</MenuItem>
                    <MenuItem value="AP">Amapá</MenuItem>
                    <MenuItem value="BA">Bahia</MenuItem>
                    <MenuItem value="CE">Ceará</MenuItem>
                    <MenuItem value="DF">Distrito Federal</MenuItem>
                    <MenuItem value="ES">Espírito Santo</MenuItem>
                    <MenuItem value="GO">Goiás</MenuItem>
                    <MenuItem value="MA">Maranhão</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                    <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                    <MenuItem value="MT">Mato Grosso</MenuItem>
                    <MenuItem value="PA">Pará</MenuItem>
                    <MenuItem value="PB">Paraíba</MenuItem>
                    <MenuItem value="PE">Pernambuco</MenuItem>
                    <MenuItem value="PI">Piauí</MenuItem>
                    <MenuItem value="PR">Paraná</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                    <MenuItem value="RO">Rondônia</MenuItem>
                    <MenuItem value="RR">Roraima</MenuItem>
                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                    <MenuItem value="SC">Santa Catarina</MenuItem>
                    <MenuItem value="SE">Sergipe</MenuItem>
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="TO">Tocantins</MenuItem>
                </TextField>

                <InputMask
                    formatChars={formatNumber}
                    mask={phoneMask}
                    id="telefone"
                    onChange={event => handleInputChange(event, 'telefone')}
                    value={cliente.telefone}
                >
                    {() => <TextField
                        label="telefone"
                        variant="filled"
                        fullWidth
                        required
                        error={error.telefone !== ''}
                        helperText={error.telefone}
                    />}
                </InputMask>

                <TextField
                    id="email"
                    label="e-mail"
                    type="email"
                    variant="filled"
                    value={cliente.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.email !== ''}
                    helperText={error.email}
                />

                <Toolbar className={classes.toolbar}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={btnSendState.disabled}
                    >
                        {btnSendState.label}
                    </Button>
                    <Button variant="contained" onClick={handleGoBack}>Voltar</Button>
                </Toolbar>
            </form>
        </>
    )
}