window.addEventListener('load', () => {
  const input = document.getElementById('text-input'),
      searchButton = document.getElementById('search-button'),
      isEmpty = (str) => (!str || /^\s*$/.test(str)) ;

  searchButton.addEventListener('click', (e) => {
    if(isEmpty(input.value)){
      alert('Don\'t be like that, please type something');
      return;
    }
    alert(input.value);
  })
});
