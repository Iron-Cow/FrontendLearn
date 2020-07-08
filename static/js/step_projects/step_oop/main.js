let visitFieldsDictionary = {
    'reason': 'Reason' ,
    'lastVisit': 'Last Visit',
    'fullName': 'Full Name',
    'doctorName': 'Doctor Name',
    'additionalComment': 'Comment'
};

let visitFieldsDictionaryDentist = {
    'fullName': 'Full Name',
    'reason': 'Reason' ,
    'lastVisit': 'Last Visit',
    'additionalComment': 'Comment'

};

let visitFieldsDictionaryTherapist = {
    'fullName': 'Full Name',
    'reason': 'Reason' ,
    'lastVisit': 'Last Visit',
    'age': 'Age',
    'additionalComment': 'Comment'
};




class Visit {
    constructor(argsObj, field_dictionary, doctorName) {
        this.fullName = argsObj['fullName'];
        this.reason = argsObj['reason'];
        this.lastVisit = argsObj['lastVisit'];
        this.additionalComment = argsObj['additionalComment'];
        this.fieldDictionary = field_dictionary;
        this.doctorName = doctorName;
    }

    get doctor(){
        return this.doctorName
    }
}

class VisitDentist extends Visit {
    constructor( argsObj, field_dictionary=visitFieldsDictionaryDentist) {
        super(argsObj, field_dictionary, 'Dentist');
    };
}

class VisitTherapist extends Visit {
    constructor(argsObj, field_dictionary=visitFieldsDictionaryTherapist) {
        super(argsObj, field_dictionary, 'Therapist');
        this.age = argsObj['age'];
    };
};

class VisitManager{
    constructor(popup, table){
        this.table = table;
        this.popup = popup;
        this.doctorsForms = {};
        this.cardsStorage = {};
        this.create_button = this.popup.querySelector('.pupup__submit');
        this.dropdown = this.popup.querySelector('#popup__dropdown');
        this.dropdown.onchange = this.changedoctor.bind(this);
        this.create_button.onclick = this.submitForm.bind(this);
        this.popup.addEventListener('click', this.popupHandler.bind(this));
        this.table.addEventListener('click', this.tableHandler.bind(this));

    }
    get doctors(){
        return Object.keys(this.doctorsForms)
    }
    addDoctorForm(doctorName, fieldList, className){
        this.doctorsForms[doctorName] = {
            'form': fieldList,
            'class': className
        }
    }
    generateDoctorsDropdown(){
        for (let doctor of this.doctors){
            let option = document.createElement('option');
            option.innerHTML = doctor;
            option.value = doctor;
            option.classList.add('popup__dropdown-option');
            this.dropdown.append(option);
        }
    }
    generateInputFields(doctorName){
        let fieldsNode = document.createElement('div');
        fieldsNode.classList.add('popup__fields');

        if (!Object.keys(this.doctorsForms).includes(doctorName)){
            fieldsNode.innerHTML = 'Please, pick a doctor';
            return fieldsNode
        }

        let fieldList = this.doctorsForms[doctorName]['form'];
        for (let fieldProp of Object.keys(fieldList)){

            let field = document.createElement('div');
            field.classList.add('popup__field');
            fieldsNode.append(field);


            let label = document.createElement('label');
            label.innerHTML = fieldList[fieldProp];
            label.setAttribute('for', fieldProp);
            field.append(label);

            let input = document.createElement('input');
            if (fieldProp === 'additionalComment'){
                input = document.createElement('textarea');
            }
            input.classList.add('popup__input');
            input.placeholder = fieldList[fieldProp];
            input.name = fieldProp;
            input.id = fieldProp;
            (fieldProp==='age') ? input.type = 'number' :  (fieldProp==='additionalComment') ? 0 : input.type = 'text';
            (fieldProp==='additionalComment') ? input.maxLength = 400 :  input.maxLength = 32;

            field.append(input)
        }
        return fieldsNode
    }
    changedoctor(){
        // action when another doctor picked in dropdown
        let newFields = this.generateInputFields(this.dropdown.value);
        this.popup.querySelector('.popup__fields').remove();
        this.popup.querySelector('#popup__dropdown').after(newFields);
    }
    submitForm(){
        let inputs = this.popup.querySelectorAll('.popup__field .popup__input');
        if(this.popup.querySelector('.incorrect-field-data-generic')){
            this.popup.querySelector('.incorrect-field-data-generic').remove()
        }
        let visitArgs = {};

        for (let input of inputs){
            if (input.value === ''){
                let message = document.createElement('div');
                message.classList.add('incorrect-field-data-generic');
                message.innerHTML = 'All fields are required!';
                message.style.color = 'red';
                this.dropdown.before(message);
                return
            }
            else{
                visitArgs[input.id] = input.value
            }
        }
        console.log('correct!!');
        let VisitClass = this.doctorsForms[this.dropdown.value]['class'];
        let visit = new VisitClass(visitArgs);
        this.createTableCard(visit);

        this.popup.click();


    }
    createTableCard(visit, record_given =null){
        let visit_id = new Date().getTime();
        let doctor = visit.doctorName;
        let record = record_given || `${visit_id}-${doctor}`;
        console.log(this.cardsStorage);
        if (!this.cardsStorage[record]){
            // record in manager
            this.cardsStorage[record] = visit;
            this.updateLocalStoragelVisits();

            // creating card in the DOM
            let card = document.createElement('div');
            card.id = record;
            card.classList.add('table__element');
            card.classList.add('visit');
            card.classList.add('draggable');


            let visit__close = document.createElement('div');
            visit__close.classList.add('visit__close');
            card.append(visit__close);

            let visit__name = document.createElement('div');
            visit__name.classList.add('visit__fullName');
            visit__name.classList.add('visit__line');
            visit__name.innerHTML = 'Full Name: ' + visit.fullName;
            card.append(visit__name);

            let visit__doctor = document.createElement('div');
            visit__doctor.classList.add('visit__doctorName');
            visit__doctor.classList.add('visit__line');
            visit__doctor.innerHTML = 'Doctor: ' + doctor;
            card.append(visit__doctor);

            let visit__show_more = document.createElement('div');
            visit__show_more.classList.add('visit__show-more');
            visit__show_more.innerHTML = 'Show more ↓';
            card.append(visit__show_more);

            let right_edge = Math.random() * (this.table.clientWidth / 2);
            let topEdge = Math.random() * (this.table.clientHeight / 2);
            console.log(`cords = (${[right_edge, topEdge]})`);
            console.log(`els = (${[this.table.clientWidth, card.offsetWidth]})`);
            card.style.left = right_edge + 'px';
            card.style.top = topEdge + 'px';
            this.table.append(card);


        }else{
            this.createTableCard(visit)
        }
        console.log(`created - ${record}`)
    }
    popupHandler(event){
        if (!event.target.closest('.popup__content')) {
            this.popup.querySelector('.popup__close').click();
            console.log('close')
            // console.log(event)
        }
    }
    tableHandler(event){
        if (event.target.closest('.visit__show-more')) {
            // console.log('show more');
            let showMoreButton = event.target;
            let cardElement = showMoreButton.closest('.visit');
            let visit = this.cardsStorage[cardElement.id];
            console.log(visit);

            showMoreButton.classList.remove('visit__show-more');
            showMoreButton.classList.add('visit__show-less');
            showMoreButton.innerHTML = 'Show Less ↑';

            for (let prop in visit['fieldDictionary']){

                if (!cardElement.querySelector(`.visit__${prop}`)){
                    let line = document.createElement('div');
                    line.innerHTML = visit['fieldDictionary'][prop] + ': ' +  visit[prop].split('\n').join('<br>');
                    console.log(prop);
                    showMoreButton.before(line);
                    line.classList.add(`visit__${prop}`);
                    line.classList.add(`visit__line`);
                    line.classList.add(`visit__line_extended`);
                }
            }

        }
        else if (event.target.closest('.visit__show-less')) {
            // console.log('show more');
            let showMoreButton = event.target;
            let cardElement = showMoreButton.closest('.visit');


            showMoreButton.classList.remove('visit__show-less');
            showMoreButton.classList.add('visit__show-more');
            showMoreButton.innerHTML = 'Show more ↓';

            cardElement.querySelectorAll('.visit__line_extended').forEach(el => el.remove());

        }
        else if (event.target.closest('.visit__close')) {
            let card = event.target.closest('.visit');
            console.log(this.cardsStorage[card.id]);
            delete this.cardsStorage[card.id];
            console.log(card.id);
            card.remove();
            this.updateLocalStoragelVisits()
        }

    }
    updateLocalStoragelVisits(){
        localStorage.setItem('step_oop_visits', JSON.stringify(this.cardsStorage));
    }
    loadLocalStorageVisits(){
        let visits = JSON.parse(localStorage.getItem('step_oop_visits'));
        for (let visit in visits){
            console.log(visits[visit]);
            this.createTableCard(visits[visit], visit)
        }
        this.cardsStorage = visits || {};
    }


}


