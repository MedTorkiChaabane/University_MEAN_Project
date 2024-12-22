export function checkEmail(email:string, usersTab:any) {
    let exist = false;
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].email == email) {
        exist = true;
      }
    }
    return exist;
  }