import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const { push } = useRouter()
const $toast = useToast()
const showToast = someFunction as void => {
  // popups

  $toast.warning('New case!', {
    position: 'top-right',
    duration: 2000,
    dismissible: true,
    pauseOnHover: true,
    onClick: () => {
      someFunction()
    },
  })
}

const clearToast = () => {
  $toast.clear()
}

export default () => {
  return {
    clearToast,
    showToast,
  }
}
