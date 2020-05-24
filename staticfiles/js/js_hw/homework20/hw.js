'use strict';
let team_speeds = [4, 5, 4, 1, 8, 10, 5];
let tasks_backlog = [4, 5, 18, 10, 11, 1, 3, 8, 20, 7, 14, 2, 7, 4, 9];

let team_daily_productivity = team_speeds.reduce((x, y) => x + y);
console.log(team_daily_productivity);

let required_hours = tasks_backlog.reduce((x, y) => x + y);
console.log(required_hours);

let deadline = new Date(2020, 4, 27);
console.log(deadline);

let today = new Date();


console.log(today);

console.log((deadline - today)/24/60/60/1000);

function achievement(pointsTasks, comPointsDay, deadline) {
    let today = new Date();
    let daysWork = pointsTasks / comPointsDay;
    console.log(daysWork);
    let workingDays = (((deadline - today)/(24*3600*1000))/7)*5;
    console.log(workingDays);
    if (daysWork > workingDays ) {
        let hoursDiff = daysWork * 24 - workingDays * 24;
        console.log(hoursDiff);
        console.log(`Команде разработчиков придется потратить дополнительно ${hoursDiff} часов после дедлайна, чтобы выполнить все задачи в беклоге`);
    } else {
        let daysDiff = workingDays - daysWork;
        console.log(`Все задачи будут успешно выполнены за ${daysDiff} дней до наступления дедлайна!`);
    }

}
achievement(required_hours, team_daily_productivity, deadline);
