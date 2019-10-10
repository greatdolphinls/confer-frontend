import { createMuiTheme } from '@material-ui/core/styles';

// TODO: * naming and theme use case
const theme = createMuiTheme({
    palette: {
        mainBackColor: '#FFFFFF',
        subBackColor: '#F9F7F7',
        subBackColor1: '#FAFAFA',
        subBackColor2: '#F2994A',
        subBackColor3: '#E3F2FD',
        subBackColor4: '#ECF9F3',
        subBackColor5: '#FFF4D5',
        iconColor: '#FFFFFF',
        buttonColor: '#2196F3',
        subButtonColor: '#6FCF97',
        subButtonColor1: '#C2C2C2',
        buttonHoverColor: '#2150f3',
        mainForeColor: '#000000',
        subForeColor: '#5E5E5E',
        lineColor: 'lightgrey',
        mainRedColor: '#4a3685',
        borderColor: '#E5E5E5'
    },
    typography: {
        useNextVariants: true,
        primary: {
            color: 'rgba(0, 0, 0, 0.87)'
        }
    }
});

export default theme;
