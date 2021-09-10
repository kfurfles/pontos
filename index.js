const {addMinutes, addDays, format, isBefore} = require('date-fns')
const {ptBR} = require('date-fns/locale')
const fs = require('fs')

const initial = new Date('2021/06/01');
const finalDate = new Date('2021/10/01');
let currentDate = new Date(initial);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateDate(day) {
  const startRange = randomIntFromInterval(-10, 60);
  const launchRange = randomIntFromInterval(-60, 60);
  const initialDate = new Date(day.setHours(8, 0));

  const initialTime = new Date(addMinutes(initialDate, startRange));
  const finalTime = addMinutes(initialTime, 540);

  const startLaunch = addMinutes(
    new Date(initialDate.setHours(12)),
    launchRange,
  );
  const finalLaunch = addMinutes(startLaunch, 60);

  const toBR = (date) => date.toLocaleString('pt-BR').slice(11, 16);
  const dayOfWeek = format(day, 'EEEE', {
    locale: ptBR,
  });
  const dayOfWeekFormated = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1);

  const P1 = toBR(initialTime);
  const P2 = toBR(startLaunch);
  const P3 = toBR(finalLaunch);
  const P4 = toBR(finalTime);
  const date = day.toLocaleString('pt-BR').slice(0, 10);

  return `${date},${dayOfWeekFormated},${P1},${P2},${P3},${P4},`;
}

let text = '';
while (isBefore(currentDate, finalDate)) {
  text += `${generateDate(currentDate)}\n`;
  currentDate = addDays(currentDate, 1);
}

fs.writeFileSync(`./pontos-${new Date().getTime()}.txt`, text)
