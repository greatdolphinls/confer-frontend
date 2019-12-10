import { createMuiTheme } from '@material-ui/core/styles';

// TODO: * naming and theme use case
const theme = createMuiTheme({
    palette: {
        mainBackColor: '#FEFBF7',
        sandBackColor: '#EEDECA',
        brownBackColor: '#EFE4D6',
        lightBrownBackColor: '#F9F2E9',
        subBackColor4: '#ECF9F3',
        greyBackColor: '#F7F4F4',
        buttonColor: '#D65C00',
        subButtonColor: '#6FCF97',
        darkGreyButtonColor: '#919191',
        mainForeColor: '#281C13',
        subForeColor: '#5E5E5E',
        craneForeColor: '#291401',
        blackBrownForeColor: '#4E3B2C',
        blueForeColor: '#1E88E5',
        borderColor: '#E5E5E5',
        whiteColor: '#FEFBF7'
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Grotesk',
            'Ogg'
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
                color: '#281C13'
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: 12,
                fontWeight: 'bold',
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
        },
        MuiFormLabel: {
            root: {
                color: '#D65C00'
            }
        },
        MuiInputBase: {
            root: {
                '&:before': {
                    borderColor: '#D65C00 !important'
                },
                '&:after': {
                    borderColor: '#D65C00 !important'
                }
            }
        }
    }
});

export default theme;
