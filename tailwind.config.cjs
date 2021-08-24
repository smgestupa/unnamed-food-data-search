module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte'],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height'
            }
        }
    },
    variants: {
        extend: {
            height: ['responsive', 'hover', 'focus']
        }

    }
}