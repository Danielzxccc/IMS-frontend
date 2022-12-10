import { toast } from 'react-toastify'

const emitNotif = () => {
  toast.warning('Running out of stocks', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  })
}

export const fetchStocks = async (axios, dispatch) => {
  const response = await axios.get('/paidorders/lowstocks')
  const json = response.data
  if (json.length) dispatch({ type: 'emitNotif', payload: emitNotif() })
}
