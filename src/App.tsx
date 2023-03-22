import React from 'react'


export type CommonResponse = {
  status?: 'danger' | 'success';
  message?: string;
}

export const Utilities = () => {

  //To restrict Special characters in input fields
  // restrictSpecialCharacters(e, value, length) {
  //   try {
  //     if (/^[a-zA-Z0-9, \s]*$/.test(e.key) && value.length < length) {
  //       return true;
  //     } else {
  //       e.preventDefault();
  //       return false
  //     }
  //   } catch (e) {}
  // }
  // return 
}
