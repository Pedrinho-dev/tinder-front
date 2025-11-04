import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'


import { createVuetify } from 'vuetify'


export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: 'dark',
  },
})
