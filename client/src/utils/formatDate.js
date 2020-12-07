const months = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre'];

function formatDate(iso_date) {
  const today = new Date();
  const date = new Date(iso_date);
  const time = date.toLocaleTimeString().slice(0, -3);
  if (today.toLocaleDateString() === date.toLocaleDateString()) {
    return {
      date: 'Oggi',
      time
    };
  }
  const month = months[date.getMonth()];
  return {
    date: `${date.getDate()} ${month} ${date.getFullYear()}`,
    time
  };
}

export default formatDate;