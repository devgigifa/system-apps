const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

let month_picker = document.querySelector('#month-picker');
let year_picker = document.querySelector('#year-picker');
let year_list = document.querySelector('#year-list');
let calendar_days = document.querySelector('.calendar-days');
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

// Função para gerar o calendário
const generateCalendar = (month, year) => {
  calendar_days.innerHTML = '';
  document.querySelector('#month-picker').innerText = month_names[month];
  document.querySelector('#year').innerText = year;
  let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay(); i++) {
    let day = document.createElement('div');
    if (i >= first_day.getDay()) {
      day.innerText = i - first_day.getDay() + 1;
      day.classList.add('calendar-day');
      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

const days = document.querySelectorAll('.calendar-days div');
days.forEach(day => {
    day.addEventListener('click', function() {
        // Seu código para lidar com o clique
        console.log('Dia clicado:', this.textContent);
    });
});


// Alternar os meses com os botões
document.querySelector('#pre-month').onclick = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11; // Janeiro vai para Dezembro
    currentYear.value--; // Decrementa o ano
  } else {
    currentMonth.value--;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector('#next-month').onclick = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0; // Dezembro vai para Janeiro
    currentYear.value++; // Incrementa o ano
  } else {
    currentMonth.value++;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};


// Mostrar lista de anos ao clicar no ano
year_picker.onclick = () => {
  // Alternar a visibilidade da lista de anos
  year_list.classList.toggle('hide');

  if (!year_list.classList.contains('hide')) {
    year_list.innerHTML = ''; // Limpar a lista de anos a cada clique
    for (let y = currentYear.value - 10; y <= currentYear.value + 10; y++) {
      let yearItem = document.createElement('div');
      yearItem.innerText = y;
      yearItem.classList.add('year-item');
      
      // Alterar o ano ao clicar em um item da lista
      yearItem.onclick = () => {
        currentYear.value = y;
        generateCalendar(currentMonth.value, currentYear.value); // Atualizar o calendário
        year_list.classList.add('hide'); // Esconder a lista após a seleção
      };
      year_list.appendChild(yearItem);
    }
  }
};




// Esconder a lista quando clicar fora dela (melhora a interação)
document.addEventListener('click', (event) => {
  if (!year_picker.contains(event.target) && !year_list.contains(event.target)) {
    year_list.classList.add('hide');
  }
});



// Inicializar o calendário com o mês e ano atuais
generateCalendar(currentMonth.value, currentYear.value);


// tempo e data
  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
      )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
      )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);