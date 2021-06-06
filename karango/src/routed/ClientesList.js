import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    dataGrid: {
        '& .MuiDataGrid-row button': {
            visibility: 'hidden'
        },
        '& .MuiDataGrid-row:hover button': {
            visibility: 'visible'
        }
    },
    toolbar: {
        justifyContent: 'flex-end',
        paddingRight: 0,
        margin: theme.spacing(2, 0)
    }
}));

export default function ClientesList() {
    const classes = useStyles()

    const [clientes, setClientes] = useState([])
    const [deletable, setDeletable] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sbOpen, setSbOpen] = useState(false)
    const [sbSeverity, setSbSeverity] = useState('success')
    const [sbMessage, setSbMessage] = useState('Exclusão realizada com sucesso.')

    const history = useHistory()

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            let response = await axios.get('https://api.faustocintra.com.br/clientes')
            if (response.data.length > 0) setClientes(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    async function deleteItem() {
        try {
            await axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
            getData()
            setSbSeverity('success')
            setSbMessage('Exclusão efetuada com sucesso.')
        }
        catch (error) {
            setSbSeverity('error')
            setSbMessage('ERRO: ' + error.message)
        }
        setSbOpen(true)
    }

    function handleDialogClose(result) {
        setDialogOpen(false)

        if (result) deleteItem()
    }

    function handleDelete(id) {
        setDeletable(id)
        setDialogOpen(true)
    }

    function handleSbClose() {
        setSbOpen(false)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'Cód.',
            align: 'right',
            headerAlign: 'right',
            flex: true,
            sortComparator: (v1, v2) => Number(v1) > Number(v2) ? 1 : -1
        },
        {
            field: 'nome',
            headerName: 'Nome',
            flex: true
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            flex: true
        },
        {
            field: 'bairro',
            headerName: 'Bairro',
            align: 'center',
            headerAlign: 'center',
            flex: true
        },
        {
            field: 'municipio',
            headerName: 'Município',
            align: 'center',
            headerAlign: 'center',
            flex: true
        },
        {
            field: 'uf',
            headerName: 'UF',
            align: 'center',
            headerAlign: 'center',
            flex: true
        },
        {
            field: 'telefone',
            headerName: 'Telefone',
            align: 'center',
            headerAlign: 'center',
            flex: true
        },
        {
            field: 'email',
            headerName: 'e-mail',
            align: 'center',
            headerAlign: 'center',
            flex: true
        },
        {
            field: 'editar',
            headerName: 'Editar',
            align: 'center',
            headerAlign: 'center',
            flex: true,
            renderCell: params => (
                <IconButton aria-label="editar" onClick={() => history.push(`/edit-client/${params.id}`)}>
                    <EditIcon />
                </IconButton>
            )
        },
        {
            field: 'excluir',
            headerName: 'Excluir',
            align: 'center',
            headerAlign: 'center',
            flex: true,
            renderCell: params => (
                <IconButton aria-label="excluir" onClick={() => handleDelete(params.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            )
        },
    ];

    return (
        <>
            <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Deseja realmente excluir este cliente?
      </ConfirmDialog>

            <Snackbar open={sbOpen} autoHideDuration={6000} onClose={handleSbClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbSeverity}>
                    {sbMessage}
                </MuiAlert>
            </Snackbar>

            <h1>Listagem de Clientes</h1>
            <Toolbar className={classes.toolbar}>
                <Button color="secondary" variant="contained" size="large"
                    startIcon={<AddBoxIcon />} onClick={() => history.push('/new-client')}>
                    Novo Cliente
        </Button>
            </Toolbar>
            <Paper elevation={4}>
                <DataGrid className={classes.dataGrid} rows={clientes} columns={columns} pageSize={10} autoHeight={true} disableSelectionOnClick={true} />
            </Paper>
        </>
    )
}