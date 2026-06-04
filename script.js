const calendarData = {
  '2026-05-10': [
    { title: 'Moon Motivation Kickoff', time: '7:00 PM', location: 'Student Center' },
  ],
  '2026-05-18': [
    { title: 'Gator Gents Mentoring', time: '4:30 PM', location: 'Holloway Gym' },
  ],
  '2026-05-25': [
    { title: 'Sleep Out for the Homeless', time: '8:00 PM', location: 'Campus Quad' },
  ],
  '2026-06-04': [
    { title: 'Scholarship Workshop', time: '6:00 PM', location: 'Library Hall' },
  ],
  '2026-06-14': [
    { title: 'Community Service Day', time: '10:00 AM', location: 'Greensboro Shelter' },
  ],
  '2026-06-22': [
    { title: 'Campus Advocacy Roundtable', time: '5:30 PM', location: 'Founders Hall' },
  ],
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function renderCalendar(date) {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;

  const monthLabel = document.querySelector('.calendar-title');
  const currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  monthLabel.textContent = `${monthNames[month]} ${year}`;
  calendarGrid.innerHTML = '';

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDays.forEach((day) => {
    const label = document.createElement('span');
    label.textContent = day;
    calendarGrid.appendChild(label);
  });

  const firstDay = currentDate.getDay();
  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement('span');
    calendarGrid.appendChild(empty);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasEvent = Boolean(calendarData[dateKey]);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day-button';
    button.textContent = day;
    if (hasEvent) button.classList.add('event');
    button.addEventListener('click', () => selectDay(dateKey, button));

    calendarGrid.appendChild(button);
  }

  const defaultDay = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  selectDay(Object.keys(calendarData).includes(defaultDay) ? defaultDay : Object.keys(calendarData).find((key) => key.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) || defaultDay);
}

let activeButton = null;

function selectDay(dateKey, buttonElement) {
  const eventList = document.querySelector('.event-list');
  if (!eventList) return;

  if (activeButton) {
    activeButton.classList.remove('active');
  }

  if (buttonElement) {
    buttonElement.classList.add('active');
    activeButton = buttonElement;
  }

  eventList.innerHTML = '';
  const events = calendarData[dateKey] || [];
  const readableDate = new Date(dateKey).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const header = document.createElement('h3');
  header.textContent = `Events for ${readableDate}`;
  eventList.appendChild(header);

  if (events.length === 0) {
    const noEvent = document.createElement('p');
    noEvent.textContent = 'No scheduled events on this date. Check other dates for program details.';
    eventList.appendChild(noEvent);
    return;
  }

  events.forEach((event) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const title = document.createElement('h4');
    title.textContent = event.title;
    card.appendChild(title);

    const time = document.createElement('p');
    time.textContent = `Time: ${event.time}`;
    card.appendChild(time);

    const location = document.createElement('p');
    location.textContent = `Location: ${event.location}`;
    card.appendChild(location);

    eventList.appendChild(card);
  });
}

function initCalendar() {
  const prevButton = document.querySelector('.calendar-prev');
  const nextButton = document.querySelector('.calendar-next');
  const today = new Date();
  let activeDate = new Date(today.getFullYear(), today.getMonth(), 1);

  if (!document.querySelector('.calendar-grid')) return;

  const update = () => {
    renderCalendar(activeDate);
  };

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1);
      update();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      activeDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1);
      update();
    });
  }

  update();
}

document.addEventListener('DOMContentLoaded', initCalendar);
