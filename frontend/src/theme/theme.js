export const theme = {
  initialColorModeName: 'light',
  modes: {
    light: {
      name: 'light',
      text: '#000000',
      background: '#fff',
      backgroundSecondary: '#ededed',
      panelBackground: '#f9f9f9',
      hover: {
        background: '#f5f5f5',
        text: '#ffc107',
      },
      border: '#e0e0e0',
      boxShadow: '0 0 3px 3px #f5f5f5',
      disabled: {
        background: '#f5f5f5',
        color: '#424242',
      },
      card: {
        primary: '#fbfbfb',
        secondary: '#17181a',
      },
      border: '#e0e0e0',
      notification: {
        hasSeen: '#fff',
        unSeen: '#e9e9e9',
      },
    },
    dark: {
      name: 'dark',
      background: '#212121',
      backgroundSecondary: '#303030',
      panelBackground: '#282828',
      text: '#fff',
      hover: {
        background: '#343a40',
        text: '#ffc107',
      },
      border: '#616161',
      boxShadow: '0 0 3px 3px #302f2f',
      disabled: {
        background: '#2d2d2d',
        color: '#bdbdbd',
      },
      card: {
        primary: '#2d2f31',
        secondary: '#17181a',
      },
      border: '#616161',
      notification: {
        hasSeen: '#292929',
        unSeen: '#1c1a1a',
      },
    },
  },
};
