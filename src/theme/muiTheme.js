import { createMuiTheme } from '@material-ui/core/styles';

// TODO: * naming and theme use case
const theme = createMuiTheme({
    palette: {
        mainBackColor: '#FEFBF7',
        sandBackColor: '#EEDECA',
        subBackColor: '#F9F7F7',
        subBackColor1: '#FAFAFA',
        subBackColor2: '#F2994A',
        subBackColor3: '#E3F2FD',
        subBackColor4: '#ECF9F3',
        subBackColor5: '#FFF4D5',
        greyBackColor: '#F7F4F4',
        yellowBackColor: '#FFEAA6',
        orangeBackColor: '#FAE6D3',
        iconColor: '#FFFFFF',
        buttonColor: '#D65C00',
        subButtonColor: '#6FCF97',
        darkGreyButtonColor: '#919191',
        buttonHoverColor: '#2150f3',
        mainForeColor: '#281C13',
        subForeColor: '#5E5E5E',
        craneForeColor: '#7A6453',
        lineColor: 'lightgrey',
        mainRedColor: '#4a3685',
        borderColor: '#E5E5E5',
        whiteColor: '#FFFFFF'
    },
    typography: {
        useNextVariants: true,
        primary: {
            color: '#281C13'
        },
        fontFamily: [
            'ApercuPro',
            'Moret'
        ].join(','),
    },
    overrides: {
        MUIDataTable: {
            root: {
                backgroundColor: '#FF000'
            },
            paper: {
                boxShadow: 'none',
            }
        },
        MUIDataTableHeadCell: {
            root: {
                '&:last-child': {
                    width: 70
                }
            }
        }
    }
});

export default theme;