window.onload = function () {
    let table = document.querySelector('.table');

    //table management
    document.onmousedown = function (event) {
        if (event.target.closest('.table')){
            document.querySelector('.table').classList.add('active_table')
        }


        // card move
        if (event.target.closest('.visit')) {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            let card = event.target.closest('.draggable');
            let table = card.parentNode;

            let shiftX = event.clientX - card.getBoundingClientRect().left;
            let shiftY = event.clientY - card.getBoundingClientRect().top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - table.getBoundingClientRect().left;
                let newTop = event.clientY - shiftY - table.getBoundingClientRect().top;

                // курсор вышел из слайдера => оставить бегунок в его границах.
                if (newLeft < 0) {
                    newLeft = 0;
                }
                let rightEdge = table.clientWidth - card.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                if (newTop < 0) {
                    newTop = 0;
                }
                let topEdge = table.clientHeight - card.offsetHeight;
                if (newTop > topEdge) {
                    newTop = topEdge;
                }

                card.style.left = newLeft + 'px';
                card.style.top = newTop + 'px';

                // table_size.textContent = Math.round((newLeft/(slider.offsetWidth)).toFixed(2) * 12 + 8);
                // bombs_number.textContent = Math.trunc((table_size.textContent * table_size.textContent) / 6)
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

            card.ondragstart = function () {
                return false;
            };

            table.onmousedown = function (event) {
                event.preventDefault();
            };

            table.oncontextmenu = function (event) {
                event.preventDefault();
            };

        }

    };
    let popup = document.querySelector('#popup_visit');






    let visitManager = new VisitManager(popup, table);

    // filling the doctor base and generate the dropdown
    visitManager.addDoctorForm('Dentist', visitFieldsDictionaryDentist, VisitDentist);
    visitManager.addDoctorForm('Therapist', visitFieldsDictionaryTherapist, VisitTherapist);
    visitManager.generateDoctorsDropdown();

    //generate start fields
    let fields = visitManager.generateInputFields('');
    popup.querySelector('#popup__dropdown').after(fields);

    // load saved visits
    visitManager.loadLocalStorageVisits()
};