import { createMuiTheme } from '@material-ui/core/styles';

// TODO: * naming and theme use case
const theme = createMuiTheme({
    palette: {
        mainBackColor: '#FEFBF7',
        sandBackColor: '#EEDECA',
        brownBackColor: '#EFE4D6',
        lightBrownBackColor: '#F9F2E9',
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
        craneForeColor: '#291401',
        lightBrownForeColor: '#432F20',
        blackBrownForeColor: '#4E3B2C',
        lineColor: 'lightgrey',
        mainRedColor: '#4a3685',
        borderColor: '#E5E5E5',
        whiteColor: '#FFFFFF'
    },
    typography: {
        useNextVariants: true,
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
        },
        MuiTypography: {
            root: {
                color: '#281C13',
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: 10,
                color: '#432F20',
                backgroundColor: '#F7F4F4'
            }
        },
        MuiFormHelperText: {
            root: {
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center'
            }
        }
    }
});

export default theme;
