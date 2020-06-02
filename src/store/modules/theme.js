const theme = {
    state: {
        theme: 'green'
    },
    mutations: {
        GETTHEME(state) {
            if (localStorage.getItem('theme')) {
                state.theme = JSON.parse(localStorage.getItem('theme'))
            }
            return state.theme
        },
        SETTHEME(state, data) {
            state.theme = data
            localStorage.setItem('theme', JSON.stringify(data))
        }
    },
    actions: {
        getTheme(context) {
            context.commit('GETTHEME')
        },
        setTheme(context, data) {
            context.commit('SETTHEME', data)

        }
    }
}

export default theme