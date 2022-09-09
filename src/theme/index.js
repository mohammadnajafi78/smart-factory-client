import _ from 'lodash';
import {
  colors,
  responsiveFontSizes,
  adaptV4Theme,
  createTheme as createMuiTheme
} from '@mui/material';
import { THEMES } from 'src/constants';
import { softShadows, strongShadows } from './shadows';
import typography from './typography';
import { faIR } from '@mui/material/locale';

const baseOptions = {
  direction: 'ltr',
  fontFamily: 'IRANSans',
  typography,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@fontFace': ['IRANSans']
      }
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#F2F2F2',
        fontSize: '16px'
      }
    },
    MuiToolbar: {
      root: {
        paddingLeft: 12,
        paddingRight: 12,
        margin: 0
      }
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    },
    typography: {
      fontFamily: ['IRANSans', 'Vazir'].join(',')
    },
    MuiListSubheader: {
      root: {
        fontFamily: 'IRANSans'
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: 'IRANSans'
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'IRANSans',
        fontSize: '1rem'
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily: 'IRANSans'
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'IRANSans',
        fontSize: '0.8rem'
      }
    },
    MuiSvgIcon: {
      root: {
        fontFamily: 'IRANSans',
        fontSize: '2rem'
      }
    }
  }
};

const themesOptions = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      mode: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white
      },
      primary: {
        // main: colors.indigo[600]
        main: '#00AAB5'
      },
      secondary: {
        // main: '#5850EC'
        main: '#00AAB5'
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
        // secondary: colors.common.white
      }
    },
    shadows: softShadows
  }
  // {
  //   name: THEMES.ONE_DARK,
  //   palette: {
  //     mode: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#282C34',
  //       dark: '#1c2025',
  //       paper: '#282C34'
  //     },
  //     primary: {
  //       main: '#8a85ff'
  //     },
  //     secondary: {
  //       main: '#8a85ff'
  //     },
  //     text: {
  //       primary: '#e6e5e8',
  //       secondary: '#adb0bb'
  //     }
  //   },
  //   shadows: strongShadows
  // },
  // {
  //   name: THEMES.UNICORN,
  //   palette: {
  //     mode: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#2a2d3d',
  //       dark: '#222431',
  //       paper: '#2a2d3d'
  //     },
  //     primary: {
  //       main: '#a67dff'
  //     },
  //     secondary: {
  //       main: '#a67dff'
  //     },
  //     text: {
  //       primary: '#f6f5f8',
  //       secondary: '#9699a4'
  //     }
  //   },
  //   shadows: strongShadows
  // }
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find(theme => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    adaptV4Theme(
      _.merge({}, baseOptions, themeOptions, { direction: config.direction }),
      faIR
    )
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
