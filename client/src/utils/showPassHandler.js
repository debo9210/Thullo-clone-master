export const showPassHandler = (e) => {
  if (e.target.textContent === 'visibility_off') {
    e.target.textContent = 'visibility';
    e.target.parentElement.firstChild.type = 'text';
  } else {
    e.target.textContent = 'visibility_off';
    e.target.parentElement.firstChild.type = 'password';
  }
};
