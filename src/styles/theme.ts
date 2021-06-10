export const theme = {
    colors: {
        primary: {
            light: 'cyan.600',
            dark: 'cyan.700',
        },
        text: {
            normal: 'gray.700',
        }
    },
    styles: {
        global: {
            "*": {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            },
            "html, body": {
                fontFamily: 'Inter, Arial, Helvetica, sans-serif',
                color: 'gray.700',
                background: 'gray.050',
                height: '100vh',
                transition: '.2s',
            }
        }
    }
}