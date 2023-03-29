import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material';


export interface responseMessageType {
  status: 'success' | 'error' | 'warning' | '';
  message: string | null | undefined
  timeout?: number
}

const useSnackbar = () => {
  const [responseMsg, setResponseMsg] = useState<responseMessageType>({
    status: '',
    message: '',
    timeout: 3000
  })

  const CustomSnackbar = () => {
    if (responseMsg?.message) {
      return (
        <Snackbar
          autoHideDuration={3000}
          open={!!responseMsg?.message}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Alert severity={responseMsg?.status || 'info'} className={`alert_${responseMsg?.status}`}>
            {responseMsg?.message}
          </Alert>
        </Snackbar>
      )
    }
  }

  useEffect(() => {
    if (responseMsg?.message) {
      setTimeout(() => {
        setResponseMsg({ status: '', message: '' })
      },
        Number(responseMsg?.timeout) || 3000)
    }
  }, [responseMsg])

  const setResponseMessage = (responseMessageType: responseMessageType) => {
    setResponseMessage(responseMsg);
    return new Promise((resolve) => {
      setTimeout(resolve, responseMsg?.timeout || 3000)
    })
  }
  return {
    responseMsg,
    setResponseMessage,
    CustomSnackbar
  }
}

export default useSnackbar