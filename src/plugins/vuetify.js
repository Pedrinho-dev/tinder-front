import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { createVuetify } from 'vuetify'


export default createVuetify({
  components: {
    VDateInput,
    VFileUpload,
  },
  theme: {
    defaultTheme: 'dark',
  },
})
