// Transform data from backend to be in format that can be digested by the front end

export const daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const daysLeapYearArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const daysOfWeekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const today = new Date();
export const currentMonth = today.getMonth();
export const currentYear = today.getFullYear();
export const currentDate = today.getDate();


export const addRemoveDatesToState = (date, mainCalendar, selectedDatesArr) => {
    if (mainCalendar) {
        if (date) return [date];
         else return [];
    } else {
        const indexOfDate = selectedDatesArr.indexOf(date);
        // let dates = [...selectedDatesArr]

        if (indexOfDate !== -1) {
            
            return selectedDatesArr.filter(x => x !== date);
            // dates.splice(indexOfDate, 1);
            // return dates;

        } else {
            return [...selectedDatesArr, date];
        }
    
    }
}

export const convertDateToString = (date) => {
    const dateString = `${date.getDate()} ${monthsArr[date.getMonth()]} ${date.getFullYear()}`;

    return dateString;
}

export const lookUpFieldForData = (date) => {
    const lookupFieldStrArr = date.split('');
    const firstWhiteSpace = lookupFieldStrArr.indexOf(" ");
    const lookupField = `${lookupFieldStrArr.slice(firstWhiteSpace + 1, firstWhiteSpace + 4).join('')}${lookupFieldStrArr.slice(0, firstWhiteSpace).join('')}${lookupFieldStrArr.slice(firstWhiteSpace + 5).join('')}`;
    return lookupField;
};

export const transformData = (data) => {

    let transformedData = {};
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    data.forEach(event => {
  
        const eventDate = new Date(event.eventDate);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const date = eventDate.getDate();
  
        const lookup = `${monthsArr[month]}${date}${year}`
  
        if (transformedData.hasOwnProperty(lookup)) {
            transformedData[lookup].push({
                id: event._id, 
                eventDate: event.eventDate,
                title: event.title, 
                startTime: event.startTime, 
                endTime: event.endTime, 
                invitee: event.invitee,
                locationUse: event.locationUse,
                notes: event.notes
            });
        } else {
            transformedData[lookup] = [{
                id: event._id, 
                eventDate: event.eventDate,
                title: event.title, 
                startTime: event.startTime, 
                endTime: event.endTime, 
                invitee: event.invitee,
                locationUse: event.locationUse,
                notes: event.notes
            }]
        }
  
    });
    return transformedData;
  }