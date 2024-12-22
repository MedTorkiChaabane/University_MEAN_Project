export function checkLength(ch: any, nb: any) {
  if (ch == null) return 0;
  else return ch.length >= nb;
}
export function isAlphabeticalWithSpace(ch: any) {
  if (ch == null) return 0;
  else return /^[a-zA-Z\s]+$/.test(ch);
}
export function isValidEmail(email: any) {
  if (email == null) return 0;
  else {
    // regular expression that matches valid email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
export function isValidTel(tel:any){
  if(tel==null) return 0;
  else return(tel>19999999 && tel<99999999);
}
export function checkSpeciality(ch:any){
  if(ch==null) return 0;
  else return 1;
}