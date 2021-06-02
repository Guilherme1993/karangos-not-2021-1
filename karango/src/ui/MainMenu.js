import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuLink: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    }
}));

export default function MainMenu() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit"
                aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/list" className={classes.menuLink}>Listagem de karangos</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/new" className={classes.menuLink}>Cadastrar novo karango</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/list-client" className={classes.menuLink}>Listagem de clientes</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/new-client" className={classes.menuLink}>Cadastrar novo cliente</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
