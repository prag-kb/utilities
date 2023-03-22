
export type CommonResponse = {
  status?: 'danger' | 'success';
  message?: string;
}

export const Utilities = () => {

  // To restrict Special characters in input fields
  function restrictSpecialCharacters(e:any, value:any, length:number) {
    try {
      if (/^[a-zA-Z0-9, \s]*$/.test(e.key) && value.length < length) {
        return true;
      } else {
        e.preventDefault();
        return false
      }
    } catch (e) {}
  }

  //To restrict numbers & special characters in input field
  function restrictNumberSpecialCharacters (e:any, value:any, length:number) {
    try{
      if (/^[a-zA-Z\s]*$/.test(e.key) && value.length < length) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    } catch (e) {}
  }
  return {
    restrictSpecialCharacters,
    restrictNumberSpecialCharacters
  }
}
