const tradTextBtn = () => {
  const btnTraducir = document.querySelector('#btnTraducir');
  btnTraducir.addEventListener('click', getTexto);
};
const getTexto = () => {
  let traducirEsto = document.querySelector('#traducir').value;
  getApiTrad(traducirEsto);
};
tradTextBtn();

const getApiTrad = async (traducirEsto) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'f96ba7a12bmsh48f2a7e08356d4ap1551eajsnea3ee61c6ab5',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    body: `[{"Text":"${traducirEsto}"}]`,
  };
  const tradLang = 'en';

  const response = await fetch(
    `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${tradLang}&api-version=3.0&profanityAction=NoAction&textType=plain`,
    options
  );
  //elegir idioma al cual se va a traducir el texto escrito en el input
  const toggLang = document.querySelector('#toggLang'); // ? BOTON CAMBIAR IDIOMA
  toggLang.addEventListener('click', changeLang(tradLang));

  traducirTexto(response);
};
const changeLang = async (tradLang) => {
  if (tradLang === 'en') {
    tradLang = 'es';
  } else {
    tradLang = 'en';
  }
  console.log(tradLang);
};

const traducirTexto = async (response) => {
  const res = await response.json();
  const txtTraducido = res[0].translations[0].text;
  insertTextoTraducido(txtTraducido);
};
const insertTextoTraducido = (txtTraducido) => {
  const insertTradTxt = document.querySelector('#insertTradTxt');
  insertTradTxt.insertAdjacentHTML('afterend', `<div>${txtTraducido}</div>`);
};
